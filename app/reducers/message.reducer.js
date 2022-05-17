import {msgConstants} from '../constants';

const INITIAL_STATE = {loading: true, message: ''};

export function message(state = INITIAL_STATE, action) {
  switch (action.type) {
    case msgConstants.MSG_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case msgConstants.MSG_SUCCESS:
      const {message} = action;
      return {
        ...state,
        loading: false,
        message: message,
      };
    case msgConstants.MSG_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
