import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import styles from './SearchInput.css';

const errInvalidRepository = 'The specified repository is invalid';
const errUnsupportedProvider = 'For now only GitHub is supported';

const allowedDomains = ['github.com'];
const availableVersions = ['1.7.4', '1.8beta1'];

export default class SearchInput extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    onRepositorySet: PropTypes.func.isRequired
  };

  state = {
    searchInputError: '',
    value: ''
  };

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

    const defaultBranch = 'master';
    const defaultVersion = '1.7.4';

    // if there's a single "/", we assume it's a GitHub repository
    if (sp.length === 2) {
      this.props.onRepositorySet(`${allowedDomains[0]}/${val}`, defaultBranch, defaultVersion);
      return;
    }

    // if there are 3 elements in the array, the provider is included
    if (sp.length === 3) {
      if (!allowedDomains.includes(sp[0])) {
        this.showError(errUnsupportedProvider);
        return;
      }
    }

    this.props.onRepositorySet(sp.slice(0, 3).join('/'), defaultBranch, defaultVersion);
  }
  render() {
    return (
      <div>
        <TextField
          id="repoSearch"
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
          hintText="go-gettable GitHub repository"
          errorText={this.state.searchInputError}
          value={this.state.value}
          className={styles.input}
        />
        <SelectField
          floatingLabelText="Go version"
        >
          {availableVersions.map((version) =>
            <MenuItem key={version} value={version} primaryText={version} />
          )}
        </SelectField>
      </div>
    );
  }
}
