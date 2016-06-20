const SET = 'exago/file/SET';
const CLEAR = 'exago/file/CLEAR';
const LOAD = 'exago/file/LOAD';
const LOAD_SUCCESS = 'exago/file/LOAD_SUCCESS';
const LOAD_FAIL = 'exago/file/LOAD_FAIL';

const fileState = {
  filePath: '',
  repository: '',
  path: '',
  contents: '',
  loaded: false,
  loading: false
};

export default function reducer(state = fileState, action = {}) {
  switch (action.type) {
    case SET: {
      const filePath = action.filePath;
      const [provider, owner, repo, ...path] = filePath.split('/');
      return {
        ...state,
        filePath,
        repository: `${provider}/${owner}/${repo}`,
        path: path.join('/')
      };
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

export function set(filePath) {
  return { type: SET, filePath };
}

export function load(filePath) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get(`/contents/${filePath}`)
  };
}
