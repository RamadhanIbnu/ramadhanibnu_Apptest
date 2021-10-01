import {combineReducers} from 'redux';

import GetAllContact from './GetAllContact';
import GetContactById from './GetContactById';

const rootReducer = combineReducers({
  GetAllContact,
  GetContactById,
});

export default rootReducer;
