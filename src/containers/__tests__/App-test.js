import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { AppPure } from '../App/App';

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
      router: {},
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
});
