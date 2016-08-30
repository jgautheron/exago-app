import React, { Component, PropTypes } from 'react';
import { CardTitle } from 'material-ui/Card';

export default class ProjectCardTitle extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    const titleStyle = {
      fontWeight: 300,
      fontSize: 26,
      margin: '0 0 20px 0'
    };
    return (
      <CardTitle
        title={this.props.title}
        titleStyle={titleStyle}
      />
    );
  }
}
