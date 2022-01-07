import actionType from "./actionType";

export const ShowLoading = (payload) => (dispatch) => {
  dispatch({
    type: actionType.SHOW_LOADING,
  });
};

export const HideLoading = (payload) => (dispatch) => {
  dispatch({
    type: actionType.HIDE_LOADING,
  });
};

export const AdminLoginSuccess = (payload) => (dispatch) => {
  dispatch({
    type: actionType.ADMIN_LOGIN_SUCCESS,
  });
};

export const AdminLoginFailure = (payload) => (dispatch) => {
  dispatch({
    type: actionType.ADMIN_LOGIN_FAILURE,
  });
};

export const Logout = () => (dispatch) => {
  dispatch({
    type: actionType.ADMIN_LOGIN_FAILURE,
  });
};

export const SetLanguage = (lang) => (dispatch) => {
  dispatch({
    type: actionType.SET_LANGUAGE_SUCCESS,
    payload: lang
  });
};
