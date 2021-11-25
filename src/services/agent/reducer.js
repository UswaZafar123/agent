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
          loading: true
        }
    }
    case actionType.AGENT_PROFILE_DATA:
      return {
        ...state,
        profile: {
          loading: false,
          data: action.payload
        }
    }
    case actionType.AGENT_PROFILE_ERROR:
      return {
        ...state,
        profile: {
          loading: false,
        }
    }
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
          loading: true
        }
    }
    case actionType.AGENT_WALLET_ACCOUNT_DATA:
      return {
        ...state,
        walletAccount: {
          loading: false,
          data: action.payload
        }
      }
    case actionType.AGENT_WALLET_ACCOUNT_ERROR:
      return {
        ...state,
        walletAccount: {
          loading: false,
        }
      }
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
          loading: true
        }
    }
    case actionType.AGENT_BANK_ACCOUNT_DATA:
      return {
        ...state,
        bankAccounts: {
          loading: false,
          list: action.payload
        }
      }
    case actionType.AGENT_BANK_ACCOUNT_ERROR:
      return {
        ...state,
        bankAccounts: {
          loading: false,
        }
      }
     /**
     * Agent Bank Accounts State Update
     */


     /**
     * Customer Validation Reducer State Update
     */
    case actionType.CUSTOMER_VALIDATION_FETCH:
      return {
        ...state,
        customerValidation: {
          loading: true
        }
      };
    case actionType.CUSTOMER_VALIDATION_SUCCESS:
      return {
        ...state,
        customerValidation: {
          loading: false,
          success: true
        },
      }
    case actionType.CUSTOMER_VALIDATION_ERROR:
      return {
        ...state,
        customerValidation: {
          loading: false,
          success: false,
          error: true
        },
      }
     /**
     * Customer Validation Reducer State Update End
     */


     /**
     * Customer OTP send Reducer State Update
     */
    case actionType.CUSTOMER_OTP_SEND_FETCH:
      return {
        ...state,
        customerOtpSend: {
          loading: true
        }
      };
    case actionType.CUSTOMER_OTP_SEND_SUCCESS:
      return {
        ...state,
        customerOtpSend: {
          loading: false,
          success: true
        },
      }
    case actionType.CUSTOMER_OTP_SEND_ERROR:
      return {
        ...state,
        customerOtpSend: {
          loading: false,
          success: false,
          error: true
        },
      }
     /**
     * Customer OTP send Reducer State Update End
     */


    case actionType.CUSTOMER_WALLET_CASH_DEPOSIT_FETCH:
      return {
        ...state,
        customerWalletCashDeposit: {
          loading: true
        }
      };
    case actionType.CUSTOMER_WALLET_CASH_DEPOSIT_SUCCESS:
      return {
        ...state,
        customerWalletCashDeposit: {
          loading: false,
          success: true
        },
      }
    case actionType.CUSTOMER_WALLET_CASH_DEPOSIT_ERROR:
      return {
        ...state,
        customerWalletCashDeposit: {
          loading: false,
          success: false,
          error: true
        },
      }

    case actionType.CUSTOMER_WALLET_CASH_WITHDRAW_FETCH:
      return {
        ...state,
        customerWalletCashWithdraw: {
          loading: true
        }
      };
    case actionType.CUSTOMER_WALLET_CASH_WITHDRAW_SUCCESS:
      return {
        ...state,
        customerWalletCashWithdraw: {
          loading: false,
          success: true
        },
      }
    case actionType.CUSTOMER_WALLET_CASH_WITHDRAW_ERROR:
      return {
        ...state,
        customerWalletCashWithdraw: {
          loading: false,
          success: false,
          error: true
        },
      }
    
    case actionType.CUSTOMER_BANK_ACCOUNTS_FETCH:
      return {
        ...state,
        customerBankAccounts: {
          loading: true
        }
    }
    case actionType.CUSTOMER_BANK_ACCOUNTS_DATA:
      return {
        ...state,
        customerBankAccounts: {
          loading: false,
          list: action.payload
        }
    }
    case actionType.CUSTOMER_BANK_ACCOUNTS_ERROR:
      return {
        ...state,
        customerBankAccounts: {
          loading: false,
        }
    }
    case actionType.CUSTOMER_BANK_ACCOUNTS_RESET:
      return {
        ...state,
        customerBankAccounts: {
          loading: false,
          list: []
        }
    }

    case actionType.CUSTOMER_BANK_CASH_DEPOSIT_FETCH:
      return {
        ...state,
        customerBankCashDeposit: {
          loading: true
        }
      };
    case actionType.CUSTOMER_BANK_CASH_DEPOSIT_SUCCESS:
      return {
        ...state,
        customerBankCashDeposit: {
          loading: false,
          success: true
        },
      }
    case actionType.CUSTOMER_BANK_CASH_DEPOSIT_ERROR:
      return {
        ...state,
        customerBankCashDeposit: {
          loading: false,
          success: false,
          error: true
        },
      }

    case actionType.CUSTOMER_BANK_CASH_WITHDRAW_FETCH:
      return {
        ...state,
        customerBankCashWithdraw: {
          loading: true
        }
      };
    case actionType.CUSTOMER_BANK_CASH_WITHDRAW_SUCCESS:
      return {
        ...state,
        customerBankCashWithdraw: {
          loading: false,
          success: true
        },
      }
    case actionType.CUSTOMER_BANK_CASH_WITHDRAW_ERROR:
      return {
        ...state,
        customerBankCashWithdraw: {
          loading: false,
          success: false,
          error: true
        },
      }
    default:
      return state;
  }
};

export default agentReducer;
