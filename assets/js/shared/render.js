// Card rendering: DOM (editor / viewer, animated) and canvas (share images).
import { artSVG, svgDataURL, leafURL, LEAF_COLORS, ART } from './art.js';
import { fontCSS } from './fonts.js';

export const PAGE_W = 400;
export const PAGE_H = 560;

export const uid = () => Math.random().toString(36).slice(2, 10);

export function resolveSrc(card, src) {
  if (!src) return null;
  if (src.startsWith('asset:')) return card.assets?.[src.slice(6)] || null;
  return src;
}

export function bgCSS(bg) {
  if (!bg) return '#fff';
  if (bg.type === 'gradient') return `linear-gradient(${bg.angle ?? 180}deg, ${bg.colors.join(', ')})`;
  return bg.color;
}

function hash(s) { let h = 2166136261; for (const c of String(s)) h = Math.imul(h ^ c.charCodeAt(0), 16777619); return h >>> 0; }
function rng(seed) { let a = seed || 1; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

const h = (tag, cls, style) => { const n = document.createElement(tag); if (cls) n.className = cls; if (style) Object.assign(n.style, style); return n; };

export const AMBIENTS = { none: 'None', leaves: 'Falling leaves', confetti: 'Confetti', sparkle: 'Sparkles', embers: 'Warm embers' };

export function ambientLayer(kind, seed = 1) {
  const layer = h('div', `ambient amb-${kind}`);
  const r = rng(seed * 7919 + 13);
  const n = { leaves: 13, confetti: 34, sparkle: 22, embers: 18 }[kind] || 0;
  const kinds = ['maple', 'oak', 'birch'];
  const confettiColors = ['#E07A2E', '#C8471E', '#F2B53B', '#7DA043', '#B3261E', '#F6D7A7'];
  for (let i = 0; i < n; i++) {
    const p = h('div', 'amb-p');
    const inner = h('i');
    p.append(inner);
    p.style.left = `${r() * 100}%`;
    if (kind === 'leaves') {
      const s = 14 + r() * 20;
      Object.assign(p.style, { width: `${s}px`, height: `${s}px` });
      p.style.setProperty('--dur', `${9 + r() * 8}s`);
      p.style.setProperty('--del', `${-r() * 16}s`);
      p.style.setProperty('--dx', `${(r() - 0.5) * 160}px`);
      p.style.setProperty('--fl', `${1.6 + r() * 1.6}s`);
      inner.style.backgroundImage = `url("${leafURL(kinds[i % 3], LEAF_COLORS[Math.floor(r() * LEAF_COLORS.length)])}")`;
      p.style.opacity = 0.75 + r() * 0.25;
    } else if (kind === 'confetti') {
      Object.assign(p.style, { width: `${5 + r() * 5}px`, height: `${8 + r() * 6}px` });
      inner.style.background = confettiColors[i % confettiColors.length];
      inner.style.borderRadius = r() > 0.6 ? '50%' : '1px';
      p.style.setProperty('--dur', `${5 + r() * 5}s`);
      p.style.setProperty('--del', `${-r() * 10}s`);
      p.style.setProperty('--dx', `${(r() - 0.5) * 80}px`);
      p.style.setProperty('--fl', `${0.8 + r()}s`);
    } else if (kind === 'sparkle') {
      const s = 4 + r() * 9;
      Object.assign(p.style, { width: `${s}px`, height: `${s}px`, top: `${r() * 100}%` });
      inner.style.backgroundImage = `url("${svgDataURL(ART.sparkle.render('#F6DFA0'))}")`;
      p.style.setProperty('--dur', `${2 + r() * 3}s`);
      p.style.setProperty('--del', `${-r() * 5}s`);
    } else if (kind === 'embers') {
      const s = 3 + r() * 5;
      Object.assign(p.style, { width: `${s}px`, height: `${s}px` });
      p.style.setProperty('--dur', `${6 + r() * 6}s`);
      p.style.setProperty('--del', `${-r() * 12}s`);
      p.style.setProperty('--dx', `${(r() - 0.5) * 70}px`);
    }
    layer.append(p);
  }
  return layer;
}

// mode: 'edit' (placeholders, no entrance), 'preview' (placeholders), 'view' (recipient: hide empty slots)
export function renderPage(card, page, { mode = 'view', seed = 0 } = {}) {
  const root = h('div', 'page', { width: `${PAGE_W}px`, height: `${PAGE_H}px`, background: bgCSS(page.bg) });
  if (page.ambient && page.ambient !== 'none') root.append(ambientLayer(page.ambient, seed + 1));
  page.elements.forEach((el, i) => {
    const node = renderElement(card, el, mode);
    if (node) { node.style.zIndex = i + 1; root.append(node); }
  });
  return root;
}

export function renderElement(card, el, mode = 'view') {
  const src = resolveSrc(card, el.src);
  if (mode === 'view' && (el.type === 'image' || el.type === 'signature' || el.type === 'video') && !src) return null;

  const wrap = h('div', `el el-${el.type}`, {
    left: `${el.x}px`, top: `${el.y}px`, width: `${el.w}px`, height: `${el.h}px`,
    transform: `rotate(${el.rot || 0}deg)`, opacity: el.opacity ?? 1,
  });
  wrap.dataset.id = el.id;
  const a = el.anim || {};
  const animIn = h('div', `el-in in-${a.in || 'none'}`);
  animIn.style.setProperty('--d', `${a.delay || 0}s`);
  const loop = h('div', `el-loop loop-${a.loop || 'none'}`);
  loop.style.setProperty('--ld', `${-(hash(el.id) % 4000) / 1000}s`);
  const c = h('div', 'el-c');

  switch (el.type) {
    case 'text':
      c.textContent = el.text;
      Object.assign(c.style, textStyle(el));
      break;
    case 'image': {
      if (el.frame) {
        Object.assign(c.style, { padding: `${el.frame.pad}px ${el.frame.pad}px ${el.frame.bottom}px`, background: el.frame.color, boxShadow: '0 6px 18px rgba(60,35,15,.22)', borderRadius: '3px' });
      }
      const box = h('div', 'img-box', { borderRadius: `${el.radius || 0}px` });
      if (src) { const img = h('img'); img.src = src; img.alt = ''; img.draggable = false; box.append(img); }
      else box.append(placeholder('photo'));
      c.append(box);
      break;
    }
    case 'video': {
      const box = h('div', 'img-box vid-box', { borderRadius: `${el.radius ?? 14}px` });
      if (el.frame) Object.assign(c.style, { padding: `${el.frame.pad}px ${el.frame.pad}px ${el.frame.bottom}px`, background: el.frame.color, boxShadow: '0 6px 18px rgba(60,35,15,.22)', borderRadius: '3px' });
      if (src) {
        const v = document.createElement('video');
        v.src = src; v.muted = true; v.loop = el.loop !== false; v.playsInline = true; v.autoplay = true; v.preload = 'auto';
        v.setAttribute('playsinline', ''); v.setAttribute('muted', '');
        const poster = resolveSrc(card, el.poster); if (poster) v.poster = poster;
        box.append(v);
        if (mode === 'view') {
          const btn = h('button', 'vid-sound');
          btn.innerHTML = '<span>🔇</span> Tap for sound';
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            v.muted = !v.muted; if (!v.muted) { v.currentTime = 0; v.play(); }
            btn.innerHTML = v.muted ? '<span>🔇</span> Tap for sound' : '<span>🔊</span> Sound on';
          });
          box.append(btn);
        } else box.append(h('span', 'vid-badge'));
      } else box.append(placeholder('video'));
      c.append(box);
      break;
    }
    case 'art':
      c.innerHTML = artSVG(el.art, el.color);
      if (el.flip) c.style.transform = 'scaleX(-1)';
      break;
    case 'signature':
      if (src) { const img = h('img'); img.src = src; img.alt = 'signature'; img.draggable = false; c.append(img); }
      else c.append(placeholder('sign'));
      break;
    case 'shape':
      Object.assign(c.style, { background: el.fill, borderRadius: el.shape === 'circle' ? '50%' : `${el.radius || 0}px` });
      break;
  }
  loop.append(c); animIn.append(loop); wrap.append(animIn);
  return wrap;
}

