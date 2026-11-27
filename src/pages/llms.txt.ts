import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { aed, allBookable } from '../config/packages';

/** llms.txt: a plain summary of the site for AI assistants (ChatGPT, Perplexity, Claude). */
export const GET: APIRoute = async () => {
  const services = await getCollection('services', (e) => !e.data.noindex);
  const areas = await getCollection('areas', (e) => !e.data.noindex);
  const posts = await getCollection('blog', (e) => !e.data.draft && !e.data.noindex);
  const line = (path: string, name: string, desc: string) => `- [${name}](${site.url}${path}): ${desc}`;
  const body = [
    `# ${site.name}`,
    '',
    `> ${site.description}`,
    '',
    `Phone: ${site.phone}${site.email ? ` · Email: ${site.email}` : ''} · Location: ${site.address.city}, ${site.address.country}`,
    '',
    '## Tours and prices (AED)',
    ...allBookable.map((b) => `- ${b.name}: ${aed(b.price)} ${b.unit}`),
    '',
    '## Services',
    ...services.sort((a, b) => a.data.order - b.data.order).map((s) => line(`/${s.id}/`, s.data.name, s.data.description)),
    '',
    '## Areas',
    ...areas.map((a) => line(`/${a.id}/`, a.data.name, a.data.description)),
    '',
    '## Guides',
    ...posts.map((p) => line(`/blog/${p.id}/`, p.data.title, p.data.description)),
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
