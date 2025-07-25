import type { FC } from 'react';
import BookView from './book-view';
import type { BooksListProps } from '@/types/types';
import Pagination from './pagination';

const BooksList: FC<BooksListProps> = ({
  count,
  next,
  previous,
  results: books,
  setRequestUrl,
}) => {
  return (
    <>
      <ul className="books-list">
        <li className="books-list__header">
          <div className="books-list__title">Author</div>
          <div className="books-list__title">Title</div>
        </li>
        {books && books.map((book) => <BookView key={book.id} {...book} />)}
      </ul>
      <Pagination {...{ count, next, previous, setRequestUrl }} />
    </>
  );
};
export default BooksList;
