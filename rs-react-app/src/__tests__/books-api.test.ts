import { describe, expect, test } from 'vitest';
import mockBooks from '@/__mocks__/books';
import mockBooksList from '@/__mocks__/books-list';
import { responseSchema } from '@/types/zod-schemas';
import createMockStore from '@/__mocks__/store';
import { booksApi } from '@/redux/books-api';

describe('books-api', () => {
  const store = createMockStore();

  test('should correct parse valid object', () => {
    expect(responseSchema.parse(mockBooksList)).toEqual(mockBooksList);
  });

  test('should parse invalid object with error', () => {
    expect(() => responseSchema.parse(mockBooks)).toThrow();
  });

  test('responds with the books', async () => {
    const result = await store.dispatch(
      booksApi.endpoints.getAllBooks.initiate({
        searchSubstring: '',
        page: '1',
      })
    );
    expect(result.isSuccess).toBe(true);
  });

  test('responds with the books not found', async () => {
    const result = await store.dispatch(
      booksApi.endpoints.getAllBooks.initiate({
        searchSubstring: '',
        page: '0',
      })
    );
    expect(result.isError).toBe(true);
  });

  test('responds with the single book', async () => {
    const result = await store.dispatch(
      booksApi.endpoints.getSingleBook.initiate('1')
    );
    expect(result.isSuccess).toBe(true);
  });

  test('responds with the single book not found', async () => {
    const result = await store.dispatch(
      booksApi.endpoints.getSingleBook.initiate('0')
    );
    expect(result.isError).toBe(true);
  });
});
