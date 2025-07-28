// import dataFetch from '@/api/api-request';
import Content from '@/pages/content';
import ErrorBoundary from '@/components/error-boundary';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { MemoryRouter } from 'react-router';

const mockUseApi = {};

vi.mock('@/hooks/use-api', () => ({
  default: () => mockUseApi,
}));

// (setRequestUrl as Mock).mockReturnValue(mockSetRequestUrl);

describe.todo('Content component', () => {
  test('should renders fetched mock books', async () => {
    const mockUseApi = {
      loading: false,
      fetchResult: {
        results: [
          { id: 1, authors: [{ name: 'Dickens' }], title: 'Dickens` book 1' },
          { id: 2, authors: [{ name: 'Dickens' }], title: 'Dickens` book 2' },
          { id: 3, authors: [{ name: 'Dickens' }], title: 'Dickens` book 3' },
        ],
      },
      fetchError: null,
      setRequestUrl: vi.fn(),
      setFetchError: vi.fn(),
    };

    render(
      <MemoryRouter>
        <Content searchSubstring={''} generatedError={null} />
      </MemoryRouter>
    );
    screen.debug();
    expect(mockUseApi.setRequestUrl as Mock).toBeCalled();

    const heading = screen.getByText('Author');
    expect(heading).toBeInTheDocument();

    const mockBooks = screen.getAllByText(/Dickens` book/);
    expect(mockBooks.length).toEqual(3);
  });

  test('Renders fetch error', async () => {
    render(
      <ErrorBoundary searchSubstring={''}>
        <MemoryRouter>
          <Content
            searchSubstring={''}
            generatedError={new Error('Mock Error')}
          />
        </MemoryRouter>
      </ErrorBoundary>
    );
    const mockError = await screen.findByText('Mock Error');
    expect(mockError).toBeInTheDocument();
  });
});
