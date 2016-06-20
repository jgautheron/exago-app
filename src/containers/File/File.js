/*  global Choose, When, Otherwise */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import { ProjectHeader, ProjectLoadingScreen, ProjectCode } from 'components';
import AlertError from 'material-ui/svg-icons/alert/error';

import { github } from 'react-syntax-highlighter/dist/styles';

import { load, clear, set } from 'redux/modules/file';
import { isCached, load as loadRepo, clear as clearRepo, set as setRepo } from 'redux/modules/repository';

import styles from './File.css';

@asyncConnect([{
  // eslint-disable-next-line react/prop-types
  promise: ({ params, store: { dispatch, getState } }) => {
    const promises = [];
    const filePath = params.splat;
    const [provider, owner, repo] = filePath.split('/');
    const repoPath = `${provider}/${owner}/${repo}`;
    const repository = getState().repository;
    const file = getState().file;

    if (filePath !== file.filePath) {
      dispatch(clear());
      dispatch(set(filePath));
    }

    if (repoPath !== repository.name) {
      dispatch(clearRepo());
      dispatch(setRepo(repoPath));
    }

    if (__SERVER__) {
      return dispatch(isCached(repoPath)).then((res) => {
        if (res.data === true) {
          promises.push(dispatch(load(filePath)));
          promises.push(dispatch(loadRepo(repoPath)));
          return Promise.all(promises);
        }
        return Promise.reject();
      });
    }
    return Promise.reject();
  }
}])
@connect(
  state => ({
    file: state.file,
    repository: state.repository
  }), { load, loadRepo, clear, clearRepo }
)
export default class Project extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    file: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    loadRepo: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    clearRepo: PropTypes.func.isRequired
  };

  componentDidMount() {
    const {
      repository: { loaded: repoLoaded },
      file: { loaded: fileLoaded, repository, filePath }
    } = this.props;

    if (!repoLoaded) {
      this.props.loadRepo(repository);
    }
    if (!fileLoaded) {
      this.props.load(filePath);
    }
  }

  getLoadingDuration() {
    const executionTime = this.props.repository.results.executionTime;
    if (!executionTime) {
      return 0;
    }
    return parseInt(executionTime, 10);
  }

  render() {
    const bigIconStyle = {
      width: 48,
      height: 48
    };
    return (
      <div>
        <Helmet title={`See the linter warnings for ${this.props.file.repository}`} />
        <ProjectHeader repository={this.props.file.repository} />
        <Choose>
          <When condition={this.props.repository.loading}>
            <ProjectLoadingScreen duration={this.getLoadingDuration()} />
          </When>
          <When condition={this.props.file.loading}>
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
              <ProjectCode
                language="go"
                style={github}
                issues={this.props.repository.results.lintmessages[this.props.file.path]}
                source={this.props.file.contents}
              />
            </div>
          </Otherwise>
        </Choose>
      </div>
    );
  }
}
