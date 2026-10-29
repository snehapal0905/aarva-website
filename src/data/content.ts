// AARVA Aerospace – complete website content.
// Source: the client's current website (aarvaaerospace.com: Home, Capabilities and Contact pages).
// Phone and email are placeholders until the client confirms. Swap them in the `contact` block only.

export const company = {
  name: 'AARVA AEROSPACE PVT. LTD.',
  shortName: 'AARVA',
  wordmarkSub: 'AEROSPACE',
  tagline: 'Precision Beyond Boundaries',
  summary: 'Precision CNC & VMC Machined Components · Aerospace · Defence · Medical · Automotive',
  established: '2026',
  city: 'Bengaluru',
  about:
    'AARVA AEROSPACE PVT. LTD. is a precision CNC & VMC machining manufacturer based in Bengaluru, Karnataka. We serve domestic and export markets across aerospace, defence, medical, automotive, hydraulics, and machine tools sectors.',
  registrations: ['ISO 9001:2015 Certified', 'AS9100 Rev D — Pursuing', 'MSME Registered', 'GST Registered'],
};

// ---- Contact (PLACEHOLDERS: replace when the client confirms) ----
export const contact = {
  phoneDisplay: '+91 98XXX XXXXX',
  phoneHref: 'tel:+910000000000',
  whatsapp: '910000000000',
  email: 'info@yourcompany.in',
  addressLines: ['Peenya 2nd Stage', 'Bengaluru – 560091', 'Karnataka, India'],
  areaLabel: 'Doddanna Industrial Estate · Peenya Industrial Area',
  mapsQuery: 'Peenya 2nd Stage, Bengaluru 560091',
  hours: [
    { days: 'Monday – Saturday', time: '9:00 AM – 6:00 PM IST', open: '09:00', close: '18:00' },
    { days: 'Sunday', time: 'Closed' },
  ],
  timezone: 'Asia/Kolkata',
  quoteResponse: 'within 24 hours',
  exportResponse: 'We respond within 4 hours on business days.',
};

export const heroStats = [
  { value: '5-Axis', label: 'Machining' },
  { value: '±0.005mm', label: 'Tolerance' },
  { value: 'ISO 9001:2015', label: 'Certified' },
  { value: 'Est. 2026', label: 'Bengaluru' },
];

// The client's site says "7 sectors" but lists 6. Show the 6, and don't print a count until confirmed.
export const aboutStats = [
  { value: 2026, label: 'Established' },
  { value: 6, suffix: '+', label: 'VMC Machines' },
  { value: 5, suffix: '-Axis', label: 'Capability' },
];

export const vision =
  'To be the leading manufacturer of precision CNC machined components, known for cutting-edge technology, exceptional quality, and commitment to customer satisfaction.';
export const mission =
  'To deliver high-quality precision CNC machined components to customers, building strong relationships through outstanding customer service, continuous improvement, and innovative solutions.';
export const qualityPolicy =
  'Committed to supplying quality precision CNC machined components and timely delivery services to enhance customer satisfaction, through efficient use of resources and continual improvement.';
export const qualityObjectives = [
  'Improve customer satisfaction',
  'Improve delivery performance',
  'Reduce internal rejection & rework',
];

export const clients = [
  'ABB Ltd',
  'ACE Group',
  'Ajax Engineering Pvt Ltd',
  'L&T Construction Equipment Ltd',
  'Sika Aerospace',
  'Turbo India Interconnect Solutions',
];

