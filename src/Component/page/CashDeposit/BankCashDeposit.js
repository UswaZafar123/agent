import React, { useState, useEffect, useRef } from 'react';
import '../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import '../Settings/General/formfromold.css'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import validator from "validator";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import OtpInput from "react-otp-input";
import { Select } from 'antd';
import { useSelector, useDispatch } from 'react-redux'
import { Card } from 'react-bootstrap';
import CircularProgress from '@material-ui/core/CircularProgress';
import actionType from "../../../services/agent/actionType.js";
import { FormattedMessage, IntlProvider } from 'react-intl';

import { verifyCustomer, fetchCustomerBankAccounts , sendOtpToCustomer, initiateBankCashDeposit } from "../../../services/agent/action.js";

const { Option } = Select;
const resendTime = 30;

const BankCashDeposit = () => {
  
  const firstUpdate = useRef(true);
  const [step, setStep] = useState(1);
  const idDocumentTypes = [
    {name: "ID Card", value: "ID_CARD"},
    {name: "Passport", value: "PASSPORT"}
  ];
  const otpTypes = [
    {name: "Email", value: "EMAIL"},
    {name: "SMS", value: "SMS"}
  ];

  const [messages, setMessages] = useState("");
  const [language, setLanguage] = useState("");

  const lan = useSelector(state => state.commonReducer.language)
  
  const [bankCustomerId, setBankCustomerId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState(idDocumentTypes[0].value);
  const [idDocumentNumber, setIdDocumentNumber] = useState('');
  const [selectedBankAccount, setSelectedBankAccount] = useState({});
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [selectedOtpType, setSelectedOtpType] = useState(otpTypes[0].value);
  const [otpTimer, setOtpTimer] = React.useState(resendTime);
  const [otp, setOtp] = useState('');

  const dispatch = useDispatch();
  const loadingCustomerValidation = useSelector(state => state.agentReducer.customerValidation.loading);
  const customerSuccess = useSelector(state => state.agentReducer.customerValidation.success);
  const loadingCustomerOtp = useSelector(state => state.agentReducer.customerOtpSend.loading);
  const customerOtpSuccess = useSelector(state => state.agentReducer.customerOtpSend.success);
  const loadingCustomerBankAccounts = useSelector(state => state.agentReducer.customerBankAccounts.loading);
  const customerBankAccounts = useSelector(state => state.agentReducer.customerBankAccounts.list);
  const loadingCustomerCashDeposit = useSelector(state => state.agentReducer.customerBankCashDeposit.loading);
  const customerCashDepositSuccess = useSelector(state => state.agentReducer.customerBankCashDeposit.success);

  useEffect(() => {
   return () => {
    dispatch({
      type: actionType.CUSTOMER_VALIDATION_RESET,
    });
    dispatch({
      type: actionType.CUSTOMER_BANK_ACCOUNTS_RESET,
    });
    dispatch({
      type: actionType.CUSTOMER_OTP_SEND_RESET,
    });
    dispatch({
      type: actionType.CUSTOMER_BANK_CASH_DEPOSIT_RESET,
    });
   }
  }, []);

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

  useEffect(() => {
    if(customerBankAccounts) {
      setSelectedBankAccount(customerBankAccounts[0]);
    }
  }, [customerBankAccounts]);

  React.useEffect(() => {
    if(step === 4) {
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
    if(step === 1 && customerSuccess && Object.keys(customerBankAccounts).length) {
      setStep(2);
    }
    if(step === 3 && customerOtpSuccess) {
      setStep(4);
    }
    if(step === 4 && customerCashDepositSuccess) {
      setStep(5)
    }
  }, [step, customerSuccess, customerBankAccounts, customerOtpSuccess, customerCashDepositSuccess, selectedBankAccount]);

  const stepOneValidated = () => {
    return !(validator.isEmpty(phoneNumber) || validator.isEmpty(selectedDocumentType) || validator.isEmpty(idDocumentNumber) || validator.isEmpty(bankCustomerId) || loadingCustomerValidation || loadingCustomerBankAccounts);
  };

  const stepTwoValidated = () => {
    return !(validator.isEmpty(amount) || !selectedBankAccount) ;
  };

  const stepThreeValidated = () => {
    return !(validator.isEmpty(selectedOtpType) || loadingCustomerOtp);
  };

  const stepFourValidated = () => {
    return !(validator.isEmpty(otp) || otp.length !== 6 || loadingCustomerCashDeposit);
  };


  const isFormValidated = () => {
    switch(step) {
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
  }

  const formSubmitAction = () => {
    if(step === 1) {
      verifyCustomerSubmit();
      fetchCustomerAccounts();
    } else if(step === 2) {
      setStep(step + 1);

    } else if(step === 3) {
      sendCustomerOTP();
    } else if(step === 4 )  {
      sendDepositRequest();
    } else {
      resetForm();
      setStep(1);
    }
  };

  const prevStep = () => {
    if(step === 2) {
      dispatch({
        type: actionType.CUSTOMER_VALIDATION_RESET,
      });
      dispatch({
        type: actionType.CUSTOMER_BANK_ACCOUNTS_RESET,
      });
    }
    if(step === 4) {
      dispatch({
        type: actionType.CUSTOMER_OTP_SEND_RESET,
      });
    }
    setStep(step - 1);
  };

  const resetForm = () => {
    dispatch({
      type: actionType.CUSTOMER_VALIDATION_RESET,
    });
    dispatch({
      type: actionType.CUSTOMER_BANK_ACCOUNTS_RESET,
    });
    dispatch({
      type: actionType.CUSTOMER_OTP_SEND_RESET,
    });
    dispatch({
      type: actionType.CUSTOMER_BANK_CASH_DEPOSIT_RESET,
    });
    setBankCustomerId('');
    setPhoneNumber('');
    setIdDocumentNumber('');
    setAmount('');
    setReason('');
    setOtp('');
  }
  
  const verifyCustomerSubmit = () => {
    var requestObj = {
      "type": "BANK",
      "bankCustomerId": bankCustomerId,
      "phoneNumber": phoneNumber,
      "idDocumentType": selectedDocumentType,
      "idDocumentNumber": idDocumentNumber
    };
    dispatch(verifyCustomer(sessionStorage.getItem("token"), requestObj));
  }

  const fetchCustomerAccounts = () => {
    dispatch(fetchCustomerBankAccounts(sessionStorage.getItem("token"), bankCustomerId));
  }
  const sendCustomerOTP = () => {
    var requestObj = {
      "customerId": bankCustomerId,
      "customerType": "BANK",
      "mfaChannel" : selectedOtpType
    };
    dispatch(sendOtpToCustomer(sessionStorage.getItem("token"), requestObj));
  }

  const resendCustomerOtp = () => {
    setOtpTimer(resendTime);
    sendCustomerOTP();
  }

  const sendDepositRequest = () => {
    var requestObj = {
      "bankCustomerId": bankCustomerId,
      "toAccountNumber": selectedBankAccount.accNo,
      "amount": amount,
      "reason": reason,
      "mfaToken": otp,
      "currencyName": 'xaf',
      // "fee": transactionFee.value,
      // "feeId": feeId.value,
      "type": "CASH_OUT"
    };
    dispatch(initiateBankCashDeposit(sessionStorage.getItem("token"), requestObj));
  }

  const walletVerificationForm = () => {
    return (
      <>
        <div className="containerBiaN_form">
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label><FormattedMessage id="agent.BankCustomerID" /> <span className="mantdat">*</span></label>
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <input placeholder="Enter Bank Customer Id" type="number" value={bankCustomerId} onChange={(e) => setBankCustomerId(e.target.value)}/>
                </div>
            </div>
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label><FormattedMessage id="agent.phonenumber" /> <span className="mantdat">*</span></label>
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <input placeholder="Enter Phone number" type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
            </div>
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label><FormattedMessage id="agent.DocumentType" /> <span className="mantdat">*</span></label>
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <div className="categorySelect" >
                    <Select
                      style={{ width: 100 + "%", height: 52 }} value={selectedDocumentType} onChange={(value) => setSelectedDocumentType(value)}>
                      {idDocumentTypes.map((type) => {
                        return <Option value={type.value}>{type.name}</Option>
                      })}
                    </Select>
                </div>
                </div>
            </div>
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label><FormattedMessage id="agent.IDDocumentNumber" /> <span className="mantdat">*</span></label>
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <input placeholder="Enter ID document number" value={idDocumentNumber} onChange={(e) => setIdDocumentNumber(e.target.value)}/>
                </div>
            </div>
        </div>
      </>
    );
  }
  
  const transactionDetails = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
              <div className="containerBiaN_f_col width70percent">
                  <div style={{ display: 'flex', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                    
                    {loadingCustomerBankAccounts ? <CircularProgress style={{ margin: 'auto', color: 'rgb(191 21 21)' }}/> : customerBankAccounts.map((bankAccount) => {
                      return <Card onClick={() => setSelectedBankAccount(bankAccount)} style={{ width: '50%', float: 'left', minWidth: 'unset', margin: '4px 4px', cursor: 'pointer', border: selectedBankAccount.accNo === bankAccount.accNo ? '2px solid rgb(191 21 21)': '' }}>
                            <Card.Body style={{ padding: '0.5rem' }}>
                              <Card.Title>{bankAccount.accNo}</Card.Title>
                              <Card.Text>
                                {bankAccount.owner}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                    })}
                  </div>
              </div>
            </div>
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label><FormattedMessage id="agent.Amount" /> <span className="mantdat">*</span></label>
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <input placeholder="Enter amount"  type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
            </div>
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label><FormattedMessage id="agent.Reason" /> <span className="mantdat">*</span></label>
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <textarea id="w3review" rows="4" cols="50" value={reason} onChange={(e) => setReason(e.target.value)}></textarea>
                </div>
            </div>
        </div>
      </>
    );
  }
  
  const customerOTPType = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <RadioGroup
              aria-label="Gender"
              value={selectedOtpType}
              onChange={(e) => {setSelectedOtpType(e.target.value)}}
            >
              {otpTypes.map((type) => {
                return <FormControlLabel value={type.value} control={<Radio />} label={type.name} />
              })}
              </RadioGroup>
        </div>
      </>
    );
  }
  
  const customerOTP = () => {
    return (
      <>
        <div className="containerBiaN_form">
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label>Enter OTP <span className="mantdat">*</span></label>
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
                      fontWeight: '600',
                      fontSize: '16px',
                      lineHeight: '20px',
                      padding: '15px 20px',
                      borderRadius: '5px',
                      border: '1px solid transparent',
                      color: '#00000',
                      background: '#F2F2F2',
                      display: 'inline-block',
                      boxShadow: "0px 8px 8px rgba(37, 51, 66, 0.15)"
                  }}
                />
                </div>
            </div>
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                </div>
                <div className="containerBiaN_f_col width70percent" style={{padding: '0px 0px 0px 20px'}}>
                    <div style={{ display: 'flex' }}>
                      {otpTimer !== 0 ? <p>Resend OTP in {otpTimer}</p> : <p>Didn't receive OTP <span onClick={() => resendCustomerOtp()} style={{ color: 'rgb(191 21 21)', cursor: 'pointer', textDecoration: 'underline' }}>resend</span></p>}
                      
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }

  const transactionSuccess = () => {
    return (
      <>
        <div className="containerBiaN_form">
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <h2>Congratulations</h2>
                    <p>Transaction was Successful</p>
                </div>
            </div>
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <div style={{ display: 'flex' }}>
                      <p style={{ marginRight: '16px', color:"gray" }}>Receiver Account</p>
                      <p style={{ fontWeight: 'bold' }}>{selectedBankAccount.accNo}</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p style={{ marginRight: '16px', color:"gray"}}>Receiver Name</p>
                      <p style={{ fontWeight: 'bold' }}>{selectedBankAccount.owner}</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p style={{ marginRight: '16px', color:"gray" }}>Amount</p>
                      <p style={{ fontWeight: 'bold' }}>{amount}</p>
                    </div>
                    <div style={{ display: 'flex' }}>
                      <p style={{ marginRight: '16px', color:"gray" }}>Reason</p>
                      <p style={{ fontWeight: 'bold' }}>{reason}</p>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
  }

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
                                  <h1 className="list_top_heading textAlignCenter text-center" style={{paddingLeft:"0px"}}>
                                    <FormattedMessage id="agent.BankCashDeposit" />
                                  </h1>
                              </div>
                          </div>
                          <div className="chartCardMiddle" style={{ padding: "24px" }}>
                              {(() => {
                                switch(step) {
                                  case 1: return walletVerificationForm();
                                  case 2: return transactionDetails();
                                  case 3: return customerOTPType();
                                  case 4: return customerOTP();
                                  case 5: return transactionSuccess();
                                  default: return <div></div>
                                }
                              })()}
                          </div>
                          <div style={{width: "100%", float: "left"}}>
                              <div className="confirm_p_w mTB00 button-container rspacing">
                                {step !== 1 & step !== 5 ? <button className="blackbtn aryousureBTN confirmBtnR" onClick={() => prevStep()}>Back</button> : ''}
                                  <button 
                                    className="aryousureBTN confirmBtnR" 
                                    style={{ opacity: isFormValidated() ? '1' : '0.5' }}
                                    disabled={isFormValidated() ? false : true}
                                    onClick={() => formSubmitAction()}
                                  >
                                      {step === 4 ? "Submit" : step === 5 ? "Done" : "Next"}
                                  </button>
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
 
export default BankCashDeposit;