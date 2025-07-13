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

  componentDidUpdate(prevProps: Readonly<ErrorBoundaryProps>): void {
    if (prevProps.searchSubstring !== this.props.searchSubstring) {
      this.setState({ hasError: false });
    }
  }

  render() {
    const { hasError, errorMessage } = this.state;
    if (hasError) {
      console.warn('has Error', errorMessage);
      return (
        <div>
          <h2>{errorMessage}</h2>
          <p>Try a new search query.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
