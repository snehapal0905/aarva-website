// Temporary adapter: maps src/data/content.ts (the single source of truth) onto the shape the
// current pages expect. It holds no content of its own and is deleted once the pages are rebuilt
// to read content.ts directly.
import * as c from './content';

export const site = {
  isPreview: false,
  name: 'Aarva Aerospace',
  legalName: c.company.name,
  tagline: c.company.tagline,
  url: 'https://aarvaaerospace.com',
  founded: c.company.established,
  phone: c.contact.phoneDisplay,
  phoneHref: c.contact.phoneHref,
  whatsapp: c.contact.whatsapp,
  email: c.contact.email,
  address: {
    line1: c.contact.addressLines[0],
    city: c.company.city,
    region: 'Karnataka',
    postalCode: '560091',
    country: 'IN',
  },
  mapEmbed: `https://www.google.com/maps?q=${encodeURIComponent(c.contact.mapsQuery)}&output=embed`,
  formEndpoint: '',
};

export const nav = [
  { label: 'Capabilities', href: '/capabilities/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'How we work', href: '/how-we-work/' },
  { label: 'Quality', href: '/quality/' },
  { label: 'Contact', href: '/contact/' },
];

export const stats = c.heroStats;
export const clients = c.clients;

export type Axes = string;
export const machines = c.machines.map((m) => ({ ...m, axes: m.axes.replace('th-', '-').toLowerCase() }));

export const capabilities = c.capabilities.map((cap) => ({
  axes: cap.key,
  title: cap.title,
  text: cap.text,
  specs: Object.entries(cap.specs).slice(1, 4).map(([k, v]) => `${k} ${v}`),
}));

export const materials = c.materials.flatMap((g) => g.grades.map((gr) => ({ name: gr.name, note: g.group })));
export const finishes = c.finishesAll;
export const oneStop = c.oneStop;

export type PartKind = 'gear' | 'bracket' | 'housing' | 'valve' | 'spacer' | 'block' | 'fixture' | 'uav';
const icons: PartKind[] = ['bracket', 'uav', 'housing', 'spacer', 'valve', 'fixture'];
export const industries = c.industries.map((ind, i) => ({
  ...ind,
  slug: ind.name.toLowerCase().replace(/\s+/g, '-'),
  icon: icons[i] ?? 'block',
}));

const kinds: Record<string, PartKind> = {
  'Aircraft Bracket': 'bracket', 'Housing Component': 'housing', 'Valve Body': 'valve',
  'Fixture Plate': 'fixture', 'Precision Spacer': 'spacer', 'Mounting Block': 'block',
};
export const componentExamples = c.componentExamples.map((e) => ({ ...e, kind: kinds[e.component] ?? 'block' }));

export const process = c.process;
export const deliverables = c.deliverables;
export const equipment = c.equipment;
export const strengths = c.strengths;
export const quality = {
  vision: c.vision,
  mission: c.mission,
  policy: c.qualityPolicy,
  objectives: c.qualityObjectives,
};
