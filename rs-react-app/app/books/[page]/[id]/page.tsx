'use client';

import { useAppSelector } from '@redux/redux-hooks';
import { useGetSingleBookQuery } from '@redux/books-api';
import { search } from '@redux/selector';
import errorParser from '@service/error-parser';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { useRouter } from 'next/navigation';

type Params = {
  params: {
    page: string;
    id: string;
  };
};

const BookDescription = ({ params: { page, id: bookId } }: Params) => {
  const router = useRouter();
  // const { page, id: bookId } = useParams();
  const searchSubstring = useAppSelector(search);
  const { data, isFetching, isError, error, refetch } = useGetSingleBookQuery(
    bookId ?? skipToken,
    {
      refetchOnFocus: true,
    }
  );
  // router.push(`/books/${page}?search=${searchSubstring}`)
  return (
    <>
      {isFetching && <h2 className="book-description">Loading data...</h2>}
      {isError && (
        <h2 className="book-description">Book error: {errorParser(error)}</h2>
      )}
      {!isFetching && !isError && data?.id && (
        <article className="book-description">
          <div className="book-description__actions">
            <button data-testid="refresh-button" onClick={() => refetch()}>
              ⟳
            </button>
            <button onClick={() => router.back()}>X</button>
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
