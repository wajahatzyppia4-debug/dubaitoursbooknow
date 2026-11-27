#!/usr/bin/env node
/**
 * SEO safety check. Runs after every build (npm run build).
 * Reads every page in dist/ and stops the build on real SEO mistakes,
 * so a broken site never goes live. Warnings are printed but don't stop it.
 *
 * Errors (build fails): missing/duplicate title or description, no H1 or
 * more than one, missing or wrong canonical, broken Schema JSON, images
 * without alt text, a page in the sitemap that is hidden from Google,
 * missing robots.txt or sitemap.
 * Warnings: title/description length, placeholder settings still in use,
 * tracking IDs that would double count.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page}: ${msg}`);
const warn = (page, msg) => warnings.push(`${page}: ${msg}`);

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found. Run "npm run build" first.');
  process.exit(1);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  return m ? decode(m[2] ?? m[3] ?? '') : null;
};
const metaContent = (html, key, value) => {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  const tag = tags.find((t) => attr(t, key)?.toLowerCase() === value);
  return tag ? attr(tag, 'content') : null;
};

// Site URL: read from robots.txt "Sitemap:" line (generated from site.ts).
const robotsPath = path.join(DIST, 'robots.txt');
let siteUrl = '';
if (!fs.existsSync(robotsPath)) err('robots.txt', 'missing');
else {
  const m = fs.readFileSync(robotsPath, 'utf8').match(/Sitemap:\s*(https?:\/\/[^/\s]+)/i);
  siteUrl = m ? m[1] : '';
  if (!siteUrl) err('robots.txt', 'has no Sitemap line');
}
if (/example\.com/.test(siteUrl)) warn('site.ts', 'url is still the placeholder https://www.example.com. Set your real domain before going live.');

const sitemapUrls = new Set();
for (const f of fs.readdirSync(DIST).filter((f) => /^sitemap-\d+\.xml$/.test(f))) {
  for (const m of fs.readFileSync(path.join(DIST, f), 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)) sitemapUrls.add(m[1]);
}
if (!fs.existsSync(path.join(DIST, 'sitemap-index.xml'))) err('sitemap', 'sitemap-index.xml missing');
if (!sitemapUrls.size) err('sitemap', 'no pages listed in the sitemap');

const titles = new Map();
const descriptions = new Map();
let pages = 0;
let usesGtm = false;
let usesDirectGa4 = false;

for (const file of walk(DIST)) {
  const rel = '/' + path.relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '').replace(/\.html$/, '/');
  const html = fs.readFileSync(file, 'utf8');
  pages++;
  if (html.includes('googletagmanager.com/gtm.js')) usesGtm = true;
  if (/gtag\/js\?id=G-/.test(html)) usesDirectGa4 = true;

  const robots = metaContent(html, 'name', 'robots') ?? '';
  const noindex = /noindex/i.test(robots);
  const url = `${siteUrl}${rel}`;

  if (noindex && sitemapUrls.has(url)) err(rel, 'is hidden from Google (noindex) but listed in the sitemap');
  if (!noindex && rel !== '/404/' && siteUrl && !sitemapUrls.has(url)) warn(rel, 'is not in the sitemap');

  // Title
  const title = decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? '');
  if (!title) err(rel, 'missing <title>');
  else {
    if (title.length > 65) warn(rel, `title is ${title.length} characters; Google shows about 60: "${title}"`);
    if (title.length < 15) warn(rel, `title is very short: "${title}"`);
    if (!noindex) titles.set(title, [...(titles.get(title) ?? []), rel]);
  }

  // Description
  const desc = metaContent(html, 'name', 'description');
  if (!desc) err(rel, 'missing meta description');
  else {
    if (desc.length > 165) warn(rel, `description is ${desc.length} characters; aim for 120-160`);
    if (desc.length < 70) warn(rel, `description is short (${desc.length} characters); aim for 120-160`);
    if (!noindex) descriptions.set(desc, [...(descriptions.get(desc) ?? []), rel]);
  }

  // H1
  const h1s = html.match(/<h1\b/gi)?.length ?? 0;
  if (h1s === 0) err(rel, 'has no H1 heading');
  if (h1s > 1) err(rel, `has ${h1s} H1 headings; use exactly one`);

  // Canonical
  const canonTag = (html.match(/<link\b[^>]*>/gi) ?? []).find((t) => attr(t, 'rel') === 'canonical');
  const canonical = canonTag ? attr(canonTag, 'href') : null;
  if (!noindex) {
    if (!canonical) err(rel, 'missing canonical tag');
    else if (canonical !== url) err(rel, `canonical points to ${canonical}, expected ${url}`);
  }

  // Schema
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const data = JSON.parse(m[1]);
      if (!data['@context']) err(rel, 'Schema block has no @context');
    } catch (e) {
      err(rel, `Schema JSON is broken: ${e.message}`);
    }
  }

  // Images
  for (const img of html.match(/<img\b[^>]*>/gi) ?? []) {
    const alt = attr(img, 'alt');
    if (alt === null) err(rel, `image without alt text: ${attr(img, 'src')}`);
    else if (alt === '' && !/aria-hidden/.test(img)) warn(rel, `image with empty alt text: ${attr(img, 'src')}`);
  }

  // Share image
  if (!noindex && !metaContent(html, 'property', 'og:image')) warn(rel, 'no share image (og:image)');
}

for (const [t, list] of titles) if (list.length > 1) err(list.join(', '), `share the same title "${t}"`);
for (const [d, list] of descriptions) if (list.length > 1) err(list.join(', '), `share the same description "${d.slice(0, 60)}..."`);
if (usesGtm && usesDirectGa4)
  warn('site.ts', 'both Tag Manager and a direct GA4 ID are set. If GA4 is also set up inside Tag Manager, visits are counted twice.');

console.log(`\nSEO check: ${pages} pages, ${sitemapUrls.size} in sitemap`);
if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} warning(s):`);
  for (const w of warnings) console.log(`  - ${w}`);
}
if (errors.length) {
  console.log(`\n❌ ${errors.length} error(s) — fix these before publishing:`);
  for (const e of errors) console.log(`  - ${e}`);
  process.exit(1);
}
console.log('\n✅ No SEO errors.\n');
