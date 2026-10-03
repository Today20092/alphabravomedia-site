---
title: Creator gear shop research
labels: [research]
status: complete
assignee: null
parent: map.md
blocked_by: []
---

Researched October 2, 2026. Scope: a curated affiliate gear page; purchases happen at external retailers.

## Decisions supported by primary sources

### Explain the commission before shopping

The FTC says the retailer relationship must be clearly and conspicuously disclosed. A label saying only "affiliate link" or a Buy button does not adequately explain the payment relationship; "paid link" next to a link can. Use plain language above the first product links: "I may earn a commission when you buy through links on this page." Keep it visible rather than putting it only in a footer, tooltip, or collapsed section. For a long catalog, repeat a compact disclosure beside buying actions. Placement is an implementation recommendation; FTC sufficiency depends on context. [FTC affiliate marketing FAQ](https://www.ftc.gov/business-guidance/resources/ftcs-endorsement-guides-what-people-are-asking#affiliate)

If Amazon links are used, also display its required statement prominently: "As an Amazon Associate I earn from qualifying purchases." [Amazon Operating Agreement, section 5](https://affiliate-program.amazon.com/help/operating/agreement)

### Sell the use case with truthful experience

Google recommends original experience, supporting evidence, benefits and drawbacks, important buying factors, and explanations of which products suit particular uses. A best-for claim should have firsthand supporting reasons. Applied here: each item needs an exact model, original image where available, its role in the setup, a useful selection reason, and a meaningful limitation when known. Do not manufacture experience, ratings, ownership status, or testing results. [Google review guidance](https://developers.google.com/search/docs/specialty/ecommerce/write-high-quality-reviews)

### Make external buying obvious

Recommendation: use a retailer-named action such as "View on Amazon", with product context accessible to screen readers. W3C requires link purpose to be determinable from its text or programmatically associated context; Amazon also forbids links that obscure the fact that they lead to Amazon. Use real anchors, preserve affiliate URLs, and apply `rel="sponsored"` to paid links, as Google prefers. [W3C link purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context), [Amazon Participation Requirements](https://affiliate-program.amazon.com/help/operating/policies), [Google outbound link qualification](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)

### Avoid manually maintained prices and ratings

Amazon permits product price and availability displays only through its served links or compliant Creators API/PA API data. Its rules include refresh-related timestamps and disclaimers; Amazon customer ratings/reviews also require approved API sourcing. For this static page, omit prices, stock claims, discounts, imported ratings, and urgency timers. Let the retailer show current terms. This is a simpler implementation recommendation based on Amazon's requirements, not a universal prohibition on prices from other retailers. [Amazon policies: sections 2(a), 2(t), and IP License](https://affiliate-program.amazon.com/help/operating/policies)

### Keep browsing usable without search

Google recommends navigable links to all content and explains that its crawler generally does not submit search boxes. Render the catalog and buying links in HTML; use categories and optional search as enhancements. Recommended page sequence: concise setup introduction and disclosure, a few task-based kit shortcuts, category navigation, then the complete catalog. Current gear, past gear, and alternatives must remain distinguishable; grouping existing products into kits must not imply an unverified budget or ownership claim. [Google ecommerce navigation guidance](https://developers.google.com/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure)

### Build for small screens and keyboard use

WCAG 2.2 AA target guidance sets a 24 by 24 CSS-pixel minimum with specified exceptions, including spacing. Aim for approximately 44-pixel primary controls as a practical design choice. Reflow should work at 320 CSS pixels without two-dimensional scrolling for ordinary page content. Preserve visible keyboard focus and meaningful control labels; avoid horizontal filter strips as the only way to reach a category. [W3C target size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), [W3C reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow), [W3C focus visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible)

## First release

Keep the existing verified product inventory and affiliate links. Add category browsing, concise existing usage descriptions, retailer-specific links, and clear disclosure. Skip cart, checkout, accounts, price integrations, and fabricated reviews. Confirm owner experience before publishing new personal endorsements or labeling older inventory as current.
