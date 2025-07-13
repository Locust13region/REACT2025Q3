import { Component } from 'react';
import type { ContentProps, ContentState } from '@/types/types';
import dataFetch from '@/api/api-request';
import BooksList from './books-list';
import ErrorButton from './error-button';

export default class Content extends Component<ContentProps, ContentState> {
  state = {
    loading: false,
    fetchResult: null,
    fetchError: null,
  };

  async dataRequest(): Promise<void> {
    try {
      this.setState({ loading: true, fetchError: null });
      const fetchResult = await dataFetch(this.props.searchSubstring);
      this.setState({ fetchResult: fetchResult, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ loading: false, fetchError: error });
      }
    }
  }

  setError = () => {
    this.setState({
      fetchError: new Error('Test ErrorBoundary'),
    });
  };

  async componentDidMount(): Promise<void> {
    this.dataRequest();
  }

  async componentDidUpdate(prevProps: Readonly<ContentProps>): Promise<void> {
    if (prevProps.searchSubstring !== this.props.searchSubstring) {
      this.dataRequest();
    }
  }

  render() {
    if (this.state.fetchError) {
      throw this.state.fetchError;
    }

    if (this.state.loading) {
      return <h2>Loading...</h2>;
    }

    return (
      <main className="content">
        <BooksList books={this.state.fetchResult} />
        <ErrorButton setError={this.setError} />
      </main>
    );
  }
}
