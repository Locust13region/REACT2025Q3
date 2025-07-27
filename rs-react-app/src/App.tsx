import { Routes, Route, useSearchParams, Navigate } from 'react-router';
import Header from '@/components/header';
import './App.css';
import ErrorBoundary from './components/error-boundary';
import useLocalStorage from './hooks/use-local-storage';
import { lazy, Suspense, useState } from 'react';
import BookDescription from './components/book-description';

const Content = lazy(() => import('@/pages/content'));
const About = lazy(() => import('@/pages/about'));
const NotFound = lazy(() => import('@/pages/404'));

export default function App() {
  console.log('App render');
  const [searchParams] = useSearchParams();
  const [storageValue, setStorageValue] = useLocalStorage();
  const [generatedError, setGeneratedError] = useState<Error | null>(null);

  const urlSearch = searchParams.get('search');
  const searchSubstring = urlSearch ?? storageValue;

  return (
    <>
      <Header
        searchSubstring={searchSubstring}
        setSearchSubstring={setStorageValue}
        setGeneratedError={setGeneratedError}
      ></Header>
      <ErrorBoundary searchSubstring={searchSubstring}>
        <Suspense fallback={<h2>Loading page...</h2>}>
          <Routes>
            <Route path="/" element={<Navigate to="/books/1" replace />} />
            <Route path="/books" element={<Navigate to="/books/1" replace />} />

            <Route
              path="/books/:page"
              element={
                <Content
                  searchSubstring={searchSubstring}
                  generatedError={generatedError}
                />
              }
            >
              <Route path=":bookId" element={<BookDescription />} />
            </Route>

            <Route
              path="about"
              element={<About generatedError={generatedError} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
