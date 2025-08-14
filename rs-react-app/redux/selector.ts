import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from './store';

export const selected = (state: RootState, bookId?: number) => {
  if (bookId) {
    return state.selectedBooks[bookId];
  }
  return state.selectedBooks;
};

export const selectedAll = createSelector(selected, (selectedBooks) =>
  Object.values(selectedBooks)
);

export const search = (state: RootState) => state.searchBooks;
