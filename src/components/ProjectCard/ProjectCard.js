import React, { Component, PropTypes } from 'react';
import styles from './ProjectCard.css';

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
    const titleStyle = {
      fontWeight: 300,
      fontSize: '26px',
      margin: '0 0 20px 0'
    };
    return (
      <Card>
        <CardHeader
          title={this.props.title}
          titleStyle={titleStyle}
        />
        <CardText>
          <span className={styles.text}>{this.props.value}</span>
        </CardText>
      </Card>
    );
  }
}
