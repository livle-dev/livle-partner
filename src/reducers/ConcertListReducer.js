import {
  FETCH_CONCERTS,
  CREATE_CONCERT,
  PATCH_CONCERT
} from "../actions/types";

var newArray=[];
var i;

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CONCERTS:
      return action.payload;
    case CREATE_CONCERT:
      return [...state, action.payload];
    case PATCH_CONCERT:
      for (i = 0; i < state.length; i++) {
        if (state[i].id === action.payload.id) {
          newArray.push(action.payload);
        } else {
          newArray.push(state[i]);
        }
      }
      return [...newArray];
    default:
      return state;
  }
}
