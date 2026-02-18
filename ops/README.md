# Integração Operacional para hebertpaes.com

Este diretório descreve uma arquitetura opinativa (e scripts de referência) para entregar um ciclo completo de **monitoramento → backup → deploy → notificações** para o site [hebertpaes.com](https://hebertpaes.com).

> ⚠️ Nada aqui foi aplicado em produção. Revise as variáveis de ambiente e conectores antes de usar.

## Visão Geral

| Enabler | Stack sugerida | Responsável |
| --- | --- | --- |
| Monitoramento | Checkly (uptime + lighthouse) + Azure Application Insights | `monitoring/` |
| Backup automático | GitHub Actions + Azure Blob Storage (redundância GRS) | `backup/` |
| Deploy automatizado | GitHub Actions → Azure Static Web Apps | `deploy/` |
| Notificações | Webhooks (Slack/Teams/Telegram) + StatusPage | `notifications/` |

Fluxo:
1. `main` recebe PR aprovado → pipeline builda Next.js e publica no Static Web App.
2. Artifact final é versionado e enviado para Blob Storage (backup) + release tag.
3. Checkly roda verificações de uptime/lighthouse e envia métricas para Application Insights.
4. Todos os jobs reportam status via webhook (Slack) e criam incidentes no StatusPage se cair.

## Como usar
1. Copie os arquivos de cada pasta para seu repositório (ajuste nomes).
2. Preencha os segredos indicados nas seções **Secrets necessários**.
3. Execute os comandos marcados como `once` (provisionamento Azure, criação de recursos).
4. Teste cada componente isoladamente antes de integrar.

Cada subpasta tem um `README` com instruções detalhadas.
