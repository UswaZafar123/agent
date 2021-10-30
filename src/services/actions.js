import axios from "axios";
import actionType from "./actionTypes";
import URL from "../Assets/config";
import { toastr } from "react-redux-toastr";
import jwt from "jwt-decode";
import qs from "qs";
var fileDownload = require("js-file-download");

export const RegisterService = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.NON_EXISTING_BANK_CUSTOMER,
    data: payload,
    headers: {
      "Content-Type": "mulitpart/form-data",
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        // toastr.success("Registration Successful");
        dispatch({
          type: actionType.CREATE_AGENT_BANKER_SUCCESS,
          payload: res.data
        });
      }
    })
    .catch((error) => {
      toastr.warning("Registration Error");
      dispatch({
        type: actionType.CREATE_AGENT_BANKER_FAILURE,
        payload: error
      });
    });
};

export const sendAgentOTP = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.AGENT_SEND_OTP,
    data: payload
  };
  axios(config).then((res) => {

    if (res.status === 200) {
      toastr.success("OTP Resent");
      dispatch({
        type: actionType.AGENT_BANKER_OTP_SUCCESS
      });
    }
    else {
      toastr.warning("Something's Wrong !");
      dispatch({
        type: actionType.AGENT_BANKER_OTP_FAILURE
      });
    }
  }).catch((error) => {
    toastr.error("OTP Resend Error");
    dispatch({
      type: actionType.AGENT_BANKER_OTP_FAILURE,
    });
  })
};

export const checkOTPValid = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.AGENT_VERIFY_OTP,
    data: payload
  };
  axios(config).then((res) => {

    if (res.status === 200) {
      toastr.success("OTP Verification Success");
      dispatch({
        type: actionType.AGENT_BANKER_OTP_VALID
      });
    }
    else {
      toastr.warning("Something's Wrong !");
      dispatch({
        type: actionType.AGENT_BANKER_OTP_INVALID
      });
    }
  }).catch((error) => {
    toastr.error("OTP Error!");
    dispatch({
      type: actionType.AGENT_BANKER_OTP_INVALID,
    });
  })
};

export const setAgentPassword = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.AGENT_SET_PASSWORD,
    data: payload
  };
  axios(config).then((res) => {

    if (res.status === 200) {
      toastr.success("Password Set");
      dispatch({
        type: actionType.AGENT_SET_PASSWORD_SUCCESS
      });
    }
    else {
      toastr.warning("Something's Wrong !");
      dispatch({
        type: actionType.AGENT_SET_PASSWORD_FAILED
      });
    }
  }).catch((error) => {
    toastr.error("Password Set Error!");
    dispatch({
      type: actionType.AGENT_SET_PASSWORD_FAILED,
    });
  })
};

export const verifyAccount = (data) => (dispatch) => {
  const config = {
    method: "post",
    url: "https://app.digitalbanking.groupebia.com/user-management/api-public/registration/customer/verifyPIN",
    data: data,
  };

  axios(config)
    .then((res) => {
      dispatch({
        type: actionType.ACCOUNT_VERIFIED,
      });
    })
    .catch((error) => {
      toastr.error("Sorry, Something went wrong");
      dispatch({
        type: actionType.ACCOUNT_VERIFIED_FAIL,
      });
    });
};

export const verifyMerchantAccount = (data) => (dispatch) => {
  const config = {
    method: "post",
    url: "https://app.digitalbanking.groupebia.com/public/merchant/mfa/validate",
    data: data,
  };

  axios(config)
    .then((res) => {
      console.log(res, 'res')
      if (res.status == 200) {
        dispatch({
          type: actionType.ACCOUNT_VERIFIED,
        });
      } else {
        dispatch({
          type: actionType.ACCOUNT_VERIFIED_FAIL,
        });
      }

    })
    .catch((error) => {
      toastr.error("Sorry, Something went wrong");
      dispatch({
        type: actionType.ACCOUNT_VERIFIED_FAIL,
      });
    });
};




export const setPassword = (data) => (dispatch) => {
  const config = {
    method: "post",
    url: "https://app.digitalbanking.groupebia.com/user-management/api-public/registration/customer/setPassword",
    data: data,
  };

  axios(config)
    .then((res) => {
      dispatch({
        type: actionType.SET_PASSWORD,
      });
    })
    .catch((error) => {
      toastr.error("Sorry, Something went wrong");
      dispatch({
        type: actionType.SET_PASSWORD_FAIL,
      });
    });
};

