import {
  use,
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
  type FormEvent,
} from 'react';
import type { HeaderProps } from '@/types/types';
import { Link, useNavigate } from 'react-router';
import { ThemeContext } from './theme-context';

const Header: FC<HeaderProps> = ({
  searchSubstring,
  setSearchSubstring,
  setGeneratedError,
}) => {
  const darkTheme = use(ThemeContext);
  console.log('darkTheme', darkTheme);
  const [inputValue, setInputValue] = useState(searchSubstring);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputTrimmed = inputValue.trim();
    setSearchSubstring(inputTrimmed);
    setGeneratedError(null);
    navigate({
      pathname: '/books/1/',
      search: inputTrimmed.length ? `?search=${inputTrimmed}` : '',
    });
  };

  useEffect(() => {
    setInputValue(searchSubstring);
  }, [searchSubstring]);

  const setError = () => {
    setGeneratedError(new Error('Test ErrorBoundary'));
  };

  return (
    <header className="header">
      <Link to={'/about'}>About</Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchInput">Find book</label>
        <input
          type="search"
          id="searchInput"
          name="searchInput"
          value={inputValue}
          onInput={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      <button type="button" onClick={setError}>
        Error
      </button>
    </header>
  );
};

export default Header;
