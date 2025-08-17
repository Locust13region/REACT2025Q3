import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseApiUrl } from './base-url';
import type { BookType, FetchResult } from '../types/types';
import { bookSchema, responseSchema } from '../types/zod-schemas';

export const booksApi = createApi({
  reducerPath: 'booksApi',
  tagTypes: ['Books', 'Book'],
  baseQuery: fetchBaseQuery({ baseUrl: baseApiUrl }),
  refetchOnReconnect: true,
  endpoints: (build) => ({
    getAllBooks: build.query<
      FetchResult,
      {
        searchSubstring: string;
        page: string;
      }
    >({
      query: ({ searchSubstring, page }) => ({
        url: '/books',
        params: {
          search: searchSubstring,
          page: page,
        },
      }),
      transformResponse: (response: FetchResult) => {
        if (!response.results.length) {
          throw new Error('not found');
        }
        return response;
      },
      responseSchema: responseSchema,
      providesTags: (result) =>
        result?.results
          ? [
              ...result.results.map(({ id }: { id: number }) => ({
                type: 'Book' as const,
                id,
              })),
              { type: 'Books', id: 'LIST' },
            ]
          : [{ type: 'Books', id: 'LIST' }],
    }),

    getSingleBook: build.query<BookType, string>({
      query: (bookId) => ({
        url: '/books',
        params: {
          ids: bookId,
        },
      }),
      transformResponse: (response: FetchResult) => {
        if (!response.results.length) {
          throw new Error('not found');
        }
        return response.results[0];
      },
      responseSchema: bookSchema,
      providesTags: (result) =>
        result
          ? [{ type: 'Book', id: result.id }]
          : [{ type: 'Books', id: 'LIST' }],
    }),
  }),
});
export const { useGetAllBooksQuery, useGetSingleBookQuery } = booksApi;
