---
title: Decide what happens to existing sales pages
labels: [wayfinder:grilling]
status: closed
assignee: codex
parent: map.md
blocked_by: [channel-and-content.md]
---

## Question

Which existing pages become informational content, which remain as an archive of creative work, and which retire with redirects?

Recommended direction: preserve useful articles and genuine video work, replace sales navigation and calls to action, and redirect retired sales URLs to relevant informational destinations. Decide the destination for each route after the channel topics are established.

Repository inventory found a services index and five service offerings, a project inquiry contact page, homepage service and review sections, and sales metadata in site-config.ts. Every page template imports BaseLayout.astro, which owns the shared navigation and footer.

The content decision should also address gear product links, the public project/gallery archive, community and social links, and public contact information.

## Current discussion

Gear affiliate links are confirmed. The owner is being asked whether portfolio/gallery pages should be a secondary archive, primary navigation content, or retired, and whether Contact should become a simple creator contact page or footer-only links. No answer has been assumed.

## Resolution

The owner chose to retire portfolio and galleries from this site and replace the project inquiry form with a simple creator contact page. Gear affiliate links remain. Public pages will focus on YouTube, informational articles, resources, gear, About, and creator contact.

Retired URL destinations still need a migration decision before routes are removed. This ticket settles content scope, not redirect targets.
