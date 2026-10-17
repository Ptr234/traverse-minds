#!/usr/bin/env bash
# Nightly pg_dump of traverseminds_db, keeping 14 days. Installed on cron by setup.sh (runs as traverseminds).
# Copy /opt/traverseminds/backups off the server regularly: a backup on the same disk won't survive losing it.
set -euo pipefail

ENV_FILE=/opt/traverseminds/server/.env.production
OUT_DIR=/opt/traverseminds/backups

DATABASE_URL=$(grep '^DATABASE_URL=' "$ENV_FILE" | cut -d= -f2-)
FILE="$OUT_DIR/traverseminds-$(date +%F).dump"

pg_dump "$DATABASE_URL" -Fc -f "$FILE.partial"
mv "$FILE.partial" "$FILE"
find "$OUT_DIR" -name 'traverseminds-*.dump' -mtime +14 -delete
echo "$(date -Is) backup ok: $FILE ($(du -h "$FILE" | cut -f1))"
