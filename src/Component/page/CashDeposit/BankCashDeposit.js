import React, { useState } from 'react';
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
const { Option } = Select;

const BankCashDeposit = () => {
  
  const [step, setstep] = useState(1);
  const idDocumentTypes = [
    {name: "ID Card", value: "ID_CARD"},
    {name: "Passport", value: "PASSPORT"}
  ];
  const otpTypes = [
    {name: "Email", value: "EMAIL"},
    {name: "SMS", value: "SMS"}
  ];
  
  const [bankCustomerId, setBankCustomerId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState(idDocumentTypes[0].value);
  const [idDocumentNumber, setIdDocumentNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [selectedOtpType, setSelectedOtpType] = useState(otpTypes[0].value);
  const [otp, setOtp] = useState('');

  const stepOneValidated = () => {
    return !(validator.isEmpty(phoneNumber) || validator.isEmpty(selectedDocumentType) || validator.isEmpty(idDocumentNumber) || validator.isEmpty(bankCustomerId));
  };

  const stepTwoValidated = () => {
    return !validator.isEmpty(amount);
  };

  const stepThreeValidated = () => {
    return !validator.isEmpty(selectedOtpType);
  };

  const stepFourValidated = () => {
    return !(validator.isEmpty(otp) || otp.length !== 6);
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
      default:
        return false;
    }
  }

  const nextStep = () => {
    setstep(step + 1);
  };

  const prevStep = () => {
    setstep(step - 1);
  };

  const bankVerificationForm = () => {
    return (
      <>
        <div className="containerBiaN_form">
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label>Bank Customer ID <span className="mantdat">*</span></label>
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <input placeholder="Enter Bank Customer ID" type="number" value={bankCustomerId} onChange={(e) => setBankCustomerId(e.target.value)}/>
                </div>
            </div>
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label>Phone number <span className="mantdat">*</span></label>
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <input placeholder="Enter Phone number" type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                </div>
            </div>
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label>Document Type <span className="mantdat">*</span></label>
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
                    <label>ID Document Number <span className="mantdat">*</span></label>
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
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label>Amount <span className="mantdat">*</span></label>
                </div>
                <div className="containerBiaN_f_col width70percent">
                    <input placeholder="Enter amount"  type="number" value={amount} onChange={(e) => setAmount(e.target.value)}/>
                </div>
            </div>
            <div className="containerBiaN_f_row">
                <div className="containerBiaN_f_col width30percent textAlignRight">
                    <label>Reason <span className="mantdat">*</span></label>
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
           
        </div>
      </>
    );
  }

  return (
    <div className="main_contain agentformCenter">
      <div className="merch_m_list_w">
          <div className="merch_list_card" id="merch_list_card">
              <div className="section_custom">
                  <div className="sectionInn">
                      <div className="chartCard_w">
                          <div className="chartCardTop">
                              <div className="kyccustomformheading">
                                  <h1 className="list_top_heading textAlignCenter text-center" style={{paddingLeft:"0px"}}>
                                    Wallet Cash Deposit
                                  </h1>
                              </div>
                          </div>
                          <div className="chartCardMiddle" style={{ padding: "24px" }}>
                              {(() => {
                                switch(step) {
                                  case 1: return bankVerificationForm();
                                  case 2: return transactionDetails();
                                  case 3: return customerOTPType();
                                  case 4: return customerOTP();
                                  default: return <div></div>
                                }
                              })()}
                          </div>
                          <div style={{width: "100%", float: "left"}}>
                              <div className="confirm_p_w mTB00 button-container rspacing">
                                {step !== 1 ? <button className="blackbtn aryousureBTN confirmBtnR" onClick={() => prevStep()}>Back</button> : ''}
                                  <button 
                                    className="aryousureBTN confirmBtnR" 
                                    style={{ opacity: isFormValidated() ? '1' : '0.5' }}
                                    disabled={isFormValidated() ? false : true}
                                    onClick={() => nextStep()}
                                  >
                                      {step === 4 ? "Submit" : "Next"}
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
  );
};


 
export default BankCashDeposit;