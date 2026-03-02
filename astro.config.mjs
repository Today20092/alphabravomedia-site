// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://today20092.github.io',
  base: '/alphabravomedia-site',
  integrations: [pagefind()],
  vite: {
    plugins: [tailwindcss()]
  }
});
