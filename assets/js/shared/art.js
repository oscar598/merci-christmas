// Hand-drawn SVG illustration library. Each entry renders to an SVG string so it
// works inline in the DOM (crisp + animatable) and as an <img> for canvas export.
const svg = (vb, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}">${body}</svg>`;
const f = (n) => +n.toFixed(1);

function steam(xs, color = '#B98A72', y = 0) {
  return `<g fill="none" stroke="${color}" stroke-width="2.6" stroke-linecap="round">${xs
    .map((x, i) => `<path opacity="0" d="M${x} ${36 + y}C${x - 5} ${30 + y} ${x + 5} ${26 + y} ${x} ${18 + y}"><animate attributeName="opacity" values="0;.85;0" dur="3s" begin="-${i}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 6;0 -6" dur="3s" begin="-${i}s" repeatCount="indefinite"/></path>`)
    .join('')}</g>`;
}

const maple = (c = '#C8471E') => svg('0 0 100 100',
  `<path fill="${c}" stroke="${c}" stroke-width="3" stroke-linejoin="round" d="M50 4L56 22L66 16L63 36L80 27L75 43L94 46L77 58L82 69L60 65L53 80L50 78L47 80L40 65L18 69L23 58L6 46L25 43L20 27L37 36L34 16L44 22Z"/>` +
  `<path d="M50 78V97" stroke="${c}" stroke-width="3.2" stroke-linecap="round"/>` +
  `<path d="M50 76V22M50 56L28 39M50 56L72 39M50 67L28 63M50 67L72 63" stroke="#000" stroke-opacity=".22" stroke-width="1.6" fill="none" stroke-linecap="round"/>`);

const oak = (c = '#B5651D') => svg('0 0 100 100',
  `<path fill="${c}" d="M50 8C60 12 55 22 62 25C72 28 68 37 75 41C83 45 73 52 77 58C81 66 67 66 64 74C62 82 55 81 52 90L48 90C45 81 38 82 36 74C33 66 19 66 23 58C27 52 17 45 25 41C32 37 28 28 38 25C45 22 40 12 50 8Z"/>` +
  `<path d="M50 14V97M50 40L36 32M50 40L64 32M50 58L32 52M50 58L68 52" stroke="#000" stroke-opacity=".22" stroke-width="1.6" fill="none" stroke-linecap="round"/>` +
  `<path d="M50 88V97" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`);

const birch = (c = '#E0A526') => svg('0 0 100 100',
  `<path fill="${c}" d="M50 6C76 26 80 62 50 90C20 62 24 26 50 6Z"/>` +
  `<path d="M50 88V97" stroke="${c}" stroke-width="3" stroke-linecap="round"/>` +
  `<path d="M50 14V88M50 40L38 30M50 40L62 30M50 56L36 46M50 56L64 46M50 72L40 64M50 72L60 64" stroke="#000" stroke-opacity=".2" stroke-width="1.5" fill="none" stroke-linecap="round"/>`);

const pumpkin = () => svg('0 0 100 100',
  `<path d="M50 30C51 22 53 14 60 9" stroke="#5B6E2E" stroke-width="6" fill="none" stroke-linecap="round"/>` +
  `<path d="M55 21C64 11 77 13 80 19C72 25 61 25 55 21Z" fill="#7DA043"/>` +
  `<ellipse cx="30" cy="61" rx="23" ry="30" fill="#D9661C"/>` +
  `<ellipse cx="70" cy="61" rx="23" ry="30" fill="#D9661C"/>` +
  `<ellipse cx="50" cy="61" rx="23" ry="33" fill="#EE8A35"/>` +
  `<ellipse cx="50" cy="61" rx="9" ry="31" fill="#F6A152" opacity=".85"/>` +
  `<path d="M27 34C20 48 20 74 27 88M73 34C80 48 80 74 73 88" stroke="#B4501A" stroke-width="1.6" fill="none" opacity=".55"/>`);

