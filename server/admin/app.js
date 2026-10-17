// Traverse Minds admin dashboard. No framework, no build step.
// All user data is inserted with textContent (never innerHTML), so submitted HTML is shown as text.
// The CSP forbids inline style attributes, so dynamic sizes are set through el.style (CSSOM), never h(..., { style }).

const app = document.getElementById("app");
const state = { user: null, meta: { statuses: [], roles: [] }, newCount: 0, lastLeadsHash: "#/leads" };

const FORM_LABELS = {
  contact: "Contact", newsletter: "Newsletter", rsvp: "Event RSVP", waitlist: "Public Record waitlist",
  "pricing-enquiry": "Pricing enquiry", "bulk-training-quote": "Bulk training quote", "report-download": "Report download",
  "mentorship-school": "Mentorship: school", "mentorship-student": "Mentorship: student", "mentorship-sponsor": "Mentorship: sponsor",
  "careers-application": "Careers application",
};
const formLabel = (f) => FORM_LABELS[f] ?? f;
const isAdmin = () => state.user?.role === "admin";

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
const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;
function ago(iso) {
  const mins = Math.round((Date.now() - new Date(iso)) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 48) return `${plural(hrs, "hour")} ago`;
  return `${plural(Math.round(hrs / 24), "day")} ago`;
}
const fmtHours = (hrs) => (hrs == null ? "—" : hrs < 1 ? `${Math.max(1, Math.round(hrs * 60))} min` : hrs < 48 ? `${hrs.toFixed(hrs < 10 ? 1 : 0)} h` : `${(hrs / 24).toFixed(1)} days`);
const chip = (status) => h("span", { class: `chip ${status}` }, status);

// ── toast ────────────────────────────────────────────────────────────────
let toastTimer;
function toast(message, kind = "ok") {
  let el = document.getElementById("toast");
  if (!el) document.body.append((el = h("div", { id: "toast", role: "status", "aria-live": "polite" })));
  el.className = `toast ${kind} show`;
  el.textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 3200);
}

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
  if (!res.ok) throw Object.assign(new Error(data?.error ?? `Request failed (${res.status})`), { status: res.status });
  return data;
}

