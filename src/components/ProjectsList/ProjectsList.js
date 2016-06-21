import React, { Component, PropTypes } from 'react';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import IconPopular from 'material-ui/svg-icons/social/whatshot';
import IconRanked from 'material-ui/svg-icons/action/grade';
import IconRecent from 'material-ui/svg-icons/action/restore';
import Subheader from 'material-ui/Subheader';

import styles from './ProjectsList.css';

import { List, ListItem } from 'material-ui/List';
import { blueA200, transparent } from 'material-ui/styles/colors';

const PROJECTS_LISTS = {
  popular: {
    label: 'Popular',
    icon: IconPopular
  },
  top: {
    label: 'A-Ranked',
    icon: IconRanked
  },
  recent: {
    label: 'Recently added',
    icon: IconRecent
  }
};

export default class ProjectsList extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
  };

  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  render() {
    const IconName = PROJECTS_LISTS[this.props.type].icon;
    const { push } = this.context.router;
    const style = {
      primaryText: {
        width: 242,
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }
    };
    return (
      <Paper
        className={styles.recentHolder}
        zDepth={1}
        children={
          <List>
            <Subheader>
              <IconName className={styles.icon} color="#888" />
              {PROJECTS_LISTS[this.props.type].label}
            </Subheader>

            {this.props.data.map((repo, idx) =>
              <ListItem
                key={idx}
                onTouchTap={() => push(`/project/${repo.name}`)}
                primaryText={<div style={style.primaryText}>{repo.name.replace('github.com/', '')}</div>}
                secondaryTextLines={2}
                secondaryText={repo.description}
                rightAvatar={
                  <Avatar color={blueA200} backgroundColor={transparent} style={{ right: 8 }}>
                    {repo.rank}
                  </Avatar>
                }
                leftAvatar={
                  <Avatar src={repo.image} />
                }
              />
            )}
          </List>
        }
      />
    );
  }
}
