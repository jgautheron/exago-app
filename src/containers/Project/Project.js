import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import {ProjectHeader} from 'components';

@connect(
  state => ({
    repository: state.repository.name
  })
)
export default class Project extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired
  };
  render() {
    return (
      <div>
        <Helmet title={`Code Quality Report for ${this.props.repository}`}/>
        <ProjectHeader repository={this.props.repository} />
      </div>
    );
  }
}
