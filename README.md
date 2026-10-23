# Jenny’s Love Accounting — site rebuild (staging)

Next.js 15 · Tailwind CSS 4 · TypeScript. Static output; no database (the parent Hometown Supabase requirement does not apply here).

Deploys on Netlify (`netlify.toml`). Set `SITE_ENV=production` in Netlify only when launch is authorized; until then every build is noindex.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # staging build: noindex + robots Disallow
SITE_ENV=production npm run build   # only after separately authorized launch
```

## Design reference

Layout system modeled on the **Calma** Webflow template (Over Sight) — cream ground, Lora serif headlines, “Meet ___” owner hero, dark value cards, ruled service list, a dark band, a visit section, “Words from the Heart” testimonials, and a dark closing CTA + footer. Rebuilt from scratch in code (no template files, images or code copied); recolored to Jenny’s brand: ivory `#f6f1e7`, ink `#2b211f`, logo red `#af1f25` (sampled), wine `#3d1719`. Fonts: Lora + Open Sans (SIL OFL, self-hosted via `next/font`).

## Where things live

- `src/content/business.ts` — single source for name, phone, email, address, hours, experience. Each fact carries source, approval and verified date.
- `src/content/services.ts` — services, extras, software (condensed from the live /our-services).
- `src/content/posts/*.json` — both live articles, preserved verbatim from the crawl.
- All seven live paths are kept: `/`, `/about`, `/our-services`, `/contact`, `/blog`, `/post/how-to-prepare-for-tax-season-a-2026-guide`, `/post/best-bookkeeping-services-for-small-business-in-2026`.

## Photos

- `jenny-portrait.jpg` (About page only), `jennys-love-logo.png`, `heart-mark.png` — from the current jennyslove.com (owner’s own media; confirm consent/rights).
- Pexels (free under the [Pexels license](https://www.pexels.com/license/); no recognizable faces):
  - `kc-liberty-memorial.jpg` — https://www.pexels.com/photo/7076295/
  - `receipts-desk.jpg`, `receipts-wide.jpg` — https://www.pexels.com/photo/5900135/
  - `desk-calculator.jpg` — https://www.pexels.com/photo/7654590/
  - `documents-desk.jpg` (home hero, cropped to exclude the face) — https://www.pexels.com/photo/8296998/

Hours follow Google Maps (every day 7am–8pm), per the client on 2026-10-23.

## Needs owner approval before launch

- **Portrait**: the only real photo of Jenny (from the current site). Confirm consent and photographer rights; a proper photo shoot would lift the whole site.
- **Logo**: in use from the current site; request vector artwork.
- **Testimonial**: Bryan K. quote reused verbatim from the current homepage; confirm permission.
- Services/extras scope, “Northland” wording, the 3-step “How it works” (About), FAQ answers, article byline (currently the business name) and a qualified review of the tax article.
- **Contact form**: planned on Netlify Forms; not built yet. Needs the recipient, response expectations and a privacy note. Phone/email/directions are the current paths.
- Analytics: CTAs carry `data-event` (`consultation_cta_click`, `phone_click`, `email_click`) and push to `window.dataLayer` only if an approved tool defines it. No vendor script is installed.

## Known gaps

- The project folder name contains an apostrophe, which breaks Next’s file-based metadata loader; the favicon lives in `public/`, and robots/sitemap are route handlers.
- First-load JS is ~103–112 KB (Next/React runtime) — a documented exception to the 100 KB target. No Lighthouse or field metrics have been measured.
- Not yet tested: VoiceOver, 200%/400% zoom, real devices.
