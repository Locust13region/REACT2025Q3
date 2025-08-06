import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const storageKey = 'rs-react-app';

const stored = localStorage.getItem(storageKey) ?? '';

const initialState = stored;

const searchSubstringSlice = createSlice({
  name: 'searchSubstring',
  initialState,
  reducers: {
    setSearch: (_, { payload }: PayloadAction<string>) => {
      localStorage.setItem(storageKey, payload ?? '');
      return payload;
    },
  },
});

export const { setSearch } = searchSubstringSlice.actions;

export default searchSubstringSlice.reducer;
