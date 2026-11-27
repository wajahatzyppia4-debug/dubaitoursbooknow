/**
 * ============================================================
 *  TOUR PACKAGES AND PRICES — edit prices here.
 * ============================================================
 *  Every price on the site, in the booking form and in the Schema
 *  (Google's structured data) comes from this one file.
 *  Prices are in AED. `unit` says what the price covers.
 */
import type { ImageMetadata } from 'astro';
import sharingImg from '../assets/images/evening-desert-safari-sharing.jpg';
import vipImg from '../assets/images/vip-desert-camp-dubai.jpg';
import privateImg from '../assets/images/private-land-cruiser-safari.jpg';
import cityImg from '../assets/images/dubai-city-tour.jpg';

export type Tour = {
  id: string;
  name: string;
  price: number;
  unit: 'per person' | 'per vehicle';
  badge?: string;
  summary: string;
  includes: string[];
  image?: ImageMetadata;
  imageAlt?: string;
};

/** Shared evening safaris: you join other guests in the 4x4. Pickup about 2:15-3:00 PM, back about 9:30 PM. */
export const sharingSafaris: Tour[] = [
  {
    id: 'standard-desert-safari',
    name: 'Evening Desert Safari (Shared)',
    price: 110,
    unit: 'per person',
    badge: 'Most popular',
    summary: 'The classic Dubai evening safari: dunes at sunset, camel ride and dinner under the stars.',
    includes: [
      'Shared 4x4 Land Cruiser with pickup and drop-off',
      'About 45 minutes of dune bashing',
      'Camel ride, sandboarding and henna',
      'Sunset photo stop in the red dunes',
      'BBQ buffet dinner, soft drinks, water and tea',
      'Tanura, belly dance and fire show',
    ],
    image: sharingImg,
    imageAlt: 'Land Cruiser on the red dunes during an evening desert safari in Dubai',
  },
  {
    id: 'desert-safari-quad-bike',
    name: 'Desert Safari + Quad Bike',
    price: 180,
    unit: 'per person',
    badge: 'Best for thrill seekers',
    summary: 'Everything in the evening safari, plus your own ATV quad bike ride on the red dunes.',
    includes: [
      'Shared 4x4 Land Cruiser with pickup and drop-off',
      'ATV quad bike ride on the red dunes',
      'Dune bashing, camel ride and sandboarding',
      'Henna and Arabic costume photos',
      'BBQ buffet dinner, soft drinks, water and tea',
      'Tanura, belly dance and fire show',
    ],
    image: privateImg,
    imageAlt: 'Red sand dunes near Dubai where the quad bike safari rides take place',
  },
  {
    id: 'vip-desert-safari-quad-bike',
    name: 'VIP Desert Safari + Quad Bike',
    price: 285,
    unit: 'per person',
    badge: 'Best experience',
    summary: 'Quad biking, front-row VIP seating and table service at the camp for a relaxed, premium evening.',
    includes: [
      'Shared 4x4 Land Cruiser plus ATV quad bike ride',
      'VIP seating close to the stage',
      'Dinner served at your table, no buffet queue',
      'Dune bashing, camel ride, sandboarding and henna',
      'Soft drinks, water, tea and Arabic coffee',
      'Tanura, belly dance and fire show',
    ],
    image: vipImg,
    imageAlt: 'VIP desert camp near Dubai lit up at night under the stars',
  },
];

/** Private 4x4 safaris: the whole Land Cruiser and driver for your group. Prices per vehicle. */
export const privateSafaris = [
  { id: 'private-1-2', group: '1 to 2 guests', standard: 610, quad: 810, vip: 1010 },
  { id: 'private-2-4', group: '2 to 4 guests', standard: 810, quad: 1010, vip: 1210 },
  { id: 'private-4-6', group: '4 to 6 guests', standard: 1010, quad: 1210, vip: 1610 },
] as const;

export const privateTiers = [
  { key: 'standard', name: 'Private Safari', note: 'Dune bashing, camel ride, sandboarding, BBQ dinner and shows' },
  { key: 'quad', name: 'Private Safari + Quad Bike', note: 'Everything in the private safari plus ATV quad bike rides' },
  { key: 'vip', name: 'Private VIP Safari + Quad Bike', note: 'Quad bikes, VIP seating and table service at the camp' },
] as const;

/** Private city tours with driver and guide. Prices per car. */
export const cityTours: Tour[] = [
  {
    id: 'old-dubai-tour',
    name: 'Old Dubai Heritage Tour',
    price: 510,
    unit: 'per vehicle',
    summary: 'The Dubai that existed before the skyscrapers: souks, the Creek and the old wind-tower quarter.',
    includes: [
      'Gold, Spice and Textile Souks',
      'Abra boat ride across Dubai Creek',
      'Al Fahidi (Bastakiya) historic district and Al Seef',
      'Arabian tea house stop',
      'Private car, driver and guide with hotel pickup',
    ],
  },
  {
    id: 'modern-dubai-tour',
    name: 'Modern Dubai City Tour',
    price: 560,
    unit: 'per vehicle',
    badge: 'Best seller',
    summary: 'The landmarks everyone wants a photo with, from Burj Khalifa to the Palm, plus the old souks.',
    includes: [
      'Burj Khalifa and Burj Al Arab photo stops',
      'Museum of the Future and Dubai Frame (outside)',
      'Palm Jumeirah, Atlantis and Ain Dubai',
      'Old souks and Dubai Creek',
      'Private car, driver and guide with hotel pickup',
    ],
  },
  {
    id: 'abu-dhabi-city-tour',
    name: 'Abu Dhabi Day Tour from Dubai',
    price: 760,
    unit: 'per vehicle',
    summary: 'A full day in the capital with the Sheikh Zayed Grand Mosque at its heart.',
    includes: [
      'Sheikh Zayed Grand Mosque (entry free)',
      'Emirates Palace and Qasr Al Watan (outside)',
      'Yas Island and Ferrari World photo stop',
      'Heritage Village and Corniche drive',
      'Private car, driver and guide with pickup in Dubai',
    ],
  },
];

/** Shown in the "Included in every safari" list. */
export const includedInEverySafari = [
  'Pickup and drop-off from your hotel or home in Dubai',
  '4x4 Land Cruiser dune bashing with a licensed driver',
  'Camel ride',
  'Sandboarding',
  'Henna painting',
  'Sunset photo stop',
  'Arabic costume photos',
  'Tanura and belly dance shows',
  'Fire show',
  'BBQ buffet dinner (veg and non-veg)',
  'Soft drinks, water, tea and coffee',
  'Toilets and changing area at the camp',
];

export const aed = (n: number) => `AED ${n.toLocaleString('en-US')}`;

/** Every bookable option, for the booking form drop-down and Schema. */
export const allBookable = [
  ...sharingSafaris.map((t) => ({ name: t.name, price: t.price, unit: t.unit })),
  ...privateSafaris.flatMap((p) =>
    privateTiers.map((tier) => ({ name: `${tier.name} (${p.group})`, price: p[tier.key], unit: 'per vehicle' as const })),
  ),
  ...cityTours.map((t) => ({ name: t.name, price: t.price, unit: t.unit })),
];

export const lowestPrice = Math.min(...allBookable.map((b) => b.price));
