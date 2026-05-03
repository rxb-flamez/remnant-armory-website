# Remnant Armory — Website

Marketing and registration website for **Remnant Armory**, a faith-driven firearm training company based in Tampa, FL. Designed to convert visitors into registered students for concealed carry and self-defense courses.

---

## Live Site

> Deploy to Vercel or Netlify by connecting this repo — no build step needed (pure static HTML/CSS/JS).

---

## What's on the Site

| Section | Purpose |
|---|---|
| **Hero** | Full-screen CTA with ember particle effect and two action buttons |
| **About** | Mission statement, faith pillars (Faith · Freedom · Firepower), scripture |
| **Courses** | Fundamentals of Firearm Safety + Concealed Carry & Self-Defense |
| **What You'll Learn** | 8-item curriculum grid |
| **Schedule** | Next class date, duration, classroom location, range details |
| **Pricing** | Standard ($95) vs All-In ($150) packages with feature comparison |
| **Register** | Direct phone and email CTAs to reserve a seat |
| **Footer** | Brand, scripture, copyright |

---

## Stack

- Pure HTML5 / CSS3 / vanilla JS — zero dependencies, zero build step
- Google Fonts: Oswald · Barlow Condensed · Barlow
- Responsive (mobile-first, breakpoints at 640px and 900px)

---

## File Structure

```
remnant-armory-website/
├── index.html          # Single-page layout
├── css/
│   └── style.css       # All styles — dark tactical theme, amber accent
├── js/
│   └── main.js         # Nav scroll, mobile menu, embers, scroll reveal, spy
└── images/
    └── logo.png        # Drop your logo here (fallback text shown if missing)
```

---

## Adding a Logo

Drop a `logo.png` into the `images/` folder. Recommended size: **200 × 60 px** (2× for retina). The nav and footer already reference it with a text fallback if it's missing.

---

## Updating the Schedule

In `index.html`, find the `#schedule` section and update:

```html
<div class="schedule-value">May 17–18</div>   <!-- ← date -->
<div class="schedule-sub">2025</div>           <!-- ← year -->
```

---

## Contact Info

- **Email:** Remnantarmory@gmail.com

To update, search `index.html` for `tel:` and `mailto:`.

---

## Deploying to Vercel

1. Push this repo to GitHub (already done — `rxb-flamez/remnant-armory-website`)
2. Go to [vercel.com/new](https://vercel.com/new) → Import Git Repository
3. Select `remnant-armory-website` → Deploy (no build settings needed)

Or via CLI:
```bash
npx vercel --prod
```

---

© 2025 Remnant Armory · All Rights Reserved