async function loadBadge() {
  try {
    state.newCount = (await api("/badge")).new;
  } catch {
    // The badge is decoration; never let it break a page
  }
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

function shell(content) {
  const current = location.hash.split("?")[0].replace(/\/\d+$/, "") || "#/overview";
  return h("div", { class: "shell" },
    h("aside", { class: "sidebar" },
      h("div", { class: "brand" }, "Traverse", h("span", {}, "Minds"), h("small", {}, "Admin")),
      h("nav", { class: "nav", "aria-label": "Admin" },
        NAV.filter((n) => !n.admin || isAdmin()).map((n) =>
          h("a", { href: n.hash === "#/leads" ? state.lastLeadsHash : n.hash, class: current === n.hash ? "active" : null, "aria-current": current === n.hash ? "page" : null },
            n.label, n.badge && state.newCount ? h("span", { class: "count", title: "New leads" }, state.newCount) : null))),
      h("div", { class: "sidebar-foot" }, h("strong", {}, state.user.name), state.user.role)),
    h("main", { class: "main" }, content));
}

const pageHead = (eyebrow, title, ...right) =>
  h("div", { class: "page-head" }, h("div", {}, h("p", { class: "eyebrow" }, eyebrow), h("h1", {}, title)), h("div", { class: "actions" }, ...right));

function pager(page, pages, go) {
  if (pages <= 1) return null;
  return h("div", { class: "pager" },
    h("button", { class: "btn secondary", disabled: page <= 1, onclick: () => go(page - 1) }, "← Previous"),
    h("span", { class: "muted" }, `Page ${page} of ${pages}`),
    h("button", { class: "btn secondary", disabled: page >= pages, onclick: () => go(page + 1) }, "Next →"));
}

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
    bar.append(svg("title", {}, `${fmtDate(d.day, false)}: ${plural(d.count, "lead")}`));
    // Click a day to see its leads
    bar.addEventListener("click", () => (location.hash = `#/leads?from=${d.day}&to=${d.day}`));
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

/** Horizontal bars, one per status, linking to the filtered lead list. */
function pipeline(byStatus) {
  const counts = Object.fromEntries(byStatus.map((s) => [s.status, s.count]));
  const max = Math.max(1, ...byStatus.map((s) => s.count));
  return h("ul", { class: "pipeline" }, state.meta.statuses.map((s) => {
    const fill = h("span", { class: `fill ${s}` });
    fill.style.width = `${((counts[s] ?? 0) / max) * 100}%`;
    return h("li", {}, h("a", { href: `#/leads?status=${s}` },
      h("span", { class: "label" }, s),
      h("span", { class: "track" }, fill),
      h("span", { class: "num" }, counts[s] ?? 0)));
  }));
}

function trend(now, before) {
  if (!before && !now) return null;
  if (!before) return h("span", { class: "trend up" }, "new this week");
  const pct = Math.round(((now - before) / before) * 100);
  if (pct === 0) return h("span", { class: "trend" }, "same as the week before");
  return h("span", { class: `trend ${pct > 0 ? "up" : "down"}` }, `${pct > 0 ? "▲" : "▼"} ${Math.abs(pct)}% vs the week before`);
}

async function renderOverview() {
  const s = await api("/stats");
  state.newCount = s.byStatus.find((b) => b.status === "new")?.count ?? 0;
  const t = s.totals;
  const closed = t.won + t.lost;
  const stat = (value, label, sub, accent) =>
    h("div", { class: `card stat${accent ? " accent" : ""}` }, h("div", { class: "value" }, value), h("div", { class: "label" }, label), sub ? h("div", { class: "sub" }, sub) : null);

  return [
    pageHead("Dashboard", "Overview", h("a", { class: "btn secondary", href: "#/leads?status=new&sort=oldest" }, "Work the queue")),
    t.stale
      ? h("a", { class: "notice warn", href: "#/leads?status=new&sort=oldest" },
          h("strong", {}, `${plural(t.stale, "lead")} waiting more than 48 hours.`), " Oldest first →")
      : null,
    h("div", { class: "grid grid-4" },
      stat(t.new, "New, not yet contacted", t.stale ? `${t.stale} older than 48 h` : "Nothing overdue", true),
      stat(t.last7, "Leads in the last 7 days", trend(t.last7, t.prev7)),
      stat(closed ? `${Math.round((t.won / closed) * 100)}%` : "—", "Win rate", closed ? `${t.won} won of ${closed} closed` : "No leads closed yet"),
      stat(fmtHours(s.response.median_hours), "Median first response",
        s.response.sample ? `Across ${plural(s.response.sample, "lead")}, last 30 days` : "No responses logged yet")),
    h("div", { class: "grid grid-2" },
      h("div", { class: "card" }, h("h2", {}, "Leads per day"), h("p", { class: "muted small" }, `Last 30 days, excluding spam · ${t.last30} total · click a bar to open that day`), dailyChart(s.daily)),
      h("div", { class: "card" }, h("h2", {}, "Pipeline"), h("p", { class: "muted small" }, "All time"), pipeline(s.byStatus))),
    h("div", { class: "grid grid-2" },
      h("div", { class: "card flush" },
        h("div", { class: "card-head" }, h("h2", {}, "Latest leads"), h("a", { class: "muted small", href: "#/leads" }, "View all →")),
        leadTable(s.recent)),
      h("div", { class: "card flush" },
        h("div", { class: "card-head" }, h("h2", {}, "By form")),
        s.byForm.length
          ? h("table", {},
              h("thead", {}, h("tr", {}, h("th", {}, "Form"), h("th", { class: "num" }, "New"), h("th", { class: "num" }, "30 days"), h("th", { class: "num" }, "Total"))),
              h("tbody", {}, s.byForm.map((f) => h("tr", { class: "link", onclick: () => (location.hash = `#/leads?form=${encodeURIComponent(f.form)}`) },
                h("td", {}, formLabel(f.form)), h("td", { class: "num" }, f.new || h("span", { class: "muted" }, "0")), h("td", { class: "num" }, f.last30), h("td", { class: "num" }, f.total)))))
          : h("p", { class: "empty" }, "No leads yet."))),
  ];
}

/**
 * Lead rows. With `selection` (a Set of ids) each row gets a checkbox; `onSelect` is called after it changes.
 * Rows are real links, so open-in-new-tab and keyboard navigation work.
 */
function leadTable(rows, { selection, onSelect } = {}) {
  if (!rows.length) return h("p", { class: "empty" }, "No leads match.");
  const selectable = Boolean(selection);
  const boxes = [];
  const all = selectable ? h("input", { type: "checkbox", "aria-label": "Select all on this page" }) : null;
  const syncAll = () => {
    if (!all) return;
    const n = rows.filter((r) => selection.has(r.id)).length;
    all.checked = n === rows.length;
    all.indeterminate = n > 0 && n < rows.length;
  };
  all?.addEventListener("change", () => {
    for (const r of rows) all.checked ? selection.add(r.id) : selection.delete(r.id);
    boxes.forEach((b) => (b.checked = all.checked));
    onSelect?.();
  });

  const table = h("div", { class: "table-wrap" }, h("table", {},
    h("thead", {}, h("tr", {}, selectable ? h("th", { class: "check" }, all) : null,
      h("th", {}, "Received"), h("th", {}, "Form"), h("th", {}, "Name"), h("th", { class: "email" }, "Email"), h("th", {}, "Status"))),
    h("tbody", {}, rows.map((r) => {
      const href = `#/leads/${r.id}`;
      let box = null;
      if (selectable) {
        box = h("input", { type: "checkbox", "aria-label": `Select ${r.name ?? r.email ?? `lead ${r.id}`}` });
        box.checked = selection.has(r.id);
        box.addEventListener("change", () => {
          box.checked ? selection.add(r.id) : selection.delete(r.id);
          syncAll();
          onSelect?.();
        });
        boxes.push(box);
      }
      return h("tr", { class: `link${r.status === "new" ? " unread" : ""}`, onclick: (e) => {
          if (e.target.closest("a, input, label")) return;
          location.hash = href;
        } },
        selectable ? h("td", { class: "check" }, h("label", {}, box)) : null,
        h("td", { class: "nowrap", title: fmtDate(r.created_at) }, ago(r.created_at)),
        h("td", {}, h("span", { class: "tag" }, formLabel(r.form))),
        h("td", {}, h("a", { href, class: "row-link" }, r.name ?? "—"), r.has_notes ? h("span", { class: "muted small", title: "Has notes" }, "  ✎") : null),
        h("td", { class: "email" }, r.email ?? "—"),
        h("td", {}, chip(r.status)));
    }))));
  syncAll();
  return table;
}

// ── leads list ───────────────────────────────────────────────────────────
async function renderLeads(params) {
  const page = Number(params.get("page")) || 1;
  const data = await api(`/submissions?${params}`);
  state.lastLeadsHash = location.hash;

  const set = (k, v) => {
    const p = new URLSearchParams(params);
    v ? p.set(k, v) : p.delete(k);
    if (k !== "page") p.delete("page");
    location.hash = `#/leads?${p}`;
  };
  const search = h("input", { type: "search", id: "lead-search", placeholder: "Search name, email, message, notes…", title: "Press / to search from anywhere", value: params.get("q") ?? "", "aria-label": "Search leads" });
  // A form so the phone keyboard's Go/Search key submits too
  const searchForm = h("form", { class: "search", role: "search", onsubmit: (e) => (e.preventDefault(), set("q", search.value.trim())) }, search);

  const exportParams = new URLSearchParams(params);
  exportParams.delete("page");
  const pages = Math.max(1, Math.ceil(data.count / data.pageSize));

  // Bulk actions on the selected rows
  const selection = new Set();
  const bulkLabel = h("strong", {});
  const bulk = h("div", { class: "bulk", hidden: true },
    bulkLabel,
    h("span", { class: "muted" }, "Mark as"),
    state.meta.statuses.map((s) => h("button", { class: "btn secondary", onclick: () => bulkSet(s) }, s)),
    h("button", { class: "btn link", onclick: () => route() }, "Clear selection"));
  const onSelect = () => {
    bulk.hidden = selection.size === 0;
    bulkLabel.textContent = `${plural(selection.size, "lead")} selected`;
  };
  async function bulkSet(status) {
    if (status === "spam" && !confirm(`Mark ${plural(selection.size, "lead")} as spam? They will be hidden from the overview.`)) return;
    bulk.querySelectorAll("button").forEach((b) => (b.disabled = true));
    try {
      const { updated } = await api("/submissions", { method: "PATCH", body: { ids: [...selection], status } });
      toast(`${plural(updated, "lead")} marked ${status}.`);
      await route();
    } catch (err) {
      if (err.message === "unauthenticated") return;
      toast(err.message, "error");
      bulk.querySelectorAll("button").forEach((b) => (b.disabled = false));
    }
  }

  const filtered = [...params.keys()].some((k) => k !== "page");
  return [
    pageHead("Leads", plural(data.count, "lead"),
      isAdmin() ? h("a", { class: "btn secondary", href: `/admin/api/export.csv?${exportParams}`, download: true }, "Export CSV") : null),
    h("div", { class: "filters" },
      searchForm,
      h("select", { "aria-label": "Form", onchange: (e) => set("form", e.target.value) },
        h("option", { value: "" }, "All forms"),
        data.forms.map((f) => h("option", { value: f, selected: params.get("form") === f }, formLabel(f)))),
      h("select", { "aria-label": "Status", onchange: (e) => set("status", e.target.value) },
        h("option", { value: "" }, "All statuses"),
        state.meta.statuses.map((s) => h("option", { value: s, selected: params.get("status") === s }, s))),
      h("input", { type: "date", "aria-label": "From", title: "From", value: params.get("from") ?? "", onchange: (e) => set("from", e.target.value) }),
      h("input", { type: "date", "aria-label": "To", title: "To", value: params.get("to") ?? "", onchange: (e) => set("to", e.target.value) }),
      h("select", { "aria-label": "Sort", onchange: (e) => set("sort", e.target.value) },
        h("option", { value: "" }, "Newest first"),
        h("option", { value: "oldest", selected: params.get("sort") === "oldest" }, "Oldest first")),
      filtered ? h("a", { class: "btn link", href: "#/leads" }, "Clear filters") : null),
    bulk,
    leadTable(data.rows, { selection, onSelect }),
    pager(page, pages, (p) => set("page", String(p))),
  ];
}

// ── lead detail ──────────────────────────────────────────────────────────
const humanKey = (k) => k.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ");
const valueText = (v) =>
  v == null || v === "" ? "—"
  : Array.isArray(v) ? v.join(", ")
  : typeof v === "object" ? (v.file ? `${v.file} (${Math.round(v.size / 1024)} KB, attached to the notification email)` : JSON.stringify(v, null, 2))
  : String(v);

function describeHistory(e) {
  const d = e.detail ?? {};
  const parts = [];
  if (e.action === "update_submission") {
    if (d.status) parts.push(`changed status ${d.status.join(" → ")}`);
    if (d.notes) parts.push("edited notes");
    return (parts.join(", ") || "updated") + (d.bulk ? " (bulk)" : "");
  }
  return e.action.replace(/_/g, " ");
}

async function renderLead(id) {
  const lead = await api(`/submissions/${id}`);
  let loadedAt = lead.updated_at;
  const msg = h("p", { class: "error", role: "status" });

  const status = h("select", { "aria-label": "Status" }, state.meta.statuses.map((s) => h("option", { value: s, selected: lead.status === s }, s)));
  const notes = h("textarea", { placeholder: "Internal notes: calls, quotes sent, next steps…  (Ctrl+Enter saves)", "aria-label": "Notes" });
  notes.value = lead.notes ?? "";
  const dirty = () => status.value !== lead.status || notes.value !== (lead.notes ?? "");

  async function save(nextStatus) {
    if (nextStatus) status.value = nextStatus;
    if (!dirty()) return toast("Nothing to save.");
    saveBtn.disabled = true;
    msg.textContent = "";
    try {
      await api(`/submissions/${id}`, { method: "PATCH", body: { status: status.value, notes: notes.value, expectedUpdatedAt: loadedAt } });
      toast(status.value !== lead.status ? `Marked ${status.value}.` : "Notes saved.");
      await route();
    } catch (err) {
      if (err.message === "unauthenticated") return;
      msg.replaceChildren(err.message, err.status === 409 ? h("button", { class: "btn link", onclick: () => route() }, " Reload") : "");
      saveBtn.disabled = false;
    }
  }
  const saveBtn = h("button", { class: "btn accent", onclick: () => save() }, "Save changes");
  notes.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) save();
  });

  const phone = lead.data?.phone ? String(lead.data.phone).replace(/[^\d+]/g, "") : null;
  // Local Ugandan numbers (07…) need the country code for WhatsApp
  const waPhone = phone ? (phone.startsWith("0") ? `256${phone.slice(1)}` : phone.replace(/^\+/, "")) : null;
  const firstName = (lead.name ?? "").split(" ")[0];

  const del = isAdmin() ? h("button", {
    class: "btn danger",
    onclick: async () => {
      const typed = prompt(`This permanently deletes this person's data (e.g. for a data-protection request).\nType DELETE to confirm.`);
      if (typed !== "DELETE") return;
      try {
        await api(`/submissions/${id}`, { method: "DELETE" });
        toast("Lead deleted.");
        location.hash = state.lastLeadsHash;
      } catch (err) {
        msg.textContent = err.message;
      }
    },
  }, "Delete data") : null;

  const copy = (value, label) => h("button", { class: "btn link small", title: `Copy ${label}`, onclick: async () => {
    try {
      await navigator.clipboard.writeText(value);
      toast(`${label} copied.`);
    } catch {
      toast("Could not copy.", "error");
    }
  } }, "Copy");

  // Quick one-click moves for the usual next step
  const next = { new: ["contacted", "spam"], contacted: ["won", "lost"], won: [], lost: ["contacted"], spam: ["new"] }[lead.status] ?? [];

  const fields = Object.entries(lead.data ?? {});
  return [
    h("p", {}, h("a", { href: state.lastLeadsHash, class: "muted small" }, "← Back to leads")),
    pageHead(formLabel(lead.form), lead.name ?? lead.email ?? `Lead #${lead.id}`, chip(lead.status)),
    h("div", { class: "detail" },
      h("div", { class: "grid" },
        h("div", { class: "card" },
          h("h2", {}, "Submission"),
          h("p", { class: "muted small" }, `Received ${fmtDate(lead.created_at)} (${ago(lead.created_at)})${lead.country ? ` · from ${lead.country}` : ""} · #${lead.id}`),
          h("dl", { class: "fields" }, fields.flatMap(([k, v]) => [h("dt", {}, humanKey(k)), h("dd", {}, valueText(v))]))),
        lead.related.length
          ? h("div", { class: "card flush" },
              h("div", { class: "card-head" }, h("h2", {}, `Other submissions from this person (${lead.related.length})`)),
              h("table", {}, h("tbody", {}, lead.related.map((r) => h("tr", { class: "link", onclick: () => (location.hash = `#/leads/${r.id}`) },
                h("td", { class: "nowrap" }, fmtDate(r.created_at, false)),
                h("td", {}, h("a", { href: `#/leads/${r.id}`, class: "row-link" }, formLabel(r.form))),
                h("td", {}, chip(r.status)))))))
          : null),
      h("div", { class: "grid" },
        h("div", { class: "card" },
          h("h2", {}, "Follow up"),
          h("dl", { class: "contact" },
            lead.email ? [h("dt", {}, "Email"), h("dd", {}, h("a", { href: `mailto:${lead.email}` }, lead.email), copy(lead.email, "Email"))] : null,
            phone ? [h("dt", {}, "Phone"), h("dd", {}, h("a", { href: `tel:${phone}` }, lead.data.phone), copy(phone, "Phone"))] : null),
          h("div", { class: "actions" },
            lead.email ? h("a", { class: "btn", href: `mailto:${lead.email}?subject=${encodeURIComponent(`Re: your ${formLabel(lead.form).toLowerCase()} — Traverse Minds Africa`)}&body=${encodeURIComponent(`Hi ${firstName},\n\n`)}` }, "Reply by email") : null,
            waPhone ? h("a", { class: "btn secondary", href: `https://wa.me/${waPhone}?text=${encodeURIComponent(`Hi ${firstName}, this is Traverse Minds Africa following up on your ${formLabel(lead.form).toLowerCase()}.`)}`, target: "_blank", rel: "noopener noreferrer" }, "WhatsApp") : null),
          next.length ? h("div", { class: "quick" }, h("span", { class: "muted small" }, "Quick:"),
            next.map((s) => h("button", { class: "btn secondary", onclick: () => save(s) }, `Mark ${s}`))) : null),
        h("div", { class: "card" },
          h("h2", {}, "Status & notes"),
          h("div", { class: "grid" }, h("label", { class: "field" }, "Status", status), h("label", { class: "field" }, "Notes", notes)),
          h("div", { class: "actions spaced" }, saveBtn, del),
          msg,
          lead.updated_at !== lead.created_at ? h("p", { class: "muted small" }, `Last updated ${ago(lead.updated_at)}`) : null),
        h("div", { class: "card" },
          h("h2", {}, "History"),
          lead.history.length
            ? h("ul", { class: "history" }, lead.history.map((e) => h("li", {},
                h("strong", {}, e.user_name ?? "System"), ` ${describeHistory(e)}`,
                h("div", { class: "muted", title: fmtDate(e.created_at) }, ago(e.created_at)))))
            : h("p", { class: "muted small" }, "No changes yet."))),
    ),
  ];
}

