export const LOAD = 'exago/homeProjects/LOAD';
export const LOAD_SUCCESS = 'exago/homeProjects/LOAD_SUCCESS';
export const LOAD_FAIL = 'exago/homeProjects/LOAD_FAIL';

const homeProjects = {
  recent: [],
  top: [],
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
        [action.boxType]: action.result,
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

// Type can be = 'recent', 'top', 'popular'
export function load(type) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    boxType: type,
    promise: (client) => client.get(`/projects/${type}`)
  };
}
