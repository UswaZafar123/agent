import axios from "axios";
import actionType from "./actionType";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";

export const fetchAgentBankAccounts = (token, bankCustomerId) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.agent.FETCH_AGENT_BANK_ACCOUNT + "/" + bankCustomerId,
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
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      console.log(error.response.status);
      toastr.error("error", error.response.status);
      dispatch({
        type: actionType.AGENT_BANK_ACCOUNT_ERROR,
      });
    });
};

export const fetchCustomerBankAccounts =
  (token, bankCustomerId) => (dispatch) => {
    const config = {
      method: "get",
      url: URL.agent.FETCH_CUSTOMER_BANK_ACCOUNTS + "/" + bankCustomerId,
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
            payload: res.data,
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

export const bankBalanceInquiryAction = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.BANK_BALANCE_INQUIRY,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.CUSTOMER_BALANCE_INQUIRY_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Balance detail has been sent.");
        dispatch({
          type: actionType.CUSTOMER_BALANCE_INQUIRY_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if (error.response.data && error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the request");
      }
      dispatch({
        type: actionType.CUSTOMER_BALANCE_INQUIRY_ERROR,
        payload: error,
      });
    });
};

export const bankStatementInquiryAction = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.BANK_STATEMENT_INQUIRY,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.CUSTOMER_STATEMENT_INQUIRY_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Statement detail has been sent.");
        dispatch({
          type: actionType.CUSTOMER_STATEMENT_INQUIRY_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if (error.response.data && error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the request");
      }
      dispatch({
        type: actionType.CUSTOMER_STATEMENT_INQUIRY_ERROR,
        payload: error,
      });
    });
};

export const bankAccountOpeningAction = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.BANK_ACCOUNT_OPENING,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.BANK_ACCOUNT_OPENING_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Customer info has been sent for review.");
        dispatch({
          type: actionType.BANK_ACCOUNT_OPENING_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if (error.response.data && error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the request");
      }
      dispatch({
        type: actionType.BANK_ACCOUNT_OPENING_ERROR,
        payload: error,
      });
    });
};
