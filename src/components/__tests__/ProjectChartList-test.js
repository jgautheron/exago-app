import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ProjectChartList from '../ProjectChartList/ProjectChartList';
import styles from '../ProjectChartList/ProjectChartList.css';

describe('ProjectChartList', () => {
  const mock = {
    projectrunner: {
      packages: [],
      lintmessages: {},
    }
  };

  const chartList = shallow(<ProjectChartList data={mock} />);
  it('should render correctly', () => {
    expect(chartList).toExist();
  });

  it('should pass props to children components', () => {
    const childrenComponents = chartList.find(`.${styles.card}`);

    expect(childrenComponents.at(0).children().props().data).toEqual(mock);
    expect(childrenComponents.at(1).children().props().data).toEqual(mock);
    expect(childrenComponents.at(2).children().props().data).toEqual(mock);
  });
});
