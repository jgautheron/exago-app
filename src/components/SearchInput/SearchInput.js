import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

// eslint-disable-next-line
import { polyfill } from 'es6-promise';
import 'isomorphic-fetch';

import { formatUrl } from '../../helpers/ApiClient';

import styles from './SearchInput.css';

const errInvalidRepository = 'The specified repository is invalid';
const errUnsupportedProvider = 'For now only GitHub is supported';
const errors = {
  400: 'This repository is not valid',
  404: 'This repository does not exist',
  413: 'This repository is too large',
  422: 'This repository does not contain Go code'
};

const allowedDomains = ['github.com'];
const availableVersions = ['1.7.4', '1.8beta1'];

export default class SearchInput extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    onRepositorySet: PropTypes.func.isRequired
  };

  state = {
    repositoryInputError: '',
    value: 'github.com/',
    branches: ['master'],
    branch: 'master',
    goversion: availableVersions[0],
  };

  setRepository(repository) {
    this.loadBranches(repository);
  }

  loadBranches(repository) {
    repository = repository.replace(/\//g, '|'); // eslint-disable-line
    fetch(formatUrl(`/branches/${repository}`))
      .then(res => {
        if (!res.ok) {
          throw Error(res.status);
        }
        return res.json();
      })
      .then(branches => this.setState({ branches }))
      .catch(err => {
        this.setState({ repositoryInputError: errors[err.message] });
      });
  }

  showError(repositoryInputError) {
    this.setState({ repositoryInputError });
  }

  handleBranchChange = (event, index, branch) => this.setState({ branch });
  handleGoversionChange = (event, index, goversion) => this.setState({ goversion });

  handleInputChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleInputBlur = () => {
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
      this.setRepository(`${allowedDomains[0]}/${val}`);
      return;
    }

    // if there are 3 elements in the array, the provider is included
    if (sp.length === 3) {
      if (!allowedDomains.includes(sp[0])) {
        this.showError(errUnsupportedProvider);
        return;
      }
    }

    this.setRepository(sp.slice(0, 3).join('/'));
  }

  handleSubmit = () => {
    this.props.onRepositorySet(
      this.state.value,
      this.state.branch,
      this.state.goversion,
    );
  }

  render() {
    return (
      <div>
        <TextField
          floatingLabelText="GitHub repository"
          onBlur={this.handleInputBlur}
          onChange={this.handleInputChange}
          errorText={this.state.repositoryInputError}
          value={this.state.value}
          className={styles.input}
          style={{ float: 'left' }}
        />

        <SelectField
          floatingLabelText="Branch"
          value={this.state.branch}
          onChange={this.handleBranchChange}
          disabled={this.state.branches.length === 1}
          style={{ width: 120, float: 'left', marginLeft: 5 }}
        >
          {this.state.branches.map(branch =>
            <MenuItem key={branch} value={branch} primaryText={branch} />
          )}
        </SelectField>

        <SelectField
          floatingLabelText="Go version"
          value={this.state.goversion}
          onChange={this.handleGoversionChange}
          style={{ width: 120, float: 'left', marginLeft: 5 }}
        >
          {availableVersions.map(version =>
            <MenuItem key={version} value={version} primaryText={version} />
          )}
        </SelectField>

        <RaisedButton
          label="Analyze"
          primary
          onClick={this.handleSubmit}
          style={{ float: 'left', marginLeft: 15, marginTop: 27 }}
        />

        <br style={{ clear: 'left' }} />
      </div>
    );
  }
}
