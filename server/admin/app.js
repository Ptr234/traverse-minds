// Traverse Minds admin dashboard. No framework, no build step.
// All user data is inserted with textContent (never innerHTML), so submitted HTML is shown as text.

const app = document.getElementById("app");
const state = { user: null, meta: { statuses: [], roles: [] } };

const FORM_LABELS = {
  contact: "Contact", newsletter: "Newsletter", rsvp: "Event RSVP", waitlist: "Public Record waitlist",
  "pricing-enquiry": "Pricing enquiry", "bulk-training-quote": "Bulk training quote", "report-download": "Report download",
  "mentorship-school": "Mentorship: school", "mentorship-student": "Mentorship: student", "mentorship-sponsor": "Mentorship: sponsor",
  "careers-application": "Careers application",
};
const formLabel = (f) => FORM_LABELS[f] ?? f;

// ── tiny DOM helper ──────────────────────────────────────────────────────
function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v == null || v === false) continue;
    if (k.startsWith("on")) el.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "class") el.className = v;
    else el.setAttribute(k, v === true ? "" : v);
  }
  for (const c of children.flat()) if (c != null && c !== false) el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  return el;
}
const svg = (tag, attrs = {}, ...children) => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  for (const c of children) el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  return el;
};

const fmtDate = (iso, withTime = true) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}) });
const chip = (status) => h("span", { class: `chip ${status}` }, status);

