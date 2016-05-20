import React from 'react';
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle';
import AlertError from 'material-ui/svg-icons/alert/error';
import {
  Table,
  TableHeaderColumn,
  TableHeader,
  TableRowColumn,
  TableRow,
  TableBody,
} from 'material-ui/Table';

export function getScoreDetails(data) {
  const rowStyle = {
    width: '70px'
  };
  return (
    <div>
      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Description</TableHeaderColumn>
            <TableHeaderColumn style={rowStyle}>Points</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {data.score.details.map((el, id) =>
          <TableRow key={id}>
            <TableRowColumn>{el.split(':')[1].trim()}</TableRowColumn>
            <TableRowColumn style={rowStyle}>{el.split(':')[0]}</TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  );
}

export function getThirdParties(data) {
  if (data.imports.length === 0) {
    return '';
  }

  return (
    <div>
      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Package</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {data.imports.map((el, id) =>
          <TableRow key={id}>
            <TableRowColumn>{el}</TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  );
}

export function getChecklist(data) {
  if (!data.testresults.hasOwnProperty('checklist')) {
    return '';
  }

  const res = data.testresults.checklist;
  const sortedData = {minimumCriteria: [], goodCitizen: [], extraCredit: []};

  let cnt;
  let item;
  for (cnt = 0; item = res.Passed[cnt++];) {
    sortedData[item.Category].push({
      desc: item.Desc,
      passed: true
    });
  }
  for (cnt = 0; item = res.Failed[cnt++];) {
    sortedData[item.Category].push({
      desc: item.Desc,
      passed: false
    });
  }
  const styles = {
    icon: {
      paddingRight: 6,
      position: 'relative',
      top: 5
    }
  };

  return (
    <div>
      <h4>Minimum Criteria</h4>
      {sortedData.minimumCriteria.map((el, id) =>
        <div key={id}>
          {el.passed ? <ActionCheckCircle style={styles.icon} /> : <AlertError style={styles.icon} />}
          {el.desc}
        </div>
      )}

      <h4>Good Citizen</h4>
      {sortedData.goodCitizen.map((el, id) =>
        <div key={id}>
          {el.passed ? <ActionCheckCircle style={styles.icon} /> : <AlertError style={styles.icon} />}
          {el.desc}
        </div>
      )}

      <h4>Extra Credit</h4>
      {sortedData.extraCredit.map((el, id) =>
        <div key={id}>
          {el.passed ? <ActionCheckCircle style={styles.icon} /> : <AlertError style={styles.icon} />}
          {el.desc}
        </div>
      )}
    </div>
  );
}

export function getTestCoverage(data) {
  if (
    !data.testresults.hasOwnProperty('packages') ||
    data.testresults.packages.length === 0
  ) {
    return '';
  }

  const pkgs = data.testresults.packages;
  const rowStyle = {
    width: '70px'
  };
  return (
    <div>
      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Package</TableHeaderColumn>
            <TableHeaderColumn style={rowStyle}>Coverage</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {pkgs.map((el, id) =>
          <TableRow key={id}>
            <TableRowColumn>{el.name}</TableRowColumn>
            <TableRowColumn style={rowStyle}>{el.coverage}%</TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  );
}

export function getTestDuration(data) {
  if (
    !data.testresults.hasOwnProperty('packages') ||
    data.testresults.packages.length === 0
  ) {
    return '';
  }

  const pkgs = data.testresults.packages;
  const rowStyle = {
    width: '70px'
  };
  return (
    <div>
      <Table>
        <TableHeader displaySelectAll={false}>
          <TableRow>
            <TableHeaderColumn>Package</TableHeaderColumn>
            <TableHeaderColumn style={rowStyle}>Duration</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {pkgs.map((el, id) =>
          <TableRow key={id}>
            <TableRowColumn>{el.name}</TableRowColumn>
            <TableRowColumn style={rowStyle}>{el.execution_time}s</TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  );
}
