import type { PaginationProps } from '@/types/types';
import { type FC } from 'react';
import { useSearchParams } from 'react-router';

const Pagination: FC<PaginationProps> = ({ count, next, previous }) => {
  const [, setSearchParams] = useSearchParams();
  const booksPerPage = 32;
  const pagesTotal = Math.ceil(count / booksPerPage);

  const getPageParams = (url: string) => {
    const page = new URL(url).searchParams.get('page') ?? '1';
    const search = new URL(url).searchParams.get('search') ?? '';
    return { search, page };
  };

  const previousPage = () => {
    if (previous) setSearchParams({ ...getPageParams(previous) });
  };

  const nextPage = () => {
    if (next) setSearchParams({ ...getPageParams(next) });
  };

  const currentPage = previous ? Number(getPageParams(previous).page) + 1 : '1';

  return (
    <section className="pagination">
      <button
        className="pagination__arrow"
        disabled={!previous}
        onClick={previousPage}
      >
        {'<'}
      </button>
      <div>{`Page ${currentPage} of Pages ${pagesTotal}`}</div>
      <button className="pagination__arrow" disabled={!next} onClick={nextPage}>
        {'>'}
      </button>
    </section>
  );
};

export default Pagination;
