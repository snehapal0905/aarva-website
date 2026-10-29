// All company content lives here. Edit this file to change text across the whole site.
// Facts are taken from the client's current website (aarvaaerospace.com) and public company records.

export const site = {
  // Set to false at launch: removes the "noindex" tag and the preview ribbon.
  isPreview: true,

  name: 'Aarva Aerospace',
  legalName: 'AARVA AEROSPACE PVT. LTD.',
  tagline: 'Precision Beyond Boundaries',
  url: 'https://aarvaaerospace.com',
  founded: '2026',
  cin: 'U28223KA2026PTC226265',

  phone: '+91 99029 16165',
  phoneHref: 'tel:+919902916165',
  whatsapp: '919902916165',
  // TODO: add the client's email once confirmed. Left empty, it is hidden everywhere.
  email: '',

  address: {
    line1: 'Peenya 2nd Stage',
    city: 'Bengaluru',
    region: 'Karnataka',
    postalCode: '560091',
    country: 'IN',
  },
  mapEmbed:
    'https://www.google.com/maps?q=Peenya+2nd+Stage,+Bengaluru,+Karnataka+560091&output=embed',

  // Paste a Formspree / Web3Forms / Getform endpoint here to receive RFQs by email.
  // Left empty, the form falls back to opening WhatsApp with the enquiry filled in.
  formEndpoint: '',
};

export const nav = [
  { label: 'Capabilities', href: '/capabilities/' },
  { label: 'Industries', href: '/industries/' },
  { label: 'How we work', href: '/how-we-work/' },
  { label: 'Quality', href: '/quality/' },
  { label: 'Contact', href: '/contact/' },
];

export const stats = [
  { value: '±0.005 mm', label: 'Tolerance' },
  { value: '6', label: 'VMC machines' },
  { value: '5-axis', label: 'Machining capability' },
  { value: 'ISO 9001:2015', label: 'Certified' },
];

// Shown on the current site as "Trusted by industry leaders". Confirm with the client before launch.
export const clients = [
  'ABB Ltd',
  'ACE Group',
  'Ajax Engineering Pvt Ltd',
  'L&T Construction Equipment Ltd',
  'Sika Aerospace',
  'Turbo India Interconnect Solutions',
];

export type Axes = '3-axis' | '4-axis' | '5-axis';

export const machines: {
  id: string;
  model: string;
  axes: Axes;
  x: number;
  y: number;
  z: number;
  table: string;
  rpm: number;
  special?: string;
}[] = [
  { id: 'DEVMC-01', model: 'STM VL610', axes: '3-axis', x: 640, y: 450, z: 500, table: '800 × 450 mm', rpm: 8000 },
  { id: 'DEVMC-02', model: 'STM VL850', axes: '3-axis', x: 850, y: 510, z: 510, table: '1000 × 500 mm', rpm: 8000 },
  { id: 'DEVMC-03', model: 'HISKON V8', axes: '5-axis', x: 850, y: 510, z: 600, table: '1000 × 600 mm', rpm: 12000, special: 'Detron rotary table' },
  { id: 'DEVMC-04', model: 'FEELER VMX-1020', axes: '5-axis', x: 1020, y: 510, z: 600, table: '1150 × 520 mm', rpm: 12000, special: 'Detron rotary table' },
  { id: 'DEVMC-05', model: 'FEELER VMX-760', axes: '4-axis', x: 760, y: 420, z: 510, table: '760 × 580 mm', rpm: 12000, special: 'Detron rotary table' },
  { id: 'DEVMC-06', model: 'FEELER VMX-760', axes: '4-axis', x: 760, y: 420, z: 510, table: '760 × 580 mm', rpm: 12000, special: 'Detron rotary table' },
];

