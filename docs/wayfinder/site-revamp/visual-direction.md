---
title: Choose the visual direction for the channel
labels: [wayfinder:prototype]
status: closed
assignee: codex
parent: map.md
blocked_by: []
---

## Question

Should the interface use cinematic editorial, a quiet light treatment, or a dark technical studio direction?

Recommended starting point: cinematic editorial with wide typography and real channel imagery. The owner's preference is pending. A prototype should follow the selected direction and channel identity.

Apply gpt-taste's design plan before UI code, adapt its action sections to watching YouTube, and support reduced motion and keyboard navigation. Use the existing shadcn components where appropriate.

## Owner's references

- https://theguardian.engineering/
- https://bejamas.com/
- Personal site: https://ayoubabed.xyz/
- https://react.gg/
- https://www.biggreenegg.co.uk/
- Additional examples will come later from https://astro.build/showcase/.

Guardian Engineering, Bejamas, and the Astro showcase were fetched. The personal site could not be loaded by the web tool. Visual inspection remains pending; text extraction alone does not establish typography, color, spacing, or motion.

The references are preferences, not a finalized design choice. Keep this ticket open for the additional examples and a concrete prototype.

## Prototype ready for feedback

Branch: `codex/informational-site-revamp`.

Run `npm run dev -- --port 4323`, then open `http://127.0.0.1:4323/?prototype=revamp&variant=A`.

The existing homepage renders the comparison in development only. Production retains the existing homepage pending a selected direction. Use the bottom arrows or the left/right keyboard arrows to compare:

- A, Editorial field notes: warm reading layout, split hero, article rows.
- B, Creator workshop: dark grid, tilted media, interactive resource accordion.
- C, Cinematic journal: full-width image hero, centered text, larger resource imagery.

Source: `src/components/RevampPrototype.tsx` and `src/styles/revamp-prototype.css`, mounted by `src/pages/index.astro`. Uses actual blog collection entries and the existing LUT example image. Gear and About links open the existing pages.

Rendered browser inspection covered all three variants, mobile A and C, switcher wraparound, working article URL construction, and button contrast. TypeScript passed. Visual decision remains open until the owner gives feedback; no winner has been assumed.

## Resolution

The owner selected Editorial field notes as the foundation, preferring its font and layout. Borrow the dark colors and selected toolbox behavior from Creator workshop. Cinematic journal is the least preferred option and will not be developed further.

The A prototype now keeps the editorial hero and article rows, uses the workshop charcoal, cream, and lime palette, and expands toolbox panels on desktop hover or keyboard focus. The toolbox remains a grid on smaller screens. Final imagery and copy can evolve during implementation.

## Additional reference notes

The owner added React.gg and Big Green Egg as design references. Both pages were fetched; rendered visual inspection is still pending.

React.gg pairs learning content with distinctive illustrations, interactive examples, and video previews. Explore a similar connection between Alpha Bravo Media's guides, downloads, and videos.

Big Green Egg is a reference for presenting equipment alongside supporting editorial content. Evaluate its rendered imagery and content navigation before choosing specific visual patterns.

These references expand the design options. They do not change the confirmed informational purpose or introduce course sales, a shopping cart, or service selling.
