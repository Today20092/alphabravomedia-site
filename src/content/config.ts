import { defineCollection, z, reference } from 'astro:content';

// Blog collection - YouTube tutorials, reviews, etc.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    youtubeId: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

// Portfolio collection - Client work
const portfolio = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    clientName: z.string(),
    videoId: z.string().optional(), // Unlisted YouTube video ID
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

export const collections = { blog, portfolio, gear };
