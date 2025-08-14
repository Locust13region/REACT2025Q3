import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { localStorageKey } from 'service/local-storage-key';

const searchSubstringSlice = createSlice({
  name: 'searchSubstring',
  initialState: '',
  reducers: {
    setSearch: (_, { payload }: PayloadAction<string>) => {
      localStorage.setItem(localStorageKey, payload ?? '');
      return payload;
    },
  },
});

export const { setSearch } = searchSubstringSlice.actions;

export default searchSubstringSlice.reducer;
