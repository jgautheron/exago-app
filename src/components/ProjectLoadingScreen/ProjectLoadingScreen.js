import React, { Component, PropTypes } from 'react';
import LinearProgress from 'material-ui/LinearProgress';

import { palette } from '../../theme';
import styles from './ProjectLoadingScreen.css';

export default class ProjectLoadingScreen extends Component {
  static propTypes = {
    duration: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      completed: 0,
    };

    // Consider a 20% error margin
    if (this.props.duration) {
      this.duration = parseInt(this.props.duration * 1.20, 10);
    }
  }

  componentDidMount() {
    this.timer = setTimeout(() => this.progress(1), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    if (completed > this.duration) {
      this.setState({ completed: this.duration });
    } else {
      this.setState({ completed });
      this.timer = setTimeout(() => this.progress(completed + 1), 1000);
    }
  }

  render() {
    const progressBarStyles = {
      height: 8,
      backgroundColor: palette.primary2Color
    };
    return (
      <div>
        {this.props.duration ?
          <div>
            <LinearProgress mode="determinate" value={this.state.completed} max={this.duration} style={progressBarStyles} />
            <p className={styles.text}>
              Please wait while we’re crunching the data, this should take approximately <b>{this.duration}s</b>
            </p>
          </div>
          :
          <div>
            <LinearProgress mode="indeterminate" style={progressBarStyles} />
            <p className={styles.text}>Please wait while we’re crunching the data…</p>
          </div>
        }
      </div>
    );
  }
}
