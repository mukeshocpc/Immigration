import {msgConstants} from '../constants';

export const msgActions = {
  sendMessage,
};

function sendMessage(msg) {
  return dispatch => {
    dispatch(request());
    dispatch(success(msg));
  };

  function request() {
    return {type: msgConstants.MSG_REQUEST};
  }
  function success(message) {
    return {type: msgConstants.MSG_SUCCESS, message};
  }
  function failure(error) {
    return {type: msgConstants.MSG_FAILURE, error};
  }
}
