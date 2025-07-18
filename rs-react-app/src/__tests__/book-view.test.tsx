import BookView from '@/components/book-view';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Book-view component', () => {
  test('Book-view renders book author and description', () => {
    const mockBook = {
      id: 1,
      author: 'Dickens',
      title: 'Book description',
    };

    render(<BookView {...mockBook} />);
    const author = screen.getByText(mockBook.author);
    const title = screen.getByText(mockBook.title);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
