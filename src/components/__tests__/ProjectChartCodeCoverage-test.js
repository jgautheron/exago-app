import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ProjectCharts from '../ProjectChartCodeCoverage/ProjectChartCodeCoverage';

describe('ProjectChartCodeCoverage', () => {
  const names = ['foo', 'bar'];
  const coverages = [50, 10];
  const mock = {
    testresults: {
      packages: [
        { name: names[0], coverage: coverages[0] },
        { name: names[1], coverage: coverages[1] }
      ]
    }
  };

  const projectCharts = shallow(<ProjectCharts data={mock} />);

  it('should render correctly', () => {
    expect(projectCharts).toExist();
  });

  it('should pass config to charts', () => {
    const chartProps = projectCharts.find('CardMedia').children().props();

    expect(chartProps.config).toExist();
    expect(chartProps.config.series[0].data).toEqual(coverages);
    expect(chartProps.config.xAxis.categories).toEqual(names);
  });
});
