import type { APIRoute } from 'astro';
import { site } from '../config/site';

/** robots.txt: open to search engines and AI search bots, sitemap linked. */
export const GET: APIRoute = () =>
  new Response(
    [
      'User-agent: *',
      'Allow: /',
      'Disallow: /thank-you/',
      '',
      `Sitemap: ${site.url}/sitemap-index.xml`,
      '',
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
