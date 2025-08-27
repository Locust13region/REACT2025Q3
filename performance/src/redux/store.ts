import { configureStore } from '@reduxjs/toolkit';
import co2DataSlice from './co2-slice';

export const store = configureStore({
  reducer: {
    co2data: co2DataSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true, // обязательно включаем DevTools вручную
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
