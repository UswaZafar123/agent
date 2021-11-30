import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";

export const fetchAgentProfile = (token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.agent.FETCH_AGENT_PROFILE,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  dispatch({
    type: actionType.AGENT_PROFILE_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionType.AGENT_PROFILE_DATA,
          payload:res.data
        });
      }
    })
    .catch((error) => {
      toastr.error("Error", error.response.data.detail)
      dispatch({
        type: actionType.AGENT_PROFILE_ERROR,
      });
    });
};
