import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import { isCached, load } from 'redux/modules/repository';

import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import HardwareKeyboardArrowRight from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right';
import ActionCached from 'material-ui/lib/svg-icons/action/cached';

import { palette } from '../../theme';

import {ProjectHeader} from 'components';
import {ProjectCard} from 'components';
import * as processor from './dataProcessor';

import styles from './Project.css';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    if (__SERVER__) {
      return dispatch(isCached(getState())).then((res) => {
        if (res.data === true) {
          return dispatch(load(getState()));
        }
      });
    }
  }
}])
@connect(
  state => ({
    repository: state.repository,
    loading: state.repository.loading
  })
)
export default class Project extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired,
    loading: PropTypes.bool
  };

  componentWillMount() {
    this.prepareData();
    this.cards = {
      'Total/Average Lines': this.info.totalAvgLines,
      'Ratio LOC/CLOC': this.info.ratioLocCloc,
      'Third Parties': this.info.thirdParties,
      'Checklist Compliance': this.info.checklistCompliance,
      'Tests': this.info.tests,
      'Test Coverage': this.info.testCoverage,
      'Test Duration': this.info.testDuration,
      'Project Rating': this.info.rating,
    };
  }

  static cards = {};
  static info = {};

  prepareData() {
    const res = this.props.repository.results;
    const {
      coverageMean,
      durationMean,
      testsPassed,
    } = processor.getTestResults(res);

    this.info = {
      totalAvgLines: processor.getAverageLines(res),
      ratioLocCloc: processor.getRatioLines(res),
      thirdParties: processor.getThirdParties(res),
      checklistCompliance: processor.getChecklistCompliance(res),
      tests: processor.getTestsCount(res),
      testsPassed: testsPassed,
      testCoverage: coverageMean,
      testDuration: durationMean,
      rating: processor.getRank(res)
    };
  }

  render() {
    const buttonStyle = {
      height: '50px'
    };
    const labelStyle = {
      color: palette.alternateTextColor,
      fontSize: '20px',
      fontWeight: 400,
      letterSpacing: '0.5px',
      WebkitFontSmoothing: 'antialiased'
    };
    const loading = (
      <div>Loading...</div>
    );
    return (
      <div>
        <Helmet title={`Code Quality Report for ${this.props.repository.name}`}/>
        <ProjectHeader repository={this.props.repository.name} />
        {
          this.props.loading ?
          loading :
          <div>
            <div className={styles.badge}>
              <img src={`http://localhost:8080/badge/${this.props.repository.name}`} />
            </div>
            <div className={styles.update}>
              <span className={styles.update__text}>Updated 2 days ago</span>
              <IconButton tooltip="Refresh Statistics">
                <ActionCached color={palette.disabledColor} hoverColor={palette.textColor}/>
              </IconButton>
            </div>
            <div className={styles.row}>
              {Object.keys(this.cards).map(key =>
                <div className={styles.card}>
                  <ProjectCard title={key} value={this.cards[key]} />
                </div>
              )}
            </div>
            <RaisedButton
              label="Explore"
              backgroundColor={palette.primary1Color}
              style={buttonStyle}
              labelStyle={labelStyle}
              icon={<HardwareKeyboardArrowRight />}
              primary
              fullWidth />
          </div>
        }
      </div>
    );
  }
}
