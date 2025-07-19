import BookView from '@/components/book-view';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Book-view component', () => {
  test('Book-view renders list item with book author and description', () => {
    const mockBook = {
      id: 1,
      author: 'Dickens',
      title: 'Book description',
    };

    render(<BookView {...mockBook} />);
    const author = screen.queryByText(mockBook.author);
    const title = screen.getByText(mockBook.title);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Book-view renders list item with book author without description', () => {
    const mockBook = {
      id: 1,
      author: 'Dickens',
      title: undefined,
    };

    render(<BookView {...mockBook} />);
    const author = screen.getByText(mockBook.author);
    const title = screen.getByText('no data available');
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Book-view renders list item with book description without author', () => {
    const mockBook = {
      id: 1,
      author: undefined,
      title: 'Book description',
    };

    render(<BookView {...mockBook} />);
    const author = screen.getByText('no data available');
    const title = screen.getByText(mockBook.title);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