// ---- Capabilities (detailed, from the client's Capabilities page) ----
export const capabilities = [
  {
    key: '3-axis',
    badge: '3-AXIS',
    title: 'CNC Turning & 3-Axis Milling',
    text: 'Precision turning and 3-axis milling for profiles, pockets, slots, and contours. Ideal for aluminium, steel, and brass components with standard geometric features.',
    specs: {
      Machines: 'STM VL610, STM VL850',
      'Max Travel': '850 × 510 × 510 mm',
      'Table Size': 'Up to 1000 × 500 mm',
      'Spindle Speed': '8,000 RPM',
      Tolerance: '±0.01 mm',
    },
    applications: ['Brackets & Plates', 'Housings & Enclosures', 'Flanged Components', 'Fixture Plates'],
  },
  {
    key: '4-axis',
    badge: '4TH-AXIS',
    title: '4th-Axis VMC Machining',
    text: 'Rotary 4th-axis capability using Detron rotary tables for cylindrical and indexed features in a single setup, reducing cycle time and improving accuracy.',
    specs: {
      Machines: 'FEELER VMX-760 (×2)',
      'Max Travel': '760 × 420 × 510 mm',
      'Table Size': '760 × 580 mm',
      'Spindle Speed': '12,000 RPM',
      'Rotary Axis': 'Detron Rotary Table',
    },
    applications: ['Shafts & Pins', 'Rotary Components', 'Indexed Features', 'Bushings & Flanges'],
  },
  {
    key: '5-axis',
    badge: '5TH-AXIS',
    title: '5-Axis VMC Machining',
    text: 'High-precision 5-axis machining for complex aerospace geometries with tight tolerances of ±0.005mm. Ideal for multi-face features in a single setup.',
    specs: {
      Machines: 'HISKON V8, FEELER VMX-1020',
      'Max Travel': '1020 × 510 × 600 mm',
      'Table Size': 'Up to 1150 × 520 mm',
      'Spindle Speed': '12,000 RPM',
      Tolerance: '±0.005 mm',
    },
    applications: ['Aerospace Brackets', 'Complex Housings', 'Multi-face Components', 'UAV Frames'],
  },
];

export const machines = [
  { id: 'DEVMC-01', model: 'STM VL610', axes: '3-Axis', x: 640, y: 450, z: 500, table: '800 × 450 mm', rpm: 8000 },
  { id: 'DEVMC-02', model: 'STM VL850', axes: '3-Axis', x: 850, y: 510, z: 510, table: '1000 × 500 mm', rpm: 8000 },
  { id: 'DEVMC-03', model: 'HISKON V8', axes: '5th-Axis', x: 850, y: 510, z: 600, table: '1000 × 600 mm', rpm: 12000, special: 'Detron Rotary Table' },
  { id: 'DEVMC-04', model: 'FEELER VMX-1020', axes: '5th-Axis', x: 1020, y: 510, z: 600, table: '1150 × 520 mm', rpm: 12000, special: 'Detron Rotary Table' },
  { id: 'DEVMC-05', model: 'FEELER VMX-760', axes: '4th-Axis', x: 760, y: 420, z: 510, table: '760 × 580 mm', rpm: 12000, special: 'Detron Rotary Table' },
  { id: 'DEVMC-06', model: 'FEELER VMX-760', axes: '4th-Axis', x: 760, y: 420, z: 510, table: '760 × 580 mm', rpm: 12000, special: 'Detron Rotary Table' },
];

export const fleetSummary = [
  { value: 6, label: 'Total VMC Machines' },
  { value: 2, label: '5-Axis Machines' },
  { value: 2, label: '4-Axis Machines' },
  { value: 12000, label: 'Max RPM' },
];

export const materials = [
  {
    group: 'Aluminium Alloys',
    grades: [
      { name: '7075-T6', use: 'Aerospace brackets, frames' },
      { name: '6061-T6', use: 'Structural components' },
      { name: '2024', use: 'High-strength aerospace parts' },
    ],
  },
  {
    group: 'Stainless Steel',
    grades: [
      { name: 'SS316', use: 'Corrosion-resistant housings' },
      { name: 'SS304', use: 'General industrial parts' },
      { name: '17-4PH', use: 'High-strength aerospace' },
    ],
  },
  {
    group: 'Alloy Steel',
    grades: [
      { name: 'EN8', use: 'Valve bodies, shafts' },
      { name: 'EN24', use: 'Precision spacers, gears' },
      { name: 'Mild Steel', use: 'Fixture plates, brackets' },
    ],
  },
  {
    group: 'Specialty Metals',
    grades: [
      { name: 'Brass', use: 'Pins, bushings, flanges' },
      { name: 'Titanium', use: 'Aerospace grade components' },
      { name: 'Inconel', use: 'High-temp superalloys' },
    ],
  },
];

