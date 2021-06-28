import axios from "axios";
import URL from "../../Assets/config";
import actionType from "./actionType";
import { toastr } from "react-redux-toastr";
import { ShowLoading, HideLoading } from "../common/action";
import { Redirect } from "react-router-dom";
import { AdminLoginSuccess, AdminLoginFailure } from "../common/action";
import qs from "qs";
// import { toastr } from "react-redux-toastr";

export const AdminLogin = (payload) => (dispatch) => {
  dispatch(ShowLoading());
  console.log(qs.stringify(payload), "admin login");
  const config = {
    method: "post",
    url: URL.admin.LOGIN,
    data: qs.stringify(payload),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.access_token);
        sessionStorage.setItem("refresh_token", res.data.refresh_token);
        sessionStorage.setItem("token_expiretime", res.data.expires_in);
        sessionStorage.setItem(
          "refresh_token_expiretime",
          res.data.refresh_expires_in
        );
        dispatch(AdminLoginSuccess());
      } else if (res.status === 206) {
        dispatch(AdminLoginFailure());
      }
    })
    .catch((error) => {
      dispatch(HideLoading());
      dispatch(AdminLoginFailure());
    });
};

export const getRefreshToken = (data) => (dispatch) => {
  const config = {
    method: "post",
    url: URL.common.REFRESH_TOKEN,
    data: qs.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        sessionStorage.setItem("token", res.data.access_token);
        sessionStorage.setItem("refresh_token", res.data.refresh_token);
        sessionStorage.setItem("token_expiretime", res.data.expires_in);
        sessionStorage.setItem(
          "refresh_token_expiretime",
          res.data.refresh_expires_in
        );
      } else if (res.status === 206) {
        dispatch(AdminLoginFailure());
      }
    })
    .catch((error) => {
      <Redirect
        to={{
          pathname: "/",
        }}
      />;
    });
  sessionStorage.setItem("token", sessionStorage.getItem("refresh_token"));
};

export const getMerchantList = (token) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.admin.GET_MERCHANT_LIST,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 200) {
        dispatch({
          type: actionType.ADMIN_GET_MERCHANT_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        dispatch({
          type: actionType.ADMIN_GET_MERCHANT_FAILURE,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.ADMIN_GET_MERCHANT_FAILURE,
      });
    });
};

export const getMerchantPendingFirstApproval = (token) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.admin.GET_MERCHANT_PENDING_FIRST_APPROVAL_LIST,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 200) {
        dispatch({
          type: actionType.GET_MERCHANT_PENDING_FIRST_APPROVAL_LIST_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        dispatch({
          type: actionType.GET_MERCHANT_PENDING_FIRST_APPROVAL_LIST_FAILURE,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.GET_MERCHANT_PENDING_FIRST_APPROVAL_LIST_FAILURE,
      });
    });
};

export const getMerchantPendingSecondApproval = (token) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.admin.GET_MERCHANT_PENDING_SECOND_APPROVAL_LIST,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 200) {
        dispatch({
          type: actionType.GET_MERCHANT_PENDING_SECOND_APPROVAL_LIST_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        dispatch({
          type: actionType.GET_MERCHANT_PENDING_SECOND_APPROVAL_LIST_FAILURE,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.GET_MERCHANT_PENDING_SECOND_APPROVAL_LIST_FAILURE,
      });
    });
};

export const getMerchantKyc = (token, id) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.admin.GET_KYC + id + "/kyc",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 200) {
        dispatch({
          type: actionType.GET_KYC_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        dispatch({
          type: actionType.GET_KYC_FAILURE,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.GET_KYC_FAILURE,
      });
    });
};

export const summary = (token) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.admin.GET_ADMIN_SUMMARY,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 200) {
        dispatch({
          type: actionType.GET_SUMMARY_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        dispatch({
          type: actionType.GET_SUMMARY_FAILURE,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.GET_SUMMARY_FAILURE,
      });
    });
};

export const getCurrency = (token) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.admin.CURRENCY,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 200) {
        dispatch({
          type: actionType.GET_CURRENCY_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        dispatch({
          type: actionType.GET_CURRENCY_FAILURE,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.GET_CURRENCY_FAILURE,
      });
    });
};

