import { MemoryRouter, Route, Routes } from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { useGetSingleBookQuery } from '@/redux/books-api';
import BookDescription from '@/components/book-description';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import createMockStore from '@/__mocks__/store';
import mockBooks from '@/__mocks__/books';

vi.mock('@/redux/books-api', async () => {
  const actual = await vi.importActual('@/redux/books-api');
  return {
    ...actual,
    useGetSingleBookQuery: vi.fn(),
  };
});

describe('BookDescription component', () => {
  test('should renders Loading while fetch book description', async () => {
    (useGetSingleBookQuery as Mock).mockReturnValue({
      data: undefined,
      error: undefined,
      isFetching: true,
      isError: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createMockStore()}>
        <MemoryRouter initialEntries={['/books/1/1?search=']}>
          <Routes>
            <Route path="/books/:page/:bookId" element={<BookDescription />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const heading = await screen.findByRole('heading', {
      name: /loading data/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('should renders fetched mock books', async () => {
    const user = userEvent.setup();

    const refetchFn = vi.fn();

    (useGetSingleBookQuery as Mock).mockReturnValue({
      data: mockBooks[0],
      error: undefined,
      isFetching: false,
      isError: false,
      refetch: refetchFn,
    });

    render(
      <Provider store={createMockStore()}>
        <MemoryRouter initialEntries={['/books/1/1?search=']}>
          <Routes>
            <Route path="/books/:page/:bookId" element={<BookDescription />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const summaries = await screen.findByText('Book 1 description');
    expect(summaries).toBeInTheDocument();

    const refreshButton = screen.getByRole('button', { name: '⟳' });
    await user.click(refreshButton);
    expect(refetchFn).toBeCalled();

    const closeButton = screen.getByRole('button', { name: /x/i });
    await user.click(closeButton);
    expect(closeButton).not.toBeInTheDocument();
  });

  test('should renders fetch error', async () => {
    (useGetSingleBookQuery as Mock).mockReturnValue({
      data: undefined,
      error: new Error('mock error'),
      isFetching: false,
      isError: true,
      refetch: vi.fn(),
    });

    render(
      <Provider store={createMockStore()}>
        <MemoryRouter initialEntries={['/books/1/1?search=']}>
          <Routes>
            <Route path="/books/:page/:bookId" element={<BookDescription />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const mockError = await screen.findByText(/mock error/i);
    expect(mockError).toBeInTheDocument();
  });
});
