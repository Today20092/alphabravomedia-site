# Alpha Bravo Media Agent Notes

Compact Astro content site for Alpha Bravo Media.

## What To Know
- Cinema-style videography + A/V portfolio.
- Main areas: home, services, portfolio, blog, gear, gallery, legal.
- Content is file-driven and schema-checked.

## Where To Look First
- `src/content/config.ts` = schemas + allowed fields.
- `src/pages/` = routing + page behavior.
- `src/components/` = reusable UI.
- `src/layouts/BaseLayout.astro` = nav, metadata, contact, social.

## Editing Guidance
- Smallest change that fits.
- Reuse existing styling, sections, patterns.
- Avoid new abstraction unless repeated.
- Keep cinematic, dark, high-contrast look.

## Content Areas
- Services: `src/content/services/`
- Portfolio: `src/content/portfolio/`
- Blog: `src/content/blog/`
- Gear: `src/content/gear/`
- Galleries: `src/content/galleries/`

## Commands
- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run new`
