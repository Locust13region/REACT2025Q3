import { submitUncontrolledThunk } from '@/redux/uncontrolled-thunk';
import { validateAllFields } from './validator';
import toBase64String from '@/utils/picture-to-base64';
import type { Dispatch, FormEvent } from 'react';
import type { Form } from '@/types/types';
import type { AppDispatch } from '@/redux/store';

export const handleSubmit = async (
  e: FormEvent<HTMLFormElement>,
  dispatch: AppDispatch,
  setErrors: Dispatch<Partial<Record<keyof Form, string>>>
) => {
  e.preventDefault();
  const form = e.currentTarget;
  const formData = new FormData(form);
  const raw = Object.fromEntries(formData);
  const data = {
    ...raw,
    age: Number(raw.age),
    acceptTerms: Boolean(raw.acceptTerms),
  };
  const isFormValid = validateAllFields(data, setErrors);

  if (isFormValid) {
    if (!data.picture) return;
    const pictureBase64 = await toBase64String(data.picture);
    const submitData = {
      ...data,
      picture: pictureBase64,
    };
    dispatch(submitUncontrolledThunk(submitData));
    form.reset();
    setErrors({});
  }
};
