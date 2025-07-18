import ErrorBoundary from '@/components/error-boundary';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

describe('Error-boundary Component', () => {
  test('Without errors in children, renders children.', () => {
    render(
      <ErrorBoundary searchSubstring={''}>
        <div>Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });

  test('With errors in children, renders fallback. New search => error reset.', () => {
    const ChildWithError = () => {
      throw new Error('Test Error!');
    };
    const { rerender } = render(
      <ErrorBoundary searchSubstring={''}>
        <ChildWithError />
      </ErrorBoundary>
    );
    expect(screen.getByText('Test Error!')).toBeInTheDocument();

    rerender(
      <ErrorBoundary searchSubstring={'Dickens'}>
        <div>Child</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Child')).toBeInTheDocument();
  });
});
