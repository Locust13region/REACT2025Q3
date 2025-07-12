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
    console.log('hasError', hasError);
    return hasError ? <h2>{errorMessage}</h2> : this.props.children;
  }
}
