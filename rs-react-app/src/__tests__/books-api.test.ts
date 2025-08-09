import { describe, expect, test } from 'vitest';
import mockBooks from '@/__mocks__/books';
import mockBooksList from '@/__mocks__/books-list';
import { responseSchema } from '@/types/zod-schemas';

describe('books-api', () => {
  test('should correct parse valid object', () => {
    expect(responseSchema.parse(mockBooksList)).toEqual(mockBooksList);
  });
  test('should parse invalid object with error', () => {
    expect(() => responseSchema.parse(mockBooks)).toThrow();
  });
});