export const filterTransactionList =
  (token, startDate, endDate, currency) => (dispatch) => {
    dispatch(ShowLoading());

    const config = {
      method: "get",
      url: URL.admin.FILTER_TRANSACTION,
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
          // dispatch(HideLoading());
          // dispatch({
          //   type: actionType.FILTER_TRANSACTION_LIST_SUCCESS,
          //   payload: res.data,
          // });
        } else if (res.status === 206) {
          // dispatch(HideLoading());
          // dispatch({
          //   type: actionType.FILTER_TRANSACTION_LIST_FAILURE,
          // });
        }
      })
      .catch((error) => {
        // dispatch(HideLoading());
        // dispatch({
        //   type: actionType.FILTER_TRANSACTION_LIST_FAILURE,
        // });
      });
  };

export const RevenueMerchant =
  (token, fromDate, toDate, currency) => (dispatch) => {
    dispatch(ShowLoading());
    const config = {
      method: "get",
      url: URL.admin.REVENUE_PER_DAY_MERCHANT,
      params: {
        fromDate: fromDate,
        toDate: toDate,
        currency: currency,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    axios(config)
      .then((res) => {
        dispatch(HideLoading());
        if (res.status === 200) {
          dispatch({
            type: actionType.GET_REVENUE_MERCHANT_SUCCESS,
            payload: res.data,
          });
        } else if (res.status === 206) {
          dispatch({
            type: actionType.GET_REVENUE_MERCHANT_SUCCESS,
          });
        }
      })
      .catch((error) => {
        dispatch(HideLoading());

        dispatch({
          type: actionType.GET_REVENUE_MERCHANT_SUCCESS,
        });
      });
  };

export const AmountCollectedLastThirtyDays =
  (token, currency) => (dispatch) => {
    dispatch(ShowLoading());
    const config = {
      method: "get",
      url: URL.admin.AMOUNT_COLLECTED_LAST_THIRTY_DAYS,
      params: {
        currency: currency,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    axios(config)
      .then((res) => {
        dispatch(HideLoading());
        if (res.status === 200) {
          dispatch({
            type: actionType.GET_AMOUNT_COLLECTED_SUCCESS,
            payload: res.data,
          });
        } else if (res.status === 206) {
          dispatch({
            type: actionType.GET_AMOUNT_COLLECTED_FAILURE,
          });
        }
      })
      .catch((error) => {
        dispatch(HideLoading());

        dispatch({
          type: actionType.GET_AMOUNT_COLLECTED_FAILURE,
        });
      });
  };

export const AccessHistory = (token) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.admin.VIEW_ACCESS_HISTORY,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 200) {
        dispatch({
          type: actionType.VIEW_ACCESS_HISTORY_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        dispatch({
          type: actionType.VIEW_ACCESS_HISTORY_FAILURE,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());

      dispatch({
        type: actionType.VIEW_ACCESS_HISTORY_FAILURE,
      });
    });
};

export const SendKycApproveReject = (token, id, obj) => (dispatch) => {
  dispatch(ShowLoading());
  console.log(obj);
  const config = {
    method: "PUT",
    url: URL.admin.SEND_KYC_APPROVE + id,
    data: obj,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch(HideLoading());
        dispatch(getMerchantPendingFirstApproval(token));
        dispatch(getMerchantPendingSecondApproval(token));
      }
    })
    .catch((error) => {

      dispatch(HideLoading());
    });
};

export const getAllPendingApprovalClients = (token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.admin.GET_ALL_PENDING_APPROVAL_CLIENTS,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionType.GET_ALL_PENDING_TO_APPROVE_CLIENTS_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {});
};

export const getAllPendingSecondApprovalClients = (token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.admin.GET_ALL_PENDING_SECOND_APPROVAL_CLIENTS,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch({
          type: actionType.GET_ALL_PENDING_SECOND_TO_APPROVE_CLIENTS_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {});
};

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

export const getPaymentCategory = (token, id) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.admin.GET_PAYMENT_CATEGORY + "/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        console.log(res.data, "res.data");
        dispatch({
          type: actionType.GET_PAYMENT_CATEGORY_SUCCESS,
          payload: res.data,
          message: res.data.message,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_PAYMENT_CATEGORY_FAILURE,
          error: res.data.message,
        });
      }
    })
    .catch((error) => {
      //  toastr.error(error.response.data.message)
      dispatch({
        type: actionType.GET_PAYMENT_CATEGORY_FAILURE,
        error: error,
      });
    });
};

export const makeFeatured = (token, id) => (dispatch) => {
  const config = {
    method: "PUT",
    url: URL.admin.MAKE_FEATURED + "/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        toastr.success(res.data.message);
        dispatch(getSubscriptionListAdmin(token));
        // dispatch(sendFirstKycReject(token,emailId))
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      // toastr.error(error.response.data.message);
    });
};

