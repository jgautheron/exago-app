/*  global If, Choose, When, Otherwise */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import TimeAgo from 'react-timeago';
import { asyncConnect } from 'redux-connect';
import { set, load, clear, process } from 'redux/modules/repository';

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
    const repositoryName = `${params.host}/${params.owner}/${params.name}`;
    const repository = getState().repository;

    // If the repository is not the current one (what we want)
    if (repositoryName !== repository.name) {
      dispatch(clear());
      dispatch(set(repositoryName, params.branch, params.goversion));
    }

    return dispatch(load(repositoryName, params.branch, params.goversion));
  }
}])
@connect(
  state => ({
    repository: state.repository
  }),
  { load, clear, process }
)
export default class Project extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    repository: PropTypes.object.isRequired,
    load: PropTypes.func.isRequired,
    clear: PropTypes.func.isRequired,
    process: PropTypes.func.isRequired,
  };

  static childContextTypes = {
    params: PropTypes.object,
  };

  state = {
    showDetails: false,
    showBadges: false
  };

  getChildContext() {
    return {
      params: this.props.params,
    };
  }

  componentDidMount() {
    if (!this.props.repository.loaded) {
      this.processRepository();
    }
  }

  getLoadingDuration() {
    const executionTime = this.props.repository.executionTime;
    if (!executionTime) {
      return 0;
    }
    return parseInt(executionTime, 10);
  }

  processRepository = () => {
    const { repository: { name }, params: { branch, goversion } } = this.props;
    this.props.process(name, branch, goversion).then(
      () => this.props.load(name, branch, goversion)
    );
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
        <ProjectHeader
          repository={repositoryName}
          branch={repository.branch}
          goversion={repository.goversion}
        />
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
                <ProjectBadge
                  repository={repositoryName}
                  branch={repository.branch}
                  goversion={repository.goversion}
                />
              </div>
              <div className={styles.update}>
                <span className={styles.update__text}>Updated <TimeAgo date={repository.lastUpdate} /></span>
                <IconButton
                  tooltip="Refresh Statistics"
                  tooltipPosition="bottom-center"
                  style={tooltipStyle}
                  onClick={this.processRepository}
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
