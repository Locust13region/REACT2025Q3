import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { DataState, FormsState } from '@/types/types';

const initialState: FormsState = {
  controlled: {
    name: 'Andy',
    age: 12,
    email: '12@qw.qw',
    password: 'Qweasd90-',
    confirmPassword: 'Qweasd90-',
    gender: 'Male',
    acceptTerms: true,
    pictureName: 'hz-hz',
    picture: '',
    country: 'Italy',
  },
  uncontrolled: {
    name: '',
    age: null,
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'Male',
    acceptTerms: false,
    pictureName: '',
    picture: '',
    country: '',
  },
};

export const formsSlice = createSlice({
  name: 'formsData',
  initialState,
  selectors: {
    selectControlled: (state) => state.controlled,
    selectUncontrolled: (state) => state.uncontrolled,
  },
  reducers: {
    setControlled: (state, action: PayloadAction<DataState>) => {
      state.controlled = action.payload;
    },
    setUncontrolled: (state, action: PayloadAction<DataState>) => {
      state.uncontrolled = action.payload;
    },
  },
});

export const { setControlled, setUncontrolled } = formsSlice.actions;

export default formsSlice.reducer;
