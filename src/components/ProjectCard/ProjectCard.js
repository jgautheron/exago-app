/*  global Choose, When, Otherwise */

import React, { Component, PropTypes } from 'react';
import styles from './ProjectCard.css';

import { Card, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new';
import ActionCode from 'material-ui/svg-icons/action/code';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import AlertError from 'material-ui/svg-icons/alert/error';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import { ProjectCardTitle } from 'components';

import { palette } from '../../theme';

export default class ProjectCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    explanation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    extra: PropTypes.object,
    extraTooltip: PropTypes.string,
    extraTitle: PropTypes.string
  };

  state = {
    primaryModal: false,
    secondaryModal: false,
    anchorOrigin: {
      horizontal: 'right',
      vertical: 'bottom',
    },
    targetOrigin: {
      horizontal: 'right',
      vertical: 'center',
    },
  };

  open = (which) => (event => {
    this.setState({
      [which]: true,
      anchorEl: event.currentTarget,
    });
  })

  close = (which) => (() => {
    this.setState({
      [which]: false,
    });
  })

  render() {
    const errorIconStyle = {
      width: 48,
      height: 48
    };

    return (
      <Card className={styles.container}>
        <div className={styles.iconsBar}></div>
        <ProjectCardTitle title={this.props.title} />
        <Choose>
          <When condition={this.props.explanation}>
            <div className={styles.leftIconContainer}>
              <IconButton style={{ cursor: 'help' }} tooltip={this.props.explanation} tooltipPosition="bottom-right">
                <HelpIcon color={palette.disabledColor} hoverColor={palette.textColor} />
              </IconButton>
            </div>
          </When>
        </Choose>
        <Choose>
          <When condition={this.props.children}>
            <div className={styles.childrenContainer}>
              <Dialog
                contentStyle={{ maxWidth: '1200px', width: '90%' }}
                title={this.props.title}
                autoScrollBodyContent
                actions={
                  <FlatButton
                    label="Discard"
                    primary
                    onTouchTap={this.close('primaryModal')}
                  />
                }
                modal={false}
                open={this.state.primaryModal}
                onRequestClose={this.close('primaryModal')}
                bodyStyle={{ margin: '1px 0' }}
              >
                {this.props.children}
              </Dialog>
              <div className={styles.rightIconContainer}>
                <Choose>
                  <When condition={this.props.extra}>
                    <Dialog
                      title={this.props.extraTitle}
                      autoScrollBodyContent
                      actions={
                        <FlatButton
                          label="Discard"
                          primary
                          onTouchTap={this.close('secondaryModal')}
                        />
                      }
                      modal={false}
                      open={this.state.secondaryModal}
                      onRequestClose={this.close('secondaryModal')}
                      bodyStyle={{ margin: '1px 0' }}
                    >
                      {this.props.extra}
                    </Dialog>
                    <IconButton tooltip={this.props.extraTooltip} tooltipPosition="bottom-left" onTouchTap={this.open('secondaryModal')}>
                      <ActionCode color={palette.disabledColor} hoverColor={palette.textColor} />
                    </IconButton>
                  </When>
                </Choose>
                <IconButton tooltip="See details" tooltipPosition="bottom-left" onTouchTap={this.open('primaryModal')}>
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
