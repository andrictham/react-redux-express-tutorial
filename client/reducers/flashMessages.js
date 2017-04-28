import shortid from 'shortid';
import findIndex from 'lodash/findIndex'

import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from '../actions/types'

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
    case DELETE_FLASH_MESSAGE:
      const index = findIndex(state, { id: action.id });
      if (index >= 0) { // message with ID is found
        return [
          ...state.slice(0, index), // return all items before found item
          ...state.slice(index + 1) // return all items after found item
        ];
      }
      return state;

    default: return state;
  }
}
