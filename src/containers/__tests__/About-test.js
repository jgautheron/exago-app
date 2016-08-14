import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import About from '../About/About';

describe('About page', () => {
  const aboutPage = shallow(<About />);

  it('should render correctly', () => {
    expect(aboutPage).toExist();
  });
});
