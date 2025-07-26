import Book from '@/components/book';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Book component', () => {
  test('Book renders list item with book author and description', () => {
    const mockBook = {
      id: 1,
      author: 'Dickens',
      title: 'Book description',
      authors: [],
    };

    render(<Book {...mockBook} />);
    const author = screen.queryByText(mockBook.author);
    const title = screen.getByText(mockBook.title);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Book renders list item with book author without description', () => {
    const mockBook = {
      id: 1,
      author: 'Dickens',
      title: undefined,
      authors: [],
    };

    render(<Book {...mockBook} />);
    const author = screen.getByText(mockBook.author);
    const title = screen.getByText('no data available');
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Book renders list item with book description without author', () => {
    const mockBook = {
      id: 1,
      author: undefined,
      title: 'Book description',
      authors: [],
    };

    render(<Book {...mockBook} />);
    const author = screen.getByText('no data available');
    const title = screen.getByText(mockBook.title);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
