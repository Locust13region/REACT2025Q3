import type { ReactNode } from 'react';
import { z } from 'zod';
import type { bookSchema, responseSchema } from './zod-schemas';
import type { useSearchParams } from 'react-router';

export type HeaderProps = {
  searchSubstring: string;
  setSearchParams: ReturnType<typeof useSearchParams>[1];
  setSearchSubstring: (value: string) => void;
  setGeneratedError: (value: Error | null) => void;
};

export type ContentProps = {
  searchSubstring: string;
  generatedError: Error | null;
};

export type FetchResult = z.infer<typeof responseSchema>;

export type BooksListProps = FetchResult & {
  setRequestUrl: (url: string) => void;
};

export type Book = z.infer<typeof bookSchema>;

export type ErrorBoundaryProps = {
  searchSubstring: string;
  children: ReactNode;
};

export type ErrorButtonProps = {
  setError: () => void;
};
