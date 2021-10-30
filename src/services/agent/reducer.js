import actionType from "./actionType";
import mainActionType from "../actionTypes";
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
    case mainActionType.CREATE_AGENT_BANKER_SUCCESS:
      return {
        ...state,
        agentIndividualRegData: action.payload,
        agentIndividualRegStatus: true,
        agentOTPStatus: false,
        agentOTPValidStatus: false,
        agentSetPasswordStatus: false
      };
    case mainActionType.CREATE_AGENT_BANKER_FAILURE:
      return {
        ...state,
        agentIndividualRegData: action.payload,
        agentIndividualRegStatus: false,
        agentOTPStatus: false,
        agentOTPValidStatus: false,
        agentSetPasswordStatus: false
      };
    case mainActionType.AGENT_BANKER_OTP_SUCCESS:
      return {
        ...state,
        agentOTPStatus: true
      };
    case mainActionType.AGENT_BANKER_OTP_FAILURE:
      return {
        ...state,
        agentOTPStatus: false
      };
    case mainActionType.AGENT_BANKER_OTP_VALID:
      return {
        ...state,
        agentOTPValidStatus: true
      };
    case mainActionType.AGENT_BANKER_OTP_INVALID:
      return {
        ...state,
        agentOTPValidStatus: false
      };
    case mainActionType.AGENT_SET_PASSWORD_SUCCESS:
      return {
        ...state,
        agentSetPasswordStatus: true
      };
    case mainActionType.AGENT_SET_PASSWORD_FAILED:
      return {
        ...state,
        agentSetPasswordStatus: false
      };
    default:
      return state;
  }
};

export default agentReducer;
