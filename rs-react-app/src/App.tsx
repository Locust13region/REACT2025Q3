import { Component } from 'react';
import Header from '@/components/header';
import Content from '@/components/content';
import './App.css';

class App extends Component {
  state = {
    searchSubstring: '',
  };
  render() {
    return (
      <>
        <Header></Header>
        <Content></Content>
      </>
    );
  }
}

export default App;