// ── API ──────────────────────────────────────────────────────────────────
async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`/admin/api${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
    credentials: "same-origin",
  });
  const data = res.headers.get("content-type")?.includes("json") ? await res.json() : null;
  if (res.status === 401 && path !== "/login") {
    state.user = null;
    renderLogin("Your session has ended. Please sign in again.");
    throw new Error("unauthenticated");
  }
  if (!res.ok) throw new Error(data?.error ?? `Request failed (${res.status})`);
  return data;
}

// ── login ────────────────────────────────────────────────────────────────
function renderLogin(message = "") {
  const error = h("p", { class: "error", role: "alert" }, message);
  const form = h("form", {
    onsubmit: async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const btn = form.querySelector("button");
      btn.disabled = true;
      error.textContent = "";
      try {
        state.user = await api("/login", { method: "POST", body: { email: fd.get("email"), password: fd.get("password") } });
        await boot();
      } catch (err) {
        error.textContent = err.message;
        btn.disabled = false;
      }
    },
  },
    h("label", { class: "field" }, "Email", h("input", { type: "email", name: "email", required: true, autocomplete: "username" })),
    h("label", { class: "field" }, "Password", h("input", { type: "password", name: "password", required: true, autocomplete: "current-password" })),
    h("button", { class: "btn accent", type: "submit" }, "Sign in"),
    error,
  );
  app.replaceChildren(h("div", { class: "login" },
    h("div", { class: "card" },
      h("p", { class: "eyebrow" }, "Traverse Minds Africa"),
      h("h1", {}, "Admin sign in"),
      h("p", { class: "muted" }, "Staff access only."),
      form,
    )));
  form.querySelector("input").focus();
}

// ── shell ────────────────────────────────────────────────────────────────
const NAV = [
  { hash: "#/overview", label: "Overview" },
  { hash: "#/leads", label: "Leads", badge: true },
  { hash: "#/users", label: "Users", admin: true },
  { hash: "#/audit", label: "Audit log", admin: true },
  { hash: "#/account", label: "My account" },
];

function shell(content, newCount) {
  const current = location.hash.split("?")[0].replace(/\/\d+$/, "") || "#/overview";
  return h("div", { class: "shell" },
    h("aside", { class: "sidebar" },
      h("div", { class: "brand" }, "Traverse", h("span", {}, "Minds"), h("small", {}, "Admin")),
      h("nav", { class: "nav", "aria-label": "Admin" },
        NAV.filter((n) => !n.admin || state.user.role === "admin").map((n) =>
          h("a", { href: n.hash, class: current === n.hash ? "active" : null, "aria-current": current === n.hash ? "page" : null },
            n.label, n.badge && newCount ? h("span", { class: "count", title: "New leads" }, newCount) : null))),
      h("div", { class: "sidebar-foot" }, h("strong", {}, state.user.name), state.user.role)),
    h("main", { class: "main" }, content));
}

const pageHead = (eyebrow, title, ...right) =>
  h("div", { class: "page-head" }, h("div", {}, h("p", { class: "eyebrow" }, eyebrow), h("h1", {}, title)), h("div", { class: "actions" }, ...right));

// ── overview ─────────────────────────────────────────────────────────────
function dailyChart(daily) {
  // Draw at roughly the on-screen width so axis text keeps its real size on phones
  const W = Math.max(280, Math.min(640, window.innerWidth - 96)), H = 200, P = { t: 12, r: 8, b: 24, l: 28 };
  const max = Math.max(1, ...daily.map((d) => d.count));
  const step = max <= 5 ? 1 : Math.ceil(max / 4);
  const top = Math.ceil(max / step) * step;
  const bw = (W - P.l - P.r) / daily.length;
  const y = (v) => P.t + (1 - v / top) * (H - P.t - P.b);
  const root = svg("svg", { viewBox: `0 0 ${W} ${H}`, role: "img", "aria-label": "Leads per day, last 30 days" });
  for (let v = 0; v <= top; v += step) {
    root.append(svg("line", { class: "grid-line", x1: P.l, x2: W - P.r, y1: y(v), y2: y(v) }));
    root.append(svg("text", { class: "axis", x: P.l - 6, y: y(v) + 3, "text-anchor": "end" }, v));
  }
  let lastLabelX = -Infinity;
  daily.forEach((d, i) => {
    const x = P.l + i * bw;
    const bar = svg("rect", { class: "bar", x: x + 1, y: y(d.count), width: Math.max(bw - 2, 1), height: Math.max(y(0) - y(d.count), d.count ? 1 : 0) });
    bar.append(svg("title", {}, `${fmtDate(d.day, false)}: ${d.count} lead${d.count === 1 ? "" : "s"}`));
    root.append(bar);
    const labelX = x + bw / 2;
    // A label every week plus today, skipping any that would collide with the previous one
    if ((i % 7 === 0 || i === daily.length - 1) && labelX - lastLabelX > 44) {
      lastLabelX = labelX;
      root.append(svg("text", { class: "axis", x: labelX, y: H - 6, "text-anchor": "middle" },
        new Date(d.day).toLocaleDateString("en-GB", { day: "numeric", month: "short" })));
    }
  });
  return h("div", { class: "chart" }, root);
}

async function renderOverview() {
  const s = await api("/stats");
  const stat = (value, label, accent) => h("div", { class: `card stat${accent ? " accent" : ""}` }, h("div", { class: "value" }, value), h("div", { class: "label" }, label));
  return [shell([
    pageHead("Dashboard", "Overview", h("a", { class: "btn secondary", href: "#/leads?status=new" }, "Review new leads")),
    h("div", { class: "grid grid-4" },
      stat(s.totals.new, "New, not yet contacted", true),
      stat(s.totals.last7, "Leads in the last 7 days"),
      stat(s.totals.last30, "Leads in the last 30 days"),
      stat(s.totals.won, "Won")),
    h("div", { class: "grid grid-2", style: null },
      h("div", { class: "card" }, h("h2", {}, "Leads per day"), h("p", { class: "muted small" }, "Last 30 days, excluding spam"), dailyChart(s.daily)),
      h("div", { class: "card" }, h("h2", {}, "By form"),
        s.byForm.length
          ? h("table", {},
              h("thead", {}, h("tr", {}, h("th", {}, "Form"), h("th", { class: "num" }, "New"), h("th", { class: "num" }, "30 days"), h("th", { class: "num" }, "Total"))),
              h("tbody", {}, s.byForm.map((f) => h("tr", { class: "link", onclick: () => (location.hash = `#/leads?form=${encodeURIComponent(f.form)}`) },
                h("td", {}, formLabel(f.form)), h("td", { class: "num" }, f.new), h("td", { class: "num" }, f.last30), h("td", { class: "num" }, f.total)))))
          : h("p", { class: "empty" }, "No leads yet."))),
    h("div", { class: "card", style: null },
      h("h2", {}, "Latest leads"),
      leadTable(s.recent)),
  ], s.totals.new)];
}

