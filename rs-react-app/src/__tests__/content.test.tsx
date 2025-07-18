import dataFetch from '@/api/api-request';
import Content from '@/components/content';
import ErrorBoundary from '@/components/error-boundary';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi, type Mock } from 'vitest';

describe('Content component', () => {
  test('Content mounted', async () => {
    render(<Content searchSubstring={''} />);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(/loading/i);

    const dataRequest = vi.spyOn(Content, 'dataRequest');
    console.log(dataRequest);

    const errorButton = await screen.findByRole('button', { name: 'Error' });
    expect(errorButton).toBeInTheDocument();
  });

  test('Call dataRequest', async () => {
    const user = userEvent.setup();
    render(
      <ErrorBoundary searchSubstring={''}>
        <Content searchSubstring={''} />
      </ErrorBoundary>
    );
    const errorButton = await screen.findByRole('button', { name: 'Error' });
    await user.click(errorButton);
    expect(screen.getByText('Test ErrorBoundary')).toBeInTheDocument();
  });

  test('Error button', async () => {
    const user = userEvent.setup();

    vi.mock('@/api/api-request', () => ({
      default: vi.fn(),
    }));

    (dataFetch as Mock).mockResolvedValueOnce([
      { id: 1, author: '', title: '' },
    ]);

    render(
      <ErrorBoundary searchSubstring={''}>
        <Content searchSubstring={''} />
      </ErrorBoundary>
    );
    const errorButton = await screen.findByRole('button', { name: 'Error' });
    await user.click(errorButton);
  });
});
