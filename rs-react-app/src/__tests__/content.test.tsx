import ErrorBoundary from '@/components/error-boundary';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { MemoryRouter } from 'react-router';
import useApi from '@/hooks/use-api';
import Content from '@/pages/content';

vi.mock('@/hooks/use-api', () => ({
  default: vi.fn(),
}));

describe('Content component', () => {
  test('should renders Loading before fetch books', async () => {
    const mockedUseApi = useApi as ReturnType<typeof vi.fn>;
    mockedUseApi.mockReturnValue({
      loading: true,
      setRequestUrl: vi.fn(),
      setFetchError: vi.fn(),
    });

    render(
      <MemoryRouter>
        <Content searchSubstring={''} generatedError={null} />
      </MemoryRouter>
    );
    const heading = await screen.findByText(/loading/i);
    expect(heading).toBeInTheDocument();
  });

  test('should renders fetched mock books', async () => {
    const mockedUseApi = useApi as ReturnType<typeof vi.fn>;
    mockedUseApi.mockReturnValue({
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
    });

    render(
      <MemoryRouter>
        <Content searchSubstring={''} generatedError={null} />
      </MemoryRouter>
    );
    expect(useApi as Mock).toBeCalled();

    const heading = await screen.findByText('Author');
    expect(heading).toBeInTheDocument();

    const mockBooks = await screen.findAllByText(/Dickens` book/);
    expect(mockBooks).toHaveLength(3);
  });

  test('should renders fetch error', async () => {
    const mockedUseApi = useApi as ReturnType<typeof vi.fn>;
    mockedUseApi.mockReturnValue({
      fetchError: new Error('Mock Error'),
    });
    render(
      <ErrorBoundary searchSubstring={''}>
        <MemoryRouter>
          <Content searchSubstring={''} generatedError={null} />
        </MemoryRouter>
      </ErrorBoundary>
    );
    const mockError = await screen.findByText('Mock Error');
    expect(mockError).toBeInTheDocument();
  });
});
