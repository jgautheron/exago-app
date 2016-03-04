import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';

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

const errInvalidRepository = 'The specified repository is invalid';
const errUnsupportedProvider = 'For now only GitHub is supported';

@connect(
  null,
  {pushState: routeActions.push}
)
export default class Home extends Component {
  static propTypes = {
    pushState: PropTypes.func.isRequired
  };
  state = {
    searchInputError: ''
  };
  handleSubmit() {
    let val = this.searchInput.getValue().trim();
    val = val.replace(/https?:\/\/(www\.)?/, '');

    // empty value
    if (val === '') {
      this.props.pushState({searchInputError: errInvalidRepository});
      return;
    }

    const sp = val.split('/');
    // there should be at least two items (owner/repository name)
    if (sp.length < 2) {
      this.setState({searchInputError: errInvalidRepository});
      return;
    }

    // if there's a single "/", we assume it's a GitHub repository
    if (sp.length === 2) {
      this.props.pushState('/project/github.com/' + val);
      return;
    }

    // if there are 3 elements in the array, the provider is included
    if (sp.length === 3) {
      switch (sp[0]) {
        // only GitHub allowed
        case 'github.com':
          this.props.pushState('/project/' + val);
          break;
        default:
          this.setState({searchInputError: errUnsupportedProvider});
      }
    }
  }
  render() {
    return (
      <div>
        <Helmet title="Home"/>
          <Paper style={paperStyle} zDepth={1} children={
            <TextField
              ref={(ref) => this.searchInput = ref}
              onEnterKeyDown={::this.handleSubmit}
              hintText="Type a repository on GitHub"
              errorText={this.state.searchInputError}
              style={textStyle}
            />
          }/>
      </div>
    );
  }
}
