'use client';

import { useAppDispatch } from '@redux/redux-hooks';
import { setSearch } from '@redux/search-slice';
import { localStorageKey } from '@service/local-storage-key';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import ThemeButton from './theme-button';
import LocaleSwitch from './locale-switch';
import { useTranslations } from 'next-intl';
import { Link } from '@i18n/navigation';

const Header = () => {
  const t = useTranslations('Header');
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
      <Link href="/about">{t('about')}</Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor="searchInput">{t('find')}</label>
        <input
          type="search"
          id="searchInput"
          name="searchInput"
          value={inputValue}
          onInput={handleInputChange}
        />
        <button type="submit">{t('search')}</button>
      </form>
      <LocaleSwitch />
      <ThemeButton />
    </header>
  );
};

export default Header;
