import type { RootState } from '@/store/store';

// Other code such as selectors can use the imported `RootState` type
export const selected = (state: RootState) => state.books;
