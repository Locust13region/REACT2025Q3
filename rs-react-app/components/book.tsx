'use client';

import { useAppDispatch, useAppSelector } from '@redux/redux-hooks';
import { toggleBook } from '@redux/books-slice';
import { selected } from '@redux/selector';
import { BookProps } from 'types/types';

const Book = ({ book, isActive }: BookProps) => {
  const { id, authors, title } = book;

  const dispatch = useAppDispatch();

  const checkedBook = useAppSelector((state) => selected(state, book.id));
  const isChecked = !!checkedBook;

  const handleCheckbox = () => {
    dispatch(toggleBook(book));
  };

  return (
    <>
      <li className="book">
        <div className="book__checkbox">
          <input
            name={`${id}`}
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckbox}
          />
        </div>
        <div
          data-book-id={id}
          className={`book__link ${isActive ? 'book__link--active' : ''}`}
        >
          <p>
            <span>{authors[0]?.name ?? 'no data available'}</span>
          </p>
          <p>
            <span>{title ?? 'no data available'}</span>
          </p>
        </div>
      </li>
    </>
  );
};
export default Book;
