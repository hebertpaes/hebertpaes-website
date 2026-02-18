# Notification Matrix

| Evento | Destinos | SLAs |
| --- | --- | --- |
| Deploy sucesso | Slack #deploys (thread por release) | Imediato |
| Deploy falha | Slack #infra + Telegram Ops | < 1 min |
| Uptime falha (Checkly) | Slack #infra + Statuspage incidente | < 1 min |
| Uptime recovery | Slack thread + resolve incidente | < 5 min |
| Backup diário ok | Slack #infra resumo semanal | 1x/dia |
| Backup falha | Slack #infra + email owner | < 5 min |
