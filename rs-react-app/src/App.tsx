import Header from '@/components/header';
import Content from '@/components/content';
import './App.css';
import ErrorBoundary from './components/error-boundary';
import useLocalStorage from './hooks/use-local-storage';

export default function App() {
  const [storageValue, setStorageValue] = useLocalStorage();

  return (
    <>
      <Header
        searchSubstring={storageValue}
        setSearchSubstring={setStorageValue}
      ></Header>
      <ErrorBoundary searchSubstring={storageValue}>
        <Content searchSubstring={storageValue} />
      </ErrorBoundary>
    </>
  );
}
