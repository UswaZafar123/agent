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

    case actionType.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileDetails: action.payload,
      };
    case actionType.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profileDetails: null,
      };

    case actionType.GET_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        profileImageStatus: 1,
        profileImage: action.payload,
      };
    case actionType.GET_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        profileImageStatus: false,

        profileImage: null,
      };

    case actionType.PROFILE_IMAGE_NULLABLE:
      return {
        ...state,
        profileImageStatus: "nullable",
      };

    case actionType.GET_PACKAGES_SUCCESS:
      return {
        ...state,
        packagesStatus: true,
        packagesDetails: action.payload,
      };

    case actionType.GET_PACKAGES_FAILURE:
      return {
        ...state,
        packagesStatus: false,

        packagesDetails: false,
      };
    case actionType.PACKAGES_NULLABLE:
      return {
        ...state,
        packagesStatus: "nullable",
      };

    case actionType.GET_CURRENCY_SUCCESS:
      return {
        ...state,
        currencyStatus: true,
        currencyDetails: action.payload,
      };

    case actionType.GET_CURRENCY_FAILURE:
      return {
        ...state,
        currencyStatus: false,

        currencyDetails: null,
      };
    case actionType.CURRENCY_NULLABLE:
      return {
        ...state,
        currencyStatus: "nullable",
      };

    case actionType.GET_ASSETS_SUCCESS:
      return {
        ...state,
        assetStatus: true,
        assetDetails: action.payload,
      };

    case actionType.GET_ASSETS_FAILURE:
      return {
        ...state,
        assetStatus: false,

        assetDetails: null,
      };
    case actionType.ASSETS_NULLABLE:
      return {
        ...state,
        assetStatus: "nullable",
      };

    case actionType.GET_OPERATIONS_SUCCESS:
      return {
        ...state,
        operationStatus: true,
        operationDetails: action.payload,
      };

    case actionType.GET_OPERATIONS_FAILURE:
      return {
        ...state,
        operationStatus: false,

        operationDetails: null,
      };
    case actionType.OPERATIONS_NULLABLE:
      return {
        ...state,
        operationStatus: "nullable",
      };

    case actionType.GET_A_PACKAGE_SUCCESS:
      return {
        ...state,
        a_package_status: true,
        a_package_details: action.payload,
      };

    case actionType.GET_A_PACKAGE_FAILURE:
      return {
        ...state,
        a_package_status: false,

        a_package_details: null,
      };
    case actionType.GET_PACKAGE_NULLABLE:
      return {
        ...state,
        a_package_status: "nullable",
      };
    default:
      return state;
  }
};

export default agentReducer;
