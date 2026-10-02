// Run after npm run build: node scripts/check-article-reader.mjs
import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { load } from 'cheerio';

let checked = 0;
const index = load(readFileSync('dist/blog/index.html', 'utf8'));
assert.match(index('h1').text(), /Notes from the edit/);
const articleLinks = index('main a[href^="/blog/"]').map((_, link) => index(link).attr('href')).get();
for (const entry of readdirSync('dist/blog', { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const $ = load(readFileSync(`dist/blog/${entry.name}/index.html`, 'utf8'));
  assert.equal($('#article-body').length, 1, `${entry.name}: article body missing`);
  assert.equal($('#article-top[tabindex="-1"]').length, 1, `${entry.name}: focus target missing`);
  assert.equal($('#reading-progress[role="progressbar"]').length, 1, `${entry.name}: progress missing`);
  assert.ok(articleLinks.includes(`/blog/${entry.name}`), `${entry.name}: index link missing`);
  assert.equal($('h1').length, 1, `${entry.name}: expected one page title`);
  assert.equal($('meta[property="og:type"]').attr('content'), 'article');
  assert.equal($('link[rel="canonical"]').attr('href'), `https://alphabravomedia.co/blog/${entry.name}/`);
  assert.ok($('meta[property="article:published_time"]').attr('content'));
  const headings = $('#article-body h2[id]').length;
  if (headings >= 2) assert.ok($('[data-contents-link]').length >= headings, `${entry.name}: chapters missing`);
  if (headings >= 2) assert.equal($('details.article-page_contents > summary').length, 1, `${entry.name}: mobile disclosure missing`);
  $('[data-contents-link]').each((_, link) => {
    const id = decodeURIComponent($(link).attr('href').slice(1));
    assert.ok($('[id]').toArray().some(element => element.attribs.id === id), `${entry.name}: chapter ${id} is broken`);
  });
  checked++;
}
assert.ok(checked > 0, 'No built articles found');
console.log(`Article reader markup checked on ${checked} articles.`);
