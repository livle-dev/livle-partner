import { FETCH_USERS, UPDATE_LIMIT } from '../actions/types';
import { map } from 'lodash'

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      return action.payload;
    case UPDATE_LIMIT:
      {
        const sId = action.payload.subscriptionId
        return map(state, (u) => {
          u.subscriptions = map(u.subscriptions, (s) => {
            if (s.id === sId) s.limit = action.payload.limit
            return s
          })
          return u
        })
      }
    default:
      return state;
  }
}
