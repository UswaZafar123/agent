import React, { useState, useEffect, useRef } from "react";
import "../../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "../Settings/General/formfromold.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import validator from "validator";

import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import OtpInput from "react-otp-input";
import { Button, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import actionType from "../../../services/agent/actionType.js";
import {
  fetchAgentProfile,
  verifyCustomer,
  sendOtpToAgent,
  initiateWalletCashDeposit,
  fetchFeeDetail,
} from "../../../services/agent/action.js";
import feeConstants from "../../../Assets/feeConstants";

import { FormattedMessage, IntlProvider } from "react-intl";

const { Option } = Select;
const resendTime = 30;

const WalletCashDeposit = () => {
  const firstUpdate = useRef(true);
  const [step, setStep] = useState(1);
  const idDocumentTypes = [
    { name: "agent.IDCard", value: "ID_CARD" },
    { name: "agent.Passport", value: "PASSPORT" },
  ];
  const otpTypes = [
    { name: "Email", value: "EMAIL" },
    { name: "SMS", value: "SMS" },
  ];

  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState(
    idDocumentTypes[0].value
  );
  const [idDocumentNumber, setIdDocumentNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [selectedOtpType, setSelectedOtpType] = useState(otpTypes[0].value);
  const [otpTimer, setOtpTimer] = React.useState(resendTime);
  const [otp, setOtp] = useState("");

  const [messages, setMessages] = useState("");
  const [language, setLanguage] = useState("");

  const lan = useSelector((state) => state.commonReducer.language);

  const dispatch = useDispatch();
  const agentProfile = useSelector((state) => state.agentReducer.profile.data);
  const loadingCustomerValidation = useSelector(
    (state) => state.agentReducer.customerValidation.loading
  );
  const customerSuccess = useSelector(
    (state) => state.agentReducer.customerValidation.success
  );
  const feeDetailLoading = useSelector(
    (state) => state.agentReducer.feeDetail.loading
  );
  const feeDetailData = useSelector(
    (state) => state.agentReducer.feeDetail.data
  );
  const agentOtpLoading = useSelector(
    (state) => state.agentReducer.agentOtpSend.loading
  );
  const agentOtpSuccess = useSelector(
    (state) => state.agentReducer.agentOtpSend.success
  );
  const loadingCustomerCashDeposit = useSelector(
    (state) => state.agentReducer.customerWalletCashDeposit.loading
  );
  const customerCashDepositSuccess = useSelector(
    (state) => state.agentReducer.customerWalletCashDeposit.success
  );

  useEffect(() => {
    //Reset States When leaving the page
    return () => {
      dispatch({
        type: actionType.CUSTOMER_VALIDATION_RESET,
      });
      dispatch({
        type: actionType.FEE_DETAIL_RESET,
      });
      dispatch({
        type: actionType.AGENT_OTP_SEND_RESET,
      });
      dispatch({
        type: actionType.CUSTOMER_WALLET_CASH_DEPOSIT_RESET,
      });
      setStep(1);
    };
  }, []);

  useEffect(async () => {
    const messages = await loadLocaleData(localStorage.getItem("lang"));
    setMessages(messages);

    setLanguage(localStorage.getItem("lang"));

    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");
  }, []);

  const loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../../i18n/messages/fr.js");
      default:
        return import("../../i18n/messages/en.js");
    }
  };

  useEffect(async () => {
    const messages = await loadLocaleData(lan);
    setMessages(messages);

    setLanguage(lan);
  }, [lan]);

  useEffect(() => {
    if (!agentProfile) {
      dispatch(fetchAgentProfile(sessionStorage.getItem("token")));
    }
  }, [agentProfile, dispatch]);

  useEffect(() => {
    if (step === 5) {
      if (otpTimer > 0) {
        setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      }
    }
  }, [otpTimer, step]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (step === 1 && customerSuccess) {
      setStep(2);
    }
    if (step === 2 && Object.keys(feeDetailData).length !== 0) {
      setStep(3);
    }
    if (step === 4 && agentOtpSuccess) {
      setStep(5);
    }
    if (step === 5 && customerCashDepositSuccess) {
      setStep(6);
    }
  }, [
    step,
    customerSuccess,
    feeDetailData,
    agentOtpSuccess,
    customerCashDepositSuccess,
  ]);

  const stepOneValidated = () => {
    return !(
      validator.isEmpty(phoneNumber) ||
      validator.isEmpty(selectedDocumentType) ||
      validator.isEmpty(idDocumentNumber) ||
      loadingCustomerValidation
    );
  };

  const stepTwoValidated = () => {
    return !(validator.isEmpty(amount) || feeDetailLoading);
  };

  const stepThreeValidated = () => {
    return !(validator.isEmpty(selectedOtpType) || agentOtpLoading);
  };

  const stepFourValidated = () => {
    return !(
      validator.isEmpty(otp) ||
      otp.length !== 6 ||
      loadingCustomerCashDeposit
    );
  };

  const isLoading = () => {
    return (
      loadingCustomerValidation ||
      feeDetailLoading ||
      agentOtpLoading ||
      loadingCustomerCashDeposit
    );
  };

  const isFormValidated = () => {
    switch (step) {
      case 1:
        return stepOneValidated();
      case 2:
        return stepTwoValidated();
      case 3:
        return true;
      case 4:
        return stepThreeValidated();
      case 5:
        return stepFourValidated();
      case 6:
        return true;
      default:
        return false;
    }
  };

  const formSubmitAction = () => {
    if (step === 1) {
      verifyCustomerSubmit();
    } else if (step === 2) {
      calculateFee();
    } else if (step === 3) {
      setStep(step + 1);
    } else if (step === 4) {
      sendAgentOTP();
    } else if (step === 5) {
      sendDepositRequest();
    } else {
      resetForm();
      setStep(1);
    }
  };

  const prevStep = () => {
    if (step === 2) {
      dispatch({
        type: actionType.CUSTOMER_VALIDATION_RESET,
      });
    }
    if (step === 4) {
      dispatch({
        type: actionType.FEE_DETAIL_RESET,
      });
    }
    if (step === 5) {
      dispatch({
        type: actionType.AGENT_OTP_SEND_RESET,
      });
    }
    setStep(step - 1);
  };

  const resetForm = () => {
    dispatch({
      type: actionType.CUSTOMER_VALIDATION_RESET,
    });
    dispatch({
      type: actionType.FEE_DETAIL_RESET,
    });
    dispatch({
      type: actionType.AGENT_OTP_SEND_RESET,
    });
    dispatch({
      type: actionType.CUSTOMER_WALLET_CASH_DEPOSIT_RESET,
    });
    setPhoneNumber("");
    setIdDocumentNumber("");
    setAmount("");
    setReason("");
    setOtp("");
  };

  const verifyCustomerSubmit = () => {
    var requestObj = {
      type: "WALLET",
      phoneNumber: phoneNumber,
      idDocumentType: selectedDocumentType,
      idDocumentNumber: idDocumentNumber,
    };
    dispatch(verifyCustomer(sessionStorage.getItem("token"), requestObj));
  };

  const calculateFee = () => {
    let subscriptionId = feeConstants.getAgentSubscriptionId(
      agentProfile.status
    );
    var requestObj = {
      paymentMethodId: feeConstants.constants.CASH_DEPOSIT_WALLET,
      subscriptionPlanId: subscriptionId,
      currencyCode: "XAF",
      transactionAmount: amount,
    };
    dispatch(fetchFeeDetail(requestObj));
  };

  const sendAgentOTP = () => {
    var requestObj = {
      mfaChannel: selectedOtpType,
      customerType: "AGENT",
    };
    dispatch(sendOtpToAgent(sessionStorage.getItem("token"), requestObj));
  };

  const resendAgentOtp = () => {
    setOtpTimer(resendTime);
    sendAgentOTP();
  };

  const sendDepositRequest = () => {
    var requestObj = {
      debtorUserType: "AGENT",
      debtorUserId: agentProfile.phoneNo,
      currencyName: "XAF",
      amount: amount,
      reason: reason,
      creditorUserType: "CUSTOMER",
      creditorUserId: phoneNumber,
      fee: feeDetailData.transactionFee,
      feeId: feeDetailData.feeId,
      type: "WALLET_TRANSFER",
      mfaToken: otp,
    };
    dispatch(
      initiateWalletCashDeposit(sessionStorage.getItem("token"), requestObj)
    );
  };

  const walletVerificationForm = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                <FormattedMessage id="agent.phonenumber" />{" "}
                <span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <FormattedMessage id="agent.EnterPhoneNumber">
                {(placeholder) => (
                  <input
                    placeholder={placeholder}
                    type="number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                )}
              </FormattedMessage>
            </div>
          </div>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                <FormattedMessage id="agent.DocumentType" />{" "}
                <span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <div className="categorySelect">
                <Select
                  style={{ width: 100 + "%", height: 52 }}
                  value={selectedDocumentType}
                  onChange={(value) => setSelectedDocumentType(value)}
                >
                  {idDocumentTypes.map((type) => {
                    return (
                      <Option value={type.value}>
                        <FormattedMessage id={type.name} />
                      </Option>
                    );
                  })}
                </Select>
              </div>
            </div>
          </div>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                <FormattedMessage id="agent.IDDocumentNumber" />{" "}
                <span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <FormattedMessage id="agent.EnterIDDocumentNumber">
                {(placeholder) => (
                  <input
                    placeholder={placeholder}
                    value={idDocumentNumber}
                    onChange={(e) => setIdDocumentNumber(e.target.value)}
                  />
                )}
              </FormattedMessage>
            </div>
          </div>
        </div>
      </>
    );
  };

  const transactionForm = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                <FormattedMessage id="agent.Amount" />{" "}
                <span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <input
                placeholder="Enter amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                <FormattedMessage id="agent.Reason" />{" "}
                <span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <textarea
                id="w3review"
                rows="4"
                cols="50"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
      </>
    );
  };

  const transactionDetails = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div className="containerBiaN_f_col width70percent">
              <h2>Transaction Detail</h2>
            </div>
          </div>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div className="containerBiaN_f_col width70percent">
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>
                  Sender Account
                </p>
                <p style={{ fontWeight: "bold" }}>{agentProfile.phoneNo}</p>
              </div>

              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>
                  Receiver Account
                </p>
                <p style={{ fontWeight: "bold" }}>{phoneNumber}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Amount</p>
                <p style={{ fontWeight: "bold" }}>
                  {parseFloat(amount) + " XAF"}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Fee</p>
                <p style={{ fontWeight: "bold" }}>
                  {parseFloat(feeDetailData.transactionFee) + " XAF"}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Total</p>
                <p style={{ fontWeight: "bold" }}>
                  {parseFloat(amount) +
                    parseFloat(feeDetailData.transactionFee) +
                    " XAF"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const agentOTPType = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <RadioGroup
            aria-label="Gender"
            value={selectedOtpType}
            onChange={(e) => {
              setSelectedOtpType(e.target.value);
            }}
          >
            {otpTypes.map((type) => {
              return (
                <FormControlLabel
                  value={type.value}
                  control={<Radio />}
                  label={type.name}
                />
              );
            })}
          </RadioGroup>
        </div>
      </>
    );
  };

  const customerOTP = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                Enter OTP <span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <OtpInput
                value={otp}
                shouldAutoFocus={true}
                onChange={(value) => setOtp(value)}
                numInputs={6}
                seperator={<span></span>}
                isInputNum={true}
                inputStyle={{
                  width: "50px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "20px",
                  padding: "15px 20px",
                  borderRadius: "5px",
                  border: "1px solid transparent",
                  color: "#00000",
                  background: "#F2F2F2",
                  display: "inline-block",
                  boxShadow: "0px 8px 8px rgba(37, 51, 66, 0.15)",
                }}
              />
            </div>
          </div>

          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div
              className="containerBiaN_f_col width70percent"
              style={{ padding: "0px 0px 0px 20px" }}
            >
              <div style={{ display: "flex" }}>
                {otpTimer !== 0 ? (
                  <p>Resend OTP in {otpTimer}</p>
                ) : (
                  <p>
                    Didn't receive OTP{" "}
                    <span
                      onClick={() => resendAgentOtp()}
                      style={{
                        color: "rgb(191 21 21)",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      resend
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const transactionSuccess = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div className="containerBiaN_f_col width70percent">
              <h2>Congratulations</h2>
              <p>Transaction was Successful</p>
            </div>
          </div>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div className="containerBiaN_f_col width70percent">
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>
                  Receiver Account
                </p>
                <p style={{ fontWeight: "bold" }}>{phoneNumber}</p>
              </div>
              {/* <div style={{ display: 'flex' }}>
                      <p style={{ marginRight: '16px', color:"gray"}}>Receiver Name</p>
                      <p style={{ fontWeight: 'bold' }}>{selectedBankAccount.owner}</p>
                    </div> */}
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Amount</p>
                <p style={{ fontWeight: "bold" }}>{amount}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Reason</p>
                <p style={{ fontWeight: "bold" }}>{reason}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <IntlProvider messages={messages.default} locale={language}>
      <div className="main_contain agentformCenter">
        <div className="merch_m_list_w">
          <div className="merch_list_card" id="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="kyccustomformheading">
                      <h1
                        className="list_top_heading textAlignCenter text-center"
                        style={{ paddingLeft: "0px" }}
                      >
                        {/* Wallet Cash Deposit */}
                        <FormattedMessage id="agent.WalletCashDeposit" />
                      </h1>
                    </div>
                  </div>
                  <div className="chartCardMiddle" style={{ padding: "24px" }}>
                    {(() => {
                      switch (step) {
                        case 1:
                          return walletVerificationForm();
                        case 2:
                          return transactionForm();
                        case 3:
                          return transactionDetails();
                        case 4:
                          return agentOTPType();
                        case 5:
                          return customerOTP();
                        case 6:
                          return transactionSuccess();
                        default:
                          return <div></div>;
                      }
                    })()}
                  </div>
                  <div style={{ width: "100%", float: "left" }}>
                    <div className="confirm_p_w mTB00 button-container rspacing">
                      {(step !== 1) & (step !== 6) ? (
                        <Button
                          className="blackbtn aryousureBTN confirmBtnR"
                          onClick={() => prevStep()}
                        >
                          Back
                        </Button>
                      ) : (
                        ""
                      )}
                      <Button
                        className="aryousureBTN confirmBtnR"
                        style={{ opacity: isFormValidated() ? "1" : "0.5" }}
                        disabled={isFormValidated() ? false : true}
                        onClick={() => formSubmitAction()}
                        loading={isLoading()}
                      >
                        {step === 5 ? (
                          "Submit"
                        ) : step === 6 ? (
                          "Done"
                        ) : (
                          <FormattedMessage id="agent.Next" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};

export default WalletCashDeposit;
