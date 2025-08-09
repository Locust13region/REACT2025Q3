import type { ErrorBoundaryProps } from '@/types/types';
import { Component } from 'react';

export default class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    const { hasError, errorMessage } = this.state;
    if (hasError) {
      console.warn('has Error', errorMessage);
      return (
        <div>
          <h2>{errorMessage}</h2>
          <button onClick={() => window.location.reload()}>Reset error</button>
        </div>
      );
    }
    return this.props.children;
  }
}
