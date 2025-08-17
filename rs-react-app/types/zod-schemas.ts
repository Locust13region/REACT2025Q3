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

export const serializedErrorSchema = z
  .object({
    name: z.string().optional(),
    message: z.string().optional(),
    stack: z.string().optional(),
    code: z.string().optional(),
  })
  .strict();

export const fetchBaseQueryErrorSchema = z.union([
  z.object({
    status: z.number(),
    data: z.unknown(),
  }),
  z.object({
    status: z.literal('FETCH_ERROR'),
    data: z.undefined().optional(),
    error: z.string(),
  }),
  z.object({
    status: z.literal('PARSING_ERROR'),
    originalStatus: z.number(),
    data: z.string(),
    error: z.string(),
  }),
  z.object({
    status: z.literal('CUSTOM_ERROR'),
    data: z.unknown().optional(),
    error: z.string(),
  }),
]);
