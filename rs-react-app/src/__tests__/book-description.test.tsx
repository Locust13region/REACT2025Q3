import { MemoryRouter, Route, Routes } from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import BookDescription from '@/components/book-description';

describe('BookDescription component', () => {
  test('render Loading', () => {
    render(
      <MemoryRouter initialEntries={['/books/1/1']}>
        <Routes>
          <Route path="/books/:page/:bookId" element={<BookDescription />} />
        </Routes>
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test.todo('render Error', async () => {
    vi.mock('@/hooks/useApi', async () => ({
      default: () => ({
        loading: false,
        fetchError: { message: 'Error' },
        fetchResult: null,
        setRequestUrl: vi.fn(),
      }),
    }));
    render(
      <MemoryRouter initialEntries={['/books/1/963?search=']}>
        <Routes>
          <Route path="/books/:page/:bookId" element={<BookDescription />} />
        </Routes>
      </MemoryRouter>
    );
    const mockError = await screen.findByText(/error'/i);
    screen.debug();
    expect(mockError).toBeInTheDocument();
  });
});
