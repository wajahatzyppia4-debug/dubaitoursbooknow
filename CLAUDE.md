# Instructions for Claude

This repo is the website for dubaitoursbooknow.com (desert safari and Dubai tours, a Google Ads
landing page), built from the master site template (static, SEO-first, Astro).
Tour packages and prices live in `src/config/packages.ts`; the landing page is `src/pages/index.astro`.
The owner has no coding knowledge: explain things in plain language, avoid jargon,
and do the technical work yourself.

## Golden rules

- Never push to `main` directly. Work on a branch and open a pull request; `main` is
  what goes live on Vercel / Netlify / FTP.
- Run `npm run build` before every commit. It includes `scripts/seo-check.mjs`;
  the build must end with "No SEO errors". Never weaken or skip the check to make it pass.
- Don't add a CMS, database, or client-side framework (React, Vue...). Pages must stay plain HTML.
  Any new JavaScript must be small and inline.
- Don't put secrets (API keys, FTP passwords) in the code. Tracking IDs and the Web3Forms
  access key are public by design and are fine in `site.ts`.

## Setting up a new site from this template

1. Fill in every field of `src/config/site.ts` (url, name, phone, WhatsApp, address, geo,
   areaServed, brand colours, home section). Pick the closest `businessType` from schema.org.
2. Delete the example files in `src/content/services`, `areas` and `blog`, then write real ones.
   File name = URL slug = the main search phrase (e.g. `ac-repair-dubai-marina.md`).
3. Replace `public/images/logo.svg`, `public/favicon.svg`, `public/images/share-default.jpg`
   (1200x630) and the placeholder photos in `src/assets/images/`.
4. Build, check, open a PR.

## Writing pages that rank (what worked on dubaiequipmentrental.com)

- One page per search phrase, with the phrase in the file name, `title` (H1) and `seoTitle`.
- `seoTitle` 50-60 characters, `description` 120-160 characters, both unique per page.
- Real, specific content: sizes, prices, process, local detail. 600-1500 words for service pages.
- 3-6 FAQs per page in the `faqs` front matter (these become FAQPage Schema automatically).
- Link between pages in the text: blog posts link to the service page they relate to.
- Every image needs `imageAlt` describing the photo, ideally with the place name.
- Area pages need genuine local detail; don't mass-produce thin "service in every area" pages.

## Blog posts

Create `src/content/blog/<slug>.md` with front matter: `title`, `seoTitle`, `description`,
`date` (YYYY-MM-DD), optional `updated`, `author`, `image`, `imageAlt`, `tags`, `faqs`, `draft`.
Answer the title's question in the first paragraph. Use H2 sections, tables for comparisons,
and finish with a link to the matching service page.

## Tracking

- Prefer GTM only (`tracking.gtmId`); configure GA4/Ads/pixels inside GTM and leave the other IDs
  empty, or visits get counted twice. The SEO check warns if both GTM and a direct GA4 ID are set.
- Lead events pushed to `dataLayer`: `lead_click` (lead_type = whatsapp | call | email,
  link_location) and `generate_lead` (lead_type = form, service). Use them as GTM triggers.
- Form leads include UTM parameters, gclid/fbclid/ttclid and the landing page.
- After a successful form send, visitors land on `/thank-you/` (noindex).

## Key files

- `src/layouts/BaseLayout.astro`: head tags, canonical, Open Graph, Schema graph, tracking.
- `src/lib/schema.ts`: Schema builders. `src/lib/seo.ts`: URL and title helpers.
- `src/pages/[slug].astro`: service and area pages. `src/pages/blog/[slug].astro`: posts.
- `src/content.config.ts`: front matter fields and their limits.
- URLs always end with `/` (`trailingSlash: 'always'`), the same on every host.
