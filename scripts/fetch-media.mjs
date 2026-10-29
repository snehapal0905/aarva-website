// Fetches candidate photos for every media slot into media-candidates/<slot>/ and builds a
// contact sheet (media-candidates/index.html) to pick from.
//
// Sources: Openverse (license_type=commercial) first, Wikimedia Commons as the backup.
// Only commercially usable licences are kept: CC0 / public domain first, then CC BY, then CC BY-SA.
// NC and ND licences are always rejected.
//
// Usage: node scripts/fetch-media.mjs [slot ...]   (no args = all slots)
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const OUT = 'media-candidates';
const UA = 'aarva-site-media/1.0 (https://github.com/snehapal0905/aarva-website)';

// Photo slots from AARVA_MASTER_PROMPT.md §1 (videos are skipped for now).
const SLOTS = {
  plane: { count: 14, queries: ['airplane side view sky', 'airliner flying blue sky', 'passenger jet clear sky', 'Airbus A320 in flight', 'Boeing 737 in flight', 'Airbus A350 in flight', 'airliner in flight side view'] },
  'clouds-wall': { count: 8, queries: ['thick clouds above', 'cloud layer aerial', 'clouds from airplane', 'sea of clouds'] },
  'cloud-puffs': { count: 12, queries: ['white cumulus cloud blue sky', 'single cloud blue sky', 'cumulus cloud'] },
  sky: { count: 8, queries: ['blue sky above clouds sunrise', 'sky above clouds', 'above the clouds sunrise'] },
  parts: { count: 30, queries: ['machined aluminum part', 'cnc machined part', 'precision metal component', 'metal bracket', 'steel flange', 'brass fittings', 'anodized aluminum part', 'CNC milled aluminium', 'turned metal parts', 'machined parts'] },
  cnc: { count: 10, queries: ['cnc milling machine', 'cnc machine cutting metal coolant', 'milling cutter metal', 'end mill cutting'] },
  machines: { count: 16, queries: ['vmc machine', 'cnc machining center', 'vertical machining center', 'CNC milling machine factory', 'machining centre'] },
  inspection: { count: 10, queries: ['caliper measuring metal part', 'cmm measuring machine', 'quality inspection engineer', 'micrometer measuring'] },
  finishes: { count: 9, queries: ['anodized aluminum', 'bead blasted metal', 'chrome plated shaft'] },
  'industry-aerospace': { count: 6, queries: ['airplane wing'] },
  'industry-defence': { count: 6, queries: ['military drone', 'unmanned aerial vehicle'] },
  'industry-medical': { count: 6, queries: ['surgical instruments'] },
  'industry-automotive': { count: 6, queries: ['car engine'] },
  'industry-hydraulics': { count: 6, queries: ['hydraulic valves', 'hydraulic valve'] },
  'industry-machine-tools': { count: 6, queries: ['machine shop', 'lathe workshop'] },
  earth: { count: 8, queries: ['earth at night from space', 'city lights from space'] },
  factory: { count: 8, queries: ['cnc workshop', 'machine shop interior'] },
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJSON(url, timeout = 25000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'application/json' }, signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}

// ---------- licence normalisation ----------
function rankLicence(code) {
  if (code === 'cc0' || code === 'pdm' || code === 'pd') return 0;
  if (code === 'by') return 1;
  if (code === 'by-sa') return 2;
  return -1; // rejected
}
function commonsLicence(short = '') {
  const s = short.toLowerCase();
  if (/\bnc\b|non-?commercial/.test(s) || /\bnd\b|no-?deriv/.test(s)) return null;
  if (s.includes('cc0') || s.includes('public domain') || s === 'pd' || s.startsWith('pd-')) return 'pd';
  if (s.includes('cc by-sa') || s.includes('cc-by-sa')) return 'by-sa';
  if (s.includes('cc by') || s.includes('cc-by')) return 'by';
  return null;
}
const stripHtml = (s = '') => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

