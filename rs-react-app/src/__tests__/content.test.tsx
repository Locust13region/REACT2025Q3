import dataFetch from '@/api/api-request';
import Content from '@/pages/content';
import ErrorBoundary from '@/components/error-boundary';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi, type Mock } from 'vitest';

describe('Content component', () => {
  test('Content mounted', async () => {
    render(<Content searchSubstring={''} />);
    screen.debug();
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/loading/i);

    vi.mock('@/api/api-request', () => ({
      default: vi.fn(),
    }));
    expect(dataFetch as Mock).toBeCalled();

    const errorButton = await screen.findByRole('button', { name: 'Error' });
    expect(errorButton).toBeInTheDocument();
  });

  test('Error button action', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary searchSubstring={''}>
        <Content searchSubstring={''} />
      </ErrorBoundary>
    );
    const errorButton = await screen.findByRole('button', { name: 'Error' });
    await user.click(errorButton);
    expect(screen.getByText('Test ErrorBoundary')).toBeInTheDocument();
  });

  test('Renders fetched mock book', async () => {
    vi.mock('@/api/api-request', () => ({
      default: vi.fn(),
    }));

    (dataFetch as Mock).mockResolvedValueOnce([
      { id: 1, author: 'Dickens', title: 'Dickens` book 1' },
      { id: 2, author: 'Dickens', title: 'Dickens` book 2' },
      { id: 3, author: 'Dickens', title: 'Dickens` book 3' },
    ]);

    render(<Content searchSubstring={''} />);
    const mockBooks = await screen.findAllByText(/Dickens` book/);
    const mockBook1 = await screen.findByText('Dickens` book 1');
    const mockBook2 = await screen.findByText('Dickens` book 2');
    const mockBook3 = await screen.findByText('Dickens` book 3');
    expect(mockBooks.length).toEqual(3);
    expect(mockBook1).toBeInTheDocument();
    expect(mockBook2).toBeInTheDocument();
    expect(mockBook3).toBeInTheDocument();
  });

  test('Renders fetch error', async () => {
    vi.mock('@/api/api-request', () => ({
      default: vi.fn(),
    }));

    (dataFetch as Mock).mockRejectedValue(new Error('mock Error'));

    render(
      <ErrorBoundary searchSubstring={''}>
        <Content searchSubstring={''} />
      </ErrorBoundary>
    );
    const mockError = await screen.findByText('mock Error');
    expect(mockError).toBeInTheDocument();
  });
});
