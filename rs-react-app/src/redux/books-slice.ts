import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { BookType } from '@/types/types';

type SelectedBookId = number;
type SelectedBook = BookType;

const initialState: Record<SelectedBookId, SelectedBook | undefined> = {};

const selectedBooksSlice = createSlice({
  name: 'selectedBooks',
  initialState,
  reducers: {
    toggleBook: (state, action: PayloadAction<BookType>) => {
      const toggledBook = action.payload;
      const id = toggledBook.id;
      const bookExist = id in state;

      if (bookExist) {
        const rest = Object.fromEntries(
          Object.entries(state).filter(([key]) => key !== String(id))
        );
        return rest;
      } else {
        return { ...state, [id]: toggledBook };
      }
    },
    unSelectAllBooks: () => {
      return {};
    },
  },
});

export const { toggleBook, unSelectAllBooks } = selectedBooksSlice.actions;

export default selectedBooksSlice.reducer;
