import { Component } from 'react';
import type { ContentProps } from '@/types/types';

class Content extends Component<ContentProps> {
  render() {
    const { searchSubstring } = this.props;
    return <main className="content">{searchSubstring}</main>;
  }
}

export default Content;
