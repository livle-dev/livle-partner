import {
  FETCH_CONCERTS,
  CREATE_CONCERT,
  PATCH_CONCERT,
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_CONCERTS:
      return action.payload;
    case CREATE_CONCERT: {
      const { data } = state;
      return { ...state, data: [...data, action.payload] };
    }
    case PATCH_CONCERT: {
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
