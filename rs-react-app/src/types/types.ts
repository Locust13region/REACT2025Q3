import type { ReactNode } from 'react';
import { z } from 'zod';
import type { bookSchema, responseSchema } from './zod-schemas';
import type { useSearchParams } from 'react-router';

export type HeaderProps = {
  searchSubstring: string;
  setSearchSubstring: (value: string) => void;
  setGeneratedError: (value: Error | null) => void;
};

export type ContentProps = {
  searchSubstring: string;
  generatedError: Error | null;
};

export type BooksListProps = FetchResult & {
  setSearchParams: ReturnType<typeof useSearchParams>[1];
};

export type BookProps = { book: BookType; searchSubstring: string };

export type FetchResult = z.infer<typeof responseSchema>;

export type PaginationProps = Pick<FetchResult, 'count' | 'next' | 'previous'>;

export type BookType = z.infer<typeof bookSchema>;

export type BookState = BookType[];

export type ErrorBoundaryProps = {
  searchSubstring: string;
  children: ReactNode;
};

export type ErrorButtonProps = {
  setError: () => void;
};

export type OutletContext = {
  searchSubstring: string;
  page: string;
};
