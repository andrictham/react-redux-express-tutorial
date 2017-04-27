import { combineReducers } from 'redux';
import flashMessages from './reducers/flashMessages';

// A reducer is a function that takes state and action
// and returns new state.

export default combineReducers({
  flashMessages
});
