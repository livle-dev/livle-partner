import {
  FETCH_DUE_CONCERTS,
  FETCH_END_CONCERTS,
  CREATE_DUE_CONCERT,
  PATCH_DUE_CONCERT,
} from '../actions/types';

const initialState = {
  due: { total_pages: null, current_page: null, data: [] },
  end: { total_pages: null, current_page: null, data: [] },
};
export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_DUE_CONCERTS:
      return { ...state, due: action.payload };
    case FETCH_END_CONCERTS:
      return { ...state, end: action.payload };
    case CREATE_DUE_CONCERT: {
      const { data } = state.due;
      return {
        ...state,
        due: {
          ...state.due,
          data: [...data, action.payload],
        },
      };
    }
    case PATCH_DUE_CONCERT: {
      const { data } = state.due;
      let newData = [];
      data.forEach(item => {
        if (item.id === action.payload.id) newData.push(action.payload);
        else newData.push(item);
      });
      return { ...state, due: { ...state.due, data: newData } };
    }
    default:
      return state;
  }
}
