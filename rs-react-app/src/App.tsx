import { Routes, Route, Navigate } from 'react-router';
import Header from '@/components/header';
import './App.css';
import './index.css';
import ErrorBoundary from './components/error-boundary';
import { lazy, Suspense } from 'react';
import BookDescription from './components/book-description';

import { BrowserRouter } from 'react-router';
import ThemeProvider from '@/components/theme-provider.tsx';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

const Content = lazy(() => import('@/pages/content'));
// const About = lazy(() => import('@/pages/about'));
const NotFound = lazy(() => import('@/pages/404'));

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Navigate to="/books/1" replace />} />
        <Route path="/books" element={<Navigate to="/books/1" replace />} />

        <Route path="/books/:page" element={<Content />}>
          <Route path=":bookId" element={<BookDescription />} />
        </Route>

        {/* <Route path="about" element={<About />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ErrorBoundary>
  );
}
