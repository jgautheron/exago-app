import React, { Component, PropTypes } from 'react';

import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import styles from './Home.css';
import Paper from 'material-ui/Paper';

import { SearchInput, ProjectList } from 'components';
import { set } from 'redux/modules/repository';
import { load } from 'redux/modules/homeProjects';

const paperStyle = {
  width: '85%',
  margin: '40px auto',
  textAlign: 'center',
  display: 'block',
  padding: 20
};

@asyncConnect([{
  // eslint-disable-next-line react/prop-types
  promise: ({ store: { dispatch } }) => {
    const promises = [];
    promises.push(dispatch(load('recent')));
    promises.push(dispatch(load('popular')));
    promises.push(dispatch(load('ranked')));
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    repository: state.repository.name,
    projects: state.homeProjects
  }),
  { setRepository: set }
)
export default class Home extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    setRepository: PropTypes.func.isRequired,
    projects: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  onRepositorySet = (repository) => {
    const { push } = this.context.router;
    push(`/project/${repository}`);
    this.props.setRepository(repository);
  };

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <Paper
          style={paperStyle}
          zDepth={1}
          children={
            <div>
              <h1>Check your Golang project quality</h1>
              <SearchInput onRepositorySet={this.onRepositorySet} repository={this.props.repository} />
            </div>
          }
        />

        <div className={styles.featuredHolder}>
          <ProjectList type="recent" data={this.props.projects.recent} />
          <ProjectList type="ranked" data={this.props.projects.ranked} />
          <ProjectList type="popular" data={this.props.projects.popular} />
        </div>
      </div>
    );
  }
}
