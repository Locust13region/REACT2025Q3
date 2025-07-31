import type { PaginationProps } from '@/types/types';
import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router';

const Pagination: FC<PaginationProps> = ({ count, next, previous }) => {
  const { page } = useParams();
  const navigate = useNavigate();
  const booksPerPage = 32;
  const pagesTotal = Math.ceil(count / booksPerPage);

  const getPageParams = (url: string) => {
    const urlObj = new URL(url);
    const page = urlObj.searchParams.get('page') ?? '1';
    const search = urlObj.searchParams.get('search') ?? '';
    return `/books/${page}?search=${search}`;
  };

  const previousPage = () => {
    if (previous) navigate(getPageParams(previous));
  };

  const nextPage = () => {
    if (next) navigate(getPageParams(next));
  };

  const currentPage = page;

  return (
    <section className="pagination">
      <button
        className="pagination__arrow"
        disabled={!previous}
        onClick={previousPage}
      >
        {'<'}
      </button>
      <div>{`Page ${currentPage} of ${pagesTotal}`}</div>
      <button className="pagination__arrow" disabled={!next} onClick={nextPage}>
        {'>'}
      </button>
    </section>
  );
};

export default Pagination;
