import { configureStore } from '@reduxjs/toolkit';
import selectedBooks from '@/store/books-slice';

const mockStore = configureStore({
  reducer: {
    books: selectedBooks,
  },
  preloadedState: {
    books: [],
  },
});

export default mockStore;
