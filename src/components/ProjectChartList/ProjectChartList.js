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

  hasMoreThanOnePackage() {
    const { data } = this.props;
    if (!data.projectrunner.coverage.data.packages) {
      return false;
    }
    return data.projectrunner.coverage.data.packages.length > 1;
  }

  hasLintMessages() {
    const { data } = this.props;
    return Object.keys(data.lintmessages).length;
  }

  render() {
    const { data } = this.props;
    return (
      <div>
        <div className={styles.row}>
          <If condition={this.hasMoreThanOnePackage()}>
            <div className={styles.card}>
              <ProjectChartCodeCoverage data={data} />
            </div>
            <div className={styles.card}>
              <ProjectChartTestDuration data={data} />
            </div>
          </If>
          <If condition={this.hasLintMessages()}>
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
