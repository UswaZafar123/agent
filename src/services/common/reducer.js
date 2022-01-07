import actionType from "./actionType";
import initialState from "./initialState";

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        adminLoginStatus: true,
      };
    case actionType.ADMIN_LOGIN_FAILURE:
      return {
        ...state,
        adminLoginStatus: false,
      };

    case actionType.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionType.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionType.CUSTOMER_REGISTER_SUCCESS:
      return {
        ...state,
        customerregister: true
      };
    case actionType.CUSTOMER_REGISTER_FAIL:
      return {
        ...state,
        customerregister: false
      };
    case actionType.ACCOUNT_VERIFIED:
      return {
        ...state,
        accountVerified: true
      };
    case actionType.ACCOUNT_VERIFIED_FAIL:
      return {
        ...state,
        accountVerified: false
      };
    case actionType.CLIENT_LOGIN_SUCCESS:
      return {
        ...state,
        customerLoginStatus: true,
      };
    case actionType.CLIENT_LOGIN_FAILURE:
      return {
        ...state,
        customerLoginStatus: false,
      };
    case actionType.SET_LANGUAGE_SUCCESS:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default commonReducer;
