import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
  App,
  Home,
  Project,
  About,
  NotFound,
} from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      { /* Routes */ }
      <Route path="project/*" component={Project}/>
      <Route path="about" component={About}/>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
