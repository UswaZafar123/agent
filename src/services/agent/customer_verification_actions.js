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
      console.log(error.response.status);
      toastr.error("error", error.response.status)
      dispatch({
        type: actionType.CUSTOMER_VALIDATION_ERROR,
      });
    });
};
