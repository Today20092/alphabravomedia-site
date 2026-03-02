import { defineCollection, z } from 'astro:content';

// Blog collection - YouTube tutorials, reviews, etc.
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    youtubeId: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

// Portfolio collection - Client work
const portfolio = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    clientName: z.string(),
    videoId: z.string().optional(), // Unlisted YouTube video ID
    image: z.string().optional(),
    category: z.string(),
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
