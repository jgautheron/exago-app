/*  global Choose, When, Otherwise */

import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './Premium.css';
import request from 'superagent';

import RaisedButton from 'material-ui/RaisedButton';
import ActionCached2 from 'material-ui/svg-icons/action/code';
import ActionCached3 from 'material-ui/svg-icons/action/done-all';
import ActionCached4 from 'material-ui/svg-icons/action/schedule';
import ActionCached5 from 'material-ui/svg-icons/action/trending-up';
import ActionCached6 from 'material-ui/svg-icons/action/settings-ethernet';
import ActionCached7 from 'material-ui/svg-icons/action/view-list';
import ActionCached8 from 'material-ui/svg-icons/action/cached';
import ActionCached9 from 'material-ui/svg-icons/action/change-history';

import Formsy from 'formsy-react';
import FormsyText from 'formsy-material-ui/lib/FormsyText';

const gopherImg = require('../../components/ProjectShare/gophers/10.svg');

export default class Premium extends Component {
  state = {
    canSubmit: false,
    submitted: false,
  };

  enableButton = () => {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false,
    });
  }

  submitForm = (data) => {
    request
      .post('/premium-submit')
      .send(data)
      .end(err => {
        if (!err) {
          this.setState({ submitted: true });
        }
      });
  }

  notifyFormError(data) {
    console.error('Form error:', data);
  }

  render() {
    return (
      <div>
        <Helmet title="Unleash the Gopher!" />
        <div style={{ float: 'left', width: '34%', position: 'relative' }}>
          <img src={gopherImg} alt="Gopher" style={{ position: 'fixed', top: 90, left: -50 }} />
        </div>
        <div style={{ float: 'left', marginLeft: '30%', width: '50%', padding: '4%', paddingTop: 50, background: 'rgba(255,255,255,.9)' }}>
          <h1 className={styles.bigText}>Unleash the Gopher</h1>
          <p className={styles.introText}>While Exago is open source and will stay that way,
            there are a few interesting but costly features in terms of infrastructure and development
            that we would love to bring to you, for a monthly fee, if you are interested.<br />
          If there’s enough interest in this premium version, we’ll give it a go!
          </p>
          <div>
            <div className={styles.featureBox}>
              <ActionCached5 className={styles.icon} />
              <p className={styles.featureName}>Progress Comparison</p>
              <p className={styles.featureDesc}>
                Compare the evolution of your project based on two branches, commits or dates.
              </p>
            </div>

            <div className={styles.featureBox}>
              <ActionCached4 className={styles.icon} />
              <p className={styles.featureName}>Larger projects</p>
              <p className={styles.featureDesc}>
                Priority processing, execution up to one hour instead of five minutes.
                Includes support for <strong>CGO</strong>.
              </p>
            </div>

            <br style={{ clear: 'both' }} />

            <div className={styles.featureBox}>
              <ActionCached2 className={styles.icon} />
              <p className={styles.featureName}>GitHub integration</p>
              <p className={styles.featureDesc}>
                Tight integration with GitHub including login and status, with a list of your
                Go repositories and their score evolution in time. Includes support for <strong>private projects</strong>.
              </p>
            </div>

            <div className={styles.featureBox}>
              <ActionCached3 className={styles.icon} />
              <p className={styles.featureName}>Windows, ARM, BSD</p>
              <p className={styles.featureDesc}>
                Possibility to build and run tests in Windows and BSD environments,
                with every processor architecture supported by Go: amd64, 386, arm[64], ppc64[le], mips64[le], s390x.
              </p>
            </div>

            <br style={{ clear: 'both' }} />

            <div className={styles.featureBox}>
              <ActionCached6 className={styles.icon} />
              <p className={styles.featureName}>API integration</p>
              <p className={styles.featureDesc}>
                Interact directly with Exago’s APIs to automatically trigger an inspection.
              </p>
            </div>

            <div className={styles.featureBox}>
              <ActionCached7 className={styles.icon} />
              <p className={styles.featureName}>File browser</p>
              <p className={styles.featureDesc}>
                Explore your project with an advanced file browser which will show data
                per package and file.
              </p>
            </div>

            <br style={{ clear: 'both' }} />

            <div className={styles.featureBox}>
              <ActionCached8 className={styles.icon} />
              <p className={styles.featureName}>Continuous integration</p>
              <p className={styles.featureDesc}>
                Exago does everything you need, and more. Support for custom binary and test build based on a Dockerfile.
              </p>
            </div>

            <div className={styles.featureBox}>
              <ActionCached9 className={styles.icon} />
              <p className={styles.featureName}>Predictive models</p>
              <p className={styles.featureDesc}>
                Exago sets you on the right track by giving reachable and motivating targets to improve your project quality.
              </p>
            </div>
          </div>

          <hr style={{ clear: 'both' }} />
          <Choose>
            <When condition={this.state.submitted}>
              Thanks for your interest!
            </When>
            <Otherwise>
              <h1>Interested?</h1>
              <p>
                <b>Just leave us your e-mail.</b>
                We’ll only email you once to tell you if/when this premium service will be available.
              </p>

              <Formsy.Form
                onValid={this.enableButton}
                onInvalid={this.disableButton}
                onValidSubmit={this.submitForm}
                onInvalidSubmit={this.notifyFormError}
              >
                <FormsyText
                  name="email"
                  hintText="Your email address *"
                  style={{ marginRight: 20 }}
                  validations="isEmail"
                  required
                />
                <FormsyText
                  name="company"
                  hintText="Your company name"
                  style={{ marginRight: 20 }}
                />
                <FormsyText
                  name="feature"
                  hintText="Any feature request?"
                  multiLine
                  rows={2}
                />
                <RaisedButton
                  type="submit"
                  style={{ marginLeft: 20 }}
                  label="I’m interested!"
                  disabled={!this.state.canSubmit}
                  primary
                />
              </Formsy.Form>
            </Otherwise>
          </Choose>
        </div>
      </div>
    );
  }
}
