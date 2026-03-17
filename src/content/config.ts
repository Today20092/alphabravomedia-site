import { defineCollection, z, reference } from 'astro:content';

// Blog collection - YouTube tutorials, reviews, etc.
const blog = defineCollection({
  type: 'content',
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
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    clientName: z.string(),
    videoId: z.string().optional(), // Unlisted YouTube video ID
    facebookUrl: z.string().url().optional(), // Facebook video URL
    image: image().optional(),
    gallery: z.array(image()).optional(),
    category: z.string(),
    gearUsed: z.array(reference('gear')).optional(),
    order: z.number().default(999),
  }),
});

// Gear collection - Equipment recommendations
const gear = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    amazonLink: z.string().url(),
    imageUrl: z.string(),
    category: z.string(),
  }),
});
// Services collection - Pricing and offerings
const services = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(999),
    portfolioLink: z.string().optional(),
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
  type: 'content',
  schema: z.object({
    title: z.string(),
  }),
});

// Galleries collection - Client photo event galleries
const galleries = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    // Layout options:
    //   square  — uniform square crop grid (default, good for headshots)
    //   natural — grid preserving each photo's true aspect ratio
    //   masonry — Pinterest-style columns, best for mixed event photography
    galleryLayout: z.enum(['square', 'natural', 'masonry']).default('square'),
    password: z.string().optional(),
  }),
});

export const collections = { blog, portfolio, gear, services, legal, galleries };
