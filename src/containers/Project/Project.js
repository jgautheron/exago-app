/*  global If, Choose, When, Otherwise */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import TimeAgo from 'react-timeago';
import { asyncConnect } from 'redux-connect';
import { set, isCached, load, refresh, clear } from 'redux/modules/repository';

import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import AlertError from 'material-ui/svg-icons/alert/error';
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
  ProjectShare
} from 'components';

import styles from './Project.css';

@asyncConnect([{
  // eslint-disable-next-line react/prop-types
  promise: ({ params, store: { dispatch, getState } }) => {
    console.log('asyncConnect', params);
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
    const executionTime = this.props.repository.executionTime;
    if (!executionTime) {
      return 0;
    }
    return parseInt(executionTime, 10);
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
    const repositoryName = repository.name;
    const title = `Code quality report for ${repositoryName}`;

    return (
      <div>
        <Helmet
          title={title}
          meta={[
            { property: 'og:title', content: title },
          ]}
        />
        <ProjectHeader repository={repositoryName} />
        <Choose>
          <When condition={repository.loading}>
            <ProjectLoadingScreen duration={this.getLoadingDuration()} />
          </When>
          <When condition={repository.error}>
            <div className={styles.errorMessage}>
              <AlertError style={bigIconStyle} />
              <p className={styles.errorMessage__text}>
                Something went wrong.<br />
                <pre>{repository.error.message}</pre>
              </p>
            </div>
          </When>
          <Otherwise>
            <div>
              <div className={styles.share}>
                <ProjectShare
                  repository={repositoryName}
                  rank={repository.results.score.rank}
                />
              </div>
              <div className={styles.badge}>
                <ProjectBadge repository={repositoryName} />
              </div>
              <div className={styles.update}>
                <span className={styles.update__text}>Updated <TimeAgo date={repository.lastUpdate} /></span>
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
                  <ProjectFileList data={repository.results} repository={repositoryName} />
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
            </div>
          </Otherwise>
        </Choose>
      </div>
    );
  }
}
