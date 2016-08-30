import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import { ProjectChartCodeCoverage } from '../ProjectChartCodeCoverage/ProjectChartCodeCoverage';
import theme from '../../theme';

describe('ProjectChartCodeCoverage', () => {
  const names = ['foo', 'bar'];
  const coverages = [50, 10];
  const mock = {
    projectrunner: {
      packages: [
        { name: names[0], coverage: coverages[0] },
        { name: names[1], coverage: coverages[1] }
      ]
    }
  };
  const props = {
    data: mock,
    palette: theme.palette,
    labelStyle: {},
  };

  const projectCharts = shallow(<ProjectChartCodeCoverage {...props} />);

  it('should render correctly', () => {
    expect(projectCharts).toExist();
  });

  it('should pass config to charts', () => {
    const chartProps = projectCharts.find('CardMedia').children().children()
      .props();

    expect(chartProps.data).toExist();
    expect(chartProps.data[0].coverage).toEqual(coverages[0]);
    expect(chartProps.data[1].name).toEqual(names[1]);
  });
});
