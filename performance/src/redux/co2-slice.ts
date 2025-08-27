import type { Co2DataState } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';
import { loadCo2Data } from './co2-data-thunk';

export const initialState: Co2DataState = {
  co2Data: {
    country: {
      iso_code: null,
      data: [],
    },
  },
  countries: [],
  loading: false,
};

export const co2DataSlice = createSlice({
  name: 'co2Data',
  initialState,
  selectors: {
    selectCo2Data: (state) => state.co2Data,
    selectCountries: (state) => state.countries,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadCo2Data.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loadCo2Data.fulfilled, (state, { payload }) => {
      state.co2Data = payload.parsedData;
      state.countries = payload.countryKeys;
      state.loading = false;
    });
    builder.addCase(loadCo2Data.rejected, (state, action) => {
      state.loading = false;
      console.log(action.payload);
    });
  },
});

export default co2DataSlice.reducer;
