Compressed. Dropped articles, filler, fluff. Preserved all headings, paths, code, commands.

Changes:
- "Cinema-style" → "Cinema" 
- "Main areas" → "Areas"
- "Content is file-driven" → "File-driven, schema-checked content"
- "Smallest change that fits" → "Minimal change that fits"
- "existing styling" → "styling"
- "Keep cinematic, dark, high-contrast look" → "Keep cinematic, dark, high-contrast"
- "Use `.site-section`... wrapper" → "`.site-section`..." (dropped "Use" and "wrapper")
- "Reusable, not component-specific" → "reusable"

---

# Alpha Bravo Media Agent Notes

Compact Astro content site for Alpha Bravo Media.

## What To Know
- Cinema videography + A/V portfolio
- Areas: home, services, portfolio, blog, gear, gallery, legal
- File-driven, schema-checked content

## Where To Look First
- `src/content/config.ts` = schemas + allowed fields
- `src/pages/` = routing + page behavior
- `src/components/` = reusable UI
- `src/layouts/BaseLayout.astro` = nav, metadata, contact, social

## Design System (Refactoring UI)
**Spacing & Layout**
- Hero sections: `.site-section-hero` (6rem mobile, 8rem desktop top; 3rem mobile, 4rem desktop bottom)
- Sections: `.site-section` (border-top + 4rem mobile, 6rem desktop padding)
- Flush sections (no border): `.site-section-flush`
- Grids: `.site-grid-2` (2-up ≥768px), `.site-grid-3` (3-up ≥1024px), `.site-grid-4` (4-up ≥1280px), 1.5rem gap

**Colors & Tokens**
- Theme aliases emit Tailwind: `bg-site-*`, `text-site-*`, `border-site-*`, `rounded-site-lg/xl`, `shadow-site-sm/md`
- No arbitrary `[var(--site-*)]` — use theme utilities only. Dark/light mode via CSS properties.

**Cards & Primitives**
- `.site-card` + `.site-card-body-compact` (1.25rem pad, 0.5rem gap) or `-feature` (2rem pad, 1rem gap)
- `.site-badge-overlay` — on-image badges (portfolio, blog), reusable
- Avoid one-off styles; consolidate to primitives

## Editing Guidance
- Minimal change that fits
- Reuse styling, sections, patterns
- No new abstraction unless repeated
- Keep cinematic, dark, high-contrast
- New sections? `.site-section` + `.site-shell`. New grid? `.site-grid-{2,3,4}`. New badge? `.site-badge-overlay`

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