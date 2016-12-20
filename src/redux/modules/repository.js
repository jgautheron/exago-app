const LOAD = 'exago/repository/LOAD';
const LOAD_SUCCESS = 'exago/repository/LOAD_SUCCESS';
const LOAD_FAIL = 'exago/repository/LOAD_FAIL';
const PROCESS = 'exago/repository/PROCESS';
const PROCESS_SUCCESS = 'exago/repository/PROCESS_SUCCESS';
const PROCESS_FAIL = 'exago/repository/PROCESS_FAIL';
const SET = 'exago/repository/SET';
const CLEAR = 'exago/repository/CLEAR';

const repositoryState = {
  name: '',
  branch: '',
  goversion: '',
  accept: '',
  loaded: false,
  cached: false,
  loading: false,
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
        branch: action.branch,
        goversion: action.goversion,
        accept: action.name,
      };
    case CLEAR:
      return {
        ...repositoryState
      };
    case LOAD:
      return state;
    case LOAD_SUCCESS:
      if (action.name !== state.accept) return state;
      return {
        ...state,
        name: action.result.name,
        loaded: true,
        lastUpdate: action.result.lastUpdate,
        executionTime: action.result.executionTime,
        results: action.result.results,
      };
    case LOAD_FAIL:
      return {
        ...state,
        loaded: false,
        error: action.error.message,
        status: action.error.status,
      };
    case PROCESS:
      return {
        ...state,
        loading: true,
      };
    case PROCESS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case PROCESS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error.message,
        status: action.error.status,
      };
    default:
      return state;
  }
}

export function set(name, branch, goversion) {
  return { type: SET, name, branch, goversion };
}

export function clear() {
  return { type: CLEAR };
}

export function load(repo, branch, goversion) {
  return {
    name: repo,
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/repos/${repo.replace(/\//g, '|')}/branches/${branch}/goversions/${goversion}`)
  };
}

export function process(repo, branch, goversion) {
  const rp = repo.split('/');
  return {
    types: [PROCESS, PROCESS_SUCCESS, PROCESS_FAIL],
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
