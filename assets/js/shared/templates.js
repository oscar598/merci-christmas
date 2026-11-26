// 10 premade Thanksgiving designs. Coordinates are in a 400 x 560 page.
import { uid } from './render.js';

const anim = (inn = 'fade', delay = 0, loop = 'none') => ({ in: inn, delay, loop });
const t = (text, o = {}) => ({
  type: 'text', text, font: 'avenir', size: 18, color: '#3B2A1A', weight: 400, italic: false, align: 'center',
  lineHeight: 1.25, letterSpacing: 0, x: 20, y: 0, w: 360, h: 30, rot: 0, opacity: 1, anim: anim(), ...o,
});
const a = (art, x, y, w, h, o = {}) => ({ type: 'art', art, x, y, w, h, rot: 0, opacity: 1, anim: anim('pop'), ...o });
const img = (x, y, w, h, o = {}) => ({ type: 'image', src: null, x, y, w, h, rot: 0, opacity: 1, radius: 0, frame: null, anim: anim('fade'), ...o });
const sig = (x, y, w = 220, h = 90, o = {}) => ({ type: 'signature', src: null, x, y, w, h, rot: 0, opacity: 1, anim: anim('write', 1.1), ...o });
const line = (x, y, w, fill, o = {}) => ({ type: 'shape', shape: 'rect', x, y, w, h: 1.5, fill, radius: 0, rot: 0, opacity: 1, anim: anim('fade', 0.6), ...o });
const solid = (color) => ({ type: 'color', color });
const grad = (angle, ...colors) => ({ type: 'gradient', angle, colors });

const body = (text, o = {}) => t(text, { size: 16.5, lineHeight: 1.55, align: 'left', x: 44, w: 312, y: 128, h: 160, color: '#4A3426', anim: anim('fade', 0.5), ...o });

