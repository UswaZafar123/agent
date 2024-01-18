import React, { useState } from "react";
import "../../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "../Settings/General/formfromold.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import validator from "validator";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchAgentProfile,
  fetchSuperAgentDetail,
  sendLinkingRequestToSuperAgent,
} from "../../../services/agent/action";
import actionType from "../../../services/agent/actionType";
import { FormattedMessage, IntlProvider } from "react-intl";

const ValidateSuperAgentId = (props) => {
  const [step, setStep] = useState(1);

  const [phoneNumber, setPhoneNumber] = useState("");

  const [messages, setMessages] = useState("");
  const [language, setLanguage] = useState("");

  const lan = useSelector((state) => state.commonReducer.language);

  const dispatch = useDispatch();
  const agentProfile = useSelector((state) => state.agentReducer.profile.data);
  const superAgentDetailLoading = useSelector(
    (state) => state.agentReducer.superAgentDetail.loading
  );
  const superAgentDetail = useSelector(
    (state) => state.agentReducer.superAgentDetail.data
  );
  const sendLinkingRequestLoading = useSelector(
    (state) => state.agentReducer.sendLinkingRequest.loading
  );
  const sendLinkingRequestSuccess = useSelector(
    (state) => state.agentReducer.sendLinkingRequest.success
  );

  React.useEffect(async () => {
    dispatch({
      type: actionType.SUPER_AGENT_DETAIL_RESET,
    });

    const messages = await loadLocaleData(localStorage.getItem("lang"));
    setMessages(messages);

    setLanguage(localStorage.getItem("lang"));

    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");
  }, []);

  React.useEffect(async () => {
    const messages = await loadLocaleData(lan);
    setMessages(messages);

    setLanguage(lan);
  }, [lan]);

  const loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../../i18n/messages/fr");
      default:
        return import("../../i18n/messages/en");
    }
  };

  React.useEffect(() => {
    if (!agentProfile) {
      dispatch(fetchAgentProfile(sessionStorage.getItem("token")));
    }
  }, [agentProfile, dispatch]);

  React.useEffect(() => {
    // console.log(superAgentDetail, "SUPER AGENT DETAILS")
    if (superAgentDetail !== {}) {
      if (Object.keys(superAgentDetail).length && step === 1) {
        setStep(step + 1);
      } else if (sendLinkingRequestSuccess && step === 2) {
        setStep(step + 1);
      }
    }
  }, [step, superAgentDetail, sendLinkingRequestSuccess]);

  const stepOneValidated = () => {
    return !(validator.isEmpty(phoneNumber) || superAgentDetailLoading);
  };

  const stepTwoValidated = () => {
    return !sendLinkingRequestLoading;
  };

  const isFormValidated = () => {
    switch (step) {
      case 1:
        return stepOneValidated();
      case 2:
        return stepTwoValidated();
      case 3:
        return successPage();
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (step === 1) {
      fetchAgentDetail();
    } else if (step === 2) {
      sendlinkingRequestToSuperAgent();
    } else {
      resetForm();
      setStep(1);
      dispatch({
        type: actionType.SUPER_AGENT_DETAIL_ERROR,
      });
      dispatch({
        type: actionType.SEND_LINKING_REQUEST_ERROR,
      });
    }
  };

  const prevStep = () => {
    if (step === 2) {
      dispatch({
        type: actionType.SUPER_AGENT_DETAIL_RESET,
      });
    }
    setStep(step - 1);
  };

  const resetForm = () => {
    setPhoneNumber("");
  };

  const fetchAgentDetail = () => {
    var requestObj = {
      phoneNo: phoneNumber,
    };
    dispatch(
      fetchSuperAgentDetail(sessionStorage.getItem("token"), requestObj)
    );
  };

  const sendlinkingRequestToSuperAgent = () => {
    var requestObj = {
      superAgentEmail: superAgentDetail.agentEmailAddress,
    };
    dispatch(
      sendLinkingRequestToSuperAgent(
        sessionStorage.getItem("token"),
        requestObj
      )
    );
  };

  const fetchSuperAgentDetailForm = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                Super Agent ID <span className="mantdat">*</span> <br />
                <span style={{ fontSize: "13px", color: "darkgray" }}>
                  (Phone Number without country code)
                </span>{" "}
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
        </div>
      </>
    );
  };

  const superAgentDetails = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                Name<span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <input
                type="text"
                className="disabled"
                value={superAgentDetail.firstName}
                disabled
              />
            </div>
          </div>
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                Phone Number<span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <input type="number" value={superAgentDetail.phoneNo} disabled />
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
              <p>
                A notification is sent by mail both to the Agent, his
                Master/Super Agent and the Retail Banking Manager, after that
                the Agent is activated by the Master/Super Agent , he can now
                start to carry out transactions up to the UV purchased.
              </p>
            </div>
          </div>
        </div>
      </>
    );
  };

  // const agentOTPType = () => {
  //   return (
  //     <>
  //       <div className="containerBiaN_form">
  //         <RadioGroup
  //             aria-label="Gender"
  //             value={selectedOtpType}
  //             onChange={(e) => {setSelectedOtpType(e.target.value)}}
  //           >
  //             {otpTypes.map((type) => {
  //               return <FormControlLabel value={type.value} control={<Radio />} label={type.name} />
  //             })}
  //             </RadioGroup>
  //       </div>
  //     </>
  //   );
  // }

  // const agentOTP = () => {
  //   return (
  //     <>
  //       <div className="containerBiaN_form">
  //           <div className="containerBiaN_f_row">
  //               <div className="containerBiaN_f_col width30percent textAlignRight">
  //                   <label>Enter OTP <span className="mantdat">*</span></label>
  //               </div>
  //               <div className="containerBiaN_f_col width70percent">
  //               <OtpInput
  //                 value={otp}
  //                 shouldAutoFocus={true}
  //                 onChange={(value) => setOtp(value)}
  //                 numInputs={6}
  //                 seperator={<span></span>}
  //                 isInputNum={true}
  //                 inputStyle={{
  //                     width: "50px",
  //                     marginRight: "10px",
  //                     marginLeft: "10px",
  //                     fontWeight: '600',
  //                     fontSize: '16px',
  //                     lineHeight: '20px',
  //                     padding: '15px 20px',
  //                     borderRadius: '5px',
  //                     border: '1px solid transparent',
  //                     color: '#00000',
  //                     background: '#F2F2F2',
  //                     display: 'inline-block',
  //                     boxShadow: "0px 8px 8px rgba(37, 51, 66, 0.15)"
  //                 }}
  //               />
  //               </div>

  //           </div>

  //           <div className="containerBiaN_f_row">
  //               <div className="containerBiaN_f_col width30percent textAlignRight">
  //               </div>
  //               <div className="containerBiaN_f_col width70percent" style={{padding: '0px 0px 0px 20px'}}>
  //                   <div style={{ display: 'flex' }}>
  //                     {otpTimer !== 0 ? <p>Resend OTP in {otpTimer}</p> : <p>Didn't receive OTP <span onClick={() => resendCustomerOtp()} style={{ color: 'rgb(191 21 21)', cursor: 'pointer', textDecoration: 'underline' }}>resend</span></p>}

  //                   </div>
  //               </div>
  //           </div>

  //       </div>
  //     </>
  //   );
  // }

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
                        <FormattedMessage id="agent.SendLinkingRequestToSuperAgent" />
                      </h1>
                    </div>
                  </div>
                  <div className="chartCardMiddle" style={{ padding: "24px" }}>
                    {(() => {
                      switch (step) {
                        case 1:
                          return fetchSuperAgentDetailForm();
                        case 2:
                          return superAgentDetails();
                        case 3:
                          return successPage();
                        default:
                          return <div></div>;
                      }
                    })()}
                  </div>
                  <div style={{ width: "100%", float: "left" }}>
                    <div className="confirm_p_w mTB00 button-container rspacing">
                      {(step !== 1) & (step !== 3) ? (
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
                        {step === 2 ? (
                          "Send Linking Request"
                        ) : step === 3 ? (
                          "Done"
                        ) : (
                          <FormattedMessage id="agent.Next" />
                        )}
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

export default ValidateSuperAgentId;
