import axios from "axios";
import actionType from "./actionType";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";
import { HideLoading, ShowLoading } from "../common/action";
import { getProfile } from "./action";

export const fetchSuperAgentDetail = (token, payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.FETCH_AGENT_DETAIL,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  dispatch({
    type: actionType.SUPER_AGENT_DETAIL_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionType.SUPER_AGENT_DETAIL_DATA,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.error("Error", error.response.data.detail);
      // dispatch({
      //   type: actionType.SUPER_AGENT_DETAIL_ERROR,
      // });
    });
};

export const sendLinkingRequestToSuperAgent =
  (token, payload) => (dispatch) => {
    dispatch(ShowLoading());
    const config = {
      method: "POST",
      url: URL.agent.SEND_LINKING_REQUEST,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    dispatch({
      type: actionType.SEND_LINKING_REQUEST_FETCH,
    });
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          dispatch(HideLoading());
          toastr.success("SUCCESS", "Linking Request sent successfully.");
          dispatch({
            type: actionType.SEND_LINKING_REQUEST_SUCCESS,
          });
        }
      })
      .catch((error) => {
        if (error.response.data.detail) {
          toastr.error(error.response.data.detail);
        } else {
          toastr.error("Error", "Unable to send the linking request");
        }
        dispatch({
          type: actionType.SEND_LINKING_REQUEST_ERROR,
          payload: error,
        });
      });
  };

export const validateSuperAgent = (token, payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.VALIDATE_SUPER_AGENT,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  dispatch({
    type: actionType.VALIDATE_SUPER_AGENT_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("SUCCESS", "Account validated.");
        dispatch({
          type: actionType.VALIDATE_SUPER_AGENT_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if (error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Error", "Unable to process the request");
      }
      dispatch({
        type: actionType.VALIDATE_SUPER_AGENT_ERROR,
        payload: error,
      });
    });
};

export const fetchLinkingRequests = () => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "GET",
    url: URL.agent.FETCH_LINKING_REQUESTS,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.LINKING_REQUESTS_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch(HideLoading());
        toastr.success("Linking Requests Fetched Successfully.");
        dispatch({
          type: actionType.LINKING_REQUESTS_DATA,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());
      if (error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Error", "Unable to fetch records");
      }
      dispatch({
        type: actionType.LINKING_REQUESTS_ERROR,
        payload: error,
      });
    });
};

export const processLinkingRequest = (payload) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "POST",
    url: URL.agent.PROCESS_LINKING_REQUESTS,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.PROCESS_LINKING_REQUEST_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch(HideLoading());
        toastr.success("Request Processed.");
        dispatch({
          type: actionType.PROCESS_LINKING_REQUEST_SUCCESS,
        });
        dispatch(fetchLinkingRequests());
      }
    })
    .catch((error) => {
      dispatch(HideLoading());
      if (error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Error", "Unable to process the linking request");
      }
      dispatch({
        type: actionType.PROCESS_LINKING_REQUEST_ERROR,
        payload: error,
      });
    });
};
