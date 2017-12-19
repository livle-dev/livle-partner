import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';

import authReducer from './auth_reducer';
import UserListReducer from './UserListReducer';
import PartnerListReducer from './PartnerListReducer';
import ConcertListReducer from './ConcertListReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  userList: UserListReducer,
  partnerList: PartnerListReducer,
  concertList: ConcertListReducer,
});

export default rootReducer;
