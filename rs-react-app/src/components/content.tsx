import { Component } from 'react';
import type { ContentProps } from '@/types/types';
import dataFetch from '@/api/api-request';

export default class Content extends Component<ContentProps> {
  state = {
    loading: false,
  };

  async componentDidMount(): Promise<void> {
    this.setState({
      loading: true,
    });
    await dataFetch(this.props.searchSubstring);
    this.setState({ loading: false });
  }

  async componentDidUpdate(prevProps: Readonly<ContentProps>): Promise<void> {
    if (prevProps.searchSubstring !== this.props.searchSubstring) {
      this.setState({
        loading: true,
      });
      await dataFetch(this.props.searchSubstring);
      this.setState({ loading: false });
    }
  }

  render() {
    console.log('render content');
    const content = this.state.loading ? (
      <h2>Loading...</h2>
    ) : (
      <main className="content"> {this.props.searchSubstring}</main>
    );

    return content;
  }
}
