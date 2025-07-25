import type { ContentProps, FetchResult } from '@/types/types';
import dataFetch from '@/api/api-request';
import BooksList from '../components/books-list';
import { Outlet } from 'react-router';
import { useCallback, useEffect, useState, type FC } from 'react';

const Content: FC<ContentProps> = ({ searchSubstring, generatedError }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchResult, setFetchResult] = useState<FetchResult>();
  const [fetchError, setFetchError] = useState<Error | null>(generatedError);

  const dataRequest = useCallback(async () => {
    try {
      setLoading(true);
      setFetchError(null);
      const fetchResult = await dataFetch(searchSubstring);
      setFetchResult(fetchResult);
    } catch (error) {
      if (error instanceof Error) {
        setFetchError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [searchSubstring]);

  useEffect(() => {
    dataRequest();
  }, [dataRequest]);

  if (fetchError) {
    throw fetchError;
  }

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <main className="content">
      {fetchResult && <BooksList books={fetchResult.results} />}
      <Outlet />
    </main>
  );
};

export default Content;
