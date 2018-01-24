import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import UserListReducer from './UserListReducer';
import PartnerListReducer from './PartnerListReducer';
import ConcertListReducer from './ConcertListReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  userList: UserListReducer,
  partnerList: PartnerListReducer,
  concertList: ConcertListReducer,
});

export default rootReducer;
