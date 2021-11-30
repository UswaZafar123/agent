import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
// import { toastr } from "react-redux-toastr";

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
