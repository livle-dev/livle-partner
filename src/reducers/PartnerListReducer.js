import { FETCH_PARTNERS, REPLACE_PARTNER } from '../actions/types';
import { map } from 'lodash';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_PARTNERS:
      return action.payload;
    case REPLACE_PARTNER: {
      const { data } = state;
      let newData = [];
      data.forEach(item => {
        if (item.id === action.payload.id) newData.push(action.payload);
        else newData.push(item);
      });
      return { ...state, data: newData };
    }
    default:
      return state;
  }
}
