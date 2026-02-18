# Monitoramento - hebertpaes.com

Componentes sugeridos:

1. **Checkly** para monitoramento sintético (uptime + testes Lighthouse).
2. **Azure Application Insights** para telemetria em tempo real (client-side via SDK + server logs).
3. **Statuspage (opcional)** ou Webhook customizado para publicação do status ao público.

## Provisionamento

```bash
# 1) Application Insights
az monitor app-insights component create \
  --app hebertpaes-appinsights \
  --location "eastus" \
  --resource-group hebertpaes-rg \
  --application-type web

# 2) Checkly (via Terraform)
cd monitoring
terraform init
terraform apply -var 'checkly_api_key=xxx' -var 'checkly_account_id=yyy'
```

## Arquivos

- `checkly-uptime.tf`: cria checks HTTP + Lighthouse + alertas
- `lighthouse.config.js`: configura thresholds de performance/acessibilidade
- `appinsights-snippet.js`: snippet para injetar SDK no Next.js

### checkly-uptime.tf (trecho)

```hcl
resource "checkly_check" "hebertpaes_prod" {
  name                      = "hebertpaes.com"
  type                      = "API"
  activated                 = true
  muted                     = false
  frequency                 = 1 # minuto
  locations                 = ["us-east-1", "eu-west-1", "sa-east-1"]
  request {
    method = "GET"
    url    = "https://hebertpaes.com"
  }
  alert_settings {
    escalation_type = "RUN_BASED"
    run_based_escalation {
      failed_runs = 3
    }
  }
}
```

### Snippet para Next.js (`appinsights-snippet.js`)

```js
import { ApplicationInsights } from '@microsoft/applicationinsights-web'

export const initAppInsights = () => {
  if (typeof window === 'undefined') return
  if (window.__appInsights) return

  const appInsights = new ApplicationInsights({
    config: {
      connectionString: process.env.NEXT_PUBLIC_APPINSIGHTS_CONN,
      enableAutoRouteTracking: true,
      samplingPercentage: 80,
    },
  })
  appInsights.loadAppInsights()
  window.__appInsights = appInsights
}
```

## Alertas

- Conecte Checkly ao Slack/Teams/Telegram pelo webhook descrito em `../notifications/webhook-endpoints.json`.
- Configure Alert Rules no Application Insights para métricas (p95 > 3s, taxa de erro > 1%).
