import { Component } from 'react';
import type { ContentProps } from '@/types/types';
import dataFetch from '@/api/api-request';
import BooksList from './books-list';

export default class Content extends Component<ContentProps> {
  state = {
    loading: false,
    fetchResult: null,
  };

  async dataRequest(): Promise<void> {
    try {
      this.setState({
        loading: true,
      });
      this.setState({
        fetchResult: await dataFetch(this.props.searchSubstring),
      });
      this.setState({ loading: false });
    } catch (error) {
      console.warn('error', error);
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        console.log(error);
      }
    }
  }

  async componentDidMount(): Promise<void> {
    this.dataRequest();
  }

  async componentDidUpdate(prevProps: Readonly<ContentProps>): Promise<void> {
    if (prevProps.searchSubstring !== this.props.searchSubstring) {
      this.dataRequest();
    }
  }

  render() {
    console.log('render content');
    const content = this.state.loading ? (
      <h2>Loading...</h2>
    ) : (
      <main className="content">
        <BooksList books={this.state.fetchResult} />
      </main>
    );

    return content;
  }
}
