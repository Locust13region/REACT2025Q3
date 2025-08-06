import type { RootState } from '@/redux/store';

export const selected = (state: RootState) => state.selectedBooks;
export const search = (state: RootState) => state.searchBooks;
