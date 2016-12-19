import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  Home,
  Project,
  File,
  Premium,
  NotFound,
} from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path=":host/:owner/:name/:branch/:goversion" component={Project} />
      <Route path=":host/:owner/:name/:branch/:goversion/*file" component={File} />
      <Route path="premium" component={Premium} />
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
