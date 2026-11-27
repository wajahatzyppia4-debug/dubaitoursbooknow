# Site Template

The starting point for every new website. It's a fast, SEO-ready site with no
WordPress or page builder. You don't need to code: ask Claude to do the steps below.

## What's built in

| Area | What you get |
| --- | --- |
| Speed | Pages are plain HTML (about 25 KB each, roughly 4 KB of JavaScript). Images are turned into WebP and resized for you. |
| Technical SEO | One title, description, canonical tag and H1 per page; sitemap and robots.txt are made for you; clean addresses like `/crane-rental-dubai/`. |
| Schema | Business (LocalBusiness), WebSite, WebPage, Service, FAQPage, BreadcrumbList and BlogPosting, all linked together. |
| Tracking | Spaces for Google Tag Manager, GA4, Google Ads, Meta Pixel, TikTok Pixel and Microsoft Clarity, plus verification for Google Search Console, Bing and Meta. |
| Leads | WhatsApp, call and email buttons, a sticky contact bar on phones, and a quote form. Every click and form is tracked as a lead. |
| Content | Each service page, area page and blog post is one simple text file. |
| AI search | `llms.txt` summary for ChatGPT, Perplexity and Claude. |
| Safety net | Every build runs an SEO check. If a page is broken (no title, duplicate description, wrong canonical, missing alt text...) the build stops and the live site stays as it was. |

## Start a new website

1. On GitHub, open this repository and click **Use this template** → **Create a new repository**.
   (If you don't see the button, go to Settings → General and tick **Template repository**.)
2. Ask Claude: *"Set up the new site in `<repo name>` for `<business>`"* and give it the
   business details (name, phone, WhatsApp, address, services, areas, domain).
3. Claude fills in `src/config/site.ts`, writes the service, area and blog pages, and opens a pull request.
4. Connect the repository to Vercel (recommended) or Netlify. See *Hosting* below.

## Everyday changes (just ask Claude)

- **New blog post:** "Write a blog post about *topic* targeting *search phrase*."
- **New service or area page:** "Add a page for *service* in *area*."
- **Add tracking:** "Add GTM-XXXXXXX to the site."
- **Search Console:** "Here is my Google verification code: ..."
- **Images:** upload the photo and say which page it is for.

## Where things live

```
src/config/site.ts        ← all business details, tracking IDs, colours, menu
src/content/services/     ← one .md file per service page
src/content/areas/        ← one .md file per area page
src/content/blog/         ← one .md file per blog post
src/assets/images/        ← photos (resized and converted automatically)
public/images/            ← logo and default share image
```

## Hosting

**Vercel (recommended):** go to vercel.com → Add New → Project → import the repository → Deploy.
Then add your domain under Settings → Domains. Every approved change goes live by itself, and each
pull request gets its own preview link.

**Netlify:** app.netlify.com → Add new site → Import from GitHub → pick the repository → Deploy.
Settings are already in `netlify.toml`.

**Namecheap / cPanel:** add the secrets `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` and the variable
`DEPLOY_TARGET` = `ftp` in the repository's Settings → Secrets and variables → Actions.
`.github/workflows/deploy-ftp.yml` then uploads the site on every change.

## Lead form

The form opens WhatsApp with the visitor's details by default. To get enquiries by email instead,
create a free key at web3forms.com and set `form.endpoint` to `https://api.web3forms.com/submit`
and `form.accessKey` to the key in `src/config/site.ts`.

## For developers

```
npm install
npm run dev        # local preview at http://localhost:4321
npm run build      # build + SEO check (fails on SEO errors)
```

Built with [Astro](https://astro.build). Node 22.12 or newer.
