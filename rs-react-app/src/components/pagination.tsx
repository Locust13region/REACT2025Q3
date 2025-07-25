import { useState, type FC } from 'react';

const Pagination: FC<{
  count: number;
  next: string | null;
  previous: string | null;
  setRequestUrl: (url: string) => void;
}> = ({ count, next, previous, setRequestUrl }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 32;
  const pageNumber = Math.ceil(count / booksPerPage);

  const previousPage = () => {
    setCurrentPage(currentPage - 1);
    if (previous) setRequestUrl(previous);
    console.log('previous', !!previous, previous);
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    if (next) setRequestUrl(next);
    console.log('next', !!next, next);
  };

  return (
    <section className="pagination">
      <button
        className="pagination__arrow"
        disabled={currentPage === 1}
        onClick={previousPage}
      >
        {'<'}
      </button>
      <div>{`Page ${currentPage} of Pages ${pageNumber}`}</div>
      <button className="pagination__arrow" disabled={!next} onClick={nextPage}>
        {'>'}
      </button>
    </section>
  );
};

export default Pagination;
