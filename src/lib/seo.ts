import { site } from '../config/site';

/** Absolute URL with a trailing slash for pages (files like /sitemap.xml keep theirs). */
export function absUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path;
  let p = path.startsWith('/') ? path : `/${path}`;
  const last = p.split('/').pop() ?? '';
  if (!p.endsWith('/') && !last.includes('.') && !p.includes('#') && !p.includes('?')) p += '/';
  return `${site.url}${p}`;
}

/** "Crane Rental Dubai | Brand" — skipped if the title already names the brand. */
export function pageTitle(title: string): string {
  if (!site.titleSuffix || title.toLowerCase().includes(site.titleSuffix.toLowerCase())) return title;
  const full = `${title} | ${site.titleSuffix}`;
  return full.length <= 65 ? full : title;
}

export function whatsappUrl(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const sameAs = Object.values(site.social).filter(Boolean);
