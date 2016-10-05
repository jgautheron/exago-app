/*  global Choose, When, Otherwise */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import TimeAgo from 'react-timeago';
import { asyncConnect } from 'redux-connect';
import { set, isCached, load, refresh, clear } from 'redux/modules/repository';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AlertError from 'material-ui/svg-icons/alert/error';
import AlertErrorOutline from 'material-ui/svg-icons/alert/error-outline';
import HardwareKeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ActionCached from 'material-ui/svg-icons/action/cached';


import { palette } from '../../theme';

import {
  ProjectHeader,
  ProjectCardList,
  ProjectLoadingScreen,
  ProjectChartList,
  ProjectFileList,
  ProjectBadge,
  ProjectError,
  ProjectShare
} from 'components';

import styles from './Project.css';

@asyncConnect([{
  // eslint-disable-next-line react/prop-types
  promise: ({ params, store: { dispatch, getState } }) => {
    const repositoryName = params.splat;
    const repository = getState().repository;

    // If the repository is not the current one (what we want)
    if (repositoryName !== repository.name) {
      dispatch(clear());
      dispatch(set(repositoryName));
    }

    if (__SERVER__) {
      return dispatch(isCached(repositoryName)).then((res) => {
        if (res.data === true) {
          return dispatch(load(repositoryName));
        }
        return Promise.reject();
      });
    }
    return Promise.reject();
  }
}])
@connect(
  state => ({
    repository: state.repository
  }),
  { load, refresh, clear }
)
export default class Project extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    refresh: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
  };

  state = {
    showDetails: false,
    showBadges: false
  };

  componentDidMount() {
    if (!this.props.repository.loaded) {
      this.props.load(this.props.repository.name);
    }
  }

  getLoadingDuration() {
    const executionTime = this.props.repository.results.execution_time;
    if (!executionTime) {
      return 0;
    }
    return parseInt(executionTime, 10);
  }

  hasProcessingError() {
    const { results } = this.props.repository;
    if (results.hasOwnProperty('errors') && Object.keys(results.errors).length > 0) {
      return true;
    }

    let hasError = false;
    Object.keys(results.projectrunner).forEach(item => {
      if (results.projectrunner[item].error !== null) {
        hasError = true;
      }
    });
    return hasError;
  }

  refreshRepository = () => {
    this.props.refresh(this.props.repository.name);
  }

  showDetails = () => {
    this.setState({
      showDetails: true
    });
  }

  render() {
    const buttonStyle = {
      height: 50,
      width: '100%'
    };

    const labelStyle = {
      color: palette.alternateTextColor,
      fontSize: 20,
      fontWeight: 400,
      letterSpacing: 0.5,
      WebkitFontSmoothing: 'antialiased'
    };

    const tooltipStyle = {
      zIndex: 500
    };

    const bigIconStyle = {
      width: 48,
      height: 48
    };

    const { repository } = this.props;

    const title = `Code quality report for ${this.props.repository.name}`;

    return (
      <div>
        <Helmet
          title={title}
          meta={[
            { property: 'og:title', content: title },
          ]}
        />
        <ProjectHeader repository={repository.name} />
        <Choose>
          <When condition={repository.loading}>
            <ProjectLoadingScreen duration={this.getLoadingDuration()} />
          </When>
          <When condition={repository.error}>
            <div className={styles.errorMessage}>
              <AlertError style={bigIconStyle} />
              <p className={styles.errorMessage__text}>
                Something went wrong!<br />
                {repository.error.message}
              </p>
            </div>
          </When>
          <Otherwise>
            <Choose>
              <When condition={this.hasProcessingError()}>
                <ProjectError
                  results={repository.results}
                />
              </When>
            </Choose>
            <div>
              <div className={styles.share}>
                <ProjectShare
                  repository={repository.name}
                  rank={repository.results.score.rank}
                />
              </div>
              <div className={styles.badge}>
                <ProjectBadge repository={repository.name} />
              </div>
              <div className={styles.update}>
                <span className={styles.update__text}>Updated <TimeAgo date={repository.results.last_update} /></span>
                <IconButton
                  tooltip="Refresh Statistics"
                  tooltipPosition="bottom-center"
                  style={tooltipStyle}
                  onClick={this.refreshRepository}
                >
                  <ActionCached color={palette.disabledColor} hoverColor={palette.textColor} />
                </IconButton>
              </div>
              <ProjectCardList data={repository.results} />
              <Choose>
                <When condition={this.state.showDetails}>
                  <ProjectChartList data={repository.results} />
                  <ProjectFileList data={repository.results} repository={repository.name} />
                </When>
                <Otherwise>
                  <Choose>
                    <When condition={this.hasProcessingError()}>
                      <RaisedButton
                        label="Oops, something went wrong"
                        style={buttonStyle}
                        labelStyle={labelStyle}
                        icon={<AlertErrorOutline />}
                        className={styles.buttonIcon}
                        primary
                        disabled
                      />
                    </When>
                    <Otherwise>
                      <RaisedButton
                        label="Explore"
                        backgroundColor={palette.primary1Color}
                        style={buttonStyle}
                        labelStyle={labelStyle}
                        icon={<HardwareKeyboardArrowRight />}
                        primary
                        onClick={this.showDetails}
                      />
                    </Otherwise>
                  </Choose>
                </Otherwise>
              </Choose>
            </div>
          </Otherwise>
        </Choose>
      </div>
    );
  }
}