// ── users ────────────────────────────────────────────────────────────────
async function renderUsers() {
  const users = await api("/users");
  const msg = h("p", { class: "error", role: "status" });
  const form = h("form", {
    class: "form-grid",
    onsubmit: async (e) => {
      e.preventDefault();
      const fd = Object.fromEntries(new FormData(form));
      try {
        await api("/users", { method: "POST", body: fd });
        toast(`Added ${fd.name}. Share the temporary password with them privately.`);
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

  const update = async (id, body, done) => {
    try {
      await api(`/users/${id}`, { method: "PATCH", body });
      toast(done);
      route();
    } catch (err) {
      msg.textContent = err.message;
    }
  };

  return [
    pageHead("Team", "Users"),
    h("div", { class: "table-wrap" }, h("table", {},
      h("thead", {}, h("tr", {}, h("th", {}, "Name"), h("th", {}, "Email"), h("th", {}, "Role"), h("th", {}, "Last sign-in"), h("th", {}, ""))),
      h("tbody", {}, users.map((u) => h("tr", { class: u.active ? null : "inactive" },
        h("td", {}, u.name, u.id === state.user.id ? h("span", { class: "muted small" }, "  (you)") : null, u.active ? null : h("span", { class: "muted small" }, "  (deactivated)")),
        h("td", {}, u.email),
        h("td", {}, h("select", { "aria-label": `Role for ${u.name}`, disabled: u.id === state.user.id, onchange: (e) => update(u.id, { role: e.target.value }, `${u.name} is now ${e.target.value}.`) },
          state.meta.roles.map((r) => h("option", { value: r, selected: u.role === r }, r)))),
        h("td", { class: "nowrap", title: u.last_login_at ? fmtDate(u.last_login_at) : null }, u.last_login_at ? ago(u.last_login_at) : "Never"),
        h("td", { class: "actions" },
          h("button", { class: "btn secondary", onclick: () => {
            const pw = prompt(`New temporary password for ${u.name} (12+ characters).\nThey will be signed out everywhere.`);
            if (pw) update(u.id, { password: pw }, `Password reset for ${u.name}.`);
          } }, "Reset password"),
          u.id === state.user.id ? null : h("button", { class: u.active ? "btn danger" : "btn secondary", onclick: () => {
            if (u.active && !confirm(`Deactivate ${u.name}? They will be signed out immediately.`)) return;
            update(u.id, { active: !u.active }, `${u.name} ${u.active ? "deactivated" : "reactivated"}.`);
          } }, u.active ? "Deactivate" : "Reactivate"))))))),
    msg,
    h("div", { class: "card" }, h("h2", {}, "Add a team member"), h("p", { class: "muted small" }, "Viewers can see and update leads. Admins can also export, delete data, manage users and read the audit log."), form),
  ];
}

// ── audit ────────────────────────────────────────────────────────────────
function describeAudit(r) {
  const d = r.detail ?? {};
  switch (r.action) {
    case "login": return d.ip ? `from ${d.ip}` : "";
    case "update_submission": return [d.status && `status ${d.status.join(" → ")}`, d.notes && "notes edited", d.bulk && "bulk"].filter(Boolean).join(", ");
    case "delete_submission": return d.form ? `${formLabel(d.form)} submission erased` : "";
    case "export": return `${plural(d.rows ?? 0, "row")}${d.query ? `, filter ${decodeURIComponent(d.query.replace(/^\?/, "").replace(/\+/g, " ")) || "none"}` : ""}`;
    case "create_user": return `${d.email} as ${d.role}`;
    case "update_user": return [r.target_name ?? `user #${d.userId}`, d.role && `role → ${d.role}`, d.active === true && "reactivated", d.active === false && "deactivated", d.passwordReset && "password reset"].filter(Boolean).join(", ");
    default: return Object.keys(d).length ? JSON.stringify(d) : "";
  }
}

async function renderAudit(params) {
  const page = Number(params.get("page")) || 1;
  const data = await api(`/audit?${params}`);
  const set = (k, v) => {
    const p = new URLSearchParams(params);
    v ? p.set(k, v) : p.delete(k);
    if (k !== "page") p.delete("page");
    location.hash = `#/audit?${p}`;
  };
  return [
    pageHead("Accountability", "Audit log"),
    h("div", { class: "filters" },
      h("select", { "aria-label": "Action", onchange: (e) => set("action", e.target.value) },
        h("option", { value: "" }, "All actions"),
        data.actions.map((a) => h("option", { value: a, selected: params.get("action") === a }, a.replace(/_/g, " ")))),
      h("span", { class: "muted" }, `${data.count} ${data.count === 1 ? "entry" : "entries"}`)),
    data.rows.length
      ? h("div", { class: "table-wrap" }, h("table", {},
          h("thead", {}, h("tr", {}, h("th", {}, "When"), h("th", {}, "Who"), h("th", {}, "Action"), h("th", {}, "Lead"), h("th", {}, "Detail"))),
          h("tbody", {}, data.rows.map((r) => h("tr", {},
            h("td", { class: "nowrap", title: ago(r.created_at) }, fmtDate(r.created_at)),
            h("td", {}, r.user_name ?? "—"),
            h("td", {}, r.action.replace(/_/g, " ")),
            h("td", {}, r.submission_id && r.action !== "delete_submission" ? h("a", { href: `#/leads/${r.submission_id}` }, `#${r.submission_id}`) : r.submission_id ? `#${r.submission_id}` : "—"),
            h("td", { class: "muted small" }, describeAudit(r)))))))
      : h("p", { class: "empty" }, "No entries."),
    pager(page, Math.max(1, Math.ceil(data.count / data.pageSize)), (p) => set("page", String(p))),
  ];
}

// ── account ──────────────────────────────────────────────────────────────
async function renderAccount() {
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
        msg.textContent = "";
        toast("Password changed.");
      } catch (err) {
        msg.textContent = err.message;
      }
    },
  },
    h("label", { class: "field" }, "Current password", h("input", { type: "password", name: "current", required: true, autocomplete: "current-password" })),
    h("label", { class: "field" }, "New password (12+ characters)", h("input", { type: "password", name: "next", required: true, minlength: "12", autocomplete: "new-password" })),
    h("label", { class: "field" }, "Repeat new password", h("input", { type: "password", name: "repeat", required: true, autocomplete: "new-password" })),
    h("div", { class: "actions" }, h("button", { class: "btn accent", type: "submit" }, "Change password")),
    msg);

  return [
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
  ];
}

