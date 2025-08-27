import type { Co2DataState, RawCountries } from '@/types/types';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loadCo2Data } from './co2-data-thunk';

export const initialState: Co2DataState = {
  countries: {},
  status: 'idle',
};

export const co2DataSlice = createSlice({
  name: 'co2Data',
  initialState,
  selectors: {},
  reducers: {
    addCountryChunk: (state, action: PayloadAction<RawCountries>) => {
      state.countries = { ...state.countries, ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(loadCo2Data.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loadCo2Data.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(loadCo2Data.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export const { addCountryChunk } = co2DataSlice.actions;

export default co2DataSlice.reducer;
