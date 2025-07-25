import { Routes, Route } from 'react-router';
import Header from '@/components/header';
import Content from '@/components/content';
import './App.css';
import ErrorBoundary from './components/error-boundary';
import useLocalStorage from './hooks/use-local-storage';
import About from './pages/about';
import NotFound from './pages/404';
import { useState } from 'react';

export default function App() {
  const [storageValue, setStorageValue] = useLocalStorage();
  const [generatedError, setGeneratedError] = useState<Error | null>(null);

  return (
    <>
      <Header
        searchSubstring={storageValue}
        setSearchSubstring={setStorageValue}
        setGeneratedError={setGeneratedError}
      ></Header>
      <ErrorBoundary searchSubstring={storageValue}>
        <Routes>
          <Route
            index
            element={
              <Content
                searchSubstring={storageValue}
                generatedError={generatedError}
              />
            }
          />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}
