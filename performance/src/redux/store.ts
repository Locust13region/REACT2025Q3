import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './form-data-slice';
import countriesSlice from './countries-slice';

export const store = configureStore({
  reducer: {
    formsData: formsReducer,
    countries: countriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
