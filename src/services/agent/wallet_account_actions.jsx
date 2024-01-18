import axios from "axios";
import actionType from "./actionType";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";
import { HideLoading, ShowLoading } from "../common/action";

export const fetchAgentWallet = (token) => (dispatch) => {
  dispatch(ShowLoading());
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
      dispatch(HideLoading());
      toastr.success("Wallet Balance Fetched.");
      if (res.status === 200) {
        var walletData = res.data.find((wallet) => {
          return wallet.currencyCode.toLowerCase() === "xaf";
        });
        dispatch({
          type: actionType.AGENT_WALLET_ACCOUNT_DATA,
          payload: walletData,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());
      console.log("error");
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
      if (error.response.data.detail) {
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
      if (error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the cash out request");
      }
      dispatch({
        type: actionType.AGENT_WALLET_CASH_OUT_ERROR,
      });
    });
};

export const agentSendMoneyAction = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.AGENT_SEND_MONEY,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.AGENT_SEND_MONEY_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Send Money Request has been processed.");
        dispatch({
          type: actionType.AGENT_SEND_MONEY_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if (error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the send money request");
      }
      dispatch({
        type: actionType.AGENT_SEND_MONEY_ERROR,
      });
    });
};

export const walletBalanceInquiryAction = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.WALLET_BALANCE_INQUIRY,
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
      if (error.response.data.detail) {
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

export const walletStatementInquiryAction = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.WALLET_STATEMENT_INQUIRY,
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
      if (error.response.data.detail) {
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

export const walletAccountOpeningAction = (payload) => (dispatch) => {
  dispatch({
    type: actionType.WALLET_ACCOUNT_OPENING_PIN_FAILURE,
  });
  const config = {
    method: "POST",
    url: URL.agent.WALLET_ACCOUNT_OPENING,
    data: payload,
    headers: {
      // "Content-Type": "application/json",
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.WALLET_ACCOUNT_OPENING_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Wallet Account Processed Successfully.");
        dispatch({
          type: actionType.WALLET_ACCOUNT_OPENING_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if (error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the request");
      }
      dispatch({
        type: actionType.WALLET_ACCOUNT_OPENING_ERROR,
        payload: error,
      });
    });
};

export const walletAccountOpeningResendPinAction = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.WALLET_ACCOUNT_OPENING_RESEND_PIN,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  dispatch({
    type: actionType.WALLET_ACCOUNT_OPENING_FETCH,
  });
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("OTP Resent..");
        dispatch({
          type: actionType.WALLET_ACCOUNT_OPENING_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if (error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the request");
      }
      dispatch({
        type: actionType.WALLET_ACCOUNT_OPENING_ERROR,
        payload: error,
      });
    });
};

export const walletAccountOpeningVerifyPinAction = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.WALLET_ACCOUNT_OPENING_VERIFY_PIN,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("OTP Verified.");
        dispatch({
          type: actionType.WALLET_ACCOUNT_OPENING_PIN_SUCCESS,
        });
      }
    })
    .catch((error) => {
      if (error.response.data.detail) {
        toastr.error(error.response.data.detail);
      } else {
        toastr.error("Unable to process the request");
      }
      dispatch({
        type: actionType.WALLET_ACCOUNT_OPENING_PIN_FAILURE,
        payload: error,
      });
    });
};

export const walletAccountOpeningSetPasswordAction =
  (payload) => (dispatch) => {
    const config = {
      method: "POST",
      url: URL.agent.WALLET_ACCOUNT_OPENING_SET_PASSWORD,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    };
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          toastr.success("Password Set Successfully.");
          dispatch({
            type: actionType.WALLET_ACCOUNT_OPENING_SET_PASSWORD_SUCCESS,
          });
        }
      })
      .catch((error) => {
        if (error.response.data.detail) {
          toastr.error(error.response.data.detail);
        } else {
          toastr.error("Unable to process the request");
        }
        dispatch({
          type: actionType.WALLET_ACCOUNT_OPENING_SET_PASSWORD_FAILURE,
          payload: error,
        });
      });
  };
