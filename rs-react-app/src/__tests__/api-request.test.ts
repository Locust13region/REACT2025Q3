vi.mock('@/types/zod-schemas', () => ({
  responseSchema: {
    safeParse: vi.fn(),
  },
}));
import { describe, expect, test, vi, type Mock } from 'vitest';
import dataFetch from '@/api/api-request';
import { responseSchema } from '@/types/zod-schemas';

global.fetch = vi.fn();

describe('Api response', () => {
  test('Success response', async () => {
    const mockResponse = {
      results: [
        {
          id: 1,
          authors: [{ name: 'Dickens' }],
          title: 'Dickens book',
        },
      ],
    };

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => mockResponse,
    });

    (responseSchema.safeParse as Mock).mockReturnValue({
      success: true,
      data: mockResponse,
    });

    const mappedResponse = [
      {
        id: 1,
        author: 'Dickens',
        title: 'Dickens book',
      },
    ];

    expect(await dataFetch()).toEqual(mappedResponse);
  });

  test('Response type incorrect', async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => ({}),
    });

    (responseSchema.safeParse as Mock).mockReturnValue({
      success: false,
      data: {},
    });

    await expect(dataFetch()).rejects.toThrow('Incorrect server response.');
  });

  test('Response is empty', async () => {
    const mockResponse = {
      results: [],
    };

    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => mockResponse,
    });

    (responseSchema.safeParse as Mock).mockReturnValue({
      success: true,
      data: mockResponse,
    });

    await expect(dataFetch()).rejects.toThrow(`Book(s) not found!`);
  });

  test('Response !ok', async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      json: () => ({}),
    });

    await expect(dataFetch()).rejects.toThrow(/HTTP error! Status:/);
  });

  test('Network error', async () => {
    (fetch as Mock).mockRejectedValue(new Error('Network error'));

    await expect(dataFetch()).rejects.toThrow('Network error');
  });
});
