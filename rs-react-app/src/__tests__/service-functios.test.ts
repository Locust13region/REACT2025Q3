import { describe, expect, test } from 'vitest';
import mockBooks from '@/__mocks__/books';
import csvBuilder from '@/service/csv-builder';
import csvExpected from '@/__mocks__/csv-expected';
import errorParser from '@/service/error-parser';

describe('Service functions', () => {
  test('should make a csv raw', () => {
    expect(csvBuilder(mockBooks)).toBe(csvExpected);
  });

  test('should return serialized error message', () => {
    expect(errorParser(Error('test'))).toBe('test');
  });

  test('should return fetchBaseQueryError message', () => {
    expect(errorParser({ status: 500, data: '404' })).toBe('HTTP 500');
  });

  test('should return fetchBaseQueryError message', () => {
    expect(errorParser({ status: 404, data: { detail: 'not found' } })).toBe(
      'HTTP 404: not found'
    );
  });

  test('should return fetchBaseQueryError message', () => {
    expect(errorParser({ status: 'FETCH_ERROR', error: 'test' })).toBe('test');
  });

  test('should return fetchBaseQueryError message', () => {
    expect(errorParser({ status: 'CUSTOM_ERROR', error: 'test' })).toBe('test');
  });

  test('should return fetchBaseQueryError message', () => {
    expect(
      errorParser({
        status: 'PARSING_ERROR',
        originalStatus: 1,
        data: 'test',
        error: 'schema',
      })
    ).toBe('Parsing error: schema');
  });

  test('should return unexpected error message', () => {
    expect(errorParser({ message: 'Unexpected error' })).toBe(
      'Unexpected error'
    );
  });

  test.todo('should init download file', () => {});
});
