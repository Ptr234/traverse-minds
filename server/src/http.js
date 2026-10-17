import { timingSafeEqual } from "node:crypto";

export const MAX_BODY_BYTES = 256 * 1024;

export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const SECURITY_HEADERS = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Cache-Control": "no-store",
};

export function send(res, status, body, headers = {}) {
  const isText = typeof body === "string" || Buffer.isBuffer(body);
  res.writeHead(status, {
    ...SECURITY_HEADERS,
    "Content-Type": isText ? "text/plain; charset=utf-8" : "application/json",
    ...headers,
  });
  res.end(isText ? body : JSON.stringify(body));
}

export async function readJson(req) {
  let size = 0;
  const chunks = [];
  for await (const chunk of req) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new HttpError(413, "Payload too large");
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}");
  } catch {
    throw new HttpError(400, "Invalid JSON");
  }
}

export function bearerMatches(req, token) {
  const given = Buffer.from((req.headers.authorization ?? "").replace(/^Bearer\s+/i, ""));
  const expected = Buffer.from(token);
  return given.length === expected.length && timingSafeEqual(given, expected);
}

export function parseCookies(req) {
  return Object.fromEntries(
    (req.headers.cookie ?? "")
      .split(";")
      .map((c) => c.trim().split("="))
      .filter(([k, v]) => k && v)
      .map(([k, v]) => [k, decodeURIComponent(v)])
  );
}

/** Client IP as seen by Caddy (the only proxy in front of us). */
export const clientIp = (req) => (req.headers["x-forwarded-for"]?.split(",")[0] ?? req.socket.remoteAddress ?? "").trim();

export const text = (v, max) => (typeof v === "string" && v.trim() ? v.trim().slice(0, max) : null);

export function toCsv(rows, cols) {
  const cell = (v) => {
    const s =
      v == null ? ""
      : v instanceof Date ? v.toISOString()
      : typeof v === "object" ? JSON.stringify(v)
      : String(v);
    // Quote everything and neutralise spreadsheet formula injection
    return `"${(/^[=+\-@\t\r]/.test(s) ? `'${s}` : s).replace(/"/g, '""')}"`;
  };
  return [cols.join(","), ...rows.map((r) => cols.map((c) => cell(r[c])).join(","))].join("\r\n");
}
