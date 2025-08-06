import { configureStore } from '@reduxjs/toolkit';
import selectedBooks from '@/redux/books-slice';
import mockBooks from './books';

const createMockStore = () =>
  configureStore({
    reducer: {
      books: selectedBooks,
    },
    preloadedState: {
      books: mockBooks,
    },
  });

export default createMockStore;
