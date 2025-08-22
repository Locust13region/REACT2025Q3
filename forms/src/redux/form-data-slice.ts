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
    picture: '',
    country: '',
  },
  highlightControlled: false,
  highlightUncontrolled: false,
};

export const formsSlice = createSlice({
  name: 'formsData',
  initialState,
  selectors: {
    selectControlled: (state) => state.controlled,
    selectUncontrolled: (state) => state.uncontrolled,
    selectHighlightControlled: (state) => state.highlightControlled,
    selectHighlightUncontrolled: (state) => state.highlightUncontrolled,
  },
  reducers: {
    setControlled: (state, action: PayloadAction<DataState>) => {
      state.controlled = action.payload;
      state.highlightControlled = true;
    },
    clearHighlightControlled: (state) => {
      state.highlightControlled = false;
    },
    setUncontrolled: (state, action: PayloadAction<DataState>) => {
      state.uncontrolled = action.payload;
      state.highlightUncontrolled = true;
    },
    clearHighlightUncontrolled: (state) => {
      state.highlightUncontrolled = false;
    },
  },
});

export const {
  setControlled,
  setUncontrolled,
  clearHighlightControlled,
  clearHighlightUncontrolled,
} = formsSlice.actions;

export default formsSlice.reducer;
