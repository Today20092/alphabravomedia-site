// Run after npm run build. Checks the public build and Cloudflare redirect contract.
import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { load } from 'cheerio';

for (const route of ['services', 'portfolio', 'gallery']) {
  assert.equal(existsSync(`dist/${route}`), false, `${route} must not be built`);
}
const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
assert.doesNotMatch(sitemap, /\/(services|portfolio|gallery)(\/|<)/);
assert.doesNotMatch(sitemap, /\/404\/?</);
assert.match(sitemap, /\/resources\//);
const notFound = load(readFileSync('dist/404.html', 'utf8'));
assert.match(notFound('meta[name="robots"]').attr('content'), /noindex/);

const rules = readFileSync('dist/_redirects', 'utf8').split('\n')
  .filter(line => line.trim() && !line.startsWith('#'))
  .map(line => line.trim().split(/\s+/));
const redirects = new Map(rules.map(([from, to]) => [from, to]));
assert.equal(redirects.size, rules.length, 'Duplicate redirect sources');
const expected = {
  '/services': '/about/',
  '/services/audio-setup': '/about/',
  '/services/mobile-podcast': '/about/',
  '/services/monthly-retainers': '/about/',
  '/services/school-portraits': '/about/',
  '/services/weddings': '/about/',
  '/portfolio': 'https://ayoubabed.xyz/#portfolio',
  '/portfolio/av-live-production/ensuring-every-word-matters': 'https://www.youtube.com/@alphabravomedia',
  '/portfolio/documentary/american-youth-academy-class-of-2026-graduation-film': 'https://ayoubabed.xyz/portfolio/aya-academy/',
  '/portfolio/documentary/maan-academy': 'https://ayoubabed.xyz/portfolio/maan-academy/',
  '/portfolio/podcast/konan-bbq-parenting-crisis-podcast': 'https://ayoubabed.xyz/portfolio/konan-bbq-podcast/',
  '/portfolio/podcast/konan-bbq-podcast': 'https://ayoubabed.xyz/portfolio/konan-bbq-podcast/',
  '/portfolio/podcast/lavena-wellness-podcast-channel-management': 'https://ayoubabed.xyz/portfolio/lavena-health/',
  '/portfolio/podcast/rizq-mdjd-podcast': 'https://ayoubabed.xyz/portfolio/rizqmd-jd-podcast/',
  '/portfolio/talking-head/erchid-law-firm': 'https://ayoubabed.xyz/portfolio/omar-erchid-law-firm/',
  '/portfolio/talking-head/title-town-closing-group-videos': 'https://ayoubabed.xyz/portfolio/omar-erchid-law-firm/',
  '/portfolio/weddings': 'https://www.youtube.com/@alphabravomedia',
  '/portfolio/weddings/amira-muhammad-wedding': 'https://www.youtube.com/@alphabravomedia',
  '/portfolio/youtube-series/ya-hala-haithum': 'https://ayoubabed.xyz/portfolio/ya-hala/',
  '/gallery': 'https://ayoubabed.xyz/galleries/',
  '/gallery/headshots': 'https://ayoubabed.xyz/galleries/',
};
for (const [from, to] of Object.entries(expected)) {
  for (const path of [from, `${from}/`]) assert.equal(redirects.get(path), to, path);
}
for (const [from, to, status] of rules) {
  assert.equal(status, '301');
  assert.equal(redirects.has(to), false, `Redirect chain or loop at ${from}`);
  assert.doesNotMatch(from, /^\/gallery\/amira-muhammad|\*/);
  if (to.startsWith('/')) assert.ok(existsSync(`dist${to}index.html`), to);
}
for (const file of readdirSync('dist', { recursive: true })) {
  assert.doesNotMatch(file, /amira-muhammad/i);
  if (/\.(html|js|json|xml)$/.test(file)) {
    assert.doesNotMatch(readFileSync(`dist/${file}`, 'utf8'), /media\.alphabravomedia\.co\/galleries\/amira-muhammad|329136c7db5de566/);
  }
}
const baseline = JSON.parse(readFileSync('routes.lock.json', 'utf8'));
const candidate = JSON.parse(readFileSync('.seo-report/routes.lock.json', 'utf8'));
assert.deepEqual(baseline, candidate, 'Route baseline must match the reviewed build');
console.log('Retired routes, permanent redirects, private gallery exclusion, and route baseline checks passed.');
