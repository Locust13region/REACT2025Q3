import App from '@/App';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

describe('App component', () => {
  test('Load searchSubstring from localstorage', () => {
    localStorage.setItem('rs-react-app', 'Dickens');
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByRole('searchbox')).toHaveValue('Dickens');
  });

  test('Update searchSubstring from Header component by calling setSearchSubstring', async () => {
    const user = userEvent.setup();
    localStorage.removeItem('rs-react-app');

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    const searchInput = screen.getByRole('searchbox');
    const searchButton = screen.getByRole('button', { name: 'Search' });
    await user.type(searchInput, 'Dickens');
    await user.click(searchButton);
    expect(localStorage.getItem('rs-react-app')).toBe('Dickens');
  });
});
