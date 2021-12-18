import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";

export const fetchAgentWallet = (token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.agent.FETCH_AGENT_WALLET_ACCOUNT,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  dispatch({
    type: actionType.AGENT_WALLET_ACCOUNT_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        var walletData = res.data.find((wallet) => {
          return wallet.currencyCode.toLowerCase() === 'xaf'
        });
        dispatch({
          type: actionType.AGENT_WALLET_ACCOUNT_DATA,
          payload:walletData
        });
      }
    })
    .catch((error) => {
      console.log('error');
      // console.log(error.response.status);
      // toastr.error("error", error.response.status)
      dispatch({
        type: actionType.AGENT_WALLET_ACCOUNT_ERROR,
      });
    });
};

export const walletCashInFromBank = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.WALLET_CASH_IN_FROM_BANK,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.AGENT_WALLET_CASH_IN_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Cash In Request has been processed.");
        dispatch({
          type: actionType.AGENT_WALLET_CASH_IN_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if(error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the cash in request");
      }
      dispatch({
        type: actionType.AGENT_WALLET_CASH_IN_ERROR,
      });
    });
};

export const walletCashOutFromBank = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.WALLET_CASH_OUT_FROM_BANK,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.AGENT_WALLET_CASH_OUT_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Cash Out Request has been processed.");
        dispatch({
          type: actionType.AGENT_WALLET_CASH_OUT_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if(error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the cash out request");
      }
      dispatch({
        type: actionType.AGENT_WALLET_CASH_OUT_ERROR,
      });
    });
};
