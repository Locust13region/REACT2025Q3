import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/header';
import { describe, expect, test, vi } from 'vitest';

describe('Header component', () => {
  test('Header renders search input, input label, search button', () => {
    render(<Header searchSubstring={''} setSearchSubstring={() => {}} />);
    expect(screen.getByLabelText('Find book')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('Header displays input with new incoming prop "searchSubstring', () => {
    const { rerender } = render(
      <Header searchSubstring={''} setSearchSubstring={() => {}} />
    );
    rerender(
      <Header searchSubstring={'Dickens'} setSearchSubstring={() => {}} />
    );
    expect(screen.getByRole('searchbox')).toHaveValue('Dickens');
  });

  test('Check inserting some text into an input field and submit', async () => {
    const user = userEvent.setup();
    const setSearchSubstring = vi.fn();
    render(
      <Header searchSubstring="" setSearchSubstring={setSearchSubstring} />
    );

    const input = screen.getByRole('searchbox');
    await user.type(input, 'Dickens');
    expect(input).toHaveValue('Dickens');

    const searchButton = screen.getByRole('button', { name: 'Search' });
    await user.click(searchButton);
    expect(setSearchSubstring).toBeCalledWith('Dickens');
  });
});
