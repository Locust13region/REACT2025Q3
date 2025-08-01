import type { BookType } from '@/types/types';
import type { FC } from 'react';
import { NavLink, useParams } from 'react-router';

const Book: FC<
  BookType & {
    searchSubstring: string;
  }
> = ({ id, authors, title, searchSubstring }) => {
  const { page } = useParams();
  return (
    <>
      <li className="book">
        <div className="book__checkbox">
          <input type="checkbox" />
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
