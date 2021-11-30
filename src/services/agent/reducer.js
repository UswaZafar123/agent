import actionType from "./actionType";
import initialState from "./initialState.js";

const agentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AGENT_LOGIN_SUCCESS:
      return {
        ...state,
        agentLoginstatus: true,
      };
    case actionType.AGENT_LOGIN_FAILURE:
      return {
        ...state,
        agentLoginstatus: false,
      };
    case actionType.AGENT_LINKING_SUCCESS:
      return {
        ...state,
        linkingStatus: true,
        linkingList: action.payload,
      };
    case actionType.AGENT_LINKING_FAILURE:
      return {
        ...state,
        linkingStatus: false,
        linkingList: [],
      };
    case actionType.CREATE_AGENT_BANKER_SUCCESS:
      return {
        ...state,
        agentIndividualRegData: action.payload,
        agentIndividualRegStatus: true,
        agentOTPStatus: false,
        agentOTPValidStatus: false,
        agentSetPasswordStatus: false,
      };
    case actionType.CREATE_AGENT_BANKER_FAILURE:
      return {
        ...state,
        agentIndividualRegData: action.payload,
        agentIndividualRegStatus: false,
        agentOTPStatus: false,
        agentOTPValidStatus: false,
        agentSetPasswordStatus: false,
      };
    case actionType.AGENT_BANKER_OTP_SUCCESS:
      return {
        ...state,
        agentOTPStatus: true,
      };
    case actionType.AGENT_BANKER_OTP_FAILURE:
      return {
        ...state,
        agentOTPStatus: false,
      };
    case actionType.AGENT_BANKER_OTP_VALID:
      return {
        ...state,
        agentOTPValidStatus: true,
      };
    case actionType.AGENT_BANKER_OTP_INVALID:
      return {
        ...state,
        agentOTPValidStatus: false,
      };
    case actionType.AGENT_SET_PASSWORD_SUCCESS:
      return {
        ...state,
        agentSetPasswordStatus: true,
      };
    case actionType.AGENT_SET_PASSWORD_FAILED:
      return {
        ...state,
        agentSetPasswordStatus: false,
      };

    case actionType.GET_TICKETS_PRIORITIES_SUCCESS:
      return {
        ...state,
        ticketsPriorityData: action.payload,
        ticketsPriorityStatus: true,
      };

    case actionType.GET_TICKETS_PRIORITIES_FAILURE:
      return {
        ...state,
        ticketsPriorityStatus: false,
      };

    case actionType.TICKETS_UPLOAD_ATTACHMENT_SUCCESS:
      return {
        ...state,
        ticketsUploadAttcahmentData: action.payload,
        ticketsUploadAttcahmentStatus: true,
      };

    case actionType.TICKETS_UPLOAD_ATTACHMENT_FAILURE:
      return {
        ...state,
        ticketsUploadAttcahmentStatus: false,
      };

    case actionType.GET_TICKETS_SUCCESS:
      return {
        ...state,
        ticketsData: action.payload,
        ticketsStatus: true,
      };

    case actionType.GET_TICKETS_FAILURE:
      return {
        ...state,
        ticketsStatus: false,
      };

    case actionType.GET_TICKETS_STATUS_SUCCESS:
      return {
        ...state,
        ticketStatusData: action.payload,
        ticketDataStatus: true,
      };

    case actionType.GET_TICKETS_STATUS_DAILURE:
      return {
        ...state,
        ticketDataStatus: false,
      };

    case actionType.GET_TICKETS_SUMMARY_SUCCESS:
      return {
        ...state,
        ticketSummaryData: action.payload,
        ticketSummaryStatus: true,
      };

    case actionType.GET_TICKETS_SUMMARY_FAILURE:
      return {
        ...state,
        ticketSummaryStatus: false,
      };

    case actionType.GET_A_TICKET_SUCCESS:
      return {
        ...state,
        getATicketData: action.payload,
        getATicketStatus: true,
      };

    case actionType.GET_A_TICKET_FAILURE:
      return {
        ...state,
        getATicketStatus: false,
      };

    case actionType.GET_TICKET_UPLOADED_FILE_SUCCESS:
      return {
        ...state,
        uploadedFileStatus: true,
        uploadedFileData: action.payload,
      };

    case actionType.GET_TICKET_UPLOADED_FILE_FAILURE:
      return {
        ...state,
        uploadedFileStatus: false,
        uploadedFileData: null,
      };
    case actionType.SEND_KYC_SUCCESS:
      return {
        ...state,
        kycSendStatus: true,
        kycSendData: action.payload,
      };
    case actionType.SEND_KYC_FAILURE:
      return {
        ...state,
        kycSendStatus: false,
        kycSendData: action.payload,
      };
    case actionType.GET_KYC_SUCCESS:
      return {
        ...state,
        kycGetStatus: true,
        kycGetData: action.payload,
        kycSendStatus: false,
        kycSendData: null,
      };
    case actionType.GET_KYC_FAILURE:
      return {
        ...state,
        kycGetStatus: false,
        kycGetData: action.payload,
      };
    case actionType.GET_SCREEN_PERMISSIONS_BY_ROLE_SUCCESS:
      return {
        ...state,
        getScreenPermissionsByRoleStatus: true,
        getScreenPermissionsByRoleData: action.payload
      };
    case actionType.GET_SCREEN_PERMISSIONS_BY_ROLE_FAILURE:
      return {
        ...state,
        getScreenPermissionsByRoleStatus: false,
        getScreenPermissionsByRoleData: action.payload
      };
    case actionType.GET_USER_ROLES_SUCCESS:
      return {
        ...state,
        addUserRoleStatus: false,
        addUserRoleData: null,
        deleteUserRoleStatus: false,
        deleteUserRoleData: null,
        getUserRoleStatus: true,
        getUserRoleData: action.payload,
        updateUserRoleStatus: false,
        updateUserRoleData: null,
        getAllScreensStatus: false,
      };
    case actionType.GET_USER_ROLES_FAILURE:
      return {
        ...state,
        addUserRoleStatus: false,
        addUserRoleData: null,
        deleteUserRoleStatus: false,
        deleteUserRoleData: null,
        getUserRoleStatus: false,
        getUserRoleData: null,
        updateUserRoleStatus: false,
        updateUserRoleData: null,
        getAllScreensStatus: false,
      };
    case actionType.ADD_USER_ROLE_SUCCESS:
      return {
        ...state,
        addUserRoleStatus: true,
        addUserRoleData: action.payload
      };
    case actionType.ADD_USER_ROLE_FAILURE:
      return {
        ...state,
        addUserRoleStatus: false,
        addUserRoleData: action.payload
      };
    case actionType.DELETE_USER_ROLE_SUCCESS:
      return {
        ...state,
        deleteUserRoleStatus: true,
        deleteUserRoleData: action.payload,
        addUserRoleStatus: false,
        addUserRoleData: null
      };
    case actionType.DELETE_USER_ROLE_FAILURE:
      return {
        ...state,
        deleteUserRoleStatus: false,
        deleteUserRoleData: action.payload,
        addUserRoleStatus: false,
        addUserRoleData: null
      };
    case actionType.UPDATE_USER_ROLE_SUCCESS:
      return {
        ...state,
        updateUserRoleStatus: true,
        updateUserRoleData: action.payload,
        addUserRoleStatus: false,
        addUserRoleData: null,
        deleteUserRoleStatus: false,
        deleteUserRoleData: null,
      };
    case actionType.UPDATE_USER_ROLE_FAILURE:
      return {
        ...state,
        updateUserRoleStatus: false,
        updateUserRoleData: action.payload,
        addUserRoleStatus: false,
        addUserRoleData: null,
        deleteUserRoleStatus: false,
        deleteUserRoleData: null,
      };
    case actionType.GET_ALL_SCREEN_SUCCESS:
      return {
        ...state,
        getAllScreensStatus: true,
        getAllScreensData: action.payload
      };
    case actionType.GET_ALL_SCREEN_FAILURE:
      return {
        ...state,
        getAllScreensStatus: false,
        getAllScreensData: action.payload
      };
    case actionType.ADD_ALL_PERMISSION_SUCCESS:
      return {
        ...state,
        addAllPermissionStatus: true,
        addAllPermissionData: action.payload
      };
    case actionType.ADD_ALL_PERMISSION_FAILURE:
      return {
        ...state,
        addAllPermissionStatus: false,
        addAllPermissionData: action.payload
      };
    default:
      return state;
  }
};

export default agentReducer;
