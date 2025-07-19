import type { ItemViewProps } from '@/types/types';
import { Component, type ReactNode } from 'react';

export default class BookView extends Component<ItemViewProps> {
  render(): ReactNode {
    return (
      <li className="book">
        <p>
          <span>{this.props.author ?? 'no data available'}</span>
        </p>
        <p>
          <span>{this.props.title ?? 'no data available'}</span>
        </p>
      </li>
    );
  }
}
