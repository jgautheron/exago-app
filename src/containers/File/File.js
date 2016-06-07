/*  global Choose, When, Otherwise */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import { ProjectHeader } from 'components';
import AlertError from 'material-ui/svg-icons/alert/error';

import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/styles';

import { load, clear } from 'redux/modules/file';

import styles from './File.css';

@asyncConnect([{
  // eslint-disable-next-line react/prop-types
  promise: ({ store: { dispatch, getState } }) => {
    const file = getState().file;
    if (__SERVER__) {
      return dispatch(load(file));
    }
    return Promise.reject();
  }
}])
@connect(
  state => ({
    file: state.file,
    repository: state.file.repository,
    contents: state.file.contents,
    loading: state.file.loading
  }), {
    load, clear
  })
export default class Project extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    repository: PropTypes.string.isRequired,
    contents: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    load: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired
  };

  componentDidMount() {
    if (!this.props.file.loaded) {
      this.props.load(this.props.file);
    }
  }

  componentWillUnmount() {
    this.props.clear();
  }

  render() {
    const bigIconStyle = {
      width: 48,
      height: 48
    };
    return (
      <div>
        <Helmet title={`See the linter warnings for ${this.props.repository}`} />
        <ProjectHeader repository={this.props.repository} />
        <Choose>
          <When condition={this.props.loading}>
            Loading...
          </When>
          <When condition={this.props.file.error}>
            <div className={styles.errorMessage}>
              <AlertError style={bigIconStyle} />
              <p className={styles.errorMessage__text}>
                Something went wrong!<br />
                {this.props.file.error.message}
              </p>
            </div>
          </When>
          <Otherwise>
            <div>
              <SyntaxHighlighter language="go" style={github}>{this.props.file.contents}</SyntaxHighlighter>
            </div>
          </Otherwise>
        </Choose>
      </div>
    );
  }
}
