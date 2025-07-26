import type { ContentProps, FetchResult } from '@/types/types';
import dataFetch from '@/api/api-request';
import BooksList from '../components/books-list';
import { useSearchParams } from 'react-router';
import { useCallback, useEffect, useState, type FC } from 'react';
import { baseUrl } from '@/api/api-base-url';
import BookDescription from '@/components/book-description';

const Content: FC<ContentProps> = ({ searchSubstring, generatedError }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchResult, setFetchResult] = useState<FetchResult>();
  const [fetchError, setFetchError] = useState<Error | null>(generatedError);
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  const buildSearchUrl = (search: string, page: string) =>
    `${baseUrl}?search=${search}&page=${page}`;

  const requestUrl = buildSearchUrl(searchSubstring, page);

  const dataRequest = useCallback(async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const result = await dataFetch(requestUrl);
      setFetchResult(result);
    } catch (error) {
      if (error instanceof Error) {
        setFetchError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [requestUrl]);

  useEffect(() => {
    dataRequest();
  }, [dataRequest]);

  useEffect(() => {
    setFetchError(generatedError);
  }, [generatedError]);

  if (fetchError) {
    throw fetchError;
  }

  if (loading) {
    return <h2>Loading data...</h2>;
  }

  return (
    <main className="content">
      {fetchResult && <BooksList {...fetchResult} />}
      <BookDescription />
    </main>
  );
};

export default Content;
