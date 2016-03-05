const SET = 'exago/repository/SET';
const UNSET = 'exago/repository/UNSET';

const repositoryState = {
  // repository name
  name: '',
  set: false
};

export default function reducer(state = repositoryState, action = {}) {
  switch (action.type) {
    case SET:
      return {
        set: true,
        name: action.name
      };
    case UNSET:
      return {
        set: false,
        name: ''
      };
    default:
      return state;
  }
}

export function set(name) {
  return {
    type: SET,
    name
  };
}

export function unset() {
  return { type: UNSET};
}
