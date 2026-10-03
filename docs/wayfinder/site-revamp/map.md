---
title: Make Alpha Bravo Media an informational home for YouTube
labels: [wayfinder:map]
status: open
---

## Destination

A clear brief for a complete interface revamp of Alpha Bravo Media as an informational site supporting the owner's YouTube channel. The site will no longer sell services.

## Notes

- Use the local Markdown tracker in this folder. Decision tickets are sibling files, with status, assignee, labels, and blocked_by in their frontmatter.
- Apply the requested gpt-taste and shadcn skills during implementation.
- Wayfinder currently covers planning. Implementation follows the resolved brief.
- Work on branch `codex/informational-site-revamp` until the revamp is ready. The owner authorized a separate branch; existing uncommitted changes were preserved when creating it.
- Keep the existing Astro, Tailwind, and shadcn foundation. Preserve existing uncommitted work.
- The primary visitor action is watching the channel, rather than requesting a quote or buying a service.
- Existing sales-oriented inspiration notes are historical and do not define the new purpose.
- The owner explicitly requested reusing the article reader from `C:/Users/User/Documents/tik-tok-live-landingpage`. Reading progress, chapters, section links, and the enlarged-image viewer were adapted on this branch. These implementation additions run alongside the planning map.
- The owner requested brixon-seo. It is installed last in the Astro integration list; existing metadata remains owned by the site layout. Astro was updated within version 6 to satisfy the validator's peer dependency.
- Keep Astro, Tailwind, and shadcn. Lumos was evaluated as an alternative, but no migration was requested or performed.

## Decisions so far

- [Define the channel identity and informational content](channel-and-content.md): Keep the confirmed YouTube channel, blog, guides, downloads, and gear recommendations with Amazon affiliate links.
- [Choose the visual direction for the channel](visual-direction.md): Editorial field notes typography and layout, with Creator workshop colors and toolbox interaction.
- [Decide what happens to existing sales pages](content-and-route-transition.md): Retire portfolio and galleries; replace the inquiry form with simple creator contact.
- [Choose destinations for retired URLs](retired-url-destinations.md): Targeted personal-site portfolio redirects, About for services, personal Galleries for public galleries, and no public redirects for private galleries.

## Build handoff

The owner approved the recommended release scope, navigation, existing imagery, consistent editorial styling, validation seams, and four implementation slices on October 2, 2026. See the [approved build spec](build-spec.md) and implementation tickets under `.scratch/informational-site-revamp/issues/`. The Resources ticket contains the approved initial inventory; its tracker closeout remains separate from the retired-URL decision resolved this session.

## Not yet specified

None requiring another owner decision before implementation. Use existing article/tool imagery and apply the selected editorial style consistently to the informational pages.

## Out of scope

- Sales funnels, pricing, quote requests, and service lead generation.
- A platform migration or a new content management system.
- Publishing changes before implementation and validation are complete.
