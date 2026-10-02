// Run after npm run build.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { load } from 'cheerio';

for (const path of ['', 'about/', 'contact/', 'resources/']) {
  const $ = load(readFileSync(`dist/${path}index.html`, 'utf8'));
  assert.equal($('h1').length, 1, `${path}: expected one heading`);
  assert.deepEqual($('nav[aria-label="Main navigation"] a').map((_, a) => $(a).text()).get(), ['Home', 'Blog', 'Resources', 'Gear', 'About']);
  assert.equal($('.channel-header > a[href="https://youtube.com/@alphabravomedia"]').length, 1);
  assert.equal($('.proto-switcher, form, iframe[src*="tally"]').length, 0);
  assert.equal($('a.proto-skip').attr('href'), '#main-content');
  assert.equal($('#main-content').length, 1);
  for (const route of ['contact', 'privacy', 'terms']) assert.ok($(`footer a[href="/${route}"]`).length);
  assert.doesNotMatch($('main, header, footer').text(), /monthly retainers|consult call|start an inquiry/i);
  assert.ok($('link[rel="canonical"]').attr('href')?.startsWith('https://alphabravomedia.co/'));
}
const home = load(readFileSync('dist/index.html', 'utf8'));
for (const a of home('main a[href^="/"]').toArray()) {
  const href = home(a).attr('href');
  assert.ok(readFileSync(`dist/${href.replace(/^\//, '').replace(/\/$/, '')}/index.html`), `Missing ${href}`);
}
console.log('Informational homepage, navigation, and contact checks passed.');