export const finishesFeatured = [
  { title: 'Bead Blasting', text: 'Uniform matte surface finish for enclosures, brackets, and structural plates.', uses: ['Enclosures', 'Brackets', 'Plates'] },
  { title: 'Anodizing (Type II & III)', text: 'Protective oxide layer in natural, black, red, and blue anodizing finishes.', uses: ['Panels', 'Brackets', 'Aerospace Parts'] },
  { title: 'Hard Chrome & Electroless Nickel', text: 'Wear-resistant coatings for high-friction and corrosion-critical components.', uses: ['Shafts', 'Hydraulic Parts', 'Precision Bores'] },
];
export const finishesAll = ['Bead Blasting', 'Anodizing (Type II & III)', 'Hard Chrome Plating', 'Electroless Nickel', 'Powder Coating', 'Passivation'];

export const oneStopIntro =
  'Beyond CNC machining — we offer complete end-to-end manufacturing solutions so you never need to coordinate multiple vendors.';
export const oneStop = [
  { title: 'CNC Machining', text: '3, 4 & 5-axis precision CNC and VMC machining for all materials and geometries.' },
  { title: 'Surface Treatments', text: 'Bead blasting, anodizing, hard chrome plating, electroless nickel, powder coating, passivation.' },
  { title: 'Heat Treatments', text: 'Hardening, tempering, annealing, and stress relieving as per material and application requirements.' },
  { title: 'Wire Cutting (WEDM)', text: 'Wire electrical discharge machining for intricate profiles and hardened material cutting.' },
  { title: 'EDM (Spark Erosion)', text: 'Electrical discharge machining for complex cavities, dies, and hard-to-machine materials.' },
  { title: 'Quality & Inspection', text: 'CMM inspection, FAI reports, material test certificates, and certificate of conformance.' },
];

// Parts gallery categories (counts from the client's site). Images are sourced in the media step.
export const partsGallery = {
  title: 'Precision Parts We Manufacture',
  subtitle: 'Across Materials & Finishes',
  text: 'A showcase of our machined components spanning aluminium, steel, and brass — with surface finishes including bead blast and anodizing.',
  categories: [
    { key: 'aluminium', label: 'Aluminium Parts', count: 3 },
    { key: 'steel', label: 'Steel Parts', count: 2 },
    { key: 'brass', label: 'Brass Parts', count: 2 },
    { key: 'beadblast', label: 'Bead Blast Parts', count: 2 },
    { key: 'anodized', label: 'Anodizing Parts', count: 3 },
  ],
};

// The parts that "split out" of the aircraft in the hero.
export const heroParts = [
  { name: 'Aircraft Bracket', material: 'Al 7075-T6', process: '5-Axis VMC', from: 'wing' },
  { name: 'Housing Component', material: 'SS316', process: 'VMC Machining', from: 'fuselage' },
  { name: 'Mounting Block', material: 'Al 6061', process: '3-Axis CNC Milling', from: 'engine pylon' },
  { name: 'Precision Spacer', material: 'EN24', process: 'CNC Turning', from: 'landing gear' },
  { name: 'Valve Body', material: 'EN8 Steel', process: 'CNC Turning & Milling', from: 'hydraulics bay' },
  { name: 'Anodized Panel', material: 'Aluminium, Type III', process: 'VMC + Anodizing', from: 'tail' },
];

