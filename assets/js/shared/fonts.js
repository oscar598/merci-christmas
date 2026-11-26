// Fonts for card text.
// - System fonts: Apple fonts (always present on iPhone / Mac, which is where
//   iMessage recipients open cards) with sensible fallbacks for everything else.
// - Web fonts: open-licensed Google Fonts bundled in /fonts (see fonts/fonts.css
//   and fonts/LICENSES.md). @font-face is lazy, so a file is only fetched once
//   text actually uses the family. Use loadFont() before measuring or drawing.

export const FONT_CATEGORIES = ['Script', 'Handwritten', 'Serif', 'Sans', 'Display', 'Mono'];

const FB = {
  Script: "'Snell Roundhand','Apple Chancery','Segoe Script',cursive",
  Handwritten: "'Bradley Hand','Segoe Print','Comic Sans MS',cursive",
  Serif: "Georgia,'Times New Roman',serif",
  Sans: "'Avenir Next','Segoe UI',Helvetica,Arial,sans-serif",
  Display: "'Avenir Next','Segoe UI',Helvetica,Arial,sans-serif",
  Mono: "Menlo,'Courier New',monospace",
};

const SYSTEM = {
  snell: { label: 'Snell Roundhand', category: 'Script', css: "'Snell Roundhand','Apple Chancery','Segoe Script','Brush Script MT',cursive" },
  savoye: { label: 'Savoye', category: 'Script', css: "'Savoye LET','Snell Roundhand','Segoe Script',cursive" },
  chancery: { label: 'Apple Chancery', category: 'Script', css: "'Apple Chancery','URW Chancery L','Segoe Script',cursive" },
  bradley: { label: 'Bradley Hand', category: 'Handwritten', css: "'Bradley Hand','Segoe Print','Comic Sans MS',cursive" },
  noteworthy: { label: 'Noteworthy', category: 'Handwritten', css: "'Noteworthy','Segoe Print','Comic Sans MS',cursive" },
  marker: { label: 'Marker Felt', category: 'Handwritten', css: "'Marker Felt','Comic Sans MS',cursive" },
  chalkboard: { label: 'Chalkboard', category: 'Handwritten', css: "'Chalkboard SE','Chalkboard','Comic Sans MS',cursive" },
  didot: { label: 'Didot', category: 'Serif', css: "'Didot','Bodoni 72','Bodoni MT',serif" },
  baskerville: { label: 'Baskerville', category: 'Serif', css: "'Baskerville','Baskerville Old Face',Georgia,serif" },
  hoefler: { label: 'Hoefler Text', category: 'Serif', css: "'Hoefler Text',Garamond,Georgia,serif" },
  georgia: { label: 'Georgia', category: 'Serif', css: "Georgia,'Times New Roman',serif" },
  copperplate: { label: 'Copperplate', category: 'Serif', css: "'Copperplate','Copperplate Gothic Light',serif" },
  typewriter: { label: 'Typewriter', category: 'Mono', css: "'American Typewriter','Courier New',monospace" },
  avenir: { label: 'Avenir Next', category: 'Sans', css: "'Avenir Next','Avenir','Segoe UI',Helvetica,Arial,sans-serif" },
  futura: { label: 'Futura', category: 'Sans', css: "'Futura','Century Gothic','Trebuchet MS',sans-serif" },
  gill: { label: 'Gill Sans', category: 'Sans', css: "'Gill Sans','Gill Sans MT',Calibri,sans-serif" },
};

