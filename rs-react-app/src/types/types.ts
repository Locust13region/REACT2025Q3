import type { ReactNode } from 'react';
import { z } from 'zod';
import type { bookSchema, mappedBook, responseSchema } from './zod-schemas';

export type HeaderProps = {
  searchSubstring: string;
  setSearchSubstring: (value: string) => void;
  setGeneratedError: (value: Error | null) => void;
};

export type ContentProps = {
  searchSubstring: string;
  generatedError: Error | null;
};

export type FetchResult = z.infer<typeof responseSchema>;

export type Book = z.infer<typeof bookSchema>;

export type ErrorBoundaryProps = {
  searchSubstring: string;
  children: ReactNode;
};

export type ItemViewProps = MappedBook;

export type MappedBook = z.infer<typeof mappedBook>;

export type ErrorButtonProps = {
  setError: () => void;
};
