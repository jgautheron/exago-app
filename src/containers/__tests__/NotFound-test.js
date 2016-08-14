import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import NotFound from '../NotFound/NotFound';

describe('NotFound page', () => {
  const notFoundPage = shallow(<NotFound />);

  it('should render correctly', () => {
    expect(notFoundPage).toExist();
  });
});
