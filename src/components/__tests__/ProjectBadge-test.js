import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import ProjectBadge from '../ProjectBadge/ProjectBadge';

describe('ProjectBadge', () => {
  const props = {
    repository: 'foo/bar'
  };

  const pbadge = shallow(<ProjectBadge {...props} />);
  it('should render correctly', () => {
    return expect(pbadge).toExist();
  });
  it('should have src attribute', () => {
    const srcAttr = pbadge.find('img').first().prop('src');
    return expect(srcAttr).toContain(props.repository);
  });

  const pbadgeMount = mount(<ProjectBadge {...props} />);
  it('should have closed Dialog by default', () => {
    const dialogOpened = pbadgeMount.state('showDialog');
    return expect(dialogOpened).toBe(false);
  });

  describe('showDialog', () => {
    it('should open the Dialog', () => {
      pbadgeMount.get(0).showDialog();
      const dialogOpened = pbadgeMount.state('showDialog');
      return expect(dialogOpened).toBe(true);
    });
  });
  describe('closeDialog', () => {
    it('should close the Dialog', () => {
      pbadgeMount.get(0).closeDialog();
      const dialogOpened = pbadgeMount.state('showDialog');
      return expect(dialogOpened).toBe(false);
    });
  });
});
