#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${AZ_STORAGE_ACCOUNT:-}" || -z "${AZ_STORAGE_KEY:-}" ]]; then
  echo "AZ_STORAGE_ACCOUNT e AZ_STORAGE_KEY precisam estar definidos"
  exit 1
fi

TIMESTAMP=$(date -u +"%Y%m%d-%H%M%S")
ARTIFACT="hebertpaes-${TIMESTAMP}.tar.gz"

# garante build fresco
rm -rf .next out
npm ci
npm run build
npm run export

tar -czf "$ARTIFACT" out package.json package-lock.json next.config.js

az storage blob upload \
  --account-name "$AZ_STORAGE_ACCOUNT" \
  --account-key "$AZ_STORAGE_KEY" \
  --container-name hebertpaes-backups \
  --file "$ARTIFACT" \
  --name "$ARTIFACT" \
  --overwrite true

# opcional: apagar artefatos locais com mais de 7 dias
find . -name 'hebertpaes-*.tar.gz' -mtime +7 -delete

echo "Backup enviado: $ARTIFACT"
