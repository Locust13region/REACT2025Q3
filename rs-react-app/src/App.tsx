import { Routes, Route, useLocation, useSearchParams } from 'react-router';
import Header from '@/components/header';
import './App.css';
import ErrorBoundary from './components/error-boundary';
import useLocalStorage from './hooks/use-local-storage';
import { lazy, Suspense, useState } from 'react';

const Content = lazy(() => import('@/pages/content'));
const About = lazy(() => import('@/pages/about'));
const NotFound = lazy(() => import('@/pages/404'));

export default function App() {
  const location = useLocation();
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
      <ErrorBoundary key={location.pathname} searchSubstring={searchSubstring}>
        <Suspense fallback={<h2>Loading page...</h2>}>
          <Routes>
            <Route
              index
              element={
                <Content
                  searchSubstring={searchSubstring}
                  generatedError={generatedError}
                />
              }
            />
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
