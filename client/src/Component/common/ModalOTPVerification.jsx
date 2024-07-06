import { Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import backImage from "../../Assets/images/back.png";
import { toastr } from "react-redux-toastr";
import { connect, useDispatch } from "react-redux";
import { generateAndSendMFA } from "../../services/agent/agent_otp_actions";
import { Component } from "react";

function OTPVerification({
    startVerfication = false,
    handleCancel = () => null,
    handleProcess = async () => null,
    handleCloseAfterSucess = ()=>null
}) {
    const dispatch = useDispatch();

    const [showDelay, setShowDelay] = useState(true);
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [errors, setErrors] = useState(null);
    const [isVerifyOtpStep, setIsVerifyOtpStep] = useState(false);
    const [selected, setSelected] = useState({
        email: false,
        mobileNumber: false,
    });

    const otpRefs = Array.from({ length: 6 }, () => useRef(null));

    const handleOtpChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]$/.test(value) || value === "") {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value && index < otp.length - 1) {
                otpRefs[index + 1].current.focus();
            }
        }
    };

    const handleSubmitOTP = async (e) => {
        e.preventDefault();
        if (otp.every((val) => val !== "")) {
            const pinCode = otp.join("");
            const result=await handleProcess(pinCode);
            if(result){
                handleClose();
                handleCloseAfterSucess();
            }
        } else {
            toastr.warning("Please enter correct pin to verify your account");
        }
    };

    const resendCode = async () => {
        const mfaSent=await generateAndSendMFA(selected.email ? 'EMAIL' : (selected.mobileNumber ? 'SMS' : 'notification'));
        if(mfaSent===true){
            setShowDelay(true);
        }
    };

    const handleClose = () => {
        setSelected({
            email: false,
            mobileNumber: false,
        });
        setErrors(null);
        setIsVerifyOtpStep(false);
        setOtp(Array(6).fill(""));
        handleCancel();
    };

    const handleBack = () => {
        setIsVerifyOtpStep(false);
    };

    const handleSubmitChoice = async () => {
        if (!selected.email && !selected.mobileNumber) {
            setErrors("A least one option is required to continue");
            return;
        }
        const channel = selected.email ? 'EMAIL' : (selected.mobileNumber ? 'SMS' : 'notification');
        const mfaSent=await generateAndSendMFA(channel);
        if(mfaSent===true){
            setIsVerifyOtpStep(true);
        }
    };

    return (
        <Modal
            className="otp-container"
            open={startVerfication}
            title={null}
            footer={
                isVerifyOtpStep
                    ? []
                    : [
                          <button
                              key="cancel"
                              className="btn btn-dark mx-3 btn-raduis-5"
                              onClick={handleClose}
                          >
                              Cancel
                          </button>,
                          <button
                              key="send"
                              className="btn btn-success btn-raduis-5"
                              onClick={handleSubmitChoice}
                          >
                              Send
                          </button>,
                      ]
            }
        >
            {isVerifyOtpStep ? (
                <div>
                    <div className="d-flex justify-content-between">
                        <span className="absolute backImage">
                            <img src={backImage} onClick={handleBack} alt="back" />
                        </span>
                    </div>

                    <div className="pt-5">
                        <form onSubmit={handleSubmitOTP}>
                            <div className="row">
                                <div className="col-md-12 float-left">
                                    <div>
                                        <div className="text-center h2 bold">
                                            Please Confirm OTP
                                        </div>
                                        <div className="py-2 h5 text-center">
                                            Please enter the otp sent to you via{" "}
                                            {selected.email ? "Email" : "Mobile Number"}{" "}
                                        </div>
                                        <div
                                            style={{
                                                position: "relative",
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                            className="py-2"
                                        >
                                            <div
                                                className="row"
                                                style={{
                                                    justifyContent: "space-between",
                                                    width: "65%",
                                                }}
                                            >
                                                {otp.map((val, index) => (
                                                    <input
                                                        key={index}
                                                        type="text"
                                                        name={`otp${index + 1}`}
                                                        className="form-control mt-2 input-mobile"
                                                        maxLength="1"
                                                        value={val}
                                                        onChange={(e) => handleOtpChange(e, index)}
                                                        ref={otpRefs[index]}
                                                        style={{
                                                            textAlign: "center",
                                                            paddingLeft: "10px",
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="my-4 d-flex justify-content-center">
                                    <button
                                        className="h4"
                                        style={{
                                            cursor: showDelay ? "wait" : "pointer",
                                        }}
                                        disabled={showDelay}
                                        type="button"
                                        onClick={resendCode}
                                    >
                                        Resend Code
                                    </button>
                                    {showDelay && (
                                        <CountdownLabel beforeHidden={() => setShowDelay(false)} />
                                    )}
                                </div>
                                <div
                                    className="col-md-12 float-left"
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                    }}
                                >
                                    <button className="btn btn-default text-white" type="submit">
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <div>
                    <label className="h3 bold pt-2">
                        One-Time Password (OTP) Type{" "}
                    </label>
                    <br />
                    <br />
                    <div className="text-center">
                        <label className="h5 bold pt-2">
                            We need more authentication to process
                        </label>
                        <label className="h6">
                            Please choose an option to received otp code for verification{" "}
                        </label>
                    </div>

                    <br />
                    <div className="py-3 d-flex ">
                        <div
                            className={`mx-2 ${
                                selected.email ? "no-bank-choice-selected" : "no-bank-choice"
                            }`}
                            onClick={() => {
                                setSelected({
                                    mobileNumber: false,
                                    email: !selected.email,
                                });
                                setErrors(null);
                            }}
                        >
                            <div className="header text-center">Email</div>
                            <div className="description text-center">
                                johnDoe@gmail.com
                            </div>
                        </div>
                        <div
                            className={`mx-2 ${
                                selected.mobileNumber ? "no-bank-choice-selected" : "no-bank-choice"
                            }`}
                            onClick={() => {
                                setSelected({
                                    email: false,
                                    mobileNumber: !selected.mobileNumber,
                                });
                                setErrors(null);
                            }}
                        >
                            <div className="header text-center">
                                Mobile Number
                            </div>
                            <div className="description text-center">
                                +237 6789456123
                            </div>
                        </div>
                    </div>
                    {errors && (
                        <div className="text-danger bold h5 text-center py-2">
                            *** {errors} ***{" "}
                        </div>
                    )}
                </div>
            )}
        </Modal>
    );
}

const mapDispatchToProps = (dispatch) => ({
    // generateAndSendMFA: (channel) => dispatch(generateAndSendMFA(channel)),
});

export default connect(null, mapDispatchToProps)(OTPVerification);


export class CountdownLabel extends Component {
    state = {
        remainingTime: 30,
    };

    componentDidMount() {
        this.countdown = setInterval(() => {
            this.setState((prevState) => {
                if (prevState.remainingTime - 1 === 0) {
                    this.props.beforeHidden && this.props.beforeHidden();
                    clearInterval(this.countdown);
                    return { remainingTime: 0 };
                }
                return { remainingTime: prevState.remainingTime - 1 };
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.countdown);
    }

    render() {
        const { remainingTime } = this.state;

        if (remainingTime === 0) {
            return null;
        }

        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;

        return (
            <div className="h4 mx-2">
                {`${minutes.toString().padStart(2, "0")}:${seconds
                    .toString()
                    .padStart(2, "0")}`}
            </div>
        );
    }
}
