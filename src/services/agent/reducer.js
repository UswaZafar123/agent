import actionType from "./actionType";
import initialState from "./initialState.js";

const agentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AGENT_LOGIN_SUCCESS:
      return {
        ...state,
        agentLoginstatus: true,
      };
    case actionType.AGENT_LOGIN_FAILURE:
      return {
        ...state,
        agentLoginstatus: false,
      };
    case actionType.AGENT_LINKING_SUCCESS:
      return {
        ...state,
        linkingStatus: true,
        linkingList: action.payload,
      };
    case actionType.AGENT_LINKING_FAILURE:
      return {
        ...state,
        linkingStatus: false,
        linkingList: [],
      };

    default:
      return state;
  }
};

export default agentReducer;
