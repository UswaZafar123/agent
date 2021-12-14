import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";

export const sendOtpToCustomer = (token, payload) => (dispatch) => {
    const config = {
      method: "POST",
      url: URL.agent.CUSTOMER_OTP_SEND,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    dispatch({
        type: actionType.CUSTOMER_OTP_SEND_FETCH,
      });
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          toastr.success("OTP has been sent");
          dispatch({
            type: actionType.CUSTOMER_OTP_SEND_SUCCESS,
            payload: res.data,
          });
        }
      })
      .catch((error) => {
        toastr.error("Error", error.response.data.detail);
        dispatch({
          type: actionType.CUSTOMER_OTP_SEND_ERROR,
          payload: error,
        });
      });
  };