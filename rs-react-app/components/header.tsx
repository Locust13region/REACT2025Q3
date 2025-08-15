'use client';

import { useAppDispatch } from '@redux/redux-hooks';
import { setSearch } from '@redux/search-slice';
import { localStorageKey } from '@service/local-storage-key';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import ThemeButton from './theme-button';

const Header = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParam = useSearchParams();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(localStorageKey) ?? '';
    const search = searchParam?.get('search');

    const finalValue = search || stored;

    if (finalValue) {
      setInputValue(finalValue);
      dispatch(setSearch(finalValue));
    }
  }, [dispatch, searchParam]);

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
