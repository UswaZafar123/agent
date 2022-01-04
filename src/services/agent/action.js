import axios from "axios";
import actionType from "./actionType.js";
import URL from "../../Assets/config";
import { toastr } from "react-redux-toastr";
// import jwt from "jwt-decode";
import qs from "qs";
import { ShowLoading, HideLoading } from "../common/action";
import { ArrowLeftOutlined } from "@ant-design/icons";

export * from "./customer_verification_actions.js";
export * from "./profile_actions.js";
export * from "./wallet_account_actions.js";
export * from "./bank_account_actions.js";
export * from "./customer_otp_actions.js";
export * from "./cash_deposit_actions.js";
export * from "./cash_withdraw_actions.js";
export * from "./account_linking_actions.js";
export * from "./agent_otp_actions.js";
export * from "./common_actions.js";

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
        dispatch(getUploadProof(res.data.idDocuments[0].documentFileName));
        dispatch(getAddressProof(res.data.proofOfAddress[0].documentFileName));
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

export const getProfile = () => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.agent.GET_PROFILE,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("profile Retrieved Successfully");
        dispatch({
          type: actionType.GET_PROFILE_SUCCESS,
          payload: res.data,
        });
        dispatch(getProfileImage(res.data.selfieDocument.documentFileName));
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve profile");
      dispatch({
        type: actionType.GET_PROFILE_FAILURE,
      });
    });
};

export const getAllCurrencies = () => (dispatch) => {
  dispatch({
    type: actionType.CURRENCY_NULLABLE,
  });
  const config = {
    method: "GET",
    url: URL.agent.GET_CURRENCIES,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("currencies Retrieved Successfully");
        dispatch({
          type: actionType.GET_CURRENCY_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve currencies");
      dispatch({
        type: actionType.GET_CURRENCY_FAILURE,
      });
    });
};

export const getAllAssets = () => (dispatch) => {
  dispatch({
    type: actionType.ASSETS_NULLABLE,
  });
  const config = {
    method: "GET",
    url: URL.agent.GET_ASSETS,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("assets Retrieved Successfully");
        dispatch({
          type: actionType.GET_ASSETS_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: actionType.ADD_ASSET_FAILURE,
          payload: null,
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve assets");
      dispatch({
        type: actionType.GET_ASSETS_FAILURE,
      });
      dispatch({
        type: actionType.ADD_ASSET_FAILURE,
        payload: null,
      });
    });
};

export const addAsset = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.GET_ASSETS,
    data: payload,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 201) {
        toastr.success("Asset Created Successfully");
        dispatch({
          type: actionType.ADD_ASSET_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: actionType.EDIT_ASSET_FAILURE,
          payload: null,
        });
        dispatch({
          type: actionType.DELETE_ASSET_FAILURE,
          payload: null,
        });
        dispatch(getAllAssets());
      }
    })
    .catch((error) => {
      toastr.warning("Failed to Add Asset.");
      dispatch({
        type: actionType.ADD_ASSET_FAILURE,
        payload: null,
      });
      dispatch({
        type: actionType.EDIT_ASSET_FAILURE,
        payload: null,
      });
      dispatch({
        type: actionType.DELETE_ASSET_FAILURE,
        payload: null,
      });
    });
};

export const deleteAsset = (id) => (dispatch) => {
  const config = {
    method: "DELETE",
    url: URL.agent.GET_ASSETS + "/" + id,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 204) {
        toastr.success("Asset Deleted Successfully");
        dispatch({
          type: actionType.DELETE_ASSET_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: actionType.ADD_ASSET_FAILURE,
          payload: null,
        });
        dispatch({
          type: actionType.EDIT_ASSET_FAILURE,
          payload: null,
        });
        dispatch(getAllAssets());
      }
    })
    .catch((error) => {
      toastr.warning("Failed to Delete Asset.");
      dispatch({
        type: actionType.DELETE_ASSET_FAILURE,
        payload: null,
      });
      dispatch({
        type: actionType.ADD_ASSET_FAILURE,
        payload: null,
      });
      dispatch({
        type: actionType.EDIT_ASSET_FAILURE,
        payload: null,
      });
    });
};

