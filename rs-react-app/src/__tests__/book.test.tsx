import createMockStore from '@/__mocks__/store';
import Book from '@/components/book';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router';
import { beforeEach, describe, expect, test } from 'vitest';

describe('Book component', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore();
  });
  test('should renders book with author and description', () => {
    const mockBook = {
      id: 1,
      authors: [
        {
          name: 'Dickens',
        },
      ],
      title: 'Book description',
      summaries: [],
    };
    render(
      <MemoryRouter initialEntries={['/books/1']}>
        <Provider store={store}>
          <Routes>
            <Route
              path="/books/:page"
              element={<Book book={mockBook} searchSubstring={'Dickens'} />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    const author = screen.queryByText(mockBook.authors[0].name);
    const title = screen.getByText(mockBook.title);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('should renders book without title', () => {
    const mockBook = {
      id: 1,
      authors: [
        {
          name: 'Dickens',
        },
      ],
      title: undefined,
      summaries: [],
    };
    render(
      <MemoryRouter initialEntries={['/books/1']}>
        <Provider store={store}>
          <Routes>
            <Route
              path="/books/:page"
              element={<Book book={mockBook} searchSubstring={'Dickens'} />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    const author = screen.getByText(mockBook.authors[0].name);
    const title = screen.getByText('no data available');
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('should renders book without  author', () => {
    const mockBook = {
      id: 1,
      authors: [],
      title: 'Book description',
      summaries: [],
      searchSubstring: 'Dickens',
    };

    render(
      <MemoryRouter initialEntries={['/books/1']}>
        <Provider store={store}>
          <Routes>
            <Route
              path="/books/:page"
              element={<Book book={mockBook} searchSubstring={'Dickens'} />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    const author = screen.getByText('no data available');
    const title = screen.getByText(mockBook.title);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('should add checked book to store', async () => {
    const user = userEvent.setup();
    const mockBook = {
      id: 1,
      authors: [
        {
          name: 'Dickens',
        },
      ],
      title: 'Book description',
      summaries: [],
    };
    render(
      <MemoryRouter initialEntries={['/books/1']}>
        <Provider store={store}>
          <Routes>
            <Route
              path="/books/:page"
              element={<Book book={mockBook} searchSubstring={'Dickens'} />}
            />
          </Routes>
        </Provider>
      </MemoryRouter>
    );
    const checkbox = screen.getByRole('checkbox', { name: '' });
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });
});
