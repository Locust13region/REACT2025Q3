import type { BooksListProps } from '@/types/types';
import { Component, type ReactNode } from 'react';
import BookView from './book-view';

export default class BooksList extends Component<BooksListProps> {
  render(): ReactNode {
    const { books } = this.props;
    return (
      <ul className="books-list">
        <li className="books-list__header">
          <div className="books-list__title">Author</div>
          <div className="books-list__title">Title</div>
        </li>
        {books && books.map((book) => <BookView key={book.id} {...book} />)}
      </ul>
    );
  }
}
