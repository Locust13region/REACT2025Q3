import { z } from 'zod';

export const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  authors: z.array(
    z.object({
      name: z.string(),
    })
  ),
});

export const responseSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(bookSchema),
});

export const mappedBook = z.object({
  id: z.number(),
  author: z.string().optional(),
  title: z.string().optional(),
});

export const mappedBooks = z.array(mappedBook).nullable();
