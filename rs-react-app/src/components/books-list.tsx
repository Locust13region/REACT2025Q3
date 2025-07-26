import { memo } from 'react';
import Book from '@/components/book';
import type { FetchResult } from '@/types/types';
import Pagination from './pagination';

const BooksList = memo(
  ({ count, next, previous, results: books }: FetchResult) => {
    return (
      <div className="books-list__wrapper">
        <ul className="books-list">
          <li className="books-list__header">
            <div className="books-list__title">Author</div>
            <div className="books-list__title">Title</div>
          </li>
          {books && books.map((book) => <Book key={book.id} {...book} />)}
        </ul>
        <Pagination {...{ count, next, previous }} />
      </div>
    );
  }
);
BooksList.displayName = 'BooksList';

export default BooksList;
