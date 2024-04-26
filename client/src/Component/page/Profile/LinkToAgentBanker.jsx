import React, { useState, useEffect, useRef } from "react";
import "../../../css/ag-grid-customization01.css";

import "../Settings/General/formfromold.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

const LinkToAgentBanker = () => {
  const [customerID, setCustomerID] = useState("");

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
              <button className="aryousureBTN confirmBtnR">Link</button>
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
                      Link to Agent Banker
                    </h1>
                  </div>
                </div>
                <div className="chartCardMiddle" style={{ padding: "24px" }}>
                  <div
                    // className={classes.root}
                    style={{ width: "60%", margin: "auto" }}
                  >
                    <div style={{ margin: "16px 0px" }}>
                      {bankCustomerIDForm()}
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

export default LinkToAgentBanker;
