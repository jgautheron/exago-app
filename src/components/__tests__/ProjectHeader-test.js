import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ProjectHeader from '../ProjectHeader/ProjectHeader';

describe('ProjectHeader', () => {
  const repoTitle = 'foo';
  const projectHeader = shallow(<ProjectHeader repository={repoTitle} />);

  it('should render correctly', () => {
    expect(projectHeader).toExist();
  });

  it('should have correct title', () => {
    expect(projectHeader.find('h1').text()).toEqual(repoTitle);
  });
});
