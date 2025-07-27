import About from '@/pages/about';
import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi, type Mock } from 'vitest';
import { useNavigate } from 'react-router';
import userEvent from '@testing-library/user-event';

describe('About component', () => {
  test('renders page', () => {
    render(<About generatedError={null} />);

    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/RS School/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
  });

  test('calls navigate(-1) when clicked', async () => {
    const mockNavigate = vi.fn();
    const user = userEvent.setup();
    vi.mock('react-router', () => ({
      useNavigate: vi.fn(),
    }));
    (useNavigate as Mock).mockReturnValue(mockNavigate);

    render(<About generatedError={null} />);

    expect(screen.getByRole('heading', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByText(/view on github/i)).toBeInTheDocument();

    const backButton = screen.getByRole('button', { name: /back/i });
    await user.click(backButton);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