export const process = [
  { title: 'Customer Requirement & Technical Review', text: 'Receive customer drawings, 3D CAD models, and specifications. Review material, tolerances, surface finish, and critical characteristics. Conduct DFM review and feasibility analysis.', output: 'Feasibility Report' },
  { title: 'Process Planning', text: 'Select raw material, develop machining sequence, prepare process sheets and inspection plans. Design and manufacture fixtures if required.', output: 'Process Sheet + Inspection Plan' },
  { title: 'CNC Programming', text: 'Generate CNC programs using CAM software. Simulate machining operations to verify toolpaths. Optimize cutting parameters for quality and productivity.', output: 'Verified CNC Program' },
  { title: 'CNC Machining', text: 'Machine the component on CNC Turning or VMC/CNC Milling machines. Perform in-process inspections. Monitor dimensional accuracy and surface finish.', output: 'Machined Component' },
  { title: 'Deburring & Surface Finishing', text: 'Remove burrs and sharp edges. Perform cleaning and required surface treatment or marking. Prepare the component for final inspection.', output: 'Finished Component' },
  { title: 'Quality Inspection', text: 'Inspect critical dimensions using calibrated measuring equipment — CMM, height gauges, micrometers, bore gauges, vernier calipers. Prepare inspection reports.', output: 'Inspection Report' },
  { title: 'Final Packaging & Dispatch', text: 'Final visual inspection. Pack components using suitable protective materials. Label and dispatch according to customer requirements.', output: 'CoC + MTC + Packing List' },
];

export const deliverables = [
  'Precision CNC/VMC Machined Component',
  'Dimensional Inspection Report',
  'Material Test Certificate (MTC)',
  'Packing List & Dispatch Documentation',
  'Certificate of Conformance (CoC)',
  'First Article Inspection (FAI) Report',
];

export const industries = [
  { name: 'Aerospace', text: 'Structural brackets, housings, actuator components. Tight tolerances ±0.005mm.', parts: ['Aircraft Bracket – Al 7075-T6', 'Housing Component – SS316', 'Mounting Block – Al 6061'] },
  { name: 'Defence', text: 'Missile body parts, UAV frames, satellite components with precision machining.', parts: ['UAV Frame Components', 'Precision Brackets', 'Structural Housings'] },
  { name: 'Medical Equipment', text: 'Surgical instrument components, implant-grade precision parts in biocompatible materials.', parts: ['Surgical Instrument Parts', 'Implant Components', 'Medical Device Housings'] },
  { name: 'Automotive', text: 'Engine components, transmission parts, brake system components, EV battery housings.', parts: ['Precision Spacer – EN24', 'Engine Brackets', 'Transmission Parts'] },
  { name: 'Hydraulics', text: 'Valve bodies, manifolds, cylinder components, high-pressure fittings.', parts: ['Valve Body – EN8 Steel', 'Hydraulic Manifolds', 'Cylinder Components'] },
  { name: 'Machine Tools', text: 'Spindle components, tool holders, precision fixtures and jigs.', parts: ['Fixture Plate – Mild Steel', 'Spindle Components', 'Precision Jigs'] },
];

export const componentExamples = [
  { industry: 'Aerospace', component: 'Aircraft Bracket', material: 'Aluminium 7075-T6', process: 'CNC Milling, Deburring, Inspection' },
  { industry: 'Aerospace', component: 'Housing Component', material: 'SS316', process: 'VMC Machining' },
  { industry: 'Hydraulics', component: 'Valve Body', material: 'EN8 Steel', process: 'CNC Turning & Milling' },
  { industry: 'Industrial', component: 'Fixture Plate', material: 'Mild Steel', process: 'VMC Machining' },
  { industry: 'Automotive', component: 'Precision Spacer', material: 'EN24', process: 'CNC Turning' },
  { industry: 'Aerospace', component: 'Mounting Block', material: 'Aluminium 6061', process: '3-Axis CNC Milling' },
];

