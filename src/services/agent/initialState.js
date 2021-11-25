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
  //   viewProPicStatus: false
  profile: profileState,
  walletAccount: walletAccountState,
  bankAccounts: bankAccountState,
  customerValidation: customerValidationState,
  customerOtpSend: customerOtpSendState,
  customerWalletCashDeposit: customerWalletCashDepositState,
  customerWalletCashWithdraw: customerWalletCashWithdrawState,
  customerBankAccounts: customerBankAccountsState,
  customerBankCashDeposit: customerBankCashDepositState,
  customerBankCashWithdraw: customerBankCashWithdrawState
};
export default initialState;
