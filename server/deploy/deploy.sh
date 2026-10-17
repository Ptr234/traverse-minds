#!/usr/bin/env bash
# Ship the committed server/ folder to the shared Ngyero VPS and restart the service.
# Run from the repo root in Windows Git Bash:  ./server/deploy/deploy.sh
#
# Uses Windows' own ssh.exe because the key the VPS accepts lives in the Windows OpenSSH agent
# (Git Bash's ssh and ~/.ssh keys are refused, same as for the Ngyero ERP deploy).
set -euo pipefail

HOST=${DEPLOY_HOST:-ubuntu@57.129.67.69}
SSH=${DEPLOY_SSH:-/c/Windows/System32/OpenSSH/ssh.exe}
SRC_DIR=/opt/traverseminds/server

cd "$(git rev-parse --show-toplevel)"
if ! git diff --quiet HEAD -- server; then
  echo "Commit your changes under server/ first: a deploy is always one commit."; exit 1
fi
COMMIT=$(git rev-parse --short HEAD)
echo "Deploying server/ at $COMMIT to $HOST"

# Upload the committed tree (never the local .env or node_modules) and swap it in, keeping .env.production
git archive --format=tar HEAD server | "$SSH" "$HOST" "
  set -e
  STAGE=\$(mktemp -d)
  tar -x -C \"\$STAGE\"
  sudo install -d -m 750 /opt/traverseminds
  sudo mkdir -p $SRC_DIR
  sudo find $SRC_DIR -mindepth 1 -maxdepth 1 ! -name .env.production ! -name node_modules -exec rm -rf {} +
  sudo cp -a \"\$STAGE\"/server/. $SRC_DIR/
  echo $COMMIT | sudo tee $SRC_DIR/RELEASE >/dev/null
  rm -rf \"\$STAGE\"
  chmod_user=\$(id -u traverseminds >/dev/null 2>&1 && echo traverseminds || echo root)
  sudo chown -R \"\$chmod_user:\$chmod_user\" $SRC_DIR
  # The folder is mode 750, so the glob must expand as root, not in this shell
  sudo sh -c \"chmod +x $SRC_DIR/deploy/*.sh\"
"

# First run stops here: setup.sh creates the user, database, unit and nginx site
if ! "$SSH" "$HOST" "id traverseminds >/dev/null 2>&1 && test -f /etc/systemd/system/traverseminds-api.service"; then
  echo "Code uploaded. Now run setup once:"
  echo "  $SSH $HOST \"sudo bash $SRC_DIR/deploy/setup.sh\""
  exit 0
fi

"$SSH" "$HOST" "
  set -e
  sudo -u traverseminds bash -c 'cd $SRC_DIR && npm ci --omit=dev --no-audit --no-fund'
  sudo systemctl restart traverseminds-api
  for i in \$(seq 1 20); do curl -fs http://127.0.0.1:4100/health >/dev/null && break; sleep 1; done
  curl -fs http://127.0.0.1:4100/health && echo
  systemctl is-active traverseminds-api
"
echo "Deployed $COMMIT"
