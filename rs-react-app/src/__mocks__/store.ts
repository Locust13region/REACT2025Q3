import { configureStore } from '@reduxjs/toolkit';
import { booksApi } from '@/redux/books-api';
import selectedBooksSlice from '@/redux/books-slice';
import searchSubstringSlice from '@/redux/search-slice';

const createMockStore = () =>
  configureStore({
    reducer: {
      [booksApi.reducerPath]: booksApi.reducer,
      selectedBooks: selectedBooksSlice,
      searchBooks: searchSubstringSlice,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(booksApi.middleware),
    preloadedState: {},
  });

export default createMockStore;
