import type { Book } from '@/types/types';
import type { FC } from 'react';
import { NavLink } from 'react-router';

const BookView: FC<Book> = ({ id, authors, title }) => {
  return (
    <li className="book">
      <NavLink
        to={`/books/${id}`}
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
  );
};
export default BookView;
