const profileState = {
  loading: false,
  data: {},
}

const walletAccountState = {
  loading: false,
  data: {},
}

const bankAccountState = {
  loading: false,
  list: [],
}

const superAgentDetailState = {
  loading: false,
  data: {},
}

const sendLinkingRequestState = {
  loading: false,
  success: false,
  error: false,
}

const validateSuperAgentState = {
  loading: false,
  success: false,
  error: false,
}

const inkingRequestsState = {
  loading: false,
  list: [],
  linkingRequestProcessing: false,
  linkingRequestProcessSuccess: false,
  linkingRequestProcessError: false,
}

const customerValidationState = {
  loading: false,
  success: false,
  error: false,
};

const customerOtpSendState = {
  loading: false,
  success: false,
  error: false,
};

const agentOtpSendState = {
  loading: false,
  success: false,
  error: false,
};

const customerWalletCashDepositState = {
  loading: false,
  success: false,
  error: false,
};

const customerWalletCashWithdrawState = {
  loading: false,
  success: false,
  error: false,
};

const customerBankAccountsState = {
  loading: false,
  list: [],
}

const customerBankCashDepositState = {
  loading: false,
  success: false,
  error: false,
};

const customerBankCashWithdrawState = {
  loading: false,
  success: false,
  error: false,
};

const initialState = {
  agentLoginstatus: false,
  linkingStatus: false,
  linkingList: null,
  agentIndividualRegData: [],
  agentIndividualRegStatus: false,
  agentOTPStatus: false,
  agentOTPValidStatus: false,
  agentSetPasswordStatus: false,
  getATicketStatus: false,
  ticketsPriorityData: null,
  ticketsPriorityStatus: false,
  ticketsUploadAttcahmentData: null,
  ticketsUploadAttcahmentStatus: false,
  ticketsData: null,
  ticketsStatus: false,
  ticketStatusData: null,
  ticketDataStatus: false,
  ticketSummaryData: null,
  ticketSummaryStatus: false,
  getATicketData: null,
  uploadedFileStatus: false,
  uploadedFileData: null,

  kycSendStatus: false,
  kycSendData: null,
  profileDetails: null,
  kycGetStatus: false,
  kycGetData: null,

  getScreenPermissionsByRoleStatus: false,
  getScreenPermissionsByRoleData: null,

  getUserRoleStatus: false,
  getUserRoleData: null,

  addUserRoleStatus: false,
  addUserRoleData: null,

  deleteUserRoleStatus: false,
  deleteUserRoleData: null,

  updateUserRoleStatus: false,
  updateUserRoleData: null,

  getAllScreensStatus: false,
  getAllScreensData: null,

  addAllPermissionStatus: false,
  addAllPermissionData: null,
  profileImage: null,
  profileImageStatus: "null",
  packagesDetails: null,
  packagesStatus: "nullable",
  currencyDetails: null,
  currencyStatus: "nullable",
  assetStatus: "nullable",
  assetDetails: null,
  operationStatus: "nullable",
  operationDetails: null,
  a_package_status: "nullable",
  a_package_details: null,
  //   viewProPicStatus: false
  profile: profileState,
  walletAccount: walletAccountState,
  bankAccounts: bankAccountState,
  superAgentDetail: superAgentDetailState,
  sendLinkingRequest: sendLinkingRequestState,
  validateSuperAgent: validateSuperAgentState,
  linkingRequests: inkingRequestsState,
  customerValidation: customerValidationState,
  agentOtpSend: agentOtpSendState,
  customerOtpSend: customerOtpSendState,
  customerWalletCashDeposit: customerWalletCashDepositState,
  customerWalletCashWithdraw: customerWalletCashWithdrawState,
  customerBankAccounts: customerBankAccountsState,
  customerBankCashDeposit: customerBankCashDepositState,
  customerBankCashWithdraw: customerBankCashWithdrawState
};
export default initialState;
