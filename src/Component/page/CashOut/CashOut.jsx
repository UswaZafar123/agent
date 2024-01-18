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
import { Card } from "react-bootstrap";
import CircularProgress from "@material-ui/core/CircularProgress";
import actionType from "../../../services/agent/actionType.js";

import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import feeConstants from "../../../Assets/feeConstants";
import { FormattedMessage, IntlProvider } from "react-intl";

import {
  fetchAgentBankAccounts,
  sendOtpToAgent,
  walletCashOutFromBank,
  getFee,
} from "../../../services/agent/action.js";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    margin: "auto",
  },
});

const { Option } = Select;
const resendTime = 30;

const CashOut = () => {
  const classes = useStyles();
  const firstUpdate = useRef(true);
  const [step, setStep] = useState(1);
  const otpTypes = [
    { name: "Email", value: "EMAIL" },
    { name: "SMS", value: "SMS" },
  ];

  const [selectedBankAccount, setSelectedBankAccount] = useState({});
  const [amount, setAmount] = useState("");
  // const [reason, setReason] = useState("");
  const [fee, setFee] = useState("");
  const [feeId, setFeeId] = useState("");
  const [selectedOtpType, setSelectedOtpType] = useState(otpTypes[0].value);
  const [otpTimer, setOtpTimer] = React.useState(resendTime);
  const [otp, setOtp] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);

  const [messages, setMessages] = useState("");
  const [language, setLanguage] = useState("");

  const lan = useSelector((state) => state.commonReducer.language);

  const dispatch = useDispatch();
  const agentProfile = useSelector((state) => state.agentReducer.profile.data);

  const agentBankAccountsLoading = useSelector(
    (state) => state.agentReducer.bankAccounts.loading
  );
  const agentBankAccounts = useSelector(
    (state) => state.agentReducer.bankAccounts.list
  );

  const agentOtpLoading = useSelector(
    (state) => state.agentReducer.agentOtpSend.loading
  );
  const agentOtpSuccess = useSelector(
    (state) => state.agentReducer.agentOtpSend.success
  );

  const walletCashOutLoading = useSelector(
    (state) => state.agentReducer.agentWalletCashOut.loading
  );
  const walletCashOutSuccess = useSelector(
    (state) => state.agentReducer.agentWalletCashOut.success
  );

  const feeData = useSelector((state) => state.agentReducer.feeData);

  useEffect(() => {
    return () => {
      dispatch({
        type: actionType.AGENT_OTP_SEND_RESET,
      });
      dispatch({
        type: actionType.AGENT_WALLET_CASH_OUT_RESET,
      });
    };
  }, []);

  useEffect(() => {
    if (feeData !== null) {
      setFee(feeData.transactionFee);
      setFeeId(feeData.feeId);
    }
  }, [feeData]);

  useEffect(() => {
    if (agentBankAccounts.length === 0) {
      dispatch(
        fetchAgentBankAccounts(
          sessionStorage.getItem("token"),
          agentProfile.bankCustomerId
        )
      );
    } else {
      setSelectedBankAccount(agentBankAccounts[0]);
    }
  }, [agentBankAccounts]);

  React.useEffect(() => {
    if (step === 4) {
      if (otpTimer > 0) {
        setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      }
    }
  }, [otpTimer, step]);

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
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (step === 3 && agentOtpSuccess) {
      setOtpTimer(resendTime);
      setStep(4);
    }
    if (step === 4 && walletCashOutSuccess) {
      setStep(5);
    }
  }, [step, agentOtpSuccess, walletCashOutSuccess]);

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  const stepOneValidated = () => {
    return !(validator.isEmpty(amount) || !selectedBankAccount);
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
      walletCashOutLoading
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
    if (step === 1 && amount !== "") {
      calculateFees();
      setStep(step + 1);
    } else if (step === 2) {
      console.log(fee, "FEE");
      setStep(step + 1);
    } else if (step === 3) {
      sendAgentOtp();
    } else if (step === 4) {
      sendCashOutRequest();
    } else {
      resetForm();
      setStep(1);
    }
  };

  const prevStep = () => {
    if (step === 4) {
      dispatch({
        type: actionType.AGENT_OTP_SEND_RESET,
      });
    }
    setStep(step - 1);
  };

  const resetForm = () => {
    dispatch({
      type: actionType.AGENT_OTP_SEND_RESET,
    });
    dispatch({
      type: actionType.AGENT_WALLET_CASH_OUT_RESET,
    });
    setAmount("");
    setOtp("");
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

  const sendCashOutRequest = () => {
    var requestObj = {
      bankCustomerId: agentProfile.bankCustomerId,
      toAccountNumber: selectedBankAccount.accNo,
      amount: parseFloat(amount),
      reason: "Wallet Cash Out",
      mfaToken: otp,
      currencyName: "XAF",
      fee: fee,
      feeId: feeId,
      type: "CASH_OUT",
    };
    dispatch(walletCashOutFromBank(requestObj));
  };

  const calculateFees = () => {
    let subscriptionID = feeConstants.getAgentSubscriptionId(
      agentProfile.status
    );
    console.log(subscriptionID, "SUBSCRIPTION ID");

    var requestObj = {
      paymentMethodId: feeConstants.constants.CASHOUT_AGENT,
      subscriptionPlanId: subscriptionID,
      currencyCode: "XAF",
      transactionAmount: amount,
    };
    dispatch(getFee(requestObj));
  };

  const bankCashOutForm = () => {
    return (
      <>
        <div>
          <div
            style={{ display: "flex", overflowX: "auto", whiteSpace: "nowrap" }}
          >
            {agentBankAccountsLoading ? (
              <CircularProgress
                style={{ margin: "auto", color: "rgb(191 21 21)" }}
              />
            ) : agentBankAccounts.length == 0 ? (
              <p>Bank Accounts not available</p>
            ) : (
              agentBankAccounts.map((bankAccount) => {
                return (
                  <div
                    onClick={() => setSelectedBankAccount(bankAccount)}
                    style={{
                      float: "left",
                      minWidth: "unset",
                      margin: "4px 4px",
                      cursor: "pointer",
                      borderRadius: "8px",
                      border:
                        selectedBankAccount.accNo === bankAccount.accNo
                          ? "2px solid rgb(191 21 21)"
                          : "2px solid gray",
                    }}
                  >
                    <Card.Body style={{ padding: "0.5rem" }}>
                      <Card.Title>{bankAccount.accNo}</Card.Title>
                      <Card.Text>{bankAccount.owner}</Card.Text>
                    </Card.Body>
                  </div>
                );
              })
            )}
          </div>
          <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
            <label>
              Amount <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
            <input
              placeholder="Enter amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {/* <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
            <label>
              Reason <span className="mantdat">*</span>
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
          </div> */}
        </div>
      </>
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
                <p style={{ fontWeight: "bold" }}>
                  {selectedBankAccount.accNo}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Fee</p>
                <p style={{ fontWeight: "bold" }}>{`${fee} XAF`}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>
                  Transfer Amount
                </p>
                <p style={{ fontWeight: "bold" }}>{`${amount} XAF`}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>
                  Total Amount
                </p>
                <p style={{ fontWeight: "bold" }}>
                  {parseFloat(amount) + parseFloat(fee) + " XAF"}
                </p>
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
                <p style={{ fontWeight: "bold" }}>
                  {selectedBankAccount.accNo}
                </p>
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
                        <FormattedMessage id="agent.WalletCashOut" />
                      </h1>
                    </div>
                  </div>
                  <div className="chartCardMiddle" style={{ padding: "24px" }}>
                    <div
                      className={classes.root}
                      style={{ width: "70%", margin: "auto" }}
                    >
                      {step === 1 && (
                        <AppBar
                          position="static"
                          style={{ backgroundColor: "rgb(52 58 64 / 100%)" }}
                        >
                          <Tabs
                            variant="fullWidth"
                            value={selectedTab}
                            onChange={handleTabChange}
                          >
                            <Tab
                              label={
                                <FormattedMessage id="agent.Credit/DebitCard" />
                              }
                            />
                            {agentProfile.registrationType ===
                              "EXISTING_BANK_CUSTOMER" && (
                              <Tab
                                label={
                                  <FormattedMessage id="agent.BankAccount" />
                                }
                              />
                            )}
                          </Tabs>
                        </AppBar>
                      )}

                      {selectedTab === 0 && (
                        <TabContainer>
                          <div>
                            <p>
                              <FormattedMessage id="agent.Thisfeaturewillbeavailablesoon" />
                            </p>
                          </div>
                        </TabContainer>
                      )}

                      {agentProfile.registrationType ===
                        "EXISTING_BANK_CUSTOMER" &&
                        selectedTab === 1 && (
                          <div style={{ margin: "16px 0px" }}>
                            {(() => {
                              switch (step) {
                                case 1:
                                  return bankCashOutForm();
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
                                  style={{
                                    opacity: isFormValidated() ? "1" : "0.5",
                                  }}
                                  disabled={isFormValidated() ? false : true}
                                  onClick={() => formSubmitAction()}
                                >
                                  {step === 4
                                    ? "Submit"
                                    : step === 5
                                    ? "Done"
                                    : "Next"}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
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

export default CashOut;
