/*  global If */

import React, { Component, PropTypes } from 'react';
import {
  ProjectChartCodeCoverage,
  ProjectChartTestDuration,
  ProjectChartLinterWarnings,
  ProjectChartScoreSpider,
} from 'components';

import styles from './ProjectChartList.css';

export default class ProjectChartList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className={styles.row}>
          <If condition={data.projectrunner.packages.length > 1}>
            <div className={styles.card}>
              <ProjectChartCodeCoverage data={data} />
            </div>
            <div className={styles.card}>
              <ProjectChartTestDuration data={data} />
            </div>
          </If>
          <If condition={Object.keys(data.lintmessages).length}>
            <div className={styles.card}>
              <ProjectChartLinterWarnings data={data} />
            </div>
          </If>
          <div className={styles.card}>
            <ProjectChartScoreSpider data={data} />
          </div>
        </div>

      </div>
    );
  }
}
