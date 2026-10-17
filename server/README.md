# Traverse Minds submissions service

Stores every website form submission in Postgres and serves the staff admin dashboard.

```
visitor ─▶ traverseminds.com form ─▶ Cloudflare function (functions/api/*)
                                         │  1. POST /submissions  (INGEST token) ─▶ this service ─▶ Postgres
                                         │  2. emails via Resend
staff ─▶ https://api.traverseminds.com/admin ─▶ dashboard (staff accounts)
```

If this server is down, forms still email you; the submission just isn't stored.

## What runs (docker-compose.yml)

| Service | Purpose |
|---|---|
| `db` | Postgres 16. No public port; only `api` can reach it. |
| `api` | Node service: ingest endpoint, admin dashboard and its API. Applies `schema.sql` on start. |
| `caddy` | HTTPS with automatic Let's Encrypt certificates for `API_DOMAIN`. |
| `backup` | `pg_dump` every 24 hours into `./backups`, keeps 14 days. |

## First deployment on the VPS

Needs Docker with the compose plugin, ports 80 and 443 open, and a DNS **A record** for the API domain
(e.g. `api.traverseminds.com`) pointing at the VPS.

```bash
git clone https://github.com/Ptr234/traverse-minds.git
cd traverse-minds/server
cp .env.example .env
# Fill in .env. Generate each secret with: openssl rand -hex 32
nano .env
docker compose up -d --build
docker compose logs -f api        # should print "Submissions service listening on :8080"
```

Create your admin account (the password is typed at a hidden prompt):

```bash
docker compose exec api node src/cli.js create-user you@traverseminds.com "Your Name" admin
```

Then open `https://api.traverseminds.com/admin` and sign in. Add the rest of the team from **Users**
in the dashboard (choose **viewer** for staff who only work leads).

## Connect the website (Cloudflare Pages → Settings → Variables and secrets)

| Variable | Value |
|---|---|
| `SUBMISSIONS_API_URL` | `https://api.traverseminds.com` |
| `SUBMISSIONS_API_TOKEN` | the `INGEST_TOKEN` from `.env` (mark as secret) |
| `EMAIL_FROM` | your Resend-verified sender, e.g. `hello@traverseminds.com` |
| `EMAIL_NOTIFY` | inbox for new-lead notifications, e.g. `traversemindsug@gmail.com` |
| `RESEND_API_KEY` | from resend.com |
| `HUBSPOT_API_KEY` | optional CRM sync |

Redeploy the site after saving. Submit the contact form once and check it appears under **Leads**.

## Dashboard

- **Overview:** new leads, 7/30-day totals, leads per day, breakdown by form, latest leads.
- **Leads:** search everything, filter by form/status/date, CSV export of the current filter.
- **Lead page:** all submitted fields, reply by email or WhatsApp, status (new → contacted → won/lost/spam), internal notes, change history.
- **Delete data** (admins): permanently removes a person's submission for data-protection requests under Uganda's Data Protection and Privacy Act, 2019. The audit log keeps a record that a deletion happened, without the personal data.
- **Users / Audit log** (admins).

Roles: **viewer** can see and update leads; **admin** can also delete, manage users and see the audit log.

## Security notes

- Ingest and admin tokens are separate. The ingest token (held by Cloudflare) can only add submissions, never read them.
- Staff passwords: scrypt-hashed, 12+ characters. Sessions: HttpOnly, Secure, SameSite=Strict cookies, 12 hours. Only a SHA-256 of each session token is stored.
- Logins are rate-limited (8 failures per IP per 15 minutes); state-changing requests must come from the dashboard's own origin.
- The dashboard sets a strict Content-Security-Policy and renders all submitted data as plain text.
- Uploaded CVs are emailed, never stored; the database only records the file name and size.

## Operations

```bash
docker compose ps                                      # health
docker compose logs --tail=100 api                     # recent logs
docker compose exec api node src/cli.js list-users
docker compose exec api node src/cli.js reset-password someone@traverseminds.com
git pull && docker compose up -d --build api           # deploy an update
```

**Backups** are in `server/backups/` on the VPS. Copy them off the server regularly (e.g. `rsync` to
another machine or object storage): a backup on the same disk does not survive losing the VPS.

Restore:

```bash
docker compose exec -T db pg_restore -U traverseminds -d traverseminds --clean < backups/traverseminds-YYYY-MM-DD.dump
```

**Scripting access** (exports for other tools): `GET /submissions?form=&status=&since=YYYY-MM-DD&format=csv`
with `Authorization: Bearer <ADMIN_TOKEN>`.
