import { combineReducers } from 'redux';
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import {reducer as toastrReducer} from 'react-redux-toastr';
import merchantReducer from './reducer';
import adminReducer from "../services/admin/reducer"
import commoReducer from "../services/common/reducer"
import clientReducer from "../services/client/reducer";
import agentReducer from "../services/agent/reducer.js"
const rootPersistConfig = {
  key: 'root',
  storage: storage,
  whitelist:['clientReducer','merchantReducer','commonReducer'],
  blacklist:  ['toastrReducer']
};
const appReducer = combineReducers({
  merchantReducer: merchantReducer,
  commonReducer:commoReducer,
  adminReducer:adminReducer,
  clientReducer:clientReducer,
  toastr: toastrReducer,
  agentReducer:agentReducer

})

const initialState = appReducer({}, {})

const rootReducer = (state, action) => {
  if (action.type === 'LOG_OUT') {
    state = initialState
  }

  return appReducer(state, action)
}
  
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;