function leadTable(rows) {
  if (!rows.length) return h("p", { class: "empty" }, "No leads match.");
  return h("div", { class: "table-wrap" }, h("table", {},
    h("thead", {}, h("tr", {}, h("th", {}, "Received"), h("th", {}, "Form"), h("th", {}, "Name"), h("th", {}, "Email"), h("th", {}, "Status"))),
    h("tbody", {}, rows.map((r) => h("tr", { class: "link", onclick: () => (location.hash = `#/leads/${r.id}`) },
      h("td", { class: "nowrap" }, fmtDate(r.created_at)),
      h("td", {}, h("span", { class: "tag" }, formLabel(r.form))),
      h("td", {}, r.name ?? "—", r.has_notes ? h("span", { class: "muted small", title: "Has notes" }, "  ✎") : null),
      h("td", {}, r.email ?? "—"),
      h("td", {}, chip(r.status)))))));
}

// ── leads list ───────────────────────────────────────────────────────────
async function renderLeads(params) {
  const page = Number(params.get("page")) || 1;
  const data = await api(`/submissions?${params}`);
  const stats = await api("/stats");

  const set = (k, v) => {
    const p = new URLSearchParams(params);
    v ? p.set(k, v) : p.delete(k);
    if (k !== "page") p.delete("page");
    location.hash = `#/leads?${p}`;
  };
  const search = h("input", { type: "search", placeholder: "Search name, email, message, notes…", value: params.get("q") ?? "", "aria-label": "Search leads" });
  search.addEventListener("keydown", (e) => e.key === "Enter" && set("q", search.value.trim()));

  const exportParams = new URLSearchParams(params);
  exportParams.delete("page");
  const pages = Math.max(1, Math.ceil(data.count / data.pageSize));

  return [shell([
    pageHead("Leads", `${data.count} ${data.count === 1 ? "lead" : "leads"}`,
      h("a", { class: "btn secondary", href: `/admin/api/export.csv?${exportParams}`, download: true }, "Export CSV")),
    h("div", { class: "filters" },
      search,
      h("select", { "aria-label": "Form", onchange: (e) => set("form", e.target.value) },
        h("option", { value: "" }, "All forms"),
        data.forms.map((f) => h("option", { value: f, selected: params.get("form") === f }, formLabel(f)))),
      h("select", { "aria-label": "Status", onchange: (e) => set("status", e.target.value) },
        h("option", { value: "" }, "All statuses"),
        state.meta.statuses.map((s) => h("option", { value: s, selected: params.get("status") === s }, s))),
      h("input", { type: "date", "aria-label": "From", value: params.get("from") ?? "", onchange: (e) => set("from", e.target.value) }),
      h("input", { type: "date", "aria-label": "To", value: params.get("to") ?? "", onchange: (e) => set("to", e.target.value) }),
      [...params.keys()].some((k) => k !== "page") ? h("a", { class: "btn secondary", href: "#/leads" }, "Clear") : null),
    leadTable(data.rows),
    pages > 1 ? h("div", { class: "pager" },
      h("button", { class: "btn secondary", disabled: page <= 1, onclick: () => set("page", String(page - 1)) }, "← Previous"),
      h("span", { class: "muted" }, `Page ${page} of ${pages}`),
      h("button", { class: "btn secondary", disabled: page >= pages, onclick: () => set("page", String(page + 1)) }, "Next →")) : null,
  ], stats.totals.new)];
}

