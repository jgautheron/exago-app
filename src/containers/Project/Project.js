import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import { isCached, load } from 'redux/modules/repository';

import {ProjectHeader} from 'components';
import {ProjectCard} from 'components';
import * as processor from './dataProcessor';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    if (__SERVER__) {
      return dispatch(isCached(getState())).then(() =>
        dispatch(load(getState()))
      );
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
  }

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
            <ProjectCard title="Total/Average Lines" value={this.info.totalAvgLines} />
            <ProjectCard title="Ratio LOC/CLOC" value={this.info.ratioLocCloc} />
            <ProjectCard title="Third Parties" value={this.info.thirdParties} />
            <ProjectCard title="Checklist Compliance" value={this.info.checklistCompliance} />
            <ProjectCard title="Tests" value={this.info.tests} />
            <ProjectCard title="Test Coverage" value={this.info.testCoverage} />
            <ProjectCard title="Test Duration" value={this.info.testDuration} />
            <ProjectCard title="Project Rating" value={this.info.rating} />
          </div>
        }
      </div>
    );
  }
}
