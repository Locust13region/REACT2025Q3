import type { BooksListProps } from '@/types/types';
import { Component, type ReactNode } from 'react';
import BookView from './book-view';

export default class BooksList extends Component<BooksListProps> {
  render(): ReactNode {
    return (
      <>
        {this.props.books.map((book) => (
          <BookView key={book.id} {...book} />
        ))}
      </>
    );
  }
}
