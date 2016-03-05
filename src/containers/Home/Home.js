import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { routeActions } from 'react-router-redux';
import Helmet from 'react-helmet';

import Paper from 'material-ui/lib/paper';
import { SearchInput } from 'components';

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
  {pushState: routeActions.push}
)
export default class Home extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    pushState: PropTypes.func.isRequired
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.repository === '') {
      return;
    }
    this.props.pushState('/project/' + nextProps.repository);
  }
  render() {
    return (
      <div>
        <Helmet title="Home"/>
          <Paper style={paperStyle} zDepth={1} children={
            <SearchInput repository={this.props.repository}/>
          }/>
      </div>
    );
  }
}
