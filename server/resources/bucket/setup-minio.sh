#!/bin/bash

# -e = exit on error, -u = exit on undefined variable access
# -> https://stackoverflow.com/a/2871034
set -eu

# parse arguments
if [ "$#" -ne 2 ]; then
    echo "Usage: setup-minio.sh <mc-alias> <minio-backend-password>"
    exit 1
fi
MC_ALIAS="$1"
MINIO_BACKEND_PASSWORD="$2"
echo "Setting up minio host $MC_ALIAS with backend password $MINIO_BACKEND_PASSWORD..."

# $0 is the current executable (in this case, this file) and dirname reads the
# parent directory of it.
# -> https://stackoverflow.com/a/242550
MINIO_SCRIPTS_DIR="$(dirname $(readlink -f "$0"))"

# actual setup
mc admin user add "$MC_ALIAS" raftmodding-web-backend "$MINIO_BACKEND_PASSWORD"
mc mb --ignore-existing "$MC_ALIAS/raftmodding-public"
mc mb --ignore-existing "$MC_ALIAS/raftmodding-private"
mc admin policy create "$MC_ALIAS/" raftmodding-web-backend-policy "$MINIO_SCRIPTS_DIR/minio.web-backend.json"
mc admin policy attach "$MC_ALIAS/" raftmodding-web-backend-policy --user raftmodding-web-backend
mc anonymous set download "$MC_ALIAS/raftmodding-public"
echo "Done!"
