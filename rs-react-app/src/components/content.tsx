import { Component } from 'react';

type ContentProps = {
  searchSubstring: string;
};

class Content extends Component<ContentProps> {
  render() {
    const { searchSubstring } = this.props;
    return <main className="content">{searchSubstring}</main>;
  }
}

export default Content;
