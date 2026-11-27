/**
 * Content types. Each page is one Markdown (.md) file:
 *   src/content/services/*.md  -> service pages   (e.g. /crane-rental-dubai/)
 *   src/content/areas/*.md     -> area pages      (e.g. /equipment-rental-al-quoz/)
 *   src/content/blog/*.md      -> blog posts      (e.g. /blog/my-post/)
 * The file name becomes the web address, so name files after the search phrase.
 * The build stops with a clear message if a required field is missing.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const faq = z.object({ q: z.string(), a: z.string() });

const seoFields = (image: any) => ({
  /** The H1 heading on the page. */
  title: z.string(),
  /** Google title (50-60 characters). Defaults to the title. */
  seoTitle: z.string().max(70, 'seoTitle is too long: keep it under 60 characters').optional(),
  /** Google description (120-160 characters). */
  description: z
    .string()
    .min(50, 'description is too short: aim for 120-160 characters')
    .max(170, 'description is too long: keep it under 160 characters'),
  image: image().optional(),
  imageAlt: z.string().optional(),
  faqs: z.array(faq).default([]),
  /** true = hide from Google and the sitemap. */
  noindex: z.boolean().default(false),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: ({ image }) =>
    z.object({
      ...seoFields(image),
      /** Short name for menus and cards, e.g. "Mobile Cranes". */
      name: z.string(),
      /** One or two sentences for the service card. */
      summary: z.string(),
      /** Optional price line, e.g. "From AED 900 / day". */
      price: z.string().optional(),
      highlights: z.array(z.string()).default([]),
      /** Lower numbers show first. */
      order: z.number().default(100),
    }),
});

const areas = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/areas' }),
  schema: ({ image }) =>
    z.object({
      ...seoFields(image),
      /** Area name, e.g. "Al Quoz". */
      name: z.string(),
      summary: z.string(),
      /** Landmarks or sub-areas you cover, shown as a list. */
      landmarks: z.array(z.string()).default([]),
      order: z.number().default(100),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      ...seoFields(image),
      /** Publish date, YYYY-MM-DD. */
      date: z.coerce.date(),
      /** Last big update, YYYY-MM-DD. */
      updated: z.coerce.date().optional(),
      author: z.string().optional(),
      tags: z.array(z.string()).default([]),
      /** true = not published yet. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { services, areas, blog };