// ---------- sources ----------
let openverseDown = false;
async function openverse(q) {
  if (openverseDown) return [];
  const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license_type=commercial&size=large&page_size=20&mature=false`;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const data = await getJSON(url);
      return (data.results ?? [])
        .filter((r) => rankLicence(r.license) >= 0)
        .map((r) => ({
          source: `Openverse / ${r.provider ?? r.source}`,
          title: r.title ?? '',
          url: r.url,
          page: r.foreign_landing_url,
          author: r.creator ?? 'Unknown',
          authorUrl: r.creator_url ?? '',
          licence: r.license === 'pdm' ? 'Public Domain Mark' : r.license === 'cc0' ? 'CC0' : `CC ${r.license.toUpperCase()} ${r.license_version ?? ''}`.trim(),
          licenceCode: r.license,
          licenceUrl: r.license_url ?? '',
          width: r.width ?? 0,
          height: r.height ?? 0,
        }));
    } catch (e) {
      console.warn(`  openverse "${q}" attempt ${attempt + 1} failed: ${e.message}`);
      await sleep(1500);
    }
  }
  openverseDown = true;
  console.warn('  Openverse search is not responding; using Wikimedia Commons for the rest of this run.');
  return [];
}

async function commons(q) {
  const search = `${q} filetype:bitmap filew:>1400`;
  const url = `https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrnamespace=6&gsrlimit=30&gsrsearch=${encodeURIComponent(search)}&prop=imageinfo&iiprop=url|size|extmetadata|mime&iiurlwidth=2400`;
  try {
    const data = await getJSON(url, 30000);
    const pages = Object.values(data.query?.pages ?? {}).sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
    return pages.flatMap((p) => {
      const ii = p.imageinfo?.[0];
      if (!ii || !/jpe?g|png|webp/.test(ii.mime ?? '')) return [];
      const m = ii.extmetadata ?? {};
      const code = commonsLicence(m.LicenseShortName?.value);
      if (!code) return [];
      return [{
        source: 'Wikimedia Commons',
        title: p.title.replace(/^File:/, '').replace(/\.[a-z]+$/i, ''),
        url: ii.thumburl ?? ii.url,
        page: ii.descriptionurl,
        author: stripHtml(m.Artist?.value) || 'Unknown',
        authorUrl: '',
        licence: code === 'pd' ? (m.LicenseShortName?.value ?? 'Public domain') : m.LicenseShortName?.value,
        licenceCode: code,
        licenceUrl: m.LicenseUrl?.value ?? '',
        width: ii.width,
        height: ii.height,
      }];
    });
  } catch (e) {
    console.warn(`  commons "${q}" failed: ${e.message}`);
    return [];
  }
}

// ---------- download ----------
async function download(c, file) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 60000);
  try {
    const res = await fetch(c.url, { headers: { 'User-Agent': UA }, signal: ctrl.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    const img = sharp(buf).rotate();
    const meta = await img.metadata();
    if ((meta.width ?? 0) < 1000) throw new Error(`too small (${meta.width}px)`);
    const out = await img.resize({ width: 2400, height: 2400, fit: 'inside', withoutEnlargement: true }).jpeg({ quality: 88 }).toBuffer({ resolveWithObject: true });
    await writeFile(file, out.data);
    await sharp(out.data).resize({ width: 480 }).jpeg({ quality: 70 }).toFile(file.replace(/\.jpg$/, '.thumb.jpg'));
    return { width: out.info.width, height: out.info.height };
  } finally {
    clearTimeout(t);
  }
}

async function fetchSlot(slot, cfg) {
  const dir = join(OUT, slot);
  await mkdir(dir, { recursive: true });
  console.log(`\n[${slot}]`);
  const seen = new Set();
  const pool = [];
  for (const q of cfg.queries) {
    let results = await openverse(q);
    if (results.length < 4) results = results.concat(await commons(q));
    results.forEach((r, i) => {
      const key = r.page || r.url;
      if (seen.has(key)) return;
      seen.add(key);
      pool.push({ ...r, query: q, order: i });
    });
    await sleep(400);
  }
  // Relevance first, nudged by licence: CC0 / PD outrank CC BY, which outranks CC BY-SA, at similar relevance.
  const score = (c) => c.order + rankLicence(c.licenceCode) * 4;
  pool.sort((a, b) => score(a) - score(b));
  const picked = [];
  for (const c of pool) {
    if (picked.length >= cfg.count) break;
    const n = String(picked.length + 1).padStart(2, '0');
    const file = join(dir, `${n}.jpg`);
    try {
      const size = await download(c, file);
      picked.push({ n, file: `${slot}/${n}.jpg`, thumb: `${slot}/${n}.thumb.jpg`, ...c, ...size });
      console.log(`  ${n}  ${c.licence.padEnd(20)} ${c.source}  ${c.title.slice(0, 60)}`);
    } catch (e) {
      console.warn(`  skip: ${c.title.slice(0, 50)} (${e.message})`);
    }
    await sleep(250);
  }
  await writeFile(join(dir, 'candidates.json'), JSON.stringify(picked, null, 2));
  if (picked.length < cfg.count) console.warn(`  only ${picked.length}/${cfg.count} usable candidates`);
  return picked;
}

const esc = (s = '') => String(s).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch]);

async function contactSheet() {
  const sections = [];
  for (const slot of Object.keys(SLOTS)) {
    const f = join(OUT, slot, 'candidates.json');
    if (!existsSync(f)) continue;
    const items = JSON.parse(await readFile(f, 'utf8'));
    sections.push(`<section><h2>${esc(slot)} <small>${items.length} candidates · ${esc(SLOTS[slot].queries.join(' / '))}</small></h2><div class="grid">${items.map((c) => `
      <figure><a href="${esc(c.file)}" target="_blank"><img src="${esc(c.thumb)}" loading="lazy" alt="${esc(slot)} ${c.n}"></a>
      <figcaption><b>${esc(slot)}: ${c.n}</b> <span class="lic l${rankLicence(c.licenceCode)}">${esc(c.licence)}</span><br>
      ${c.width}×${c.height} · ${esc(c.source)}<br>${esc(c.author).slice(0, 60)}<br><a href="${esc(c.page)}" target="_blank">source page</a></figcaption></figure>`).join('')}</div></section>`);
  }
  const html = `<!doctype html><meta charset="utf-8"><title>AARVA media candidates</title>
<style>body{font:14px/1.4 system-ui,sans-serif;margin:24px;background:#f3f1ec;color:#0e1320}h1{margin:0 0 4px}h2{margin:40px 0 12px;font-size:20px}h2 small{font-weight:400;color:#667;font-size:13px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:14px}figure{margin:0;background:#fff;border:1px solid #ddd;border-radius:8px;overflow:hidden}
img{width:100%;height:170px;object-fit:cover;display:block}figcaption{padding:8px 10px;font-size:12px}.lic{padding:1px 6px;border-radius:4px;font-size:11px}.l0{background:#d7f5e1}.l1{background:#fdecc8}.l2{background:#fbd5cf}</style>
<h1>AARVA media candidates</h1><p>Reply with picks per slot, e.g. "plane: 3, clouds-wall: 1 …". Green = CC0 / public domain, amber = CC BY (credit needed), red = CC BY-SA (credit + share-alike).</p>
${sections.join('\n')}`;
  await writeFile(join(OUT, 'index.html'), html);
}

const only = process.argv.slice(2);
for (const [slot, cfg] of Object.entries(SLOTS)) {
  if (only.length && !only.includes(slot)) continue;
  await fetchSlot(slot, cfg);
}
await contactSheet();
console.log(`\nContact sheet: ${join(OUT, 'index.html')}`);
