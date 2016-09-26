import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';

import config from '../../config';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Stars from 'material-ui/svg-icons/action/stars';

import exagoTheme from '../../theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './App.css';

injectTapEventPlugin();

export class AppPure extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
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
          <div>
            <div className={styles.appContent}>
              <AppBar
                className={styles.appBar}
                titleStyle={titleStyle}
                style={{ position: 'fixed', top: 0 }}
                title={<a href="/" className={styles.logo}>exago</a>}
                showMenuIconButton={false}
                iconElementRight={
                  <FlatButton label="Premium" icon={<Stars />} href="/premium" />
                }
              />
              <div style={{ padding: '0 20px' }}>
                {this.props.children}
              </div>
            </div>
            <div className={styles.footer}>
              Brought to you by <a href="https://www.hotolab.com/">Hoto Lab</a>.
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AppPure;
