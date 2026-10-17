import { readFileSync } from "node:fs";
import postgres from "postgres";

const { DATABASE_URL } = process.env;
if (!DATABASE_URL) {
  console.error("DATABASE_URL must be set");
  process.exit(1);
}

// onnotice: silence "already exists, skipping" notices from the idempotent migration
export const sql = postgres(DATABASE_URL, { max: 5, idle_timeout: 30, onnotice: () => {} });

export const STATUSES = ["new", "contacted", "won", "lost", "spam"];
export const ROLES = ["admin", "viewer"];

/** Apply schema.sql. Every statement is idempotent, so this runs on each start. */
export async function migrate() {
  await sql.unsafe(readFileSync(new URL("../schema.sql", import.meta.url), "utf8"));
}

export async function audit(userId, action, { submissionId = null, detail = null } = {}) {
  await sql`
    INSERT INTO audit_log (user_id, action, submission_id, detail)
    VALUES (${userId}, ${action}, ${submissionId}, ${detail ? sql.json(detail) : null})`;
}
