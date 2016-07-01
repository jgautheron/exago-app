import React, { Component, PropTypes } from 'react';

import { ProjectCard } from 'components';
import * as formatter from './dataFormatter';
import * as html from './popoverHtml';
import * as constants from './constants';

import styles from './ProjectCardList.css';

export default class ProjectCardList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.prepareData(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    this.prepareData(nextProps.data);
  }

  prepareData(res) {
    const {
      coverageMean,
      durationMean,
      testsPassed, // eslint-disable-line no-unused-vars
    } = formatter.getTestResults(res);

    this.cards = {};
    this.cards[constants.TOTAL_AVG_LOC] = formatter.getAverageLines(res);
    this.cards[constants.RATIO_LOC_CLOC] = formatter.getRatioLines(res);
    this.cards[constants.THIRD_PARTIES] = formatter.getThirdParties(res);
    this.cards[constants.CHECKLIST_COMPLIANCE] = formatter.getChecklistCompliance(res);
    this.cards[constants.TESTS] = formatter.getTestsCount(res);
    this.cards[constants.CODE_COVERAGE] = coverageMean;
    this.cards[constants.TEST_DURATION] = durationMean;
    this.cards[constants.RATING] = formatter.getRank(res);
  }

  render() {
    const rawTestOutput = this.props.data.testresults.raw_output.gotest;

    return (
      <div className={styles.row}>
        {Object.keys(this.cards).map((key, id) =>
          <div className={styles.card} key={id}>
            {(() => {
              switch (key) {
                case constants.THIRD_PARTIES:
                  return (
                    <ProjectCard title={key} value={this.cards[key]}>
                      {html.getThirdParties(this.props.data)}
                    </ProjectCard>
                  );

                case constants.CHECKLIST_COMPLIANCE:
                  return (
                    <ProjectCard title={key} value={this.cards[key]}>
                      {html.getChecklist(this.props.data)}
                    </ProjectCard>
                  );

                case constants.TESTS:
                  return (
                    <ProjectCard
                      title={key}
                      value={this.cards[key]}
                      extra={rawTestOutput === '' ? null : <pre>{rawTestOutput}</pre>}
                      extraTitle={'See raw output'}
                      extraTooltip={'Raw tests output'}
                    >
                      {html.getTestList(this.props.data)}
                    </ProjectCard>
                  );

                case constants.CODE_COVERAGE:
                  return (
                    <ProjectCard title={key} value={this.cards[key]}>
                      {html.getTestCoverage(this.props.data)}
                    </ProjectCard>
                  );

                case constants.TEST_DURATION:
                  return (
                    <ProjectCard title={key} value={this.cards[key]}>
                      {html.getTestDuration(this.props.data)}
                    </ProjectCard>
                  );

                case constants.RATING:
                  return (
                    <ProjectCard title={key} value={this.cards[key]}>
                      {html.getScoreDetails(this.props.data)}
                    </ProjectCard>
                  );

                default:
                  return (
                    <ProjectCard title={key} value={this.cards[key]}>
                    {''}
                    </ProjectCard>
                  );
              }
            })()}
          </div>
        )}
      </div>
    );
  }
}
