import { Component } from 'react';
import type { ContentProps } from '@/types/types';
import dataFetch from '@/api/api-request';

export default class Content extends Component<ContentProps> {
  state = {
    loading: false,
    errorOccurred: false,
    searchSubstring: this.props.searchSubstring,
  };

  async componentDidUpdate(prevProps: Readonly<ContentProps>) {
    if (prevProps.searchSubstring !== this.props.searchSubstring) {
      this.setState({
        searchSubstring: this.props.searchSubstring,
        loading: true,
      });
      const fetchResponse = await dataFetch();
    }
  }

  render() {
    console.log('render content');
    console.log(this.state.searchSubstring);
    return <main className="content">{this.state.searchSubstring}</main>;
  }
}
