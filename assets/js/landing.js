// merci. landing page: live card previews, scroll reveals, word highlight.
// Shared by every edition (index.html, christmas/). Each edition passes its own templates.
import { instantiate } from './shared/templates.js';
import { renderPage, PAGE_W, PAGE_H } from './shared/render.js';
import { LINKS } from './config.js';

export function initLanding(TEMPLATES) {
const byId = Object.fromEntries(TEMPLATES.map((t) => [t.id, t]));

document.querySelectorAll('[data-link]').forEach((a) => { const u = LINKS[a.dataset.link]; if (u) a.href = u; });

function mountCard(host, tplId, width, seed = 0) {
  const tpl = byId[tplId];
  if (!tpl) return;
  const s = width / PAGE_W;
  host.style.width = `${width}px`;
  host.style.height = `${Math.round(PAGE_H * s)}px`;
  const card = instantiate(tpl);
  const node = renderPage(card, card.pages[0], { mode: 'view', seed });
  node.style.transform = `scale(${s})`;
  if (tpl.snow) node.append(Object.assign(document.createElement('div'), { className: 'xsnow' }));
  host.replaceChildren(node);
}

// Cards placed in the markup
document.querySelectorAll('.card-mount[data-tpl]').forEach((el, i) => mountCard(el, el.dataset.tpl, +el.dataset.w, i));

// Designs rail: every template, live
const rail = document.getElementById('rail');
TEMPLATES.forEach((t, i) => {
  const tile = document.createElement('article');
  tile.className = 'tile';
  const frame = document.createElement('div');
  frame.className = 'frame';
  const mount = document.createElement('div');
  mount.className = 'card-mount';
  frame.append(mount);
  const bars = Array.from({ length: 5 }, (_, k) => `<i class="${k < t.motion ? 'on' : ''}"></i>`).join('');
  tile.innerHTML = `<h4><span>${t.name}</span><span class="motion" title="Motion ${t.motion} of 5">${bars}</span></h4><p>${t.tagline}</p>`;
  tile.prepend(frame);
  rail.append(tile);
  mountCard(mount, t.id, window.innerWidth < 640 ? 180 : 220, 20 + i);
});

// Play card animations while visible; replay each time a card comes back into view.
const playIO = new IntersectionObserver((entries) => {
  for (const e of entries) {
    const page = e.target.querySelector('.page');
    if (!page) continue;
    if (e.isIntersecting) { page.classList.remove('playing'); void page.offsetWidth; page.classList.add('playing', 'amb-on'); }
    else page.classList.remove('amb-on');
  }
}, { threshold: 0.35 });
document.querySelectorAll('.card-mount').forEach((m) => playIO.observe(m));

// Section reveals
const revealIO = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); }
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach((el) => revealIO.observe(el));

// About paragraph: words light up as you scroll past.
const big = document.querySelector('.fade-words');
if (big) {
  const words = big.textContent.trim().split(/\s+/);
  big.innerHTML = words.map((w) => `<span>${w}</span>`).join(' ');
  const spans = [...big.children];
  const paint = () => {
    const r = big.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
    const lit = Math.round(p * spans.length);
    spans.forEach((s, i) => { s.style.color = i < lit ? 'var(--tx)' : 'var(--mut2)'; });
  };
  paint();
  addEventListener('scroll', paint, { passive: true });
  addEventListener('resize', paint);
}

// Nav: highlight the section in view
const links = [...document.querySelectorAll('.links a')];
const secIO = new IntersectionObserver((entries) => {
  for (const e of entries) if (e.isIntersecting) {
    const id = e.target.id === 'about' ? 'top' : e.target.id;
    links.forEach((a) => a.classList.toggle('on', a.getAttribute('href') === `#${id}`));
  }
}, { rootMargin: '-45% 0px -50% 0px' });
links.map((a) => a.getAttribute('href').slice(1)).forEach((id) => { const el = document.getElementById(id); if (el) secIO.observe(el); });
}
