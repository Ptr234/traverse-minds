// Staff account management from the VPS shell.
//
//   docker compose exec api node src/cli.js create-user <email> "<Full Name>" [admin|viewer]
//   docker compose exec api node src/cli.js reset-password <email>
//   docker compose exec api node src/cli.js list-users
//
// Passwords are typed at a hidden prompt, never passed as arguments (they would end up in shell history).

import { createInterface } from "node:readline";
import { sql, migrate, ROLES } from "./db.js";
import { hashPassword, checkPasswordStrength } from "./auth.js";

function promptHidden(question) {
  return new Promise((resolve) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout, terminal: true });
    const write = rl._writeToOutput.bind(rl);
    rl._writeToOutput = (s) => write(s.startsWith(question) ? s : "");
    rl.question(question, (answer) => {
      rl.close();
      process.stdout.write("\n");
      resolve(answer);
    });
  });
}

async function askPassword() {
  const password = process.env.NEW_PASSWORD ?? (await promptHidden("Password (min 12 chars): "));
  const weak = checkPasswordStrength(password);
  if (weak) throw new Error(weak);
  if (!process.env.NEW_PASSWORD && password !== (await promptHidden("Repeat password: "))) throw new Error("Passwords do not match.");
  return password;
}

const [command, email, name, role = "admin"] = process.argv.slice(2);

try {
  await migrate();
  if (command === "create-user") {
    if (!email || !name) throw new Error('Usage: create-user <email> "<Full Name>" [admin|viewer]');
    if (!ROLES.includes(role)) throw new Error(`Role must be one of: ${ROLES.join(", ")}`);
    const hash = await hashPassword(await askPassword());
    await sql`INSERT INTO admin_users (email, name, role, password_hash) VALUES (${email.toLowerCase()}, ${name}, ${role}, ${hash})`;
    console.log(`Created ${role} ${email}`);
  } else if (command === "reset-password") {
    if (!email) throw new Error("Usage: reset-password <email>");
    const hash = await hashPassword(await askPassword());
    const rows = await sql`UPDATE admin_users SET password_hash = ${hash}, active = true WHERE lower(email) = lower(${email}) RETURNING id`;
    if (!rows.length) throw new Error(`No user ${email}`);
    await sql`DELETE FROM admin_sessions WHERE user_id = ${rows[0].id}`;
    console.log(`Password reset for ${email}; existing sessions signed out`);
  } else if (command === "list-users") {
    console.table(await sql`SELECT id, email, name, role, active, last_login_at FROM admin_users ORDER BY id`);
  } else {
    console.log('Commands: create-user <email> "<Full Name>" [admin|viewer] | reset-password <email> | list-users');
  }
} catch (err) {
  console.error(err.code === "23505" ? "A user with that email already exists." : err.message);
  process.exitCode = 1;
} finally {
  await sql.end();
}
