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
  agentLoginstatus : false,
  linkingStatus: false,
  linkingList:null,
  agentIndividualRegData : [],
  agentIndividualRegStatus : false,
  agentOTPStatus : false,
  agentOTPValidStatus : false,
  agentSetPasswordStatus : false,
  //viewProPicStatus: false
  
  /**
   * 
  */
  profile: profileState,
  walletAccount: walletAccountState,
  customerValidation: customerValidationState
  /**
   * 
  */
};
export default initialState;