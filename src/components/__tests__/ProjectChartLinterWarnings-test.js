import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { ProjectChartLinterWarnings } from '../ProjectChartLinterWarnings/ProjectChartLinterWarnings';
import theme from '../../theme';

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
  const props = {
    data: mock,
    palette: theme.palette,
    labelStyle: {},
    pieColors: ['#fff', '#000'],
  };

  const chartLinters = shallow(<ProjectChartLinterWarnings {...props} />);

  it('should render correctly', () => {
    expect(chartLinters).toExist();
  });

  it('should pass config to charts', () => {
    const chartProps = chartLinters.find('CardMedia').children().children()
      .children()
      .props();

    expect(chartProps.data).toExist();
    expect(chartProps.data[0])
      .toEqual({ name: 'gocyclo', value: 1 });
    expect(chartProps.data[1])
      .toEqual({ name: 'vet', value: 2 });
  });
});
