import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';

const paperStyle = {
  width: '85%',
  margin: '20px auto',
  textAlign: 'center',
  display: 'block',
};

const textStyle = {
  width: '30%'
};

export default class Home extends Component {
  handleSubmit() {
    console.log(this.myTextInput, arguments);
  }
  render() {
    return (
      <div>
        <Helmet title="Home"/>
          <Paper style={paperStyle} zDepth={1} children={
            <TextField
              ref={(ref) => this.myTextInput = ref}
              onEnterKeyDown={::this.handleSubmit}
              hintText="Type a repository on GitHub"
              style={textStyle}
            />
          }/>
      </div>
    );
  }
}
