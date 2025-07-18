import type { ItemViewProps } from '@/types/types';
import { Component, type ReactNode } from 'react';

export default class BookView extends Component<ItemViewProps> {
  render(): ReactNode {
    return (
      <li className="book">
        <p>
          <span>{this.props.author}</span>
        </p>
        <p>
          <span>{this.props.title}</span>
        </p>
      </li>
    );
  }
}