// ── router ───────────────────────────────────────────────────────────────
let routeSeq = 0;
async function route() {
  if (!state.user) return;
  const seq = ++routeSeq;
  const [path, query = ""] = location.hash.replace(/^#/, "").split("?");
  const params = new URLSearchParams(query);
  document.body.classList.add("loading");
  try {
    let render;
    const lead = path.match(/^\/leads\/(\d+)$/);
    if (lead) render = () => renderLead(lead[1]);
    else if (path === "/leads") render = () => renderLeads(params);
    else if (path === "/users" && isAdmin()) render = renderUsers;
    else if (path === "/audit" && isAdmin()) render = () => renderAudit(params);
    else if (path === "/account") render = renderAccount;
    else render = renderOverview;
    const [content] = await Promise.all([render(), render === renderOverview ? null : loadBadge()]);
    // A slower, older navigation must not overwrite a newer one
    if (seq !== routeSeq) return;
    const scroll = window.scrollY;
    const samePage = app.dataset.hash === location.hash;
    app.replaceChildren(shell(content));
    app.dataset.hash = location.hash;
    window.scrollTo(0, samePage ? scroll : 0);
    document.title = `${app.querySelector("h1")?.textContent ?? "Admin"} · Traverse Minds Admin`;
  } catch (err) {
    if (seq !== routeSeq || err.message === "unauthenticated") return;
    app.replaceChildren(h("div", { class: "login" }, h("div", { class: "card" }, h("h1", {}, "Something went wrong"), h("p", { class: "error" }, err.message), h("a", { class: "btn", href: "#/overview" }, "Back to overview"))));
  } finally {
    if (seq === routeSeq) document.body.classList.remove("loading");
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

// "/" jumps to the lead search, like most web apps
document.addEventListener("keydown", (e) => {
  if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
  if (e.target.closest?.("input, textarea, select, [contenteditable]")) return;
  const search = document.getElementById("lead-search");
  if (!state.user) return;
  e.preventDefault();
  if (search) search.focus();
  else location.hash = "#/leads";
});

// Refresh the new-lead badge when staff come back to the tab
document.addEventListener("visibilitychange", async () => {
  if (document.visibilityState !== "visible" || !state.user) return;
  await loadBadge();
  // Patch the badge in place: re-rendering would throw away notes someone is halfway through typing
  const link = app.querySelector('.nav a[href^="#/leads"]');
  if (!link) return;
  let badge = link.querySelector(".count");
  if (!state.newCount) return badge?.remove();
  if (!badge) link.append((badge = h("span", { class: "count", title: "New leads" })));
  badge.textContent = state.newCount;
});

window.addEventListener("hashchange", route);
boot();
