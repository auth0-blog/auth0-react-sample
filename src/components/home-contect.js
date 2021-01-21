import React from "react";

class HomeContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange() {
    this.setState({ status: !this.state.status }, this.updateLibraryCount);
  }

  render() {
    return <div>HomeContent</div>;
  }
}

export default HomeContent;
