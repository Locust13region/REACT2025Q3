import type { DataState } from '@/types/types';
import { createAsyncThunk } from '@reduxjs/toolkit/react';
import type { AppDispatch, RootState } from './store';
import { clearHighlightUncontrolled, setUncontrolled } from './form-data-slice';
import { delay } from '@/utils/delay';

export const submitUncontrolledThunk = createAsyncThunk<
  undefined,
  DataState,
  { dispatch: AppDispatch; state: RootState }
>('forms/submitUncontrolled', async (data, { dispatch }) => {
  dispatch(setUncontrolled(data));

  await delay(800);

  dispatch(clearHighlightUncontrolled());
  return undefined;
});
