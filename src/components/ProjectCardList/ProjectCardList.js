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
    const rawTestOutput = this.props.data.projectrunner.test.raw_output;

    const SPECIFIC_PROPS = {
      [constants.TOTAL_AVG_LOC]: {
        explanation: 'If your AVG LOC per file is high, it\'s a sign that the separation of concepts might not be optimum',
      },
      [constants.RATIO_LOC_CLOC]: {
        explanation: 'A well-commented code increases maintainability',
      },
      [constants.THIRD_PARTIES]: {
        explanation: 'Third parties are like moving foundations, having too much of them impacts stability'
      },
      [constants.CHECKLIST_COMPLIANCE]: {
        explanation: 'A project that scores well at the Go Checklist is a sign that its author cares',
      },
      [constants.TESTS]: {
        extra: rawTestOutput === '' ? null : <pre>{rawTestOutput}</pre>,
        extraTitle: 'See raw output',
        extraTooltip: 'Raw tests output',
        explanation: 'How many tests your project contains',
      },
      [constants.CODE_COVERAGE]: {
        explanation: 'The better the coverage, the less the uncertainty',
      },
      [constants.TEST_DURATION]: {
        explanation: 'The faster tests can be executed, the better the coverage',
      },
    };

    return (
      <div className={styles.row}>
        {Object.keys(this.cards).map((key, id) =>
          <div className={styles.card} key={id}>
            <ProjectCard title={key} value={this.cards[key]} {...SPECIFIC_PROPS[key]}>
              {(() => {
                switch (key) {
                  case constants.THIRD_PARTIES:
                    return html.getThirdParties(this.props.data);

                  case constants.CHECKLIST_COMPLIANCE:
                    return html.getChecklist(this.props.data);

                  case constants.TESTS:
                    return html.getTestList(this.props.data);

                  case constants.CODE_COVERAGE:
                    return html.getTestCoverage(this.props.data);

                  case constants.TEST_DURATION:
                    return html.getTestDuration(this.props.data);

                  case constants.RATING:
                    return html.getScoreDetails(this.props.data);

                  default:
                    return '';
                }
              })()}
            </ProjectCard>
          </div>
        )}
      </div>
    );
  }
}
