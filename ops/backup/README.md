# Backup Automático - hebertpaes.com

Objetivo: manter cópias versionadas do código + build estático do site em duas camadas:

1. **GitHub Releases** (artefato `.tar.gz` gerado no deploy)
2. **Azure Blob Storage** (redundância GRS) com retenção mínima de 30 dias

## Fluxo sugerido

1. Pipeline de deploy gera o build (`next build && next export`).
2. Script `backup.sh` compacta `out/` + `package-lock.json` + `next.config.js` e envia ao container `hebertpaes-backups`.
3. Job agendado (GitHub Actions ou Azure Automation) executa `backup-verify.yml` diariamente para garantir integridade e remover backups antigos (>90 dias).

## Pré-requisitos

- `AZ_STORAGE_ACCOUNT` + `AZ_STORAGE_KEY` com permissão RW.
- Container criado: `az storage container create -n hebertpaes-backups`.

## Arquivos

- `backup.sh`: script idempotente para subir o snapshot.
- `backup-verify.yml`: workflow GitHub agendado (02:00 UTC) para verificar backups.

> Execute `chmod +x backup.sh` antes de usar.
