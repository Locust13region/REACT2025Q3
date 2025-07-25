import type { Book } from '@/types/types';
import type { FC } from 'react';

const BookView: FC<Book> = ({ authors, title }) => {
  return (
    <li className="book">
      <p>
        <span>{authors[0]?.name ?? 'no data available'}</span>
      </p>
      <p>
        <span>{title ?? 'no data available'}</span>
      </p>
    </li>
  );
};
export default BookView;
