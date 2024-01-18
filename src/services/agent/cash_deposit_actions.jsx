import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";

export const initiateWalletCashDeposit = (token, payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.CUSTOMER_WALLET_CASH_DEPOSIT,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  dispatch({
    type: actionType.CUSTOMER_WALLET_CASH_DEPOSIT_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Cash Deposit Request has been processed.");
        dispatch({
          type: actionType.CUSTOMER_WALLET_CASH_DEPOSIT_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if (error.response.data) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the cash deposit request");
      }
      dispatch({
        type: actionType.CUSTOMER_WALLET_CASH_DEPOSIT_ERROR,
        payload: error,
      });
    });
};

export const initiateBankCashDeposit = (token, payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.CUSTOMER_BANK_CASH_DEPOSIT,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  dispatch({
    type: actionType.CUSTOMER_BANK_CASH_DEPOSIT_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Cash Deposit Request has been processed.");
        dispatch({
          type: actionType.CUSTOMER_BANK_CASH_DEPOSIT_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      if (error.response.data) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the cash deposit request");
      }
      dispatch({
        type: actionType.CUSTOMER_BANK_CASH_DEPOSIT_ERROR,
        payload: error,
      });
    });
};
