import React, { useState, useEffect } from "react";
import "../../css/ag-grid-customization01.css";

import "../page/Settings/General/formfromold.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Button, Select } from "antd";
import { useSelector } from "react-redux";
import { FormattedMessage, IntlProvider } from "react-intl";
import OtpInput from "react-otp-input";

const { Option } = Select;

const InterBankTransfer = () => {
  const [messages, setMessages] = useState("");
  const [language, setLanguage] = useState("");
  const [otp, setOtp] = useState("");
  const idDocumentTypes = [
    { name: "agent.IDCard", value: "ID_CARD" },
    { name: "agent.Passport", value: "PASSPORT" },
  ];
  const otpTypes = [
    { name: "Email", value: "EMAIL" },
    { name: "SMS", value: "SMS" },
  ];

  const [bankCustomerId, setBankCustomerId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedDocumentType, setSelectedDocumentType] = useState(
    idDocumentTypes[0].value
  );

  const [idDocumentNumber, setIdDocumentNumber] = useState("");

  const [bank, setBank] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");
  const [step, setStep] = useState(0);

  const lan = useSelector((state) => state.commonReducer.language);

  const loadLocalDatass = async () => {
    const messages = await loadLocaleData(localStorage.getItem("lang"));
    setMessages(messages);

    setLanguage(localStorage.getItem("lang"));
  };
  const loadLocalDatas2 = async () => {
    const messages = await loadLocaleData(lan);
    setMessages(messages);

    setLanguage(lan);
  };

  useEffect(() => {
    loadLocalDatass();
  }, []);
  useEffect(() => {
    loadLocalDatas2();
  }, [lan]);

  const loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../i18n/messages/fr");
      default:
        return import("../i18n/messages/en");
    }
  };

  const walletVerificationForm = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div
            className="containerBiaN_f_row"
            style={{ justifyContent: "center" }}
          >
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                <FormattedMessage id="agent.BankCustomerID" />{" "}
                <span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <FormattedMessage id="agent.EnterBankCustomerId">
                {(placeholder) => (
                  <input
                    placeholder={placeholder}
                    type="number"
                    value={bankCustomerId}
                    onChange={(e) => setBankCustomerId(e.target.value)}
                  />
                )}
              </FormattedMessage>
            </div>
          </div>
          <div
            className="containerBiaN_f_row"
            style={{ justifyContent: "center" }}
          >
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
          <div
            className="containerBiaN_f_row"
            style={{ justifyContent: "center" }}
          >
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
          <div
            className="containerBiaN_f_row"
            style={{ justifyContent: "center" }}
          >
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

  const [receiverBankBranch, setReceiverBankBranch] = useState("");
  const [receiverBankAccountNumber, setReceiverBankAccountNumber] =
    useState("");
  const [receiverBankKey, setReceiverBankKey] = useState("");
  const [currency, setCurrency] = useState("");

  const InterBankTransferForm = () => {
    return (
      <div className="containerBiaN_form">
        <div
          className="containerBiaN_f_row"
          style={{ justifyContent: "center" }}
        >
          <div className="containerBiaN_f_col width30percent textAlignRight">
            <label>
              Sender Bank Account <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col width70percent">
            <div className="categorySelect">
              <Select
                style={{ width: 100 + "%", height: 52 }}
                value={bank}
                onChange={(e) => setBank(e)}
              >
                <Option value="" disabled>
                  Select a Bank Account
                </Option>
              </Select>
            </div>
          </div>
        </div>

        <div
          className="containerBiaN_f_row"
          style={{ justifyContent: "center" }}
        >
          <div className="containerBiaN_f_col width30percent textAlignRight">
            <label>
              Receiver Bank <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col width70percent">
            <div className="categorySelect">
              <Select
                style={{ width: 100 + "%", height: 52 }}
                value={bank}
                onChange={(e) => setBank(e)}
              >
                <Option value="" disabled>
                  Select a Bank
                </Option>
              </Select>
            </div>
          </div>
        </div>

        <div
          className="containerBiaN_f_row"
          style={{ justifyContent: "center" }}
        >
          <div className="containerBiaN_f_col width30percent textAlignRight">
            <label>
              Receiver Bank Branch <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col width70percent">
            <div className="categorySelect">
              <Select
                style={{ width: 100 + "%", height: 52 }}
                value={receiverBankBranch}
                onChange={(e) => setReceiverBankBranch(e)}
              >
                <Option value="" disabled>
                  Select a Bank Branch
                </Option>
              </Select>
            </div>
          </div>
        </div>

        <div
          className="containerBiaN_f_row"
          style={{ justifyContent: "center" }}
        >
          <div className="containerBiaN_f_col width30percent textAlignRight">
            <label>
              Receiver Bank Account Number <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col width70percent">
            <input
              placeholder="Enter Receiver Bank Account Number"
              type="number"
              value={receiverBankAccountNumber}
              onChange={(e) => setReceiverBankAccountNumber(e.target.value)}
            />
          </div>
        </div>

        <div
          className="containerBiaN_f_row"
          style={{ justifyContent: "center" }}
        >
          <div className="containerBiaN_f_col width30percent textAlignRight">
            <label>
              Receiver Bank Key <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col width70percent">
            <input
              placeholder="Enter Receiver Bank Key"
              type="number"
              value={receiverBankKey}
              onChange={(e) => setReceiverBankKey(e.target.value)}
            />
          </div>
        </div>

        <div
          className="containerBiaN_f_row"
          style={{ justifyContent: "center" }}
        >
          <div className="containerBiaN_f_col width30percent textAlignRight">
            <label>
              Currency <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col width70percent">
            <div className="categorySelect">
              <Select
                style={{ width: 100 + "%", height: 52 }}
                value={currency}
                onChange={(e) => setCurrency(e)}
              >
                <Option value="" disabled>
                  Select a Currency
                </Option>
              </Select>
            </div>
          </div>
        </div>

        <div
          className="containerBiaN_f_row"
          style={{ justifyContent: "center" }}
        >
          <div className="containerBiaN_f_col width30percent textAlignRight">
            <label>
              Amount <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col width70percent">
            <input
              placeholder="Enter Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div
          className="containerBiaN_f_row"
          style={{ justifyContent: "center" }}
        >
          <div className="containerBiaN_f_col width30percent textAlignRight">
            <label>
              Reason <span className="mantdat">*</span>
            </label>
          </div>
          <div className="containerBiaN_f_col width70percent">
            <textarea
              placeholder="Enter Reason"
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const transactionDetails = () => {
    return (
      <>
        <div className="containerBiaN_form" style={{ width: "100%" }}>
          <div
            className="containerBiaN_f_row"
            style={{ justifyContent: "center" }}
          >
            <div className="containerBiaN_f_col width40percent textAlignRight"></div>
            <div className="containerBiaN_f_col width60percent">
              <h2>Transaction Detail</h2>
            </div>
          </div>
          <div
            className="containerBiaN_f_row"
            style={{ justifyContent: "center" }}
          >
            <div className="containerBiaN_f_col width30percent"></div>
            <div className="containerBiaN_f_col width70percent">
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>
                  Sender Bank Account
                </p>
                <p style={{ fontWeight: "bold" }}>
                  XXXX-XXXX-XXXXXXXXX-XXX-XXX
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>
                  Receiver Wallet ID
                </p>
                <p style={{ fontWeight: "bold" }}>XXXXXXX</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Amount</p>
                <p style={{ fontWeight: "bold" }}>XXXX</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Fee</p>
                <p style={{ fontWeight: "bold" }}>XX</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Total</p>
                <p style={{ fontWeight: "bold" }}>XXXXXX</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Reason</p>
                <p style={{ fontWeight: "bold" }}>
                  XXXXXXXXXXXXXXXXXXXXXXXXXXXX
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const customerOTP = () => {
    return (
      <>
        <div className="containerBiaN_form" style={{ width: "100%" }}>
          <div
            className="containerBiaN_f_row"
            style={{ justifyContent: "center" }}
          >
            <div className="containerBiaN_f_col textAlignRight">
              <label>
                Enter OTP <span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col textAlignRight">
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
          <div
            className="containerBiaN_f_row"
            style={{ justifyContent: "center" }}
          >
            <div
              className="containerBiaN_f_col"
              style={{ paddingLeft: "0px", paddingRight: "0px" }}
            ></div>
            <div
              className="containerBiaN_f_col"
              style={{ paddingLeft: "0px", paddingRight: "0px" }}
            >
              {/* Didn't Receive OTP ? */}
            </div>
            <div
              className="containerBiaN_f_col"
              style={{ paddingLeft: "5px", paddingRight: "0px" }}
            >
              <button
                style={{
                  border: "none",
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                }}
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  const transactionSuccess = () => {
    return (
      <>
        <div className="containerBiaN_form" style={{ width: "100%" }}>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div className="containerBiaN_f_col width70percent">
              <h2 style={{ color: "green" }}>Congratulations</h2>
              <p style={{ color: "green" }}>Transaction was Successful</p>
            </div>
          </div>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div className="containerBiaN_f_col width70percent">
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>
                  Receiver Account
                </p>
                <p style={{ fontWeight: "bold" }}>
                  XXXX-XXX-XXXXXXXXX-XXX
                  {/* {selectedBankAccount.accNo} */}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>
                  Receiver Name
                </p>
                <p style={{ fontWeight: "bold" }}>
                  XXXXXXXXXXXXXXXXXX
                  {/* {selectedBankAccount.owner} */}
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Amount</p>
                <p style={{ fontWeight: "bold" }}>XXXXXXXXXXXXXX</p>
              </div>
              <div style={{ display: "flex" }}>
                <p style={{ marginRight: "16px", color: "gray" }}>Reason</p>
                <p style={{ fontWeight: "bold" }}>XXXXXXXXXXXXX</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const stepChange = () => {
    if (step === 0) {
      setStep(1);
    } else if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      setStep(0);
    }
  };

  const prevStep = () => {
    if (step === 1) {
      setStep(0);
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const resendAgentOtp = () => {
    // setOtpTimer(resendTime);
    // sendAgentOTP();
  };

  const verifyCustomerSubmit = () => {
    var requestObj = {
      type: "BANK",
      bankCustomerId: bankCustomerId,
      phoneNumber: phoneNumber,
      idDocumentType: selectedDocumentType,
      idDocumentNumber: idDocumentNumber,
    };
    // dispatch(verifyCustomer(sessionStorage.getItem("token"), requestObj));
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
                        Inter Bank Transfer
                      </h1>
                    </div>
                  </div>
                  <div className="chartCardMiddle" style={{ padding: "24px" }}>
                    <>
                      {step === 0 && walletVerificationForm()}
                      {step === 1 && InterBankTransferForm()}
                      {step === 2 && transactionDetails()}
                      {step === 3 && customerOTP()}
                      {step === 4 && transactionSuccess()}
                    </>
                  </div>
                  <hr />
                  <div style={{ width: "100%", float: "left" }}>
                    <div className="confirm_p_w mTB00 button-container rspacing">
                      {step > 0 && step < 4 ? (
                        <>
                          <Button
                            className="blackbtn aryousureBTN confirmBtnR"
                            onClick={() => prevStep()}
                          >
                            Back
                          </Button>
                        </>
                      ) : (
                        <></>
                      )}
                      <Button
                        className="aryousureBTN confirmBtnR"
                        onClick={() => stepChange()}
                      >
                        {step === 4 ? "Done" : "Next"}
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

export default InterBankTransfer;
