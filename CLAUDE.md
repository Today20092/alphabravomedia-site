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

## Design System (Refactoring UI)
**Spacing & Layout**
- Hero sections: `.site-section-hero` (6rem mobile, 8rem desktop top; 3rem mobile, 4rem desktop bottom)
- Standard sections: `.site-section` (border-top + 4rem mobile, 6rem desktop padding)
- Flush sections (no border): `.site-section-flush`
- Grids: `.site-grid-2` (2-up ≥768px), `.site-grid-3` (3-up ≥1024px), `.site-grid-4` (4-up ≥1280px). All gap 1.5rem.

**Colors & Tokens**
- Theme aliases emit Tailwind utilities: `bg-site-*`, `text-site-*`, `border-site-*`, `rounded-site-lg/xl`, `shadow-site-sm/md`.
- No arbitrary `[var(--site-*)]` — use theme utilities only. Dark/light mode built in via CSS custom properties.

**Cards & Primitives**
- `.site-card` + `.site-card-body-compact` (1.25rem pad, 0.5rem gap) or `-feature` (2rem pad, 1rem gap).
- `.site-badge-overlay` — on-image badges (portfolio, blog). Reusable, not component-specific.
- Avoid one-off styles; consolidate to primitives.

## Editing Guidance
- Smallest change that fits.
- Reuse existing styling, sections, patterns.
- Avoid new abstraction unless repeated.
- Keep cinematic, dark, high-contrast look.
- **New sections?** Use `.site-section` + `.site-shell` wrapper. **New grid?** Use `.site-grid-{2,3,4}`. **New badge?** Use `.site-badge-overlay`.

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
