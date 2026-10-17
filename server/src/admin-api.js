// JSON API behind the admin dashboard. Every route except login needs a valid session cookie.

import { sql, audit, STATUSES, ROLES } from "./db.js";
import { HttpError, send, readJson, text, toCsv } from "./http.js";
import {
  authenticate, createSession, destroySession, sessionCookie, clearCookie, requireUser, requireAdmin,
  checkRateLimit, recordFailure, clearFailures, checkOrigin, hashPassword, verifyPassword, checkPasswordStrength,
} from "./auth.js";

const secure = process.env.COOKIE_SECURE !== "false";
const PAGE_SIZE = 25;
const AUDIT_PAGE_SIZE = 50;
const BULK_MAX = 500;

/** Shared WHERE clause for the lead list and CSV export. */
function filters(url) {
  const form = text(url.searchParams.get("form"), 60);
  const status = text(url.searchParams.get("status"), 20);
  const q = text(url.searchParams.get("q"), 200);
  const from = text(url.searchParams.get("from"), 10);
  const to = text(url.searchParams.get("to"), 10);
  if (status && !STATUSES.includes(status)) throw new HttpError(400, "Invalid status");
  for (const d of [from, to]) if (d && !/^\d{4}-\d{2}-\d{2}$/.test(d)) throw new HttpError(400, "Dates must be YYYY-MM-DD");
  const like = q ? `%${q.replace(/[\\%_]/g, (c) => `\\${c}`)}%` : null;
  return sql`
    WHERE true
      ${form ? sql`AND form = ${form}` : sql``}
      ${status ? sql`AND status = ${status}` : sql``}
      ${from ? sql`AND created_at >= ${from}::date` : sql``}
      ${to ? sql`AND created_at < ${to}::date + 1` : sql``}
      ${like ? sql`AND (name ILIKE ${like} OR email ILIKE ${like} OR data::text ILIKE ${like} OR notes ILIKE ${like})` : sql``}`;
}

async function login(req, res) {
  const ip = checkRateLimit(req);
  const body = await readJson(req);
  const email = text(body.email, 254);
  const password = typeof body.password === "string" ? body.password : "";
  const user = email && password ? await authenticate(email, password) : null;
  if (!user) {
    recordFailure(ip);
    throw new HttpError(401, "Incorrect email or password");
  }
  clearFailures(ip);
  const token = await createSession(user.id);
  await audit(user.id, "login", { detail: { ip } });
  send(res, 200, { id: user.id, email: user.email, name: user.name, role: user.role }, { "Set-Cookie": sessionCookie(token, secure) });
}

async function stats() {
  const totalsQ = sql`
    SELECT
      count(*)::int AS total,
      count(*) FILTER (WHERE status = 'new')::int AS new,
      count(*) FILTER (WHERE status = 'new' AND created_at < now() - interval '48 hours')::int AS stale,
      count(*) FILTER (WHERE created_at >= now() - interval '7 days')::int AS last7,
      count(*) FILTER (WHERE created_at >= now() - interval '14 days' AND created_at < now() - interval '7 days')::int AS prev7,
      count(*) FILTER (WHERE created_at >= now() - interval '30 days')::int AS last30,
      count(*) FILTER (WHERE status = 'won')::int AS won,
      count(*) FILTER (WHERE status = 'lost')::int AS lost
    FROM submissions WHERE status <> 'spam'`;
  const byStatusQ = sql`SELECT status, count(*)::int AS count FROM submissions GROUP BY status`;
  // Time from a lead arriving to the first time anyone changed its status, over the last 30 days
  const responseQ = sql`
    SELECT
      (percentile_cont(0.5) WITHIN GROUP (ORDER BY extract(epoch FROM t.first_touch - s.created_at)) / 3600)::float AS median_hours,
      count(*)::int AS sample
    FROM submissions s
    JOIN LATERAL (
      SELECT min(a.created_at) AS first_touch FROM audit_log a
      WHERE a.submission_id = s.id AND a.action = 'update_submission' AND a.detail ? 'status'
    ) t ON t.first_touch IS NOT NULL
    WHERE s.created_at >= now() - interval '30 days' AND s.status <> 'spam'`;
  const byFormQ = sql`
    SELECT form,
      count(*)::int AS total,
      count(*) FILTER (WHERE status = 'new')::int AS new,
      count(*) FILTER (WHERE created_at >= now() - interval '30 days')::int AS last30
    FROM submissions WHERE status <> 'spam'
    GROUP BY form ORDER BY total DESC`;
  const dailyQ = sql`
    SELECT to_char(d, 'YYYY-MM-DD') AS day, coalesce(c.n, 0)::int AS count
    FROM generate_series(current_date - 29, current_date, interval '1 day') d
    LEFT JOIN (
      SELECT created_at::date AS day, count(*) AS n FROM submissions
      WHERE status <> 'spam' AND created_at >= current_date - 29 GROUP BY 1
    ) c ON c.day = d::date
    ORDER BY d`;
  const recentQ = sql`
    SELECT id, form, name, email, status, created_at,
           (notes IS NOT NULL AND notes <> '') AS has_notes
    FROM submissions
    WHERE status <> 'spam' ORDER BY created_at DESC LIMIT 8`;
  const [[totals], byStatus, [response], byForm, daily, recent] = await Promise.all([totalsQ, byStatusQ, responseQ, byFormQ, dailyQ, recentQ]);
  return { totals, byStatus, response, byForm, daily, recent };
}