// ── lead detail ──────────────────────────────────────────────────────────
const humanKey = (k) => k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ");
const valueText = (v) =>
  v == null || v === "" ? "—"
  : Array.isArray(v) ? v.join(", ")
  : typeof v === "object" ? (v.file ? `${v.file} (${Math.round(v.size / 1024)} KB, attached to the notification email)` : JSON.stringify(v, null, 2))
  : String(v);

async function renderLead(id) {
  const [lead, stats] = await Promise.all([api(`/submissions/${id}`), api("/stats")]);
  const msg = h("p", { class: "error", role: "status" });

  const status = h("select", { "aria-label": "Status" }, state.meta.statuses.map((s) => h("option", { value: s, selected: lead.status === s }, s)));
  const notes = h("textarea", { placeholder: "Internal notes: calls, quotes sent, next steps…", "aria-label": "Notes" });
  notes.value = lead.notes ?? "";

  const save = h("button", {
    class: "btn accent",
    onclick: async () => {
      save.disabled = true;
      msg.textContent = "";
      try {
        await api(`/submissions/${id}`, { method: "PATCH", body: { status: status.value, notes: notes.value } });
        msg.style.color = "var(--ok)";
        msg.textContent = "Saved.";
        setTimeout(route, 600);
      } catch (err) {
        msg.style.color = "";
        msg.textContent = err.message;
      } finally {
        save.disabled = false;
      }
    },
  }, "Save changes");

  const phone = lead.data?.phone ? String(lead.data.phone).replace(/[^\d+]/g, "") : null;
  const waPhone = phone ? (phone.startsWith("0") ? `256${phone.slice(1)}` : phone.replace(/^\+/, "")) : null;
  const firstName = (lead.name ?? "").split(" ")[0];

  const del = state.user.role === "admin" ? h("button", {
    class: "btn danger",
    onclick: async () => {
      const typed = prompt(`This permanently deletes this person's data (e.g. for a data-protection request).\nType DELETE to confirm.`);
      if (typed !== "DELETE") return;
      try {
        await api(`/submissions/${id}`, { method: "DELETE" });
        location.hash = "#/leads";
      } catch (err) {
        msg.textContent = err.message;
      }
    },
  }, "Delete data") : null;

  const fields = Object.entries(lead.data ?? {});
  return [shell([
    h("p", {}, h("a", { href: "#/leads", class: "muted small" }, "← All leads")),
    pageHead(formLabel(lead.form), lead.name ?? lead.email ?? `Lead #${lead.id}`, chip(lead.status)),
    h("div", { class: "detail" },
      h("div", { class: "card" },
        h("h2", {}, "Submission"),
        h("p", { class: "muted small" }, `Received ${fmtDate(lead.created_at)}${lead.country ? ` · from ${lead.country}` : ""} · #${lead.id}`),
        h("dl", { class: "fields" }, fields.flatMap(([k, v]) => [h("dt", {}, humanKey(k)), h("dd", {}, valueText(v))])),
      ),
      h("div", { class: "grid" },
        h("div", { class: "card" },
          h("h2", {}, "Follow up"),
          h("div", { class: "actions" },
            lead.email ? h("a", { class: "btn", href: `mailto:${lead.email}?subject=${encodeURIComponent(`Re: your ${formLabel(lead.form).toLowerCase()} — Traverse Minds Africa`)}&body=${encodeURIComponent(`Hi ${firstName},\n\n`)}` }, "Reply by email") : null,
            waPhone ? h("a", { class: "btn secondary", href: `https://wa.me/${waPhone}`, target: "_blank", rel: "noopener noreferrer" }, "WhatsApp") : null)),
        h("div", { class: "card" },
          h("h2", {}, "Status & notes"),
          h("div", { class: "grid" }, h("label", { class: "field" }, "Status", status), h("label", { class: "field" }, "Notes", notes)),
          h("div", { class: "actions", style: null }, save, del),
          msg),
        h("div", { class: "card" },
          h("h2", {}, "History"),
          lead.history.length
            ? h("ul", { class: "history" }, lead.history.map((e) => h("li", {},
                h("strong", {}, e.user_name ?? "System"), ` ${e.action.replace(/_/g, " ")}`,
                e.detail?.status ? ` (${e.detail.status.join(" → ")})` : "",
                h("div", { class: "muted" }, fmtDate(e.created_at)))))
            : h("p", { class: "muted small" }, "No changes yet."))),
    ),
  ], stats.totals.new)];
}

