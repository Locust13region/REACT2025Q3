import type { DataState } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit/react';
import type { AppDispatch, RootState } from './store';
import { clearHighlightUncontrolled, setUncontrolled } from './co2-slice';
import { delay } from '@/utils/delay';

export const submitUncontrolledThunk = createAsyncThunk<
  undefined,
  DataState,
  { dispatch: AppDispatch; state: RootState }
>('forms/submitUncontrolled', async (data, { dispatch }) => {
  dispatch(setUncontrolled(data));

  await delay(2000);

  dispatch(clearHighlightUncontrolled());
  return undefined;
});
