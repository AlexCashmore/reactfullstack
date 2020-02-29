#!/bin/bash

set -e

SERVICE_PATH_FILE=$(readlink -f "$0")
WORKING_DIRECTORY=$(dirname "${SERVICE_PATH_FILE}")

set +x +v

echo "Pulling latest project version and settings..."

# Pull latest code
if [[ -e $WORKING_DIRECTORY ]]; then
  cd $WORKING_DIRECTORY
  git pull
fi

echo "Installing modules..."

# Install and clean node_modules
npm install --production

echo "Cleaning unused files..."

npm prune --production

gulp

echo "Reloading completed."
# Project should be updated after this shell with "systemctl --user reload framework"