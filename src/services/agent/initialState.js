const profileState = {
  loading: false,
  data: {},
}

const walletAccountState = {
  loading: false,
  data: {},
}

const customerValidationState = {
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
  getATicketStatus: false,
  uploadedFileStatus: false,
  uploadedFileData: null,
  //   viewProPicStatus: false
  profile: profileState,
  walletAccount: walletAccountState,
  customerValidation: customerValidationState
};
export default initialState;
