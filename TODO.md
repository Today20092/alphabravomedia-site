# Alpha Bravo Media - TODO List

## Priority Fixes

- [x] **Fix Navigation on GitHub Pages** - Fixed by normalizing BASE_URL to always have a trailing slash in BaseLayout.astro.

## Features to Implement

### Search
- [ ] **Implement Pagefind for static search** - Add site-wide search functionality
  - Create a Search modal or dedicated search page
  - Index all collections (blog, portfolio, gear)
  - Add keyboard shortcut (Cmd/Ctrl + K) to open search

### Video Embeds
- [ ] **Optimize YouTube embeds** - Already using `@astro-community/astro-embed-youtube` but verify:
  - Lazy loading is working correctly
  - Thumbnail placeholders load before video
  - Performance is optimized on mobile

### Content Schema Flexibility
- [ ] **Make frontmatter less restrictive**
  - Gear: Change `category` from enum to `z.string()` so any category works
  - Portfolio: Consider making `category` flexible as well
  - Review all schemas and loosen restrictions where not strictly necessary

### Mobile Responsiveness
- [ ] **Audit mobile experience** - Ensure fully responsive for:
  - YouTube article pages (blog posts)
  - Video embeds scale properly
  - Navigation works on mobile (hamburger menu)
  - Touch targets are appropriately sized
  - Text is readable without zooming

---

## Recommendations (Future Enhancements)

### Content & Media
- [ ] **Add real images** - Replace placeholder gradients with actual thumbnails
  - Blog post thumbnails (YouTube video thumbnails can be auto-fetched)
  - Portfolio project thumbnails
  - Gear product images
- [ ] **Add image optimization** - Use Astro's built-in image optimization

### Pages
- [ ] **Create About page** - Personal bio, story, equipment list, services offered
- [ ] **Create 404 page** - Custom not-found page matching site design
- [ ] **Create Services/Hire page** - If offering videography services

### SEO & Discoverability
- [ ] **Add Open Graph meta tags** - For social sharing previews
- [ ] **Add Twitter Card meta tags** - For Twitter/X previews
- [ ] **Generate sitemap.xml** - Use `@astrojs/sitemap` integration
- [ ] **Add RSS feed** - For blog subscribers using `@astrojs/rss`
- [ ] **Add structured data (JSON-LD)** - For rich search results

### Navigation & UX
- [ ] **Add breadcrumbs** - For better navigation context on inner pages
- [ ] **Add "Back to top" button** - For long content pages
- [ ] **Add reading time estimates** - For blog posts
- [ ] **Add social sharing buttons** - On blog and portfolio pages
- [ ] **Add related posts section** - On blog pages (similar to portfolio)

### Performance
- [ ] **Add loading skeletons** - For content that loads dynamically
- [ ] **Lazy load images** - Below-the-fold images
- [ ] **Preload critical assets** - Fonts, hero images

### Analytics & Tracking
- [ ] **Add analytics** - Plausible, Fathom, or Google Analytics
- [ ] **Add link click tracking** - For affiliate links (gear)

### Contact & Engagement
- [ ] **Add contact form** - Using Formspree, Netlify Forms, or similar
- [ ] **Add newsletter signup** - Buttondown, ConvertKit, etc.
- [ ] **Add comments system** - Giscus (GitHub Discussions) for blog posts

### Accessibility
- [ ] **Audit accessibility** - Run Lighthouse accessibility audit
- [ ] **Add skip-to-content link** - For keyboard navigation
- [ ] **Ensure proper heading hierarchy** - h1 → h2 → h3 etc.
- [ ] **Add alt text system** - For all images

### Optional Features
- [ ] **Dark/Light mode toggle** - Currently dark-only
- [ ] **View transitions** - Astro View Transitions for smooth page navigation
- [ ] **Pinned/Featured content** - Ability to pin certain posts/projects
- [ ] **Tags/filtering for blog** - Filter posts by tag
- [ ] **Project case study template** - More detailed portfolio layout option

---

## Technical Debt

- [ ] **Remove unused Layout.astro** - Only BaseLayout is being used
- [ ] **Remove unused Welcome.astro component** - From initial Astro setup
- [ ] **Clean up unused assets** - astro.svg, background.svg from starter

---

## Notes

- Site is deployed at: https://today20092.github.io/alphabravomedia-site/
- GitHub repo: https://github.com/Today20092/alphabravomedia-site
- Using Astro 5 + Tailwind CSS v4
- Content managed via Astro Content Collections

---

*Last updated: Session with Claude Code*