function turkey() {
  const outer = ['#B8382A', '#E07B2B', '#F0B23A', '#B8382A', '#F0B23A', '#E07B2B', '#B8382A'];
  const inner = ['#E07B2B', '#F0B23A', '#C9572C', '#F0B23A', '#E07B2B'];
  let tail = '';
  outer.forEach((c, i) => { const a = -63 + i * 21; tail += `<ellipse cx="0" cy="-30" rx="9.5" ry="25" fill="${c}" transform="rotate(${a})"/>`; });
  inner.forEach((c, i) => { const a = -56 + i * 28; tail += `<ellipse cx="0" cy="-22" rx="7" ry="17" fill="${c}" transform="rotate(${a})"/>`; });
  return svg('0 0 100 100',
    `<g transform="translate(50 60)">${tail}</g>` +
    `<path d="M44 85L42 95M44 89L38 94M44 89L46 95M56 85L58 95M56 89L62 94M56 89L54 95" stroke="#E8932F" stroke-width="2.6" stroke-linecap="round"/>` +
    `<ellipse cx="50" cy="66" rx="20" ry="22" fill="#8B5A2B"/>` +
    `<ellipse cx="50" cy="73" rx="12" ry="13" fill="#A9713A"/>` +
    `<path d="M36 64C40 72 44 76 50 78M64 64C60 72 56 76 50 78" stroke="#6E4520" stroke-width="1.5" fill="none" opacity=".6"/>` +
    `<circle cx="50" cy="42" r="11.5" fill="#9C6634"/>` +
    `<circle cx="45.5" cy="40" r="3" fill="#fff"/><circle cx="46" cy="40.5" r="1.6" fill="#2a1a10"/>` +
    `<circle cx="54.5" cy="40" r="3" fill="#fff"/><circle cx="54" cy="40.5" r="1.6" fill="#2a1a10"/>` +
    `<path d="M46.5 45L53.5 45L50 50.5Z" fill="#F2A93B"/>` +
    `<path d="M51.5 47C56 50 56 56.5 52.5 57.5C50.5 55.5 50.5 50.5 51.5 47Z" fill="#D64534"/>`);
}

function pie() {
  let sc = '';
  for (let i = 0; i < 20; i++) {
    const a = (i / 20) * Math.PI * 2;
    sc += `<circle cx="${f(50 + 40 * Math.cos(a))}" cy="${f(56 + 14 * Math.sin(a))}" r="4.3" fill="#E2A65E"/>`;
  }
  let lat = '';
  [24, 37, 50, 63, 76].forEach((x) => { lat += `<path d="M${x - 7} 44L${x + 7} 68"/><path d="M${x + 7} 44L${x - 7} 68"/>`; });
  return svg('0 0 100 100',
    steam([38, 50, 62]) +
    `<path d="M8 58L17 80Q50 93 83 80L92 58Z" fill="#C8553D"/>` +
    `<path d="M17 80Q50 93 83 80" stroke="#A8432F" stroke-width="2" fill="none"/>` +
    `<path d="M10 58Q50 74 90 58L88 66Q50 82 12 66Z" fill="#D18E4A"/>` +
    `<ellipse cx="50" cy="56" rx="40" ry="14" fill="#E9B16B"/>` +
    `<clipPath id="pieClip"><ellipse cx="50" cy="56" rx="34" ry="10"/></clipPath>` +
    `<ellipse cx="50" cy="56" rx="34" ry="10" fill="#C2662C"/>` +
    `<g clip-path="url(#pieClip)" stroke="#F1C27F" stroke-width="3.6" stroke-linecap="round">${lat}</g>` +
    sc);
}

