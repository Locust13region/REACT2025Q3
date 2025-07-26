import type { FC } from 'react';
import BookView from './book-view';
import type { FetchResult } from '@/types/types';
import Pagination from './pagination';

const BooksList: FC<FetchResult> = ({
  count,
  next,
  previous,
  results: books,
}) => {
  return (
    <div className="books-list__wrapper">
      <ul className="books-list">
        <li className="books-list__header">
          <div className="books-list__title">Author</div>
          <div className="books-list__title">Title</div>
        </li>
        {books && books.map((book) => <BookView key={book.id} {...book} />)}
      </ul>
      <Pagination {...{ count, next, previous }} />
    </div>
  );
};
export default BooksList;
