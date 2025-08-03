import { configureStore } from '@reduxjs/toolkit';
import selectedBooks from '@/store/books-slice';

export const store = configureStore({
  reducer: {
    books: selectedBooks,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
