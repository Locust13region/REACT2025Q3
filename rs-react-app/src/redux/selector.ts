import type { RootState } from '@/redux/store';
import { createSelector } from '@reduxjs/toolkit';

export const selected = (state: RootState, bookId?: number) => {
  if (bookId) {
    return state.selectedBooks[bookId];
  }
  return state.selectedBooks;
};
// export const selected = (bookId: number) => (state: RootState) =>
//   state.selectedBooks[bookId];
export const selectedAll = createSelector(selected, (selectedBooks) =>
  Object.values(selectedBooks)
);

export const search = (state: RootState) => state.searchBooks;
