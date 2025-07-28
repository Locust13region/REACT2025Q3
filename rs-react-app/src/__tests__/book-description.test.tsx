import { MemoryRouter, Route, Routes } from 'react-router';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, type Mock } from 'vitest';
import useApi from '@/hooks/use-api';
import BookDescription from '@/components/book-description';
import Content from '@/pages/content';
import userEvent from '@testing-library/user-event';

vi.mock('@/hooks/use-api', () => ({
  default: vi.fn(),
}));

describe('BookDescription component', () => {
  test('should renders Loading before fetch book description', async () => {
    const mockedUseApi = useApi as ReturnType<typeof vi.fn>;
    mockedUseApi.mockReturnValue({
      loading: true,
      setRequestUrl: vi.fn(),
      setFetchError: vi.fn(),
    });

    render(
      <MemoryRouter initialEntries={['/books/1/1?search=']}>
        <Routes>
          <Route
            path="/books/:page"
            element={<Content searchSubstring={''} generatedError={null} />}
          >
            <Route path=":bookId" element={<BookDescription />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
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
          <Route
            path="/books/:page"
            element={<Content searchSubstring={''} generatedError={null} />}
          >
            <Route path=":bookId" element={<BookDescription />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );
    expect(useApi as Mock).toBeCalled();

    const summaries = await screen.findByText('description summaries');
    expect(summaries).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /x/i });
    await user.click(backButton);
  });
});
