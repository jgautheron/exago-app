import React, { Component, PropTypes } from 'react';
import styles from './ProjectCard.css';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import IconButton from 'material-ui/lib/icon-button';
import ActionOpenInNew from 'material-ui/lib/svg-icons/action/open-in-new';
import Popover from 'material-ui/lib/popover/popover';
import PopoverAnimationFromTop from 'material-ui/lib/popover/popover-animation-from-top';

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
      fontSize: '26px',
      margin: '0 0 20px 0'
    };
    return (
      <Card className={styles.container}>
        <CardHeader
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
          <span className={styles.text}>{this.props.value}</span>
        </CardText>
      </Card>
    );
  }
}
