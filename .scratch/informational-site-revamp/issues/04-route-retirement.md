# 04: Retire sales routes and verify the complete site

**Working branch:** `codex/informational-site-revamp`

**Spec:** ../../../docs/wayfinder/site-revamp/build-spec.md

**What to build:** Retire public services, portfolio, and galleries using the approved redirect policy, preserve source content/media, and leave a validated informational site ready for owner review.

**Blocked by:** 01: Publish the informational homepage and navigation; 02: Carry the editorial design through the blog reader; 03: Publish Resources and the gear toolbox.

**Status:** complete

- [x] Service URLs redirect to About; portfolio projects redirect to verified matching personal pages, or the confirmed channel when unmatched.
- [x] Portfolio index redirects to the personal portfolio section; public galleries redirect to the personal Galleries page.
- [x] Private galleries retire without public redirects or public exposure of their media.
- [x] Retired pages are excluded from the build/sitemap while source content/media remain preserved.
- [x] Redirects have no loops or chains; intended destination URLs are verified.
- [x] Route baseline reflects reviewed additions/removals; brixon-seo reports no errors.
- [x] Production build, type checks, reader check, and representative desktop/mobile/keyboard checks pass.
- [x] Review the branch against the approved spec and preserve unrelated edits. Do not deploy or push as part of this ticket.

## Verification

- Archived route templates and disabled retired content loaders. Source content and media remain in Git, while retired pages and private gallery material are absent from the public build.
- Cloudflare has 42 permanent redirect rules covering both slash variants of 21 public routes. Personal destinations returned HTTP 200 directly. The unmatched-project fallback uses the confirmed channel's canonical www URL to avoid its host redirect.
- Added a noindex 404 page to prevent Cloudflare's SPA fallback for retired private and unknown URLs. The private gallery returned HTTP 404 in local production preview without a redirect or media disclosure.
- Reviewed the route baseline: 21 public sales/archive routes removed, Resources added, and 27 indexable informational routes retained. The 404 utility page is outside the sitemap and baseline.
- Production build, TypeScript, and all four built-site checks passed. Brixon SEO reported zero errors and 23 existing metadata-length warnings.
- Desktop/mobile checks covered homepage, Resources, article reader, gear, and the 404. Keyboard chapters, image enlargement, Escape dismissal/focus return, and reduced motion passed. No horizontal overflow found.
- Independent standards and spec reviews found no actionable issues. See ../reviews/04-route-retirement.md. Unrelated edits remain uncommitted. No push or deployment.