export const TEMPLATES = [
  {
    id: 'falling-leaves', name: 'Falling Leaves', motion: 5, accent: '#E8763A', tagline: 'Leaves drift across every page',
    pages: [
      { bg: grad(165, '#F9E0B8', '#F0A86A', '#D9693A'), ambient: 'leaves', elements: [
        a('maple', 36, 46, 84, 84, { rot: -18, color: '#B33A16', anim: anim('drop', 0.1, 'sway') }),
        a('oak', 286, 74, 74, 74, { rot: 24, color: '#8E4A17', anim: anim('drop', 0.3, 'sway') }),
        a('birch', 300, 412, 56, 56, { rot: -30, color: '#E3A72F', anim: anim('pop', 1.3, 'float') }),
        a('maple', 50, 432, 64, 64, { rot: 12, color: '#C4561F', anim: anim('pop', 1.5, 'sway') }),
        t('Happy', { font: 'snell', size: 70, color: '#6E2410', y: 168, h: 88, anim: anim('rise', 0.4) }),
        t('Thanksgiving', { font: 'snell', size: 60, color: '#6E2410', y: 244, h: 76, anim: anim('rise', 0.7) }),
        t('WITH LOVE & GRATITUDE', { size: 12, weight: 600, letterSpacing: 4, color: '#7A3318', y: 346, h: 18, anim: anim('fade', 1.2) }),
      ] },
      { bg: solid('#FFF6EA'), ambient: 'leaves', elements: [
        t('Dear friend,', { font: 'bradley', size: 30, color: '#7A2E12', align: 'left', x: 44, y: 64, w: 312, h: 40, anim: anim('fade', 0.2) }),
        body("This year I'm especially thankful for you — for the laughs, the long talks, and every little moment in between. Wishing you a table full of good food and a heart full of joy."),
        t('With love,', { font: 'bradley', size: 22, color: '#7A2E12', align: 'left', x: 44, y: 330, w: 200, h: 30, anim: anim('fade', 0.8) }),
        sig(38, 364),
        a('maple', 318, 474, 48, 48, { rot: 18, anim: anim('pop', 1.4, 'sway') }),
      ] },
    ],
  },
  {
    id: 'simply-grateful', name: 'Simply Grateful', motion: 1, accent: '#7E8C6A', tagline: 'Quiet, modern, timeless',
    pages: [
      { bg: solid('#F3EDE2'), ambient: 'none', elements: [
        a('wheat', 172, 70, 56, 134, { anim: anim('fade', 0) }),
        t('give', { font: 'didot', italic: true, size: 44, color: '#2F3A2C', y: 232, h: 55, anim: anim('fade', 0.2) }),
        t('THANKS', { font: 'didot', size: 64, letterSpacing: 10, color: '#2F3A2C', x: 10, w: 390, y: 282, h: 80, anim: anim('fade', 0.4) }),
        line(176, 384, 48, '#2F3A2C'),
        t('THANKSGIVING · 2026', { size: 11, weight: 500, letterSpacing: 4, color: '#5B6655', y: 404, h: 18, anim: anim('fade', 0.8) }),
      ] },
      { bg: solid('#F3EDE2'), ambient: 'none', elements: [
        t('A note of thanks', { font: 'didot', italic: true, size: 28, color: '#2F3A2C', y: 92, h: 36 }),
        line(176, 146, 48, '#2F3A2C', { anim: anim('fade', 0.2) }),
        body('For every kindness, every shared meal, and every ordinary day made better because you were in it — thank you.', { font: 'baskerville', size: 18, lineHeight: 1.6, align: 'center', x: 50, w: 300, y: 178, h: 170, color: '#3A4236' }),
        sig(90, 372),
        a('wheat', 188, 474, 24, 58, { opacity: 0.7, anim: anim('fade', 1.4) }),
      ] },
    ],
  },
  {
    id: 'oh-my-gourd', name: 'Oh My Gourd', motion: 3, accent: '#F08A2E', tagline: 'Pumpkins that pop in',
    pages: [
      { bg: grad(180, '#FFF0DA', '#FFD3A3'), ambient: 'none', elements: [
        a('birch', 302, 40, 58, 58, { rot: 30, color: '#D9A441', anim: anim('drop', 0.1, 'sway') }),
        a('maple', 40, 62, 50, 50, { rot: -20, anim: anim('drop', 0.2, 'sway') }),
        t('Oh my gourd,', { font: 'chalkboard', size: 38, weight: 700, color: '#A8431A', y: 112, h: 48, anim: anim('rise', 0.1) }),
        t("it's Thanksgiving!", { font: 'chalkboard', size: 32, weight: 700, color: '#C85A22', y: 162, h: 40, anim: anim('rise', 0.35) }),
        a('pumpkin', 18, 326, 174, 174, { anim: anim('pop', 0.6) }),
        a('pumpkin', 212, 350, 152, 152, { anim: anim('pop', 0.8) }),
        a('pumpkin', 130, 404, 132, 132, { anim: anim('pop', 1.0, 'bounce') }),
      ] },
      { bg: solid('#FFF5E8'), ambient: 'none', elements: [
        t("You're the pick of the patch.", { font: 'chalkboard', size: 28, weight: 700, color: '#A8431A', x: 40, w: 320, y: 64, h: 76 }),
        body('Hope your day is full of pie, people you love, and zero dishes to wash. Happy Thanksgiving!', { y: 168, h: 130, color: '#5A3A24' }),
        sig(90, 324),
        a('pumpkin', 166, 452, 68, 68, { anim: anim('pop', 1.3, 'bounce') }),
      ] },
    ],
  },
  {
    id: 'gobble-gobble', name: 'Gobble Gobble', motion: 5, accent: '#C2541B', tagline: 'Confetti + a very excited turkey',
    pages: [
      { bg: grad(180, '#FFF3DC', '#FFCB8E'), ambient: 'confetti', elements: [
        t('GOBBLE', { font: 'marker', size: 62, weight: 700, color: '#8A3416', y: 38, h: 72, rot: -4, anim: anim('pop', 0.1) }),
        t('GOBBLE!', { font: 'marker', size: 62, weight: 700, color: '#C2541B', y: 100, h: 72, rot: 3, anim: anim('pop', 0.35) }),
        a('turkey', 80, 178, 240, 240, { anim: anim('drop', 0.6, 'wobble') }),
        t('Happy Turkey Day!', { font: 'marker', size: 28, color: '#8A3416', y: 440, h: 36, anim: anim('rise', 1.0) }),
      ] },
      { bg: solid('#FFF8EC'), ambient: 'confetti', elements: [
        t('Eat, drink & be thankful', { font: 'marker', size: 32, color: '#C2541B', x: 30, w: 340, y: 64, h: 84 }),
        body('Wishing you a ridiculous amount of food and the best kind of food coma. So grateful for you!', { y: 172, h: 130, color: '#5A3A24' }),
        sig(90, 324),
        a('turkey', 165, 448, 70, 70, { anim: anim('pop', 1.4, 'wobble') }),
      ] },
    ],
  },
  {
    id: 'harvest-table', name: 'Harvest Table', motion: 2, accent: '#B07A55', tagline: 'Your photo, front and center',
    pages: [
      { bg: solid('#FBF5EC'), ambient: 'none', elements: [
        img(28, 28, 344, 380, { radius: 16 }),
        a('maple', 312, 372, 60, 60, { rot: 20, anim: anim('drop', 0.6, 'sway') }),
        a('oak', 290, 400, 40, 40, { rot: -10, color: '#D98A2B', anim: anim('drop', 0.8) }),
        t('Grateful', { font: 'snell', size: 64, color: '#6B3A1F', y: 412, h: 80, anim: anim('rise', 0.3) }),
        t('for this table & everyone around it', { font: 'georgia', italic: true, size: 15, color: '#7A5A44', y: 494, h: 20, anim: anim('fade', 0.8) }),
      ] },
      { bg: solid('#FBF5EC'), ambient: 'none', elements: [
        t('Happy Thanksgiving', { font: 'snell', size: 44, color: '#6B3A1F', y: 62, h: 58 }),
        body("Nothing beats a full table and a fuller heart. Thank you for being part of mine — I hope today is cozy, delicious and unhurried.", { font: 'georgia', align: 'center', y: 148, h: 160 }),
        sig(90, 336),
        a('divider', 120, 452, 160, 24, { color: '#B07A55', anim: anim('fade', 1.4) }),
      ] },
    ],
  },
  {
    id: 'golden-hour', name: 'Golden Hour', motion: 3, accent: '#E8C57A', tagline: 'Midnight blue with drifting sparkles',
    pages: [
      { bg: grad(170, '#1E2742', '#33284A', '#4A2E44'), ambient: 'sparkle', elements: [
        a('sparkle', 300, 120, 26, 26, { color: '#F4DFA8', anim: anim('pop', 1.4, 'pulse') }),
        a('sparkle', 78, 330, 18, 18, { color: '#F4DFA8', anim: anim('pop', 1.6, 'pulse') }),
        t('Give', { font: 'didot', italic: true, size: 46, color: '#E8C57A', y: 148, h: 58, anim: anim('zoom', 0.2) }),
        t('Thanks', { font: 'didot', size: 86, color: '#F4DFA8', y: 200, h: 104, anim: anim('zoom', 0.45, 'shimmer') }),
        t('AND COUNT YOUR BLESSINGS', { size: 11.5, weight: 500, letterSpacing: 5, color: '#E8C57A', y: 318, h: 18, anim: anim('fade', 1.0) }),
        a('wheat', 178, 372, 44, 106, { color: '#E8C57A', anim: anim('rise', 1.2) }),
      ] },
      { bg: grad(170, '#1E2742', '#33284A', '#4A2E44'), ambient: 'sparkle', elements: [
        t('Dearest,', { font: 'didot', italic: true, size: 32, color: '#F4DFA8', align: 'left', x: 44, w: 312, y: 70, h: 40 }),
        body('However far apart we are this year, you are at my table in spirit. Thank you for the light you bring — I count you among my greatest blessings.', { color: '#E9DCC4', y: 130, h: 170 }),
        sig(38, 334),
        a('sparkle', 330, 470, 22, 22, { color: '#F4DFA8', anim: anim('pop', 1.4, 'pulse') }),
      ] },
    ],
  },
  {
    id: 'pie-season', name: 'Pie Season', motion: 3, accent: '#D9776A', tagline: 'A warm pie, still steaming',
    pages: [
      { bg: grad(180, '#FDEDE3', '#F6D2C0'), ambient: 'none', elements: [
        t('Thankful for pie', { font: 'bradley', size: 40, color: '#8A3B2E', y: 72, h: 50, anim: anim('rise', 0.2) }),
        t('…and for you.', { font: 'bradley', size: 30, color: '#B4564A', y: 126, h: 38, anim: anim('fade', 1.2) }),
        a('heart', 70, 206, 30, 28, { color: '#D9776A', anim: anim('pop', 1.4, 'pulse') }),
        a('heart', 300, 194, 22, 20, { color: '#D9776A', anim: anim('pop', 1.6, 'pulse') }),
        a('pie', 70, 214, 260, 260, { anim: anim('rise', 0.6) }),
        t('HAPPY THANKSGIVING', { size: 12, weight: 600, letterSpacing: 4, color: '#8A3B2E', y: 488, h: 18, anim: anim('fade', 1.5) }),
      ] },
      { bg: solid('#FFF4EE'), ambient: 'none', elements: [
        t('Save me a slice!', { font: 'bradley', size: 34, color: '#8A3B2E', y: 66, h: 44 }),
        body("Pumpkin, pecan, apple — I'm not picky, as long as I get to share it with you. Have the sweetest Thanksgiving.", { y: 148, h: 150, color: '#5E3A32' }),
        sig(90, 324),
        a('pie', 160, 436, 80, 80, { anim: anim('pop', 1.4) }),
      ] },
    ],
  },
  {
    id: 'grateful-heart', name: 'Grateful Heart', motion: 2, accent: '#C65A3A', tagline: 'Soft, romantic, a gentle heartbeat',
    pages: [
      { bg: solid('#F7E4D7'), ambient: 'none', elements: [
        a('heart', 120, 92, 160, 148, { anim: anim('pop', 0.2, 'pulse') }),
        a('maple', 90, 74, 46, 46, { rot: -30, color: '#D98A2B', anim: anim('drop', 0.5) }),
        a('oak', 264, 66, 44, 44, { rot: 25, color: '#A63D1E', anim: anim('drop', 0.7) }),
        a('birch', 252, 212, 36, 36, { rot: 40, color: '#E3A72F', anim: anim('drop', 0.9) }),
        t('grateful', { font: 'snell', size: 68, color: '#9C4A2F', y: 272, h: 86, anim: anim('rise', 0.6) }),
        t('for you, always', { font: 'didot', italic: true, size: 22, color: '#9C4A2F', y: 362, h: 28, anim: anim('fade', 1.0) }),
      ] },
      { bg: solid('#F7E4D7'), ambient: 'none', elements: [
        t('To my favorite person,', { font: 'snell', size: 36, color: '#9C4A2F', y: 66, h: 48 }),
        body("Of all the things I'm thankful for this year, you're at the very top of the list. Happy Thanksgiving, love.", { font: 'didot', size: 18, align: 'center', y: 150, h: 150, color: '#6E3A28' }),
        sig(90, 330),
        a('heart', 182, 460, 36, 34, { anim: anim('pop', 1.4, 'pulse') }),
      ] },
    ],
  },
  {
    id: 'cornucopia', name: 'Cornucopia', motion: 4, accent: '#C98A47', tagline: 'A season of abundance',
    pages: [
      { bg: grad(175, '#F5E6C8', '#EBCB92'), ambient: 'leaves', elements: [
        t('A Season of', { font: 'baskerville', italic: true, size: 26, color: '#6E3B1A', y: 62, h: 34, anim: anim('fade', 0.1) }),
        t('Abundance', { font: 'baskerville', size: 56, letterSpacing: 1, color: '#6E3B1A', y: 96, h: 70, anim: anim('rise', 0.3) }),
        a('divider', 120, 174, 160, 24, { anim: anim('fade', 0.6) }),
        a('cornucopia', 30, 226, 340, 283, { anim: anim('rise', 0.8, 'float') }),
        t('HAPPY THANKSGIVING', { size: 12, weight: 600, letterSpacing: 4, color: '#6E3B1A', y: 516, h: 18, anim: anim('fade', 1.3) }),
      ] },
      { bg: solid('#FBF1DE'), ambient: 'none', elements: [
        t('Counting my blessings', { font: 'baskerville', italic: true, size: 30, color: '#6E3B1A', y: 66, h: 40 }),
        a('divider', 120, 114, 160, 24, { anim: anim('fade', 0.3) }),
        body('…and you are one of the biggest. May your table be full, your plate fuller, and your heart the fullest of all.', { font: 'baskerville', size: 18, align: 'center', y: 156, h: 150, color: '#5A3A24' }),
        sig(90, 334),
        a('berries', 140, 456, 120, 64, { anim: anim('fade', 1.4) }),
      ] },
    ],
  },
  {
    id: 'our-people', name: 'Our People', motion: 1, accent: '#8C6A4E', tagline: 'Three polaroids of your favorite humans',
    pages: [
      { bg: solid('#EFE6D8'), ambient: 'none', elements: [
        img(32, 40, 180, 212, { rot: -6, frame: { pad: 10, bottom: 34, color: '#FFFFFF' }, anim: anim('drop', 0.1) }),
        img(190, 72, 178, 208, { rot: 5, frame: { pad: 10, bottom: 34, color: '#FFFFFF' }, anim: anim('drop', 0.3) }),
        img(102, 250, 196, 228, { rot: -2, frame: { pad: 10, bottom: 34, color: '#FFFFFF' }, anim: anim('drop', 0.5) }),
        a('maple', 326, 236, 44, 44, { rot: 20, anim: anim('pop', 0.9) }),
        t('Thankful for my people', { font: 'bradley', size: 32, color: '#5A3A24', y: 494, h: 40, anim: anim('fade', 0.9) }),
      ] },
      { bg: solid('#EFE6D8'), ambient: 'none', elements: [
        t('Family, friends & every one in between', { font: 'bradley', size: 28, color: '#5A3A24', x: 40, w: 320, y: 64, h: 74 }),
        body("These are the faces that make every holiday worth it. Thank you for another year of memories — here's to many more.", { y: 168, h: 140, color: '#5A3A24' }),
        sig(90, 330),
        a('acorn', 176, 456, 48, 48, { anim: anim('pop', 1.4) }),
      ] },
    ],
  },
];

