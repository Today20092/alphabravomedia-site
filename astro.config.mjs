// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';
import sitemap from '@astrojs/sitemap';
import compress from '@playform/compress';
import icon from 'astro-icon';
import keystatic from '@keystatic/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  site: 'https://alphabravomedia.co/',
  integrations: [react(), keystatic(), pagefind(), sitemap(), compress(), icon({
    include: {
      mdi: ['*'],
      'simple-icons': ['*'],
    },
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});
