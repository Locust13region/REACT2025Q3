import type { ReactNode } from 'react';
import { z } from 'zod';
import type { mappedBook, mappedBooks } from './zod-schemas';

export type HeaderProps = {
  searchSubstring: string;
  setSearchSubstring: (value: string) => void;
};

export type ContentProps = {
  searchSubstring: string;
  setErrorInfo: (value: string) => void;
};

export type ContentState = {
  loading: boolean;
  fetchResult: z.infer<typeof mappedBooks> | null;
  fetchError: Error | null;
};

export type ErrorBoundaryProps = {
  searchSubstring: string;
  children: ReactNode;
};

export type BooksListProps = {
  books: z.infer<typeof mappedBooks>;
};

export type ItemViewProps = MappedBook;

export type MappedBook = z.infer<typeof mappedBook>;

export type ErrorButtonProps = {
  setError: () => void;
};
