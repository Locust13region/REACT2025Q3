import ErrorBoundary from '@/components/error-boundary';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router';
import Content from '@/pages/content';
import { Provider } from 'react-redux';
import createMockStore from '@/__mocks__/store';
import { useGetAllBooksQuery } from '@/redux/books-api';
import mockBooksList from '@/__mocks__/books-list';
import userEvent from '@testing-library/user-event';

vi.mock('@/redux/books-api', async () => {
  const actual = await vi.importActual('@/redux/books-api');
  return {
    ...actual,
    useGetAllBooksQuery: vi.fn(),
  };
});

describe('Content component', () => {
  test('should renders Loading while fetch books list', async () => {
    (useGetAllBooksQuery as Mock).mockReturnValue({
      isFetching: true,
    });

    render(
      <Provider store={createMockStore()}>
        <MemoryRouter initialEntries={['/books/1?search=']}>
          <Routes>
            <Route
              path="/books/:page"
              element={<Content generatedError={null} />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const heading = await screen.findByRole('heading', {
      name: /loading data/i,
    });
    expect(heading).toBeInTheDocument();
  });

  test('should renders fetched mock books list', async () => {
    (useGetAllBooksQuery as Mock).mockReturnValue({
      data: mockBooksList,
      isFetching: false,
      isSuccess: true,
    });

    render(
      <Provider store={createMockStore()}>
        <MemoryRouter initialEntries={['/books/1?search=']}>
          <Routes>
            <Route
              path="/books/:page"
              element={<Content generatedError={null}></Content>}
            ></Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const listItems = await screen.findAllByRole('listitem');
    const headerItem = listItems[0];
    const columnHeading = within(headerItem);
    expect(columnHeading.getByText('Author')).toBeInTheDocument();
    expect(columnHeading.getByText('Title')).toBeInTheDocument();

    const booksInList = await screen.findAllByText(/Dickens` book/);
    expect(booksInList).toHaveLength(2);
  });

  test('should renders fetch error', async () => {
    (useGetAllBooksQuery as Mock).mockReturnValue({
      error: new Error('mock error'),
      isError: true,
    });

    render(
      <Provider store={createMockStore()}>
        <MemoryRouter initialEntries={['/books/1?search=']}>
          <Routes>
            <Route
              path="/books/:page"
              element={<Content generatedError={null}></Content>}
            ></Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const mockError = await screen.findByText(/mock error/i);
    expect(mockError).toBeInTheDocument();
  });

  test('should add checked book to store', async () => {
    const user = userEvent.setup();
    (useGetAllBooksQuery as Mock).mockReturnValue({
      data: mockBooksList,
      isFetching: false,
      isSuccess: true,
    });

    render(
      <Provider store={createMockStore()}>
        <MemoryRouter initialEntries={['/books/1?search=']}>
          <Routes>
            <Route
              path="/books/:page"
              element={<Content generatedError={null}></Content>}
            ></Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const checkbox = screen.getAllByRole('checkbox', { name: '' });
    expect(checkbox[0]).toBeChecked();

    await user.click(checkbox[0]);
    expect(checkbox[0]).not.toBeChecked();
  });

  test('should renders ErrorBoundary error', async () => {
    render(
      <Provider store={createMockStore()}>
        <MemoryRouter initialEntries={['/books/1?search=']}>
          <ErrorBoundary>
            <Routes>
              <Route
                path="/books/:page"
                element={
                  <Content generatedError={new Error('mock error')}></Content>
                }
              ></Route>
            </Routes>
          </ErrorBoundary>
        </MemoryRouter>
      </Provider>
    );

    const mockError = await screen.findByText(/mock error/i);
    expect(mockError).toBeInTheDocument();
  });
});
