import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const muiTheme = getMuiTheme();
export const withTheme = (comp) => (
  <MuiThemeProvider muiTheme={muiTheme}>
    {comp}
  </MuiThemeProvider>
);
