import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { useNavigate, useParams } from 'react-router';
import userEvent from '@testing-library/user-event';
import Pagination from '@/components/pagination';

const mockNavigate = vi.fn();

vi.mock('react-router', () => ({
  useNavigate: vi.fn(),
  useParams: vi.fn(),
}));

(useNavigate as Mock).mockReturnValue(mockNavigate);
(useParams as Mock).mockReturnValue({ page: '1' });

describe('Pagination component', () => {
  test('should renders component', () => {
    const { page } = useParams();
    render(
      <Pagination
        {...{
          count: 10,
          next: '?page=1&search=Dickens',
          previous: '?page=3&search=Charles',
        }}
      />
    );

    expect(screen.getByText(`Page ${page} of ${page}`)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '<' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '>' })).toBeInTheDocument();
  });

  test('should navigate by clicking previous button', async () => {
    const user = userEvent.setup();

    render(
      <Pagination
        {...{
          count: 10,
          next: 'http://example.com/books?page=3&search=Dickens',
          previous: 'http://example.com/books?page=1&search=Charles',
        }}
      />
    );

    const previousButton = screen.getByRole('button', { name: '<' });
    await user.click(previousButton);
    console.log('navigate called with:', mockNavigate);
    expect(mockNavigate).toHaveBeenCalledWith('/books/1?search=Charles');

    const nextButton = screen.getByRole('button', { name: '>' });
    await user.click(nextButton);
    expect(mockNavigate).toHaveBeenCalledWith('/books/3?search=Dickens');
  });
});
