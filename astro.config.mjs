// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';

import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';
import icon from 'astro-icon';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import seo from 'brixon-seo';

// https://astro.build/config
export default defineConfig({
  site: 'https://alphabravomedia.co/',
  output: 'static',
  // Cloudflare serves these redirects; expose the same destinations to SEO validation.
  redirects: Object.fromEntries(
    readFileSync(new URL('./public/_redirects', import.meta.url), 'utf8').trim().split('\n')
      .map((line) => line.trim().split(/\s+/))
      .filter(([from]) => !from.endsWith('/'))
      .map(([from, to]) => [from, to])
  ),
  build: { redirects: false },
  integrations: [
    react(),
    mdx(),
    pagefind(),
    sitemap({ filter: (page) => !['/404', '/404/', '/gallery/amira-muhammad/'].includes(new URL(page).pathname) }),
    compress(),
    icon({
      include: {
        mdi: ['*'],
        'simple-icons': ['*'],
      },
    }),
    seo()
  ].filter(Boolean),
  markdown: {
    syntaxHighlight: false,
  },
  vite: {
    server: {
      allowedHosts: ['desktop-ayoub.cuttlefish-coho.ts.net'],
    },
    plugins: [tailwindcss()]
  }
});
