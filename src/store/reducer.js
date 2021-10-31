import actionType from "../services/actionTypes";
import initialState from "./initialStates";
import { reducer as toastrReducer } from "react-redux-toastr";

const reducer = (state = initialState, action) => {
  console.log(action.info, "action.info");
  switch (action.type) {
    case actionType.TWO_FACTOR_VERIFY_OPEN:
      return {
        ...state,
        twoFactorVerifyOpen: true,
      };
    case actionType.TWOFACTOR_VERIFY_SUCCESS:
      return {
        ...state,
        twoFactorVerifySuccess: true,
      };
    case actionType.LOGIN_SUCCESS:
      return {
        ...state,
        twoFactorVerifyOpen: false,
        loginStatus: true,
        checkLogin: false,
        userInfo: action.info,
        userDetails: action.payload,
        token: action.payload.token,
        loginEmail: action.loginEmail,
      };

    case actionType.MERCHANT_LOGIN_SUCCESS:
      return {
        ...state,
        merchantLoginStatus: true,
        userDetails: action.payload,
      };
    case actionType.MERCHANT_LOGIN_FAILURE:
      return {
        ...state,
        merchantLoginStatus: false,
      };

    case actionType.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLoginStatus: true,
        userDetails: action.payload,
      };
    case actionType.USER_LOGIN_FAILURE:
      return {
        ...state,
        userLoginStatus: false,
      };

    case actionType.LOGIN_FAILURE:
      return {
        ...state,
        loginStatus: false,
        checkLogin: true,
      };
    // case actionType.USER_LOGIN_FAILURE:
    //   return {
    //     ...state,
    //     error: action.payload,
    //   };

    case actionType.TICKET_LIST_SUCCESS:
      return {
        ...state,
        getTicketListData: action.payload,
        getTicketListStatus: true,
      };
    case actionType.TICKET_LIST_FAILURE:
      return {
        ...state,
        getTicketListStatus: false,
      };
    case actionType.GET_TICKET_LIST_SUCCESS:
      return {
        ...state,
        getTicketListData: action.payload,
        getTicketListData: true,
      };
    case actionType.GET_TICKET_LIST_FAILURE:
      return {
        ...state,
        getTicketListData: false,
      };
    case actionType.GET_TICKET_DETAILS_SUCCESS:
      return {
        ...state,
        getTicketDetails: action.payload,
        getTicketDetailsStatus: true,
      };
    case actionType.GET_TICKET_DETAILS_FAILURE:
      return {
        ...state,
        getTicketDetailsStatus: false,
      };

    case actionType.USER_REGISTERED_SUCCESS:
      return {
        ...state,
        isUserAlreadyRegistred: action.payload,
      };
    case actionType.USER_REGISTERED_FAIL:
      return {
        ...state,
        isUserAlreadyRegistred: false,
      };
    case actionType.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordStatus: true,
      };
    case actionType.FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordStatus: false,
      };
    case actionType.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordStatus: true,
      };
    case actionType.CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordStatus: false,
      };
    case actionType.UPDATE_MERCHANT_PROFILE_SUCCESS:
      return {
        ...state,
        merchantProfileUpdateStatus: true,
        userDetails: action.payload,
      };
    case actionType.UPDATE_MERCHANT_PROFILE_FAILURE:
      return {
        ...state,
        merchantProfileUpdateStatus: false,
      };
    case actionType.VERIFY_REGISTER_SUCCESS:
      return {
        ...state,
        message: action.message,
      };
    case actionType.VERIFY_REGISTER_FAILURE:
      return {
        ...state,
        message: action.message,
      };

    case actionType.SHOW_IS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case actionType.HIDE_IS_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case actionType.VIEW_ACCESS_HISTORY_SUCCESS:
      return {
        ...state,
        getViewAccessHistoryListData: action.payload,
        getViewAccessHistoryListStatus: true,
      };
    case actionType.VIEW_ACCESS_HISTORY_FAILURE:
      return {
        ...state,
        getViewAccessHistoryListStatus: false,
      };
    case actionType.REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationStatus: true,
      };
    case actionType.REGISTRATION_FAILURE:
      return {
        ...state,
        registrationStatus: false,
      };
    case actionType.ADDKYCSUCCESS:
      return {
        ...state,
        addKYCStatus: action.payload,
      };
    case actionType.ADDKYCFAILURE:
      return {
        ...state,
        addKYCStatus: action.payload,
      };
    case actionType.GET_KYC_SUCCESS:
      return {
        ...state,
        getKYCDetails: action.payload,
        getKYCDetailsStatus: true,
      };

    case actionType.GET_KYC_FAILURE:
      return {
        ...state,
        getKYCDetailsStatus: false,
      };
    case actionType.TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        filterTransactionListDataStatus: false,
        getTransactionListData: action.payload,
        getTransactionListDataStatus: true,
      };
    case actionType.TRANSACTION_LIST_FAILURE:
      return {
        ...state,
        getTransactionListDataStatus: false,
      };
    case actionType.GET_CURRENCY_LIST_SUCCESS:
      return {
        ...state,
        getCurencyListDataStatus: true,
        getCurencyListData: action.payload,
      };
    case actionType.GET_MERCHANT_CHART_SUCCESS:
      return {
        ...state,
        getChartDataStatus: true,
        getChartData: action.payload,
      };

    case actionType.GET_MERCHANT_SUMMARY_SUCCESS:
      return {
        ...state,
        getSummaryListDataStatus: true,
        getSummaryListData: action.payload,
      };
    case actionType.GET_MERCHANT_SHOP_SUCCESS:
      return {
        ...state,
        getMerchantShopDetails: action.payload,
      };
    case actionType.SUBSRIBED_PLAN_SUCCESS:
      return {
        ...state,
        subscribedPlanDetails: action.payload,
        subscribedPlanStatus: true,
      };
    case actionType.SUBSRIBED_PLAN_FAILURE:
      return {
        ...state,
        subscribedPlanStatus: false,
      };
    case actionType.GET_FEATURED_SUCCESS:
      return {
        ...state,
        getFeaturedListData: action.payload,
        getFeaturedStatus: true,
      };
    case actionType.GET_FEATURED_FAILURE:
      return {
        ...state,
        getFeaturedStatus: false,
      };
    case actionType.GET_SHOP_MANAGER_LIST_SUCCESS:
      return {
        ...state,
        getShopManagersListData: action.payload,
        getShopManagersListStatus: true,
      };
    case actionType.GET_SHOP_MANAGER_LIST_FAILURE:
      return {
        ...state,
        getShopManagersListData: [],
        getShopManagersListStatus: false,
      };
    case actionType.GET_POS_MANAGERS_LIST_SUCCESS:
      return {
        ...state,
        getPOSManagersData: action.payload,
        getPOSListStatus: true,
      };
    case actionType.GET_POS_MANAGERS_LIST_FAILURE:
      return {
        ...state,
        getPOSListStatus: false,
        getPOSManagersData: action.payload,
      };

    case actionType.GET_SHOP_MANAGER_SUCCESS:
      return {
        ...state,
        shopManagersLists: action.payload,
        shopManagerStatus: true,
      };

    case actionType.GET_SHOP_MANAGER_FAILURE:
      return {
        ...state,
        shopManagersLists: action.payload,
        shopManagerStatus: false,
      };
    case actionType.ADD_SHOP_MANAGER_SUCCESS:
      return {
        ...state,
        selectedValues: action.payload,
        addSMStatus: true,
      };
    case actionType.ADD_SHOP_MANAGER_FAILURE:
      return {
        ...state,
        selectedValues: [],
        addSMStatus: false,
      };

    case actionType.GET_CHART_DATA_SUCCESS:
      return {
        ...state,
        merchantChartData: action.payload,
      };
    case actionType.GET_CHART_DATA_FAILURE:
      return {
        ...state,
        merchantChartData: [],
      };
    case actionType.VERIFY_USER_REGISTER_SUCCESS:
      return {
        ...state,
        message: action.message,
      };

    case actionType.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
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

    case actionType.MERCHANT_ROLES_SUCCESS:
      console.log("action", action);
      return {
        ...state,
        roles: action.message,
      };
    case actionType.MERCHANT_ROLES_FAILURE:
      return {
        ...state,
        roles: action.message,
      };
    case actionType.MERCHANT_PERMISSON_SUCCESS:
      return {
        ...state,
        permissions: action.message,
      };

    case actionType.REGISTERED_EMAIL_SUCCESS:
      return {
        ...state,
        forgotStatus: true,
      };
    case actionType.REGISTERED_EMAIL_FAILURE:
      return {
        ...state,
        forgotStatus: false,
      };

    case actionType.MERCHANT_ROLES_SUCCESS:
      console.log("action", action);
      return {
        ...state,
        roles: action.message,
      };
    case actionType.MERCHANT_ROLES_FAILURE:
      return {
        ...state,
        roles: action.message,
      };
    case actionType.MERCHANT_PERMISSON_SUCCESS:
      return {
        ...state,
        permissions: action.message,
        permissionStatus: action.status,
      };
    case actionType.MERCHANT_PERMISSON_FAILURE:
      return {
        ...state,
        permissions: action.message,
        permissionStatus: action.status,
      };

    case actionType.CUSTOMER_REGISTER_SUCCESS:
      return {
        ...state,
        customerregister: true,
      };
    case actionType.CUSTOMER_REGISTER_FAIL:
      return {
        ...state,
        customerregister: false,
      };

    case actionType.FORGOT_EMAIL_SUCCESS:
      return {
        ...state,
        forgotEmailStatus: true,
      };
    case actionType.FORGOT_EMAIL_FAILURE:
      return {
        ...state,
        forgotEmailStatus: false,
      };

    case actionType.RESET_PASSWORD_MERCHANT_SUCCESS:
      return {
        ...state,
        resetPasswordStatus: true,
      };
    case actionType.RESET_PASSWORD_MERCHANT_FAILURE:
      return {
        ...state,
        resetPasswordStatus: false,
      };

    case actionType.GET_MERCHANT_PROFILE_SUCCESS:
      return {
        ...state,
        profilebankStatus: true,
        profilebankData: action.payload,
      };
    case actionType.GET_MERCHANT_PROFILE_FAILURE:
      return {
        ...state,
        profilebankStatus: false,
      };

    case actionType.GET_OPERATOR_LIST_SUCCESS:
      return {
        ...state,
        operatorStatus: true,
        operatorData: action.payload,
      };
    case actionType.GET_OPERATOR_LIST_FAILURE:
      return {
        ...state,
        operatorStatus: false,
      };

    case actionType.GET_COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        countryStatus: true,
        countryData: action.payload,
      };
    case actionType.GET_COUNTRY_LIST_FAILURE:
      return {
        ...state,
        countryStatus: false,
      };

    case actionType.GET_MERCHANT_MOBILE_SUCCESS:
      return {
        ...state,
        mobileStatus: true,
        mobileData: action.payload,
      };
    case actionType.GET_MERCHANT_MOBILE_FAILURE:
      return {
        ...state,
        mobileStatus: false,
      };

    case actionType.GET_MERCHANT_VERIFY_MOBILE_SUCCESS:
      return {
        ...state,
        verficationstatus: true,
      };
    case actionType.GET_MERCHANT_VERIFY_MOBILE_FAILURE:
      return {
        ...state,
        verficationstatus: false,
      };

    case actionType.CHANGE_VERIFICATION_STATE:
      return {
        ...state,
        verficationstatus: !action.payload,
      };
    case actionType.GET_CARDS_LIST_SUCCESS:
      return {
        ...state,
        cardsStatus: true,
        cardsData: action.payload,
      };

    case actionType.GET_CARDS_LIST_FAILURE:
      return {
        ...state,
        cardsStatus: false,
      };
    case actionType.GET_MERCHANT_CARDS_SUCCESS:
      return {
        ...state,
        merchantCardsStatus: true,
        merchantCardsData: action.payload,
      };

    case actionType.GET_MERCHANT_CARDS_FAILURE:
      return {
        ...state,
        merchantCardsStatus: false,
      };

    case actionType.GET_PROFILE_PIC_SUCCESS:
      return {
        ...state,
        picStatus: true,
        picData: action.payload,
      };

    case actionType.GET_PROFILE_PIC_FAILURE:
      return {
        ...state,
        picStatus: false,
      };

    case actionType.GET_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        infoStatus: true,
        infoData: action.payload,
      };

    case actionType.GET_PROFILE_INFO_FAILURE:
      return {
        ...state,
        infoStatus: false,
      };

    case actionType.GET_PROFILE_LOGO_SUCCESS:
      return {
        ...state,
        logoStatus: true,
        logoData: action.payload,
      };

    case actionType.GET_PROFILE_LOGO_FAILURE:
      return {
        ...state,
        logoStatus: false,
      };

    case actionType.REGISTRATION_PIN_SUCCESS:
      return {
        ...state,
        pinStatus: true,
      };

    case actionType.REGISTRATION_PIN_SUCCESS:
      return {
        ...state,
        pinStatus: false,
      };

    case actionType.VERIFY_USER_REGISTER_SUCCESS:
      return {
        ...state,
        verifyStatus: true,
        verifymessage: action.payload,
        statusCode: 200,
      };

    case actionType.VERIFY_USER_REGISTER_FAILURE:
      return {
        ...state,
        verifyStatus: true,
        verifymessage: action.payload,
        statusCode: 500,
      };

    case actionType.CHANGE_USER_REGISTER_VERIFY:
      return {
        ...state,
        verifyStatus: false,
      };

    case actionType.GET_ALL_ROLES_SUCCESS:
      return {
        ...state,
        rolesStatus: true,
        rolesList: action.payload,
      };

    case actionType.GET_ALL_ROLES_FAILURE:
      return {
        ...state,
        rolesStatus: false,
      };

    case actionType.GET_ALL_GROUPS_SUCCESS:
      return {
        ...state,
        groupsStatus: true,
        groupsList: action.payload,
      };

    case actionType.GET_ALL_GROUPS_FAILURE:
      return {
        ...state,
        groupsStatus: false,
      };

    case actionType.GET_ALL_SUB_USERS_SUCCESS:
      return {
        ...state,
        subUserStatus: true,
        subUserList: action.payload,
      };

    case actionType.GET_ALL_SUB_USERS_FAILURE:
      return {
        ...state,
        subUserStatus: false,
      };

    case actionType.GET_ALL_BANKS_SUCCESS:
      return {
        ...state,
        bankAllStatus: true,
        bankAllList: action.payload,
      };

    case actionType.GET_ALL_BANKS_FAILURE:
      return {
        ...state,
        bankAllStatus: false,
      };

    case actionType.GET_ALL_BANKS_AFRI_SUCCESS:
      return {
        ...state,
        afriStatus: true,
        afriList: action.payload,
      };

    case actionType.GET_ALL_BANKS_AFRI_FAILURE:
      return {
        ...state,
        afriStatus: false,
      };

    case actionType.CALCULATE_FEE_SUCCESS:
      return {
        ...state,
        feeStatus: true,
        feeList: action.payload,
      };

    case actionType.CALCULATE_FEE_FAILURE:
      return {
        ...state,
        feeStatus: false,
      };

    case actionType.GET_DEFAULT_POS_SUCCESS:
      return {
        ...state,
        posStatus: true,
        posList: action.payload,
      };

    case actionType.GET_DEFAULT_POS_FAILURE:
      return {
        ...state,
        posStatus: false,
      };

    case actionType.CASH_IN_SUCCESS:
      return {
        ...state,
        cashinStatus: true,
      };
    case actionType.CASH_IN_FAILURE:
      return {
        ...state,
        cashinStatus: false,
      };

    case actionType.CASH_IN_NULL:
      return {
        ...state,
        cashinStatus: "nullable",
      };

    case actionType.GET_WALLET_BALANCE_SUCCESS:
      return {
        ...state,
        walletBalanceStatus: true,
        walletBalance: action.payload,
      };

    case actionType.GET_WALLET_BALANCE_FAILURE:
      return {
        ...state,
        walletBalanceStatus: false,
      };

    case actionType.CASH_OUT_SUCCESS:
      return {
        ...state,
        cashoutStatus: true,
      };
    case actionType.CASH_OUT_FAILURE:
      return {
        ...state,
        cashoutStatus: false,
      };

    case actionType.CASH_OUT_NULL:
      return {
        ...state,
        cashoutStatus: "nullable",
      };

    case actionType.GET_QR_CODE_SUCCESS:
      return {
        ...state,
        qrStatus: true,
        qrCode: action.payload,
      };

    case actionType.GET_QR_CODE_FAILURE:
      return {
        ...state,
        qrStatus: false,
        qrCode: null,
      };

    case actionType.BULK_VAIDATE_SUCCESS:
      return {
        ...state,
        validationStatus: true,
        validatedList: action.payload,
      };

    case actionType.BULK_VAIDATE_SUCCESS:
      return {
        ...state,
        validationStatus: false,
        validatedList: [],
      };

    case actionType.BULK_PAYMENT_SUCCESS:
      return {
        ...state,
        bulkPaymentStatus: true,
      };

    case actionType.BULK_PAYMENT_FAILURE:
      return {
        ...state,
        bulkPaymentStatus: false,
      };
    case actionType.BULK_PAYMENT_NULLABLE:
      return {
        ...state,
        bulkPaymentStatus: "Nulllable",
      };

    case actionType.GET_BULK_PAYMENT_SUCCESS:
      return {
        ...state,
        getBulkstatus: true,
        getBulkList: action.payload,
      };
    case actionType.GET_BULK_PAYMENT_FAILURE:
      return {
        ...state,
        getBulkstatus: false,
      };

    default:
      return state;
  }
};

export default reducer;
