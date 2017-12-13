import { FETCH_PARTNERS, REPLACE_PARTNER } from "../actions/types";
import { map } from 'lodash'

export default function(state = {}, action){
  switch(action.type){
    case FETCH_PARTNERS:
      return action.payload
    case REPLACE_PARTNER:
      {
        const newPartner = action.payload
        return map(state, p => p.id === newPartner.id ? newPartner : p)
      }

    default:
      return state
  }
}
