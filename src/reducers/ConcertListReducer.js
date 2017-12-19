import { FETCH_CONCERTS, CREATE_CONCERT } from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CONCERTS:
      return action.payload;
    case CREATE_CONCERT:
      return [...state, action.payload];
    default:
      return state;
  }
}