export const updateAsset = (id, payload) => (dispatch) => {
  const config = {
    method: "PUT",
    url: URL.agent.GET_ASSETS + "/" + id,
    data: payload,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 201) {
        toastr.success("Asset Updated Successfully");
        dispatch({
          type: actionType.EDIT_ASSET_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: actionType.ADD_ASSET_FAILURE,
          payload: null,
        });
        dispatch({
          type: actionType.DELETE_ASSET_FAILURE,
          payload: null,
        });
        dispatch(getAllAssets());
      }
    })
    .catch((error) => {
      toastr.warning("Failed to Update Asset.");
      dispatch({
        type: actionType.EDIT_ASSET_FAILURE,
        payload: null,
      });
      dispatch({
        type: actionType.ADD_ASSET_FAILURE,
        payload: null,
      });
      dispatch({
        type: actionType.DELETE_ASSET_FAILURE,
        payload: null,
      });
    });
};

export const getAllOperations = () => (dispatch) => {
  dispatch({
    type: actionType.OPERATIONS_NULLABLE,
  });
  const config = {
    method: "GET",
    url: URL.agent.GET_OPERATIONS,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("operation Retrieved Successfully");
        dispatch({
          type: actionType.GET_OPERATIONS_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: actionType.ADD_OPERATIONS_FAILURE,
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve operation");
      dispatch({
        type: actionType.GET_OPERATIONS_FAILURE,
      });
      dispatch({
        type: actionType.ADD_OPERATIONS_FAILURE,
      });
    });
};

export const addOperation = (payload) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.GET_OPERATIONS,
    data: payload,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 201) {
        toastr.success("operation created Successfully");
        dispatch({
          type: actionType.ADD_OPERATIONS_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: actionType.DELETE_OPERATIONS_FAILURE,
        });
        dispatch({
          type: actionType.EDIT_OPERATIONS_FAILURE,
        });
        dispatch(getAllOperations());
      }
    })
    .catch((error) => {
      toastr.warning("failed to add operation");
      dispatch({
        type: actionType.ADD_OPERATIONS_FAILURE,
      });
      dispatch({
        type: actionType.DELETE_OPERATIONS_FAILURE,
      });
      dispatch({
        type: actionType.EDIT_OPERATIONS_FAILURE,
      });
    });
};

export const deleteOperation = (id) => (dispatch) => {
  const config = {
    method: "DELETE",
    url: URL.agent.GET_OPERATIONS + "/" + id,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 204) {
        toastr.success("operation deleted Successfully");
        dispatch({
          type: actionType.DELETE_OPERATIONS_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: actionType.ADD_OPERATIONS_FAILURE,
        });
        dispatch({
          type: actionType.EDIT_OPERATIONS_FAILURE,
        });
        dispatch(getAllOperations());
      }
    })
    .catch((error) => {
      toastr.warning("failed to delete operation");
      dispatch({
        type: actionType.DELETE_OPERATIONS_FAILURE,
      });
      dispatch({
        type: actionType.ADD_OPERATIONS_FAILURE,
      });
      dispatch({
        type: actionType.EDIT_OPERATIONS_FAILURE,
      });
    });
};

export const editOperation = (id, payload) => (dispatch) => {
  const config = {
    method: "PUT",
    url: URL.agent.GET_OPERATIONS + "/" + id,
    data: payload,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  axios(config)
    .then((res) => {
      if (res.status === 201) {
        toastr.success("operation updated Successfully");
        dispatch({
          type: actionType.EDIT_OPERATIONS_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: actionType.ADD_OPERATIONS_FAILURE,
        });
        dispatch({
          type: actionType.DELETE_OPERATIONS_FAILURE,
        });
        dispatch(getAllOperations());
      }
    })
    .catch((error) => {
      toastr.warning("failed to edit operation");
      dispatch({
        type: actionType.EDIT_OPERATIONS_FAILURE,
      });
      dispatch({
        type: actionType.ADD_OPERATIONS_FAILURE,
      });
      dispatch({
        type: actionType.DELETE_OPERATIONS_FAILURE,
      });
    });
};

export const getAllOperationsEdit = (id) => (dispatch) => {
  dispatch({
    type: actionType.OPERATIONS_NULLABLE,
  });
  const config = {
    method: "GET",
    url: URL.agent.GET_OPERATIONS,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("operation Retrieved Successfully");

        dispatch({
          type: actionType.GET_OPERATIONS_SUCCESS,
          payload: res.data,
        });
        dispatch(getAPackage(id));
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve operation");
      dispatch({
        type: actionType.GET_OPERATIONS_FAILURE,
      });
    });
};