export const capabilities = [
  {
    axes: '3-axis',
    title: '3-axis CNC milling',
    text: 'Complex profiles, pockets and contours in aluminium, steel and brass.',
    specs: ['X 640–850 mm', 'Y 450–510 mm', '8,000 RPM'],
  },
  {
    axes: '4-axis',
    title: '4-axis VMC',
    text: 'Cylindrical and indexed features in a single setup, which cuts cycle time and handling.',
    specs: ['X 760 mm', 'Detron rotary', '12,000 RPM'],
  },
  {
    axes: '5-axis',
    title: '5-axis VMC',
    text: 'Complex aerospace geometries held to ±0.005 mm, with fewer setups and better accuracy between features.',
    specs: ['X 850–1020 mm', 'Detron rotary', '12,000 RPM'],
  },
];

export const materials = [
  { name: 'Aluminium 7075-T6', note: 'Aerospace grade' },
  { name: 'Aluminium 6061', note: 'Structural' },
  { name: 'SS316 / SS304', note: 'Stainless steel' },
  { name: 'EN8 / EN24', note: 'Alloy steel' },
  { name: 'Titanium', note: 'Aerospace' },
  { name: 'Mild steel', note: 'Industrial' },
  { name: 'Brass', note: 'Precision' },
];

export const finishes = [
  'Anodizing (Type II & III)',
  'Bead blasting',
  'Hard chrome plating',
  'Electroless nickel',
  'Powder coating',
  'Passivation',
];

export const oneStop = [
  { title: 'CNC / VMC machining', text: '3, 4 and 5-axis' },
  { title: 'Surface finishing', text: 'Anodizing, plating, coating' },
  { title: 'Heat treatment', text: 'To drawing specification' },
  { title: 'Wire cutting & EDM', text: 'For features milling can’t reach' },
  { title: 'Inspection', text: 'CMM and calibrated gauges' },
];

export type PartKind = 'gear' | 'bracket' | 'housing' | 'valve' | 'spacer' | 'block' | 'fixture' | 'uav';

export const industries: {
  slug: string;
  name: string;
  text: string;
  parts: string[];
  icon: PartKind;
}[] = [
  {
    slug: 'aerospace',
    name: 'Aerospace',
    text: 'Structural brackets, housings and actuator components held to ±0.005 mm.',
    parts: ['Aircraft bracket – Al 7075-T6', 'Housing component – SS316', 'Mounting block – Al 6061'],
    icon: 'bracket',
  },
  {
    slug: 'defence',
    name: 'Defence',
    text: 'Precision-machined structural parts for defence and unmanned systems.',
    parts: ['UAV frame components', 'Precision brackets', 'Structural housings'],
    icon: 'uav',
  },
  {
    slug: 'medical',
    name: 'Medical equipment',
    text: 'Surgical instrument components and device housings in biocompatible materials.',
    parts: ['Surgical instrument parts', 'Implant components', 'Medical device housings'],
    icon: 'housing',
  },
  {
    slug: 'automotive',
    name: 'Automotive',
    text: 'Engine, transmission and brake system components, and EV battery housings.',
    parts: ['Precision spacer – EN24', 'Engine brackets', 'Transmission parts'],
    icon: 'spacer',
  },
  {
    slug: 'hydraulics',
    name: 'Hydraulics',
    text: 'Valve bodies, manifolds, cylinder components and high-pressure fittings.',
    parts: ['Valve body – EN8 steel', 'Hydraulic manifolds', 'Cylinder components'],
    icon: 'valve',
  },
  {
    slug: 'machine-tools',
    name: 'Machine tools',
    text: 'Spindle components, tool holders, precision fixtures and jigs.',
    parts: ['Fixture plate – mild steel', 'Spindle components', 'Precision jigs'],
    icon: 'fixture',
  },
];

export const componentExamples: {
  industry: string;
  component: string;
  material: string;
  process: string;
  kind: PartKind;
}[] = [
  { industry: 'Aerospace', component: 'Aircraft bracket', material: 'Aluminium 7075-T6', process: 'CNC milling, deburring, inspection', kind: 'bracket' },
  { industry: 'Aerospace', component: 'Housing component', material: 'SS316', process: 'VMC machining', kind: 'housing' },
  { industry: 'Aerospace', component: 'Mounting block', material: 'Aluminium 6061', process: '3-axis CNC milling', kind: 'block' },
  { industry: 'Hydraulics', component: 'Valve body', material: 'EN8 steel', process: 'CNC turning & milling', kind: 'valve' },
  { industry: 'Automotive', component: 'Precision spacer', material: 'EN24', process: 'CNC turning', kind: 'spacer' },
  { industry: 'Industrial', component: 'Fixture plate', material: 'Mild steel', process: 'VMC machining', kind: 'fixture' },
];

