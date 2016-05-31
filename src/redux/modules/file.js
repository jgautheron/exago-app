import { LOCATION_CHANGE } from 'react-router-redux';

const CLEAR = 'exago/file/CLEAR';
const LOAD = 'exago/file/LOAD';
const LOAD_SUCCESS = 'exago/file/LOAD_SUCCESS';
const LOAD_FAIL = 'exago/file/LOAD_FAIL';

const fileState = {
  repository: '',
  path: '',
  contents: '',
  loaded: false,
  loading: true,
};

export default function reducer(state = fileState, action = {}) {
  switch (action.type) {
    case LOCATION_CHANGE: {
      const routePrefix = '/file/';
      let repositoryName = action.payload.pathname;
      if (repositoryName.indexOf(routePrefix) === 0) {
        repositoryName = repositoryName.replace(routePrefix, '');
        return {
          ...state,
          name: repositoryName
        };
      }
      return state;
    }
    case CLEAR:
      return {
        contents: '',
        loaded: false,
        loading: true,
      };
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        contents: action.result.data
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function clear() {
  return { type: CLEAR };
}

export function load(file) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/contents/${file.repository}/${file.path}`)
  };
}
