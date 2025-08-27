import { countriesDataSchema } from '@/types/types';
import getCountriesKeys from '@/utils/get-countries-keys';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const loadCo2Data = createAsyncThunk(
  'co2Data/loadData',
  async (_, { rejectWithValue }) => {
    const response = await fetch('./owid-co2-data.json');
    const json = await response.json();
    console.log(json);
    const parsedData = countriesDataSchema.safeParse(json);
    console.log(parsedData.error);
    if (parsedData.success) return { parsedData };
    // const countryKeys = getCountriesKeys(parsedData);
    return rejectWithValue(parsedData.error.message);
    // return { parsedData, countryKeys };
  }
);
