import { Button, Modal } from "antd";
import React, { Component, Fragment } from "react";
import OtpInput from "react-otp-input";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import styled from "styled-components";
import {
  checkOTPValid,
  sendAgentOTP,
  setAgentPassword,
} from "../../services/agent/action";
import NavBar from "../common/register/NavBar";

class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      mobileNumber: "",
      OTPModalVisible: false,
      otp: "",
      isResendOTPDisabled: true,
      isOTPSent: false,
      loadingComponent: "FORGOT_PASSWORD",

      password: "",
      confirmpassword: "",
      isPasswordsMatching: false,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    if (nextProps.agentOTPValidStatus) {
      this.setState({
        loadingComponent: "SET_PASSWORD",
      });
    }

    if (nextProps.agentSetPasswordStatus) {
      window.location = "/agent/login";
    }
  }

  cancel = () => {};

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (name === "password") {
          if (value === this.state.confirmpassword) {
            this.setState({
              isPasswordsMatching: true,
            });
          } else {
            this.setState({
              isPasswordsMatching: false,
            });
          }
        }
        if (name === "confirmpassword") {
          if (value === this.state.password) {
            this.setState({
              isPasswordsMatching: true,
            });
          } else {
            this.setState({
              isPasswordsMatching: false,
            });
          }
        }
      }
    );
  };

  validateForm = () => {};

  setForgotPassword = () => {};

  handleClick = () => {
    // sessionStorage.setItem("OTP_PhoneNumber", this.state.mobileNumber);
  };

  submitData = () => {};

  handleCancelOTPModal = () => {
    this.setState({
      OTPModalVisible: false,
      otp: "",
    });
  };

  setOtp = (e) => {
    this.setState({
      otp: e,
    });
  };

  resendOTP = () => {
    this.sendOTP();
    this.startResendTimeout();
  };

  startResendTimeout = () => {
    this.setState({
      isResendOTPDisabled: true,
    });

    setTimeout(() => {
      this.setState({
        isResendOTPDisabled: false,
      });
    }, 10000);
  };

  sendOTP = () => {
    const data = {
      phoneNumber: this.state.mobileNumber,
    };

    this.props.sendAgentOTP(data);
    console.log("SENDING OTP..");

    this.setState({
      isOTPSent: true,
      isResendOTPDisabled: true,
    });
  };

  showOTPModal = () => {
    if (this.state.mobileNumber === "") {
      toastr.error("Please enter a mobile number");
    } else {
      if (!this.state.isOTPSent) {
        this.sendOTP();
        this.startResendTimeout();
      }

      this.setState({
        OTPModalVisible: true,
      });
    }
  };

  verifyOTP = () => {
    const data = {
      phoneNumber: this.state.mobileNumber,
      mfaCode: this.state.otp,
    };

    this.props.checkOTPValid(data);
  };

  setAgentPassword = () => {
    const data = {
      phoneNumber: this.state.mobileNumber,
      password: this.state.password,
      confirmPassword: this.state.confirmpassword,
    };

    this.props.setAgentPassword(data);
  };

  render() {
    return (
      <Fragment>
        <section className="loginWrapper accountWrapper">
          <NavBar />

          {this.state.loadingComponent === "FORGOT_PASSWORD" ? (
            <>
              <div className="col-md-12 loginContainer">
                <div className="loginInner" style={{ marginTop: "5%" }}>
                  <div className="loginInform">
                    <>
                      <h4 style={{ color: "black", fontWeight: "600" }}>Enter Registered Mobile Number</h4>
                      <br></br>
                      <input
                        type="text"
                        name="mobileNumber"
                        autoComplete="off"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Registered Mobile Number"
                      />
                      <div
                        className="form-group"
                        style={{
                          marginTop: "8%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <button
                          type="button"
                          className="btn-default btn btnCustomP"
                          onClick={this.showOTPModal}
                        >
                          Submit
                        </button>
                      </div>
                    </>
                  </div>
                  <Modal
                    visible={this.state.OTPModalVisible}
                    onCancel={this.handleCancelOTPModal}
                    style={{ marginTop: "8%" }}
                    closable={false}
                    footer={null}
                  >
                    <div style={{ textAlign: "center" }}>
                      <h2 style={{ fontSize: "15px" }}>
                        Please enter the verification code you received on{" "}
                        <br /> {this.state.mobileNumber}
                      </h2>

                      <OtpInput
                        value={this.state.otp}
                        shouldAutoFocus={true}
                        onChange={(e) => this.setOtp(e)}
                        numInputs={6}
                        seperator={<span></span>}
                        isInputNum={true}
                        inputStyle={{
                          width: "55px",
                          padding: "0px",
                          marginRight: "10px",
                          marginLeft: "10px",
                          fontWeight: "600",
                          fontSize: "16px",
                          lineHeight: "20px",
                          padding: "15px 20px",
                          borderRadius: "5px",
                          border: "1px solid transparent",
                          color: "#00479a",
                          background: "#F2F2F2",
                          display: "inline-block",
                          boxShadow: "0px 8px 8px rgba(37, 51, 66, 0.15)",
                        }}
                        containerStyle={{
                          paddingLeft: "25px",
                          marginTop: "20px",
                        }}
                      />

                      <div
                        style={{
                          textAlign: "left",
                          marginTop: "10px",
                          paddingLeft: "25px",
                        }}
                      >
                        <Button
                          type="link"
                          disabled={this.state.isResendOTPDisabled}
                          style={{
                            color: this.state.isResendOTPDisabled
                              ? "darkgray"
                              : "#066FD0",
                            paddingLeft: "0px",
                            fontWeight: "550",
                          }}
                          onClick={() => this.resendOTP()}
                        >
                          Resend Code
                        </Button>
                      </div>

                      <button
                        style={{
                          marginTop: "20px",
                          height: "40px",
                          color: "white",
                        }}
                        disabled={this.state.otp.length < 6 ? true : false}
                        className="btn-default btn"
                        onClick={this.verifyOTP}
                      >
                        Verify OTP
                      </button>
                    </div>
                  </Modal>
                </div>
              </div>
            </>
          ) : this.state.loadingComponent === "SET_PASSWORD" ? (
            <>
              <InnerWrapper className="agent-registration-container">
                <div className="agent-cat-box">
                  <div className="display-linebreak">
                    <h2
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        marginTop: "10px",
                      }}
                    >
                      Set a Password for your Account !
                    </h2>

                    <div
                      className="row"
                      style={{
                        display: "block",
                        paddingLeft: "15px",
                        paddingRight: "15px",
                      }}
                    >
                      <div
                        className="form-group"
                        style={{ marginTop: "5%", float: "left" }}
                      >
                        <label>Password</label>
                      </div>
                      <br /> <br />
                      <div
                        className="form-group"
                        style={{ marginBottom: "5%" }}
                      >
                        <div>
                          <input
                            className="form-control"
                            type="password"
                            name="password"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                      <div
                        className="form-group"
                        style={{ marginTop: "5%", float: "left" }}
                      >
                        <label>Confirm Password</label>
                      </div>
                      <br /> <br />
                      <div
                        className="form-group"
                        style={{ marginBottom: "10%" }}
                      >
                        <div>
                          <input
                            className="form-control"
                            type="password"
                            name="confirmpassword"
                            value={this.state.confirmpassword}
                            placeholder="Confirm Password"
                            onChange={this.handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      disabled={!this.state.isPasswordsMatching}
                      style={{
                        backgroundColor: this.state.isPasswordsMatching
                          ? "#00479a"
                          : "darkgrey",
                        borderColor: this.state.isPasswordsMatching
                          ? "#00479a"
                          : "darkgrey",
                      }}
                      className="btn-default okayBtn"
                      onClick={() => {
                        this.setAgentPassword();
                      }}
                    >
                      Set New Password
                    </button>
                  </div>
                </div>
              </InnerWrapper>
            </>
          ) : (
            <></>
          )}
        </section>
      </Fragment>
    );
  }
}

