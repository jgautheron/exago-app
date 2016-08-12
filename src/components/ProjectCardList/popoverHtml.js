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

function isInt(value) {
  return typeof value === 'number' &&
    isFinite(value) &&
    Math.floor(value) === value;
}

function formatScore(score) {
  if (isInt(score)) return score;
  return parseFloat(Math.round(score * 100) / 100).toFixed(2);
}

export function getTestList(data) {
  if (
    !data.projectrunner.hasOwnProperty('packages') ||
    data.projectrunner.packages.length === 0
  ) {
    return '';
  }

  const pkgs = data.projectrunner.packages;
  const rowStyle = {
    width: '45px'
  };
  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn>Test</TableHeaderColumn>
          <TableHeaderColumn style={rowStyle}>Duration</TableHeaderColumn>
          <TableHeaderColumn style={rowStyle}>Passed</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
      {pkgs.map((pkg) => pkg.tests.map((test, id) =>
        <TableRow key={id}>
          <TableRowColumn>{test.name}</TableRowColumn>
          <TableRowColumn style={rowStyle}>{test.execution_time}s</TableRowColumn>
          <TableRowColumn style={rowStyle}>{test.passed ? <ActionCheckCircle /> : <AlertError />}</TableRowColumn>
        </TableRow>
      ))}
      </TableBody>
    </Table>
  );
}

export function getScoreDetails(data) {
  if (!data.score.details) {
    return '';
  }
  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
        <TableRow>
          <TableHeaderColumn style={{ width: 60 }}>Category</TableHeaderColumn>
          <TableHeaderColumn>Description</TableHeaderColumn>
          <TableHeaderColumn>Message</TableHeaderColumn>
          <TableHeaderColumn style={{ width: 45 }}>Score</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
      {data.score.details.map((el, id) =>
        <TableRow key={id}>
          <TableRowColumn style={{ width: 60 }}>{el.name}</TableRowColumn>
          <TableRowColumn>{el.desc}</TableRowColumn>
          <TableRowColumn>{el.msg}</TableRowColumn>
          <TableRowColumn style={{ width: 45 }}>{formatScore(el.score)}</TableRowColumn>
        </TableRow>
      )}
      </TableBody>
    </Table>
  );
}

export function getThirdParties(data) {
  if (data.imports.length === 0) {
    return '';
  }

  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
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
  );
}

export function getChecklist(data) {
  if (!data.projectrunner.hasOwnProperty('checklist')) {
    return '';
  }

  const res = data.projectrunner.checklist;
  const sortedData = { minimumCriteria: [], goodCitizen: [], extraCredit: [] };

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

  const rowStyle = {
    width: '70px'
  };

  return (
    <div>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="2">Minimum Criteria</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {sortedData.minimumCriteria.map((el, id) =>
          <TableRow key={id}>
            <TableRowColumn>{el.desc}</TableRowColumn>
            <TableRowColumn style={rowStyle}>
              {el.passed ? <ActionCheckCircle /> : <AlertError />}
            </TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="2">Good Citizen</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {sortedData.goodCitizen.map((el, id) =>
          <TableRow key={id}>
            <TableRowColumn>{el.desc}</TableRowColumn>
            <TableRowColumn style={rowStyle}>
              {el.passed ? <ActionCheckCircle /> : <AlertError />}
            </TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn colSpan="2">Extra Credit</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        {sortedData.extraCredit.map((el, id) =>
          <TableRow key={id}>
            <TableRowColumn>{el.desc}</TableRowColumn>
            <TableRowColumn style={rowStyle}>
              {el.passed ? <ActionCheckCircle /> : <AlertError />}
            </TableRowColumn>
          </TableRow>
        )}
        </TableBody>
      </Table>
    </div>
  );
}

export function getTestCoverage(data) {
  if (
    !data.projectrunner.hasOwnProperty('packages') ||
    data.projectrunner.packages.length === 0
  ) {
    return '';
  }

  const pkgs = data.projectrunner.packages;
  const rowStyle = {
    width: '70px'
  };
  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
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
  );
}

export function getTestDuration(data) {
  if (
    !data.projectrunner.hasOwnProperty('packages') ||
    data.projectrunner.packages.length === 0
  ) {
    return '';
  }

  const pkgs = data.projectrunner.packages;
  const rowStyle = {
    width: '70px'
  };
  return (
    <Table>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
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
  );
}
