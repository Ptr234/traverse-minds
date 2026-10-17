import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { sql } from "./db.js";
import { HttpError, parseCookies, clientIp } from "./http.js";

const scrypt = promisify(scryptCb);

export const SESSION_COOKIE = "tm_admin";
const SESSION_HOURS = 12;
const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 };

// ── passwords ─────────────────────────────────────────────────────────────

export async function hashPassword(password) {
  const salt = randomBytes(16);
  const hash = await scrypt(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p });
  return `scrypt$${SCRYPT.N}$${SCRYPT.r}$${SCRYPT.p}$${salt.toString("base64")}$${hash.toString("base64")}`;
}

export async function verifyPassword(password, stored) {
  const [alg, N, r, p, saltB64, hashB64] = String(stored).split("$");
  if (alg !== "scrypt") return false;
  const expected = Buffer.from(hashB64, "base64");
  const actual = await scrypt(password, Buffer.from(saltB64, "base64"), expected.length, { N: +N, r: +r, p: +p });
  return timingSafeEqual(actual, expected);
}

export function checkPasswordStrength(password) {
  if (typeof password !== "string" || password.length < 12) return "Password must be at least 12 characters.";
  if (password.length > 200) return "Password is too long.";
  return null;
}

// A fixed hash to compare against when the email is unknown, so response time does not reveal which emails exist
const DUMMY_HASH = await hashPassword(randomBytes(16).toString("hex"));

// ── login rate limiting (per IP, in memory) ─────────────────────────────────

const attempts = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

export function checkRateLimit(req) {
  const ip = clientIp(req);
  const now = Date.now();
  const entry = attempts.get(ip);
  if (entry && entry.until > now && entry.count >= MAX_ATTEMPTS) {
    throw new HttpError(429, "Too many login attempts. Try again in 15 minutes.");
  }
  return ip;
}

export function recordFailure(ip) {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.until <= now) attempts.set(ip, { count: 1, until: now + WINDOW_MS });
  else entry.count += 1;
}

export const clearFailures = (ip) => attempts.delete(ip);

// ── sessions ──────────────────────────────────────────────────────────────

const sha256 = (s) => createHash("sha256").update(s).digest("hex");

export async function authenticate(email, password) {
  const [user] = await sql`SELECT * FROM admin_users WHERE lower(email) = lower(${email}) LIMIT 1`;
  const valid = await verifyPassword(password, user?.password_hash ?? DUMMY_HASH);
  return valid && user?.active ? user : null;
}

export async function createSession(userId) {
  const token = randomBytes(32).toString("base64url");
  await sql`
    INSERT INTO admin_sessions (token_hash, user_id, expires_at)
    VALUES (${sha256(token)}, ${userId}, now() + ${`${SESSION_HOURS} hours`}::interval)`;
  await sql`UPDATE admin_users SET last_login_at = now() WHERE id = ${userId}`;
  // Opportunistic cleanup of expired sessions
  await sql`DELETE FROM admin_sessions WHERE expires_at < now()`;
  return token;
}

export const sessionCookie = (token, secure) =>
  `${SESSION_COOKIE}=${token}; Path=/admin; HttpOnly; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}${secure ? "; Secure" : ""}`;

export const clearCookie = (secure) => `${SESSION_COOKIE}=; Path=/admin; HttpOnly; SameSite=Strict; Max-Age=0${secure ? "; Secure" : ""}`;

export async function destroySession(req) {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (token) await sql`DELETE FROM admin_sessions WHERE token_hash = ${sha256(token)}`;
}

/** Returns the signed-in, active user or throws 401. */
export async function requireUser(req) {
  const token = parseCookies(req)[SESSION_COOKIE];
  if (!token) throw new HttpError(401, "Not signed in");
  const [user] = await sql`
    SELECT u.id, u.email, u.name, u.role
    FROM admin_sessions s JOIN admin_users u ON u.id = s.user_id
    WHERE s.token_hash = ${sha256(token)} AND s.expires_at > now() AND u.active`;
  if (!user) throw new HttpError(401, "Session expired");
  return user;
}

export function requireAdmin(user) {
  if (user.role !== "admin") throw new HttpError(403, "Admins only");
}

/**
 * Cross-site request forgery guard for state-changing requests: the browser must be on our own
 * origin. SameSite=Strict cookies already block most of this; this is the second lock.
 */
export function checkOrigin(req) {
  if (req.method === "GET" || req.method === "HEAD") return;
  const origin = req.headers.origin;
  const host = req.headers["x-forwarded-host"] ?? req.headers.host;
  if (!origin || new URL(origin).host !== host) throw new HttpError(403, "Bad origin");
}
