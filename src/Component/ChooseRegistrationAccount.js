import React, { Fragment, useState } from "react";
import NavBar from "./../Component/common/register/NavBar";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import clientLogo from "../Assets/images/clientImage.png";
import agentLogo from "../Assets/images/Group.png";
import merchantLogo from "../Assets/images/MerchantRegister.png";


function ChooseRegistrationAccount(props) {

    const [selectedAccount, setSelectedAccount] = useState("");
    const [hoverAccount, setHoverAccount] = useState("");


    return (
        <Fragment>
            <NavBar />
            <InnerWrapper className="agent-registration-container">
                <div className="agent-cat-box">
                    <h2 style={{ fontSize: '24px' }}>Welcome to Afriland Bank !</h2>
                    <h2 style={{ fontWeight: '400' }}>Please select the Account you want to Open </h2>

                    <table style={{ width: '100%', marginTop: "30px" }}>

                        <tr>

                            <td onClick={() => setSelectedAccount("CLIENT")}>
                                <div onMouseEnter={() => setHoverAccount("CLIENT")} onMouseLeave={() => setHoverAccount("")} className="accountLogoStyle" style={{ marginRight: "20px", background: selectedAccount === "CLIENT" || hoverAccount === "CLIENT" ? "#DA4139" : "#F3F3F3FC" }}>

                                    <img className="accountLogoImageStyle" src={clientLogo} />

                                    <h2 className="accountName" style={{ marginTop: "30px", fontSize: "15px" }}>Client</h2>

                                </div>
                            </td>
                            <td onClick={() => setSelectedAccount("AGENT")}>
                                <div onMouseEnter={() => setHoverAccount("AGENT")} onMouseLeave={() => setHoverAccount("")} className="accountLogoStyle" onM style={{ marginRight: "20px", background: selectedAccount === "AGENT" || hoverAccount === "AGENT" ? "#DA4139" : "#F3F3F3FC" }}>

                                    <img className="accountLogoImageStyle" style={{ width: "60px" }} src={agentLogo} />

                                    <h2 style={{ marginTop: "30px", fontSize: "15px" }}>Agent</h2>

                                </div>
                            </td>
                            <td onClick={() => setSelectedAccount("MERCHANT")}>
                                <div onMouseEnter={() => setHoverAccount("MERCHANT")} onMouseLeave={() => setHoverAccount("")} className="accountLogoStyle" style={{ background: selectedAccount === "MERCHANT" || hoverAccount === "MERCHANT" ? "#DA4139" : "#F3F3F3FC" }}>

                                    <img className="accountLogoImageStyle" src={merchantLogo} />

                                    <h2 style={{ marginTop: "30px", fontSize: "15px" }}>Merchant</h2>

                                </div>
                            </td>

                        </tr>

                    </table>

                    <button type="submit" className="btn-default btn" onClick={() => {
                        if (selectedAccount === "AGENT") {
                            props.history.push("/agent/registration");
                        }
                    }} >
                        Next
                    </button>
                    <p>
                        Already have an account?
                        {/* <FormattedMessage id="login.donthaveanaccount" /> */}
                        <NavLink to="/agent/login"> Login</NavLink>
                    </p>
                </div>
            </InnerWrapper>
        </Fragment>
    );
}
const InnerWrapper = styled.div`
    margin-top: 100px;
    .accountLogoImageStyle {
        height : 80px;
        width: 80px;
        margin-top : 10px;
    }
    .accountLogoStyle{
        cursor: pointer;
        padding:5px;
        border-radius: 50%;
        width: 120px;
        height: 120px;
    }
    .agent-cat-box {
        background: #FFFFFF;
        box-shadow: 0px 2px 12px rgba(37, 51, 66, 0.15);
        border-radius: 10px;
        padding: 35px 40px;
        max-width: 600px;
        text-align: center;
        margin: 0 15px;
        h2 {
            text-align: center;
            font-style: normal;
            font-weight: bold;
            font-size: 20px;
            line-height: 26px;
            color: #343A40;
            margin-bottom: 20px;
        }
        ul {
            text-align: center;
            li {
                font-weight: 600;
                font-size: 16px;
                line-height: 20px;
                letter-spacing: 0.1px;
                color: #343A40;    
                background: #F2F2F2;
                padding: 10px 20px;
                display: inline-block;
                border-radius: 5px;
                margin: 4px;
                cursor: pointer;
                border: 1px solid transparent;
                
                &:hover {
                    border: 1px solid #DA4139;
                }
                a {
                    color: #343A40;    
                }
            }
        }
        .btn {
            font-weight: 600;
            font-size: 16px;
            line-height: 1;
            color: #FFFFFF;
            text-transform: uppercase;
            margin-top: 70px;
            margin-bottom: 10px;
            height : 40px;
        }
    }
`

export default ChooseRegistrationAccount;