function wheat(c = '#D9A441') {
  const d = '#A97A26';
  let k = '';
  for (let i = 0; i < 6; i++) {
    const y = 28 + i * 11;
    k += `<ellipse cx="43" cy="${y}" rx="5.2" ry="9.5" transform="rotate(-28 43 ${y})" fill="${c}" stroke="${d}" stroke-width=".8"/>`;
    k += `<ellipse cx="57" cy="${y}" rx="5.2" ry="9.5" transform="rotate(28 57 ${y})" fill="${c}" stroke="${d}" stroke-width=".8"/>`;
  }
  k += `<ellipse cx="50" cy="16" rx="5" ry="9.5" fill="${c}" stroke="${d}" stroke-width=".8"/>`;
  const awns = `<path d="M50 7L50 1M43 20L36 8M57 20L64 8M42 31L32 22M58 31L68 22" stroke="${d}" stroke-width=".9" stroke-linecap="round"/>`;
  return svg('25 0 50 120', `<path d="M50 118C50 96 50 64 50 22" stroke="${d}" stroke-width="2.6" fill="none" stroke-linecap="round"/>${awns}${k}`);
}

const acorn = () => svg('0 0 100 100',
  `<path d="M28 46Q28 80 50 92Q72 80 72 46Z" fill="#C98B4B"/>` +
  `<path d="M38 52Q38 74 50 84" stroke="#E4B178" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/>` +
  `<path d="M20 46Q22 22 50 20Q78 22 80 46Q50 54 20 46Z" fill="#7A4A26"/>` +
  `<path d="M28 32L72 44M24 40L60 50M40 24L78 38M30 46L58 22M44 50L72 26M60 52L80 38" stroke="#5E361A" stroke-width="1.3" opacity=".7"/>` +
  `<path d="M50 21Q51 12 59 8" stroke="#5A3519" stroke-width="4.5" fill="none" stroke-linecap="round"/>`);

const apple = () => svg('0 0 100 100',
  `<path d="M50 30C36 20 14 28 16 52C18 76 36 94 50 87C64 94 82 76 84 52C86 28 64 20 50 30Z" fill="#C93A2E"/>` +
  `<ellipse cx="32" cy="46" rx="6" ry="11" fill="#fff" opacity=".25" transform="rotate(20 32 46)"/>` +
  `<path d="M50 32Q49 20 54 12" stroke="#5A3519" stroke-width="4" fill="none" stroke-linecap="round"/>` +
  `<path d="M54 20C62 10 76 12 78 18C70 24 60 24 54 20Z" fill="#6E9A3A"/>`);

function corn() {
  let k = '';
  for (let r = 0; r < 11; r++) {
    const y = 20 + r * 6.2;
    const hw = 18 * Math.sqrt(Math.max(0, 1 - ((y - 52) / 36) ** 2));
    if (hw < 5) continue;
    for (let c = -2; c <= 2; c++) {
      const x = 50 + c * hw * 0.38 + (r % 2 ? hw * 0.19 : 0);
      if (Math.abs(x - 50) > hw - 3) continue;
      k += `<ellipse cx="${f(x)}" cy="${f(y)}" rx="2.9" ry="2.6" fill="#F7D35E" stroke="#D9A62E" stroke-width=".6"/>`;
    }
  }
  return svg('0 0 100 100',
    `<ellipse cx="50" cy="52" rx="18" ry="37" fill="#EDB93A"/>${k}` +
    `<path d="M50 97C30 92 18 62 26 32C34 58 40 76 52 92Z" fill="#8DAA4B"/>` +
    `<path d="M50 97C70 92 82 62 74 32C66 58 60 76 48 92Z" fill="#76963A"/>` +
    `<path d="M50 97C46 86 46 74 50 64C54 74 54 86 50 97Z" fill="#A3BC5E"/>`);
}

function sunflower() {
  let p = '';
  for (let i = 0; i < 16; i++) p += `<ellipse cx="50" cy="24" rx="7" ry="17" fill="#E9A62A" transform="rotate(${i * 22.5} 50 50)"/>`;
  for (let i = 0; i < 16; i++) p += `<ellipse cx="50" cy="28" rx="6" ry="14" fill="#F6C443" transform="rotate(${i * 22.5 + 11} 50 50)"/>`;
  let s = '';
  for (let i = 0; i < 26; i++) {
    const a = i * 2.4, r = 2.4 * Math.sqrt(i);
    s += `<circle cx="${f(50 + r * Math.cos(a))}" cy="${f(50 + r * Math.sin(a))}" r="1.3" fill="#3E2412"/>`;
  }
  return svg('0 0 100 100', `${p}<circle cx="50" cy="50" r="16" fill="#6B3E1E"/>${s}`);
}

