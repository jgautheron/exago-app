import React, { Component, PropTypes } from 'react';

import { ProjectCard } from 'components';
import IconButton from 'material-ui/IconButton';
import ActionDone from 'material-ui/svg-icons/action/done';
import ActionClock from 'material-ui/svg-icons/action/watch-later';
import ContentClear from 'material-ui/svg-icons/content/clear';

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

  getCardValue(res, name) {
    const timeoutClock = <ActionClock style={{ width: 48, height: 48 }} />;
    let contents = {};
    switch (name) {
      case constants.TOTAL_AVG_LOC: {
        let value = formatter.getAverageLines(res);
        if (this.taskDidTimeout(res, name)) {
          value = timeoutClock;
        }
        contents = {
          value,
        };
        break;
      }
      case constants.RATIO_LOC_CLOC: {
        let value = formatter.getRatioLines(res);
        if (this.taskDidTimeout(res, name)) {
          value = timeoutClock;
        }
        contents = {
          value,
        };
        break;
      }
      case constants.THIRD_PARTIES: {
        let value = formatter.getThirdParties(res);
        if (this.taskDidTimeout(res, name)) {
          value = timeoutClock;
        }
        contents = {
          value,
          popover: html.getThirdParties(res),
        };
        break;
      }
      case constants.CHECKLIST_COMPLIANCE: {
        let value = formatter.getChecklistCompliance(res);
        if (this.taskDidTimeout(res, name)) {
          value = timeoutClock;
        }
        contents = {
          value,
          popover: html.getChecklist(res),
        };
        break;
      }
      case constants.TESTS: {
        const passedIcon = <IconButton tooltip="Congrats! All tests passed"><ActionDone /></IconButton>;
        const failedIcon = <IconButton tooltip="Oops! At least one test failed"><ContentClear /></IconButton>;
        let value = (
          <span>
            {formatter.getTestsCount(res)}
            {this.testResults.testsPassed ? passedIcon : failedIcon}
          </span>
        );
        if (this.taskDidTimeout(res, name)) {
          value = timeoutClock;
        }
        contents = {
          value,
          popover: html.getTestList(res),
        };
        break;
      }
      case constants.CODE_COVERAGE: {
        let value = this.testResults.coverageMean;
        if (this.taskDidTimeout(res, name)) {
          value = timeoutClock;
        }
        contents = {
          value,
          popover: html.getTestCoverage(res),
        };
        break;
      }
      case constants.TEST_DURATION: {
        let value = this.testResults.durationMean;
        if (this.taskDidTimeout(res, name)) {
          value = timeoutClock;
        }
        contents = {
          value,
          popover: html.getTestDuration(res),
        };
        break;
      }
      case constants.RATING: {
        let value = formatter.getRank(res);
        if (res.errors && Object.keys(res.errors).length > 0) {
          value = '';
        }
        contents = {
          value,
          popover: html.getScoreDetails(this.props.data),
        };
        break;
      }
      default:
        // do nothing
    }
    return contents;
  }

  taskDidTimeout(res, name) {
    switch (name) {
      case constants.THIRD_PARTIES:
      case constants.CHECKLIST_COMPLIANCE:
      case constants.CODE_COVERAGE:
      case constants.TEST_DURATION:
        return res.errors && res.errors.hasOwnProperty('projectrunner') &&
          res.errors.projectrunner === 'The analysis timed out';
      case constants.TOTAL_AVG_LOC:
      case constants.RATIO_LOC_CLOC:
      case constants.TESTS:
        return res.errors && res.errors.hasOwnProperty('codestats') &&
          res.errors.codestats === 'The analysis timed out';
      default:
        // do nothing
    }
    return false;
  }

  prepareData(res) {
    this.testResults = formatter.getTestResults(res);

    this.cards = {};
    Object.keys(constants).forEach(constant => {
      const cardTitle = constants[constant];
      this.cards[cardTitle] = this.getCardValue(res, cardTitle);
    });
  }

  render() {
    const rawTestOutput = this.props.data.projectrunner.raw_output.gotest;

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
            <ProjectCard title={key} value={this.cards[key].value} {...SPECIFIC_PROPS[key]}>
              {this.cards[key].popover}
            </ProjectCard>
          </div>
        )}
      </div>
    );
  }
}
