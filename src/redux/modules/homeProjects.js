const LOAD = 'exago/homeProjects/LOAD';
const LOAD_SUCCESS = 'exago/homeProjects/LOAD_SUCCESS';
const LOAD_FAIL = 'exago/homeProjects/LOAD_FAIL';

const homeProjects = {
  recent: [],
  ranked: [],
  popular: [],
  loaded: false,
  loading: false
};

export default function reducer(state = homeProjects, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loaded: false,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        [action.result.data.type]: action.result.data.repositories,
        loading: false,
        loaded: true
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

// Type can be = 'recent', 'ranked', 'popular'
export function load(type) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/projects/${type}`)
  };
}
