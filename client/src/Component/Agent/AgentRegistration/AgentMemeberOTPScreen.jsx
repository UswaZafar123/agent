import React, { Component, Fragment, useState, useEffect } from "react";
import NavBar from "./../../common/register/NavBar";
import styled from "styled-components";
import { LeftOutlined } from "@ant-design/icons";
import OtpInput from "react-otp-input";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import {
  sendAgentOTP,
  checkOTPValid,
  setAgentPasswordMember,
} from "../../../services/agent/action";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

function AgentOTP(props) {
  const [otp, setOtp] = useState("");

  const [OTP_PHONENUMBER, setOTP_PHONENUMBER] = useState(
    props.location.state.phoneNumber
  );
  const [loadingComponent, setLoadingComponent] = useState("OTP");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordsMatching, setIsPasswordsMatching] = useState(false);

  const [isResendOTPDisabled, setisResendOTPDisabled] = useState(true);
  const [seconds, setSeconds] = useState(10);

  // const agentOTPStatus = useSelector((state) => state.agentReducer.agentOTPStatus);
  const agentOTPValidStatus = useSelector(
    (state) => state.agentReducer.agentOTPValidStatus
  );
  const agentSetPasswordStatus = useSelector(
    (state) => state.agentReducer.agentSetPasswordStatus
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      setSeconds(0);
      setisResendOTPDisabled(false);
    }
  });

  function resendOtp() {
    const data = {
      phoneNumber: props.location.state.phoneNumber,
    };

    dispatch(sendAgentOTP(data));

    setisResendOTPDisabled(true);
    setSeconds(10);
  }

  function checkOTPValidity() {
    const data = {
      phoneNumber: OTP_PHONENUMBER,
      mfaCode: otp,
    };

    dispatch(checkOTPValid(data));
  }

  useEffect(() => {
    if (agentOTPValidStatus) {
      setLoadingComponent("SET_PASSWORD");
    }
  });

  useEffect(() => {
    if (
      password === confirmPassword &&
      password.length > 2 &&
      confirmPassword.length > 2
    ) {
      setIsPasswordsMatching(true);
    } else {
      setIsPasswordsMatching(false);
    }
  });

  return (
    <Fragment>
      <div className="main_contain agentformCenter">
        <div className="merch_m_list_w">
          <div className="merch_list_card" id="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="kyccustomformheading">
                      <h1 className="list_top_heading textAlignCenter text-center">
                        Add New Member
                      </h1>
                    </div>
                  </div>
                  <div
                    className="chartCardMiddle"
                    style={{ padding: "24px" }}
                  ></div>
                  {loadingComponent === "OTP" && (
                    <InnerWrapper className="agent-registration-container">
                      <div className="agent-cat-box">
                        <div style={{ textAlign: "left" }}>
                          <LeftOutlined
                            style={{ fontSize: "25px" }}
                            onClick={() => {
                              window.history.back();
                            }}
                          />
                        </div>
                        <div className="agent-cat-inner-box display-linebreak">
                          <h2>
                            Please enter the verification code you received on{" "}
                            {"\n " + OTP_PHONENUMBER}
                          </h2>

                          <OtpInput
                            value={otp}
                            shouldAutoFocus={true}
                            onChange={(e) => setOtp(e)}
                            numInputs={6}
                            seperator={<span></span>}
                            isInputNum={true}
                            inputStyle={{
                              width: "50px",
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
                          />

                          <div style={{ textAlign: "left", marginTop: "10px" }}>
                            <Button
                              type="link"
                              disabled={isResendOTPDisabled}
                              style={{
                                color: isResendOTPDisabled
                                  ? "darkgray"
                                  : "#066FD0",
                                paddingLeft: "0px",
                                fontWeight: "550",
                              }}
                              onClick={() => resendOtp()}
                            >
                              Resend Code{" "}
                              {seconds > 0 ? "(" + seconds + ")" : ""}
                            </Button>
                          </div>
                          <button
                            disabled={otp.length < 6 ? true : false}
                            onClick={() => {
                              checkOTPValidity();
                            }}
                            className="btn-default btn"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </InnerWrapper>
                  )}

                  {loadingComponent === "SET_PASSWORD" && (
                    <InnerWrapper className="agent-registration-container">
                      <br></br>
                      <br></br>
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
                                <Input.Password
                                  placeholder="input password"
                                  onChange={(e) => setPassword(e.target.value)}
                                  iconRender={(visible) =>
                                    visible ? (
                                      <EyeTwoTone />
                                    ) : (
                                      <EyeInvisibleOutlined />
                                    )
                                  }
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
                              style={{ marginBottom: "5%" }}
                            >
                              <div>
                                <Input.Password
                                  placeholder="cinfirm password"
                                  onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                  }
                                  iconRender={(visible) =>
                                    visible ? (
                                      <EyeTwoTone />
                                    ) : (
                                      <EyeInvisibleOutlined />
                                    )
                                  }
                                />
                              </div>
                            </div>
                            {/* <div
                  className="form-group"
                  style={{ marginTop: "5%", float: "left" }}
                >
                  <label>Password</label>
                </div>
                <br /> <br />
                <div className="form-group" style={{ marginBottom: "5%" }}>
                  <div>
                    <input
                      className="form-control"
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
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
                <div className="form-group" style={{ marginBottom: "10%" }}>
                  <div> */}
                            {/* <input
                      className="form-control"
                      type="password"
                      name="confirmpassword"
                      value={confirmPassword}
                      placeholder="Confirm Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    /> */}
                            {/* </div>
                </div> */}
                          </div>

                          <button
                            disabled={!isPasswordsMatching}
                            style={{
                              background: isPasswordsMatching
                                ? "#00479a"
                                : "darkgrey",
                              borderColor: isPasswordsMatching
                                ? "#00479a"
                                : "darkgrey",
                            }}
                            className="btn-default okayBtn"
                            onClick={() => {
                              const data = {
                                phoneNumber: OTP_PHONENUMBER,
                                password: password,
                                confirmPassword: confirmPassword,
                              };

                              dispatch(
                                setAgentPasswordMember(data, props.history)
                              );
                            }}
                          >
                            Set Password
                          </button>
                        </div>
                      </div>
                    </InnerWrapper>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
const InnerWrapper = styled.div`
  margin-top: 100px;
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

export default AgentOTP;