export const getAPackage = (id) => (dispatch) => {
  dispatch({
    type: actionType.GET_PACKAGE_NULLABLE,
  });
  const config = {
    method: "GET",
    url: URL.agent.CREATE_PACKAGE + "/" + id,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Package Retrieved Successfully");
        dispatch({
          type: actionType.GET_A_PACKAGE_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve package");
      dispatch({
        type: actionType.GET_A_PACKAGE_FAILURE,
      });
    });
};

export const getAllCommissions = () => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.agent.COMMISSION,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Commissions Retrieved Successfully");
        dispatch({
          type: actionType.GET_COMMISSION_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve commissions");
      dispatch({
        type: actionType.GET_COMMISSION_FAILURE,
      });
    });
};

export const createCommission = (payload) => (dispatch) => {
  const config = {
    method: "post",
    url: URL.agent.COMMISSION,
    data: payload,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 201) {
        toastr.success("commission created Successfully");
        dispatch({
          type: actionType.ADD_COMMISSION_SUCCESS,
          payload: res.data,
        });

        dispatch(getAllCommissions());
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.ADD_COMMISSION_FAILURE,
        payload: null,
      });
      toastr.warning(
        "Failed to create commission. Commission Type Might Already Exist."
      );
    });
};

export const deleteCommission = (id) => (dispatch) => {
  const config = {
    method: "DELETE",
    url: URL.agent.COMMISSION + "/" + id,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 204) {
        toastr.success("commission deleted Successfully");

        dispatch({
          type: actionType.DELETE_COMMISSION_SUCCESS,
          payload: res.data,
        });

        dispatch(getAllCommissions());
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.DELETE_COMMISSION_FAILURE,
        payload: null,
      });
      toastr.warning("Failed to delete commission.");
    });
};

export const editCommission = (payload) => (dispatch) => {
  const config = {
    method: "PUT",
    url: URL.agent.COMMISSION + "/" + payload.commissionId,
    data: payload,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 201) {
        toastr.success("commission updated Successfully");

        dispatch({
          type: actionType.EDIT_COMMISSION_SUCCESS,
          payload: res.data,
        });

        dispatch(getAllCommissions());
      }
    })
    .catch((error) => {
      dispatch({
        type: actionType.EDIT_COMMISSION_FAILURE,
        payload: null,
      });
      toastr.warning(
        "Failed to update commission. Commission with same type might already exist."
      );
    });
};

