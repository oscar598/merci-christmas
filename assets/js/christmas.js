// Christmas collection preview for the Christmas landing page.
// Adds Christmas illustrations to the shared ART set and defines six designs in the
// same format as the app's templates.js, so they can later move into the app as-is.
import { ART } from './shared/art.js';

const svg = (vb, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${body}</svg>`;

const tree = (c = '#2F6B4F') => svg('0 0 100 120',
  `<rect x="44" y="96" width="12" height="18" rx="2" fill="#7A4A2A"/>
   <path d="M50 8L80 52H64L88 84H66L94 102H6L34 84H12L36 52H20Z" fill="${c}"/>
   <path d="M50 8L80 52H64L88 84H66L94 102H50Z" fill="#000" opacity=".12"/>
   <circle cx="38" cy="62" r="4" fill="#D2383A"/><circle cx="62" cy="74" r="4" fill="#F2C14E"/>
   <circle cx="46" cy="88" r="4" fill="#F2C14E"/><circle cx="70" cy="94" r="3.5" fill="#D2383A"/>
   <circle cx="54" cy="40" r="3.5" fill="#D2383A"/><circle cx="28" cy="94" r="3.5" fill="#fff"/>`);

const ornament = (c = '#D2383A') => svg('0 0 100 100',
  `<path d="M50 4v12" stroke="#B48A3C" stroke-width="2"/>
   <rect x="40" y="14" width="20" height="12" rx="2" fill="#C9A24A"/>
   <circle cx="50" cy="60" r="34" fill="${c}"/>
   <path d="M18 54c20 8 44 8 64 0" stroke="#fff" stroke-opacity=".55" stroke-width="5" fill="none"/>
   <path d="M17 66c20 8 46 8 66 0" stroke="#F2C14E" stroke-opacity=".8" stroke-width="3" fill="none"/>
   <ellipse cx="38" cy="44" rx="7" ry="10" fill="#fff" opacity=".35" transform="rotate(-30 38 44)"/>`);

const gift = (c = '#2F6B4F') => svg('0 0 100 100',
  `<rect x="14" y="40" width="72" height="54" rx="4" fill="${c}"/>
   <rect x="10" y="30" width="80" height="16" rx="3" fill="${c}"/>
   <rect x="10" y="30" width="80" height="16" rx="3" fill="#000" opacity=".1"/>
   <rect x="44" y="30" width="12" height="64" fill="#F2C14E"/>
   <path d="M50 30C38 10 22 16 28 26s22 4 22 4zM50 30C62 10 78 16 72 26S50 30 50 30z" fill="#F2C14E" stroke="#C9A24A" stroke-width="2"/>`);

const snowflake = (c = '#FFFFFF') => svg('0 0 100 100',
  `<g stroke="${c}" stroke-width="5" stroke-linecap="round" fill="none">
   ${[0, 60, 120].map((r) => `<g transform="rotate(${r} 50 50)"><path d="M50 8V92"/><path d="M50 22l-9-9M50 22l9-9M50 78l-9 9M50 78l9 9"/></g>`).join('')}
   </g>`);

const candycane = () => svg('0 0 100 120',
  `<path d="M64 112V40a18 18 0 0 0-36 0" fill="none" stroke="#fff" stroke-width="14" stroke-linecap="round"/>
   <path d="M64 112V40a18 18 0 0 0-36 0" fill="none" stroke="#D2383A" stroke-width="14" stroke-linecap="round" stroke-dasharray="9 9"/>`);

const holly = () => svg('0 0 120 70',
  `<path d="M60 40C44 22 22 26 8 18c4 10 2 18 10 22-6 4-4 12 2 16 12-6 26-8 40-16z" fill="#2F6B4F"/>
   <path d="M60 40C76 22 98 26 112 18c-4 10-2 18-10 22 6 4 4 12-2 16-12-6-26-8-40-16z" fill="#3C7F5E"/>
   <circle cx="52" cy="44" r="8" fill="#D2383A"/><circle cx="66" cy="46" r="8" fill="#B8262B"/><circle cx="59" cy="34" r="8" fill="#E04A45"/>
   <circle cx="56" cy="31" r="2.4" fill="#fff" opacity=".6"/>`);

const stocking = (c = '#D2383A') => svg('0 0 100 120',
  `<path d="M34 24h40v52c0 20-14 34-36 36-14 2-26-6-26-18 0-10 8-16 18-18l4-1z" fill="${c}"/>
   <rect x="28" y="10" width="52" height="20" rx="8" fill="#FFF6EA"/>
   <circle cx="30" cy="96" r="4" fill="#fff" opacity=".5"/><circle cx="48" cy="70" r="4" fill="#fff" opacity=".5"/><circle cx="62" cy="50" r="4" fill="#fff" opacity=".5"/>`);

Object.assign(ART, {
  xtree: { label: 'Christmas tree', render: tree, vb: [100, 120], tint: '#2F6B4F' },
  ornament: { label: 'Ornament', render: ornament, vb: [100, 100], tint: '#D2383A' },
  gift: { label: 'Gift', render: gift, vb: [100, 100], tint: '#2F6B4F' },
  snowflake: { label: 'Snowflake', render: snowflake, vb: [100, 100], tint: '#FFFFFF' },
  candycane: { label: 'Candy cane', render: candycane, vb: [100, 120] },
  holly: { label: 'Holly', render: holly, vb: [120, 70] },
  stocking: { label: 'Stocking', render: stocking, vb: [100, 120], tint: '#D2383A' },
});

const anim = (inn = 'fade', delay = 0, loop = 'none') => ({ in: inn, delay, loop });
const t = (text, o = {}) => ({
  type: 'text', text, font: 'avenir', size: 18, color: '#3B2A1A', weight: 400, italic: false, align: 'center',
  lineHeight: 1.2, letterSpacing: 0, x: 20, y: 0, w: 360, h: 30, rot: 0, opacity: 1, anim: anim(), ...o,
});
const a = (art, x, y, w, h, o = {}) => ({ type: 'art', art, x, y, w, h, rot: 0, opacity: 1, anim: anim('pop'), ...o });
const line = (x, y, w, fill, o = {}) => ({ type: 'shape', shape: 'rect', x, y, w, h: 1.5, fill, radius: 0, rot: 0, opacity: 1, anim: anim('fade', 0.6), ...o });
const solid = (color) => ({ type: 'color', color });
const grad = (angle, ...colors) => ({ type: 'gradient', angle, colors });
const xmas = { category: 'seasonal', sub: 'christmas' };

export const CHRISTMAS = [
  {
    ...xmas, id: 'merry-bright', name: 'Merry & Bright', motion: 4, accent: '#D2383A', tagline: 'Ornaments swing in on deep red',
    pages: [{ bg: grad(170, '#B8262B', '#8E1A20', '#5E0F15'), ambient: 'sparkle', elements: [
      a('ornament', 46, 18, 96, 96, { color: '#F2C14E', anim: anim('drop', 0.1, 'sway') }),
      a('ornament', 156, -4, 88, 88, { color: '#FFF6EA', anim: anim('drop', 0.25, 'sway') }),
      a('ornament', 262, 26, 100, 100, { color: '#2F6B4F', anim: anim('drop', 0.4, 'sway') }),
      t('Merry', { font: 'snell', size: 84, color: '#FFE7B0', y: 196, h: 100, anim: anim('rise', 0.5) }),
      t('& Bright', { font: 'snell', size: 58, color: '#FFE7B0', y: 286, h: 74, anim: anim('rise', 0.8) }),
      line(170, 384, 60, '#F2C14E'),
      t('CHRISTMAS · 2026', { size: 12, weight: 600, letterSpacing: 5, color: '#F6D7A7', y: 402, h: 18, anim: anim('fade', 1.2) }),
      a('holly', 140, 462, 120, 70, { anim: anim('pop', 1.4) }),
    ] }],
  },
  {
    ...xmas, id: 'silent-night', name: 'Silent Night', motion: 3, accent: '#2E3D6B', tagline: 'Snow falling on a midnight sky', snow: true,
    pages: [{ bg: grad(180, '#0E1633', '#1E2C57', '#3A4A7A'), ambient: 'none', elements: [
      a('star', 182, 54, 36, 36, { color: '#F6DFA0', anim: anim('pop', 0.2, 'pulse') }),
      t('Silent', { font: 'didot', italic: true, size: 54, color: '#F3EEE2', y: 128, h: 66, anim: anim('fade', 0.4) }),
      t('NIGHT', { font: 'didot', size: 62, letterSpacing: 12, color: '#F3EEE2', x: 10, w: 390, y: 186, h: 76, anim: anim('fade', 0.6) }),
      t('All is calm, all is bright', { font: 'baskerville', italic: true, size: 17, color: '#C9D2EC', y: 276, h: 24, anim: anim('fade', 1.0) }),
      a('xtree', 30, 380, 110, 132, { color: '#1B3A34', anim: anim('rise', 0.8) }),
      a('xtree', 136, 340, 128, 172, { color: '#24493F', anim: anim('rise', 0.9) }),
      a('xtree', 258, 392, 108, 120, { color: '#1B3A34', anim: anim('rise', 1.0) }),
      { type: 'shape', shape: 'rect', x: 0, y: 500, w: 400, h: 60, fill: '#E9EEF7', radius: 0, rot: 0, opacity: 1, anim: anim('fade', 0.6) },
    ] }],
  },
  {
    ...xmas, id: 'oh-tree', name: 'Oh Christmas Tree', motion: 4, accent: '#2F6B4F', tagline: 'A tree that pops up, gifts and all',
    pages: [{ bg: grad(180, '#FFF8EC', '#F6E6CC'), ambient: 'none', elements: [
      t('Oh Christmas', { font: 'chalkboard', size: 36, weight: 700, color: '#2F6B4F', y: 52, h: 46, anim: anim('rise', 0.1) }),
      t('Tree!', { font: 'chalkboard', size: 52, weight: 700, color: '#B8262B', y: 98, h: 62, anim: anim('rise', 0.3) }),
      a('star', 176, 176, 48, 48, { anim: anim('spin', 0.9, 'pulse') }),
      a('xtree', 104, 196, 192, 232, { anim: anim('pop', 0.5) }),
      a('gift', 70, 410, 86, 86, { color: '#B8262B', anim: anim('drop', 1.1, 'bounce') }),
      a('gift', 160, 430, 72, 72, { color: '#2F6B4F', anim: anim('drop', 1.25) }),
      a('gift', 238, 416, 82, 82, { color: '#C9A24A', anim: anim('drop', 1.4, 'bounce') }),
    ] }],
  },
  {
    ...xmas, id: 'ho-ho-ho', name: 'Ho Ho Ho', motion: 5, accent: '#B8262B', tagline: 'Confetti, candy canes, full volume',
    pages: [{ bg: grad(160, '#2F6B4F', '#1E4D39'), ambient: 'confetti', elements: [
      a('candycane', 34, 40, 74, 92, { rot: -16, anim: anim('drop', 0.1, 'wobble') }),
      a('candycane', 292, 52, 70, 88, { rot: 18, anim: anim('drop', 0.25, 'wobble') }),
      t('HO HO', { font: 'marker', size: 76, color: '#FFF6EA', y: 176, h: 86, anim: anim('pop', 0.4) }),
      t('HO!', { font: 'marker', size: 96, color: '#F2C14E', y: 254, h: 104, rot: -4, anim: anim('pop', 0.7, 'bounce') }),
      t('Merry Christmas, you legend.', { font: 'bradley', size: 22, color: '#E6F0E9', y: 386, h: 30, anim: anim('fade', 1.1) }),
      a('stocking', 168, 436, 64, 78, { anim: anim('pop', 1.3, 'sway') }),
    ] }],
  },
  {
    ...xmas, id: 'warm-wishes', name: 'Warm Wishes', motion: 2, accent: '#9A5B3A', tagline: 'Cocoa, embers and a cozy note',
    pages: [{ bg: grad(180, '#3A2219', '#1F120D'), ambient: 'embers', elements: [
      a('mug', 130, 70, 140, 140, { anim: anim('rise', 0.2, 'float') }),
      t('Warm wishes', { font: 'bradley', size: 46, color: '#FFD9A8', y: 236, h: 58, anim: anim('rise', 0.5) }),
      t('& cozy nights', { font: 'bradley', size: 30, color: '#E8B888', y: 292, h: 40, anim: anim('rise', 0.75) }),
      line(170, 360, 60, '#E8B888'),
      t("Here's to slow mornings, full plates and the people who make it feel like home.", { font: 'georgia', italic: true, size: 15.5, lineHeight: 1.55, color: '#E9D3BC', x: 60, w: 280, y: 380, h: 80, anim: anim('fade', 1.1) }),
    ] }],
  },
  {
    ...xmas, id: 'peace-joy', name: 'Peace & Joy', motion: 1, accent: '#7E8C6A', tagline: 'Quiet, classic, a sprig of holly',
    pages: [{ bg: solid('#F4F0E6'), ambient: 'none', elements: [
      a('holly', 150, 92, 100, 58, { anim: anim('fade', 0) }),
      t('PEACE', { font: 'didot', size: 50, letterSpacing: 12, color: '#1E3B30', x: 10, w: 390, y: 186, h: 60, anim: anim('fade', 0.2) }),
      t('love & joy', { font: 'didot', italic: true, size: 34, color: '#B8262B', y: 246, h: 44, anim: anim('fade', 0.45) }),
      line(176, 316, 48, '#1E3B30'),
      t('SEASON’S GREETINGS', { size: 11, weight: 500, letterSpacing: 4, color: '#4F5E54', y: 336, h: 18, anim: anim('fade', 0.8) }),
      a('snowflake', 186, 452, 28, 28, { color: '#9FB2A6', opacity: 0.8, anim: anim('fade', 1.2, 'spin') }),
    ] }],
  },
];