const heart = (c = '#C65A3A') => svg('0 0 100 100',
  `<path fill="${c}" d="M50 88C20 66 7 48 13 31C19 14 42 12 50 29C58 12 81 14 87 31C93 48 80 66 50 88Z"/>` +
  `<path d="M26 30C22 36 22 44 26 50" stroke="#fff" stroke-opacity=".35" stroke-width="4" fill="none" stroke-linecap="round"/>`);

const sparkle = (c = '#E9C46A') => svg('0 0 100 100',
  `<path fill="${c}" d="M50 4C53 38 62 47 96 50C62 53 53 62 50 96C47 62 38 53 4 50C38 47 47 38 50 4Z"/>`);

const mug = () => svg('0 0 100 100',
  steam([40, 52], '#B98A72', -4) +
  `<path d="M66 48Q84 48 84 62Q84 76 66 74" stroke="#9E3D30" stroke-width="7" fill="none"/>` +
  `<path d="M26 40H70V78Q70 91 57 91H39Q26 91 26 78Z" fill="#B5483A"/>` +
  `<path d="M26 60H70" stroke="#E7C9A0" stroke-width="3"/><path d="M26 66H70" stroke="#E7C9A0" stroke-width="1.5"/>` +
  `<ellipse cx="48" cy="40" rx="22" ry="4.5" fill="#7A2E22"/>` +
  `<rect x="55" y="18" width="5" height="30" rx="2" fill="#8A5A34" transform="rotate(16 57 33)"/>`);

const cornucopia = () => svg('0 0 120 100',
  `<path d="M14 58C18 36 40 24 64 28C82 31 98 22 110 6C114 30 102 52 80 64C62 74 42 82 22 88C14 80 12 68 14 58Z" fill="#C98A47"/>` +
  `<path d="M40 29C33 46 32 66 37 84M58 28C53 42 52 60 56 77M76 28C72 38 71 52 74 66M92 22C89 30 88 40 90 50" stroke="#A36A31" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
  `<path d="M30 33C42 44 64 50 108 18M22 50C40 62 66 66 96 50" stroke="#E2AE6C" stroke-width="1.6" fill="none" opacity=".7"/>` +
  `<ellipse cx="19" cy="72" rx="10" ry="17" fill="#6E4320" transform="rotate(12 19 72)"/>` +
  `<path d="M24 56C30 46 44 44 50 50C44 56 32 58 24 56Z" fill="#7A9A3E"/>` +
  `<ellipse cx="18" cy="60" rx="11" ry="8.5" fill="#E07B2B"/><ellipse cx="18" cy="60" rx="4.5" ry="8.5" fill="#F09A45"/>` +
  `<path d="M18 52Q19 47 23 46" stroke="#5B6E2E" stroke-width="2.4" fill="none" stroke-linecap="round"/>` +
  `<circle cx="32" cy="80" r="10" fill="#C93A2E"/><ellipse cx="28" cy="76" rx="2.4" ry="4" fill="#fff" opacity=".3"/>` +
  `<path d="M32 70Q33 65 36 63" stroke="#5A3519" stroke-width="2" fill="none"/>` +
  [[8, 80], [14, 84], [6, 88], [12, 91], [18, 90], [9, 96], [15, 97]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.4" fill="#6E3B6E"/><circle cx="${x - 1.2}" cy="${y - 1.4}" r="1.2" fill="#fff" opacity=".35"/>`).join('') +
  `<ellipse cx="44" cy="90" rx="7" ry="9" fill="#E3B23C" transform="rotate(-50 44 90)"/>`);

