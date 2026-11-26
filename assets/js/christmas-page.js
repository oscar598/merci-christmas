// Christmas-only page behavior: countdown, hero snowfall, early-access form.
import { SIGNUP_ENDPOINT } from './config.js';

function daysToChristmas(now = new Date()) {
  let xmas = new Date(now.getFullYear(), 11, 25);
  if (now > new Date(now.getFullYear(), 11, 26)) xmas = new Date(now.getFullYear() + 1, 11, 25);
  return Math.ceil((xmas - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5);
}

function countdown() {
  const d = daysToChristmas();
  const short = d === 0 ? 'Merry Christmas!' : d === 1 ? '1 day to go' : `${d} days to go`;
  const long = d === 0 ? 'Merry Christmas! It is not too late to send one.' : `${d} ${d === 1 ? 'day' : 'days'} until Christmas. Still plenty of time.`;
  document.querySelectorAll('[data-countdown]').forEach((el) => { el.textContent = short; });
  document.querySelectorAll('[data-countdown-long]').forEach((el) => { el.textContent = long; });
}

function snowfall(canvas) {
  const ctx = canvas.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let w = 0, h = 0, flakes = [], raf = 0, running = true;
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round((w * h) / 9000);
    flakes = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.6 + Math.random() * 2.2, s: 0.3 + Math.random() * 0.9, d: Math.random() * Math.PI * 2 }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const f of flakes) {
      if (!reduce) { f.y += f.s * (0.6 + f.r * 0.35); f.d += 0.01; f.x += Math.sin(f.d) * 0.35; }
      if (f.y > h + 4) { f.y = -4; f.x = Math.random() * w; }
      ctx.globalAlpha = 0.35 + f.r * 0.22;
      ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fillStyle = '#fff'; ctx.fill();
    }
    if (running && !reduce) raf = requestAnimationFrame(draw);
  };
  resize(); draw();
  addEventListener('resize', () => { resize(); if (reduce) draw(); });
  new IntersectionObserver(([e]) => {
    running = e.isIntersecting;
    cancelAnimationFrame(raf);
    if (running && !reduce) raf = requestAnimationFrame(draw);
  }).observe(canvas);
}

function signup() {
  const form = document.querySelector('.signup');
  const msg = document.querySelector('.signup-msg');
  if (!form || !SIGNUP_ENDPOINT) return;   // no endpoint configured: keep the app buttons only
  form.hidden = false;
  document.querySelector('.join-alt')?.classList.add('secondary');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    const btn = form.querySelector('button');
    btn.disabled = true; msg.textContent = '';
    try {
      const res = await fetch(SIGNUP_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email, source: 'christmas-landing' }),
      });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      msg.textContent = "You're on the list. We'll email you the day the Christmas collection is live. 🎄";
    } catch {
      msg.textContent = "That didn't go through. Please try again in a moment.";
    } finally { btn.disabled = false; }
  });
}

export function initChristmas() {
  countdown();
  const c = document.querySelector('.snowfall');
  if (c) snowfall(c);
  signup();
}
