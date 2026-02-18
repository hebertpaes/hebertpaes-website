const assert = require('assert')
const { chromium } = require('playwright')

module.exports = async function (page, context) {
  const browser = await chromium.launch()
  const contextBrowser = await browser.newContext()
  const pageBrowser = await contextBrowser.newPage()

  const response = await pageBrowser.goto('https://hebertpaes.com', { waitUntil: 'networkidle' })
  assert.strictEqual(response.status(), 200, 'Status code deve ser 200')

  const performanceScore = await pageBrowser.evaluate(() => window.__LIGHTHOUSE_JSON__?.categories?.performance?.score || 0)
  if (performanceScore < 0.8) {
    throw new Error(`Lighthouse performance abaixo do limite: ${performanceScore}`)
  }

  await browser.close()
}
