/**
 * ============================================================
 *  SITE SETTINGS — the one file to fill in for every new site.
 * ============================================================
 *  Everything here feeds the whole site: page titles, Schema,
 *  sitemap, robots.txt, canonical tags, tracking and the buttons.
 *
 *  Leave a value as '' (empty) to switch that feature off.
 *  Service pages, area pages and blog posts live in src/content/.
 */

export const site = {
  // ---- Basics ------------------------------------------------
  /** Live web address, with https:// and NO slash at the end. */
  url: 'https://www.example.com',
  name: 'Example Equipment Rental',
  /** Shown after page titles: "Crane Rental Dubai | Example Equipment Rental" */
  titleSuffix: 'Example Equipment Rental',
  tagline: 'Heavy equipment rental across Dubai and the UAE',
  description:
    'Rent cranes, forklifts, excavators and access equipment in Dubai with fast delivery, certified operators and flexible daily, weekly and monthly rates.',
  /** Page language, e.g. 'en', 'ar', 'en-GB'. */
  lang: 'en',
  /** Open Graph locale, e.g. en_US, en_GB, ar_AE. */
  ogLocale: 'en_US',

  // ---- Business details (used in Schema and the footer) ------
  /**
   * Schema.org business type. Pick the closest one from
   * https://schema.org/LocalBusiness (see "More specific Types"), e.g.
   * 'LocalBusiness', 'HomeAndConstructionBusiness', 'AutomotiveBusiness',
   * 'Dentist', 'LegalService', 'MovingCompany', 'Plumber', 'Electrician'.
   * When unsure, keep 'LocalBusiness'.
   */
  businessType: 'LocalBusiness',
  phone: '+971 50 000 0000',
  /** Same phone, digits only with +, used for click-to-call. */
  phoneRaw: '+971500000000',
  /** WhatsApp number, digits only, country code first, no +. '' hides WhatsApp. */
  whatsapp: '971500000000',
  whatsappMessage: 'Hi, I would like a quote.',
  email: 'info@example.com',
  address: {
    street: 'Al Quoz Industrial Area 3',
    city: 'Dubai',
    region: 'Dubai',
    postalCode: '',
    country: 'AE',
  },
  /** Map pin. Right-click your location in Google Maps to copy these. */
  geo: { lat: 25.1264, lng: 55.2281 },
  /** Google Maps link to your Business Profile ('' to hide). */
  mapsUrl: '',
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  priceRange: '$$',
  /** Cities or regions you serve (used in Schema areaServed). */
  areaServed: ['Dubai', 'Sharjah', 'Abu Dhabi'],
  foundingYear: '',

  // ---- Brand -------------------------------------------------
  brand: {
    primary: '#14213D', // dark colour: header, footer, headings
    accent: '#FCA311', // highlight colour: buttons and links
  },
  /** Files inside the /public folder. */
  logo: '/images/logo.svg',
  /** Default share image (1200x630 JPG) for WhatsApp, Facebook, LinkedIn. */
  defaultShareImage: '/images/share-default.jpg',

  // ---- Social profiles (Schema sameAs + footer icons) --------
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    tiktok: '',
    x: '',
  },

  // ---- Tracking ----------------------------------------------
  /**
   * Recommended: use Google Tag Manager only, and set up GA4, Google Ads
   * and pixels INSIDE Tag Manager. Then leave the other IDs empty.
   * If you fill in an ID below as well as setting it up in Tag Manager,
   * visits get counted twice.
   */
  tracking: {
    gtmId: '', // 'GTM-XXXXXXX'
    ga4Id: '', // 'G-XXXXXXXXXX'   (only if NOT using Tag Manager)
    googleAdsId: '', // 'AW-123456789' (only if NOT using Tag Manager)
    /** Conversion label for leads, from Google Ads > Conversions. */
    googleAdsLeadLabel: '',
    metaPixelId: '', // Facebook / Instagram pixel
    tiktokPixelId: '',
    microsoftClarityId: '', // free heatmaps
    /** true = ask EU/UK visitors before tracking (Consent Mode v2 defaults). */
    consentModeEU: false,
  },

  // ---- Search engine verification ----------------------------
  /** Paste only the content="..." part of each verification tag. */
  verification: {
    google: '', // Google Search Console (HTML tag method)
    bing: '', // Bing Webmaster Tools
    yandex: '',
    facebookDomain: '', // Meta Business domain verification
  },

  // ---- Lead form ---------------------------------------------
  /**
   * Where form enquiries are sent. Free options:
   *  - Web3Forms: endpoint 'https://api.web3forms.com/submit' + accessKey
   *  - Formspree: endpoint 'https://formspree.io/f/xxxxxxx', no accessKey
   * Leave endpoint '' and the form opens WhatsApp with the details instead.
   */
  form: {
    endpoint: '',
    accessKey: '',
    subject: 'New website enquiry',
  },

  // ---- Menu --------------------------------------------------
  nav: [
    { label: 'Services', href: '/#services' },
    { label: 'Areas', href: '/#areas' },
    { label: 'Blog', href: '/blog/' },
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
  ],

  // ---- Homepage ----------------------------------------------
  home: {
    seoTitle: 'Equipment Rental Dubai | Cranes, Forklifts & Excavators',
    h1: 'Equipment Rental in Dubai, Delivered Fast',
    intro:
      'Cranes, forklifts, excavators and access platforms for rent across Dubai, Sharjah and Abu Dhabi. Certified operators, same-day delivery and clear daily, weekly and monthly rates.',
    trustPoints: ['Same-day delivery', 'Certified operators', '24/7 support', 'Fully insured fleet'],
    faqs: [
      {
        q: 'How quickly can you deliver equipment in Dubai?',
        a: 'Most machines can be delivered the same day or the next morning anywhere in Dubai, depending on availability and site access.',
      },
      {
        q: 'Do you rent equipment with an operator?',
        a: 'Yes. Every machine can be rented with a certified operator, or without one for clients who have their own licensed staff.',
      },
      {
        q: 'What rental periods do you offer?',
        a: 'Daily, weekly and monthly rentals. Longer rentals get lower rates, so ask for a monthly quote for projects over three weeks.',
      },
    ],
  },
} as const;

export type Site = typeof site;
