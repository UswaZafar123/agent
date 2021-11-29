import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";
import jwt from "jwt-decode";
import qs from "qs";
import { ShowLoading, HideLoading } from "../common/action";

export const RegisterService = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.NON_EXISTING_BANK_CUSTOMER,
    data: payload,
    headers: {
      "Content-Type": "mulitpart/form-data",
    },
  };
  dispatch(ShowLoading());
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        // toastr.success("Registration Successful");
        dispatch(HideLoading());
        dispatch({
          type: actionType.CREATE_AGENT_BANKER_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());
      toastr.warning("Registration Error");
      dispatch({
        type: actionType.CREATE_AGENT_BANKER_FAILURE,
        payload: error,
      });
    });
};

export const sendAgentKYC = (token, payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.UPDATE_KYC,
    data: payload,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  };
  dispatch(ShowLoading());
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("KYC Send Successful");
        dispatch(HideLoading());
        dispatch(getAgentKYC(token));
        dispatch({
          type: actionType.SEND_KYC_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.warning("KYC Send Error!");
      dispatch(HideLoading());
      dispatch({
        type: actionType.SEND_KYC_FAILURE,
        payload: error,
      });
    });
};

export const getAgentKYC = (token) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.agent.GET_KYC,
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  dispatch(ShowLoading());
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch(HideLoading());
        toastr.success("KYC Get Successful");
        dispatch({
          type: actionType.GET_KYC_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());
      toastr.warning("KYC Get Error!");
      dispatch({
        type: actionType.GET_KYC_FAILURE,
        payload: error,
      });
    });
};

export const sendAgentOTP = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.AGENT_SEND_OTP,
    data: payload,
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("OTP Resent");
        dispatch({
          type: actionType.AGENT_BANKER_OTP_SUCCESS,
        });
      } else {
        toastr.warning("Something's Wrong !");
        dispatch({
          type: actionType.AGENT_BANKER_OTP_FAILURE,
        });
      }
    })
    .catch((error) => {
      toastr.error("OTP Resend Error");
      dispatch({
        type: actionType.AGENT_BANKER_OTP_FAILURE,
      });
    });
};

export const checkOTPValid = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.AGENT_VERIFY_OTP,
    data: payload,
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("OTP Verification Success");
        dispatch({
          type: actionType.AGENT_BANKER_OTP_VALID,
        });
      } else {
        toastr.warning("Something's Wrong !");
        dispatch({
          type: actionType.AGENT_BANKER_OTP_INVALID,
        });
      }
    })
    .catch((error) => {
      toastr.error("OTP Error!");
      dispatch({
        type: actionType.AGENT_BANKER_OTP_INVALID,
      });
    });
};

export const setAgentPassword = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.AGENT_SET_PASSWORD,
    data: payload,
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Password Set");
        dispatch({
          type: actionType.AGENT_SET_PASSWORD_SUCCESS,
        });
      } else {
        toastr.warning("Something's Wrong !");
        dispatch({
          type: actionType.AGENT_SET_PASSWORD_FAILED,
        });
      }
    })
    .catch((error) => {
      toastr.error("Password Set Error!");
      dispatch({
        type: actionType.AGENT_SET_PASSWORD_FAILED,
      });
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
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.AGENT_LOGIN_FAILURE,
      });
      sessionStorage.setItem("token", "");
      window.location = "/agent/login";
    });
};

export const loginAgentFailure = () => (dispatch) => {
  dispatch({
    type: actionType.AGENT_LOGIN_FAILURE,
  });
};

export const loginAgent = (payload) => (dispatch) => {
  const config = {
    method: "post",
    url: URL.agent.AGENT_LOGIN,
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
        sessionStorage.setItem(
          "refresh_token_expiretime",
          res.data.refresh_expires_in
        );
        dispatch({
          type: actionType.AGENT_LOGIN_SUCCESS,
        });
      } else if (res.status === 206) {
        localStorage.setItem("statusCode", res.data.message);
        toastr.warning(res.data.message);
        dispatch({
          type: actionType.AGENT_LOGIN_FAILURE,
        });
      }
    })
    .catch((error) => {
      //   dispatch(hideIsLoading());

      if (error.response && error.response.data) {
        toastr.error(error.response.data.error_description);
      }

      dispatch({
        type: actionType.AGENT_LOGIN_FAILURE,
      });
    });
};

