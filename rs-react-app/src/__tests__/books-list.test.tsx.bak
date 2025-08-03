import BooksList from '@/components/books-list';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe.todo('Book-list component', () => {
  test('Book-list renders list header', () => {
    render(<BooksList books={[]} />);
    const listItems = screen.getAllByRole('listitem');
    const headerItem = listItems[0];

    const utils = within(headerItem);
    expect(utils.getByText('Author')).toBeInTheDocument();
    expect(utils.getByText('Title')).toBeInTheDocument();
  });

  test('Book-list renders list if prop exist', () => {
    const mockBook = {
      id: 1,
      author: 'Dickens',
      title: 'Book description',
    };
    render(<BooksList books={[mockBook]} />);
    const listItems = screen.getAllByRole('listitem');
    const headerItem = listItems[0];
    const columnHeading = within(headerItem);
    expect(columnHeading.getByText('Author')).toBeInTheDocument();
    expect(columnHeading.getByText('Title')).toBeInTheDocument();

    const author = screen.getByText(mockBook.author);
    const title = screen.getByText(mockBook.title);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Book-list renders list item with book author without description', () => {
    const mockBook = {
      id: 1,
      author: 'Dickens',
      title: undefined,
    };

    render(<BooksList books={[mockBook]} />);
    const author = screen.getByText(mockBook.author);
    const title = screen.getByText('no data available');
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('Book-list renders list item with book description without author', () => {
    const mockBook = {
      id: 1,
      author: undefined,
      title: 'Book description',
    };

    render(<BooksList books={[mockBook]} />);
    const author = screen.getByText('no data available');
    const title = screen.getByText(mockBook.title);
    expect(author).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });
});
