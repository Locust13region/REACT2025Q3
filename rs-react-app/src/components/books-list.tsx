import Book from '@/components/book';
import Pagination from './pagination';
import { useGetAllBooksQuery } from '@/redux/books-api';
import { useParams } from 'react-router';
import type { FC } from 'react';
import { useAppSelector } from '@/hooks/redux-hooks';
import { search } from '@/redux/selector';
import errorParser from '@/service/error-parser';

const BooksList: FC = () => {
  const searchSubstring = useAppSelector(search);
  const page = useParams().page ?? '1';
  const { data, isFetching, isSuccess, isError, error } = useGetAllBooksQuery({
    searchSubstring,
    page,
  });
  const {
    count = 0,
    next = null,
    previous = null,
    results: books = [],
  } = data ?? {};

  return (
    <>
      {isFetching && <h2 className="books-list__wrapper">Loading data...</h2>}
      {isError && (
        <h2 className="book-description">Page error: {errorParser(error)}</h2>
      )}
      {!isFetching && isSuccess && (
        <div className="books-list__wrapper">
          <ul className="books-list">
            <li className="books-list__header">
              <div className="books-list__title"></div>
              <div className="books-list__title">Author</div>
              <div className="books-list__title">Title</div>
            </li>
            {books && books.map((book) => <Book key={book.id} book={book} />)}
          </ul>
          <Pagination {...{ count, next, previous }} />
        </div>
      )}
    </>
  );
};

export default BooksList;
