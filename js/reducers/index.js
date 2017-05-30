
import { combineReducers } from 'redux';

import drawer from './drawer';
import user from './user';
import list from './list';
import oto from './oto';

export default combineReducers({

  drawer,
  user,
  list,
  oto,

});
