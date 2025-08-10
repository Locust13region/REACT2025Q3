import type { ContentProps } from '@/types/types';
import BooksList from '../components/books-list';
import { Outlet, useParams, useSearchParams } from 'react-router';
import { type FC } from 'react';

const Content: FC<ContentProps> = ({ generatedError }) => {
  const page = useParams().page;
  const search = useSearchParams();
  if (generatedError) {
    throw generatedError;
  }
  return (
    <main className="content">
      <BooksList key={`${page}${search}`} />
      <Outlet />
    </main>
  );
};

export default Content;
