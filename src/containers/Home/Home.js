import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { load } from 'redux/modules/homeProjects';
import Helmet from 'react-helmet';
import styles from './Home.css';
import Paper from 'material-ui/Paper';
import { SearchInput, ProjectsList } from 'components';

export class HomePure extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    projects: PropTypes.object
  };

  static reduxAsyncConnect = [{
    promise: ({ store: { dispatch } }) => {
      const promises = [];
      promises.push(dispatch(load('recent')));
      promises.push(dispatch(load('popular')));
      promises.push(dispatch(load('top')));
      return Promise.all(promises);
    }
  }];

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  handleRepositorySet = (repo, branch, goversion) => {
    // repo = repo.replace(/\//g, '|'); // eslint-disable-line
    this.context.router.push(`/${repo}/${branch}/${goversion}`);
  };

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <Paper
          className={styles.paper}
          zDepth={1}
          children={
            <div>
              <h1>Check All The Things</h1>
              <SearchInput onRepositorySet={this.handleRepositorySet} repository={this.props.repository} />
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

const mapStateToProps = state => ({
  repository: state.repository.name,
  projects: state.homeProjects
});

export default connect(mapStateToProps)(HomePure);
