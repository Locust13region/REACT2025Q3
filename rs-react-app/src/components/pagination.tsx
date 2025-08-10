import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import csvBuilder from '@/service/csv-builder';
import downloadFile from '@/service/file-handler';
import { unSelectAllBooks } from '@/redux/books-slice';
import { selected } from '@/redux/selector';
import type { PaginationProps } from '@/types/types';
import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router';

const Pagination: FC<PaginationProps> = ({ count, next, previous }) => {
  const { page } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  const checkedBooks = useAppSelector(selected);

  const handleUnselect = () => {
    dispatch(unSelectAllBooks());
  };

  const handleDownload = () => {
    const csv = csvBuilder(checkedBooks);
    downloadFile(csv, checkedBooks.length);
  };

  return (
    <section className="pagination">
      <button
        className="pagination__arrow"
        disabled={!previous}
        onClick={previousPage}
      >
        {'<'}
      </button>
      <div>{`Page ${page} of ${pagesTotal}`}</div>
      <button className="pagination__arrow" disabled={!next} onClick={nextPage}>
        {'>'}
      </button>
      <div
        className={`pagination__action ${checkedBooks.length ? 'pagination__action-show' : ''}`}
      >
        <button type="button" onClick={handleUnselect}>
          {`Unselect (${checkedBooks.length})`}
        </button>
        <button type="button" onClick={handleDownload}>
          Download
        </button>
      </div>
    </section>
  );
};

export default Pagination;
