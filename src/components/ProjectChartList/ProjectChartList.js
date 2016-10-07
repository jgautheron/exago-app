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

  hasMoreThanOneTestedPackage() {
    const { data, data: { projectrunner: { coverage } } } = this.props;
    if (data.codestats.Test === 0) {
      return false;
    }
    if (!data.projectrunner.coverage.data.packages.length) {
      return false;
    }

    let i;
    let testedPackages = 0;
    for (i = 0; i < coverage.data.packages.length; i++) {
      if (coverage.data.packages[i].coverage > 0) {
        testedPackages++;
      }
    }
    return testedPackages > 1;
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
          <If condition={this.hasMoreThanOneTestedPackage()}>
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
