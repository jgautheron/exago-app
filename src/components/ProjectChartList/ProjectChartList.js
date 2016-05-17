import React, { Component, PropTypes } from 'react';
import { ProjectChartCoverage } from 'components';

import styles from './ProjectChartList.css';

export default class ProjectCharts extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <div className={styles.row}>
        <ProjectChartCoverage data={this.props.data} />
      </div>
    );
  }
}
