import React, { Component, PropTypes } from 'react';

export default class ProjectHeader extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired
  };
  render() {
    return (
      <div>
        <h1>Project {this.props.repository}</h1>
      </div>
    );
  }
}
