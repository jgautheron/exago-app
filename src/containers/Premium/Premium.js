import React, { Component } from 'react';
import Helmet from 'react-helmet';
import styles from './Premium.css';
import RaisedButton from 'material-ui/RaisedButton';
import ActionCached2 from 'material-ui/svg-icons/content/save';
import ActionCached3 from 'material-ui/svg-icons/action/account-circle';

const gopherImg = require('../../components/ProjectShare/gophers/10.svg');

export default class About extends Component {
  render() {
    return (
      <div>
        <Helmet title="Unleash the Gopher!" />
        <div style={{ float: 'left', width: '34%', position: 'relative' }}>
          <img src={gopherImg} alt="Gopher" style={{ position: 'fixed', top: 90, left: -50 }} />
        </div>
        <div style={{ float: 'left', marginLeft: '30%', width: '50%', padding: '4%', paddingTop: 50, background: 'rgba(255,255,255,.9)' }}>
          <h1 className={styles.bigText}>Unleash the Gopher!</h1>
          <h1><small>$</small>10<small>/month</small></h1>
          <h1 className={styles.features}>Explore Powerful Features</h1>
          <div>
            <div className={styles.featureBox}>
              <ActionCached2 className={styles.icon} />
              <p className={styles.featureName}>Feature no 1</p>
              <p className={styles.featureDesc}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className={styles.featureBox}>
              <ActionCached2 className={styles.icon} />
              <p className={styles.featureName}>Some description</p>
              <p className={styles.featureDesc}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                orem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className={styles.featureBox}>
              <ActionCached2 className={styles.icon} />
              <p className={styles.featureName}>Some description</p>
              <p className={styles.featureDesc}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                orem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>

            <div className={styles.featureBox}>
              <ActionCached3 className={styles.icon} />
              <p className={styles.featureName}>Some description</p>
              <p className={styles.featureDesc}>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                orem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <RaisedButton
            label="UPGRAGE"
            primary
          />
        </div>
      </div>
    );
  }
}
