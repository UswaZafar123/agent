import React, { useState, useEffect } from "react";
import "../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "../page/Settings/General/formfromold.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Button, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage, IntlProvider } from "react-intl";
import OtpInput from "react-otp-input";

const { Option } = Select;
const resendTime = 30;

const FundTransfer = () => {
    const [messages, setMessages] = useState("");
    const [language, setLanguage] = useState("");
    const [otp, setOtp] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [step, setStep] = useState(0);
    const [transactionCode, settransactionCode] = useState("");

    const lan = useSelector((state) => state.commonReducer.language);

    const dispatch = useDispatch();

    useEffect(async () => {
        const messages = await loadLocaleData(localStorage.getItem("lang"));
        setMessages(messages);

        setLanguage(localStorage.getItem("lang"));
    }, []);

    const loadLocaleData = (locale) => {
        switch (locale) {
            case "fr":
                return import("../i18n/messages/fr.js");
            default:
                return import("../i18n/messages/en.js");
        }
    };

    useEffect(async () => {
        const messages = await loadLocaleData(lan);
        setMessages(messages);

        setLanguage(lan);
    }, [lan]);

    const verificationForm = () => {
        return (
            <>
                <div className="containerBiaN_form">
                    <div className="containerBiaN_f_row" style={{ justifyContent: "center" }}>
                        <div className="containerBiaN_f_col width30percent textAlignRight">
                            <label>
                                <FormattedMessage id="agent.phonenumber" />{" "}
                                <span style={{ color: "darkgray", fontSize: "15px" }}>{"(with Country Code)"}</span>
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
                    <div className="containerBiaN_f_row" style={{ justifyContent: "center" }}>
                        <div className="containerBiaN_f_col width30percent textAlignRight">
                            <label>
                                Transaction Code{" "}
                                <span style={{ color: "darkgray", fontSize: "15px" }}>{"(Provided by the Sender)"}</span>
                                <span className="mantdat">*</span>
                            </label>
                        </div>
                        <div className="containerBiaN_f_col width70percent">
                            <input
                                placeholder={"Enter Transaction Code (Provided by the Sender)"}
                                type="email"
                                value={transactionCode}
                                onChange={(e) => settransactionCode(e.target.value)}
                            />
                        </div>
                    </div>

                </div>
            </>
        );
    };

    const transactionSummary = () => {
        return (
            <>
                <div className="containerBiaN_form" style={{ width: "100%" }}>
                    <div className="containerBiaN_f_row" style={{ justifyContent: "center" }}>
                        <div className="containerBiaN_f_col width40percent textAlignRight"></div>
                        <div className="containerBiaN_f_col width60percent">
                            <h1>Transaction Summary</h1>
                        </div>
                    </div>
                    {/* <hr style={{ width: "50%", borderColor: "red" }} /> */}

                    <div style={{ borderWidth: 1, marginLeft: "20%", marginRight: "20%", borderBottomColor: "red" }}>
                        <div className="containerBiaN_f_row" style={{ justifyContent: "left" }}>
                            <div className="containerBiaN_f_col width20percent textAlignRight"></div>
                            <div className="containerBiaN_f_col width80percent" style={{ paddingBottom: "0px" }}>
                                <h3>Receiver's Details</h3>
                            </div>
                        </div>

                        <hr />

                        <div className="containerBiaN_f_row" style={{ justifyContent: "center" }}>
                            <div className="containerBiaN_f_col width30percent"></div>
                            <div className="containerBiaN_f_col width70percent">
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginRight: "16px", color: "gray" }}>
                                        First Name
                                    </p>
                                    <p style={{ fontWeight: "bold" }}>XXXXXXXXXXXX</p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginRight: "16px", color: "gray" }}>
                                        Last Surname
                                    </p>
                                    <p style={{ fontWeight: "bold" }}>XXXXXXXXXX
                                    </p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginRight: "16px", color: "gray" }}>Phone Number</p>
                                    <p style={{ fontWeight: "bold" }}>{"(+XXX) XXX XXXXX"}
                                    </p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginRight: "16px", color: "gray" }}>Email</p>
                                    <p style={{ fontWeight: "bold" }}>XXXXXX@XXXX.XXX
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderWidth: 1, marginLeft: "20%", marginRight: "20%", borderTopColor: "red" }}>
                        <div className="containerBiaN_f_row" style={{ justifyContent: "left" }}>
                            <div className="containerBiaN_f_col width20percent textAlignRight"></div>
                            <div className="containerBiaN_f_col width80percent" style={{ paddingBottom: "0px" }}>
                                <h3>Sender's Details</h3>
                            </div>
                        </div>

                        <hr />

                        <div className="containerBiaN_f_row" style={{ justifyContent: "center" }}>
                            <div className="containerBiaN_f_col width30percent"></div>
                            <div className="containerBiaN_f_col width70percent">
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginRight: "16px", color: "gray" }}>
                                        First Name
                                    </p>
                                    <p style={{ fontWeight: "bold" }}>XXXXXXXXXXXX</p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginRight: "16px", color: "gray" }}>
                                        Last Name
                                    </p>
                                    <p style={{ fontWeight: "bold" }}>XXXXXXXXXX
                                    </p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginRight: "16px", color: "gray" }}>Wallet ID / Phone Number</p>
                                    <p style={{ fontWeight: "bold" }}>{"(+XXX) XXX XXXXX"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ borderWidth: 1, marginLeft: "20%", marginRight: "20%" }}>
                        <div className="containerBiaN_f_row" style={{ justifyContent: "left" }}>
                            <div className="containerBiaN_f_col width20percent textAlignRight"></div>
                            <div className="containerBiaN_f_col width80percent" style={{ paddingBottom: "0px" }}>
                                <h3>Transaction Details</h3>
                            </div>
                        </div>

                        <hr />

                        <div className="containerBiaN_f_row" style={{ justifyContent: "center" }}>
                            <div className="containerBiaN_f_col width30percent"></div>
                            <div className="containerBiaN_f_col width70percent">
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginRight: "16px", color: "gray" }}>
                                        Amount
                                    </p>
                                    <p style={{ fontWeight: "bold" }}>XXXXX.XX</p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginRight: "16px", color: "gray" }}>
                                        Currency
                                    </p>
                                    <p style={{ fontWeight: "bold" }}>XAF
                                    </p>
                                </div>
                                <div style={{ display: "flex" }}>
                                    <p style={{ marginRight: "16px", color: "gray" }}>Transaction Code</p>
                                    <p style={{ fontWeight: "bold" }}>{"XX2442XX4325XX"}
                                    </p>
                                </div>
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
                    <div className="containerBiaN_f_row" style={{ justifyContent: "center" }}>
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
                    <div className="containerBiaN_f_row" style={{ justifyContent: "center" }}>
                        <div className="containerBiaN_f_col" style={{ paddingLeft: "0px", paddingRight: "0px" }}>

                        </div>
                        <div className="containerBiaN_f_col" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
                            {/* Didn't Receive OTP ? */}
                        </div>
                        <div className="containerBiaN_f_col" style={{ paddingLeft: "5px", paddingRight: "0px" }}>
                            <button style={{ border: "none", backgroundColor: "transparent", textDecoration: "underline" }}>
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
                            <p style={{ color: "green" }}>Payment was Successful</p>
                        </div>
                    </div>
                    <div className="containerBiaN_f_row">
                        <div className="containerBiaN_f_col width30percent textAlignRight"></div>
                        <div className="containerBiaN_f_col width70percent">
                            <div style={{ display: "flex" }}>
                                <p style={{ marginRight: "16px", color: "gray" }}>Transaction Code</p>
                                <p style={{ fontWeight: "bold" }}>XX34XX343235XX35</p>
                            </div>
                            <div style={{ display: "flex" }}>
                                <p style={{ marginRight: "16px", color: "gray" }}>
                                    Receiver Phone Number
                                </p>
                                <p style={{ fontWeight: "bold" }}>
                                    XXXXXXXXXXXXXXXXXX
                                </p>
                            </div>
                            <div style={{ display: "flex" }}>
                                <p style={{ marginRight: "16px", color: "gray" }}>Amount</p>
                                <p style={{ fontWeight: "bold" }}>XXXXXXXXXXXXXX</p>
                            </div>
                            <div style={{ display: "flex" }}>
                                <p style={{ marginRight: "16px", color: "gray" }}>Currency</p>
                                <p style={{ fontWeight: "bold" }}>XAF</p>
                            </div>
                            <div style={{ display: "flex" }}>
                                <p style={{ marginRight: "16px", color: "gray" }}>Reason</p>
                                <p style={{ fontWeight: "bold" }}>XXXXXXXXXXXXX</p>
                            </div>
                            <div style={{ display: "flex" }}>
                                <p style={{ marginRight: "16px", color: "gray" }}>Status</p>
                                <p style={{ fontWeight: "bold", color: "green" }}>SUCCESS</p>
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
            setStep(0);
        }
    }

    const prevStep = () => {
        if (step === 1) {
            setStep(0);
        } else if (step === 2) {
            setStep(1);
        } else if (step === 3) {
            setStep(2);
        }
    }

    const resendAgentOtp = () => {
        // setOtpTimer(resendTime);
        // sendAgentOTP();
    };

    const verifyCustomerSubmit = () => {
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
                                                Fund Transfer
                                                <br />
                                                <span style={{ fontSize: '15px' }}>{"(Non-SARA Customer)"}</span>

                                            </h1>
                                        </div>
                                    </div>
                                    <div className="chartCardMiddle" style={{ padding: "24px" }}>
                                        <>
                                            {
                                                step === 0 && (
                                                    verificationForm()
                                                )
                                            }
                                            {
                                                step === 1 && (
                                                    transactionSummary()
                                                )
                                            }
                                            {
                                                step === 2 && (
                                                    customerOTP()
                                                )
                                            }
                                            {
                                                step === 3 && (
                                                    transactionSuccess()
                                                )
                                            }

                                        </>
                                    </div>
                                    <hr />
                                    <div style={{ width: "100%", float: "left" }}>
                                        <div className="confirm_p_w mTB00 button-container rspacing">
                                            {
                                                step > 0 && step < 3 ? (
                                                    <>
                                                        <Button
                                                            className="blackbtn aryousureBTN confirmBtnR"
                                                            onClick={() => prevStep()}
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <></>
                                                )
                                            }
                                            <Button
                                                className="aryousureBTN confirmBtnR"
                                                onClick={() => stepChange()}
                                            >
                                                {
                                                    step === 0 ? "View Summary" : step === 1 ? "Send OTP" : step === 2 ? "Verify OTP & Proceed Payment" : "Done"
                                                }
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

export default FundTransfer;
