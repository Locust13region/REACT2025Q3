import { Component } from 'react';
import Header from '@/components/header';
import Content from '@/components/content';
import './App.css';

class App extends Component {
  state = {
    searchSubstring: '',
  };

  setSearchSubstring = (value: string): void => {
    this.setState({ searchSubstring: value });
    localStorage.setItem('rs-react-app', value);
  };

  componentDidMount(): void {
    const restoredSearch = localStorage.getItem('rs-react-app');
    if (restoredSearch) {
      this.setState({ searchSubstring: restoredSearch });
    } else {
      localStorage.removeItem('rs-react-app');
    }
  }

  render() {
    return (
      <>
        <Header
          searchSubstring={this.state.searchSubstring}
          setSearchSubstring={this.setSearchSubstring}
        ></Header>
        <Content searchSubstring={this.state.searchSubstring}></Content>
      </>
    );
  }
}

export default App;
