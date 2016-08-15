import expect from 'expect';
import createMiddleware from '../middleware/clientMiddleware';
const mockClient = 'clientMock';
const client = createMiddleware(mockClient);
const dispatchGetState = client('mockDispatch', 'mockGetState');

describe('clientMiddleware', () => {
  it('should call action immediately if it\'s a function', () => {
    const callAction = dispatchGetState();
    const callActionResult = callAction(() => {
      return 'actionCalled';
    });

    expect(callActionResult).toEqual('actionCalled');
  });

  it('should call & return next with given action when action isn\'t a promise', () => {
    const actionObj = {
      foo: true
    };
    const callAction = dispatchGetState((givenActionObj) => {
      return givenActionObj;
    });
    const callActionResult = callAction(actionObj);

    expect(callActionResult).toEqual(actionObj);
  });

  it('should handle promises and catch errors', () => {
    const ERROR = 'ERROR';
    const callAction = dispatchGetState((action) => {
      if (action.error === ERROR) {
        expect(action.type).toEqual('FAIL');
        throw ERROR;
      }
    });
    const callActionResult = callAction({
      promise: () => Promise.reject(ERROR),
      foo: true, types: ['REQUEST', 'SUCCESS', 'FAIL']
    });

    return callActionResult.then(() => {}, (err) => {
      expect(err).toEqual(ERROR);
    });
  });
});
