// eslint-disable-next-line
import React, { Component , PropTypes } from 'react';
import styles from './ProjectCardScoreColor.css';

export default class ProjectCardTitle extends Component {
  static propTypes = {
    score: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ])
  }

  render() {
    if (this.props.score === false) {
      return null;
    }
    // hsl - HUE - saturation - lightness
    return (
      <div
        style={{ backgroundColor: `hsl(${this.props.score}, 60%, 50%)` }}
        className={styles.wrapper}
      />
    );
  }
}
