#!/usr/bin/env bash
# Staff account commands with the production environment loaded, run as the service user.
# On the VPS:  sudo /opt/traverseminds/server/deploy/admin.sh create-user you@example.com 'Your Name' admin
#              sudo /opt/traverseminds/server/deploy/admin.sh reset-password you@example.com
#              sudo /opt/traverseminds/server/deploy/admin.sh list-users
# From Windows PowerShell, wrap the remote command in double quotes and names in single quotes:
#   ssh -t ubuntu@57.129.67.69 "sudo /opt/traverseminds/server/deploy/admin.sh create-user you@example.com 'Your Name' admin"
set -euo pipefail
cd /opt/traverseminds/server
exec sudo -u traverseminds bash -c 'set -a; . ./.env.production; set +a; exec node src/cli.js "$@"' _ "$@"
