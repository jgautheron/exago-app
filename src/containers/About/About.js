import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {
  render() {
    return (
      <div>
        <Helmet title="About Us"/>
        <h1>About Us</h1>
      </div>
    );
  }
}
