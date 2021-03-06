import React, { Component, PropTypes } from 'react';
import {
  Table,
  TableHeaderColumn,
  TableHeader,
  TableRowColumn,
  TableRow,
  TableBody,
} from 'material-ui/Table';

import { Link } from 'react-router';
import ErrorIcon from 'material-ui/svg-icons/content/block';
import CheckIcon from 'material-ui/svg-icons/action/help';

import { formatUrl } from '../../helpers/ApiClient';

// eslint-disable-next-line
import { polyfill } from 'es6-promise';
import 'isomorphic-fetch';

export default class ProjectThirdParties extends Component {
  static propTypes = {
    thirdParties: PropTypes.array.isRequired
  }

  state = {};

  componentWillMount() {
    const { thirdParties } = this.props;

    thirdParties.forEach((thirdPartyRepo) => {
      fetch(formatUrl(`/cached/${thirdPartyRepo}`)).then(res => {
        if (!res.ok) {
          throw Error();
        }
        return res.json();
      }).then(res => {
        if (!res.data) {
          this.setState({ [thirdPartyRepo]: 'not-checked' });
          return;
        }
        this.setState({ [thirdPartyRepo]: res.data.results.score.rank });
      })
      .catch(() => {
        this.setState({ [thirdPartyRepo]: 'error' });
      });
    });
  }

  render() {
    const { thirdParties } = this.props;

    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Package</TableHeaderColumn>
            <TableHeaderColumn style={{ width: 80 }} >Score</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {thirdParties.map((repoPath, id) =>
            <TableRow key={id}>
              <TableRowColumn>
              {this.state[repoPath] !== 'error' ?
                <Link to={`/project/${repoPath}`}>{repoPath}</Link> :
                repoPath
              }
              </TableRowColumn>
              <TableRowColumn style={{ width: 80, textAlign: 'center' }} >
                {(() => {
                  switch (this.state[repoPath]) {
                    case 'error':
                      return <ErrorIcon />;
                    case 'not-checked':
                      return <CheckIcon />;
                    default:
                      return this.state[repoPath];
                  }
                })()}
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    );
  }
}
