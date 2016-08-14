import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import Projectheader from '../Projectheader/Projectheader';

describe('ProjectHeader', () => {
  const repoTitle = 'foo';
  const projectHeader = shallow(<Projectheader repository={repoTitle} />);

  it('should render correctly', () => {
    expect(projectHeader).toExist();
  });

  it('should have correct title', () => {
    expect(projectHeader.find('h1').text()).toEqual(repoTitle);
  });
});
