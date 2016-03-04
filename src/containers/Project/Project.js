import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

export default class Project extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired
  };
  componentDidMount() {
  }
  render() {
    const repository = this.props.params.splat;
    return (
      <div>
        <Helmet title={`Code Quality Report for ${repository}`}/>
        <h1>Project</h1>
      </div>
    );
  }
}
