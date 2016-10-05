import React, { Component, PropTypes } from 'react';
import styles from './ProjectHeader.css';

import IconButton from 'material-ui/IconButton';
import ContentLink from 'material-ui/svg-icons/content/link';

export default class ProjectHeader extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired
  };
  render() {
    return (
      <div className={styles.root}>
        <IconButton
          href={`https://${this.props.repository}`}
          target="_blank"
          style={{ float: 'left' }}
        >
          <ContentLink />
        </IconButton>
        <h1 style={{ float: 'left' }}>{this.props.repository}</h1>
        <br style={{ clear: 'left' }} />
      </div>
    );
  }
}
