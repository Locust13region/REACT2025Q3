import type { DataState } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit/react';
import type { AppDispatch, RootState } from './store';
import { clearHighlightControlled, setControlled } from './co2-slice';
import { delay } from '@/utils/delay';

export const submitControlledThunk = createAsyncThunk<
  undefined,
  DataState,
  { dispatch: AppDispatch; state: RootState }
>('forms/submitControlled', async (data, { dispatch }) => {
  dispatch(setControlled(data));

  await delay(2000);

  dispatch(clearHighlightControlled());
  return undefined;
});
