import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import ProjectError from '../ProjectError/ProjectError';
import { withTheme } from './WithTheme';

describe('ProjectBadge', () => {
  const wrapper = mount(withTheme(<ProjectError />));
  const projectError = wrapper.find('ProjectError').get(0);
  it('should render correctly', () => {
    expect(projectError).toExist();
  });

  describe('closeDialog', () => {
    it('should be opened at the beginning', () => {
      expect(projectError.state.showDialog).toBeTruthy();
    });

    it('should change the state after closing', () => {
      projectError.closeDialog();
      expect(projectError.state.showDialog).toBeFalsy();
    });
  });
});
