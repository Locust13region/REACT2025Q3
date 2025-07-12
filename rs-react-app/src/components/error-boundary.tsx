import type { ErrorBoundaryProps } from '@/types/types';
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, errorMessage: error.message };
  }

  render() {
    const { hasError, errorMessage } = this.state;
    return hasError ? <h2>{errorMessage}</h2> : this.props.children;
  }
}
