# 03: Publish Resources and the gear toolbox

**Working branch:** `codex/informational-site-revamp`

**Spec:** ../../../docs/wayfinder/site-revamp/build-spec.md

**What to build:** One Resources page for useful guides, tools, and available downloads, plus a matching gear index/detail experience with clear affiliate disclosure.

**Blocked by:** 01: Publish the informational homepage and navigation.

**Status:** complete

- [x] Resources links the False Color LUT Builder repository/instructions and existing Resolve archive guide.
- [x] Links distinguish tool repositories from guides and direct downloads; no invented download files or empty categories.
- [x] Gear index/detail pages use the approved editorial styles and preserve existing routes and affiliate destinations.
- [x] Affiliate disclosure remains visible near recommendations.
- [x] Toolbox panels work with keyboard focus and adapt to mobile.
- [x] Build/type checks pass and resource/gear destinations are verified.

## Verification

- Added the built-page check `node scripts/check-resources-gear.mjs`. It failed on the missing repository link before implementation and passes after implementation. It checks the two guide destinations, repository link, all 15 gear routes, preserved affiliate destinations, and disclosure.
- Production build and TypeScript checks passed. Existing informational-home and article-reader checks passed. Brixon SEO reported zero errors and 45 warnings, unchanged from the earlier tickets.
- Browser checks covered desktop and 390px mobile Resources, gear index, and camera detail. Toolbox keyboard focus expands the panel with a visible outline; mobile panels stack without horizontal overflow. Reduced motion disables panel transitions. Camera imagery loads and gear uses Geist typography.
- Verified the live LUT repository and its setup instructions. Gear content sources and unrelated uncommitted changes remain preserved. No push or deployment.

## Standards review

No actionable findings in the scoped files. Native Astro/CSS, existing collections, keyboard focus, reduced motion, and the small built-site check satisfy the documented standards. No baseline code smell warrants refactoring.

## Spec review

No findings. Resources exposes the repository and both guides without invented downloads. Gear preserves routes, content, and affiliate destinations with nearby disclosure and matching editorial styling.

Standards: 0 findings. Spec: 0 findings.
