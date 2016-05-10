import React from 'react';
import ActionCheckCircle from 'material-ui/lib/svg-icons/action/check-circle';
import AlertError from 'material-ui/lib/svg-icons/alert/error';
import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

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
        {data.imports.map(el =>
          <TableRow>
            <TableRowColumn>{el}</TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  );
}

export function getChecklist(data) {
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
      {sortedData.minimumCriteria.map(el =>
        <div>
          {el.passed ? <ActionCheckCircle style={styles.icon} /> : <AlertError style={styles.icon} />}
          {el.desc}
        </div>
      )}

      <h4>Good Citizen</h4>
      {sortedData.goodCitizen.map(el =>
        <div>
          {el.passed ? <ActionCheckCircle style={styles.icon} /> : <AlertError style={styles.icon} />}
          {el.desc}
        </div>
      )}

      <h4>Extra Credit</h4>
      {sortedData.extraCredit.map(el =>
        <div>
          {el.passed ? <ActionCheckCircle style={styles.icon} /> : <AlertError style={styles.icon} />}
          {el.desc}
        </div>
      )}
    </div>
  );
}

export function getTestCoverage(data) {
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
        {pkgs.map(el =>
          <TableRow>
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
        {pkgs.map(el =>
          <TableRow>
            <TableRowColumn>{el.name}</TableRowColumn>
            <TableRowColumn style={rowStyle}>{el.execution_time}s</TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  );
}
