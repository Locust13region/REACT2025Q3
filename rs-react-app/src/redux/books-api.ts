import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApiUrl } from './base-url';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl }),
  endpoints: (build) => ({
    getBooks: build.query({
      query: () => 'books',
    }),
  }),
});
