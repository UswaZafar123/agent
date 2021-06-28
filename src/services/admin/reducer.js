import actionType from "./actionType";
import initialState from "./intialState";

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.ADMIN_GET_MERCHANT_SUCCESS:
      return {
        ...state,
        merchantListStatus: true,
        merchantListData: action.payload,
      };
    case actionType.ADMIN_GET_MERCHANT_FAILURE:
      return {
        ...state,
        merchantListStatus: false,
      };
    case actionType.GET_MERCHANT_PENDING_FIRST_APPROVAL_LIST_SUCCESS:
      return {
        ...state,
        merchantFirstPendingListStatus: true,
        merchantFirstPendingListData: action.payload,
      };
    case actionType.GET_MERCHANT_PENDING_FIRST_APPROVAL_LIST_FAILURE:
      return {
        ...state,
        merchantFirstPendingListStatus: false,
      };

    case actionType.GET_MERCHANT_PENDING_SECOND_APPROVAL_LIST_SUCCESS:
      return {
        ...state,
        merchantSecondPendingListStatus: true,
        merchantSecondPendingListData: action.payload,
      };
    case actionType.GET_MERCHANT_PENDING_SECOND_APPROVAL_LIST_FAILURE:
      return {
        ...state,
        merchantSecondPendingListStatus: false,
      };

    case actionType.GET_KYC_SUCCESS:
      return {
        ...state,
        merchantKycStatus: true,
        merchantKycData: action.payload,
      };
    case actionType.GET_KYC_FAILURE:
      return {
        ...state,
        merchantKycStatus: false,
      };

    case actionType.GET_CURRENCY_SUCCESS:
      return {
        ...state,
        currencyStatus: true,
        currencyList: action.payload,
      };
    case actionType.GET_CURRENCY_FAILURE:
      return {
        ...state,
        currencyStatus: false,
      };

    case actionType.GET_REVENUE_MERCHANT_SUCCESS:
      return {
        ...state,
        merchantRevenueStatus: true,
        merchantRevenueList: action.payload,
      };
    case actionType.GET_REVENUE_MERCHANT_FAILURE:
      return {
        ...state,
        merchantRevenueStatus: false,
      };

    case actionType.GET_SUMMARY_SUCCESS:
      return {
        ...state,
        summaryStatus: true,
        summaryData: action.payload,
      };
    case actionType.GET_SUMMARY_FAILURE:
      return {
        ...state,
        summaryStatus: false,
      };

    case actionType.GET_AMOUNT_COLLECTED_SUCCESS:
      return {
        ...state,
        amountCollectedStatus: true,
        amountCollectedData: action.payload,
      };
    case actionType.GET_AMOUNT_COLLECTED_FAILURE:
      return {
        ...state,
        amountCollectedStatus: false,
      };
      case actionType.VIEW_ACCESS_HISTORY_SUCCESS:
        return {
          ...state,
          accessHistoryStatus: true,
          accessHistoryData:action.payload
        };

        case actionType.VIEW_ACCESS_HISTORY_FAILURE:
          return {
            ...state,
            accessHistoryStatus: false,
          };
          case actionType.FILTER_TRANSACTION_LIST_SUCCESS:
            return {
              ...state,
              getTransactionListData: action.payload,
              filterTransactionListDataStatus: true
            };
          case actionType.FILTER_TRANSACTION_LIST_FAILURE:
            return {
              ...state,
              filterTransactionListDataStatus: false
            };
  
      case actionType.GET_ALL_PENDING_TO_APPROVE_CLIENTS_SUCCESS:
      return {
        ...state,
        clientList: action.payload.content,
        clientListStatus:true,
      };
      case actionType.GET_ALL_PENDING_TO_APPROVE_CLIENTS_FAIL:
        return {
          ...state,
          clientList: [],
          clientListStatus:false,
        };
      case actionType.GET_ALL_PENDING_SECOND_TO_APPROVE_CLIENTS_SUCCESS:
      return {
        ...state,
        secondApprovalclientList: action.payload.content,
        secondApprovalclientListStatus:true,
      };
      case actionType.GET_ALL_PENDING_SECOND_TO_APPROVE_CLIENTS_FAIL:
        return {
          ...state,
          secondApprovalclientList: [],
          secondApprovalclientListStatus:false,
        };
        case actionType.GET_SUBSCRIPTION_LIST_SUCCESS:
          return {
            ...state,
            getSubscriptionListData: action.payload,
            getSubscriptionListDataStatus: true
          };
        case actionType.GET_SUBSCRIPTION_LIST_FAILURE:
          return {
            ...state,
            getSubscriptionListDataStatus: false
          };

          case actionType.GET_MERCHANT_SUCCESS:
            return {
              ...state,
              getMerchantListData: action.payload
            };
      
          case actionType.GET_PAYMENT_CATEGORIES_SUCCESS:
            return {
              ...state,
              getPaymentCategoriesListData: action.payload
      
      
            };
            case actionType.GET_PAYMENT_METHODS_SUCCESS:
              return {
        
                getPaymentMethodsListData: action.payload,
              };
        
        
            case actionType.GET_PAYMENT_METHOD_SUCCESS:
              return {
        
                methodsListData: action.payload,
              };
              case actionType.GET_PAYMENT_CATEGORY_SUCCESS:
                return {
                  ...state,
                  getPaymentCategoryListData: action.payload
                };
                case actionType.GET_CURRENCY_LIST_SUCCESS:
                  return {
                    ...state,
                    getCurrencyListData: action.payload,
                    getCurrencyListDataStatus: true
                  };
                case actionType.GET_CURRENCY_LIST_FAILURE:
                  return {
                    ...state,
                    getTransactionListDataStatus: false
                  };
                  case actionType.GET_ROLE_PERMISSIONS_LIST_SUCCESS:
                    return {
                      ...state,
                      getRolesandPermissionListData : action.payload,
                      getRolesandPermissionStatus : true
                    };
                  case actionType.GET_ROLE_PERMISSIONS_LIST_FAILURE:
                    return {
                      ...state,
                      getRolesandPermissionListData : action.payload,
                      getRolesandPermissionStatus : false
                    }
                  case actionType.GET_FEES_LIST_SUCCESS:
                    return {
                      ...state,
                      getTransactionFeeListsStatus:true,
                      getTransactionFeeLists: action.payload,
              
                    };
                    case actionType.GET_FEES_LIST_FAILURE:
                    return {
                      ...state,
                      getTransactionFeeListsStatus:false,
                     
              
                    };    
      case actionType.GET_ALL_PERMISSIONS_SUCCESS:
        return {
            permissionsStatus:true,
          permissionsLists: action.payload,
        };
  
        case actionType.GET_ALL_PERMISSIONS_FAILURE:
          return {
              permissionsStatus:false,
            
          };
        
    default:
      return state;
  }
};

export default adminReducer;
