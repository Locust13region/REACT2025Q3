import { baseUrl } from '@/api/api-base-url';
import useApi from '@/hooks/use-api';
import { useEffect, type FC } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

const BookDescription: FC = () => {
  const navigate = useNavigate();
  const { loading, fetchError, fetchResult, setRequestUrl } = useApi(null);
  const { bookId, page } = useParams();
  const [searchParams] = useSearchParams();
  const searchSubstring = searchParams.get('search') ?? '';

  useEffect(() => {
    if (bookId) {
      const url = `${baseUrl}?ids=${bookId}`;
      setRequestUrl((prev) => (prev !== url ? url : prev));
    }
  }, [bookId, setRequestUrl]);

  if (!bookId) return null;

  if (fetchError) {
    return <h2 className="book-description">Error {fetchError.message}</h2>;
  }

  if (loading) {
    return <h2 className="book-description">Loading data...</h2>;
  }
  return fetchResult?.results[0].id ? (
    <article className="book-description">
      <button
        onClick={() => navigate(`/books/${page}?search=${searchSubstring}`)}
      >
        X
      </button>
      <h2>{fetchResult.results[0].title}</h2>
      <h3>{fetchResult.results[0].authors[0].name}</h3>
      <p>book description</p>
      <p>
        {fetchResult.results[0].summaries.length
          ? fetchResult.results[0].summaries
          : 'no data available'}
      </p>
    </article>
  ) : null;
};

export default BookDescription;
