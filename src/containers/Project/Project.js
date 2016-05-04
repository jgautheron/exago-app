import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { asyncConnect } from 'redux-async-connect';
import { isCached, load } from 'redux/modules/repository';

import {ProjectHeader} from 'components';
import {ProjectCard} from 'components';

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
  getAverageLines() {
    const data = this.props.repository.data.data;
    let out = data.codestats.LOC;
    out += ' / ';
    out += data.codestats.LOC / data.codestats.NOF;
    return out;
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
            <ProjectCard title="Total/Average Lines" value={this.getAverageLines()} />
            <ProjectCard title="Ratio LOC/CLOC" value="1.371" />
            <ProjectCard title="Third Parties" value="1" />
            <ProjectCard title="Checklist Compliance" value="7 / 11" />
            <ProjectCard title="Tests" value="24" />
            <ProjectCard title="Test Coverage" value="24" />
            <ProjectCard title="Test Duration" value="0.289s" />
            <ProjectCard title="Project Rating" value="B" />
          </div>
        }
      </div>
    );
  }
}
