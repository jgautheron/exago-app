import React, { Component } from 'react';
import theme from '../../theme';

export const projectChartStyles = ComposedComponent => class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      palette: theme.palette,
      pieColors: [
        theme.palette.primary1Color,
        theme.palette.primary3Color,
        theme.palette.primary2Color,
        theme.palette.accent2Color,
        theme.palette.accent1Color,
      ],
      labelStyle: {
        fontWeight: 300,
        fontSize: 11,
        fontFamily: theme.fontFamily,
      }
    };
  }

  render() {
    return <ComposedComponent {...this.props} {...this.state} />;
  }
};
