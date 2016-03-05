import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { set } from 'redux/modules/repository';

import TextField from 'material-ui/lib/text-field';

const errInvalidRepository = 'The specified repository is invalid';
const errUnsupportedProvider = 'For now only GitHub is supported';

const githubDomain = 'github.com';

const textStyle = {
  width: '30%'
};

@connect(
  null,
  {setRepository: set}
)
export default class SearchInput extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    setRepository: PropTypes.func.isRequired
  };
  state = {
    searchInputError: ''
  };
  showError(message) {
    this.setState({searchInputError: message});
  }
  handleSubmit() {
    let val = this.searchInput.getValue().trim();
    val = val.replace(/https?:\/\/(www\.)?/, '');

    // empty value
    if (val === '') {
      this.showError(errInvalidRepository);
      return;
    }

    const sp = val.split('/');
    // there should be at least two items (owner/repository name)
    if (sp.length < 2) {
      this.showError(errInvalidRepository);
      return;
    }

    // if there's a single "/", we assume it's a GitHub repository
    if (sp.length === 2) {
      this.props.setRepository(githubDomain + '/' + val);
      return;
    }

    // if there are 3 elements in the array, the provider is included
    if (sp.length === 3) {
      switch (sp[0]) {
        // only GitHub allowed
        case githubDomain:
          this.props.setRepository(val);
          break;
        default:
          this.showError(errUnsupportedProvider);
      }
    }
  }
  render() {
    return (
      <TextField
        ref={(ref) => this.searchInput = ref}
        onEnterKeyDown={::this.handleSubmit}
        hintText="Type a repository on GitHub"
        errorText={this.state.searchInputError}
        defaultValue={this.props.repository}
        style={textStyle}
      />
    );
  }
}
