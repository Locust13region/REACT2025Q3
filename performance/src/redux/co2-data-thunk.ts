import { countrySchema } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCountryChunk } from './co2-slice';

export const loadCo2Data = createAsyncThunk(
  'co2Data/loadData',
  async (_, { dispatch, rejectWithValue }) => {
    const response = await fetch('./owid-co2-data.json');
    const json = await response.json();
    console.time('parsing');
    for (const [countryKey, rawCountry] of Object.entries(json)) {
      const parsedCountryChunk = countrySchema.safeParse(rawCountry);

      if (parsedCountryChunk.success) {
        dispatch(addCountryChunk({ [countryKey]: parsedCountryChunk.data }));
      } else {
        rejectWithValue(parsedCountryChunk.error.message);
      }
    }
    console.timeEnd('parsing');
    await new Promise((resolve) => setTimeout(resolve, 0));
    return;
  }
);
