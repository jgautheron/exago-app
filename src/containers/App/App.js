import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { push } from 'react-router-redux';
import { open, close } from 'redux/modules/menu';

import config from '../../config';

import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import exagoTheme from '../../theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './App.css';

injectTapEventPlugin();

@connect(
  state => ({
    menu: state.menu.open
  }),
  {open, close, pushState: push}
)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    menu: PropTypes.bool,
    open: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleToggle = (isOpen) => {
    if (isOpen === false) {
      return this.props.close();
    }
    if (this.props.menu) {
      return this.props.close();
    }
    return this.props.open();
  };

  render() {
    const titleStyle = {
      lineHeight: '59px',
      fontSize: '34px',
      fontWeight: '300',
      letterSpacing: '-.01em'
    };
    return (
      <div>
        <Helmet {...config.app.head} />
        <MuiThemeProvider muiTheme={getMuiTheme(exagoTheme, { userAgent: 'all' })}>
          <div className={styles.appContent}>
            <AppBar
              className={styles.appBar}
              titleStyle={titleStyle}
              style={{'position': 'fixed', 'top': 0}}
              title="exago"
              onLeftIconButtonTouchTap={this.handleToggle}
            />
            <Drawer open={this.props.menu} docked={false} onRequestChange={this.handleToggle}>
              <MenuItem onClick={() => this.props.pushState('/')}>Home</MenuItem>
              <MenuItem onClick={() => this.props.pushState('/about')}>About</MenuItem>
            </Drawer>
            <div style={{'padding': '0 20px'}}>
              {this.props.children}
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}