// ── users ────────────────────────────────────────────────────────────────
async function renderUsers() {
  const [users, stats] = await Promise.all([api("/users"), api("/stats")]);
  const msg = h("p", { class: "error", role: "status" });
  const form = h("form", {
    class: "form-grid",
    onsubmit: async (e) => {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(form));
      try {
        await api("/users", { method: "POST", body: fd });
        route();
      } catch (err) {
        msg.textContent = err.message;
      }
    },
  },
    h("label", { class: "field" }, "Name", h("input", { type: "text", name: "name", required: true })),
    h("label", { class: "field" }, "Email", h("input", { type: "email", name: "email", required: true })),
    h("label", { class: "field" }, "Role", h("select", { name: "role" }, state.meta.roles.map((r) => h("option", { value: r, selected: r === "viewer" }, r)))),
    h("label", { class: "field" }, "Temporary password (12+ chars)", h("input", { type: "password", name: "password", required: true, minlength: "12", autocomplete: "new-password" })),
    h("button", { class: "btn accent", type: "submit" }, "Add user"));

  const update = async (id, body) => {
    try {
      await api(`/users/${id}`, { method: "PATCH", body });
      route();
    } catch (err) {
      msg.textContent = err.message;
    }
  };

  return [shell([
    pageHead("Team", "Users"),
    h("div", { class: "table-wrap" }, h("table", {},
      h("thead", {}, h("tr", {}, h("th", {}, "Name"), h("th", {}, "Email"), h("th", {}, "Role"), h("th", {}, "Last sign-in"), h("th", {}, ""))),
      h("tbody", {}, users.map((u) => h("tr", {},
        h("td", {}, u.name, u.active ? null : h("span", { class: "muted small" }, "  (deactivated)")),
        h("td", {}, u.email),
        h("td", {}, h("select", { "aria-label": `Role for ${u.name}`, disabled: u.id === state.user.id, onchange: (e) => update(u.id, { role: e.target.value }) },
          state.meta.roles.map((r) => h("option", { value: r, selected: u.role === r }, r)))),
        h("td", { class: "nowrap" }, u.last_login_at ? fmtDate(u.last_login_at) : "Never"),
        h("td", { class: "actions" },
          h("button", { class: "btn secondary", onclick: () => {
            const pw = prompt(`New temporary password for ${u.name} (12+ characters):`);
            if (pw) update(u.id, { password: pw });
          } }, "Reset password"),
          u.id === state.user.id ? null : h("button", { class: u.active ? "btn danger" : "btn secondary", onclick: () => update(u.id, { active: !u.active }) }, u.active ? "Deactivate" : "Reactivate"))))))),
    msg,
    h("div", { class: "card", style: null }, h("h2", {}, "Add a team member"), h("p", { class: "muted small" }, "Viewers can see and update leads. Admins can also delete data, export, and manage users."), form),
  ], stats.totals.new)];
}