export const createPackage = (payload, history) => (dispatch) => {
  const config = {
    method: "post",
    url: URL.agent.CREATE_PACKAGE,
    data: payload,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 201) {
        toastr.success("package created Successfully");
        history.push({
          pathname: "/settings/general/package-management",
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to create Package");
    });
};

export const updatePackage = (payload, history, id) => (dispatch) => {
  const config = {
    method: "put",
    url: URL.agent.CREATE_PACKAGE + "/" + id,
    data: payload,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 201) {
        toastr.success("package updated Successfully");
        history.push({
          pathname: "/settings/general/package-management",
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to update Package");
    });
};

export const getAllAgentMemberPackages = () => (dispatch) => {
  dispatch({
    type: actionType.PACKAGES_NULLABLE,
  });
  const config = {
    method: "GET",
    url: URL.agent.GET_PACKAGES,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("packages Retrieved Successfully");
        dispatch({
          type: actionType.GET_PACKAGES_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve packages");
      dispatch({
        type: actionType.GET_PACKAGES_FAILURE,
      });
    });
};

export const getProfileImage = (filename) => (dispatch) => {
  dispatch({
    type: actionType.PROFILE_IMAGE_NULLABLE,
  });
  const config = {
    method: "GET",
    url: URL.agent.GET_PROFILE_IMAGE + "/" + filename,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    responseType: "blob",
  };

  axios(config)
    .then((res) => {
      console.log(typeof res.data, "resssss");
      if (res.status === 200) {
        toastr.success("profile image retrieved Successfully");
        dispatch({
          type: actionType.GET_PROFILE_IMAGE_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve profile image");
      dispatch({
        type: actionType.GET_PROFILE_IMAGE_FAILURE,
      });
    });
};

export const getUploadProof = (filename) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.agent.GET_PROFILE_IMAGE + "/" + filename,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    responseType: "blob",
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("upload proof retrieved Successfully");
        dispatch({
          type: actionType.UPLOAD_PROOF_FETCH_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve upload proof");
      dispatch({
        type: actionType.UPLOAD_PROOF_FETCH_FAILURE,
      });
    });
};

export const getAddressProof = (filename) => (dispatch) => {
  const config = {
    method: "GET",
    url: URL.agent.GET_PROFILE_IMAGE + "/" + filename,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    responseType: "blob",
  };

  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("address proof retrieved Successfully");
        dispatch({
          type: actionType.ADDRESS_PROOF_FETCH_SUCCESS,
          payload: res.data,
        });
      }
    })
    .catch((error) => {
      toastr.warning("failed to retrieve address proof");
      dispatch({
        type: actionType.ADDRESS_PROOF_FETCH_FAILURE,
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

export const setAgentPasswordMember = (payload, history) => (dispatch) => {
  const config = {
    method: "POST",
    url: URL.agent.AGENT_SET_PASSWORD,
    data: payload,
  };
  axios(config)
    .then((res) => {
      if (res.status === 200) {
        toastr.success("Password is Set");
        history.push({ pathname: "/settings/agent-member" });
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
export const UpdateTicket =
  (token, payload, ticketNo, history) => (dispatch) => {
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

export const getScreenPermissionsByRole = (token, roleId) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.agent.GET_SCREEN_PERMISSIONS_BY_ROLE + "?userRoleId=" + roleId,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      dispatch({
        type: actionType.GET_SCREEN_PERMISSIONS_BY_ROLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(HideLoading());
      dispatch({
        type: actionType.GET_SCREEN_PERMISSIONS_BY_ROLE_SUCCESS,
        payload: null,
      });
    });
};

export const addScreenPermissionsByRole = (token, payload) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "POST",
    url: URL.agent.GET_SCREEN_PERMISSIONS_BY_ROLE,
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      toastr.success("Role Permissions Added..");
      dispatch({
        type: actionType.ADD_ALL_PERMISSION_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(HideLoading());
      toastr.error("Role Permissions Failed to Add..");
      dispatch({
        type: actionType.ADD_ALL_PERMISSION_FAILURE,
        payload: null,
      });
    });
};

export const updateScreenPermissionsByRole =
  (token, payload, roleId) => (dispatch) => {
    dispatch(ShowLoading());
    const config = {
      method: "PUT",
      url: URL.agent.GET_SCREEN_PERMISSIONS_BY_ROLE + "/" + roleId,
      data: payload,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then((res) => {
        dispatch(HideLoading());
        toastr.success("Role Permissions Updated..");
        dispatch({
          type: actionType.UPDATE_ROLE_PERMISSION_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(HideLoading());
        toastr.error("Role Permissions Failed to Update..");
        dispatch({
          type: actionType.UPDATE_ROLE_PERMISSION_FAILURE,
          payload: null,
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

  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      toastr.success("Roles Fetched Successfully..");

      dispatch({
        type: actionType.GET_USER_ROLES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(HideLoading());
      toastr.error("Roles Fetch Error..");

      dispatch({
        type: actionType.GET_USER_ROLES_FAILURE,
        payload: null,
      });
    });
};

export const addUserRole =
  (token, payload, permissionsPayload) => (dispatch) => {
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
    axios(config)
      .then((res) => {
        dispatch(HideLoading());
        toastr.success("Role Added..");
        dispatch({
          type: actionType.ADD_USER_ROLE_SUCCESS,
          payload: res.data,
        });

        if (res.data.userRoleId) {
          const userRoleId = res.data.userRoleId;

          const permissionsBody = {
            userRoleId: userRoleId,
            screenPermissions: permissionsPayload,
          };

          console.log(permissionsBody, "PERMISSIONS BODY");

          dispatch(addScreenPermissionsByRole(token, permissionsBody));
        }
      })
      .catch((err) => {
        dispatch(HideLoading());
        toastr.error("ERROR ADDING ROLE..");
        dispatch({
          type: actionType.ADD_USER_ROLE_FAILURE,
          payload: null,
        });
      });
  };

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
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      toastr.success("Role Deleted..");
      dispatch({
        type: actionType.DELETE_USER_ROLE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(HideLoading());
      toastr.error("ERROR DELETING ROLE..");
      dispatch({
        type: actionType.DELETE_USER_ROLE_FAILURE,
        payload: null,
      });
    });
};

export const updateUserRole =
  (token, roleId, payload, modifiedPermissionsList) => (dispatch) => {
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
    axios(config)
      .then((res) => {
        dispatch(HideLoading());
        toastr.success("Role Updated..");
        dispatch(
          updateScreenPermissionsByRole(token, modifiedPermissionsList, roleId)
        );
        dispatch({
          type: actionType.UPDATE_USER_ROLE_SUCCESS,
          payload: res.data,
        });
      })
      .catch((err) => {
        dispatch(HideLoading());
        toastr.error("ERROR UPDATING ROLE..");
        dispatch({
          type: actionType.UPDATE_USER_ROLE_FAILURE,
          payload: null,
        });
      });
  };

export const getAllScreens = (token) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "get",
    url: URL.agent.GET_ALL_SCREENS,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      toastr.success("Screens Fetched Successfully..");

      dispatch({
        type: actionType.GET_ALL_SCREEN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(HideLoading());
      toastr.error("Screens Fetch Error..");

      dispatch({
        type: actionType.GET_ALL_SCREEN_FAILURE,
        payload: null,
      });
    });
};

export const registerAgentMember =
  (token, data, history, phoneNumber, mobileCode) => (dispatch) => {
    dispatch(ShowLoading());
    dispatch({
      type: actionType.AGENT_BANKER_OTP_INVALID,
    });
    const config = {
      method: "post",
      url: URL.agent.AGENT_MEMBER_REGISTER,
      data,
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: "Bearer " + token,
      },
    };

    axios(config)
      .then((res) => {
        dispatch(HideLoading());
        toastr.success(
          "succesfully registered agent memeber please set the password"
        );
        history.push({
          pathname: "/agentMemeber/OTP",
          state: { phoneNumber: phoneNumber, mobileCode: mobileCode },
        });
      })
      .catch((err) => {
        dispatch(HideLoading());
        toastr.error("error in regsitering agent memeber");
      });
  };

export const addAgentUser = (payload) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "POST",
    url: URL.agent.AGENT_USER,
    data: payload,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 201) {
        toastr.success(
          "Agent User Successfully Created"
        );
        dispatch({
          type: actionType.ADD_AGENTUSER_SUCCESS,
          payload: res.data,
        });
        dispatch(getAllAgentUsers());
      } else {
        toastr.warning(
          "Agent User Creation Warning!"
        );
        dispatch({
          type: actionType.ADD_AGENTUSER_FAILURE,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(HideLoading());
      toastr.error("Error Creating Agent User");
      dispatch({
        type: actionType.ADD_AGENTUSER_FAILURE,
      });
    });
};

export const getAllAgentUsers = () => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "GET",
    url: URL.agent.AGENT_USER,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 200) {
        toastr.success(
          "Agent User Fetch Successful"
        );
        dispatch({
          type: actionType.GET_AGENTUSER_SUCCESS,
          payload: res.data,
        });
        dispatch({
          type: actionType.DELETE_AGENTUSER_FAILURE,
          payload: res.data,
        });
        dispatch({
          type: actionType.ADD_AGENTUSER_FAILURE,
          payload: res.data,
        });
      } else {
        toastr.warning(
          "Agent User Fetch Warning!"
        );
        dispatch({
          type: actionType.GET_AGENTUSER_FAILURE,
        });
      }
    })
    .catch((err) => {
      dispatch(HideLoading());
      toastr.error("Error Fetching Agent Users");
      dispatch({
        type: actionType.GET_AGENTUSER_FAILURE,
      });
    });
};

export const deleteAgentUser = (id) => (dispatch) => {
  dispatch(ShowLoading());
  const config = {
    method: "DELETE",
    url: URL.agent.AGENT_USER + "/" + id,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
  };
  axios(config)
    .then((res) => {
      dispatch(HideLoading());
      if (res.status === 204) {
        toastr.success(
          "Agent User Delete Successful"
        );
        dispatch({
          type: actionType.DELETE_AGENTUSER_SUCCESS,
        });
        dispatch(getAllAgentUsers());
      } else {
        toastr.warning(
          "Agent User Delete Warning!"
        );
        dispatch({
          type: actionType.DELETE_AGENTUSER_FAILURE,
          payload: res.data,
        });
      }
    })
    .catch((err) => {
      dispatch(HideLoading());
      toastr.error("Error Deleting Agent User");
      dispatch({
        type: actionType.DELETE_AGENTUSER_FAILURE,
      });
    });
};
