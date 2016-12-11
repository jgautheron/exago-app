const LOAD = 'exago/repository/LOAD';
const LOAD_SUCCESS = 'exago/repository/LOAD_SUCCESS';
const LOAD_FAIL = 'exago/repository/LOAD_FAIL';
const SET = 'exago/repository/SET';
const CLEAR = 'exago/repository/CLEAR';

const repositoryState = {
  name: '',
  accept: '',
  loaded: false,
  cached: false,
  loading: true,
  lastUpdate: '',
  executionTime: '',
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
        name: action.result.data.name,
        loading: false,
        loaded: true,
        lastUpdate: action.result.data.last_update,
        executionTime: action.result.data.execution_time,
        results: action.result.data.results,
      };
    case LOAD_FAIL: {
      return {
        ...state,
        name: action.name,
        loading: false,
        loaded: false,
        error: action.error,
      };
    }
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

export function load(repo, branch, goversion) {
  repo = repo.replace(/\//g, '|'); // eslint-disable-line
  return {
    name: repo,
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/repos/${repo}/branches/${branch}/goversions/${goversion}`)
  };
}

export function process(repo, branch, goversion) {
  const rp = repo.split('/');
  return {
    name: repo,
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.post('/repos', {
      data: {
        host: rp[0],
        owner: rp[1],
        name: rp[2],
        branch,
        goversion,
      },
    })
  };
}
