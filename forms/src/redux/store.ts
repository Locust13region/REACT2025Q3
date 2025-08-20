import { configureStore } from '@reduxjs/toolkit';
import formsReducer from './form-data-slice';

export const store = configureStore({
  reducer: {
    formsData: formsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
