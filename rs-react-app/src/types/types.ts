import type { ReactNode } from 'react';
import { z } from 'zod';
import type { mappedBook } from './zod-schemas';

export type HeaderProps = {
  searchSubstring: string;
  setSearchSubstring: (value: string) => void;
};

export type ContentProps = {
  searchSubstring: string;
  setErrorInfo: (value: string) => void;
};

export type ErrorBoundaryProps = {
  //   hasError: boolean;
  children: ReactNode;
  //   fallback: Element;
};

export type BooksListProps = {
  books: MappedBook[];
};

export type ItemViewProps = MappedBook;

export type MappedBook = z.infer<typeof mappedBook>;
