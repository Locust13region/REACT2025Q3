import { createSlice } from '@reduxjs/toolkit';

const initialState = ['Italy', 'Spain', 'Greece', 'Germany', 'France'];

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  selectors: {
    selectCountries: (state) => state,
  },
  reducers: {},
});

export const { selectCountries } = countriesSlice.selectors;

export default countriesSlice.reducer;
