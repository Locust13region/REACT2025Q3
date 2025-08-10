import type { ReactNode } from 'react';
import { z } from 'zod';
import { type bookSchema, type responseSchema } from './zod-schemas';

export type HeaderProps = {
  setGeneratedError: (value: Error | null) => void;
};

export type ContentProps = {
  generatedError: Error | null;
};

export type BookProps = { book: BookType };

export type FetchResult = z.infer<typeof responseSchema>;

export type PaginationProps = Pick<FetchResult, 'count' | 'next' | 'previous'>;

export type BookType = z.infer<typeof bookSchema>;

export type BookState = BookType[];

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorButtonProps = {
  setError: () => void;
};

export type OutletContext = {
  searchSubstring: string;
  page: string;
};
