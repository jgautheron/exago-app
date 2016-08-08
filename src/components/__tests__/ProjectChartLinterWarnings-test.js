import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ProjectChartLinterWarnings from '../ProjectChartLinterWarnings/ProjectChartLinterWarnings';

describe('ProjectChartLinterWarnings', () => {
  const mock = {
    lintmessages: {
      file1: {
        gocyclo: [{ col: 0, line: 10, message: 'msg1', severity: 'warning' }],
        vet: [{ col: 0, line: 15, message: 'msg2', severity: 'error' }]
      },
      file2: {
        vet: [{ col: 0, line: 20, message: 'msg3', severity: 'error' }]
      },
    }
  };

  const chartLinters = shallow(<ProjectChartLinterWarnings data={mock} />);

  it('should render correctly', () => {
    expect(chartLinters).toExist();
  });

  it('should pass config to charts', () => {
    const chartProps = chartLinters.find('CardMedia').children().props();

    expect(chartProps.config).toExist();
    expect(chartProps.config.series[0].data)
      .toEqual([{ name: 'gocyclo', y: 1 }, { name: 'vet', y: 2 }]);
  });
});
