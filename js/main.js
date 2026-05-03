/* ============================================================
   REMNANT ARMORY — main.js
   ============================================================ */

// ── NAV: scroll shadow ──────────────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── NAV: mobile toggle ──────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
  navToggle.innerHTML = open ? '&#10005;' : '&#9776;';
});

navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
    navToggle.innerHTML = '&#9776;';
  });
});

// ── EMBER PARTICLES ─────────────────────────────────────────
(function spawnEmbers() {
  const container = document.getElementById('embers');
  if (!container) return;

  const COUNT = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 35;

  for (let i = 0; i < COUNT; i++) {
    const el   = document.createElement('div');
    el.className = 'ember';
    const size = Math.random() * 2.5 + 1;
    el.style.cssText = [
      `left: ${Math.random() * 100}%`,
      `width: ${size}px`,
      `height: ${size}px`,
      `animation-duration: ${(Math.random() * 7 + 5).toFixed(1)}s`,
      `animation-delay: ${(Math.random() * 10).toFixed(2)}s`,
      `--drift: ${((Math.random() - 0.5) * 90).toFixed(0)}px`,
    ].join(';');
    container.appendChild(el);
  }
})();

// ── SCROLL REVEAL ───────────────────────────────────────────
const revealSelectors = [
  '.about-text',
  '.about-pillars',
  '.pillar',
  '.course-card',
  '.learn-item',
  '.schedule-detail',
  '.pkg',
  '.register-title',
  '.register-sub',
  '.contact-item',
];

const revealEls = document.querySelectorAll(revealSelectors.join(', '));

revealEls.forEach((el, i) => {
  el.classList.add('reveal');
  const delay = (i % 4) * 0.1;
  el.style.transitionDelay = `${delay}s`;
});

const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ── ACTIVE NAV LINK (scroll spy) ────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const spy = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}`
            ? 'var(--text)'
            : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => spy.observe(s));
