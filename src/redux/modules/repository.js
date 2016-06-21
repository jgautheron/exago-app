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
  accept: '',
  loaded: false,
  cached: false,
  loading: true,
  results: {}
};

export default function reducer(state = repositoryState, action = {}) {
  switch (action.type) {
    case SET:
      return {
        ...state,
        name: action.name,
        accept: action.name
      };
    case CLEAR:
      return {
        ...repositoryState
      };
    case LOAD:
      return {
        ...state,
        name: action.name,
        loading: true
      };
    case LOAD_SUCCESS:
      if (action.name !== state.accept) return state;
      return {
        ...state,
        name: action.name,
        loading: false,
        loaded: true,
        results: action.result.data
      };
    case LOAD_FAIL:
      return {
        ...state,
        name: action.name,
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

export function isCached(repositoryName) {
  return {
    types: [CACHED_LOAD, CACHED_LOAD_SUCCESS, CACHED_LOAD_FAIL],
    promise: (client) => client.get(`/cached/${repositoryName}`)
  };
}

export function load(repositoryName) {
  return {
    name: repositoryName,
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/project/${repositoryName}`)
  };
}

export function refresh(repositoryName) {
  return {
    name: repositoryName,
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/refresh/${repositoryName}`)
  };
}
