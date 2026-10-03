# 02: Carry the editorial design through the blog reader

**Working branch:** `codex/informational-site-revamp`

**Spec:** ../../../docs/wayfinder/site-revamp/build-spec.md

**What to build:** An editorial blog index and article experience that matches the homepage while preserving content, public URLs, and the adapted reader tools.

**Blocked by:** 01: Publish the informational homepage and navigation.

**Status:** complete

- [x] Blog index and articles use the approved typography, spacing, and palette.
- [x] Existing article URLs, content, metadata, and image references remain valid.
- [x] Progress, desktop chapters, mobile chapter disclosure, section links, and enlarged images work.
- [x] Image dialogs support keyboard dismissal and focus return; mobile pages do not overflow.
- [x] Build, type checks, and the existing runnable article-reader check pass.

## Verification

- Reused the existing adapted reader tools and brought the blog index and article presentation into the homepage's charcoal, cream, lime, and Geist treatment. Article content sources are unchanged.
- Production build passed with zero SEO errors and 45 reviewed warnings, consistent with ticket 1. TypeScript and both built-page checks passed. The separate YouTube portfolio inventory command exited successfully and reported newer videos, outside this ticket.
- Browser checks covered desktop and 390px mobile layouts, chapter navigation/progress, mobile disclosure by keyboard, section-link copying, image opening by keyboard, Escape dismissal/focus return, and reduced motion. No horizontal overflow. Production preview confirmed reader behavior and valid visible image references.
- Standards review found unused copied header integration in the reader. Removed it, and the reviewer confirmed resolution. Spec review found no missing or incorrect ticket requirements.
- Unrelated pre-existing edits remain outside the commit. No push or deployment.
