'use client';

import { MouseEventHandler } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Book from './book';
import Pagination from './pagination';
import { useGetAllBooksQuery } from '@redux/books-api';
import { useAppSelector } from '@redux/redux-hooks';
import { search } from '@redux/selector';
import errorParser from '@service/error-parser';

const BooksList = () => {
  const router = useRouter();
  const page = useParams<{ page: string }>()?.page ?? '1';
  const activeBook = useParams<{ id: string }>()?.id;
  const searchSubstring = useAppSelector(search);
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

  const handleOnBookClick: MouseEventHandler<HTMLUListElement> = (e) => {
    const bookListItem = (e.target as HTMLElement).closest<HTMLDivElement>(
      '.book__link'
    );
    if (bookListItem) {
      const id = bookListItem.dataset.bookId;
      router.push(`/books/${page}/${id}?search=${searchSubstring}`);
    }
  };

  return (
    <>
      {isFetching && <h2 className="books-list__wrapper">Loading data...</h2>}
      {isError && (
        <h2 className="book-description">Page error: {errorParser(error)}</h2>
      )}
      {!isFetching && isSuccess && (
        <div className="books-list__wrapper">
          <ul className="books-list" onClick={handleOnBookClick}>
            <li className="books-list__header">
              <div className="books-list__title"></div>
              <div className="books-list__title">Author</div>
              <div className="books-list__title">Title</div>
            </li>
            {books &&
              books.map((book) => (
                <Book key={book.id} book={book} isActive={activeBook} />
              ))}
          </ul>
          <Pagination {...{ count, next, previous, page }} />
        </div>
      )}
    </>
  );
};

export default BooksList;
