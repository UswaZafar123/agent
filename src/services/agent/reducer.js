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

    /**
     * Agent Profile Reducer State Update
     */
    case actionType.AGENT_PROFILE_FETCH:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: true,
        },
      };
    case actionType.AGENT_PROFILE_DATA:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
          data: action.payload,
        },
      };
    case actionType.AGENT_PROFILE_ERROR:
      return {
        ...state,
        profile: {
          ...state.profile,
          loading: false,
        },
      };
    /**
     * Agent Profile Reducer State Update
     */

    /**
     * Agent Wallet Account State Update
     */
    case actionType.AGENT_WALLET_ACCOUNT_FETCH:
      return {
        ...state,
        walletAccount: {
          ...state.walletAccount,
          loading: true,
        },
      };
    case actionType.AGENT_WALLET_ACCOUNT_DATA:
      return {
        ...state,
        walletAccount: {
          ...state.walletAccount,
          loading: false,
          data: action.payload,
        },
      };
    case actionType.AGENT_WALLET_ACCOUNT_ERROR:
      return {
        ...state,
        walletAccount: {
          ...state.walletAccount,
          loading: false,
        },
      };
    /**
     * Agent Wallet Account State Update
     */

    /**
     * Agent Bank Accounts State Update
     */
    case actionType.AGENT_BANK_ACCOUNT_FETCH:
      return {
        ...state,
        bankAccounts: {
          ...state.bankAccounts,
          loading: true,
        },
      };
    case actionType.AGENT_BANK_ACCOUNT_DATA:
      return {
        ...state,
        bankAccounts: {
          ...state.bankAccounts,
          loading: false,
          list: action.payload,
        },
      };
    case actionType.AGENT_BANK_ACCOUNT_ERROR:
      return {
        ...state,
        bankAccounts: {
          ...state.bankAccounts,
          loading: false,
        },
      };
    /**
     * Agent Bank Accounts State Update
     */

    /**
     * Agent Super Agent Detail State Update
     */
    case actionType.SUPER_AGENT_DETAIL_FETCH:
      return {
        ...state,
        superAgentDetail: {
          ...state.superAgentDetail,
          loading: true,
        },
      };
    case actionType.SUPER_AGENT_DETAIL_DATA:
      return {
        ...state,
        superAgentDetail: {
          ...state.superAgentDetail,
          loading: false,
          data: action.payload,
        },
      };
    case actionType.SUPER_AGENT_DETAIL_ERROR:
      return {
        ...state,
        superAgentDetail: {
          ...state.superAgentDetail,
          loading: false,
        },
      };
    case actionType.SUPER_AGENT_DETAIL_RESET:
      return {
        ...state,
        superAgentDetail: {
          ...state.superAgentDetail,
          loading: false,
          data: {},
        },
      };
    /**
     * Agent Super Agent Detail State Update End
     */

    /**
     * SEND Linking Request State Update
     */
    case actionType.SEND_LINKING_REQUEST_FETCH:
      return {
        ...state,
        sendLinkingRequest: {
          ...state.sendLinkingRequest,
          loading: true,
        },
      };
    case actionType.SEND_LINKING_REQUEST_SUCCESS:
      return {
        ...state,
        sendLinkingRequest: {
          ...state.sendLinkingRequest,
          loading: false,
          success: true,
        },
      };
    case actionType.SEND_LINKING_REQUEST_ERROR:
      return {
        ...state,
        sendLinkingRequest: {
          ...state.sendLinkingRequest,
          loading: false,
          success: false,
          error: true,
        },
      };
    /**
     * SEND Linking Request State Update END
     */

    /**
     * SEND Linking Request State Update
     */
    case actionType.VALIDATE_SUPER_AGENT_FETCH:
      return {
        ...state,
        validateSuperAgent: {
          ...state.validateSuperAgent,
          loading: true,
        },
      };
    case actionType.VALIDATE_SUPER_AGENT_SUCCESS:
      return {
        ...state,
        validateSuperAgent: {
          ...state.validateSuperAgent,
          loading: false,
          success: true,
        },
      };
    case actionType.VALIDATE_SUPER_AGENT_ERROR:
      return {
        ...state,
        validateSuperAgent: {
          ...state.validateSuperAgent,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.VALIDATE_SUPER_AGENT_RESET:
      return {
        ...state,
        validateSuperAgent: {
          ...state.validateSuperAgent,
          loading: false,
          success: false,
          error: false,
        },
      };
    /**
     * SEND Linking Request State Update END
     */

    /**
     * Linking Requests State Update
     */
    case actionType.LINKING_REQUESTS_FETCH:
      return {
        ...state,
        linkingRequests: {
          ...state.linkingRequests,
          loading: true,
        },
      };
    case actionType.LINKING_REQUESTS_DATA:
      return {
        ...state,
        linkingRequests: {
          ...state.linkingRequests,
          loading: false,
          data: action.payload,
        },
      };
    case actionType.LINKING_REQUESTS_ERROR:
      return {
        ...state,
        linkingRequests: {
          ...state.linkingRequests,
          loading: false,
        },
      };
    /**
     * Linking Requests State Update END
     */

    /**
     * Process Linking Requests State Update
     */
    case actionType.PROCESS_LINKING_REQUEST_FETCH:
      return {
        ...state,
        linkingRequests: {
          ...state.linkingRequests,
          linkingRequestProcessing: true,
        },
      };
    case actionType.PROCESS_LINKING_REQUEST_SUCCESS:
      return {
        ...state,
        linkingRequests: {
          ...state.linkingRequests,
          linkingRequestProcessing: false,
          linkingRequestProcessSuccess: true,
        },
      };
    case actionType.PROCESS_LINKING_REQUEST_ERROR:
      return {
        ...state,
        linkingRequests: {
          ...state.linkingRequests,
          linkingRequestProcessing: false,
          linkingRequestProcessSuccess: false,
          linkingRequestProcessError: true,
        },
      };
    /**
     * Process Linking Requests State Update END
     */

    /**
     * Customer Validation Reducer State Update
     */
    case actionType.CUSTOMER_VALIDATION_FETCH:
      return {
        ...state,
        customerValidation: {
          ...state.customerValidation,
          loading: true,
          success: false,
          error: false,
        },
      };
    case actionType.CUSTOMER_VALIDATION_SUCCESS:
      return {
        ...state,
        customerValidation: {
          ...state.customerValidation,
          loading: false,
          success: true,
          error: false,
        },
      };
    case actionType.CUSTOMER_VALIDATION_ERROR:
      return {
        ...state,
        customerValidation: {
          ...state.customerValidation,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.CUSTOMER_VALIDATION_RESET:
      return {
        ...state,
        customerValidation: {
          ...state.customerValidation,
          loading: false,
          success: false,
          error: false,
        },
      };
    /**
     * Customer Validation Reducer State Update End
     */

    /**
     * Agent OTP send Reducer State Update
     */
    case actionType.AGENT_OTP_SEND_FETCH:
      return {
        ...state,
        agentOtpSend: {
          ...state.agentOtpSend,
          loading: true,
        },
      };
    case actionType.AGENT_OTP_SEND_SUCCESS:
      return {
        ...state,
        agentOtpSend: {
          ...state.agentOtpSend,
          loading: false,
          success: true,
        },
      };
    case actionType.AGENT_OTP_SEND_ERROR:
      return {
        ...state,
        agentOtpSend: {
          ...state.agentOtpSend,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.AGENT_OTP_SEND_RESET:
      return {
        ...state,
        agentOtpSend: {
          ...state.agentOtpSend,
          loading: false,
          success: false,
          error: false,
        },
      };
    /**
     * Agent OTP send Reducer State Update End
     */

    /**
     * Customer OTP send Reducer State Update
     */
    case actionType.CUSTOMER_OTP_SEND_FETCH:
      return {
        ...state,
        customerOtpSend: {
          ...state.customerOtpSend,
          loading: true,
        },
      };
    case actionType.CUSTOMER_OTP_SEND_SUCCESS:
      return {
        ...state,
        customerOtpSend: {
          ...state.customerOtpSend,
          loading: false,
          success: true,
        },
      };
    case actionType.CUSTOMER_OTP_SEND_ERROR:
      return {
        ...state,
        customerOtpSend: {
          ...state.customerOtpSend,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.CUSTOMER_OTP_SEND_RESET:
      return {
        ...state,
        customerOtpSend: {
          ...state.customerOtpSend,
          loading: false,
          success: false,
          error: false,
        },
      };
    /**
     * Customer OTP send Reducer State Update End
     */

    case actionType.CUSTOMER_WALLET_CASH_DEPOSIT_FETCH:
      return {
        ...state,
        customerWalletCashDeposit: {
          ...state.customerWalletCashDeposit,
          loading: true,
        },
      };
    case actionType.CUSTOMER_WALLET_CASH_DEPOSIT_SUCCESS:
      return {
        ...state,
        customerWalletCashDeposit: {
          ...state.customerWalletCashDeposit,
          loading: false,
          success: true,
        },
      };
    case actionType.CUSTOMER_WALLET_CASH_DEPOSIT_ERROR:
      return {
        ...state,
        customerWalletCashDeposit: {
          ...state.customerWalletCashDeposit,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.CUSTOMER_WALLET_CASH_DEPOSIT_RESET:
      return {
        ...state,
        customerWalletCashDeposit: {
          ...state.customerWalletCashDeposit,
          loading: false,
          success: false,
          error: false,
        },
      };

    case actionType.CUSTOMER_WALLET_CASH_WITHDRAW_FETCH:
      return {
        ...state,
        customerWalletCashWithdraw: {
          ...state.customerWalletCashWithdraw,
          loading: true,
        },
      };
    case actionType.CUSTOMER_WALLET_CASH_WITHDRAW_SUCCESS:
      return {
        ...state,
        customerWalletCashWithdraw: {
          ...state.customerWalletCashWithdraw,
          loading: false,
          success: true,
        },
      };
    case actionType.CUSTOMER_WALLET_CASH_WITHDRAW_ERROR:
      return {
        ...state,
        customerWalletCashWithdraw: {
          ...state.customerWalletCashWithdraw,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.CUSTOMER_WALLET_CASH_WITHDRAW_RESET:
      return {
        ...state,
        customerWalletCashWithdraw: {
          ...state.customerWalletCashWithdraw,
          loading: false,
          success: false,
          error: false,
        },
      };

    case actionType.CUSTOMER_BANK_ACCOUNTS_FETCH:
      return {
        ...state,
        customerBankAccounts: {
          ...state.customerBankAccounts,
          loading: true,
        },
      };
    case actionType.CUSTOMER_BANK_ACCOUNTS_DATA:
      return {
        ...state,
        customerBankAccounts: {
          ...state.customerBankAccounts,
          loading: false,
          list: action.payload,
        },
      };
    case actionType.CUSTOMER_BANK_ACCOUNTS_ERROR:
      return {
        ...state,
        customerBankAccounts: {
          ...state.customerBankAccounts,
          loading: false,
        },
      };
    case actionType.CUSTOMER_BANK_ACCOUNTS_RESET:
      return {
        ...state,
        customerBankAccounts: {
          ...state.customerBankAccounts,
          loading: false,
          list: [],
        },
      };

    case actionType.CUSTOMER_BANK_CASH_DEPOSIT_FETCH:
      return {
        ...state,
        customerBankCashDeposit: {
          ...state.customerBankCashDeposit,
          loading: true,
        },
      };
    case actionType.CUSTOMER_BANK_CASH_DEPOSIT_SUCCESS:
      return {
        ...state,
        customerBankCashDeposit: {
          ...state.customerBankCashDeposit,
          loading: false,
          success: true,
        },
      };
    case actionType.CUSTOMER_BANK_CASH_DEPOSIT_ERROR:
      return {
        ...state,
        customerBankCashDeposit: {
          ...state.customerBankCashDeposit,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.CUSTOMER_BANK_CASH_DEPOSIT_RESET:
      return {
        ...state,
        customerBankCashDeposit: {
          ...state.customerBankCashDeposit,
          loading: false,
          success: false,
          error: false,
        },
      };

    case actionType.CUSTOMER_BANK_CASH_WITHDRAW_FETCH:
      return {
        ...state,
        customerBankCashWithdraw: {
          ...state.customerBankCashWithdraw,
          loading: true,
        },
      };
    case actionType.CUSTOMER_BANK_CASH_WITHDRAW_SUCCESS:
      return {
        ...state,
        customerBankCashWithdraw: {
          ...state.customerBankCashWithdraw,
          loading: false,
          success: true,
        },
      };
    case actionType.CUSTOMER_BANK_CASH_WITHDRAW_ERROR:
      return {
        ...state,
        customerBankCashWithdraw: {
          ...state.customerBankCashWithdraw,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.CUSTOMER_BANK_CASH_WITHDRAW_RESET:
      return {
        ...state,
        customerBankCashWithdraw: {
          ...state.customerBankCashWithdraw,
          loading: false,
          success: false,
          error: false,
        },
      };
    case actionType.AGENT_WALLET_CASH_IN_FETCH:
      return {
        ...state,
        agentWalletCashIn: {
          ...state.agentWalletCashIn,
          loading: true,
        },
      };
    case actionType.AGENT_WALLET_CASH_IN_SUCCESS:
      return {
        ...state,
        agentWalletCashIn: {
          ...state.agentWalletCashIn,
          loading: false,
          success: true,
        },
      };
    case actionType.AGENT_WALLET_CASH_IN_ERROR:
      return {
        ...state,
        agentWalletCashIn: {
          ...state.agentWalletCashIn,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.AGENT_WALLET_CASH_IN_RESET:
      return {
        ...state,
        agentWalletCashIn: {
          ...state.agentWalletCashIn,
          loading: false,
          success: false,
          error: false,
        },
      };
    case actionType.AGENT_WALLET_CASH_OUT_FETCH:
      return {
        ...state,
        agentWalletCashOut: {
          ...state.agentWalletCashOut,
          loading: true,
        },
      };
    case actionType.AGENT_WALLET_CASH_OUT_SUCCESS:
      return {
        ...state,
        agentWalletCashOut: {
          ...state.agentWalletCashOut,
          loading: false,
          success: true,
        },
      };
    case actionType.AGENT_WALLET_CASH_OUT_ERROR:
      return {
        ...state,
        agentWalletCashOut: {
          ...state.agentWalletCashOut,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.AGENT_WALLET_CASH_OUT_RESET:
      return {
        ...state,
        agentWalletCashOut: {
          ...state.agentWalletCashOut,
          loading: false,
          success: false,
          error: false,
        },
      };
    case actionType.AGENT_SEND_MONEY_FETCH:
      return {
        ...state,
        agentSendMoney: {
          ...state.agentSendMoney,
          loading: true,
        },
      };
    case actionType.AGENT_SEND_MONEY_SUCCESS:
      return {
        ...state,
        agentSendMoney: {
          ...state.agentSendMoney,
          loading: false,
          success: true,
        },
      };
    case actionType.AGENT_SEND_MONEY_ERROR:
      return {
        ...state,
        agentSendMoney: {
          ...state.agentSendMoney,
          loading: false,
          success: false,
          error: true,
        },
      };
    case actionType.AGENT_SEND_MONEY_RESET:
      return {
        ...state,
        agentSendMoney: {
          ...state.agentSendMoney,
          loading: false,
          success: false,
          error: false,
        },
      };

    case actionType.CUSTOMER_DETAIL_FETCH:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          loading: true,
        },
      };
    case actionType.CUSTOMER_DETAIL_DATA:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          loading: false,
          data: action.payload,
        },
      };
    case actionType.CUSTOMER_DETAIL_ERROR:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          loading: false,
        },
      };
    case actionType.CUSTOMER_DETAIL_RESET:
      return {
        ...state,
        customerDetail: {
          ...state.customerDetail,
          loading: false,
          data: {},
        },
      };

    case actionType.FEE_DETAIL_FETCH:
      return {
        ...state,
        feeDetail: {
          ...state.feeDetail,
          loading: true,
        },
      };
    case actionType.FEE_DETAIL_DATA:
      return {
        ...state,
        feeDetail: {
          ...state.feeDetail,
          loading: false,
          data: action.payload,
        },
      };
    case actionType.FEE_DETAIL_ERROR:
      return {
        ...state,
        feeDetail: {
          ...state.feeDetail,
          loading: false,
        },
      };
    case actionType.FEE_DETAIL_RESET:
      return {
        ...state,
        feeDetail: {
          ...state.feeDetail,
          loading: false,
          data: {},
        },
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
        getScreenPermissionsByRoleData: action.payload,
      };
    case actionType.GET_SCREEN_PERMISSIONS_BY_ROLE_FAILURE:
      return {
        ...state,
        getScreenPermissionsByRoleStatus: false,
        getScreenPermissionsByRoleData: action.payload,
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
        addUserRoleData: action.payload,
      };
    case actionType.ADD_USER_ROLE_FAILURE:
      return {
        ...state,
        addUserRoleStatus: false,
        addUserRoleData: action.payload,
      };
    case actionType.DELETE_USER_ROLE_SUCCESS:
      return {
        ...state,
        deleteUserRoleStatus: true,
        deleteUserRoleData: action.payload,
        addUserRoleStatus: false,
        addUserRoleData: null,
      };
    case actionType.DELETE_USER_ROLE_FAILURE:
      return {
        ...state,
        deleteUserRoleStatus: false,
        deleteUserRoleData: action.payload,
        addUserRoleStatus: false,
        addUserRoleData: null,
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
        getAllScreensData: action.payload,
      };
    case actionType.GET_ALL_SCREEN_FAILURE:
      return {
        ...state,
        getAllScreensStatus: false,
        getAllScreensData: action.payload,
      };
    case actionType.ADD_ALL_PERMISSION_SUCCESS:
      return {
        ...state,
        addAllPermissionStatus: true,
        addAllPermissionData: action.payload,
      };
    case actionType.ADD_ALL_PERMISSION_FAILURE:
      return {
        ...state,
        addAllPermissionStatus: false,
        addAllPermissionData: action.payload,
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
