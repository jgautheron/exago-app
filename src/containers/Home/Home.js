import React, { Component } from 'react';
import Helmet from 'react-helmet';

export default class Home extends Component {
  render() {
    const logoImage = require('./logo.png');
    return (
      <div>
        <Helmet title="Home"/>
        <h1>Welcome home!</h1>
        <img src={logoImage} alt="exago.io logo"/>
      </div>
    );
  }
}
