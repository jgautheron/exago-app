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
import * as formatter from './dataFormatter';
import * as html from './detailHtml';

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
    results: state.repository.results,
    loading: state.repository.loading
  })
)
export default class Project extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired,
    results: PropTypes.object,
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
    const res = this.props.results;
    const {
      coverageMean,
      durationMean,
      testsPassed,
    } = formatter.getTestResults(res);

    this.info = {
      totalAvgLines: formatter.getAverageLines(res),
      ratioLocCloc: formatter.getRatioLines(res),
      thirdParties: formatter.getThirdParties(res),
      checklistCompliance: formatter.getChecklistCompliance(res),
      tests: formatter.getTestsCount(res),
      testsPassed: testsPassed,
      testCoverage: coverageMean,
      testDuration: durationMean,
      rating: formatter.getRank(res)
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
    const tooltipStyle = {
      zIndex: 500
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
              <IconButton tooltip="Refresh Statistics" tooltipPosition="bottom-center" style={tooltipStyle}>
                <ActionCached color={palette.disabledColor} hoverColor={palette.textColor}/>
              </IconButton>
            </div>
            <div className={styles.row}>
              {Object.keys(this.cards).map(key =>
                <div className={styles.card}>
                  <ProjectCard title={key} value={this.cards[key]}>
                    {(() => {
                      switch (key) {
                        case 'Third Parties':
                          return html.getThirdParties(this.props.results);
                        case 'Checklist Compliance':
                          return html.getChecklist(this.props.results);
                        default:
                          return '';
                      }
                    })()}
                  </ProjectCard>
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
