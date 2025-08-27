import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './co2-slice';
import countriesSlice from './countries-slice';

export const store = configureStore({
  reducer: {
    formsData: formsReducer,
    countries: countriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