// Card categories. Seasonal first; the everyday sections are ready for designs.
export const CATEGORIES = [
  { id: 'seasonal', label: 'Seasonal', blurb: 'Holidays, in season now', subs: [
    { id: 'thanksgiving', label: 'Thanksgiving', live: true },
    { id: 'christmas', label: 'Christmas' }, { id: 'hanukkah', label: 'Hanukkah' }, { id: 'new-year', label: 'New Year' },
  ] },
  { id: 'thank-you', label: 'Thank you', blurb: 'For the people who showed up', emoji: '💐' },
  { id: 'invite', label: 'Invitations', blurb: 'Dinners, parties, get-togethers', emoji: '✉️' },
  { id: 'wedding', label: 'Wedding', blurb: 'Save the dates, invites, thank-yous', emoji: '💍' },
];
TEMPLATES.forEach((t) => { t.category ??= 'seasonal'; t.sub ??= 'thanksgiving'; });
export const templatesIn = (cat, sub) => TEMPLATES.filter((t) => t.category === cat && (!sub || t.sub === sub));

export function instantiate(tpl) {
  const copy = JSON.parse(JSON.stringify(tpl));
  copy.pages.forEach((p) => p.elements.forEach((e) => { e.id = uid(); }));
  return { title: copy.name, templateId: copy.id, pages: copy.pages, assets: {}, uploads: [] };
}

export function blankCard() {
  return { title: 'Untitled card', templateId: null, assets: {}, uploads: [], pages: [{ bg: { type: 'color', color: '#FFF8EF' }, ambient: 'none', elements: [] }] };
}
