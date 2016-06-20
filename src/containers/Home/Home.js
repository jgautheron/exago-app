import React, { Component, PropTypes } from 'react';

import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import styles from './Home.css';
import Paper from 'material-ui/Paper';

import { SearchInput, ProjectsList } from 'components';
import { load } from 'redux/modules/homeProjects';

const paperStyle = {
  width: '85%',
  margin: '40px auto',
  display: 'block',
  background: 'url(http://steveperkins.com/wp-content/uploads/2014/02/gopher-head.png) 87% 100% no-repeat',
  padding: '30px 20px 50px 90px'
};

@asyncConnect([{
  // eslint-disable-next-line react/prop-types
  promise: ({ store: { dispatch } }) => {
    const promises = [];
    promises.push(dispatch(load('recent')));
    promises.push(dispatch(load('popular')));
    promises.push(dispatch(load('top')));
    return Promise.all(promises);
  }
}])
@connect(
  state => ({
    repository: state.repository.name,
    projects: state.homeProjects
  })
)
export default class Home extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    projects: PropTypes.object.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  onRepositorySet = (repository) => {
    this.context.router.push(`/project/${repository}`);
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
              <h1>Check All The Things</h1>
              <h5>Only Go repositories for now</h5>
              <SearchInput onRepositorySet={this.onRepositorySet} repository={this.props.repository} />
            </div>
          }
        />

        <div className={styles.featuredHolder}>
          <ProjectsList type="recent" data={this.props.projects.recent.repositories} />
          <ProjectsList type="top" data={this.props.projects.top.repositories} />
          <ProjectsList type="popular" data={this.props.projects.popular.repositories} />
        </div>
      </div>
    );
  }
}
