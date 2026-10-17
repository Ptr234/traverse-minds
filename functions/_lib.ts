// Shared plumbing for every form handler: parsing, validation, escaping, storage and responses.

export interface Env {
  RESEND_API_KEY: string;
  /** Submissions API on the VPS (server/), e.g. https://api.traverseminds.com. When set, every submission is stored before any email is sent. */
  SUBMISSIONS_API_URL?: string;
  /** Shared secret for the submissions API (same value as INGEST_TOKEN on the server) */
  SUBMISSIONS_API_TOKEN?: string;
  /** Verified Resend sender address, e.g. hello@traverseminds.com */
  EMAIL_FROM?: string;
  /** Inbox that receives internal notifications */
  EMAIL_NOTIFY?: string;
  HUBSPOT_API_KEY?: string;
}

export const SITE_URL = "https://traverseminds.com";

const JSON_HEADERS = { "Content-Type": "application/json" };
export const ok = () => new Response(JSON.stringify({ ok: true, success: true }), { status: 200, headers: JSON_HEADERS });
export const fail = (status: number, error: string) => new Response(JSON.stringify({ error }), { status, headers: JSON_HEADERS });

/** Escape user input before it goes into HTML email. */
export const esc = (value: unknown): string =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

/** Escaped, with line breaks kept. */
export const escBr = (value: unknown) => esc(value).replace(/\r?\n/g, "<br>");

/** Trimmed string, capped so nobody can post a novel into a name field. */
export const str = (value: unknown, max = 500) => (typeof value === "string" ? value.trim().slice(0, max) : "");

// Deliberately stricter than RFC 5322: no quotes, angle brackets or spaces that could break headers or HTML.
const EMAIL_RE = /^[A-Za-z0-9._%+'-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
export const validEmail = (value: unknown) => {
  const e = str(value, 254);
  return EMAIL_RE.test(e) ? e : null;
};

/** Reads JSON or multipart/form-data bodies into a plain object (files are returned as File). */
export async function readBody(request: Request): Promise<Record<string, unknown>> {
  const type = request.headers.get("content-type") ?? "";
  if (type.includes("multipart/form-data") || type.includes("application/x-www-form-urlencoded")) {
    const form = await request.formData();
    const out: Record<string, unknown> = {};
    for (const [k, v] of form.entries()) out[k] = v;
    return out;
  }
  return (await request.json()) as Record<string, unknown>;
}

/** Bots fill hidden fields; humans never see them. */
export const isBot = (body: Record<string, unknown>) => Boolean(str(body.honeypot) || str(body.website));

/**
 * Sends the submission to the submissions API on the VPS, which writes it to Postgres.
 * Returns true if stored. Never throws: a storage problem must not lose the email path.
 */
export async function store(
  env: Env,
  request: Request,
  form: string,
  fields: { email?: string | null; name?: string; data: Record<string, unknown> }
): Promise<boolean> {
  if (!env.SUBMISSIONS_API_URL || !env.SUBMISSIONS_API_TOKEN) return false;
  try {
    const country = (request as Request & { cf?: { country?: string } }).cf?.country ?? null;
    // Files are not stored, only their name and size; bot-trap fields are dropped
    const data = Object.fromEntries(
      Object.entries(fields.data)
        .filter(([k]) => k !== "honeypot" && k !== "website")
        .map(([k, v]) => [k, v instanceof File ? { file: v.name, size: v.size } : v])
    );
    const res = await fetch(`${env.SUBMISSIONS_API_URL.replace(/\/$/, "")}/submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.SUBMISSIONS_API_TOKEN}` },
      body: JSON.stringify({ form, email: fields.email ?? null, name: fields.name ?? null, data, country }),
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    return true;
  } catch (err) {
    console.error(`Submission store failed for ${form}:`, err);
    return false;
  }
}

/**
 * Runs the email step. If the submission was stored, an email failure is logged but the visitor
 * still sees success, because the lead is safe in the database.
 */
export async function deliver(stored: boolean, send: () => Promise<unknown>, failMessage: string): Promise<Response> {
  try {
    await send();
    return ok();
  } catch (err) {
    console.error("Email delivery failed:", err);
    return stored ? ok() : fail(500, failMessage);
  }
}

/** Optional CRM sync, matching the previous Next.js routes. Never blocks the response on failure. */
export async function hubspotContact(env: Env, properties: Record<string, string>) {
  if (!env.HUBSPOT_API_KEY) return;
  try {
    await fetch("https://api.hubapi.com/crm/v3/objects/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${env.HUBSPOT_API_KEY}` },
      body: JSON.stringify({ properties }),
    });
  } catch (err) {
    console.error("HubSpot sync failed:", err);
  }
}

/** Base64 for email attachments, chunked so large files do not overflow the call stack. */
export function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return btoa(binary);
}
