# Notificações de Status

## Objetivos
- Alertas instantâneos (Slack/Telegram/Email) para falhas de monitoramento ou deploy.
- Atualização automática de StatusPage (ou issue GitHub) durante incidentes.

## Componentes
1. **Webhook endpoints** (`webhook-endpoints.json`): descreve destinos.
2. **Incident automation** (`statuspage-incident.js`): Cloud Function (ou Azure Function) que cria/resolve incidentes.
3. **Notification Matrix** (`matrix.md`): quem recebe o quê.

### Fluxo
- Checkly → Webhook (Falha) → `statuspage-incident` abre incidente + posta no Slack.
- GitHub Action (deploy) → Webhook success/failure → atualiza thread de release.
- Backup job → Slack #infra semanal com resumo.

## Secrets necessários
- `SLACK_WEBHOOK_URL`
- `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` (opcional)
- `STATUSPAGE_API_KEY`
