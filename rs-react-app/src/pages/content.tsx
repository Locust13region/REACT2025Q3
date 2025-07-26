import type { ContentProps } from '@/types/types';
import BooksList from '../components/books-list';
import { useParams } from 'react-router';
import { useEffect, type FC } from 'react';
import { baseUrl } from '@/api/api-base-url';
import useApi from '@/hooks/use-api';

const Content: FC<ContentProps> = ({ searchSubstring, generatedError }) => {
  const { loading, fetchResult, fetchError, setRequestUrl, setFetchError } =
    useApi(generatedError);
  const page = useParams().page ?? '1';

  useEffect(() => {
    setRequestUrl(`${baseUrl}?search=${searchSubstring}&page=${page}`);
  }, [page, searchSubstring, setRequestUrl]);

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
      {fetchResult && (
        <BooksList {...fetchResult} searchSubstring={searchSubstring} />
      )}
    </main>
  );
};

export default Content;
