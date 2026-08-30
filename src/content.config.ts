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
    images: z.array(z.string()).min(1).optional(),
    imageAlts: z.array(z.string()).min(1).optional(),
    externalUrl: z.string().url().optional(),
  }).refine((entry) => {
    const hasSingleImage = Boolean(entry.image && entry.imageAlt);
    const hasImageSet = Boolean(entry.images && entry.imageAlts && entry.images.length === entry.imageAlts.length);
    return entry.category !== 'paper' || Boolean(entry.externalUrl && (hasSingleImage || hasImageSet));
  }, {
    message: 'Paper highlights require an image, alt text, and external URL',
  }),
});

export const collections = { news };
