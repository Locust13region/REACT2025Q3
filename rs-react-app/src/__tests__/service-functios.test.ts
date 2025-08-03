import { describe, expect, test } from 'vitest';
import mockBooks from '@/__mocks__/books';
import csvBuilder from '@/service/csv-builder';
import csvExpected from '@/__mocks__/csv-expected';

describe('Service functions', () => {
  test('should make a csv raw', () => {
    expect(csvBuilder(mockBooks)).toBe(csvExpected);
  });

  test('should init download file', () => {});
});
