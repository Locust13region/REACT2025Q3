import { Component } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { HeaderProps } from '@/types/types';

export default class Header extends Component<HeaderProps> {
  state = {
    inputValue: this.props.searchSubstring,
  };

  componentDidMount(): void {
    const restoredSearch = localStorage.getItem('rs-react-app');
    if (restoredSearch) {
      this.setState({ inputValue: restoredSearch });
      this.props.setSearchSubstring(restoredSearch);
    } else {
      localStorage.removeItem('rs-react-app');
    }
  }

  componentDidUpdate(prevProps: Readonly<HeaderProps>) {
    if (
      prevProps.searchSubstring !== this.props.searchSubstring &&
      this.state.inputValue !== this.props.searchSubstring
    ) {
      this.setState({ inputValue: this.props.searchSubstring });
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.setSearchSubstring(this.state.inputValue.trim());
  };

  render() {
    return (
      <header className="header">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="searchInput">Find items</label>
          <input
            type="search"
            id="searchInput"
            name="searchInput"
            value={this.state.inputValue}
            onInput={this.handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </header>
    );
  }
}
