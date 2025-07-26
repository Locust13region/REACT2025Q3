import type { ContentProps } from '@/types/types';
import BooksList from '../components/books-list';
import { Outlet, useSearchParams } from 'react-router';
import { useEffect, type FC } from 'react';
import { baseUrl } from '@/api/api-base-url';
import useApi from '@/hooks/use-api';

const Content: FC<ContentProps> = ({ searchSubstring, generatedError }) => {
  const { loading, fetchResult, fetchError, setRequestUrl, setFetchError } =
    useApi(generatedError);

  const [searchParams] = useSearchParams();
  const page = searchParams.get('page') ?? '1';

  const buildSearchUrl = (search: string, page: string) =>
    `${baseUrl}?search=${search}&page=${page}`;

  const requestUrl = buildSearchUrl(searchSubstring, page);

  useEffect(() => {
    setRequestUrl((prev) => (prev !== requestUrl ? requestUrl : prev));
  }, [requestUrl, setRequestUrl]);

  useEffect(() => {
    setFetchError(generatedError);
  }, [generatedError, setFetchError]);

  if (fetchError) {
    throw fetchError;
  }

  if (loading) {
    return <h2>Loading data...</h2>;
  }

  return (
    <main className="content">
      {fetchResult && <BooksList {...fetchResult} />}
      <Outlet />
    </main>
  );
};

export default Content;
