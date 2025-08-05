import { baseUrl } from '@/api/api-base-url';
import useApi from '@/hooks/use-api';
import { useRef, type FC } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router';

const BookDescription: FC = () => {
  const navigate = useNavigate();
  const { loading, fetchError, fetchResult, setRequestUrl } = useApi(null);
  const { bookId, page } = useParams();
  const [searchParams] = useSearchParams();
  const searchSubstring = searchParams.get('search') ?? '';

  const prevUrl = useRef<string | null>(null);
  const url = `${baseUrl}?ids=${bookId}`;
  if (prevUrl.current !== url) {
    prevUrl.current = url;
    setRequestUrl((prev) => (prev !== url ? url : prev));
  }

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
      <h4>{fetchResult.results[0].title}</h4>
      <h5>{fetchResult.results[0].authors[0].name}</h5>
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
