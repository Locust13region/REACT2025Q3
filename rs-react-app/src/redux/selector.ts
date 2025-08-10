import type { RootState } from '@/redux/store';

export const selected = (bookId: number) => (state: RootState) =>
  state.selectedBooks[bookId];
export const selectedAll = (state: RootState) => state.selectedBooks;
export const search = (state: RootState) => state.searchBooks;
