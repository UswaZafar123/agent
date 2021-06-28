import actionType from "../services/actionTypes";
import initialState from "./initialStates";
import {reducer as toastrReducer} from 'react-redux-toastr'

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
        userDetails:action.payload
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
        getViewAccessHistoryListStatus: true
      };
    case actionType.VIEW_ACCESS_HISTORY_FAILURE:
      return {
        ...state,
        getViewAccessHistoryListStatus: false
      };
    case actionType.REGISTRATION_SUCCESS:
      return {
        ...state,
        registrationStatus:true
      };
    case actionType.REGISTRATION_FAILURE:
      return {
        ...state,
        registrationStatus:false
    };
    case actionType.ADDKYCSUCCESS:
      return {
        ...state,
        addKYCStatus: action.payload,
      

      }
      case actionType.ADDKYCFAILURE:
      return {
        ...state,
        addKYCStatus: action.payload,
      

      };
  case actionType.GET_KYC_SUCCESS:
        return {
          ...state,
          getKYCDetails: action.payload,
          getKYCDetailsStatus: true
        };

        case actionType.GET_KYC_FAILURE:
          return {
            ...state,
            getKYCDetailsStatus: false
          };
    case actionType.TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        filterTransactionListDataStatus: false,
        getTransactionListData: action.payload,
        getTransactionListDataStatus: true
      };
    case actionType.TRANSACTION_LIST_FAILURE:
      return {
        ...state,
        getTransactionListDataStatus: false
      };
    case actionType.GET_CURRENCY_LIST_SUCCESS:
      return {
        ...state,
        getCurencyListDataStatus: true,
        getCurencyListData: action.payload
      }
    case actionType.GET_MERCHANT_CHART_SUCCESS:
      return {
        ...state,
        getChartDataStatus: true,
        getChartData: action.payload


      };

    case actionType.GET_MERCHANT_SUMMARY_SUCCESS:
      return {
        ...state,
        getSummaryListDataStatus: true,
        getSummaryListData: action.payload


      };
    case actionType.GET_MERCHANT_SHOP_SUCCESS:
      return {
        ...state,
        getMerchantShopDetails: action.payload

      };
    case actionType.SUBSRIBED_PLAN_SUCCESS:
      return {
        ...state,
        subscribedPlanDetails: action.payload,
        subscribedPlanStatus: true
      };
    case actionType.SUBSRIBED_PLAN_FAILURE:
      return {
        ...state,
        subscribedPlanStatus: false
      };
        case actionType.GET_FEATURED_SUCCESS:
      return {
        ...state,
        getFeaturedListData: action.payload,
        getFeaturedStatus: true
      };
    case actionType.GET_FEATURED_FAILURE:
      return {
        ...state,
        getFeaturedStatus: false
      };
        case actionType.GET_SHOP_MANAGER_LIST_SUCCESS:
      return {
        ...state,
        getShopManagersListData: action.payload,
        getShopManagersListStatus: true
      }
    case actionType.GET_SHOP_MANAGER_LIST_FAILURE:
      return {
        ...state,
        getShopManagersListData: [],
        getShopManagersListStatus: false
      }
      case actionType.GET_POS_MANAGERS_LIST_SUCCESS:
        return {
          ...state,
          getPOSManagersData: action.payload,
          getPOSListStatus: true
        }
      case actionType.GET_POS_MANAGERS_LIST_FAILURE:
        return {
          ...state,
          getPOSListStatus: false,
          getPOSManagersData: action.payload
        }


    case actionType.GET_SHOP_MANAGER_SUCCESS:
      return {
        ...state,
        shopManagersLists: action.payload,
        shopManagerStatus: true

      };

    case actionType.GET_SHOP_MANAGER_FAILURE:
      return {
        ...state,
        shopManagersLists: action.payload,
        shopManagerStatus: false

      };
      case actionType.ADD_SHOP_MANAGER_SUCCESS:
        return {
          ...state,
          selectedValues: action.payload,
          addSMStatus: true
        };
      case actionType.ADD_SHOP_MANAGER_FAILURE:
        return {
          ...state,
          selectedValues: [],
          addSMStatus: false
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
        message: action.message
      }

    case actionType.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload
      }
    default:
      return state;
  }
};

export default reducer;
