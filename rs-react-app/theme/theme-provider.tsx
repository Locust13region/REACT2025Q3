'use client';

import { useState, useEffect, type JSX } from 'react';
import ThemeContext from './theme-context';

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    setTheme(systemTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

export default ThemeProvider;
