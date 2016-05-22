import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  Project,
  File,
  About,
  NotFound,
} from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="project/*" component={Project} />
      <Route path="file/*" component={File} />
      <Route path="about" component={About} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
