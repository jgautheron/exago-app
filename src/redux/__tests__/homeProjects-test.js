import configureStore from 'redux-mock-store';
import createMiddleware from '../middleware/clientMiddleware';
import reducer, { load, LOAD, LOAD_SUCCESS, LOAD_FAIL } from '../modules/homeProjects';

import expect from 'expect';

const mockClient = {
  get: () => new Promise((resolve) => {
    resolve({ ok: true });
  })
};


const middlewares = [createMiddleware(mockClient)]; // add your middlewares like `redux-thunk`
const mockStore = configureStore(middlewares);
const store = mockStore({});

describe('homeProjects', () => {
  describe('load', () => {
    it('should call async load actions', () => {
      const expectedActions = [
        { boxType: 'recent', type: 'exago/homeProjects/LOAD' },
        { boxType: 'recent', result: { ok: true }, type: 'exago/homeProjects/LOAD_SUCCESS' }
      ];

      return store.dispatch(load('recent')).then(() => {
        return expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });

  describe('reducer', () => {
    const expectedInitialState = {
      recent: [],
      top: [],
      popular: [],
      loaded: false,
      loading: false
    };

    it('should have an initial state', () => {
      expect(reducer(undefined)).toEqual(expectedInitialState);
    });

    it('should return loading for LOAD action', () => {
      const expectedState = {
        loaded: false,
        loading: true
      };
      expect(reducer({}, { type: LOAD })).toEqual(expectedState);
    });

    it('should return results for LOAD_SUCCESS', () => {
      const expectedState = {
        loaded: true,
        loading: false,
        recent: true
      };
      const action = {
        type: LOAD_SUCCESS,
        boxType: 'recent',
        result: {
          data: true
        }
      };
      expect(reducer({}, action)).toEqual(expectedState);
    });

    it('should return error for LOAD_FAIL', () => {
      const expectedState = {
        loaded: false,
        loading: false,
        error: true
      };
      const action = {
        type: LOAD_FAIL,
        error: true
      };
      expect(reducer({}, action)).toEqual(expectedState);
    });
  });
});
