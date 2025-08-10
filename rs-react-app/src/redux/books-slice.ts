import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BookState, BookType } from '@/types/types';

const initialState: BookState = [];

const selectedBooksSlice = createSlice({
  name: 'selectedBooks',
  initialState,
  reducers: {
    toggleBook: (state, action: PayloadAction<BookType>) => {
      const toggledBook = action.payload;
      const bookExist = state.some((book) => book.id === toggledBook.id);

      if (bookExist) {
        return state.filter((book) => book.id !== toggledBook.id);
      } else {
        return [...state, toggledBook];
      }
    },
    unSelectAllBooks: () => {
      return [];
    },
  },
});

export const { toggleBook, unSelectAllBooks } = selectedBooksSlice.actions;

export default selectedBooksSlice.reducer;
