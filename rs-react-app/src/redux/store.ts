import { configureStore } from '@reduxjs/toolkit';
import { booksApi } from './books-api';
import selectedBooksSlice from './books-slice';
import searchSubstringSlice from './search-slice';
import { setupListeners } from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    selectedBooks: selectedBooksSlice,
    searchBooks: searchSubstringSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(booksApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
