import React, { useState } from 'react';
import '../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import '../Settings/General/formfromold.css'
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import validator from "validator";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import OtpInput from "react-otp-input";


const WalletCashDeposit = () => {

  const [step, setstep] = useState(1);

  
  //state for form data
  const [formData, setFormData] = useState({
    phoneNumber: "",
    idDocumentType: "",
    idDocumentNumber: "",
    amount: "",
    reason: "",
    otp: "",
  })

  const [error, setError] = useState(false);

  //function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

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
                                  case 1: return walletVerificationForm();
                                  case 2: return transactionDetails();
                                  case 3: return customerOTPType();
                                  case 4: return customerOTP();
                                  default: return <div></div>
                                }
                              })()}
                          </div>
                          <div style={{width: "100%", float: "left"}}>
                              <div className="confirm_p_w mTB00 button-container rspacing">
                                {step != 1 ? <button className="blackbtn aryousureBTN confirmBtnR" onClick={() => prevStep()}>Back</button> : ''}
                                  <button className="aryousureBTN confirmBtnR" onClick={() => nextStep()}>{step == 4 ? "Submit" : "Next"}</button>
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

const walletVerificationForm = () => {
  return (
    <>
      <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
              <div className="containerBiaN_f_col width30percent textAlignRight">
                  <label>Phone number <span className="mantdat">*</span></label>
              </div>
              <div className="containerBiaN_f_col width70percent">
                  <input placeholder="Enter Phone number" />
              </div>
          </div>
          <div className="containerBiaN_f_row">
              <div className="containerBiaN_f_col width30percent textAlignRight">
                  <label>Transaction code <span className="mantdat">*</span></label>
              </div>
              <div className="containerBiaN_f_col width70percent">
                  <input placeholder="Enter Transaction code" />
              </div>
          </div>
          <div className="containerBiaN_f_row">
              <div className="containerBiaN_f_col width30percent textAlignRight">
                  <label>ID Document Number <span className="mantdat">*</span></label>
              </div>
              <div className="containerBiaN_f_col width70percent">
                  <input placeholder="Enter ID document number" />
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
                  <input placeholder="Enter amount"  type="number" />
              </div>
          </div>
          <div className="containerBiaN_f_row">
              <div className="containerBiaN_f_col width30percent textAlignRight">
                  <label>Reason <span className="mantdat">*</span></label>
              </div>
              <div className="containerBiaN_f_col width70percent">
                  <input placeholder="Enter Reason" />
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
            name="gender1"
            // className={classes.group}
            // value={this.state.value}
            // onChange={this.handleChange}
          >
            <FormControlLabel value="email" control={<Radio />} label="Email" />
            <FormControlLabel value="sms" control={<Radio />} label="SMS" />
            </RadioGroup>
      </div>
    </>
  );
}

const customerOTP = () => {
  return (
    <>
      <div className="containerBiaN_form">
          <div className="containerBiaN_f_row" style={{ justifyContent: 'center' }}>
          <OtpInput
              // value={otp}
              shouldAutoFocus={true}
              // onChange={(e) => setOtp(e)}
              numInputs={6}
              seperator={<span></span>}
              isInputNum={true}
              inputStyle={{
                  width: "50px",
                  padding: "0px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  fontWeight: '600',
                  fontSize: '16px',
                  lineHeight: '20px',
                  padding: '15px 20px',
                  borderRadius: '5px',
                  border: '1px solid transparent',
                  color: '#DA4139',
                  background: '#F2F2F2',
                  display: 'inline-block',
                  boxShadow: "0px 8px 8px rgba(37, 51, 66, 0.15)"
              }}
          />
          </div>
         
      </div>
    </>
  );
}
 
export default WalletCashDeposit;