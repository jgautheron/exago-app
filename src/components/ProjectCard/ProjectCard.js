/*  global Choose, When, Otherwise */

import React, { Component, PropTypes } from 'react';
import styles from './ProjectCard.css';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new';
import AlertError from 'material-ui/svg-icons/alert/error';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { palette } from '../../theme';

export default class ProjectCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    extraTitle: PropTypes.string,
    extraTooltip: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    extra: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ])
  };

  state = {
    open: false,
    openExtra: false,
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom',
    },
    targetOrigin: {
      horizontal: 'right',
      vertical: 'center',
    },
  };

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleExtraTouchTap = (event) => {
    this.setState({
      openExtra: true,
      anchorEl: event.currentTarget,
    });
  }

  closeDialog = () => {
    this.setState({
      open: false,
    });
  }

  closeExtraDialog = () => {
    this.setState({
      openExtra: false,
    });
  }

  render() {
    const titleStyle = {
      fontWeight: 300,
      fontSize: 26,
      margin: '0 0 20px 0'
    };
    const errorIconStyle = {
      width: 48,
      height: 48
    };

    return (
      <Card className={styles.container}>
        <CardTitle
          title={this.props.title}
          titleStyle={titleStyle}
        />
        <Choose>
          <When condition={this.props.children}>
            <div className={styles.childrenContainer}>
              <Dialog
                title={this.props.title}
                autoScrollBodyContent
                actions={
                  <FlatButton
                    label="Discard"
                    primary
                    onTouchTap={this.closeDialog}
                  />
                }
                modal={false}
                open={this.state.open}
                onRequestClose={this.closeDialog}
                bodyStyle={{ margin: '1px 0' }}
              >
                {this.props.children}
              </Dialog>
              <div className={styles.iconContainer}>
                <Choose>
                  <When condition={this.props.extra}>
                    <Dialog
                      title={this.props.extraTitle}
                      autoScrollBodyContent
                      actions={
                        <FlatButton
                          label="Discard"
                          primary
                          onTouchTap={this.closeExtraDialog}
                        />
                      }
                      modal={false}
                      open={this.state.openExtra}
                      onRequestClose={this.closeExtraDialog}
                      bodyStyle={{ margin: '1px 0' }}
                    >
                      {this.props.extra}
                    </Dialog>
                    <IconButton tooltip={this.props.extraTooltip} tooltipPosition="bottom-left" onTouchTap={this.handleExtraTouchTap}>
                      <ActionOpenInNew color={palette.disabledColor} hoverColor={palette.textColor} />
                    </IconButton>
                  </When>
                </Choose>
                <IconButton tooltip="See details" tooltipPosition="bottom-left" onTouchTap={this.handleTouchTap}>
                  <ActionOpenInNew color={palette.disabledColor} hoverColor={palette.textColor} />
                </IconButton>
              </div>
            </div>
          </When>
        </Choose>
        <CardText>
          <span className={styles.text}>
            <Choose>
              <When condition={this.props.value !== ''}>
                {this.props.value}
              </When>
              <Otherwise>
                <AlertError style={errorIconStyle} />
              </Otherwise>
            </Choose>
          </span>
        </CardText>
      </Card>
    );
  }
}
