import BookView from '@/components/book-view';
import type { ItemViewProps } from '@/types/types';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Book-view component', () => {
  test('Book-view renders list item with book author and description', () => {
    const mockBook: ItemViewProps = {
      id: 1,
      author: 'Dickens',
      title: 'Book description',
    };

    render(<BookView {...mockBook} />);
    const listItem = screen.getByRole('listitem');
    const author = screen.getByText(mockBook.author);
    const title = screen.getByText(mockBook.title);
    expect(listItem);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
