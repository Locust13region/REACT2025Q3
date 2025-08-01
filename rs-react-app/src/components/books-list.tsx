import Book from '@/components/book';
import type { FetchResult } from '@/types/types';
import Pagination from './pagination';

const BooksList = ({
  count,
  next,
  previous,
  results: books,
  searchSubstring,
}: FetchResult & {
  searchSubstring: string;
}) => {
  return (
    <div className="books-list__wrapper">
      <ul className="books-list">
        <li className="books-list__header">
          <div></div>
          <div className="books-list__title">Author</div>
          <div className="books-list__title">Title</div>
        </li>
        {books &&
          books.map((book) => (
            <Book key={book.id} {...book} searchSubstring={searchSubstring} />
          ))}
      </ul>
      <Pagination {...{ count, next, previous }} />
    </div>
  );
};

export default BooksList;