/** Cheap count for the sidebar badge, so pages do not need the full stats query. */
async function badge() {
  const [row] = await sql`SELECT count(*)::int AS new FROM submissions WHERE status = 'new'`;
  return row;
}

async function listSubmissions(url) {
  const page = Math.max(Number(url.searchParams.get("page")) || 1, 1);
  const where = filters(url);
  const order = url.searchParams.get("sort") === "oldest" ? sql`created_at ASC` : sql`created_at DESC`;
  const [[{ count }], rows, forms] = await Promise.all([
    sql`SELECT count(*)::int AS count FROM submissions ${where}`,
    sql`
      SELECT id, form, name, email, status, country, created_at, updated_at,
             (notes IS NOT NULL AND notes <> '') AS has_notes
      FROM submissions ${where}
      ORDER BY ${order}
      LIMIT ${PAGE_SIZE} OFFSET ${(page - 1) * PAGE_SIZE}`,
    sql`SELECT DISTINCT form FROM submissions ORDER BY form`,
  ]);
  return { count, page, pageSize: PAGE_SIZE, rows, forms: forms.map((f) => f.form) };
}

async function getSubmission(id) {
  const [row] = await sql`SELECT * FROM submissions WHERE id = ${id}`;
  if (!row) throw new HttpError(404, "Not found");
  const [history, related] = await Promise.all([
    sql`
      SELECT a.action, a.detail, a.created_at, u.name AS user_name
      FROM audit_log a LEFT JOIN admin_users u ON u.id = a.user_id
      WHERE a.submission_id = ${id} ORDER BY a.created_at DESC LIMIT 50`,
    // Everything else this person has sent us, so staff see the whole relationship in one place
    row.email
      ? sql`
          SELECT id, form, status, created_at FROM submissions
          WHERE lower(email) = lower(${row.email}) AND id <> ${id}
          ORDER BY created_at DESC LIMIT 20`
      : [],
  ]);
  return { ...row, history, related };
}

async function updateSubmission(req, user, id) {
  const body = await readJson(req);
  const status = text(body.status, 20);
  const notes = typeof body.notes === "string" ? body.notes.slice(0, 5000) : undefined;
  if (status && !STATUSES.includes(status)) throw new HttpError(400, "Invalid status");
  if (!status && notes === undefined) throw new HttpError(400, "Nothing to update");
  // Optional optimistic lock: the updated_at the editor loaded. Stops two staff silently overwriting each other's notes.
  const expected = text(body.expectedUpdatedAt, 40);
  if (expected && Number.isNaN(Date.parse(expected))) throw new HttpError(400, "Invalid expectedUpdatedAt");

  return sql.begin(async (tx) => {
    const [before] = await tx`SELECT status, notes, updated_at FROM submissions WHERE id = ${id} FOR UPDATE`;
    if (!before) throw new HttpError(404, "Not found");
    // Compare at millisecond precision: that is what the browser was sent
    if (expected && before.updated_at.getTime() !== new Date(expected).getTime()) {
      throw new HttpError(409, "Someone else updated this lead while you were editing. Reload to see their changes.");
    }
    const statusChanged = Boolean(status) && status !== before.status;
    const notesChanged = notes !== undefined && notes !== (before.notes ?? "");
    if (!statusChanged && !notesChanged) {
      return { id, status: before.status, notes: before.notes, updated_at: before.updated_at, unchanged: true };
    }
    const [row] = await tx`
      UPDATE submissions SET
        status = ${statusChanged ? status : before.status},
        notes = ${notesChanged ? notes : before.notes},
        updated_at = now()
      WHERE id = ${id}
      RETURNING id, status, notes, updated_at`;
    await tx`
      INSERT INTO audit_log (user_id, action, submission_id, detail)
      VALUES (${user.id}, 'update_submission', ${id}, ${tx.json({
        ...(statusChanged ? { status: [before.status, status] } : {}),
        ...(notesChanged ? { notes: true } : {}),
      })})`;
    return row;
  });
}

