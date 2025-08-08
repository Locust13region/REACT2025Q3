import { MemoryRouter, Route, Routes } from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { useGetSingleBookQuery } from '@/redux/books-api';
import BookDescription from '@/components/book-description';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import createMockStore from '@/__mocks__/store';

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
    screen.debug();
    const heading = await screen.findByRole('heading', {
      name: /loading data/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('should renders fetched mock books', async () => {
    const user = userEvent.setup();
    const mockedUseApi = useApi as ReturnType<typeof vi.fn>;
    mockedUseApi.mockReturnValue({
      loading: false,
      fetchResult: {
        results: [
          {
            id: 1,
            authors: [{ name: 'description author' }],
            title: 'description title',
            summaries: ['description summaries'],
          },
        ],
      },
      fetchError: null,
      setRequestUrl: vi.fn(),
      setFetchError: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={['/books/1/1?search=']}>
        <Routes>
          <Route path="/books/:page/:bookId" element={<BookDescription />} />
        </Routes>
      </MemoryRouter>
    );
    expect(useApi as Mock).toBeCalled();

    const summaries = await screen.findByText('description summaries');
    expect(summaries).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /x/i });
    await user.click(backButton);
  });

  test('should renders fetched mock books without book description', async () => {
    const user = userEvent.setup();
    const mockedUseApi = useApi as ReturnType<typeof vi.fn>;
    mockedUseApi.mockReturnValue({
      loading: false,
      fetchResult: {
        results: [
          {
            id: 1,
            authors: [{ name: 'description author' }],
            title: 'description title',
            summaries: [],
          },
        ],
      },
      fetchError: null,
      setRequestUrl: vi.fn(),
      setFetchError: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={['/books/1/1?search=']}>
        <Routes>
          <Route path="/books/:page/:bookId" element={<BookDescription />} />
        </Routes>
      </MemoryRouter>
    );
    expect(useApi as Mock).toBeCalled();

    const summaries = await screen.findByText('no data available');
    expect(summaries).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /x/i });
    await user.click(backButton);
  });

  test('should renders fetch error', async () => {
    const mockedUseApi = useApi as ReturnType<typeof vi.fn>;
    mockedUseApi.mockReturnValue({
      fetchError: new Error('Mock Error'),
      setRequestUrl: vi.fn(),
      setFetchError: vi.fn(),
    });
    render(
      <MemoryRouter initialEntries={['/books/1/1?search=']}>
        <Routes>
          <Route path="/books/:page/:bookId" element={<BookDescription />} />
        </Routes>
      </MemoryRouter>
    );
    const mockError = await screen.findByText(/mock error/i);
    expect(mockError).toBeInTheDocument();
  });
});
