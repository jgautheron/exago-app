import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { AppPure } from '../App/App';

let reponame;

class FakeRouter extends React.Component {
  static childContextTypes = {
    router: React.PropTypes.object,
    store: React.PropTypes.object
  }

  static propTypes = {
    children: React.PropTypes.node
  }

  getChildContext() {
    return {
      router: {
        push: repo => {
          reponame = repo;
        }
      },
      store: {}
    };
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

const props = {
  open: () => 'open',
  close: () => 'close',
  children: <div>Hello</div>
};

describe('App', () => {
  const appWrapper = mount(
    <FakeRouter>
      <AppPure {...props} />
    </FakeRouter>
  );

  it('should render correctly', () => {
    expect(appWrapper).toExist();
  });

  it('should open/close menu when menu was opened', () => {
    const appWrapperWithMenuProp = mount(
      <FakeRouter>
        <AppPure {...props} menu />
      </FakeRouter>
    ).find(AppPure).get(0);
    expect(appWrapperWithMenuProp.handleToggle(false)).toEqual('close');
    expect(appWrapperWithMenuProp.handleToggle(true)).toEqual('close');
  });

  it('should open/close when menu was not opened', () => {
    const appWrapperWithMenuProp = mount(
      <FakeRouter>
        <AppPure {...props} menu={false} />
      </FakeRouter>
    ).find(AppPure).get(0);

    expect(appWrapperWithMenuProp.handleToggle(false)).toEqual('close');
    expect(appWrapperWithMenuProp.handleToggle(true)).toEqual('open');
  });

  it('menu items should redirect to good urls', () => {
    appWrapper.find('MenuItem').get(0).props.onClick();
    expect(reponame).toEqual('/');
    appWrapper.find('MenuItem').get(1).props.onClick();
    expect(reponame).toEqual('/about');
  });
});
