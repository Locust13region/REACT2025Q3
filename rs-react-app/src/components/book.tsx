import type { BookType } from '@/types/types';
import type { FC } from 'react';
import { NavLink, useSearchParams } from 'react-router';

const Book: FC<BookType> = ({ id, authors, title }) => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const searchSubstring = searchParams.get('search');
  return (
    <li className="book">
      <NavLink
        to={`/books/${id}?page=${page}&search=${searchSubstring}`}
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
export default Book;
