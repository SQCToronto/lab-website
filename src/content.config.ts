import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/data/news' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['paper', 'move', 'group', 'award', 'people', 'lab']),
    summary: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    externalUrl: z.string().url().optional(),
  }).refine((entry) => entry.category !== 'paper' || Boolean(entry.image && entry.imageAlt && entry.externalUrl), {
    message: 'Paper highlights require image, imageAlt, and externalUrl',
  }),
});

export const collections = { news };
