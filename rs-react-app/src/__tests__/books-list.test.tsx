import BooksList from '@/components/books-list';
import type { ItemViewProps } from '@/types/types';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Book-list component', () => {
  test('Book-list renders list header', () => {
    render(<BooksList books={[]} />);
    const listItems = screen.getAllByRole('listitem');
    const headerItem = listItems[0];

    const utils = within(headerItem);
    expect(utils.getByText('Author')).toBeInTheDocument();
    expect(utils.getByText('Title')).toBeInTheDocument();
  });
  test('Book-list renders list if prop exist', () => {
    const mockBook: ItemViewProps = {
      id: 1,
      author: 'Dickens',
      title: 'Book description',
    };
    render(<BooksList books={[mockBook]} />);
    const listItems = screen.getAllByRole('listitem');
    const headerItem = listItems[0];
    const utils = within(headerItem);
    expect(utils.getByText('Author')).toBeInTheDocument();
    expect(utils.getByText('Title')).toBeInTheDocument();

    const author = screen.getByText(mockBook.author);
    const title = screen.getByText(mockBook.title);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
