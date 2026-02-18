# Deploy Automatizado - hebertpaes.com

Pipeline baseado em GitHub Actions + Azure Static Web Apps (SWA).

## Estratégia

- Branch `main`: produção
- Branch `develop`: preview environment
- Deploy acionado por push/merge
- Artefato final (export estático) anexado ao workflow e enviado para backup

## Recursos Azure

```bash
az group create -n hebertpaes-rg -l eastus
az staticwebapp create \
  -n hebertpaes-web \
  -g hebertpaes-rg \
  -s https://github.com/<org>/hebertpaes.com \
  -b main \
  -l eastus2 \
  -r "node:20"
```

Secrets necessários no repositório:
- `AZURE_STATIC_WEB_APPS_API_TOKEN`
- `AZ_STORAGE_ACCOUNT`, `AZ_STORAGE_KEY` (para backup dentro do deploy)
- `SLACK_WEBHOOK_URL` (para notificações do job)

## Workflows

- `deploy.yml`: build/preview/prod + backup + notificação
