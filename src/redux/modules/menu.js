const OPEN = 'exago/menu/OPEN';
const CLOSE = 'exago/menu/CLOSE';

const initialState = {
  open: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case OPEN:
      return {
        open: true
      };

    case CLOSE:
      return {
        open: false
      };
    default:
      return state;
  }
}

export function open() {
  return { type: OPEN };
}

export function close() {
  return { type: CLOSE };
}
