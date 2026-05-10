import type { BuilderState, OrderState, Template } from './types';

export const TEMPLATE_NAMES: Record<Template, string> = {
  classic: 'Classic',
  fleet:   'Fleet',
  heavy:   'Heavy-Duty',
  custom:  'Custom',
};

export const TEMPLATE_STYLES: Record<Template, { bg: string; color: string; border: string; fs: string; ls: string }> = {
  classic: { bg: '#fff',       color: '#0b0b0c', border: 'solid',  fs: '1.3rem', ls: '-0.02em' },
  fleet:   { bg: '#f5f2ea',   color: '#0b0b0c', border: 'solid',  fs: '1.1rem', ls: '0' },
  heavy:   { bg: '#ffcc00',   color: '#0b0b0c', border: 'solid',  fs: '1.7rem', ls: '-0.04em' },
  custom:  { bg: '#fff',       color: '#c2410c', border: 'dashed', fs: '1.3rem', ls: '0' },
};

export const SIZE_CONFIG = {
  A: { label: 'Size A — 30 × 18 cm', sub: '2.0" letters · Compact pickups, vans', price: 5.99 },
  B: { label: 'Size B — 45 × 25 cm', sub: '2.5" letters · Box trucks, day cabs',  price: 8.99 },
  C: { label: 'Size C — 60 × 35 cm', sub: '3.5" letters · Sleepers, heavy haul',  price: 12.99 },
} as const;

export const SHIP_CONFIG = {
  standard: { label: 'Standard Ground', eta: '2–3 business days', price: 0 },
  express:  { label: 'Express Shipping', eta: '1 business day',    price: 9.99 },
} as const;

export const DEFAULT_BUILDER: BuilderState = {
  mode:       'design',
  name:       '',
  usdot:      '',
  mc:         '',
  noMc:       false,
  tagline:    '',
  template:   'classic',
  color:      'bw',
  side:       'driver',
  uploadUrl:  null,
  uploadName: null,
};

export const DEFAULT_ORDER: OrderState = {
  size:      'B',
  sizePrice: 8.99,
  qty:       2,
  ship:      'standard',
  shipPrice: 0,
  address: {
    name:    '',
    street:  '',
    apt:     '',
    city:    '',
    state:   'TX',
    zip:     '',
    country: 'US',
  },
};

export const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID',
  'IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS',
  'MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK',
  'OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
  'WI','WY',
];
