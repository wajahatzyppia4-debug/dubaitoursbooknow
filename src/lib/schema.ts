/**
 * JSON-LD Schema builders. Every page gets the business + website,
 * plus the blocks that fit the page (Service, FAQPage, BreadcrumbList,
 * BlogPosting). They are linked with @id so Google sees one connected graph.
 */
import { site } from '../config/site';
import { absUrl, sameAs } from './seo';

const BUSINESS_ID = `${site.url}/#business`;
const WEBSITE_ID = `${site.url}/#website`;

type Faq = { q: string; a: string };
export type Crumb = { name: string; path: string };

export function businessSchema() {
  const a = site.address;
  return {
    '@type': site.businessType,
    '@id': BUSINESS_ID,
    name: site.name,
    description: site.description,
    url: absUrl('/'),
    logo: absUrl(site.logo),
    image: absUrl(site.defaultShareImage),
    telephone: site.phoneRaw,
    email: site.email || undefined,
    priceRange: site.priceRange || undefined,
    foundingDate: site.foundingYear || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode || undefined,
      addressCountry: a.country,
    },
    geo: site.geo.lat ? { '@type': 'GeoCoordinates', latitude: site.geo.lat, longitude: site.geo.lng } : undefined,
    hasMap: site.mapsUrl || undefined,
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: site.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: sameAs.length ? sameAs : undefined,
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absUrl('/'),
    name: site.name,
    inLanguage: site.lang,
    publisher: { '@id': BUSINESS_ID },
  };
}

export function webPageSchema(opts: { path: string; title: string; description: string; type?: string }) {
  return {
    '@type': opts.type ?? 'WebPage',
    '@id': `${absUrl(opts.path)}#webpage`,
    url: absUrl(opts.path),
    name: opts.title,
    description: opts.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    inLanguage: site.lang,
  };
}

export function serviceSchema(opts: { path: string; name: string; description: string; areas?: string[]; image?: string }) {
  return {
    '@type': 'Service',
    '@id': `${absUrl(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: absUrl(opts.path),
    image: opts.image,
    provider: { '@id': BUSINESS_ID },
    areaServed: (opts.areas ?? [...site.areaServed]).map((name) => ({ '@type': 'Place', name })),
  };
}

export function faqSchema(faqs: readonly Faq[]) {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(crumbs: Crumb[]) {
  if (crumbs.length < 2) return null;
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absUrl(c.path),
    })),
  };
}

export function blogPostingSchema(opts: {
  path: string;
  title: string;
  description: string;
  date: Date;
  updated?: Date;
  author?: string;
  image?: string;
}) {
  return {
    '@type': 'BlogPosting',
    '@id': `${absUrl(opts.path)}#article`,
    headline: opts.title,
    description: opts.description,
    url: absUrl(opts.path),
    mainEntityOfPage: absUrl(opts.path),
    image: opts.image,
    datePublished: opts.date.toISOString(),
    dateModified: (opts.updated ?? opts.date).toISOString(),
    author: opts.author
      ? { '@type': 'Person', name: opts.author }
      : { '@type': 'Organization', name: site.name, url: absUrl('/') },
    publisher: { '@id': BUSINESS_ID },
    inLanguage: site.lang,
  };
}

/** Wrap blocks in one @graph, dropping empty ones. */
export function graph(...blocks: (object | null | undefined)[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [businessSchema(), websiteSchema(), ...blocks.filter(Boolean)],
  };
}
