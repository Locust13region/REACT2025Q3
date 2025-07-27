import { z } from 'zod';

export const bookSchema = z.object({
  id: z.number(),
  title: z.string().optional(),
  authors: z.array(
    z.object({
      name: z.string(),
    })
  ),
  summaries: z.array(z.string()),
});

export const responseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(bookSchema),
});
