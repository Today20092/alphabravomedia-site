import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Blog collection - YouTube tutorials, reviews, etc.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    youtubeId: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: image().optional(),
  }),
});

// Portfolio collection - Client work
const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/portfolio' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    clientName: z.string(),
    videoId: z.string().optional(), // Unlisted YouTube video ID
    facebookUrl: z.string().url().optional(), // Facebook video URL
    channelUrl: z.string().url().optional(),
    playlistUrl: z.string().url().optional(),
    image: image().optional(),
    gallery: z.array(image()).optional(),
    category: z.string(),
    outcome: z.string().optional(),
    proofPoints: z.array(z.string()).default([]),
    episodeLinks: z.array(z.object({
      title: z.string(),
      videoId: z.string(),
      url: z.string().url().optional(),
    })).default([]),
    services: z.array(z.string()).default([]),
    gearUsed: z.array(reference('gear')).optional(),
    order: z.number().default(999),
  }),
});

// Gear collection - Equipment recommendations
const gear = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/gear' }),
  schema: z.object({
    title: z.string(),
    amazonLink: z.string().url(),
    imageUrl: z.string(),
    category: z.string(),
    specs: z.string().optional(),
  }),
});

// Services collection - Pricing and offerings
const services = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/services' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(999),
    icon: z.string().optional(),
    category: z.string().optional(),
    heroImage: image().optional(),
    featuredWork: z.string().optional(),
    gallery: z.array(z.object({
      src: image(),
      alt: z.string(),
      caption: z.string().optional(),
    })).default([]),
    relatedWork: z.array(z.string()).default([]),
    portfolioLink: z.string().optional(),
    faq: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).default([]),
    tiers: z.array(z.object({
      discriminant: z.literal('tier'),
      value: z.object({
        name: z.string(),
        price: z.string(),
        bestFor: z.string(),
        isPopular: z.boolean().default(false),
        includes: z.array(z.string()),
      })
    })).default([]),
  }),
});

// Legal collection - Terms of Service, Privacy Policy, etc.
const legal = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
  }),
});

// Galleries collection - Client photo event galleries
const galleries = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/galleries' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    // Layout options:
    //   square - uniform square crop grid (default, good for headshots)
    //   natural - grid preserving each photo's true aspect ratio
    //   masonry - Pinterest-style columns, best for mixed event photography
    galleryLayout: z.enum(['square', 'natural', 'masonry']).default('square'),
    password: z.string().optional(),
    remoteBase: z.string().optional(),
  }),
});

export const collections = { blog, portfolio, gear, services, legal, galleries };