export const certifications = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System — Certified', status: 'Active Certification' },
  { name: 'AS9100 Rev D', desc: 'Aerospace Quality Management System', status: 'Currently Pursuing' },
];
export const qualityStandards = [
  'First Article Inspection (FAI) Reports',
  'Material Test Reports (MTR)',
  'Certificate of Conformance (CoC)',
  'In-process Inspection at Every Stage',
  'MSME Registered · GST Registered',
  'Calibrated Inspection Equipment',
];
export const equipment = [
  { id: 'DEVC-01/02', name: 'Digital Vernier Caliper', range: '0–200 mm' },
  { id: 'DEVC-03', name: 'Digital Vernier Caliper', range: '0–150 mm' },
  { id: 'DEHG-01', name: 'Digital Height Gauge', range: '0–300 mm' },
  { id: 'DEMM-01', name: 'Micrometer', range: '0–25 mm' },
  { id: 'DEMM-02', name: 'Micrometer', range: '25–50 mm' },
  { id: 'DEMM-04', name: 'Digital Micrometer', range: '0–25 mm' },
  { id: 'DESG-01', name: 'Slip Gauges', range: '1 Set' },
  { id: 'DEPG-01', name: 'Pin Gauges', range: '2–12 mm' },
  { id: 'DEDI-01', name: 'Plunger Dial Gauge', range: '—' },
  { id: 'CMM', name: 'Coordinate Measuring Machine', range: 'Full 3D' },
];

export const strengths = [
  { title: 'Precision Manufacturing Excellence', text: 'Expertise in producing highly precise components with exceptionally tight tolerances.' },
  { title: 'Rapid, Quality Production', text: 'Swift delivery of components without compromising quality, helping clients bring products to market faster.' },
  { title: 'Comprehensive Solutions', text: 'Beyond CNC machining: surface treatments, heat treatments, wire cutting, EDM — a true one-stop-shop.' },
  { title: 'Customer-Centric Approach', text: '100% customer satisfaction focus through product quality, on-time delivery, and uninterrupted supply.' },
  { title: 'Continuous Improvement', text: 'Ongoing process enhancement to optimize production cost by minimizing rejection and rework.' },
  { title: 'Resilience During Challenges', text: 'Proven track record of maintaining consistent component supply even during challenging periods.' },
];

export const exportSection = {
  eyebrow: 'Global Export',
  title: 'Sourcing Precision Parts From India? We Can Help.',
  text: 'AARVA AEROSPACE PVT. LTD. is equipped for international B2B supply. We provide export-grade packaging, full documentation (CoC, MTC, packing lists), and competitive pricing for global OEMs and Tier-1 suppliers sourcing precision machined components from India.',
  countries: ['USA', 'Germany', 'UK', 'Japan', 'Singapore', 'UAE', 'Australia', 'Canada'],
  highlights: [
    { title: '±0.005mm Tolerance', text: '5-Axis VMC Machining' },
    { title: 'ISO 9001:2015', text: 'Certified Quality System' },
    { title: 'Export Ready', text: 'Domestic & International' },
    { title: '24hr Response', text: 'Quote Turnaround' },
  ],
  audience: 'We supply to aerospace OEMs, defence contractors, medical device manufacturers, and automotive Tier-1 suppliers across Asia, Europe, and North America.',
  bullets: [
    'Export-grade packaging & labelling',
    'Full documentation: CoC, MTC, FAI',
    'Competitive FOB Bengaluru pricing',
    'ISO 9001:2015 quality assurance',
    'AS9100 Rev D (in progress)',
  ],
};

export const cta = {
  eyebrow: 'Get Started',
  title: 'Ready to Source Precision Machined Components?',
  text: 'Send us your drawings, CAD files, or specifications. Our team will review your requirements and respond within 24 hours.',
};

export const contactPage = {
  title: "Let's Build Something Precise Together",
  text: 'Send us your technical drawings, CAD files, or specifications. Our team in Bengaluru will review and respond within 24 hours.',
  requirementTypes: ['CNC Machining', '5-Axis VMC Machining', 'Surface Finishing', 'Prototype / First Article', 'Production Batch', 'Export Inquiry', 'Other'],
};
