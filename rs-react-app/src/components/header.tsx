import { useState, type ChangeEvent, type FC, type FormEvent } from 'react';
import type { HeaderProps } from '@/types/types';
import { Link, useNavigate } from 'react-router';
import useTheme from '@/hooks/use-theme';
import Moon from '@/assets/moon';
import Sun from '@/assets/sun';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import { search } from '@/redux/selector';
import { setSearch } from '@/redux/search-slice';

const Header: FC<HeaderProps> = ({ setGeneratedError }) => {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const searchSubstring = useAppSelector(search);

  const [inputValue, setInputValue] = useState(searchSubstring);
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputTrimmed = inputValue.trim();
    setInputValue(inputTrimmed);
    dispatch(setSearch(inputTrimmed));
    setGeneratedError(null);
    navigate({
      pathname: '/books/1/',
      search: inputTrimmed.length ? `?search=${inputTrimmed}` : '',
    });
  };

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
      <button type="button" aria-label="Toggle theme" onClick={toggleTheme}>
        {theme === 'dark' ? <Moon /> : <Sun />}
      </button>
      <button type="button" onClick={setError}>
        Error
      </button>
    </header>
  );
};

export default Header;
