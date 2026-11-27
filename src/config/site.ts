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
  url: 'https://dubaitoursbooknow.com',
  // PLACEHOLDER: confirm the business name with the owner.
  name: 'Dubai Tours Book Now',
  /** Shown after page titles: "Desert Safari Dubai | Dubai Tours Book Now" */
  titleSuffix: 'Dubai Tours Book Now',
  tagline: 'Desert safaris and private tours in Dubai, booked direct',
  description:
    'Book a Dubai desert safari from AED 110 with free hotel pickup, dune bashing, camel ride, BBQ dinner and live shows. Private 4x4 and city tours too.',
  /** Page language, e.g. 'en', 'ar', 'en-GB'. */
  lang: 'en',
  /** Open Graph locale, e.g. en_US, en_GB, ar_AE. */
  ogLocale: 'en_US',

  // ---- Business details (used in Schema and the footer) ------
  /** Schema.org business type: a tour operator is a TravelAgency. */
  businessType: 'TravelAgency',
  // PLACEHOLDER phone and WhatsApp: replace with the real numbers.
  phone: '+971 50 000 0000',
  /** Same phone, digits only with +, used for click-to-call. */
  phoneRaw: '+971500000000',
  /** WhatsApp number, digits only, country code first, no +. '' hides WhatsApp. */
  whatsapp: '971500000000',
  whatsappMessage: 'Hi, I would like to book a desert safari. Please share availability.',
  email: '',
  address: {
    street: 'Dubai',
    city: 'Dubai',
    region: 'Dubai',
    postalCode: '',
    country: 'AE',
  },
  /** Map pin. Right-click your location in Google Maps to copy these. */
  geo: { lat: 25.2048, lng: 55.2708 },
  /** Google Maps link to your Business Profile ('' to hide). */
  mapsUrl: '',
  openingHours: [
    {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
  ],
  priceRange: 'AED 110 - AED 1610',
  /** Cities or regions you serve (used in Schema areaServed). */
  areaServed: ['Dubai', 'Sharjah', 'Abu Dhabi'],
  foundingYear: '',

  // ---- Brand -------------------------------------------------
  brand: {
    primary: '#3A1F0F', // dark colour: header, footer, headings
    accent: '#F5A623', // highlight colour: buttons and links
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
    subject: 'New tour booking request - dubaitoursbooknow.com',
  },

  // ---- Menu --------------------------------------------------
  nav: [
    { label: 'Safari packages', href: '/#packages' },
    { label: 'Private safari', href: '/#private' },
    { label: 'City tours', href: '/#city-tours' },
    { label: 'FAQ', href: '/#faq' },
    { label: 'Contact', href: '/contact/' },
  ],

  // ---- Homepage (the Google Ads landing page) ----------------
  home: {
    seoTitle: 'Desert Safari Dubai Booking | From AED 110 with Pickup',
    h1: 'Desert Safari Dubai: Book Now from AED 110',
    intro:
      'Dune bashing in a 4x4 Land Cruiser, a camel ride, sandboarding, a sunset photo stop and a BBQ dinner with live shows at our desert camp. Free pickup and drop-off from any hotel or home in Dubai.',
    trustPoints: ['Free hotel pickup', 'Pay on the day', 'No hidden charges', 'WhatsApp reply in minutes'],
    faqs: [
      {
        q: 'How much is a desert safari in Dubai?',
        a: 'Our shared evening desert safari is AED 110 per person, including pickup, dune bashing, camel ride, sandboarding, BBQ dinner and live shows. Adding a quad bike ride makes it AED 180, the VIP version with quad bike is AED 285, and a private Land Cruiser for your own group starts at AED 610 per vehicle.',
      },
      {
        q: 'What time is pickup and how long does the safari last?',
        a: 'Pickup for the evening safari starts around 2:15 PM to 3:00 PM depending on your area, and you are back at your hotel at about 9:30 PM. The whole trip takes roughly six hours, including about 45 minutes of dune bashing and three hours at the camp.',
      },
      {
        q: 'Is hotel pickup really free?',
        a: 'Yes. Pickup and drop-off from any hotel, apartment or villa in Dubai is included in every safari and city tour price. Pickup from Sharjah or Abu Dhabi can be arranged for a small extra charge; ask us on WhatsApp.',
      },
      {
        q: 'Do I need to pay in advance?',
        a: 'No. You reserve your seats for free on WhatsApp, by phone or through the booking form, and pay in cash or by card on the day of the tour.',
      },
      {
        q: 'Is the desert safari suitable for children and older guests?',
        a: 'Yes. Our drivers are licensed desert drivers and can keep the dune drive gentle for families. Let us know if you are travelling with young children, older guests or anyone who is pregnant or has back problems, and we can skip or soften the dune bashing.',
      },
      {
        q: 'Are private and city tour prices per person or per car?',
        a: 'Per vehicle. A private safari or city tour price covers the whole Land Cruiser or car for your group, up to the number of guests shown on the package, so larger groups pay less per person.',
      },
    ],
  },
} as const;

export type Site = typeof site;
