import {combineReducers} from 'redux';

import {message} from './message.reducer';
import {alert} from './alert.reducer';

const rootReducer = combineReducers({
  alert,
  message: message,
});

export default rootReducer;