function placeholder(kind) {
  const p = h('div', `ph ph-${kind}`);
  if (kind === 'video') { p.className = 'ph ph-photo'; p.innerHTML = `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="M16 10l5-3v10l-5-3z"/></svg><span>Add video</span>`; return p; }
  p.innerHTML = kind === 'photo'
    ? `<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 8h3l2-2h6l2 2h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg><span>Add photo</span>`
    : `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 17c3-1 4-8 6-8s0 7 2 7 3-5 5-5 2 4 5 4"/><path d="M3 21h18"/></svg><span>Sign here</span>`;
  return p;
}

export function textStyle(el) {
  return {
    fontFamily: fontCSS(el.font), fontSize: `${el.size}px`, color: el.color, fontWeight: el.weight || 400,
    fontStyle: el.italic ? 'italic' : 'normal', textAlign: el.align || 'center', lineHeight: el.lineHeight || 1.25,
    letterSpacing: `${el.letterSpacing || 0}px`, textShadow: el.shadow ? '0 2px 10px rgba(0,0,0,.25)' : 'none',
  };
}

// ---------- Canvas export ----------
const imgCache = new Map();
function loadImage(src) {
  if (imgCache.has(src)) return imgCache.get(src);
  const p = new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
  imgCache.set(src, p);
  return p;
}

