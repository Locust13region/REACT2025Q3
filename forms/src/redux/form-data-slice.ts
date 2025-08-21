import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Form, FormState } from '@/types/types';

const initialState: FormState = {
  controlled: {
    name: '',
    age: null,
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'Male',
    acceptTerms: false,
    picture: null,
    country: '',
  },
  uncontrolled: {
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: 'Male',
    acceptTerms: false,
    picture: null,
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
    setControlled: (state, action: PayloadAction<Form>) => {
      state.controlled = action.payload;
    },
    setUncontrolled: (state, action: PayloadAction<Form>) => {
      state.uncontrolled = action.payload;
    },
  },
});

export const { setControlled, setUncontrolled } = formsSlice.actions;

export default formsSlice.reducer;
