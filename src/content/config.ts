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

export const collections = { blog, portfolio, gear, services, legal };
