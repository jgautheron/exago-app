import React, { Component, PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableHeaderColumn,
  TableHeader,
  TableRowColumn,
  TableRow,
  TableBody,
} from 'material-ui/Table';

import * as config from '../../config';

export default class ProjectBadge extends Component {
  static propTypes = {
    repository: PropTypes.string.isRequired,
    branch: PropTypes.string.isRequired,
    goversion: PropTypes.string.isRequired,
  };

  state = {
    showDialog: false,
  };

  showDialog = () => {
    this.setState({
      showDialog: true
    });
  }

  closeDialog = () => {
    this.setState({
      showDialog: false
    });
  }

  render() {
    const { branch, goversion } = this.props;
    const repository = this.props.repository.replace(/\//g, '|');
    const host = `${config.apiProtocol}://${config.apiHost}:${config.apiPort}`;
    const urlPrefix = `${host}/repos/${repository}/branches/${branch}/goversions/${goversion}/badges`;
    const badges = [
      {
        desc: 'Rank',
        url: `${urlPrefix}/rank`,
        markdown: `[![Exago](${urlPrefix}/rank/)](https://exago.io/project/${repository})`
      },
      {
        desc: 'Code Coverage',
        url: `${urlPrefix}/cov`,
        markdown: `[![Exago](${urlPrefix}/cov)](https://exago.io/project/${repository})`
      },
      {
        desc: 'Test Duration',
        url: `${urlPrefix}/duration`,
        markdown: `[![Exago](${urlPrefix}/duration)](https://exago.io/project/${repository})`
      },
      {
        desc: 'Tests',
        url: `${urlPrefix}/tests`,
        markdown: `[![Exago](${urlPrefix}/tests)](https://exago.io/project/${repository})`
      },
      {
        desc: 'Third Parties',
        url: `${urlPrefix}/thirdparties`,
        markdown: `[![Exago](${urlPrefix}/thirdparties)](https://exago.io/project/${repository})`
      },
      {
        desc: 'LOC',
        url: `${urlPrefix}/loc`,
        markdown: `[![Exago](${urlPrefix}/loc)](https://exago.io/project/${repository})`
      },
    ];

    const style = {
      row: {
        width: 120
      },
      pre: {
        whiteSpace: 'pre-wrap',
        height: 62
      }
    };

    return (
      <div>
        <img
          src={`${urlPrefix}/rank`}
          onClick={this.showDialog}
          style={{ cursor: 'pointer' }}
          alt="Rank"
        />
        <Dialog
          title="Badges"
          autoScrollBodyContent
          actions={
            <FlatButton
              label="Close"
              primary
              onTouchTap={this.closeDialog}
            />
          }
          modal={false}
          open={this.state.showDialog}
          onRequestClose={this.closeDialog}
        >
          <Table selectable={false}>
            <TableHeader displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn style={style.row}>Badge</TableHeaderColumn>
                <TableHeaderColumn>Markdown</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {badges.map((badge, id) =>
              <TableRow key={id}>
                <TableRowColumn style={style.row}>
                  <img src={badge.url} alt={badge.desc} />
                </TableRowColumn>
                <TableRowColumn><pre style={style.pre}>{badge.markdown}</pre></TableRowColumn>
              </TableRow>
            )}
            </TableBody>
          </Table>
        </Dialog>
      </div>
    );
  }
}
