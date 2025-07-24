import { Routes, Route } from 'react-router';
import Header from '@/components/header';
import Content from '@/components/content';
import './App.css';
import ErrorBoundary from './components/error-boundary';
import useLocalStorage from './hooks/use-local-storage';
import About from './pages/about';
import NotFound from './pages/404';

export default function App() {
  const [storageValue, setStorageValue] = useLocalStorage();

  return (
    <>
      <Header
        searchSubstring={storageValue}
        setSearchSubstring={setStorageValue}
      ></Header>
      <ErrorBoundary searchSubstring={storageValue}>
        <Routes>
          <Route index element={<Content searchSubstring={storageValue} />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ErrorBoundary>
    </>
  );
}