function fillBg(ctx, bg, W, H) {
  if (bg?.type === 'gradient') {
    const t = ((bg.angle ?? 180) * Math.PI) / 180;
    const dx = Math.sin(t), dy = -Math.cos(t);
    const L = Math.abs(W * dx) + Math.abs(H * dy);
    const g = ctx.createLinearGradient(W / 2 - (dx * L) / 2, H / 2 - (dy * L) / 2, W / 2 + (dx * L) / 2, H / 2 + (dy * L) / 2);
    bg.colors.forEach((c, i) => g.addColorStop(i / Math.max(1, bg.colors.length - 1), c));
    ctx.fillStyle = g;
  } else ctx.fillStyle = bg?.color || '#fff';
  ctx.fillRect(0, 0, W, H);
}

function rr(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}

function drawCover(ctx, img, x, y, w, h) {
  const s = Math.max(w / img.width, h / img.height);
  const sw = w / s, sh = h / s;
  ctx.drawImage(img, (img.width - sw) / 2, (img.height - sh) / 2, sw, sh, x, y, w, h);
}

function wrapLines(ctx, text, maxW) {
  const out = [];
  for (const para of String(text).split('\n')) {
    const words = para.split(/(\s+)/);
    let line = '';
    for (const w of words) {
      const test = line + w;
      if (ctx.measureText(test.trimEnd()).width > maxW && line.trim()) { out.push(line.trimEnd()); line = w.trimStart(); }
      else line = test;
    }
    out.push(line.trimEnd());
  }
  return out;
}

// Web fonts are lazy: make sure the face is loaded before canvas draws with it.
const fontLoads = new Map();
function fontReady(spec) {
  if (typeof document === 'undefined' || !document.fonts) return;
  if (!fontLoads.has(spec)) fontLoads.set(spec, document.fonts.load(spec).catch(() => {}));
  return fontLoads.get(spec);
}

