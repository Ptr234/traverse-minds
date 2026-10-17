#!/usr/bin/env bash
# One-time setup of the Traverse Minds API on the shared Ngyero VPS (native Postgres 16, nginx, systemd).
# Safe to re-run: every step checks before it changes anything. Never touches ERP or WID services.
#
# Order: run deploy.sh (uploads the code), then on the server:
#   sudo bash /opt/traverseminds/server/deploy/setup.sh
# then deploy.sh again to install dependencies and start the service.
set -euo pipefail

APP_USER=traverseminds
APP_DIR=/opt/traverseminds
SRC_DIR=$APP_DIR/server
ENV_FILE=$SRC_DIR/.env.production
DB_NAME=traverseminds_db
DB_ROLE=traverseminds_user
PORT=4100

log() { printf '\n== %s\n' "$*"; }

[ "$(id -u)" -eq 0 ] || { echo "Run with sudo"; exit 1; }
[ -f "$SRC_DIR/deploy/traverseminds-api.service" ] || { echo "Upload the code first (deploy.sh)"; exit 1; }

log "Port $PORT must be free (ERP uses 3002/4000, WID 3001)"
if ss -ltn "( sport = :$PORT )" | grep -q ":$PORT" && ! systemctl is-active --quiet traverseminds-api; then
  echo "Port $PORT is in use by something else. Pick another PORT in this script, the unit and the nginx file."; exit 1
fi

log "System user $APP_USER"
id "$APP_USER" >/dev/null 2>&1 || useradd --system --home "$APP_DIR" --shell /usr/sbin/nologin "$APP_USER"
install -d -o "$APP_USER" -g "$APP_USER" -m 750 "$APP_DIR" "$APP_DIR/backups"
chown -R "$APP_USER:$APP_USER" "$SRC_DIR"

log "Postgres role $DB_ROLE and database $DB_NAME (separate from erp_db and WID)"
if [ ! -f "$ENV_FILE" ]; then
  DB_PASS=$(openssl rand -hex 24)
  if sudo -u postgres psql -tAc "SELECT 1 FROM pg_roles WHERE rolname='$DB_ROLE'" | grep -q 1; then
    sudo -u postgres psql -q -c "ALTER ROLE $DB_ROLE WITH LOGIN PASSWORD '$DB_PASS'"
  else
    sudo -u postgres psql -q -c "CREATE ROLE $DB_ROLE WITH LOGIN PASSWORD '$DB_PASS'"
  fi
  sudo -u postgres psql -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'" | grep -q 1 \
    || sudo -u postgres psql -q -c "CREATE DATABASE $DB_NAME OWNER $DB_ROLE"
  sudo -u postgres psql -q -d "$DB_NAME" -c "REVOKE ALL ON SCHEMA public FROM PUBLIC; GRANT ALL ON SCHEMA public TO $DB_ROLE;"

  log "Writing $ENV_FILE (mode 600)"
  umask 077
  cat > "$ENV_FILE" <<EOF
DATABASE_URL=postgres://$DB_ROLE:$DB_PASS@127.0.0.1:5432/$DB_NAME
INGEST_TOKEN=$(openssl rand -hex 32)
ADMIN_TOKEN=$(openssl rand -hex 32)
PORT=$PORT
HOST=127.0.0.1
EOF
  chown "$APP_USER:$APP_USER" "$ENV_FILE"
  chmod 600 "$ENV_FILE"
else
  echo "$ENV_FILE exists, keeping its secrets"
fi

log "systemd unit"
install -m 644 "$SRC_DIR/deploy/traverseminds-api.service" /etc/systemd/system/traverseminds-api.service
systemctl daemon-reload
systemctl enable traverseminds-api >/dev/null

log "nginx site (added alongside ERP and WID, which are not edited)"
install -m 644 "$SRC_DIR/deploy/nginx-traverseminds-api.conf" /etc/nginx/sites-available/traverseminds-api
ln -sf /etc/nginx/sites-available/traverseminds-api /etc/nginx/sites-enabled/traverseminds-api
if nginx -t 2>/tmp/nginx-test.log; then
  systemctl reload nginx
else
  cat /tmp/nginx-test.log
  rm -f /etc/nginx/sites-enabled/traverseminds-api
  echo "nginx config test failed; our site was disabled again and nginx was NOT reloaded"; exit 1
fi

log "Nightly backup at 02:30 (ERP's runs at 02:00)"
CRON="30 2 * * * $SRC_DIR/deploy/backup.sh >> $APP_DIR/backups/backup.log 2>&1"
# `|| true`: a first run has no crontab yet, and grep finding nothing must not abort the script
{ crontab -u "$APP_USER" -l 2>/dev/null | grep -v 'deploy/backup.sh' || true; echo "$CRON"; } | crontab -u "$APP_USER" -

log "Done"
cat <<EOF
Next:
  1. DNS: A record api.traverseminds.ug -> this server's IP
  2. sudo certbot --nginx -d api.traverseminds.ug
  3. Start it: run deploy.sh again from your machine
  4. Create your admin:  sudo -u $APP_USER bash -c 'cd $SRC_DIR && set -a && . ./.env.production && node src/cli.js create-user you@example.com "Your Name" admin'
  5. Cloudflare SUBMISSIONS_API_TOKEN = INGEST_TOKEN from:  sudo grep INGEST_TOKEN $ENV_FILE
EOF
