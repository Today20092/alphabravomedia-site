// Run the dev server, then: node scripts/check-gear-shop.mjs
// Requires Playwright. GEAR_PLAYWRIGHT_MODULE can point to a bundled index.mjs.
import assert from 'node:assert/strict';
import { mkdirSync, readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const { chromium } = await import(process.env.GEAR_PLAYWRIGHT_MODULE
  ? pathToFileURL(process.env.GEAR_PLAYWRIGHT_MODULE).href : 'playwright');
const browser = await chromium.launch({ headless: true, channel: process.env.GEAR_BROWSER_CHANNEL || undefined });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const origin = process.env.GEAR_TEST_ORIGIN || 'http://127.0.0.1:4321';
  await page.goto(`${origin}/gear/`);
  await page.locator('[data-gear-controls]').waitFor({ state: 'visible' });
  const visible = () => page.locator('[data-gear-item]:visible').count();
  const total = await visible();
  assert.equal(total, readdirSync('src/content/gear').filter(file => file.endsWith('.md')).length);
  assert.equal(await page.locator('.gear-product-actions a').first().evaluate(element => getComputedStyle(element).color), 'rgb(19, 19, 19)', 'Retailer buttons must retain dark text on the bright brand background');
  await page.locator('#gear-search').fill('  SIGMA  ');
  assert.equal(await visible(), 3, 'Search should ignore case and surrounding spaces');
  await page.locator('#gear-category').selectOption('Audio');
  assert.equal(await visible(), 0, 'Search and category should combine');
  assert.ok(await page.locator('#gear-empty').isVisible());
  await page.locator('#gear-reset').click();
  assert.equal(await visible(), total);
  for (const [kit, count] of [['vlogs', 3], ['video', 4], ['portraits', 2], ['events', 3]]) {
    await page.locator(`[data-kit="${kit}"]`).click();
    assert.equal(await visible(), count, `${kit}: wrong kit contents`);
    assert.equal(await page.locator(`[data-kit="${kit}"]`).getAttribute('aria-current'), 'true');
    assert.equal(await page.locator('#gear-sigma-28-105mm').isVisible(), false, 'Wishlist item must not appear in current kits');
  }
  await page.locator('#gear-reset').click();
  await page.locator('#gear-category').selectOption('Lens');
  assert.equal(await visible(), 3);
  await page.locator('#gear-reset').click();
  await page.locator('#gear-sigma-85mm a[href="/gear/sigma-85mm"]').click();
  await page.waitForURL(/\/gear\/sigma-85mm\/?$/);
  await page.getByRole('link', { name: 'Back to Gear', exact: true }).click();
  await page.waitForURL(/\/gear\/?$/);
  await page.locator('[data-gear-controls]').waitFor({ state: 'visible' });
  await page.locator('#gear-search').fill('sigma');
  assert.equal(await visible(), 3, 'Filters should survive Astro client navigation');
  await page.locator('#gear-reset').click();
  mkdirSync('.scratch', { recursive: true });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: '.scratch/gear-shop-hero.png' });
  await page.screenshot({ path: '.scratch/gear-shop-desktop.png', fullPage: true });
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `Horizontal overflow at ${width}px`);
    await page.locator('#gear-search').fill('sigma');
    assert.equal(await visible(), 3);
    await page.locator('#gear-reset').click();
  }
  await page.screenshot({ path: '.scratch/gear-shop-mobile.png', fullPage: true });
  const withoutJS = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await withoutJS.newPage();
  await staticPage.goto(`${origin}/gear/`);
  assert.equal(await staticPage.locator('[data-gear-item]:visible').count(), total, 'All gear should remain browsable without JavaScript');
  await withoutJS.close();
  assert.deepEqual(errors, []);
  console.log('Gear search, categories, kits, reset, client navigation, mobile reflow, and no-JS browsing passed.');
} finally {
  await browser.close();
}
