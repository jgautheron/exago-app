import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import styles from './Home.css';

import Paper from 'material-ui/lib/paper';

import { SearchInput } from 'components';
import { ProjectList } from 'containers';
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
  {setRepository: set}
)
export default class Home extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    setRepository: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  onRepositorySet = (repository) => {
    const {push} = this.context.router;
    push('/project/' + repository);
    this.props.setRepository(repository);
  };

  render() {
    return (
      <div>
        <Helmet title="Home"/>
        <Paper style={paperStyle} zDepth={1} children={
          <div>
            <h1>Check your Golang project quality</h1>
            <SearchInput onRepositorySet={this.onRepositorySet} repository={this.props.repository}/>
          </div>
        }/>

        <div className={styles.featuredHolder} style={{width: '85%', margin: '0 auto'}}>
          <ProjectList type="popular"/>
          <ProjectList type="ranked"/>
          <ProjectList type="recent"/>
        </div>
      </div>
    );
  }
}
