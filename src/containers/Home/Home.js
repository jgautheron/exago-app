import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Helmet from 'react-helmet';

import Paper from 'material-ui/lib/paper';
import { SearchInput } from 'components';
import { set } from 'redux/modules/repository';

const paperStyle = {
  width: '85%',
  margin: '20px auto',
  textAlign: 'center',
  display: 'block',
};

@connect(
  state => ({
    repository: state.repository.name
  }),
  {pushState: routeActions.push, setRepository: set}
)
export default class Home extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    setRepository: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };
  onRepositorySet(repository) {
    this.props.pushState('/project/' + repository);
    this.props.setRepository(repository);
  }
  render() {
    return (
      <div>
        <Helmet title="Home"/>
          <Paper style={paperStyle} zDepth={1} children={
            <SearchInput onRepositorySet={::this.onRepositorySet} repository={this.props.repository}/>
          }/>
      </div>
    );
  }
}
