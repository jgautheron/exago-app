import React, { Component, PropTypes } from 'react';
import styles from './ProjectCard.css';

import { Card, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ActionOpenInNew from 'material-ui/svg-icons/action/open-in-new';
import AlertError from 'material-ui/svg-icons/alert/error';
import { Popover, PopoverAnimationFromTop } from 'material-ui/Popover';

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
    ])
  };

  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'bottom',
      },
      targetOrigin: {
        horizontal: 'right',
        vertical: 'center',
      },
    };
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
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
        {this.props.children ?
          <div className={styles.childrenContainer}>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={this.state.anchorOrigin}
              targetOrigin={this.state.targetOrigin}
              onRequestClose={this.handleRequestClose}
              animation={PopoverAnimationFromTop}
            >
              <div className={styles.popoverContainer}>
                {this.props.children}
              </div>
            </Popover>
            <div className={styles.iconContainer}>
              <IconButton tooltip="See details" tooltipPosition="bottom-left" onTouchTap={this.handleTouchTap}>
                <ActionOpenInNew color={palette.disabledColor} hoverColor={palette.textColor} />
              </IconButton>
            </div>
          </div>
        : ''}
        <CardText>
          <span className={styles.text}>
            {this.props.value !== '' ? this.props.value :
              <AlertError style={errorIconStyle} />
            }
          </span>
        </CardText>
      </Card>
    );
  }
}
