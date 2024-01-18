import React, { useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";

import {
  fetchAgentProfile,
  sendOtpToAgent,
  validateSuperAgent,
} from "../../../services/agent/action";
import actionType from "../../../services/agent/actionType";

const resendTime = 30;
const ValidateBankCustomerId = () => {
  const otpTypes = [
    { name: "Email", value: "EMAIL" },
    { name: "SMS", value: "SMS" },
  ];

  const [step, setStep] = useState(1);

  const [bankCustomerId, setBankCustomerId] = useState("");
  const [selectedOtpType, setSelectedOtpType] = useState(otpTypes[0].value);
  const [otpTimer, setOtpTimer] = React.useState(resendTime);
  const [otp, setOtp] = useState("");

  const dispatch = useDispatch();
  const agentProfile = useSelector((state) => state.agentReducer.profile.data);
  const agentOtpSendLoading = useSelector(
    (state) => state.agentReducer.agentOtpSend.loading
  );
  const agentOtpSendSuccess = useSelector(
    (state) => state.agentReducer.agentOtpSend.success
  );
  const validateSuperAgentLoading = useSelector(
    (state) => state.agentReducer.validateSuperAgent.loading
  );
  const validateSuperAgentSuccess = useSelector(
    (state) => state.agentReducer.validateSuperAgent.success
  );

  React.useEffect(() => {
    if (!agentProfile) {
      dispatch(fetchAgentProfile(sessionStorage.getItem("token")));
    }
  }, [agentProfile, dispatch]);

  React.useEffect(() => {
    if (step === 3) {
      if (otpTimer > 0) {
        setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      }
    }
  }, [otpTimer, step]);

  React.useEffect(() => {
    if (step === 2 && agentOtpSendSuccess) {
      setStep(step + 1);
    } else if (validateSuperAgentSuccess && step === 3) {
      setStep(step + 1);
    }
  }, [step, agentOtpSendSuccess, validateSuperAgentSuccess]);

  const stepOneValidated = () => {
    return !validator.isEmpty(bankCustomerId);
  };

  const stepTwoValidated = () => {
    return !(validator.isEmpty(selectedOtpType) || agentOtpSendLoading);
  };

  const stepThreeValidated = () => {
    return !(
      validator.isEmpty(otp) ||
      otp.length !== 6 ||
      validateSuperAgentLoading
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
        return true;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (step === 1) {
      setStep(step + 1);
    } else if (step === 2) {
      sendAgentOtp();
    } else if (step === 3) {
      validateAgent();
    } else {
      resetForm();
      setStep(1);
      dispatch({
        type: actionType.AGENT_OTP_SEND_RESET,
      });
      dispatch({
        type: actionType.VALIDATE_SUPER_AGENT_RESET,
      });
    }
  };

  const prevStep = () => {
    if (step === 3) {
      dispatch({
        type: actionType.AGENT_OTP_SEND_RESET,
      });
    }
    setStep(step - 1);
  };

  const resetForm = () => {
    setBankCustomerId("");
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

  const validateAgent = () => {
    var requestObj = {
      bankCustomerId: bankCustomerId,
      mfaToken: otp,
    };
    dispatch(validateSuperAgent(sessionStorage.getItem("token"), requestObj));
  };

  const bankCustomerIdForm = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                Bank Customer ID <span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <input
                placeholder="Enter your customer Id"
                type="number"
                value={bankCustomerId}
                onChange={(e) => setBankCustomerId(e.target.value)}
              />
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

  const agentOTP = () => {
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

  const successPage = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div className="containerBiaN_f_col width70percent">
              <h2>Congratulations</h2>
            </div>
          </div>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div className="containerBiaN_f_col width70percent">
              <p>Your account has been validated.</p>
            </div>
          </div>
        </div>
      </>
    );
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
                    <h1
                      className="list_top_heading textAlignCenter text-center"
                      style={{ paddingLeft: "0px" }}
                    >
                      Validate Your Bank Customer ID
                    </h1>
                  </div>
                </div>
                <div className="chartCardMiddle" style={{ padding: "24px" }}>
                  {(() => {
                    switch (step) {
                      case 1:
                        return bankCustomerIdForm();
                      case 2:
                        return agentOTPType();
                      case 3:
                        return agentOTP();
                      case 4:
                        return successPage();
                      default:
                        return <div></div>;
                    }
                  })()}
                </div>
                <div style={{ width: "100%", float: "left" }}>
                  <div className="confirm_p_w mTB00 button-container rspacing">
                    {(step !== 1) & (step !== 4) ? (
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
                      onClick={() => nextStep()}
                    >
                      {step === 3 ? "Validate" : step === 4 ? "Done" : "Next"}
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

export default ValidateBankCustomerId;
