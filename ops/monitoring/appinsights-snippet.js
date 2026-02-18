import { ApplicationInsights } from '@microsoft/applicationinsights-web'

let appInsights

export const initAppInsights = () => {
  if (typeof window === 'undefined') return
  if (appInsights) return appInsights

  appInsights = new ApplicationInsights({
    config: {
      connectionString: process.env.NEXT_PUBLIC_APPINSIGHTS_CONN,
      enableAutoRouteTracking: true,
      enableAutoPageViewTracking: true,
      distributedTracingMode: 2,
      samplingPercentage: 80,
    },
  })
  appInsights.loadAppInsights()
  return appInsights
}

export const logCustomEvent = (name, properties = {}) => {
  if (!appInsights) return
  appInsights.trackEvent({ name }, properties)
}
