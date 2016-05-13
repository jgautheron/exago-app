import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import TimeAgo from 'react-timeago';
import { asyncConnect } from 'redux-async-connect';
import { isCached, load, refresh } from 'redux/modules/repository';

import RaisedButton from 'material-ui/lib/raised-button';
import IconButton from 'material-ui/lib/icon-button';
import HardwareKeyboardArrowRight from 'material-ui/lib/svg-icons/hardware/keyboard-arrow-right';
import ActionCached from 'material-ui/lib/svg-icons/action/cached';

import { palette } from '../../theme';
import * as config from '../../config';

import {ProjectHeader} from 'components';
import {ProjectCardList} from 'components';

import styles from './Project.css';

const createHandlers = function handlers(dispatch, repository) {
  const refreshOnClick = function onClick() {
    dispatch(refresh(repository));
  };
  return {
    refreshOnClick,
  };
};

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const repository = getState().repository;
    if (__SERVER__) {
      return dispatch(isCached(repository)).then((res) => {
        if (res.data === true) {
          return dispatch(load(repository));
        }
      });
    }
  }
}])
@connect(
  state => ({
    repository: state.repository,
    results: state.repository.results,
    loading: state.repository.loading
  }), {refresh})
export default class Project extends Component {
  static propTypes = {
    repository: PropTypes.object.isRequired,
    results: PropTypes.object,
    loading: PropTypes.bool
  };

  constructor(props) {
    super(props);
    const { dispatch } = this.props; // eslint-disable-line react/prop-types
    this.handlers = createHandlers(dispatch, this.props.repository);
    if (!this.props.repository.loaded) {
      dispatch(load(this.props.repository));
    }
  }

  render() {
    const buttonStyle = {
      height: '50px'
    };
    const labelStyle = {
      color: palette.alternateTextColor,
      fontSize: '20px',
      fontWeight: 400,
      letterSpacing: '0.5px',
      WebkitFontSmoothing: 'antialiased'
    };
    const tooltipStyle = {
      zIndex: 500
    };
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
            <div className={styles.badge}>
              <img src={`http://${config.apiHost}:${config.apiPort}/badge/${this.props.repository.name}`} />
            </div>
            <div className={styles.update}>
              <span className={styles.update__text}>Updated <TimeAgo date={this.props.results.date} /></span>
              <IconButton tooltip="Refresh Statistics" tooltipPosition="bottom-center" style={tooltipStyle} onClick={this.handlers.refreshOnClick}>
                <ActionCached color={palette.disabledColor} hoverColor={palette.textColor}/>
              </IconButton>
            </div>
            <ProjectCardList data={this.props.results} />
            <RaisedButton
              label="Explore"
              backgroundColor={palette.primary1Color}
              style={buttonStyle}
              labelStyle={labelStyle}
              icon={<HardwareKeyboardArrowRight />}
              primary
              fullWidth />
          </div>
        }
      </div>
    );
  }
}
