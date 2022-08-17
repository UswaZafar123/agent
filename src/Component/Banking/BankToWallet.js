import React, { useState, useEffect } from "react";
import "../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "../page/Settings/General/formfromold.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Button, Select } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage, IntlProvider } from "react-intl";
import { getLocalBanks } from "../../services/agent/action";
import { toastr } from "react-redux-toastr";

const { Option } = Select;
const resendTime = 30;

const BankToWallet = () => {
  const [messages, setMessages] = useState("");
  const [language, setLanguage] = useState("");
  const [bank, setBank] = useState("");
  const [walletID, setwalletID] = useState("");
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const lan = useSelector((state) => state.commonReducer.language);

  const dispatch = useDispatch();

  const localBanks = useSelector((state) => state.agentReducer.localBanksData ? state.agentReducer.localBanksData : []);

  useEffect(() => {

    console.log(localBanks, "LOCAL BANKS DATA")

  }, [localBanks])

  useEffect(async () => {
    const messages = await loadLocaleData(localStorage.getItem("lang"));
    setMessages(messages);

    setLanguage(localStorage.getItem("lang"));
  }, []);

  const loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../i18n/messages/fr.js");
      default:
        return import("../i18n/messages/en.js");
    }
  };

  useEffect(async () => {
    const messages = await loadLocaleData(lan);
    setMessages(messages);

    setLanguage(lan);
  }, [lan]);

  useEffect(() => {
    dispatch(getLocalBanks());
  }, []);

  return (
    <IntlProvider messages={messages.default} locale={language}>
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
                        Bank to Wallet
                      </h1>
                    </div>
                  </div>
                  <div className="chartCardMiddle" style={{ padding: "24px" }}>
                    <>
                      <div className="containerBiaN_form">
                        <div className="containerBiaN_f_row">
                          <div className="containerBiaN_f_col width30percent textAlignRight">
                            <label>
                              Bank{" "}
                              <span className="mantdat">*</span>
                            </label>
                          </div>
                          <div className="containerBiaN_f_col width70percent">
                            <div className="categorySelect">
                              <Select
                                style={{ width: 100 + "%", height: 52 }}
                                value={bank}
                                onChange={(e) => setBank(e)}
                              >
                                <Option value="" disabled>
                                  Select a Bank
                                </Option>
                                {
                                  localBanks && localBanks.length > 0 ? localBanks.map((bank) => {
                                    return (
                                      <Option value={bank.bankCode}>
                                        {bank.bankName}
                                      </Option>
                                    );
                                  }) : <></>}
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="containerBiaN_f_row">
                          <div className="containerBiaN_f_col width30percent textAlignRight">
                            <label>
                              Wallet ID{" "}
                              <span className="mantdat">*</span>
                            </label>
                          </div>
                          <div className="containerBiaN_f_col width70percent">
                            <input
                              placeholder="Enter Wallet ID"
                              type="number"
                              value={walletID}
                              onChange={(e) => {
                                if (walletID.length !== 11) {
                                  setwalletID(e.target.value);
                                } else if (e.target.value.length < 11) {
                                  setwalletID(e.target.value)
                                } else {

                                  toastr.info("Account Number Should Be of 11 Digits..")

                                }
                              }}
                            />
                          </div>
                        </div>

                        <div className="containerBiaN_f_row">
                          <div className="containerBiaN_f_col width30percent textAlignRight">
                            <label>
                              Amount{" "}
                              <span className="mantdat">*</span>
                            </label>
                          </div>
                          <div className="containerBiaN_f_col width70percent">
                            <input
                              placeholder="Enter Amount"
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="containerBiaN_f_row">
                          <div className="containerBiaN_f_col width30percent textAlignRight">
                            <label>
                              Reason{" "}
                              <span className="mantdat">*</span>
                            </label>
                          </div>
                          <div className="containerBiaN_f_col width70percent">
                            <textarea
                              placeholder="Enter Reason"
                              type="text"
                              value={reason}
                              onChange={(e) => setReason(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  </div>
                  <div style={{ width: "100%", float: "left" }}>
                    <div className="confirm_p_w mTB00 button-container rspacing">
                      <Button
                        className="aryousureBTN confirmBtnR"
                      >
                        <FormattedMessage id="agent.Next" />
                      </Button>
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

export default BankToWallet;
