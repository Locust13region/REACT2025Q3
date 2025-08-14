import {
  fetchBaseQueryErrorSchema,
  serializedErrorSchema,
} from '@/types/zod-schemas';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { SerializedError } from '@reduxjs/toolkit/react';

export default function errorParser(
  errorRaw: FetchBaseQueryError | SerializedError
) {
  const serialized = serializedErrorSchema.safeParse(errorRaw);
  if (serialized.success) {
    return serialized.data.message;
  }
  const fetchBaseQueryError = fetchBaseQueryErrorSchema.safeParse(errorRaw);
  if (fetchBaseQueryError.success) {
    const err = fetchBaseQueryError.data;

    if (err.status === 'FETCH_ERROR' || err.status === 'CUSTOM_ERROR') {
      return err.error;
    }

    if (err.status === 'PARSING_ERROR') {
      return `Parsing error: ${err.error}`;
    }

    if (typeof err.status === 'number') {
      if (typeof err.data === 'object' && err.data && 'detail' in err.data) {
        return `HTTP ${err.status}: ${err.data.detail}`;
      }
      return `HTTP ${err.status}`;
    }
  }
  console.log('Unexpected error', errorRaw);
  return 'Unexpected error';
}
