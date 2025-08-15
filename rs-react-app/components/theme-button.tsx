'use client';

import useTheme from '@hooks/use-theme';
import Moon from './moon';
import Sun from './sun';

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" aria-label="Toggle theme" onClick={toggleTheme}>
      {theme === 'dark' ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeButton;
