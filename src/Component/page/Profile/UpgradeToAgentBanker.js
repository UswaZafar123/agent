import React, { useState, useEffect, useRef } from "react";
import "../../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "../Settings/General/formfromold.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { agentToAgentBankerUpgradeRequest } from "../../../services/agent/action";
import actionType from "../../../services/agent/actionType";
import { FormattedMessage, IntlProvider } from 'react-intl';

const UpgradeToAgentBanker = () => {
    const [customerID, setCustomerID] = useState("");
    const [showAgentBankerDetails, setShowAgentBankerDetails] = useState(false);

    const dispatch = useDispatch();

    const [messages, setMessages] = useState("");
    const [language, setLanguage] = useState("");
  
    const lan = useSelector(state => state.commonReducer.language);

    const agentBankerUpgradeData = useSelector(
        (state) => state.agentReducer.agentBankerUpgradeData
    );
    const agentBankerUpgradeStatus = useSelector(
        (state) => state.agentReducer.agentBankerUpgradeStatus
    );

    useEffect(() => {

        dispatch({
            type: actionType.AGENT_BANKER_UPGRADE_REQUEST_FAILURE,
        });

    }, [])

    useEffect(() => {

        if (agentBankerUpgradeStatus && agentBankerUpgradeData !== null)
            setShowAgentBankerDetails(true)
        else
            setShowAgentBankerDetails(false)

    }, [agentBankerUpgradeStatus, agentBankerUpgradeData])

    useEffect(async () => {

        const messages = await loadLocaleData(localStorage.getItem("lang"));
        setMessages(messages);
    
        setLanguage(localStorage.getItem("lang"));
    
        // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");
    
      }, [])
    
      const loadLocaleData = (locale) => {
        switch (locale) {
          case "fr":
            return import("../../i18n/messages/fr.js");
          default:
            return import("../../i18n/messages/en.js");
        }
      };
    
      useEffect(async () => {
    
        const messages = await loadLocaleData(lan);
        setMessages(messages);
    
        setLanguage(lan);
    
      }, [lan])

    const sendUpgradeRequest = () => {

        let payload = {
            "bankCustomerId": customerID
        }

        dispatch(agentToAgentBankerUpgradeRequest(payload));

    }

    const transactionDetails = () => {
        return (
            <>
                <div className="containerBiaN_form">
                    <div className="containerBiaN_f_row">
                        <div className="containerBiaN_f_col">
                            <h2>Agent Banker Upgrade Details</h2>
                        </div>
                    </div>
                    <div className="containerBiaN_f_row">
                        <div className="containerBiaN_f_col">
                            <div style={{ display: "flex" }}>
                                <p style={{ marginRight: "16px", color: "gray" }}>
                                    Bank Name
                                </p>
                                <p style={{ fontWeight: "bold" }}>{agentBankerUpgradeData.customerBankName}</p>
                            </div>
                            <div style={{ display: "flex" }}>
                                <p style={{ marginRight: "16px", color: "gray" }}>
                                    Bank Phone
                                </p>
                                <p style={{ fontWeight: "bold" }}>{agentBankerUpgradeData.customerBankPhone}</p>
                            </div>
                            <div style={{ display: "flex" }}>
                                <p style={{ marginRight: "16px", color: "gray" }}>Bank Email</p>
                                <p style={{ fontWeight: "bold" }}>{`${agentBankerUpgradeData.customerBankEmail}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };

    const bankCustomerIDForm = () => {
        return (
            <>
                <div>
                    <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
                        <label>
                            <FormattedMessage id="agent.BankCustomerID" /> <span className="mantdat">*</span>
                        </label>
                    </div>
                    <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
                        <FormattedMessage id="agent.EnterBankCustomerId">
                            {placeholder =>
                        <input
                            placeholder={placeholder}
                            type="number"
                            value={customerID}
                            onChange={(e) => setCustomerID(e.target.value)}
                        />}
                        </FormattedMessage>
                    </div>
                    <div style={{ marginTop: "40px" }}>
                        <div className="confirm_p_w button-container rspacing">
                            <button
                                className="aryousureBTN confirmBtnR"
                                style={{ opacity: customerID === "" ? "0.5" : "1", cursor: customerID === "" ? "no-drop" : "pointer" }}
                                onClick={() => sendUpgradeRequest()}
                                disabled={customerID === "" ? true : false}
                            >
                                Upgrade
                            </button>
                        </div>
                    </div>
                </div>
            </>
        );
    };
    return (
        <IntlProvider
        messages={messages.default}
        locale={language}
      >
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
                                            <FormattedMessage id="agent.UpgradetoAgentBanker" />
                                        </h1>
                                    </div>
                                </div>
                                <div className="chartCardMiddle" style={{ padding: "24px" }}>
                                    <div
                                        // className={classes.root}
                                        style={{ width: "60%", margin: "auto" }}
                                    >
                                        <div style={{ margin: "16px 0px" }}>
                                            {!showAgentBankerDetails ? (
                                                bankCustomerIDForm()
                                            ) : showAgentBankerDetails && agentBankerUpgradeStatus && agentBankerUpgradeData && (
                                                <>
                                                    {
                                                        transactionDetails()
                                                    }
                                                </>)}
                                        </div>
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

export default UpgradeToAgentBanker;
