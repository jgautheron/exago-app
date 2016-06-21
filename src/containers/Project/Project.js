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
  ProjectError
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
    if (this.props.repository.results.testresults.hasOwnProperty('error')) {
      return true;
    }

    return false;
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

    return (
      <div>
        <Helmet title={`Code Quality Report for ${this.props.repository.name}`} />
        <ProjectHeader repository={this.props.repository.name} />
        <Choose>
          <When condition={this.props.repository.loading}>
            <ProjectLoadingScreen duration={this.getLoadingDuration()} />
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
            <Choose>
              <When condition={this.hasProcessingError()}>
                <ProjectError {...this.props.repository.results.testresults} />
              </When>
            </Choose>
            <div>
              <div className={styles.badge}>
                <ProjectBadge repository={this.props.repository.name} />
              </div>
              <div className={styles.update}>
                <span className={styles.update__text}>Updated <TimeAgo date={this.props.repository.results.last_update} /></span>
                <IconButton
                  tooltip="Refresh Statistics"
                  tooltipPosition="bottom-center"
                  style={tooltipStyle}
                  onClick={this.refreshRepository}
                >
                  <ActionCached color={palette.disabledColor} hoverColor={palette.textColor} />
                </IconButton>
              </div>
              <ProjectCardList data={this.props.repository.results} />
              <Choose>
                <When condition={this.state.showDetails}>
                  <ProjectChartList data={this.props.repository.results} />
                  <ProjectFileList data={this.props.repository.results} repository={this.props.repository.name} />
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