// ── audit ────────────────────────────────────────────────────────────────
async function renderAudit() {
  const [rows, stats] = await Promise.all([api("/audit"), api("/stats")]);
  return [shell([
    pageHead("Accountability", "Audit log"),
    h("div", { class: "table-wrap" }, h("table", {},
      h("thead", {}, h("tr", {}, h("th", {}, "When"), h("th", {}, "Who"), h("th", {}, "Action"), h("th", {}, "Lead"), h("th", {}, "Detail"))),
      h("tbody", {}, rows.map((r) => h("tr", {},
        h("td", { class: "nowrap" }, fmtDate(r.created_at)),
        h("td", {}, r.user_name ?? "—"),
        h("td", {}, r.action.replace(/_/g, " ")),
        h("td", {}, r.submission_id ? h("a", { href: `#/leads/${r.submission_id}` }, `#${r.submission_id}`) : "—"),
        h("td", { class: "muted small" }, r.detail ? JSON.stringify(r.detail) : ""))))))
  ], stats.totals.new)];
}

// ── account ──────────────────────────────────────────────────────────────
async function renderAccount() {
  const stats = await api("/stats");
  const msg = h("p", { class: "error", role: "status" });
  const form = h("form", {
    class: "grid",
    onsubmit: async (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      if (fd.get("next") !== fd.get("repeat")) return (msg.textContent = "New passwords do not match.");
      try {
        await api("/password", { method: "POST", body: { current: fd.get("current"), next: fd.get("next") } });
        form.reset();
        msg.style.color = "var(--ok)";
        msg.textContent = "Password changed.";
      } catch (err) {
        msg.style.color = "";
        msg.textContent = err.message;
      }
    },
  },
    h("label", { class: "field" }, "Current password", h("input", { type: "password", name: "current", required: true, autocomplete: "current-password" })),
    h("label", { class: "field" }, "New password (12+ characters)", h("input", { type: "password", name: "next", required: true, minlength: "12", autocomplete: "new-password" })),
    h("label", { class: "field" }, "Repeat new password", h("input", { type: "password", name: "repeat", required: true, autocomplete: "new-password" })),
    h("div", { class: "actions" }, h("button", { class: "btn accent", type: "submit" }, "Change password")),
    msg);

  return [shell([
    pageHead("Account", state.user.name),
    h("div", { class: "grid grid-2" },
      h("div", { class: "card" }, h("h2", {}, "Change password"), form),
      h("div", { class: "card" },
        h("h2", {}, "Signed in as"),
        h("p", {}, state.user.email, h("br"), h("span", { class: "muted" }, `Role: ${state.user.role}`)),
        h("button", { class: "btn secondary", onclick: async () => {
          await api("/logout", { method: "POST" });
          state.user = null;
          renderLogin("Signed out.");
        } }, "Sign out"))),
  ], stats.totals.new)];
}

// ── router ───────────────────────────────────────────────────────────────
async function route() {
  if (!state.user) return;
  const [path, query = ""] = location.hash.replace(/^#/, "").split("?");
  const params = new URLSearchParams(query);
  try {
    let view;
    const lead = path.match(/^\/leads\/(\d+)$/);
    if (lead) view = await renderLead(lead[1]);
    else if (path === "/leads") view = await renderLeads(params);
    else if (path === "/users" && state.user.role === "admin") view = await renderUsers();
    else if (path === "/audit" && state.user.role === "admin") view = await renderAudit();
    else if (path === "/account") view = await renderAccount();
    else view = await renderOverview();
    app.replaceChildren(...view);
    window.scrollTo(0, 0);
  } catch (err) {
    if (err.message !== "unauthenticated") {
      app.replaceChildren(h("div", { class: "login" }, h("div", { class: "card" }, h("h1", {}, "Something went wrong"), h("p", { class: "error" }, err.message), h("a", { class: "btn", href: "#/overview" }, "Back to overview"))));
    }
  }
}

async function boot() {
  try {
    state.user ??= await api("/me");
    state.meta = await api("/meta");
    if (!location.hash) location.hash = "#/overview";
    await route();
  } catch (err) {
    if (err.message !== "unauthenticated") renderLogin();
  }
}

window.addEventListener("hashchange", route);
boot();