export const makeDefault = (token, id) => (dispatch) => {
  const config = {
    method: "PUT",
    url: URL.admin.MAKE_DEFAULT + "/" + id,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        toastr.success(res.data.message);
        dispatch(getSubscriptionListAdmin(token));
        // dispatch(sendFirstKycReject(token,emailId))
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      // toastr.error(error.response.data.message);
    });
};

export const retrievePaymentMethods = (token) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.admin.GET_ALL_PAYMENT_METHODS,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        //  toastr.success(res.data.message)
        dispatch({
          type: actionType.GET_PAYMENT_METHOD_SUCCESS,
          payload: res.data,
          message: res.data.message,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_PAYMENT_METHOD_FAILURE,
          error: res.data.message,
        });
      }
    })
    .catch((error) => {
      //  toastr.error(error.response.data.message)
      dispatch({
        type: actionType.GET_PAYMENT_METHOD_FAILURE,
        error: error,
      });
    });
};

export const getSubscriptionListAdmin = (token) => (dispatch) => {
  console.log(22222222);
  const config = {
    method: "GET",
    url: URL.admin.GET_SUBSCRIBED_PLAN,
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
          type: actionType.GET_SUBSCRIPTION_LIST_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_SUBSCRIPTION_LIST_FAILURE,
        });
      }
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_SUBSCRIPTION_LIST_FAILURE,
      });
    });
};

export const createPaymentCategories = (payload, token) => (dispatch) => {
  console.log(payload, "payload");
  console.log(token, "token");
  const config = {
    method: "POST",
    url: URL.admin.CREATE_PAYMENT_CATEGORIES,
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
        console.log(res.data);
        dispatch({
          type: actionType.CREATE_PAYMENT_CATEGORIES_SUCCESS,
          payload: res.data,
        });
        dispatch(getPaymentCategories(token));
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.CREATE_PAYMENT_CATEGORIES_FAILURE,
        });
      }
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.CREATE_PAYMENT_CATEGORIES_FAILURE,
      });
    });
};

// Action for getting payment mehods list and add and delete operations //
export const paymentMethod = (token, method, payload, id) => (dispatch) => {
  const config = {
    method: method,
    url:
      method === "get"
        ? URL.admin.PAYMENT_METHODS_GET
        : method === "put"
        ? URL.admin.PAYMENT_METHODS_EDIT + "/" + id
        : method === "post"
        ? URL.admin.PAYMENT_METHODS_ADD
        : method === "delete"
        ? URL.admin.PAYMENT_METHODS_DELETE + payload
        : "",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  if (method === "post" || method === "put") {
    config.data = payload;
  }

  console.log(config, "config");
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        if (method === "get") {
          dispatch({
            type: actionType.GET_PAYMENT_METHODS_SUCCESS,
            payload: res.data,
          });
        } else {
          dispatch(paymentMethod(token, "get"));
        }
      } else if (res.status === 206) {
        //   toastr.warning(res.data.message)
        if (method === "get") {
          dispatch({
            type: actionType.GET_PAYMENT_METHODS_FAILURE,
          });
        }
      }
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
      if (method === "get") {
        dispatch({
          type: actionType.GET_PAYMENT_METHODS_FAILURE,
        });
      }
    });
};

// Action for getting Ticket List //
export const getTicketList = (token, assignee) => (dispatch) => {
  console.log(token, "tikect token");
  const config = {
    method: "get",
    url: assignee === "" ? URL.merchant.TICKET : URL.admin.TICKET,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        if (assignee === "") {
          dispatch({
            type: actionType.TICKET_LIST_SUCCESS,
            payload: res.data,
          });
        } else {
          console.log("i am else condition", assignee);
          console.log("i am else condition", res.data);
          dispatch({
            type: actionType.TICKET_LIST_SUCCESS,
            payload: res.data,
          });
        }
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.TICKET_LIST_FAILURE,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.TICKET_LIST_FAILURE,
      });
    });
};

export const EditPaymentCategoryAction = (id, payload, token) => (dispatch) => {
  console.log(payload, "payload");
  const config = {
    method: "PUT",
    url: URL.admin.GET_PAYMENT_CATEGORIES + "/" + id,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        console.log(res);
        toastr.success(res.data.message);
        dispatch(getPaymentCategories(token));
        // dispatch(sendFirstKycReject(token,emailId))
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
      // toastr.error(error.response.data.message);
    });
};

