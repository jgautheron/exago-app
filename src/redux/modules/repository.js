import { LOCATION_CHANGE } from 'react-router-redux';

const LOAD = 'exago/repository/LOAD';
const LOAD_SUCCESS = 'exago/repository/LOAD_SUCCESS';
const LOAD_FAIL = 'exago/repository/LOAD_FAIL';
const CACHED_LOAD = 'exago/repository/CACHED_LOAD';
const CACHED_LOAD_SUCCESS = 'exago/repository/CACHED_LOAD_SUCCESS';
const CACHED_LOAD_FAIL = 'exago/repository/CACHED_LOAD_FAIL';
const SET = 'exago/repository/SET';
const CLEAR = 'exago/repository/CLEAR';

const repositoryState = {
  name: '',
  loaded: false,
  cached: false,
  loading: true,
  results: {}
};

export default function reducer(state = repositoryState, action = {}) {
  switch (action.type) {
    case LOCATION_CHANGE:
      const routePrefix = '/project/';
      let repositoryName = action.payload.pathname;
      if (repositoryName.indexOf(routePrefix) === 0) {
        repositoryName = repositoryName.replace(routePrefix, '');
        return {
          ...state,
          name: repositoryName
        };
      }
      return state;
    case SET:
      return {
        ...state,
        name: action.name
      };
    case CLEAR:
      return {
        ...state
      };
    case LOAD:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        results: action.result.data
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    case CACHED_LOAD:
      return state;
    case CACHED_LOAD_SUCCESS:
      return {
        ...state,
        cached: action.result.data
      };
    case CACHED_LOAD_FAIL:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export function set(name) {
  return { type: SET, name };
}

export function clear() {
  return { type: CLEAR };
}

export function isCached(repository) {
  return {
    types: [CACHED_LOAD, CACHED_LOAD_SUCCESS, CACHED_LOAD_FAIL],
    promise: (client) => client.get('/cached/' + repository.name)
  };
}

export function load(repository) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/project/' + repository.name)
  };
}

export function refresh(repository) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/refresh/' + repository.name)
  };
}