export async function drawPage(ctx, card, page, scale = 1) {
  ctx.save();
  ctx.scale(scale, scale);
  fillBg(ctx, page.bg, PAGE_W, PAGE_H);
  for (const el of page.elements) {
    const src = resolveSrc(card, el.src);
    if ((el.type === 'image' || el.type === 'signature' || el.type === 'video') && !src) continue;
    ctx.save();
    ctx.globalAlpha = el.opacity ?? 1;
    ctx.translate(el.x + el.w / 2, el.y + el.h / 2);
    ctx.rotate(((el.rot || 0) * Math.PI) / 180);
    ctx.translate(-el.w / 2, -el.h / 2);
    if (el.type === 'text') {
      ctx.font = `${el.italic ? 'italic ' : ''}${el.weight || 400} ${el.size}px ${fontCSS(el.font)}`;
      await fontReady(ctx.font);
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${el.letterSpacing || 0}px`;
      ctx.fillStyle = el.color; ctx.textBaseline = 'middle';
      const align = el.align || 'center';
      ctx.textAlign = align;
      const lh = el.size * (el.lineHeight || 1.25);
      const x = align === 'left' ? 0 : align === 'right' ? el.w : el.w / 2;
      if (el.shadow) { ctx.shadowColor = 'rgba(0,0,0,.25)'; ctx.shadowBlur = 10 * scale; ctx.shadowOffsetY = 2 * scale; }
      wrapLines(ctx, el.text, el.w).forEach((ln, i) => ctx.fillText(ln, x, i * lh + lh / 2));
    } else if (el.type === 'image') {
      const img = await loadImage(src);
      let ix = 0, iy = 0, iw = el.w, ih = el.h;
      if (el.frame) {
        ctx.save(); ctx.shadowColor = 'rgba(60,35,15,.25)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 5;
        ctx.fillStyle = el.frame.color; ctx.fillRect(0, 0, el.w, el.h); ctx.restore();
        ix = iy = el.frame.pad; iw = el.w - el.frame.pad * 2; ih = el.h - el.frame.pad - el.frame.bottom;
      }
      if (img) { ctx.save(); rr(ctx, ix, iy, iw, ih, el.radius || 0); ctx.clip(); drawCover(ctx, img, ix, iy, iw, ih); ctx.restore(); }
    } else if (el.type === 'video') {
      const poster = resolveSrc(card, el.poster);
      const img = poster && await loadImage(poster);
      ctx.save(); rr(ctx, 0, 0, el.w, el.h, el.radius ?? 14); ctx.clip();
      ctx.fillStyle = '#222'; ctx.fillRect(0, 0, el.w, el.h);
      if (img) drawCover(ctx, img, 0, 0, el.w, el.h);
      ctx.restore();
      const r = Math.min(el.w, el.h) * 0.13;
      ctx.fillStyle = 'rgba(0,0,0,.45)'; ctx.beginPath(); ctx.arc(el.w / 2, el.h / 2, r, 0, 7); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(el.w / 2 - r * 0.35, el.h / 2 - r * 0.5); ctx.lineTo(el.w / 2 + r * 0.55, el.h / 2); ctx.lineTo(el.w / 2 - r * 0.35, el.h / 2 + r * 0.5); ctx.fill();
    } else if (el.type === 'art') {
      const pw = Math.ceil(el.w * scale * 2), ph = Math.ceil(el.h * scale * 2);
      const s = artSVG(el.art, el.color).replace('<svg ', `<svg width="${pw}" height="${ph}" preserveAspectRatio="xMidYMid meet" `);
      const img = await loadImage(svgDataURL(s));
      if (img) {
        if (el.flip) { ctx.translate(el.w, 0); ctx.scale(-1, 1); }
        ctx.drawImage(img, 0, 0, el.w, el.h);
      }
    } else if (el.type === 'signature') {
      const img = await loadImage(src);
      if (img) {
        const s = Math.min(el.w / img.width, el.h / img.height);
        ctx.drawImage(img, (el.w - img.width * s) / 2, (el.h - img.height * s) / 2, img.width * s, img.height * s);
      }
    } else if (el.type === 'shape') {
      ctx.fillStyle = el.fill;
      if (el.shape === 'circle') { ctx.beginPath(); ctx.ellipse(el.w / 2, el.h / 2, el.w / 2, el.h / 2, 0, 0, Math.PI * 2); ctx.fill(); }
      else { rr(ctx, 0, 0, el.w, el.h, el.radius || 0); ctx.fill(); }
    }
    ctx.restore();
  }
  ctx.restore();
}

export async function pageImage(card, pageIndex = 0, scale = 2) {
  const cv = document.createElement('canvas');
  cv.width = PAGE_W * scale; cv.height = PAGE_H * scale;
  await drawPage(cv.getContext('2d'), card, card.pages[pageIndex], scale);
  return cv;
}

// 1200x630 preview used for the iMessage bubble / link preview.
export async function makeShareImage(card) {
  const W = 1200, H = 630;
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  ctx.fillStyle = '#0B0A0C'; ctx.fillRect(0, 0, W, H);
  const front = await pageImage(card, 0, 1.6);
  ctx.save(); ctx.globalAlpha = 0.55; ctx.filter = 'blur(40px)';
  ctx.drawImage(front, -100, -300, W + 200, (W + 200) * 1.4); ctx.restore();
  ctx.fillStyle = 'rgba(8,6,6,.35)'; ctx.fillRect(0, 0, W, H);
  const ch = 560, cw = ch * (PAGE_W / PAGE_H);
  const drawCard = (img, cx, rot) => {
    ctx.save(); ctx.translate(cx, H / 2); ctx.rotate((rot * Math.PI) / 180);
    ctx.shadowColor = 'rgba(0,0,0,.5)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 18;
    rr(ctx, -cw / 2, -ch / 2, cw, ch, 18); ctx.fillStyle = '#fff'; ctx.fill(); ctx.shadowColor = 'transparent';
    rr(ctx, -cw / 2, -ch / 2, cw, ch, 18); ctx.clip(); ctx.drawImage(img, -cw / 2, -ch / 2, cw, ch); ctx.restore();
  };
  if (card.pages[1]) drawCard(await pageImage(card, 1, 1.2), W / 2 + 120, 7);
  drawCard(front, W / 2 - 40, -4);
  return cv.toDataURL('image/jpeg', 0.86);
}
