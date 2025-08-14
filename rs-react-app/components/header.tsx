'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useAppDispatch } from '../redux/redux-hooks';
import { setSearch } from '../redux/search-slice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ThemeButton from './theme-button';
import { localStorageKey } from 'service/local-storage-key';

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      setInputValue(stored);
      dispatch(setSearch(stored));
    }
  }, [dispatch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputTrimmed = inputValue.trim();
    setInputValue(inputTrimmed);
    dispatch(setSearch(inputTrimmed));
    router.push(
      `/books/1${inputTrimmed.length ? `?search=${encodeURIComponent(inputTrimmed)}` : ''}`
    );
  };

  return (
    <header className="header">
      <Link href="/about">About</Link>
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
      <ThemeButton />
    </header>
  );
};

export default Header;
