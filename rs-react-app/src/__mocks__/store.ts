import { configureStore } from '@reduxjs/toolkit';
import selectedBooks from '@/store/books-slice';
import mockBooks from './books';

const mockStore = configureStore({
  reducer: {
    books: selectedBooks,
  },
  preloadedState: {
    books: mockBooks,
  },
});

export default mockStore;