const InnerWrapper = styled.div`
  .display-linebreak {
    white-space: pre-line;
  }
  .agent-cat-inner-box {
    background: #ffffff;
    border-radius: 10px;
    padding: 10px 40px;
    max-width: 550px;
    text-align: center;
    h2 {
      text-align: left;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 26px;
      color: #343a40;
      margin-bottom: 20px;
    }
    .btn {
      font-weight: 600;
      font-size: 16px;
      line-height: 1;
      height: 40px;
      color: #ffffff;
      text-transform: uppercase;
      margin-top: 30px;
      margin-bottom: 10px;
    }
  }
  .agent-cat-box {
    background: #ffffff;
    box-shadow: 0px 2px 12px rgba(37, 51, 66, 0.15);
    border-radius: 10px;
    padding: 20px 20px 35px 20px;
    max-width: 550px;
    text-align: center;
    margin: 0 15px;
  }
  .okayBtn {
    font-weight: 600;
    font-size: 16px;
    line-height: 1;
    height: 40px;
    color: #ffffff;
    text-transform: uppercase;
    margin-top: 10px;
  }
`;

const mapStateToProps = ({ agentReducer }) => {
  return {
    agentOTPStatus: agentReducer.agentOTPStatus,
    agentOTPValidStatus: agentReducer.agentOTPValidStatus,
    agentSetPasswordStatus: agentReducer.agentSetPasswordStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  sendAgentOTP: (payload) => dispatch(sendAgentOTP(payload)),
  checkOTPValid: (payload) => dispatch(checkOTPValid(payload)),
  setAgentPassword: (payload) => dispatch(setAgentPassword(payload)),
});

//connect method is used for connecting react and redux //
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