export const loginMerchant = (payload) => (dispatch) => {
  const config = {
    method: "post",
    url: URL.common.MERCHANT_LOGIN,
    data: qs.stringify(payload),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };
  axios(config)
    .then((res) => {
      console.log(res, "resssssssssssss");
      if (res.status === 200) {
        sessionStorage.setItem("user_type", "agent");
        sessionStorage.setItem("token", res.data.access_token);
        sessionStorage.setItem("refresh_token", res.data.refresh_token);
        sessionStorage.setItem("token_expiretime", res.data.expires_in);
        sessionStorage.setItem("refresh_token_expiretime", res.data.refresh_expires_in);

        dispatch(getMerchantProfileInfo(res.data.access_token))
      } else if (res.status === 206) {
        localStorage.setItem("statusCode", res.data.message);
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.MERCHANT_LOGIN_FAILURE,
        });
      }
    })
    .catch((error) => {
      if (error.response) {
        localStorage.setItem("statusCode", error.response.data.message);
      }

      //   dispatch(hideIsLoading());
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.MERCHANT_LOGIN_FAILURE,
      });
    });
};


export const getMerchantProfileInfo = (token) => dispatch => {
  const config = {
    method: "GET",
    url: URL.merchant.PROFILE_INFO,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  axios(config)
    .then(res => {
      console.log(res, 'merchantDetails')
      if (res.status === 200) {

        sessionStorage.setItem("id", res.data.profileInfo.id);
        sessionStorage.setItem("merchantName", res.data.profileInfo.merchantName);
        sessionStorage.setItem("merchantStatus", res.data.profileInfo.merchantStatus);
        sessionStorage.setItem("phoneNo", res.data.profileInfo.phoneNo);
        sessionStorage.setItem("email", res.data.Email);
        window.location = "/agent/dashboard"



        dispatch({
          type: actionType.MERCHANT_LOGIN_SUCCESS,
          payload: token,
        });




      } else if (res.status === 206) {

      }
    })
    .catch(error => {

    });
};
// const loginDispatcher = (res, accessPayload) => dispatch => {

//     sessionStorage.setItem("token",res.data.token);
//     sessionStorage.setItem("user_type",'merchant');

//     if(jwt(res.data.token).profileInfo.status===false)
//     {
//       sessionStorage.setItem("merchant_reload","true")
//     }else{
//       sessionStorage.setItem("merchant_reload","false")

//     }

//       dispatch({
//         type: actionType.MERCHANT_LOGIN_SUCCESS,
//         payload:res.data.token

//       });

// if(res.data.roles === "Merchant"){
//   console.log("register merchant firebase token");
//   dispatch(submitFirebaseToken(userdata))
// }

// saravanan deleted

// accessPayload.userType = decodedJwt.userType;
// accessPayload.userName = decodedJwt.sub

// dispatch(accessHistoryService(res.data.token, accessPayload));
// };
// Action for merchant registration //
export const registration = (payload, role) => (dispatch) => {
  // dispatch(showIsLoading());
  const config = {
    method: "post",
    url: URL.merchant.MERCHANT,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(config, "config");
  axios(config)
    .then((res) => {
      // dispatch(hideIsLoading());
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch({
          type: actionType.REGISTRATION_SUCCESS,
          payload: res.data,
        });

        // dispatch(getUsersLists())
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.REGISTRATION_FAILURE,
        });
      } else if (res.status === 409) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.REGISTRATION_FAILURE,
        });
      }
    })
    .catch((error) => {
      // dispatch(hideIsLoading());
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.REGISTRATION_FAILURE,
      });
    });
};

export const sendVerification = (payload) => (dispatch) => {
  // dispatch(showIsLoading());
  const config = {
    method: "post",
    url: URL.merchant.SEND_OTP,
    data: payload,
    headers: {
      "Content-Type": "application/json",
    },
  };
  console.log(config, "config");
  axios(config)
    .then((res) => {
      // dispatch(hideIsLoading());
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch({
          type: actionType.REGISTRATION_SUCCESS,
          payload: res.data,
        });

        // dispatch(getUsersLists())
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.REGISTRATION_FAILURE,
        });
      }
    })
    .catch((error) => {
      // dispatch(hideIsLoading());
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.REGISTRATION_FAILURE,
      });
    });
};

// Action for getting merchant view history list //
export const getMerchantViewAccessHistoryList = (token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.merchant.VIEW_ACCESS_HISTORY,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        // toastr.success(res.data.message)
        dispatch({
          type: actionType.VIEW_ACCESS_HISTORY_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        //  toastr.warning(res.data.message)
        dispatch({
          type: actionType.VIEW_ACCESS_HISTORY_FAILURE,
        });
      }
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.VIEW_ACCESS_HISTORY_FAILURE,
      });
    });
};

export const addKYCdetails =
  (token, payload, status, emailid) => (dispatch) => {
    const config = {
      method: "post",
      url: status ? URL.merchant.UPDATE_KYC : URL.merchant.UPDATE_KYC,
      data: payload,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token,
      },
    };
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          toastr.success(res.data.message);
          dispatch(getKYCdetails(token, emailid));
        } else if (res.status === 206) {
          toastr.warning(res.data.message);
        }
      })
      .catch((error) => {
        // toastr.error(error.response.data.message);
      });
  };

