import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/lib/paper';
import Avatar from 'material-ui/lib/avatar';
import IconPopular from 'material-ui/lib/svg-icons/social/whatshot';
import IconRanked from 'material-ui/lib/svg-icons/action/grade';
import IconRecent from 'material-ui/lib/svg-icons/action/restore';

import styles from './ProjectList.css';

import { List, ListItem } from 'material-ui/lib/lists';
import { blueA200, transparent } from 'material-ui/lib/styles/colors';

const PROJECT_LISTS = {
  popular: {
    label: 'Popular projects',
    icon: IconPopular
  },
  ranked: {
    label: 'A ranked projects',
    icon: IconRanked
  },
  recent: {
    label: 'Recently added projects',
    icon: IconRecent
  }
};

export default class ProjectList extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
  };

  render() {
    const IconName = PROJECT_LISTS[this.props.type].icon;
    return (
      <Paper className={styles.recentHolder} zDepth={1} children={
        <List>
          <h5>
            <IconName color="#666"/>
            {PROJECT_LISTS[this.props.type].label}
          </h5>
          {this.props.data.map( (repo, idx) =>

          <ListItem key={idx} onTouchTap={this.checkRepo}
            primaryText={repo}
            rightAvatar={
              <Avatar color={blueA200} backgroundColor={transparent} style={{right: 8}}>
                A
              </Avatar>
            }
            leftAvatar={
              <Avatar src={'https://avatars.githubusercontent.com/' + repo.split('/')[0]} />
            } />
          )}
        </List>
      }/>
    );
  }
}