export const deleteCategory = (id, token) => (dispatch) => {
  const config = {
    method: "delete",
    url: URL.admin.GET_PAYMENT_CATEGORIES + "/" + id,
    headers: {
      "Access-Control-Allow-Origin": true,
      "Access-Control-Allow-Methods": "*",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      console.log(res, "res");
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch(getPaymentCategories(token));
        //dispatch(getPaymentCategories(token));
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      console.log(error, "error");
      // toastr.error(error);
    });
};

// Action for merchant Adding contact and Address  //
export const addSubscriptionList = (token, recordId, payload) => (dispatch) => {
  const config = {
    method: recordId !== "" ? "put" : "post",
    url: URL.admin.ADD_SUBSCRIPTION + (recordId !== "" ? "/" + recordId : ""),
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  console.log(config, "configggggg");
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        // dispatch(getSubscriptionList(token, "Admin"));
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
    });
};

// Action for getting roles and permissions list //
export const getCurrencyList = (token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.admin.CURRENCY,
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
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_CURRENCY_LIST_FAILURE,
        });
      }
    })
    .catch((error) => {
      //      toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_CURRENCY_LIST_FAILURE,
      });
    });
};

export const createTransactionFee = (token, payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.admin.CREATE_FEE,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  console.log(config, "configggggggggg");
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });
};

export const getTransactionFeeList = (token) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.admin.GET_FEES_LIST,
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
          type: actionType.GET_FEES_LIST_SUCCESS,
          payload: res.data,
          message: res.data.message,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_FEES_LIST_FAILURE,
          error: res.data.message,
        });
      }
    })
    .catch((error) => {
      //      toastr.error(error.response.data.message)
      dispatch({
        type: actionType.GET_FEES_LIST_FAILURE,
        error: error,
      });
    });
};

export const deleteFees = (token, id) => (dispatch) => {
  const config = {
    method: "delete",
    url: URL.admin.DELETEFEES + "/" + id,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch(getTransactionFeeList(token));
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });
};

export const deleteSubscriptionList = (token, roleId) => (dispatch) => {
  const config = {
    method: "delete",
    url: URL.admin.DELETE_SUBSCRIPTION + roleId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch(getSubscriptionListAdmin(token, "Admin"));
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      toastr.error(error.response.data.message);
    });
};

// Action for merchant Adding contact and Address  //
export const addCurrencyService = (token, recordId, payload) => (dispatch) => {
  console.log(payload, "payload");
  const config = {
    method: "post",
    url:
      recordId !== undefined
        ? URL.admin.UPDATECURRENCY + "/" + recordId
        : URL.admin.ADDCURRENCY,
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
        dispatch(getCurrencyList(token));
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
    });
};

export const getRolesandPermissionList = (token) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.admin.ROLES_PERMISSIONS,
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
          type: actionType.GET_ROLE_PERMISSIONS_LIST_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        //   toastr.warning(res.data.message)
        dispatch({
          type: actionType.GET_ROLE_PERMISSIONS_LIST_FAILURE,
        });
      }
    })
    .catch((error) => {
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_ROLE_PERMISSIONS_LIST_FAILURE,
      });
    });
};

export const listPermissions = (token) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.admin.GET_ALL_PERMISSIONS,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {

        dispatch({
          type: actionType.GET_ALL_PERMISSIONS_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.GET_ALL_PERMISSIONS_FAILURE,
          error: res.data.message,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.GET_ALL_PERMISSIONS_FAILURE,
        error: error,
      });
    });
};


// Action for merchant Adding contact and Address  //
export const addRole = (token, recordId, payload) => dispatch => {
  const config = {
    method: recordId !== "" ? "put" : "post",
    url: URL.admin.ROLES + (recordId !== "" ? "/" + recordId : ""),
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  axios(config)
    .then(res => {
      if (res.status === 200) {
        toastr.success("New Role Added");
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch(error => {
      // toastr.error(error.response.data.message);
    });
};


// Action for merchant deleting  contact and Address  //
export const deleteRole = (token, roleId) => dispatch => {
  const config = {
    method: "delete",
    url: URL.admin.ROLES + "/" + roleId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    }
  };
  axios(config)
    .then(res => {
      if (res.status === 200) {
        toastr.success('Role Deleted');
        dispatch(getRolesandPermissionList(token));
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch(error => {
      toastr.error(error.response.data.message);
    });
};