export const process = [
  { title: 'Requirement & technical review', text: 'We review your drawings, 3D CAD and specifications: material, tolerances, surface finish and critical characteristics. A DFM and feasibility check comes first.', output: 'Feasibility report' },
  { title: 'Process planning', text: 'Raw material selection, machining sequence, process sheets and inspection plans. Fixtures are designed and made where needed.', output: 'Process sheet + inspection plan' },
  { title: 'CNC programming', text: 'Programs are generated in CAM and simulated to verify toolpaths, with cutting parameters tuned for quality and productivity.', output: 'Verified CNC program' },
  { title: 'CNC machining', text: 'Machined on our VMC / CNC milling machines with in-process inspection of dimensions and surface finish.', output: 'Machined component' },
  { title: 'Deburring & surface finishing', text: 'Burrs and sharp edges removed, parts cleaned, and the required surface treatment or marking applied.', output: 'Finished component' },
  { title: 'Quality inspection', text: 'Critical dimensions checked on CMM, height gauges, micrometers, bore gauges and calipers, all calibrated.', output: 'Inspection report' },
  { title: 'Packaging & dispatch', text: 'Final visual inspection, protective packing, labelling and dispatch to your requirements.', output: 'CoC + MTC + packing list' },
];

export const deliverables = [
  'Precision CNC / VMC machined component',
  'Dimensional inspection report',
  'First Article Inspection (FAI) report',
  'Material Test Certificate (MTC)',
  'Certificate of Conformance (CoC)',
  'Packing list & dispatch documentation',
];

export const equipment = [
  { id: 'DEVC-01/02', name: 'Digital vernier caliper', range: '0–200 mm' },
  { id: 'DEVC-03', name: 'Digital vernier caliper', range: '0–150 mm' },
  { id: 'DEHG-01', name: 'Digital height gauge', range: '0–300 mm' },
  { id: 'DEMM-01', name: 'Micrometer', range: '0–25 mm' },
  { id: 'DEMM-02', name: 'Micrometer', range: '25–50 mm' },
  { id: 'DEMM-04', name: 'Digital micrometer', range: '0–25 mm' },
  { id: 'DESG-01', name: 'Slip gauges', range: '1 set' },
  { id: 'DEPG-01', name: 'Pin gauges', range: '2–12 mm' },
  { id: 'DEDI-01', name: 'Plunger dial gauge', range: '—' },
  { id: 'CMM', name: 'Coordinate measuring machine', range: 'Full 3D' },
];

export const strengths = [
  { title: 'Tight-tolerance machining', text: 'Components held to tolerances as fine as ±0.005 mm.' },
  { title: 'Fast, reliable delivery', text: 'Quick turnaround without cutting corners on quality.' },
  { title: 'One supplier, end to end', text: 'Machining, surface and heat treatment, wire cutting and EDM in one order.' },
  { title: 'Customer-first', text: 'Focused on quality, on-time delivery and uninterrupted supply.' },
  { title: 'Continuous improvement', text: 'Lower rejection and rework, which keeps your part cost down.' },
  { title: 'Consistent supply', text: 'Steady component supply, even through challenging periods.' },
];

export const quality = {
  vision:
    'To be the leading manufacturer of precision CNC machined components, known for cutting-edge technology, exceptional quality and commitment to customer satisfaction.',
  mission:
    'To deliver high-quality precision CNC machined components, building strong relationships through outstanding customer service, continuous improvement and innovative solutions.',
  policy:
    'Committed to supplying quality precision CNC machined components and timely delivery services to enhance customer satisfaction, through efficient use of resources and continual improvement.',
  objectives: ['Improve customer satisfaction', 'Improve delivery performance', 'Reduce internal rejection & rework'],
};
