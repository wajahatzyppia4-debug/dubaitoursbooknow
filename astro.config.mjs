// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import { site } from './src/config/site.ts';

// Pages hidden from Google are left out of the sitemap.
const EXCLUDE = ['/thank-you/', '/404/'];
// While there are no blog posts yet, the empty /blog/ page is hidden from Google too.
const hasPosts = fs.existsSync('src/content/blog') && fs.readdirSync('src/content/blog').some((f) => f.endsWith('.md'));
if (!hasPosts) EXCLUDE.push('/blog/');

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
