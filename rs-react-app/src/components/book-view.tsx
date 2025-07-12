import type { ItemViewProps } from '@/types/types';
import { Component, type ReactNode } from 'react';

export default class BookView extends Component<ItemViewProps> {
  render(): ReactNode {
    return (
      <div className="content_book">
        <p>{this.props.author}</p>
        <p>{this.props.title}</p>
      </div>
    );
  }
}
