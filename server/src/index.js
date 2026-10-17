// Traverse Minds submissions service: stores website form submissions in Postgres and serves the admin dashboard.
//
//   POST  /submissions          (INGEST_TOKEN)  store one submission — called by the Cloudflare functions
//   GET   /submissions          (ADMIN_TOKEN)   list for scripts: ?form=&status=&since=YYYY-MM-DD&limit=&format=csv
//   GET   /admin                                admin dashboard (staff accounts, see src/cli.js)
//   *     /admin/api/*                          dashboard JSON API (session cookie)
//   GET   /health                               liveness + database check

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import { sql, migrate, STATUSES } from "./db.js";
import { HttpError, send, readJson, bearerMatches, text, toCsv } from "./http.js";
import { handleAdminApi } from "./admin-api.js";

// HOST=127.0.0.1 on a shared server so only the local reverse proxy can reach us; 0.0.0.0 inside Docker
const { INGEST_TOKEN, ADMIN_TOKEN, PORT = "8080", HOST = "0.0.0.0" } = process.env;

if (!INGEST_TOKEN || !ADMIN_TOKEN) {
  console.error("INGEST_TOKEN and ADMIN_TOKEN must be set");
  process.exit(1);
}
if (INGEST_TOKEN === ADMIN_TOKEN) {
  console.error("INGEST_TOKEN and ADMIN_TOKEN must be different");
  process.exit(1);
}

// ── token API (machine-to-machine) ─────────────────────────────────────────

async function ingest(req, res) {
  if (!bearerMatches(req, INGEST_TOKEN)) throw new HttpError(401, "Unauthorized");
  const body = await readJson(req);
  const form = text(body.form, 60);
  if (!form || !/^[a-z0-9-]+$/.test(form)) throw new HttpError(400, "Invalid form");
  if (!body.data || typeof body.data !== "object" || Array.isArray(body.data)) throw new HttpError(400, "Invalid data");

  const [row] = await sql`
    INSERT INTO submissions (form, email, name, data, country)
    VALUES (${form}, ${text(body.email, 254)}, ${text(body.name, 200)}, ${sql.json(body.data)}, ${text(body.country, 2)})
    RETURNING id`;
  send(res, 201, { id: row.id });
}

async function tokenList(req, res, url) {
  if (!bearerMatches(req, ADMIN_TOKEN)) throw new HttpError(401, "Unauthorized");
  const form = text(url.searchParams.get("form"), 60);
  const status = text(url.searchParams.get("status"), 20);
  const since = text(url.searchParams.get("since"), 10);
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit")) || 100, 1), 5000);
  if (status && !STATUSES.includes(status)) throw new HttpError(400, "Invalid status");
  if (since && !/^\d{4}-\d{2}-\d{2}$/.test(since)) throw new HttpError(400, "since must be YYYY-MM-DD");

  const rows = await sql`
    SELECT id, form, email, name, data, country, status, notes, created_at
    FROM submissions
    WHERE true
      ${form ? sql`AND form = ${form}` : sql``}
      ${status ? sql`AND status = ${status}` : sql``}
      ${since ? sql`AND created_at >= ${since}::date` : sql``}
    ORDER BY created_at DESC
    LIMIT ${limit}`;

  if (url.searchParams.get("format") === "csv") {
    return send(res, 200, toCsv(rows, ["id", "created_at", "form", "status", "name", "email", "country", "notes", "data"]), {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="submissions-${new Date().toISOString().slice(0, 10)}.csv"`,
    });
  }
  send(res, 200, { count: rows.length, submissions: rows });
}

// ── dashboard static files ─────────────────────────────────────────────────

const ADMIN_FILES = { "/admin": "index.html", "/admin/": "index.html", "/admin/app.js": "app.js", "/admin/app.css": "app.css" };
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8" };
const CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'";

async function serveAdminFile(res, file) {
  const body = await readFile(new URL(`../admin/${file}`, import.meta.url));
  send(res, 200, body, { "Content-Type": TYPES[extname(file)], "Content-Security-Policy": CSP });
}

// ── server ─────────────────────────────────────────────────────────────────

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", "http://localhost");
  try {
    if (req.method === "GET" && url.pathname === "/health") {
      await sql`SELECT 1`;
      return send(res, 200, { ok: true });
    }
    if (url.pathname === "/submissions") {
      if (req.method === "POST") return await ingest(req, res);
      if (req.method === "GET") return await tokenList(req, res, url);
    }
    if (url.pathname.startsWith("/admin/api/")) {
      if (await handleAdminApi(req, res, url)) return;
      throw new HttpError(404, "Not found");
    }
    if (req.method === "GET" && ADMIN_FILES[url.pathname]) return await serveAdminFile(res, ADMIN_FILES[url.pathname]);
    if (req.method === "GET" && url.pathname === "/") return send(res, 302, "", { Location: "/admin" });
    if (req.method === "GET" && url.pathname === "/favicon.ico") return send(res, 204, "");
    throw new HttpError(404, "Not found");
  } catch (err) {
    if (!(err instanceof HttpError)) console.error(err);
    if (!res.headersSent) send(res, err.status ?? 500, { error: err.status ? err.message : "Server error" });
  }
});

await migrate();
server.listen(Number(PORT), HOST, () => console.log(`Submissions service listening on ${HOST}:${PORT}`));

for (const signal of ["SIGTERM", "SIGINT"]) {
  process.on(signal, () => server.close(() => sql.end().then(() => process.exit(0))));
}
