import React from 'react';
import { HomePure as Home } from '../Home/Home';
import expect from 'expect';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const mui = getMuiTheme();
let reponame;


class FakeRouter extends React.Component {
  static childContextTypes = {
    router: React.PropTypes.object,
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
      }
    };
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

describe('Home page', () => {
  const wrapper = mount(
    <MuiThemeProvider muiTheme={mui}>
      <FakeRouter>
        <Home
          repository={'OK'}
          projects={{
            recent: { repositories: [] },
            top: { repositories: [] },
            popular: { repositories: [] }
          }}
        />
      </FakeRouter>
    </MuiThemeProvider>
  );
  it('should render correctly', () => {
    expect(wrapper).toExist();
  });

  it('should return promise for asyncConnect', () => {
    expect(Home.reduxAsyncConnect[0].promise({ store: { dispatch: () => {} } }) instanceof Promise)
      .toBeTruthy();
  });

  it('should update the router', () => {
    wrapper.find(Home).get(0).onRepositorySet('foo');
    expect(reponame).toEqual('/project/foo');
  });
});

