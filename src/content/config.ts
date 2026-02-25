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
    videoId: z.string(), // Unlisted YouTube video ID
    category: z.enum(['Brand Film', 'Music Video', 'Documentary', 'Commercial', 'Event']),
  }),
});

// Gear collection - Equipment recommendations
const gear = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    amazonLink: z.string().url(),
    imageUrl: z.string(),
    category: z.enum(['Camera', 'Lens', 'Audio', 'Lighting', 'Accessories', 'Software']),
  }),
});

export const collections = { blog, portfolio, gear };