export const getKYCdetails = (token, id) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.merchant.UPDATE_KYC,
    headers: {
      "Content-Type": "application/form-data",
      Authorization: "Bearer " + token,
    },
    // maxContentLength: 52428890,
  };

  axios(config)
    .then((res) => {
      console.log(res, "res kyc");

      if (res.status === 200) {
        toastr.success(res.data.message);

        dispatch({
          type: actionType.GET_KYC_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_KYC_FAILURE,
      });
    });
};

export const getMerchantTransactionList =
  (token, startDate, endDate, currency) => (dispatch) => {
    const config = {
      method: "GET",
      url: URL.merchant.TRANSACTION_LIST,
      params: {
        fromDate: startDate,
        toDate: endDate,
        currency: currency,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          console.log(res, "resssssssssss");
          toastr.success(res.data.message);
          dispatch({
            type: actionType.TRANSACTION_LIST_SUCCESS,
            payload: res.data,
          });
        } else if (res.status === 206) {
          toastr.warning(res.data.message);
          dispatch({
            type: actionType.TRANSACTION_LIST_FAILURE,
          });
        }
      })
      .catch((error) => {
        // toastr.error(error.response.data.message);
        dispatch({
          type: actionType.TRANSACTION_LIST_FAILURE,
        });
      });
  };

export const getCurrencies = (token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.merchant.CURRENCY,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch({
          type: actionType.GET_CURRENCY_LIST_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        //   toastr.warning(res.data.message)
        dispatch({
          type: actionType.GET_CURRENCY_LIST_FAILURE,
        });
      }
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_CURRENCY_LIST_FAILURE,
      });
    });
};

export const merchantSummary = (token, payload) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.merchant.MERCHANT_SUMMARY,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch({
          type: actionType.GET_MERCHANT_SUMMARY_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_MERCHANT_SUMMARY_FAILURE,
        });
      }
    })
    .catch((error) => {
      toastr.error(error.message);
      dispatch({
        type: actionType.GET_MERCHANT_SUMMARY_FAILURE,
      });
    });
};

export const getMerchantShops = (id, token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.merchant.SHOP,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data, "res data");
        toastr.success(res.data.message);
        dispatch({
          type: actionType.GET_MERCHANT_SHOP_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_MERCHANT_SHOP_FAILURE,
        });
      }
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_MERCHANT_SHOP_FAILURE,
      });
    });
};

export const getSubscriptionList = (token) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.merchant.SUBSRIBED_PLAN,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        //   toastr.success(res.data.message)
        dispatch({
          type: actionType.GET_SUBSCRIPTION_LIST_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_SUBSCRIPTION_LIST_FAILURE,
          payload: null,
        });
      }
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_SUBSCRIPTION_LIST_FAILURE,
        payload: null,
      });
    });
};

export const getSubscribedPlan = (token, email, id) => (dispatch) => {
  const config = {
    method: "post",
    url: URL.merchant.SUBSRIBED_PLAN,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch({
          type: actionType.SUBSRIBED_PLAN_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.SUBSRIBED_PLAN_FAILURE,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.SUBSRIBED_PLAN_FAILURE,
      });
    });
};

export const getFeatured = (token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.admin.FEATURED,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res.data, "valuesssssssssssssss");
        toastr.success(res.data.message);
        dispatch({
          type: actionType.GET_FEATURED_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        //toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_FEATURED_FAILURE,
        });
      }
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_FEATURED_FAILURE,
      });
    });
};

export const merchantDownloadCredentials = (id, token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.merchant.DOWNLOAD_CRE + "/" + id,
    responseType: "blob",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      // dispatch(hideIsLoading());
      if (res.status === 200) {
        fileDownload(res.data, "SaraBanking_Credentials.txt");
      }
    })
    .catch((error) => {
      // dispatch(hideIsLoading());
      toastr.error("Already file downloaded");
      dispatch({
        type: actionType.GET_MERCHANT_CRED_DOWNLOAD,
      });
    });
};

export const getShopManagersList = (token, id) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.merchant.GET_SHOPMANAGERS + "/" + id + "/users",
    headers: {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  console.log(config, "configgggggg");
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res, "resssss");
        toastr.success(res.data.message);
        dispatch({
          type: actionType.GET_SHOP_MANAGERS_LIST_SUCCESS,
          payload: res.data,
          message: res.data.message,
        });
      } else if (res.status === 206) {
        //toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_SHOP_MANAGERS_LIST_FAILURE,
          error: res.data.message,
          payload: [],
        });
      }
    })
    .catch((error) => {
      console.log(error);
      //  toastr.error(error.response.data.message)
      dispatch({
        type: actionType.GET_SHOP_MANAGERS_LIST_FAILURE,
        error: error,
        payload: [],
      });
    });
};

