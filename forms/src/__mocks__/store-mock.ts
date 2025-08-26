import { configureStore } from '@reduxjs/toolkit';
import formsReducer from '@/redux/form-data-slice';
import countriesReducer from '@/redux/countries-slice';

export const createMockStore = () =>
  configureStore({
    reducer: {
      formsData: formsReducer,
      countries: countriesReducer,
    },
  });
