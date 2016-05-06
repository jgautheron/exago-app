import React, { Component, PropTypes } from 'react';
import styles from './ProjectHeader.css';

export default class ProjectHeader extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired
  };
  render() {
    return (
      <div className={styles.root}>
        <h1>{this.props.repository}</h1>
      </div>
    );
  }
}
