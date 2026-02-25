# Alpha Bravo Media Website

A cinematic, high-end portfolio website built with Astro 5, Tailwind CSS v4, and the Astro Content Layer.

**Live Site:** https://today20092.github.io/alphabravomedia-site/

---

## Table of Contents

- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Adding Content](#adding-content)
  - [Blog Posts](#blog-posts)
  - [Portfolio Projects](#portfolio-projects)
  - [Gear Items](#gear-items)
- [Site Configuration](#site-configuration)
- [Pages Overview](#pages-overview)
- [Styling](#styling)
- [Deployment](#deployment)
- [Commands](#commands)

---

## Project Structure

```
alphabravomedia-site/
├── public/                     # Static assets (favicon, images)
│   └── images/
│       ├── blog/              # Blog post thumbnails
│       ├── portfolio/         # Portfolio thumbnails
│       └── gear/              # Gear product images
│
├── src/
│   ├── content/               # CONTENT LIVES HERE (Markdown files)
│   │   ├── config.ts          # Content collection schemas
│   │   ├── blog/              # Blog posts (.md files)
│   │   ├── portfolio/         # Portfolio projects (.md files)
│   │   └── gear/              # Gear recommendations (.md files)
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro   # Main layout with nav + footer
│   │   └── Layout.astro       # Basic layout (unused)
│   │
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro    # Blog listing page
│   │   │   └── [...slug].astro # Individual blog post pages
│   │   ├── portfolio/
│   │   │   ├── index.astro    # Portfolio listing page
│   │   │   └── [...slug].astro # Individual portfolio pages
│   │   └── gear/
│   │       ├── index.astro    # Gear listing page
│   │       └── [...slug].astro # Individual gear pages
│   │
│   └── styles/
│       └── global.css         # Tailwind imports
│
├── .github/workflows/
│   └── deploy.yml             # GitHub Actions deployment
│
├── astro.config.mjs           # Astro configuration
├── package.json
└── tsconfig.json
```

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Adding Content

All content is managed through Markdown files in the `src/content/` directory. Each collection has its own folder and schema.

### Blog Posts

**Location:** `src/content/blog/`

**Use for:** YouTube video articles, tutorials, gear reviews, behind-the-scenes content.

**Create a new post:** Add a `.md` file (e.g., `my-new-video.md`)

#### Required Frontmatter

```yaml
---
title: "Your Video Title"
pubDate: 2024-03-15
description: "A brief description of the video content."
youtubeId: "dQw4w9WgXcQ"
tags: ["tutorial", "lighting", "beginner"]
---

Your markdown content goes here...

## Heading

Regular paragraph text.

- Bullet points
- Work great

**Bold text** and *italic text* are supported.
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | The post title |
| `pubDate` | date | Yes | Publication date (YYYY-MM-DD) |
| `description` | string | Yes | Short description for cards/SEO |
| `youtubeId` | string | Yes | YouTube video ID (the part after `v=`) |
| `tags` | string[] | No | Array of tags for categorization |

#### Example Blog Post

```markdown
---
title: "5 Lighting Mistakes Beginners Make"
pubDate: 2024-03-20
description: "Common lighting errors and how to fix them for better video quality."
youtubeId: "abc123xyz"
tags: ["tutorial", "lighting", "beginner"]
---

In this video, I break down the 5 most common lighting mistakes I see from beginners.

## Mistake #1: Flat Lighting

Flat lighting happens when your key light is directly in front of the subject...
```

---

### Portfolio Projects

**Location:** `src/content/portfolio/`

**Use for:** Client work, completed projects, case studies.

**Create a new project:** Add a `.md` file (e.g., `client-brand-film.md`)

#### Required Frontmatter

```yaml
---
title: "Project Title"
clientName: "Client Name or Company"
videoId: "dQw4w9WgXcQ"
category: "Brand Film"
---

Project description and case study content...
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Project title |
| `clientName` | string | Yes | Client name (or "Self-Initiated" for personal projects) |
| `videoId` | string | Yes | YouTube video ID (can be unlisted) |
| `category` | enum | Yes | One of: `Brand Film`, `Music Video`, `Documentary`, `Commercial`, `Event` |

#### Valid Categories

- `Brand Film` - Corporate/brand storytelling
- `Music Video` - Artist music videos
- `Documentary` - Documentary content
- `Commercial` - Advertisements
- `Event` - Event coverage

#### Example Portfolio Project

```markdown
---
title: "Acme Corp - Company Culture Film"
clientName: "Acme Corporation"
videoId: "xyz789abc"
category: "Brand Film"
---

Created a cinematic brand film showcasing Acme Corp's innovative workplace culture.

## The Brief

Acme needed a recruitment video that would attract top talent...

## Approach

We shot over three days across their campus...

## Results

The video achieved 100,000 views and helped increase job applications by 40%.
```

---

### Gear Items

**Location:** `src/content/gear/`

**Use for:** Equipment recommendations, affiliate products.

**Create a new gear item:** Add a `.md` file (e.g., `sony-a7iv.md`)

#### Required Frontmatter

```yaml
---
title: "Product Name"
amazonLink: "https://www.amazon.com/dp/XXXXXXXXXX"
imageUrl: "/images/gear/product-name.jpg"
category: "Camera"
---

Why you recommend this product...
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | Yes | Product name |
| `amazonLink` | string (URL) | Yes | Amazon affiliate link |
| `imageUrl` | string | Yes | Path to product image |
| `category` | enum | Yes | One of: `Camera`, `Lens`, `Audio`, `Lighting`, `Accessories`, `Software` |

#### Valid Categories

- `Camera` - Camera bodies
- `Lens` - Lenses and filters
- `Audio` - Microphones, recorders, audio gear
- `Lighting` - Lights, modifiers, grip
- `Accessories` - Tripods, gimbals, bags, etc.
- `Software` - Editing software, plugins, LUTs

#### Example Gear Item

```markdown
---
title: "Sony A7 IV Mirrorless Camera"
amazonLink: "https://www.amazon.com/dp/B09JZT6YK5"
imageUrl: "/images/gear/sony-a7iv.jpg"
category: "Camera"
---

The Sony A7 IV is my recommendation for creators who need a versatile hybrid camera.

## Why I Recommend It

- Excellent autofocus for video
- 10-bit 4:2:2 internal recording
- Great low-light performance

## Best For

Content creators who shoot both photo and video.
```

---

## Site Configuration

Edit the config at the top of `src/layouts/BaseLayout.astro`:

```javascript
const siteConfig = {
  // Brand
  siteName: 'Alpha Bravo Media',
  tagline: 'Cinema-grade videography for brands and creators.',

  // Contact
  email: 'contact-me@alphabravomedia.co',
  phone: '(555) 123-4567',
  phoneRaw: '+15551234567',
  elementUsername: '@alphabravo:matrix.org',

  // Social Links
  youtube: 'https://youtube.com/@alphabravomedia',
  instagram: 'https://instagram.com/alphabravomedia',
};
```

All contact info, social links, and branding throughout the site pull from this config.

---

## Pages Overview

### Homepage (`/`)

- **Hero Section:** Bold headline with gradient text, CTAs
- **Featured Work:** Embedded YouTube showreel with glow effect
- **Latest from Studio:** 3 recent portfolio + 3 recent blog posts

### Blog (`/blog`)

- Grid of all blog posts sorted by date (newest first)
- Each post shows title, description, date, and play button
- Individual posts embed the YouTube video + rendered markdown

### Portfolio (`/portfolio`)

- Grid of all portfolio projects
- Category filter buttons (All, Brand Film, Music Video, etc.)
- Individual projects show embedded video + case study content

### Gear (`/gear`)

- Organized by category (Camera, Lens, Audio, etc.)
- Each item links to detail page with Amazon button
- Affiliate disclosure included

### Contact (Footer)

- Email (clickable mailto link)
- Phone with Google Voice label
- Element/Matrix username with click-to-copy

---

## Styling

### Tailwind CSS v4

The site uses Tailwind CSS v4 with the Vite plugin. Styles are in:

- `src/styles/global.css` - Tailwind imports + typography plugin
- Component styles use Tailwind utility classes

### Typography

Markdown content uses the `@tailwindcss/typography` plugin with `prose prose-invert` classes for dark-themed styled content.

### Design System

- **Background:** `#0b0b0b`
- **Container:** `max-w-6xl`
- **Font:** Inter (Google Fonts)
- **Headings:** `tracking-tight` for modern typography
- **Cards:** Subtle borders, hover scale animations
- **Glassmorphism nav:** `backdrop-blur-xl` + `bg-white/5`

---

## Deployment

The site auto-deploys to GitHub Pages on push to `master`.

### Manual Deployment

1. Push to `master` branch
2. GitHub Actions builds the site
3. Deploys to https://today20092.github.io/alphabravomedia-site/

### Custom Domain (Optional)

1. Add a `CNAME` file to `public/` with your domain:
   ```
   alphabravomedia.com
   ```
2. Update `astro.config.mjs`:
   ```javascript
   site: 'https://alphabravomedia.com',
   // Remove the base option
   ```
3. Configure DNS with your registrar

---

## Commands

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Start dev server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview production build locally |

---

## Content Checklist

When adding new content:

- [ ] Create `.md` file in correct folder (`blog/`, `portfolio/`, or `gear/`)
- [ ] Add all required frontmatter fields
- [ ] Use correct category enum values
- [ ] Add images to `public/images/` if needed
- [ ] Test locally with `npm run dev`
- [ ] Commit and push to deploy

---

## Tech Stack

- **Framework:** [Astro 5](https://astro.build/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Content:** Astro Content Layer with Zod schemas
- **Video Embeds:** [@astro-community/astro-embed-youtube](https://github.com/astro-community/astro-embed)
- **Typography:** [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)
- **Hosting:** GitHub Pages

---

Built with Astro and Claude Code.