async function bulkUpdate(req, user) {
  const body = await readJson(req);
  const status = text(body.status, 20);
  if (!STATUSES.includes(status)) throw new HttpError(400, "Invalid status");
  const ids = Array.isArray(body.ids) ? [...new Set(body.ids.map(Number).filter((n) => Number.isSafeInteger(n) && n > 0))] : [];
  if (!ids.length) throw new HttpError(400, "No leads selected");
  if (ids.length > BULK_MAX) throw new HttpError(400, `At most ${BULK_MAX} leads at a time`);

  // One statement: lock the rows that actually change, update them, and write one audit row each
  const changed = await sql`
    WITH before AS (
      SELECT id, status FROM submissions
      WHERE id = ANY(${ids}::bigint[]) AND status <> ${status}
      FOR UPDATE
    ), upd AS (
      UPDATE submissions s SET status = ${status}, updated_at = now()
      FROM before b WHERE s.id = b.id
      RETURNING s.id, b.status AS old
    )
    INSERT INTO audit_log (user_id, action, submission_id, detail)
    SELECT ${user.id}, 'update_submission', id, jsonb_build_object('status', jsonb_build_array(old, ${status}::text), 'bulk', true)
    FROM upd
    RETURNING submission_id`;
  return { updated: changed.length };
}

async function deleteSubmission(user, id) {
  requireAdmin(user);
  const [row] = await sql`DELETE FROM submissions WHERE id = ${id} RETURNING form, email`;
  if (!row) throw new HttpError(404, "Not found");
  // Keep proof of the erasure without keeping the personal data
  await audit(user.id, "delete_submission", { submissionId: id, detail: { form: row.form } });
  return { ok: true };
}

async function exportCsv(res, user, url) {
  requireAdmin(user);
  const rows = await sql`
    SELECT id, created_at, form, status, name, email, country, notes, data
    FROM submissions ${filters(url)} ORDER BY created_at DESC LIMIT 20000`;
  await audit(user.id, "export", { detail: { rows: rows.length, query: url.search } });
  send(res, 200, toCsv(rows, ["id", "created_at", "form", "status", "name", "email", "country", "notes", "data"]), {
    "Content-Type": "text/csv; charset=utf-8",
    "Content-Disposition": `attachment; filename="traverseminds-leads-${new Date().toISOString().slice(0, 10)}.csv"`,
  });
}

// ── users ────────────────────────────────────────────────────────────────

const listUsers = () => sql`SELECT id, email, name, role, active, last_login_at, created_at FROM admin_users ORDER BY created_at`;

async function createUser(req, user) {
  requireAdmin(user);
  const body = await readJson(req);
  const email = text(body.email, 254)?.toLowerCase();
  const name = text(body.name, 120);
  const role = ROLES.includes(body.role) ? body.role : "viewer";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "A valid email is required");
  if (!name) throw new HttpError(400, "Name is required");
  const weak = checkPasswordStrength(body.password);
  if (weak) throw new HttpError(400, weak);
  try {
    const [created] = await sql`
      INSERT INTO admin_users (email, name, role, password_hash)
      VALUES (${email}, ${name}, ${role}, ${await hashPassword(body.password)})
      RETURNING id, email, name, role, active, created_at`;
    await audit(user.id, "create_user", { detail: { email, role } });
    return created;
  } catch (err) {
    if (err.code === "23505") throw new HttpError(409, "A user with that email already exists");
    throw err;
  }
}

