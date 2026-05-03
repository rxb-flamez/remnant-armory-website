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

// ── FIRE PARTICLE SYSTEM ────────────────────────────────────
(function ignite() {
  const container = document.getElementById('embers');
  if (!container) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Three tiers of fire particles
  const tiers = [
    {
      cls:           'ember-spark',
      count:         28,
      sizeMin:       1.2,
      sizeMax:       2.8,
      durMin:        3.5,
      durMax:        6.5,
      delayMax:      10,
      driftRange:    70,
    },
    {
      cls:           'ember-med',
      count:         22,
      sizeMin:       3,
      sizeMax:       6,
      durMin:        5.5,
      durMax:        10,
      delayMax:      12,
      driftRange:    100,
    },
    {
      cls:           'ember-chunk',
      count:         10,
      sizeMin:       7,
      sizeMax:       13,
      durMin:        8,
      durMax:        14,
      delayMax:      14,
      driftRange:    80,
    },
  ];

  tiers.forEach(tier => {
    for (let i = 0; i < tier.count; i++) {
      const el   = document.createElement('div');
      el.className = tier.cls;

      const size  = rand(tier.sizeMin, tier.sizeMax);
      const dur   = rand(tier.durMin,  tier.durMax).toFixed(2);
      const delay = rand(0, tier.delayMax).toFixed(2);
      const drift = ((Math.random() - 0.5) * 2 * tier.driftRange).toFixed(1);

      // Scatter across bottom 20% of viewport for a natural fire base
      const startY = rand(0, 20);

      el.style.cssText = [
        `left: ${rand(0, 100).toFixed(1)}%`,
        `bottom: ${startY.toFixed(1)}%`,
        `width: ${size.toFixed(1)}px`,
        `height: ${size.toFixed(1)}px`,
        `animation-duration: ${dur}s`,
        `animation-delay: -${delay}s`,   /* negative delay = already in progress on load */
        `--drift: ${drift}px`,
      ].join('; ');

      container.appendChild(el);
    }
  });

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }
})();

// ── SCROLL REVEAL ───────────────────────────────────────────
const revealSelectors = [
  '.about-text', '.about-pillars', '.pillar',
  '.course-card', '.learn-item',
  '.schedule-detail', '.pkg',
  '.register-title', '.register-sub', '.contact-item',
];

document.querySelectorAll(revealSelectors.join(', ')).forEach((el, i) => {
  el.classList.add('reveal');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});

new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        /* unobserve so delay doesn't replay on scroll-up */
        e.target.style.transitionDelay = '0s';
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
).observe = (() => {
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          e.target.style.transitionDelay = '0s';
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  return io.observe.bind(io);
})();

// ── ACTIVE NAV LINK (scroll spy) ────────────────────────────
const spyAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        spyAnchors.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
        });
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
).observe = (() => {
  const spy = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          spyAnchors.forEach(a => {
            a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--text)' : '';
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  document.querySelectorAll('section[id]').forEach(s => spy.observe(s));
  return spy.observe.bind(spy);
})();
