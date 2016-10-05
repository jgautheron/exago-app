import expect from 'expect';
import React from 'react';
import { shallow, mount } from 'enzyme';
import ProjectCard from '../ProjectCard/ProjectCard';
import styles from '../ProjectCard/ProjectCard.css';
import { withTheme } from './WithTheme';

describe('ProjectCard', () => {
  const props = {
    title: 'foo',
    value: '20 / 21',
  };

  const extraProps = {
    extra: <pre>Hello World</pre>,
    extraTitle: 'See raw output',
    extraTooltip: 'Raw tests output',
    explanation: 'Some explanation for the test box'
  };

  const card = shallow(<ProjectCard {...props} />);
  it('should render correctly', () => {
    return expect(card).toExist();
  });
  it('the title is there', () => {
    return expect(card.find('ProjectCardTitle').prop('title')).toBe(props.title);
  });
  it('the value is there', () => {
    return expect(card.find('span').at(0).text()).toBe(props.value);
  });
  it('should have container class', () => {
    return expect(card.hasClass(styles.container)).toBeTruthy();
  });


  const cardWithDetails = shallow(<ProjectCard {...props}><b>Foo</b></ProjectCard>);
  it('the Dialog is there', () => {
    return expect(cardWithDetails.find('Dialog').length).toBe(1);
  });


  const cardWithExplanation = shallow(
    <ProjectCard {...props} {...extraProps}><b>Foo</b></ProjectCard>
  );
  it('should have help icon with explanation', () => {
    const helpContainer = cardWithExplanation.find(`.${styles.leftIconContainer.split(' ').join('.')}`);
    expect(
      // eslint-disable-next-line
      helpContainer
        .childAt(0).prop('tooltip').props.dangerouslySetInnerHTML
        .__html.includes(extraProps.explanation)
    ).toBeTruthy();
  });


  const cardWithoutValue = shallow(<ProjectCard title="Foo" value="" />);
  it('should show error when no value was passed', () => {
    return expect(cardWithoutValue.find('AlertError').length).toBe(1);
  });


  const mountedCard = mount(
    withTheme(<ProjectCard {...props} {...extraProps}><b>Foo</b></ProjectCard>)
  );
  const pcard = mountedCard.find('ProjectCard').get(0);
  it('should have closed dialogs', () => {
    const { primaryModal, secondaryModal } = pcard.state;
    expect(primaryModal).toBe(false);
    return expect(secondaryModal).toBe(false);
  });
  describe('open action', () => {
    it('should open Dialogs', () => {
      pcard.open('primaryModal')({ currentTarget: '' });
      pcard.open('secondaryModal')({ currentTarget: '' });

      const { primaryModal, secondaryModal } = pcard.state;
      expect(primaryModal).toBe(true);
      return expect(secondaryModal).toBe(true);
    });
  });
  describe('close action', () => {
    it('should close Dialogs', () => {
      pcard.close('primaryModal')();
      pcard.close('secondaryModal')();

      const { primaryModal, secondaryModal } = pcard.state;
      expect(primaryModal).toBe(false);
      return expect(secondaryModal).toBe(false);
    });
  });
});
