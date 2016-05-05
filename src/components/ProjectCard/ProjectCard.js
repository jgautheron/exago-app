import React, { Component, PropTypes } from 'react';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

export default class ProjectCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  };
  render() {
    return (
      <Card>
        <CardHeader
          title={this.props.title}
        />
        <CardText>
          {this.props.value}
        </CardText>
      </Card>
    );
  }
}
