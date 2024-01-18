import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";

export const fetchFeeDetail = (payload) => (dispatch) => {
  const config = {
    method: "post",
    url: URL.agent.FEE_DETAIL,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.FEE_DETAIL_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionType.FEE_DETAIL_DATA,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.error("Error", "Could not calculate fee.");
      //   toastr.error("Error", error.response.data.error);
      dispatch({
        type: actionType.FEE_DETAIL_ERROR,
      });
    });
};

export const fetchCustomerDetail = (customerId) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.agent.CUSTOMER_DETAIL + "/" + customerId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.CUSTOMER_DETAIL_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionType.CUSTOMER_DETAIL_DATA,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.error("Error", error.response.data.detail);
      dispatch({
        type: actionType.CUSTOMER_DETAIL_ERROR,
      });
    });
};
