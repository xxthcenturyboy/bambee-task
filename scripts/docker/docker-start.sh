#!/usr/bin/env bash
set -e

# Export env vars
if [ -f .env ]; then
    . .env
fi
export NODE_ENV="production"

echo "[+] Location '${ROOT_DIR}'"

echo "[+] Running migrations"
# Run migrations
npm run migrate

# Start up!
node dist/server.js

exec "$@"