export const linking = (token, data) => (dispatch) => {
  const config = {
    method: "post",
    url: URL.agent.AGENT_LINKING_REQUEST,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("success please check your phone for MFA");
        dispatch({
          type: actionType.AGENT_LINKING_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.error("error");
      dispatch({
        type: actionType.AGENT_LINKING_FAILURE,
      });
    });
};

export const linkingFalse = () => (dispatch) => {
  dispatch({
    type: actionType.AGENT_LINKING_FAILURE,
  });
};

export const linkingVerification = (token, data) => (dispatch) => {
  const config = {
    method: "post",
    url: URL.agent.AGENT_LINKING_REQUEST_VERIFY,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("successfully linked to the bank account");
      }
    })
    .catch((error) => {
      toastr.error("error");
    });
};

export const getTickets = (token, payload) => (dispatch) => {
  const config = {
    method: "get",
    data: payload,
    url: URL.agent.GET_TICKETS,
    headers: {
      "content-type": "appication/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);

        dispatch({
          type: actionType.GET_TICKETS_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.GET_TICKETS_FAILURE,
      });
    });
};

export const ticketStatus = (token) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.agent.GET_TICKETS_STATUS,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      console.log(res, "res kyc");

      if (res.status === 200) {
        toastr.success(res.data.message);

        dispatch({
          type: actionType.GET_TICKETS_STATUS_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_TICKETS_STATUS_FAILURE,
      });
    });
};

export const ticketsPriorities = (token) => (dispatch) => {
  dispatch(viewAttachmentFileFalse());
  const config = {
    method: "GET",
    url: URL.agent.GET_TICKETS_PRIORITIES,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      console.log(res, "res kyc");

      if (res.status === 200) {
        toastr.success(res.data.message);

        dispatch({
          type: actionType.GET_TICKETS_PRIORITIES_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_TICKETS_PRIORITIES_FAILURE,
      });
    });
};

export const ticketsSummary = (token) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.agent.GET_TICKETS_SUMMARY,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      console.log(res, "res kyc");

      if (res.status === 200) {
        toastr.success(res.data.message);

        dispatch({
          type: actionType.GET_TICKETS_SUMMARY_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      // toastr.error(error.response.data.message);
      dispatch({
        type: actionType.GET_TICKETS_SUMMARY_FAILURE,
      });
    });
};

export const uploadAttachment = (token, payload) => (dispatch) => {
  dispatch(viewAttachmentFileFalse());

  dispatch(ShowLoading());

  const config = {
    method: "POST",
    data: payload,
    url: URL.agent.UPLOAD_TICKETS_ATTACHMENT,
    headers: {
      "content-type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
  };
  console.log("config test", config);
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch(HideLoading());

        toastr.success(res.data.message);

        dispatch({
          type: actionType.TICKETS_UPLOAD_ATTACHMENT_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      dispatch(HideLoading());
      dispatch({
        type: actionType.TICKETS_UPLOAD_ATTACHMENT_FAILURE,
      });
    });
};
export const viewAttachmentFile = (token, uuid) => (dispatch) => {
  const config = {
    method: "get",
    url: URL.agent.GET_UPLOADED_FILE + "/" + uuid,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: "Bearer " + token,
    },
    responseType: "blob",
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        dispatch({
          type: actionType.GET_TICKET_UPLOADED_FILE_SUCCESS,
          payload: res.data,
        });
      } else if (res.status === 206) {
        toastr.warning(res.data.message);
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.GET_TICKET_UPLOADED_FILE_FAILURE,
      });
    });
};
export const uploadAttachmentFalse = () => (dispatch) => {
  dispatch({
    type: actionType.TICKETS_UPLOAD_ATTACHMENT_FAILURE,
  });
};
export const addTicket = (token, payload, history) => (dispatch) => {
  dispatch(uploadAttachmentFalse());
  dispatch(viewAttachmentFileFalse());
  const config = {
    method: "POST",
    data: payload,
    url: URL.agent.ADD_TICKET,
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        // window.location = "/tickets";
        history.push({ pathname: "/agent/tickets" });
      }
    })
    .catch((error) => { });
};
export const UpdateTicket = (token, payload, ticketNo, history) => (
  dispatch
) => {
  dispatch(uploadAttachmentFalse());
  dispatch(viewAttachmentFileFalse());
  const config = {
    method: "put",
    data: payload,
    url: URL.agent.ADD_TICKET + "/" + ticketNo,
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success(res.data.message);
        history.push({ pathname: "/agent/tickets" });
        dispatch(getTickets(token));
      }
    })
    .catch((error) => { });
};
export const addAreply = (token, data, ticketNo) => (dispatch) => {
  dispatch(uploadAttachmentFalse());
  dispatch(viewAttachmentFileFalse());

  const config = {
    method: "post",
    url: URL.agent.TICKET_REPLY,
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        dispatch(getATicket(token, ticketNo));
      }
    })
    .catch((error) => { });
};

