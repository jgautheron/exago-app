import expect from 'expect';
import React from 'react';
import { shallow } from 'enzyme';
import ProjectCard from '../ProjectCard/ProjectCard';

describe('ProjectCard', () => {
  const props = {
    title: 'foo',
    value: '20 / 21',
  };

  const card = shallow(<ProjectCard {...props} />);

  it('should render correctly', () => {
    return expect(card).toExist();
  });

  it('the title is there', () => {
    return expect(card.find('CardTitle').prop('title')).toBe(props.title);
  });

  it('the value is there', () => {
    return expect(card.find('span').at(0).text()).toBe(props.value);
  });

  const cardWithDetails = shallow(<ProjectCard {...props}><b>Foo</b></ProjectCard>);
  it('the popover is there', () => {
    return expect(cardWithDetails.find('Popover').length).toBe(1);
  });
});
