// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';
import icon from 'astro-icon';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://alphabravomedia.co/',
  output: 'static',

  integrations: [
    react(),
    mdx(),
    pagefind(),
    sitemap(),
    compress(),
    icon({
      include: {
        mdi: ['*'],
        'simple-icons': ['*'],
      },
    })
  ].filter(Boolean),

  markdown: {
    syntaxHighlight: false,
  },

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: cloudflare()
});