import { Component } from 'react';
import Header from '@/components/header';
import Content from '@/components/content';
import './App.css';
import ErrorBoundary from './components/error-boundary';

export default class App extends Component {
  state = {
    searchSubstring: localStorage.getItem('rs-react-app') ?? '',
  };

  setSearchSubstring = (value: string): void => {
    this.setState({ searchSubstring: value });
    localStorage.setItem('rs-react-app', value);
  };

  render() {
    return (
      <>
        <Header
          searchSubstring={this.state.searchSubstring}
          setSearchSubstring={this.setSearchSubstring}
        ></Header>
        <ErrorBoundary searchSubstring={this.state.searchSubstring}>
          <Content searchSubstring={this.state.searchSubstring}></Content>
        </ErrorBoundary>
      </>
    );
  }
}
