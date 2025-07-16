import type { ErrorButtonProps } from '@/types/types';
import { Component, type ReactNode } from 'react';

export default class ErrorButton extends Component<ErrorButtonProps> {
  render(): ReactNode {
    return (
      <button
        className="content__error-button"
        type="button"
        onClick={this.props.setError}
      >
        Error
      </button>
    );
  }
}
