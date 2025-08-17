'use client';

import { Link } from '@i18n/navigation';
import { useGetSingleBookQuery } from '@redux/books-api';
import { useAppSelector } from '@redux/redux-hooks';
import { search } from '@redux/selector';
import { skipToken } from '@reduxjs/toolkit/query/react';
import errorParser from '@service/error-parser';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const BookDescription = () => {
  const t = useTranslations('Description');
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
      {isFetching && <h2 className="book-description">{t('loading')}</h2>}
      {isError && (
        <h2 className="book-description">
          {t('error')} {errorParser(error)}
        </h2>
      )}
      {!isFetching && !isError && data?.id && (
        <article className="book-description">
          <div className="book-description__actions">
            <button data-testid="refresh-button" onClick={() => refetch()}>
              ⟳
            </button>
            <Link href={`/books/${page}?search=${searchSubstring}`}>X</Link>
          </div>
          <h4>{data.title}</h4>
          <h5>{data.authors.length ? data.authors[0].name : t('no data')}</h5>
          <p>{t('description')}</p>
          <p>{data.summaries.length ? data.summaries : t('no data')}</p>
        </article>
      )}
    </>
  );
};

export default BookDescription;