// [key, family, category, bundled weights, fallback override]
const WEB = [
  ['greatvibes', 'Great Vibes', 'Script', [400]],
  ['pinyon', 'Pinyon Script', 'Script', [400]],
  ['parisienne', 'Parisienne', 'Script', [400]],
  ['allura', 'Allura', 'Script', [400]],
  ['dancing', 'Dancing Script', 'Script', [400, 700]],
  ['sacramento', 'Sacramento', 'Script', [400]],
  ['alexbrush', 'Alex Brush', 'Script', [400]],
  ['tangerine', 'Tangerine', 'Script', [400, 700]],
  ['satisfy', 'Satisfy', 'Script', [400]],
  ['caveat', 'Caveat', 'Handwritten', [400, 700]],
  ['homemadeapple', 'Homemade Apple', 'Handwritten', [400]],
  ['shadows', 'Shadows Into Light', 'Handwritten', [400]],
  ['indieflower', 'Indie Flower', 'Handwritten', [400]],
  ['patrickhand', 'Patrick Hand', 'Handwritten', [400]],
  ['kalam', 'Kalam', 'Handwritten', [400, 700]],
  ['gloria', 'Gloria Hallelujah', 'Handwritten', [400]],
  ['reenie', 'Reenie Beanie', 'Handwritten', [400]],
  ['nothingyoucoulddo', 'Nothing You Could Do', 'Handwritten', [400]],
  ['playfair', 'Playfair Display', 'Serif', [400, 700], "'Didot',Georgia,serif"],
  ['cormorant', 'Cormorant Garamond', 'Serif', [400, 700], "'Hoefler Text',Garamond,Georgia,serif"],
  ['dmserif', 'DM Serif Display', 'Serif', [400]],
  ['abril', 'Abril Fatface', 'Serif', [400], "'Didot','Bodoni 72',Georgia,serif"],
  ['lora', 'Lora', 'Serif', [400, 700]],
  ['fraunces', 'Fraunces', 'Serif', [400, 700]],
  ['cinzel', 'Cinzel', 'Serif', [400, 700], "'Copperplate','Trajan Pro',Georgia,serif"],
  ['yeseva', 'Yeseva One', 'Serif', [400]],
  ['prata', 'Prata', 'Serif', [400]],
  ['inter', 'Inter', 'Sans', [400, 700]],
  ['poppins', 'Poppins', 'Sans', [400, 700], "'Futura','Avenir Next',Helvetica,Arial,sans-serif"],
  ['montserrat', 'Montserrat', 'Sans', [400, 700]],
  ['dmsans', 'DM Sans', 'Sans', [400, 700]],
  ['outfit', 'Outfit', 'Sans', [400, 700]],
  ['manrope', 'Manrope', 'Sans', [400, 700]],
  ['nunito', 'Nunito', 'Sans', [400, 700]],
  ['quicksand', 'Quicksand', 'Sans', [400, 700]],
  ['josefin', 'Josefin Sans', 'Sans', [400, 700], "'Futura','Century Gothic',sans-serif"],
  ['raleway', 'Raleway', 'Sans', [400, 700]],
  ['pacifico', 'Pacifico', 'Display', [400], "'Marker Felt','Brush Script MT',cursive"],
  ['lobster', 'Lobster', 'Display', [400], "'Marker Felt','Brush Script MT',cursive"],
  ['righteous', 'Righteous', 'Display', [400]],
  ['bungee', 'Bungee', 'Display', [400], "'Futura','Impact',sans-serif"],
  ['fredoka', 'Fredoka', 'Display', [400, 700], "'Chalkboard SE','Avenir Next',sans-serif"],
  ['chewy', 'Chewy', 'Display', [400], "'Marker Felt','Chalkboard SE',cursive"],
  ['baloo', 'Baloo 2', 'Display', [400, 700], "'Chalkboard SE','Avenir Next',sans-serif"],
  ['shrikhand', 'Shrikhand', 'Display', [400], "'Marker Felt',Georgia,cursive"],
  ['bagel', 'Bagel Fat One', 'Display', [400], "'Futura','Impact',sans-serif"],
  ['rubikmono', 'Rubik Mono One', 'Display', [400], "'Futura','Impact',sans-serif"],
  ['monoton', 'Monoton', 'Display', [400], "'Futura','Impact',sans-serif"],
  ['christmas', 'Mountains of Christmas', 'Display', [400, 700], "'Chalkboard SE','Marker Felt',cursive"],
  ['spacemono', 'Space Mono', 'Mono', [400, 700]],
];

export const FONTS = { ...SYSTEM };
for (const [key, family, category, weights, fb] of WEB) {
  FONTS[key] = { label: family, category, css: `'${family}',${fb || FB[category]}`, family, weights, web: true };
}

export const fontCSS = (key) => (FONTS[key] || FONTS.avenir).css;

const loaded = new Map();
// Fetch a bundled web font (no-op for system fonts). Resolves when ready; never rejects.
export function loadFont(key, weight = 400) {
  const f = FONTS[key];
  if (!f?.web || typeof document === 'undefined' || !document.fonts) return Promise.resolve();
  const w = (+weight || 400) >= 600 && f.weights.includes(700) ? 700 : 400;
  const spec = `${w} 1em '${f.family}'`;
  if (!loaded.has(spec)) loaded.set(spec, document.fonts.load(spec).catch(() => {}));
  return loaded.get(spec);
}
