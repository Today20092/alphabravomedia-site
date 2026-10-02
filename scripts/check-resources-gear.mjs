// Run after npm run build. Verify the public resource and gear destinations.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { load } from 'cheerio';

const page = route => load(readFileSync(`dist/${route}/index.html`, 'utf8'));
const resources = page('resources');
assert.equal(resources('main a[href="https://github.com/Today20092/lut_builder"]').length, 1, 'Resources must link the tool repository');
for (const slug of ['false-color-lut-generator', 'davinci-resolve-media-management-archive-workflow']) {
  assert.equal(resources(`main a[href="/blog/${slug}"]`).length, 1);
  assert.equal(page(`blog/${slug}`)('h1').length, 1);
}
assert.equal(resources('main a[download]').length, 0, 'No invented downloads');
const gear = page('gear');
assert.match(gear('main').text(), /As an Amazon Associate I earn from qualifying purchases/);
for (const file of readdirSync('src/content/gear').filter(file => file.endsWith('.md'))) {
  const source = readFileSync(`src/content/gear/${file}`, 'utf8');
  const slug = file.replace(/\.md$/, '').toLowerCase();
  assert.equal(gear(`main a[href="/gear/${slug}"]`).length, 1, `Missing gear ${slug}`);
  const detail = page(`gear/${slug}`);
  const amazon = source.match(/^amazonLink:\s*["']?([^\s"']+)/m)?.[1];
  assert.ok(amazon, `${file}: missing source destination`);
  assert.equal(detail(`main a[href="${amazon}"]`).length, 1, `${slug}: changed affiliate destination`);
  assert.match(detail('main').text(), /As an Amazon Associate I earn from qualifying purchases/);
  assert.equal(detail('h1').length, 1);
  for (const anchor of detail('main a[href^="/gear/"]').toArray()) page(detail(anchor).attr('href').replace(/^\//, '').replace(/\/$/, ''));
}
console.log('Resource guides, repository, gear routes, and affiliate destinations passed.');