export const viewAttachmentFileFalse = () => (dispatch) => {
  dispatch({
    type: actionType.GET_TICKET_UPLOADED_FILE_FAILURE,
  });
};
export const getATicket = (token, ticketNO) => (dispatch) => {
  dispatch(viewAttachmentFileFalse());
  const config = {
    method: "get",
    url: URL.agent.GET_A_TICKET + "/" + ticketNO,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config)
    .then((res) => {
      dispatch({
        type: actionType.GET_A_TICKET_SUCCESS,
        payload: res.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: actionType.GET_A_TICKET_FAILURE,
      });
    });
};

export const getScreenPermissionsByRole = (token) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.agent.GET_SCREEN_PERMISSIONS_BY_ROLE,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config).then((res) => {
    dispatch(HideLoading());
    dispatch({
      type: actionType.GET_SCREEN_PERMISSIONS_BY_ROLE_SUCCESS,
      payload: res.data
    });
  }).catch((err) => {
    dispatch(HideLoading());
    dispatch({
      type: actionType.GET_SCREEN_PERMISSIONS_BY_ROLE_SUCCESS,
      payload: null
    });
  });
};

export const getAllUserRoles = (token) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.agent.GET_ALL_USER_ROLES,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config).then((res) => {
    dispatch(HideLoading());
    toastr.success("Roles Fetched Successfully..");

    dispatch({
      type: actionType.GET_USER_ROLES_SUCCESS,
      payload: res.data
    });
  }).catch((err) => {
    dispatch(HideLoading());
    toastr.error("Roles Fetch Error..");

    dispatch({
      type: actionType.GET_USER_ROLES_FAILURE,
      payload: null
    });
  });
}

export const addUserRole = (token, payload) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "POST",
    url: URL.agent.GET_ALL_USER_ROLES,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config).then((res) => {
    dispatch(HideLoading());
    toastr.success("Role Added..");
    dispatch({
      type: actionType.ADD_USER_ROLE_SUCCESS,
      payload: res.data
    });
  }).catch((err) => {
    dispatch(HideLoading());
    toastr.error("ERROR ADDING ROLE..");
    dispatch({
      type: actionType.ADD_USER_ROLE_FAILURE,
      payload: null
    });
  });
}

export const deleteUserRole = (token, roleId) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "DELETE",
    url: URL.agent.GET_ALL_USER_ROLES + "/" + roleId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config).then((res) => {
    dispatch(HideLoading());
    toastr.success("Role Deleted..");
    dispatch({
      type: actionType.DELETE_USER_ROLE_SUCCESS,
      payload: res.data
    });
  }).catch((err) => {
    dispatch(HideLoading());
    toastr.error("ERROR DELETING ROLE..");
    dispatch({
      type: actionType.DELETE_USER_ROLE_FAILURE,
      payload: null
    });
  });
}

export const updateUserRole = (token, roleId, payload) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "PUT",
    data: payload,
    url: URL.agent.GET_ALL_USER_ROLES + "/" + roleId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  axios(config).then((res) => {
    dispatch(HideLoading());
    toastr.success("Role Updated..");
    dispatch({
      type: actionType.UPDATE_USER_ROLE_SUCCESS,
      payload: res.data
    });
  }).catch((err) => {
    dispatch(HideLoading());
    toastr.error("ERROR UPDATING ROLE..");
    dispatch({
      type: actionType.UPDATE_USER_ROLE_FAILURE,
      payload: null
    });
  });
}
