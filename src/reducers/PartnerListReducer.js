import { FETCH_PARTNERS } from "../actions/types";

export default function(state = {}, action){
  switch(action.type){
    case FETCH_PARTNERS:
      return action.payload;
    default:
      return state
  }
}
