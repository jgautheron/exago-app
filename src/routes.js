import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  Project,
  About,
  NotFound,
} from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="project/*" component={Project} />
      <Route path="about" component={About} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
