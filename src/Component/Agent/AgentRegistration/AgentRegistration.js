import React, { Fragment } from "react";
import NavBar from "./../../common/register/NavBar";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

function AgentRegistration(props) {
    return (
        <Fragment>
            <NavBar />
            <InnerWrapper className="agent-registration-container">
                <div className="agent-cat-box">
                    <h2>Please select the type of Account you want to Open </h2>
                    <ul>
                        <li><NavLink to="/agent/individual"> Individual</NavLink> </li>
                        <li>ETS</li>
                        <li>SA</li>
                        <li>SARL</li>
                        <li>SAS</li>
                    </ul>
                    <button type="submit" className="btn-default btn" >
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
    .agent-cat-box {
        background: #FFFFFF;
        box-shadow: 0px 2px 12px rgba(37, 51, 66, 0.15);
        border-radius: 10px;
        padding: 35px 40px;
        max-width: 550px;
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
            margin-top: 30px;
            margin-bottom: 10px;
        }
    }
`

export default AgentRegistration;
