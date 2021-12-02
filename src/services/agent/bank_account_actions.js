import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";

export const fetchAgentBankAccounts = (token, bankCustomerId) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.agent.FETCH_AGENT_BANK_ACCOUNT+'/'+bankCustomerId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  dispatch({
    type: actionType.AGENT_BANK_ACCOUNT_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionType.AGENT_BANK_ACCOUNT_DATA,
          payload:res.data
        });
      }
    })
    .catch((error) => {
      console.log(error.response.status);
      toastr.error("error", error.response.status)
      dispatch({
        type: actionType.AGENT_BANK_ACCOUNT_ERROR,
      });
    });
};

export const fetchCustomerBankAccounts = (token, bankCustomerId) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.agent.FETCH_CUSTOMER_BANK_ACCOUNTS+'/'+bankCustomerId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  dispatch({
    type: actionType.CUSTOMER_BANK_ACCOUNTS_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionType.CUSTOMER_BANK_ACCOUNTS_DATA,
          payload:res.data
        });
      }
    })
    .catch((error) => {
      // toastr.error("error", error.response.status)
      dispatch({
        type: actionType.CUSTOMER_BANK_ACCOUNTS_ERROR,
      });
    });
};
