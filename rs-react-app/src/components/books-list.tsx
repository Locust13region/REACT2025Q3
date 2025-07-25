import type { FC } from 'react';
import BookView from './book-view';
import type { Book } from '@/types/types';

const BooksList: FC<{ books: Book[] }> = ({ books }) => {
  console.log('render list');
  return (
    <ul className="books-list">
      <li className="books-list__header">
        <div className="books-list__title">Author</div>
        <div className="books-list__title">Title</div>
      </li>
      {books && books.map((book) => <BookView key={book.id} {...book} />)}
    </ul>
  );
};
export default BooksList;
