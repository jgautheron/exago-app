import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { Card, CardTitle, CardMedia } from 'material-ui/Card';
// import AlertWarning from 'material-ui/svg-icons/alert/warning';
import Avatar from 'material-ui/Avatar';
import { transparent } from 'material-ui/styles/colors';
import { palette } from '../../theme';
import ActionTrendingFlat from 'material-ui/svg-icons/action/trending-flat';

export default class ProjectFileList extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.data = [];
    Object.keys(this.props.data.lintmessages).forEach((file) => {
      let cn = 0;

      Object.keys(this.props.data.lintmessages[file]).forEach((linter) => {
        cn += this.props.data.lintmessages[file][linter].length;
      });

      this.data.push({
        fileName: file,
        messages: this.props.data.lintmessages[file],
        count: cn,
      });
    });
  }

  render() {
    const styles = {
      title: {
        fontWeight: 300,
        fontSize: 26
      },
      iconContainer: {
        width: 60
      },
      iconWarningText: {
        position: 'relative',
        top: -6,
        left: 2
      }
    };
    return (
      <Card>
        <CardTitle
          title="Linter Warnings"
          titleStyle={styles.title}
        />
        <CardMedia>
          <List>
            {this.data.map((item, id) =>
            <ListItem
              key={id}
              primaryText={item.fileName}
              leftAvatar={
                <Avatar
                  color={palette.primary1Color} backgroundColor={transparent}
                  style={{left: 8}}
                >
                  {item.count}
                </Avatar>
              }
              nestedItems={Object.keys(item.messages).map((linter, idd) =>
                <ListItem
                  key={idd}
                  primaryText={linter}
                  leftAvatar={
                    <Avatar
                      color={palette.primary1Color} backgroundColor={transparent}
                      style={{left: 8}}
                    >
                      {item.messages[linter].length}
                    </Avatar>
                  }
                  nestedItems={item.messages[linter].map((message, iddd) =>
                    <ListItem
                      key={iddd}
                      primaryText={`${message.line}: ${message.message}`}
                      leftIcon={<ActionTrendingFlat />}
                      />
                  )}
                />,
              )}
            />
            )}
          </List>
        </CardMedia>
      </Card>
    );
  }
}
