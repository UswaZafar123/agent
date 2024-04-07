import React, { Fragment, useState, useEffect } from "react";
import NavBar from "./../../common/register/NavBar";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FormattedMessage, IntlProvider } from "react-intl";

function AgentRegistration(props) {
  const [selectedAccount, setSelectedAccount] = useState("");
  const [messages, setMessages] = useState("");
  const [language, setLanguage] = useState("");

  const lan = useSelector((state) => state.commonReducer.language);
  const loadLocalDataas = async () => {
    const messages = await loadLocaleData(localStorage.getItem("lang"));
    setMessages(messages);

    setLanguage(localStorage.getItem("lang"));
  };
  const loadLocaleDatas = async () => {
    const messages = await loadLocaleData(lan);
    setMessages(messages);

    setLanguage(lan);
  };
  useEffect(() => {
    loadLocalDataas();

    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");
  }, []);

  useEffect(() => {
    loadLocaleDatas();
  }, [lan]);

  const loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../../i18n/messages/fr");
      default:
        return import("../../i18n/messages/en");
    }
  };

  return (
    <Fragment>
      <NavBar />
      <IntlProvider messages={messages.default} locale={language}>
        <InnerWrapper className="agent-registration-container">
          <div className="agent-cat-box">
            <h2>
              <FormattedMessage id="agent.selectTypeAccount" />
            </h2>
            {/* <h2>Please select the type of Account you want to Open </h2> */}
            <ul>
              <li
                onClick={() => {
                  sessionStorage.setItem("accountType", "Individual");
                  setSelectedAccount("IND");
                }}
                style={{
                  background: selectedAccount === "IND" ? "#00479a" : "",
                  color: selectedAccount === "IND" ? "white" : "",
                }}
              >
                Individual
              </li>
              <li
                onClick={() => {
                  sessionStorage.setItem("accountType", "ETS");
                  setSelectedAccount("ETS");
                }}
                style={{
                  background: selectedAccount === "ETS" ? "#00479a" : "",
                  color: selectedAccount === "ETS" ? "white" : "",
                }}
              >
                ETS
              </li>
              <li
                onClick={() => {
                  sessionStorage.setItem("accountType", "SA");
                  setSelectedAccount("SA");
                }}
                style={{
                  background: selectedAccount === "SA" ? "#00479a" : "",
                  color: selectedAccount === "SA" ? "white" : "",
                }}
              >
                SA
              </li>
              <li
                onClick={() => {
                  sessionStorage.setItem("accountType", "SARL");
                  setSelectedAccount("SARL");
                }}
                style={{
                  background: selectedAccount === "SARL" ? "#00479a" : "",
                  color: selectedAccount === "SARL" ? "white" : "",
                }}
              >
                SARL
              </li>
              <li
                onClick={() => {
                  sessionStorage.setItem("accountType", "SAS");
                  setSelectedAccount("SAS");
                }}
                style={{
                  background: selectedAccount === "SAS" ? "#00479a" : "",
                  color: selectedAccount === "SAS" ? "white" : "",
                }}
              >
                SAS
              </li>
            </ul>
            <NavLink to="/agent/register">
              <button type="submit" className="btn-default btn">
                Next
              </button>
            </NavLink>

            <p>
              Already have an account?
              <NavLink to="/agent/login"> Login</NavLink>
            </p>
          </div>
        </InnerWrapper>
      </IntlProvider>
    </Fragment>
  );
}
const InnerWrapper = styled.div`
  margin-top: 100px;
  .agent-cat-box {
    background: #ffffff;
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
      color: #343a40;
      margin-bottom: 20px;
    }
    ul {
      text-align: center;
      li {
        font-weight: 600;
        font-size: 16px;
        line-height: 20px;
        letter-spacing: 0.1px;
        color: #343a40;
        background: #f2f2f2;
        padding: 10px 20px;
        display: inline-block;
        border-radius: 5px;
        margin: 4px;
        cursor: pointer;
        border: 1px solid transparent;

        &:hover {
          border: 1px solid #00479a;
          background: #00479a;
          color: white;
        }
        a {
          color: #343a40;
        }
      }
    }
    .btn {
      font-weight: 600;
      font-size: 16px;
      line-height: 1;
      color: #ffffff;
      text-transform: uppercase;
      margin-top: 30px;
      margin-bottom: 10px;
    }
  }
`;

export default AgentRegistration;
