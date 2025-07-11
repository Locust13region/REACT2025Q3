import { Component } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { HeaderProps } from '@/types/types';

export default class Header extends Component<HeaderProps> {
  state = {
    inputValue: this.props.searchSubstring,
  };

  componentDidUpdate(prevProps: Readonly<HeaderProps>) {
    if (prevProps.searchSubstring !== this.props.searchSubstring) {
      this.setState({ inputValue: this.props.searchSubstring });
    }
  }

  handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.setSearchSubstring(this.state.inputValue);
  };

  render() {
    return (
      <header className="header">
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="searchInput">Find items</label>
          <input
            type="search"
            name="searchInput"
            value={this.state.inputValue}
            onChange={this.handleInputChange}
          />
          <button type="submit">Search</button>
        </form>
      </header>
    );
  }
}
