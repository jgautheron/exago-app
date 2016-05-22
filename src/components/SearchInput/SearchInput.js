import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const errInvalidRepository = 'The specified repository is invalid';
const errUnsupportedProvider = 'For now only GitHub is supported';

const githubDomain = 'github.com';

export default class SearchInput extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    onRepositorySet: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      searchInputError: '',
      value: '',
    };
  }

  showError(message) {
    this.setState({
      searchInputError: message
    });
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    let val = this.state.value.trim();
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
      this.props.onRepositorySet(`${githubDomain}/${val}`);
      return;
    }

    // if there are 3 elements in the array, the provider is included
    if (sp.length === 3) {
      switch (sp[0]) {
        // only GitHub allowed
        case githubDomain:
          this.props.onRepositorySet(val);
          break;
        default:
          this.showError(errUnsupportedProvider);
      }
    }
  }
  render() {
    const textStyle = {
      width: '30%'
    };
    return (
      <TextField
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
        hintText="Type a repository on GitHub"
        errorText={this.state.searchInputError}
        value={this.state.value}
        style={textStyle}
      />
    );
  }
}
