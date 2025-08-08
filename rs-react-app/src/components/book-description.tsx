import { useAppSelector } from '@/hooks/redux-hooks';
import { useGetSingleBookQuery } from '@/redux/books-api';
import { search } from '@/redux/selector';
import errorParser from '@/service/error-parser';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { type FC } from 'react';
import { useNavigate, useParams } from 'react-router';

const BookDescription: FC = () => {
  const navigate = useNavigate();
  const { bookId, page } = useParams();
  console.log(bookId, page);
  const searchSubstring = useAppSelector(search);
  const { data, isFetching, isError, error, refetch } = useGetSingleBookQuery(
    bookId ?? skipToken,
    {
      refetchOnFocus: true,
    }
  );
  console.log(isFetching, data, isError);
  return (
    <>
      {isFetching && <h2 className="book-description">Loading data...</h2>}
      {isError && (
        <h2 className="book-description">Book error: {errorParser(error)}</h2>
      )}
      {!isFetching && !isError && data?.id && (
        <article className="book-description">
          <div className="book-description__actions">
            <button onClick={() => refetch()}>⟳</button>
            <button
              onClick={() =>
                navigate(`/books/${page}?search=${searchSubstring}`)
              }
            >
              X
            </button>
          </div>
          <h4>{data.title}</h4>
          <h5>{data.authors[0].name}</h5>
          <p>book description</p>
          <p>{data.summaries.length ? data.summaries : 'no data available'}</p>
        </article>
      )}
    </>
  );
};

export default BookDescription;
