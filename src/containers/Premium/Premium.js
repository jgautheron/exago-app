import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './Premium.css';
import RaisedButton from 'material-ui/RaisedButton';
import ActionCached2 from 'material-ui/svg-icons/action/code';
import ActionCached3 from 'material-ui/svg-icons/action/done-all';
import ActionCached4 from 'material-ui/svg-icons/action/schedule';
import ActionCached5 from 'material-ui/svg-icons/action/trending-up';
import TextField from 'material-ui/TextField';

const gopherImg = require('../../components/ProjectShare/gophers/10.svg');

export default class Premium extends Component {
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
          <h1 className={styles.features}>Professional Quality Inspection Tools</h1>
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
                Priority processing up to one hour instead of five minutes.<br />
                Includes support for <strong>CGO</strong>.
              </p>
            </div>

            <br style={{ clear: 'both' }} />

            <div className={styles.featureBox}>
              <ActionCached2 className={styles.icon} />
              <p className={styles.featureName}>GitHub integration</p>
              <p className={styles.featureDesc}>
                Tight integration with GitHub including login, with a list of your
                Go repositories and their score evolution in time. Includes support for <strong>private projects</strong>.
              </p>
            </div>

            <div className={styles.featureBox}>
              <ActionCached3 className={styles.icon} />
              <p className={styles.featureName}>Windows, ARM, BSD.</p>
              <p className={styles.featureDesc}>
                Possibility to also run tests in Windows, ARM and BSD environments.
              </p>
            </div>
          </div>

          <hr style={{ clear: 'both' }} />
          <h1>Interested?</h1>
          <p><b>Just leave us your e-mail.</b> We’ll only email you once to tell you if/when this premium service will be available.</p>
          <TextField
            hintText="Your email address"
            style={{ marginRight: 20 }}
          />
          <TextField
            hintText="Any feature we didn’t mention above you’d like to see?"
            multiLine
            rows={2}
          />
          <RaisedButton
            style={{ marginLeft: 20 }}
            label="I’m interested!"
            primary
          />
        </div>
      </div>
    );
  }
}
