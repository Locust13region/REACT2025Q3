import type { BooksListProps } from '@/types/types';
import { Component, type ReactNode } from 'react';
import BookView from './book-view';

export default class BooksList extends Component<BooksListProps> {
  render(): ReactNode {
    const { books } = this.props;
    return (
      <div className="content_books-list">
        {books && books.map((book) => <BookView key={book.id} {...book} />)}
      </div>
    );
  }
}
