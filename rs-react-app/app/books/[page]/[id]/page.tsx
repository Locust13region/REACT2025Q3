'use client';

import { useGetSingleBookQuery } from '@redux/books-api';
import { useAppSelector } from '@redux/redux-hooks';
import { search } from '@redux/selector';
import { skipToken } from '@reduxjs/toolkit/query/react';
import errorParser from '@service/error-parser';
import { useParams, useRouter } from 'next/navigation';

const BookDescription = () => {
  const router = useRouter();
  const { page, id: bookId } = useParams<{ page: string; id: string }>();
  const searchSubstring = useAppSelector(search);
  const { data, isFetching, isError, error, refetch } = useGetSingleBookQuery(
    bookId ?? skipToken,
    {
      refetchOnFocus: true,
    }
  );

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
            <button
              onClick={() =>
                router.push(`/books/${page}?search=${searchSubstring}`)
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
