import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { reducer as toastrReducer } from "react-redux-toastr";
import commoReducer from "../services/common/reducer";
import agentReducer from "../services/agent/reducer.js";
const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["agentReducer", "commonReducer"],
  blacklist: ["toastrReducer"],
};
const appReducer = combineReducers({
  commonReducer: commoReducer,

  toastr: toastrReducer,
  agentReducer: agentReducer,
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "LOG_OUT") {
    state = initialState;
  }

  return appReducer(state, action);
};

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
