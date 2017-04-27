import shortid from 'shortid';

import { ADD_FLASH_MESSAGE } from '../actions/types'

export default (state = [], action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE:
      return [
        ...state, // Merge existing state
        {
          id: shortid.generate(), // Generate unique ID so we can identify messages in the store
          type: action.message.type,
          text: action.message.text
        }
      ];
    default: return state;
  }
}
