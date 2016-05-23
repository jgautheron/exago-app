/*  global Choose, When, Otherwise */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import CodeMirror from 'react-codemirror';

import { ProjectHeader } from 'components';
import AlertError from 'material-ui/svg-icons/alert/error';

import { loadFile } from 'redux/modules/repository';

import styles from './File.css';

@connect(
  state => ({
    repository: state.repository,
    loading: state.repository.loading
  }), {
    loadFile
  })
export default class Project extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    loadFile: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  state = {
    code: ''
  };

  componentWillMount = () => {
    const url = this.props.params.splat;
    this.props.loadFile(url).then((res) => {
      this.state.code = res.data;
    });
  }

  render() {
    const bigIconStyle = {
      width: 48,
      height: 48
    };
    const options = {
      readOnly: true
    };
    return (
      <div>
        <Helmet title={`See the linter warnings for ${this.props.repository.name}`} />
        <ProjectHeader repository={this.props.repository.name} />
        <Choose>
          <When condition={this.props.loading}>
            Loading...
          </When>
          <When condition={this.props.repository.error}>
            <div className={styles.errorMessage}>
              <AlertError style={bigIconStyle} />
              <p className={styles.errorMessage__text}>
                Something went wrong!<br />
                {this.props.repository.error.message}
              </p>
            </div>
          </When>
          <Otherwise>
            <div>
              <CodeMirror value={this.state.code} options={options} />
            </div>
          </Otherwise>
        </Choose>
      </div>
    );
  }
}
