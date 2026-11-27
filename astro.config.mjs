// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site } from './src/config/site.ts';

// Pages hidden from Google are left out of the sitemap.
const EXCLUDE = ['/thank-you/', '/404/'];

export default defineConfig({
  site: site.url,
  // Every page address ends with "/" (e.g. /about/). This works the same on
  // Vercel, Netlify and Namecheap, so canonical tags always match.
  trailingSlash: 'always',
  build: { format: 'directory', inlineStylesheets: 'always' },
  integrations: [
    sitemap({
      filter: (page) => !EXCLUDE.some((p) => page.endsWith(p)),
    }),
  ],
  prefetch: { prefetchAll: false, defaultStrategy: 'hover' },
});
