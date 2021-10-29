import React, { Component, Fragment, useState } from "react";
import NavBar from "./../../common/register/NavBar";
import styled from "styled-components";
import { LeftOutlined } from '@ant-design/icons'
import OtpInput from "react-otp-input";
import { Button } from "antd";
import successImage from "../../../Assets/images/RegistrationSuccessImage.JPG"

function AgentOTP(props) {

    const [otp, setOtp] = useState("");
    const [firstname, setFirstName] = useState(localStorage.getItem("Firstname"));
    const [email, setEmail] = useState(localStorage.getItem("Email"));
    const [OTP_PHONENUMBER, setOTP_PHONENUMBER] = useState(localStorage.getItem("OTP_PhoneNumber"));
    const [loadRegistrationSuccess, setLoadRegistrationSuccess] = useState(false);

    return (
        <Fragment>
            <NavBar />
            {!loadRegistrationSuccess &&
                <InnerWrapper className="agent-registration-container">
                    <div className="agent-cat-box">
                        <div style={{ textAlign: 'left' }}>
                            <LeftOutlined style={{ fontSize: "25px" }} onClick={() => {
                                window.history.back();
                            }} />
                        </div>
                        <div className="agent-cat-inner-box display-linebreak">
                            <h2>Please enter the verification code you received on {"\n " + OTP_PHONENUMBER}</h2>

                            <OtpInput
                                value={otp}
                                onChange={(e) => setOtp(e)}
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

                            <div style={{ textAlign: 'left', marginTop: '10px' }}>

                                <Button type="link" style={{ color: '#066FD0', paddingLeft: '0px', fontWeight: '550' }}>Resend Code</Button>

                            </div>
                            <button disabled={otp.length < 6 ? true : false} onClick={() => setLoadRegistrationSuccess(true)} className="btn-default btn" >
                                Next
                            </button>
                        </div>
                    </div>
                </InnerWrapper>
            }

            {loadRegistrationSuccess &&
                <InnerWrapper className="agent-registration-container">
                    <div className="agent-cat-box">
                        <div style={{ textAlign: 'center' }}>
                            <img src={successImage} style={{ height: "80%", width: "80%", paddingLeft: "23px" }} />
                        </div>
                        <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '15px' }}>
                            {firstname}
                        </div>
                        <div className="display-linebreak">
                            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginTop: '10px' }}>Your account Registered as an Agent-SA {"\n"} Successfully!</h2>

                            <p style={{ fontWeight: 'bold', fontSize: '15px', color: '#6C6C6C' }}>{email}</p>
                            <button className="btn-default okayBtn" onClick={() => props.history.push("/")}>
                                Okay
                            </button>
                        </div>
                    </div>
                </InnerWrapper>
            }

        </Fragment>
    );
}
const InnerWrapper = styled.div`
    margin-top: 100px;
    .display-linebreak {
        white-space: pre-line;
    }
    .agent-cat-inner-box {
        background: #FFFFFF;
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
            color: #343A40;
            margin-bottom: 20px;
        }
        .btn {
            font-weight: 600;
            font-size: 16px;
            line-height: 1;
            height: 40px;
            color: #FFFFFF;
            text-transform: uppercase;
            margin-top: 30px;
            margin-bottom: 10px;
        }
    }
    .agent-cat-box {
        background: #FFFFFF;
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
        color: #FFFFFF;
        text-transform: uppercase;
        margin-top: 10px;
    }
`

export default AgentOTP;
