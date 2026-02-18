import fetch from 'node-fetch'

const STATUSPAGE_API_KEY = process.env.STATUSPAGE_API_KEY
const STATUSPAGE_PAGE_ID = process.env.STATUSPAGE_PAGE_ID

export const handler = async (event) => {
  const payload = JSON.parse(event.body)
  const { status, source, message, url } = payload

  if (!STATUSPAGE_API_KEY || !STATUSPAGE_PAGE_ID) {
    console.error('Statuspage secrets não configurados')
    return { statusCode: 500, body: 'Missing secrets' }
  }

  if (status === 'resolved') {
    return resolveIncident(payload)
  }
  return createIncident({ source, message, url })
}

const createIncident = async ({ source, message, url }) => {
  const body = {
    incident: {
      name: `[${source}] indisponível`,
      status: 'investigating',
      impact_override: 'minor',
      body: `${message}\nFonte: ${url}`,
    },
  }

  await fetch(`https://api.statuspage.io/v1/pages/${STATUSPAGE_PAGE_ID}/incidents`, {
    method: 'POST',
    headers: {
      'Authorization': `OAuth ${STATUSPAGE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return { statusCode: 200, body: 'Incident created' }
}

const resolveIncident = async ({ incident_id, message }) => {
  await fetch(`https://api.statuspage.io/v1/pages/${STATUSPAGE_PAGE_ID}/incidents/${incident_id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `OAuth ${STATUSPAGE_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ incident: { status: 'resolved', body: message } }),
  })

  return { statusCode: 200, body: 'Incident resolved' }
}
