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
import { Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import actionType from "../../../services/agent/actionType.js";

import feeConstants from "../../../Assets/feeConstants";
import { FormattedMessage, IntlProvider } from 'react-intl';

import {
  fetchFeeDetail,
  sendOtpToAgent,
  agentSendMoneyAction,
} from "../../../services/agent/action.js";

const { Option } = Select;
const resendTime = 30;

const AgentSendMoney = () => {
  const firstUpdate = useRef(true);
  const [step, setStep] = useState(1);
  const otpTypes = [
    { name: "Email", value: "EMAIL" },
    { name: "SMS", value: "SMS" },
  ];

  const [agentId, setAgentId] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [selectedOtpType, setSelectedOtpType] = useState(otpTypes[0].value);
  const [otpTimer, setOtpTimer] = React.useState(resendTime);
  const [otp, setOtp] = useState("");

  const [messages, setMessages] = useState("");
  const [language, setLanguage] = useState("");

  const lan = useSelector(state => state.commonReducer.language);

  const dispatch = useDispatch();
  const agentProfile = useSelector((state) => state.agentReducer.profile.data);
  const feeDetailLoading = useSelector(
    (state) => state.agentReducer.feeDetail.loading
  );
  const feeDetail = useSelector((state) => state.agentReducer.feeDetail.data);

  const agentOtpLoading = useSelector(
    (state) => state.agentReducer.agentOtpSend.loading
  );
  const agentOtpSuccess = useSelector(
    (state) => state.agentReducer.agentOtpSend.success
  );
  const agentSendMoneyLoading = useSelector(
    (state) => state.agentReducer.agentSendMoney.loading
  );
  const agentSendMoneySuccess = useSelector(
    (state) => state.agentReducer.agentSendMoney.success
  );

  useEffect(() => {
    return () => {
      dispatch({
        type: actionType.FEE_DETAIL_RESET,
      });
      dispatch({
        type: actionType.AGENT_OTP_SEND_RESET,
      });
      dispatch({
        type: actionType.AGENT_SEND_MONEY_RESET,
      });
    };
  }, []);

  React.useEffect(() => {
    if (step === 4) {
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
    if (step === 1 && Object.keys(feeDetail).length) {
      setStep(2);
    }
    if (step === 3 && agentOtpSuccess) {
      setOtpTimer(resendTime);
      setStep(4);
    }
    if (step === 4 && agentSendMoneySuccess) {
      setStep(5);
    }
  }, [step, feeDetail, agentOtpSuccess, agentSendMoneySuccess]);

  useEffect(async () => {

    const messages = await loadLocaleData(localStorage.getItem("lang"));
    setMessages(messages);

    setLanguage(localStorage.getItem("lang"));

    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");

  }, [])

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

  }, [lan])

  const stepOneValidated = () => {
    return !(
      validator.isEmpty(amount) ||
      validator.isEmpty(agentId) ||
      feeDetailLoading
    );
  };

  const stepTwoValidated = () => {
    return true;
  };

  const stepThreeValidated = () => {
    return !(validator.isEmpty(selectedOtpType) || agentOtpLoading);
  };

  const stepFourValidated = () => {
    return !(
      validator.isEmpty(otp) ||
      otp.length !== 6 ||
      agentSendMoneyLoading
    );
  };

  const isFormValidated = () => {
    switch (step) {
      case 1:
        return stepOneValidated();
      case 2:
        return stepTwoValidated();
      case 3:
        return stepThreeValidated();
      case 4:
        return stepFourValidated();
      case 5:
        return true;
      default:
        return false;
    }
  };

  const formSubmitAction = () => {
    if (step === 1) {
      getFeeDetail();
    } else if (step === 2) {
      setStep(step + 1);
    } else if (step === 3) {
      sendAgentOtp();
    } else if (step === 4) {
      processSendMoney();
    } else {
      resetForm();
      setStep(1);
    }
  };

  const prevStep = () => {
    if (step === 2) {
      dispatch({
        type: actionType.FEE_DETAIL_RESET,
      });
    }
    if (step === 4) {
      dispatch({
        type: actionType.AGENT_OTP_SEND_RESET,
      });
    }
    setStep(step - 1);
  };

  const resetForm = () => {
    dispatch({
      type: actionType.FEE_DETAIL_RESET,
    });
    dispatch({
      type: actionType.AGENT_OTP_SEND_RESET,
    });
    dispatch({
      type: actionType.AGENT_SEND_MONEY_RESET,
    });
    setAmount("");
    setOtp("");
  };

  const getFeeDetail = () => {
    var subscriptionId = feeConstants.getAgentSubscriptionId(
      agentProfile.status
    );
    var requestObj = {
      paymentMethodId:
        feeConstants.constants.WALLET_TO_WALLET_TRANSFER_METHOD_ID,
      subscriptionPlanId: subscriptionId,
      currencyCode: "XAF",
      transactionAmount: amount,
    };
    dispatch(fetchFeeDetail(requestObj));
  };

  const sendAgentOtp = () => {
    var requestObj = {
      customerType: "AGENT",
      mfaChannel: selectedOtpType,
    };
    dispatch(sendOtpToAgent(sessionStorage.getItem("token"), requestObj));
  };

  const resendAgentOtp = () => {
    setOtpTimer(resendTime);
    sendAgentOtp();
  };

  const processSendMoney = () => {
    var requestObj = {
      debtorUserType: "AGENT",
      debtorUserId: agentProfile.phoneNo,
      currencyName: "XAF",
      amount: amount,
      reason: reason,
      creditorUserType: "AGENT",
      creditorUserId: agentId,
      fee: feeDetail.transactionFee,
      feeId: feeDetail.feeId,
      type: "WALLET_TRANSFER",
      mfaToken: otp,
    };
    dispatch(agentSendMoneyAction(requestObj));
  };

  const sendMoneyForm = () => {
    return (
      <IntlProvider
      messages={messages.default}
      locale={language}
    >
      <>
        <div>
          <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
            <label>
              <FormattedMessage id="agent.AgentID" /> <span style={{ fontSize: "13px" }}><FormattedMessage id="agent.(withoutcountrycode)" /></span>{" "}
              <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
            <FormattedMessage id="agent.AgentID">
              {placeholder => 
            <input
              placeholder={placeholder}
              type="number"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value)}
            />}
            </FormattedMessage>
          </div>
        </div>
        <div>
          <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
            <label>
            <FormattedMessage id="agent.Amount" /> <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
          <FormattedMessage id="agent.EnterAmount">
            {placeholder =>
            <input
              placeholder={placeholder}
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />}
            </FormattedMessage>
          </div>
        </div>
        <div>
          <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
            <label>
            <FormattedMessage id="agent.Reason" /> <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
            <textarea
              id="w3review"
              rows="4"
              cols="50"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
        </div>
      </>
      </IntlProvider>
    );
  };

  const transactionDetails = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col">
              <h2>Transaction Detail</h2>
            </div>
          </div>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col">
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
                <p style={{ fontWeight: "bold" }}>{agentId}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Amount</p>
                <p style={{ fontWeight: "bold" }}>{`${amount} XAF`}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const agentOtpType = () => {
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

  const agentOtp = () => {
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
            <div className="containerBiaN_f_col">
              <h2>Congratulations</h2>
              <p>Transaction was Successful</p>
            </div>
          </div>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col">
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
                <p style={{ fontWeight: "bold" }}>{agentId}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Amount</p>
                <p style={{ fontWeight: "bold" }}>{`${amount} XAF`}</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <IntlProvider
    messages={messages.default}
    locale={language}
  >
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
                      <FormattedMessage id="agent.SendMoneytoAgentWallet" />
                    </h1>
                  </div>
                </div>
                <div className="chartCardMiddle" style={{ padding: "24px" }}>
                  <div
                    // className={classes.root}
                    style={{ width: "60%", margin: "auto" }}
                  >
                    <div style={{ margin: "16px 0px" }}>
                      {(() => {
                        switch (step) {
                          case 1:
                            return sendMoneyForm();
                          case 2:
                            return transactionDetails();
                          case 3:
                            return agentOtpType();
                          case 4:
                            return agentOtp();
                          case 5:
                            return transactionSuccess();
                          default:
                            return <div></div>;
                        }
                      })()}
                      <div>
                        <div className="confirm_p_w button-container rspacing">
                          {(step !== 1) & (step !== 5) ? (
                            <button
                              className="blackbtn aryousureBTN confirmBtnR"
                              onClick={() => prevStep()}
                            >
                              Back
                            </button>
                          ) : (
                            ""
                          )}
                          <button
                            className="aryousureBTN confirmBtnR"
                            style={{ opacity: isFormValidated() ? "1" : "0.5" }}
                            disabled={isFormValidated() ? false : true}
                            onClick={() => formSubmitAction()}
                          >
                            {step === 4
                              ? "Submit"
                              : step === 5
                                ? "Done"
                                : <FormattedMessage id="agent.Next" />}
                          </button>
                        </div>
                      </div>
                    </div>
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

export default AgentSendMoney;
