import dataFetch from '@/api/api-request';
import Content from '@/pages/content';
import ErrorBoundary from '@/components/error-boundary';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, type Mock } from 'vitest';

describe.todo('Content component', () => {
  vi.mock('@/api/api-request', () => ({
    default: vi.fn(),
  }));
  test('Content mounted', async () => {
    render(<Content searchSubstring={''} generatedError={null} />);
    screen.debug();
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/loading/i);

    vi.mock('@/api/api-request', () => ({
      default: vi.fn(),
    }));
    expect(dataFetch as Mock).toBeCalled();
  });

  test('Renders fetched mock book', async () => {
    (dataFetch as Mock).mockResolvedValueOnce([
      { id: 1, authors: [{ name: 'Dickens' }], title: 'Dickens` book 1' },
      { id: 2, authors: [{ name: 'Dickens' }], title: 'Dickens` book 2' },
      { id: 3, authors: [{ name: 'Dickens' }], title: 'Dickens` book 3' },
    ]);

    render(<Content searchSubstring={''} generatedError={null} />);
    // const mockBooks = await screen.findAllByText(/Dickens` book/);
    const mockBook1 = await screen.findByText('Dickens` book 1');
    const mockBook2 = await screen.findByText('Dickens` book 2');
    const mockBook3 = await screen.findByText('Dickens` book 3');
    // expect(mockBooks.length).toEqual(3);
    expect(mockBook1).toBeInTheDocument();
    expect(mockBook2).toBeInTheDocument();
    expect(mockBook3).toBeInTheDocument();
  });

  test('Renders fetch error', async () => {
    (dataFetch as Mock).mockRejectedValue(new Error('mock Error'));

    render(
      <ErrorBoundary searchSubstring={''}>
        <Content searchSubstring={''} generatedError={null} />
      </ErrorBoundary>
    );
    const mockError = await screen.findByText('mock Error');
    expect(mockError).toBeInTheDocument();
  });
});
