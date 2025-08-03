import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { toggleBook } from '@/store/books-slice';
import { selected } from '@/store/selector';
import type { BookProps } from '@/types/types';
import type { FC } from 'react';
import { NavLink, useParams } from 'react-router';

const Book: FC<BookProps> = ({ book, searchSubstring }) => {
  const { id, authors, title } = book;

  const { page } = useParams();
  const dispatch = useAppDispatch();

  const checkedBooks = useAppSelector(selected);
  const isChecked = checkedBooks.some((item) => item.id === book.id);

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
        <NavLink
          to={`/books/${page}/${id}?search=${searchSubstring}`}
          className={({ isActive }) =>
            `book__link ${isActive ? 'book__link--active' : ''}`
          }
        >
          <p>
            <span>{authors[0]?.name ?? 'no data available'}</span>
          </p>
          <p>
            <span>{title ?? 'no data available'}</span>
          </p>
        </NavLink>
      </li>
    </>
  );
};
export default Book;
