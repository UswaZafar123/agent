import React, { useState, useEffect, useRef } from "react";
import "../../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "../Settings/General/formfromold.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { agentToAgentBankerUpgradeRequest } from "../../../services/agent/action";
import actionType from "../../../services/agent/actionType";

const UpgradeToAgentBanker = () => {
    const [customerID, setCustomerID] = useState("");
    const [showAgentBankerDetails, setShowAgentBankerDetails] = useState(false);

    const dispatch = useDispatch();

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
                            Bank Customer ID <span className="mantdat">*</span>
                        </label>
                    </div>
                    <div className="containerBiaN_f_col" style={{ padding: "0px" }}>
                        <input
                            placeholder="Enter Bank Customer ID"
                            type="number"
                            value={customerID}
                            onChange={(e) => setCustomerID(e.target.value)}
                        />
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
                                            Upgrade to Agent Banker
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
    );
};

export default UpgradeToAgentBanker;
