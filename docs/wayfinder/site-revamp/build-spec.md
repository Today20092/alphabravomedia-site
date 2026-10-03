---
title: Alpha Bravo Media informational revamp
status: ready-for-agent
---

## Problem Statement

Alpha Bravo Media currently presents a service business. The owner wants an informational home for the Alpha Bravo Media YouTube channel, with articles, practical resources, and gear recommendations.

## Solution

Build an editorial site using the chosen Editorial field notes typography and layout, Creator workshop charcoal, cream, and lime colors, and its toolbox interaction. Visitors can watch the channel, read articles, find resources, and explore equipment. Remove sales messaging and retire the portfolio and gallery pages from this site.

## User Stories

1. As a visitor, I want to understand what the channel covers so I can decide whether to watch.
2. As a viewer, I want a prominent channel link so I can watch Alpha Bravo Media on YouTube.
3. As a reader, I want to browse existing articles so I can find useful information.
4. As a reader, I want clear article typography so long posts are comfortable to read.
5. As a reader, I want chapters and reading progress so I can navigate long posts.
6. As a mobile reader, I want collapsible chapters so navigation fits my screen.
7. As a reader, I want section links so I can share a particular passage.
8. As a reader, I want to enlarge article images so I can inspect details.
9. As a creator, I want one Resources page so I can find guides, tools, and real downloads together.
10. As a visitor, I want resource links to distinguish tools, guides, and downloads so I know what opens.
11. As a viewer, I want gear recommendations and equipment details so I can understand the owner's setup.
12. As a visitor, I want clear affiliate disclosure so I understand linked recommendations.
13. As a visitor, I want an About page so I can learn about the creator and channel.
14. As a visitor, I want simple contact links so I can contact the creator without a project inquiry form.
15. As a keyboard user, I want visible focus and operable navigation, toolbox panels, and dialogs.
16. As a visitor sensitive to motion, I want reduced-motion behavior.
17. As a returning visitor, I want a deliberate outcome for retired URLs rather than accidental broken links.
18. As the owner, I want existing content and source media preserved during the transition.
19. As the owner, I want to review the complete revamp on its branch before publishing.

## Implementation Decisions

- Retain Astro, Tailwind, shadcn, existing content collections, and the static Cloudflare Pages deployment model. No Lumos migration.
- Primary navigation: Home, Blog, Resources, Gear, About. Provide Contact and legal links in the footer, plus a clear YouTube action.
- Use the selected prototype as the homepage reference. Translate its type scale, colors, spacing, rules, and toolbox treatment into shared styles used by the informational pages.
- Keep articles and gear at their existing public URLs. Reuse current content, metadata, images, and affiliate destinations; do not fabricate recommendations or video IDs.
- The adapted article reader provides reading progress, desktop chapters, mobile chapters, section links, and an enlarged-image dialog. Preserve these behaviors when styling articles.
- Resources is one page. Proposed initial entries are the False Color LUT Builder repository and its instructions, and the existing Resolve archive workflow guide. No standalone download files were found; no fake download controls or empty categories.
- About describes the creator and channel using confirmed facts. Contact uses existing verified email and social destinations without a sales inquiry form.
- Retire service, portfolio, and gallery public pages. Preserve their source content and media in Git while excluding them from the public build. Keep private gallery material private.
- Keep SEO metadata and sitemap generation, with brixon-seo validation at the end of the build. Review intentional route removals against the route baseline.
- Use native Astro and CSS for static content. React remains limited to interactions that need it. Keep the prototype available for design comparison during development.

## Testing Decisions

- Verify public behavior at the built-site seam: intended routes, navigation destinations, metadata, sitemap, and retired URL handling. Extend the existing assert-based article-reader check where necessary rather than introducing a new test framework.
- Run the production build with brixon-seo, TypeScript checks, and the article-reader check. SEO errors must be resolved; review warnings rather than suppressing them wholesale.
- Browser-check a representative homepage, article, resource page, and gear page at desktop and mobile widths. Check keyboard navigation, chapter targets, image dialog close/focus return, reduced motion, and horizontal overflow.
- Confirm that the production build contains the informational homepage, with no prototype switcher or service inquiry calls to action.

## Out of Scope

Sales funnels, pricing, booking, checkout, service lead generation, a platform migration, a new CMS, invented downloads, automatic YouTube ingestion, and publishing before review.

## Further Notes

Work stays on `codex/informational-site-revamp`. Preserve pre-existing uncommitted edits. The owner approved all recommendations and the four-slice plan on October 2, 2026.

Approved release choices:

- Services redirect to About. Portfolio pages redirect to matching personal-site project pages where verified; unmatched projects redirect to the YouTube channel. The portfolio index redirects to the personal site's portfolio section.
- Public gallery URLs redirect to the personal site's Galleries page. Private galleries retire without a public redirect; preserve their source media and privacy.
- Launch Resources with the two inventoried entries; add real downloads later.
- Use the proposed informational navigation and existing article/tool imagery, applying the selected editorial style consistently across pages.
- Validate at the built-site seam and in desktop/mobile browsers, including keyboard and reader behavior.
