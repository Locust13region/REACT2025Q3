import App from '@/App';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('App component', () => {
  test('Load searchSubstring from localstorage', () => {
    localStorage.setItem('rs-react-app', 'Dickens');
    render(<App />);
    expect(screen.getByRole('searchbox')).toHaveValue('Dickens');
  });

  test('Update searchSubstring from Header component by calling setSearchSubstring', async () => {
    const user = userEvent.setup();
    localStorage.removeItem('rs-react-app');

    render(<App />);
    const searchInput = screen.getByRole('searchbox');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    await user.type(searchInput, 'Dickens');
    await user.click(searchButton);
    expect(localStorage.getItem('rs-react-app')).toBe('Dickens');
  });
});