export const getShopManagers = (payload, token) => (dispatch) => {
  console.log(payload, "shop managers payload");
  const config = {
    method: "GET",
    url: URL.merchant.GET_SHOP_MANAGERS + "/" + payload + "/users",
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      console.log(res, "shop managers response");
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch({
          type: actionType.GET_SHOP_MANAGER_SUCCESS,
          payload: res.data,
          message: res.data.message,
        });
      } else if (res.status === 206) {
        //toastr.warning(res.data.message)
        dispatch({
          type: actionType.GET_SHOP_MANAGER_FAILURE,
        });
      }
    })
    .catch((error) => {
      //toastr.error(error.message);
      dispatch({
        type: actionType.GET_SHOP_MANAGER_FAILURE,
      });
    });
};

export const addShopManager = (json, token, shopId) => (dispatch) => {
  const config = {
    method: "POST",
    data: json,
    url: URL.merchant.ADD_SHOPMANAGER + shopId + "/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch({
          type: actionType.ADD_SHOP_MANAGER_SUCCESS,
          payload: json,
        });
        dispatch(getShopManagers(json, token));
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.ADD_SHOP_MANAGER_FAILURE,
        });
      }
    })
    .catch((error) => {
      // toastr.error(error.message);
      dispatch({
        type: actionType.ADD_SHOP_MANAGER_FAILURE,
      });
    });
};

//GET POS MANAGERS
export const getPOSManagers = (id, token) => (dispatch) => {
  console.log(id, "post manaer id");

  const config = {
    method: "GET",
    url: URL.merchant.GET_POS_MANAGERS + "/" + id + "/users",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  console.log(config, "configggg");
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch({
          type: actionType.GET_POS_MANAGERS_LIST_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_POS_MANAGERS_LIST_FAILURE,
          payload: [],
        });
      }
    })
    .catch((error) => {
      //        toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_POS_MANAGERS_LIST_FAILURE,
        payload: [],
      });
    });
};

export const createPosManager = (token, payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.merchant.CREATE_POS_MANAGER + "/" + payload.posIdList + "/users",
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch({
          type: actionType.CREATE_POS_MANAGERS_SUCCESS,
        });

        dispatch(getPOSManagers(payload, token));
      } else if (res.status === 206) {
        toastr.warning(res.data.message);

        dispatch({
          type: actionType.CREATE_POS_MANAGERS_FAILURE,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.CREATE_POS_MANAGERS_FAILURE,
      });
    });
};

export const getMerchantChartData =
  (token, startDate, endDate, currency) => (dispatch) => {
    const config = {
      method: "get",
      url: URL.merchant.MERCHANT_CHART_DATA,
      params: {
        fromDate: "2020-12-12",
        toDate: "2020-12-12",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    axios(config)
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: actionType.GET_CHART_DATA_SUCCESS,
            payload: res.data,
          });
        } else if (res.status === 206) {
          dispatch({
            type: actionType.GET_CHART_DATA_FAILURE,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: actionType.GET_CHART_DATA_FAILURE,
        });
      });
  };

//  export const showIsLoading = () => {
//     return {
//       type: actionType.SHOW_IS_LOADING
//     };
//   };

//   export const hideIsLoading = () => {
//     return {
//       type: actionType.HIDE_IS_LOADING
//     };
//   };

export const getPaymentCategories = (token) => (dispatch) => {
  console.log(token, "token");
  const config = {
    method: "GET",
    url: URL.admin.GET_PAYMENT_CATEGORIES,
    headers: {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  console.log(config, "configgggggg");
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res, "resssss");
        toastr.success(res.data.message);
        dispatch({
          type: actionType.GET_PAYMENT_CATEGORIES_SUCCESS,
          payload: res.data,
          message: res.data.message,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_PAYMENT_CATEGORIES_FAILURE,
          error: res.data.message,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      //  toastr.error(error.response.data.message)
      dispatch({
        type: actionType.GET_PAYMENT_CATEGORIES_FAILURE,
        error: error,
      });
    });
};


export const verifyRegister = email => dispatch => {
  const config = {
    method: "post",
    url: URL.user.VERIFY_REGISTER,
    data: email,
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios(config)
    .then(res => {
      if (res.status === 200) {
        dispatch({
          type: actionType.VERIFY_USER_REGISTER_SUCCESS,
          message: res.data
        });
      } else if (res.status === 206) {
        dispatch({
          type: actionType.VERIFY_USER_REGISTER_FAILURE,
          message: []
        });
      }
    })
    .catch(error => {
      dispatch({
        type: actionType.VERIFY_USER_REGISTER_FAILURE,
      });
    });
};