function berries() {
  const leaves = [[22, 44, -30, '#A0522D'], [40, 34, 30, '#C8742E'], [62, 28, -20, '#7C8B4E'], [84, 20, 25, '#B5651D'], [100, 15, -15, '#C8742E']];
  const b = [[30, 48], [35, 52], [28, 54], [58, 36], [63, 40], [56, 42], [90, 26], [95, 29], [88, 31]];
  return svg('0 0 120 64',
    `<path d="M4 56C30 46 60 34 116 10" stroke="#6B4A2E" stroke-width="2.6" fill="none" stroke-linecap="round"/>` +
    leaves.map(([x, y, a, c]) => `<ellipse cx="${x}" cy="${y - 7}" rx="5" ry="10" fill="${c}" transform="rotate(${a} ${x} ${y})"/>`).join('') +
    b.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4.2" fill="#B3261E"/><circle cx="${x - 1.3}" cy="${y - 1.3}" r="1.1" fill="#fff" opacity=".5"/>`).join(''));
}

const divider = (c = '#8A5A3B') => svg('0 0 200 30',
  `<g stroke="${c}" stroke-width="1.6" fill="none" stroke-linecap="round"><path d="M8 15H76M124 15H192"/><path d="M80 15C86 4 94 4 100 15C106 26 114 26 120 15"/><path d="M80 15C86 26 94 26 100 15C106 4 114 4 120 15" opacity=".5"/></g><circle cx="100" cy="15" r="2.6" fill="${c}"/>`);

const star = (c = '#E9C46A') => svg('0 0 100 100',
  `<path fill="${c}" d="M50 6L62 36L94 38L69 58L77 90L50 72L23 90L31 58L6 38L38 36Z" stroke="${c}" stroke-width="4" stroke-linejoin="round"/>`);

// key -> { label, render(color), vb: [w,h], tint: default color if recolorable }
export const ART = {
  maple: { label: 'Maple leaf', render: maple, vb: [100, 100], tint: '#C8471E' },
  oak: { label: 'Oak leaf', render: oak, vb: [100, 100], tint: '#B5651D' },
  birch: { label: 'Leaf', render: birch, vb: [100, 100], tint: '#E0A526' },
  pumpkin: { label: 'Pumpkin', render: pumpkin, vb: [100, 100] },
  turkey: { label: 'Turkey', render: turkey, vb: [100, 100] },
  pie: { label: 'Pie', render: pie, vb: [100, 100] },
  wheat: { label: 'Wheat', render: wheat, vb: [50, 120], tint: '#D9A441' },
  acorn: { label: 'Acorn', render: acorn, vb: [100, 100] },
  apple: { label: 'Apple', render: apple, vb: [100, 100] },
  corn: { label: 'Corn', render: corn, vb: [100, 100] },
  sunflower: { label: 'Sunflower', render: sunflower, vb: [100, 100] },
  cornucopia: { label: 'Cornucopia', render: cornucopia, vb: [120, 100] },
  mug: { label: 'Hot cider', render: mug, vb: [100, 100] },
  berries: { label: 'Berry branch', render: berries, vb: [120, 64] },
  heart: { label: 'Heart', render: heart, vb: [100, 100], tint: '#C65A3A' },
  sparkle: { label: 'Sparkle', render: sparkle, vb: [100, 100], tint: '#E9C46A' },
  star: { label: 'Star', render: star, vb: [100, 100], tint: '#E9C46A' },
  divider: { label: 'Flourish', render: divider, vb: [200, 30], tint: '#8A5A3B' },
};

export const artSVG = (key, color) => {
  const a = ART[key];
  if (!a) return '';
  return a.tint ? a.render(color || a.tint) : a.render();
};

export const svgDataURL = (s) => 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(s);

export const LEAF_COLORS = ['#C8471E', '#E07A2E', '#D9A441', '#A63D1E', '#B5651D', '#E3A72F'];
export const leafURL = (kind, color) => svgDataURL({ maple, oak, birch }[kind](color));
