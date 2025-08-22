import type { DataState, Form } from '@/types/types';
import type { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import toBase64String from './picture-to-base64';
import type { AppDispatch } from '@/redux/store';

export default async function submitHandler(
  data: Form,
  actionCreator: ActionCreatorWithPayload<DataState>,
  dispatch: AppDispatch
) {
  try {
    if (!data.picture) return;
    const pictureBase64 = await toBase64String(data.picture);
    dispatch(
      actionCreator({
        ...data,
        pictureName: data.picture.name,
        picture: pictureBase64,
      })
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error in base64 coder ', error.message);
    }
    console.log('Error in base64 coder', error);
  }
}
