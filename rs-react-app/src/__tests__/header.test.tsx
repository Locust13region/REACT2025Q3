import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/header';
import { describe, expect, test, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import ErrorBoundary from '@/components/error-boundary';
import Content from '@/pages/content';

describe('Header component', () => {
  test('Header renders search input, input label, search button, error button', () => {
    render(
      <MemoryRouter>
        <Header
          searchSubstring={''}
          setSearchSubstring={() => {}}
          setGeneratedError={() => {}}
        />
      </MemoryRouter>
    );
    expect(screen.getByLabelText('Find book')).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Error' })).toBeInTheDocument();
  });

  test('Header displays input with new incoming prop "searchSubstring', () => {
    const { rerender } = render(
      <MemoryRouter>
        <Header
          searchSubstring={''}
          setSearchSubstring={() => {}}
          setGeneratedError={() => {}}
        />
      </MemoryRouter>
    );
    rerender(
      <MemoryRouter>
        <Header
          searchSubstring={'Dickens'}
          setSearchSubstring={() => {}}
          setGeneratedError={() => {}}
        />
      </MemoryRouter>
    );
    expect(screen.getByRole('searchbox')).toHaveValue('Dickens');
  });

  test('Check inserting some text into an input field and submit', async () => {
    const user = userEvent.setup();
    const setSearchSubstring = vi.fn();
    render(
      <MemoryRouter>
        <Header
          searchSubstring=""
          setSearchSubstring={setSearchSubstring}
          setGeneratedError={() => {}}
        />
      </MemoryRouter>
    );

    const input = screen.getByRole('searchbox');
    await user.type(input, 'Dickens');
    expect(input).toHaveValue('Dickens');

    const searchButton = screen.getByRole('button', { name: 'Search' });
    await user.click(searchButton);
    expect(setSearchSubstring).toBeCalledWith('Dickens');
  });

  test('Check inserting some whitespaces into an input field and submit', async () => {
    const user = userEvent.setup();
    const setSearchSubstring = vi.fn();
    render(
      <MemoryRouter>
        <Header
          searchSubstring=""
          setSearchSubstring={setSearchSubstring}
          setGeneratedError={() => {}}
        />
      </MemoryRouter>
    );

    const input = screen.getByRole('searchbox');
    await user.type(input, '  ');
    expect(input).toHaveValue('  ');

    const searchButton = screen.getByRole('button', { name: 'Search' });
    await user.click(searchButton);
    expect(setSearchSubstring).toBeCalledWith('');
  });

  test('Error button action', async () => {
    const user = userEvent.setup();
    render(
      <>
        <MemoryRouter>
          <Header
            searchSubstring=""
            setSearchSubstring={() => {}}
            setGeneratedError={() => {}}
          />
        </MemoryRouter>
        <ErrorBoundary searchSubstring={''}>
          <Content
            searchSubstring={''}
            generatedError={new Error('Test ErrorBoundary')}
          />
        </ErrorBoundary>
      </>
    );
    const errorButton = screen.getByRole('button', { name: 'Error' });
    await user.click(errorButton);
    const errorMessage = await screen.findByText('Test ErrorBoundary');
    expect(errorMessage).toBeInTheDocument();
  });
});
