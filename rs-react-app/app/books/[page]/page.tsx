import { useParams } from 'next/navigation';
import BooksList from '../../../components/books-list';

const Content = () => {
  const page = useParams<{ page: string }>()?.page ?? '1';

  return (
    <main className="content">
      <BooksList key={`${page}`} page={page} />
    </main>
  );
};

export default Content;
