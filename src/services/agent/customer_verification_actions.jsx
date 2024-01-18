import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";

export const verifyCustomer = (token, data) => (dispatch) => {
  const config = {
    method: "post",
    url: URL.agent.CUSTOMER_VERIFICATION,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  dispatch({
    type: actionType.CUSTOMER_VALIDATION_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionType.CUSTOMER_VALIDATION_SUCCESS,
          payload:res.data
        });
      }
    })
    .catch((error) => {
      toastr.error("Error", error.response.data.detail)
      dispatch({
        type: actionType.CUSTOMER_VALIDATION_ERROR,
      });
    });
};
