import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';

import { reducer as form } from 'redux-form';
import menu from './menu';
import repository from './repository';
import file from './file';
import homeProjects from './homeProjects';

export default combineReducers({
  routing: routerReducer,
  reduxAsyncConnect,
  form,
  menu,
  repository,
  file,
  homeProjects
});