async function updateUser(req, user, id) {
  requireAdmin(user);
  const body = await readJson(req);
  const role = body.role === undefined ? undefined : ROLES.includes(body.role) ? body.role : null;
  if (role === null) throw new HttpError(400, "Invalid role");
  const active = typeof body.active === "boolean" ? body.active : undefined;
  if (id === user.id && (active === false || role === "viewer")) throw new HttpError(400, "You cannot demote or deactivate yourself");

  let passwordHash;
  if (body.password !== undefined) {
    const weak = checkPasswordStrength(body.password);
    if (weak) throw new HttpError(400, weak);
    passwordHash = await hashPassword(body.password);
  }
  const [row] = await sql`
    UPDATE admin_users SET
      role = coalesce(${role ?? null}, role),
      active = coalesce(${active ?? null}, active),
      password_hash = coalesce(${passwordHash ?? null}, password_hash)
    WHERE id = ${id}
    RETURNING id, email, name, role, active, last_login_at, created_at`;
  if (!row) throw new HttpError(404, "Not found");
  // Deactivation or password reset signs the user out everywhere
  if (active === false || passwordHash) await sql`DELETE FROM admin_sessions WHERE user_id = ${id}`;
  await audit(user.id, "update_user", { detail: { userId: id, role, active, passwordReset: Boolean(passwordHash) } });
  return row;
}

async function changeOwnPassword(req, user) {
  const body = await readJson(req);
  const [row] = await sql`SELECT password_hash FROM admin_users WHERE id = ${user.id}`;
  if (!(await verifyPassword(String(body.current ?? ""), row.password_hash))) throw new HttpError(400, "Current password is incorrect");
  const weak = checkPasswordStrength(body.next);
  if (weak) throw new HttpError(400, weak);
  await sql`UPDATE admin_users SET password_hash = ${await hashPassword(body.next)} WHERE id = ${user.id}`;
  await audit(user.id, "change_password");
  return { ok: true };
}

async function auditLog(user, url) {
  requireAdmin(user);
  const page = Math.max(Number(url.searchParams.get("page")) || 1, 1);
  const action = text(url.searchParams.get("action"), 40);
  const where = action ? sql`WHERE a.action = ${action}` : sql``;
  const [[{ count }], rows, actions] = await Promise.all([
    sql`SELECT count(*)::int AS count FROM audit_log a ${where}`,
    sql`
      SELECT a.id, a.action, a.submission_id, a.detail, a.created_at, u.name AS user_name, t.name AS target_name
      FROM audit_log a
      LEFT JOIN admin_users u ON u.id = a.user_id
      LEFT JOIN admin_users t ON a.action = 'update_user' AND t.id = (a.detail->>'userId')::bigint
      ${where}
      ORDER BY a.created_at DESC
      LIMIT ${AUDIT_PAGE_SIZE} OFFSET ${(page - 1) * AUDIT_PAGE_SIZE}`,
    sql`SELECT DISTINCT action FROM audit_log ORDER BY action`,
  ]);
  return { count, page, pageSize: AUDIT_PAGE_SIZE, rows, actions: actions.map((a) => a.action) };
}

/** Routes /admin/api/*. Returns true if handled. */
export async function handleAdminApi(req, res, url) {
  const path = url.pathname.replace(/^\/admin\/api/, "");
  checkOrigin(req);

  if (path === "/login" && req.method === "POST") {
    await login(req, res);
    return true;
  }
  if (path === "/logout" && req.method === "POST") {
    await destroySession(req);
    return send(res, 200, { ok: true }, { "Set-Cookie": clearCookie(secure) }), true;
  }

  const user = await requireUser(req);
  const idMatch = path.match(/^\/(submissions|users)\/(\d+)$/);
  const id = idMatch ? Number(idMatch[2]) : null;

  const routes = {
    "GET /me": () => user,
    "POST /password": () => changeOwnPassword(req, user),
    "GET /stats": () => stats(),
    "GET /badge": () => badge(),
    "GET /submissions": () => listSubmissions(url),
    "PATCH /submissions": () => bulkUpdate(req, user),
    "GET /export.csv": () => exportCsv(res, user, url),
    "GET /users": () => (requireAdmin(user), listUsers()),
    "POST /users": () => createUser(req, user),
    "GET /audit": () => auditLog(user, url),
    "GET /meta": () => ({ statuses: STATUSES, roles: ROLES }),
  };
  const key = `${req.method} ${idMatch ? `/${idMatch[1]}/:id` : path}`;
  const idRoutes = {
    "GET /submissions/:id": () => getSubmission(id),
    "PATCH /submissions/:id": () => updateSubmission(req, user, id),
    "DELETE /submissions/:id": () => deleteSubmission(user, id),
    "PATCH /users/:id": () => updateUser(req, user, id),
  };

  const handler = routes[key] ?? idRoutes[key];
  if (!handler) return false;
  const result = await handler();
  if (!res.headersSent) send(res, 200, result);
  return true;
}
