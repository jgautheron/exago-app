import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ga from 'react-ga';

import config from '../../config';

import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Stars from 'material-ui/svg-icons/action/stars';
import Love from 'material-ui/svg-icons/action/favorite';

import exagoTheme from '../../theme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import styles from './App.css';

injectTapEventPlugin();

export class AppPure extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string,
    })
  };

  static contextTypes = {
    store: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired
  };

  componentDidMount() {
    ga.initialize('UA-2118940-7', { debug: false });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      ga.pageview(nextProps.location.pathname);
    }
  }

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
              Brought to you with
              {' '}
              <Love style={{ color: '#375EAB', width: 18, height: 16, position: 'relative', top: 4 }} /> by
              {' '}
              <a title="Jonathan Gautheron" href="https://twitter.com/jgautheron">@jgautheron</a>,
              {' '}
              <a title="Christophe Eble" href="https://twitter.com/christopheeble">@christopheeble</a> &
              {' '}
              <a title="Karol Górecki" href="https://twitter.com/karolgorecki">@karolgorecki</a>
            </div>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AppPure;
