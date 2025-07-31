import { useState, type JSX } from 'react';
import { ThemeContext, ThemeUpdateContext } from './theme-context';

const ThemeProvider = ({ children }: { children: JSX.Element }) => {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prev) => !prev);
  }
  return (
    <ThemeContext value={darkTheme}>
      <ThemeUpdateContext value={toggleTheme}>{children}</ThemeUpdateContext>
    </ThemeContext>
  );
};

export default ThemeProvider;
