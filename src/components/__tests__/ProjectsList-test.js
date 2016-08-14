import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ProjectsList from '../ProjectsList/ProjectsList';
// import { withTheme } from './WithTheme';

describe('ProjectsList', () => {
  const context = { router:
    { push: (path) => path }
  };
  const emptyProps = {
    type: 'recent',
    data: []
  };

  const props = {
    type: 'popular',
    data: [
      { name: 'foo', image: 'foo.jpg', description: 'foo desc', rank: 'A' }
    ]
  };

  it('should render correctly', () => {
    const projectsList = shallow(<ProjectsList {...emptyProps} />, { context });
    expect(projectsList).toExist();
  });

  it('should redner projects list', () => {
    const projectsList = shallow(<ProjectsList {...props} />, { context });
    const listItem = projectsList.find('ListItem');
    expect(projectsList).toExist();
    expect(listItem.length).toEqual(1);
    expect(listItem.props().secondaryText).toEqual(props.data[0].description);
    expect(listItem.props().primaryText.props.children).toEqual(props.data[0].name);
    expect(listItem.props().leftAvatar.props.src).toEqual(props.data[0].image);
  });

  it('should push path to router', () => {
    const projectsList = shallow(<ProjectsList {...props} />, { context });
    const listItem = projectsList.find('ListItem');
    expect(listItem.props().onTouchTap()).toEqual(`/project/${props.data[0].name}`);
  });
});
