import React, { Component } from "react";
import "../../../css/dashboard.css";
import "../../../css/merchant_management.css";
import "../../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "./addAccount.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
import { Select, Menu, Dropdown, Modal, DatePicker } from "antd";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import PhoneInput from "react-phone-input-2";
import ClipLoader from "react-spinners/ClipLoader";
import Select2 from "react-select";
import { doesBankAccountExist, getBankAccountCustomerAndSendOTP, verifyBankCustomerOTP } from "../../../services/agent/action";
import { sendOtpToCustomer } from "../../../services/agent/customer_otp_actions";
import { fetchAgentBankAccounts } from "../../../services/agent/bank_account_actions";
import { toastr } from "react-redux-toastr";

const { Option } = Select;
const { Dragger } = Upload;

class AddAccount extends Component {
  constructor(props) {
    super();
    this.state = {
      rows: [
        {
          bankName: "",
          bankCode: "",
          branchCode: "",
          accountNo: "",
          accountKey: "",
          iban: "",
          swift: "",
          mfa: "",
          currency: {
            id: null,
          },
        },
      ],
      currentAccountDetails: [],
      accountDetailsModalShow: false,
      currentAccountNumber: "",
      currentCustomerID: "",
      showOTPCustomerDetails: false,
      bankCustomerData: [],

      agentBankAccountsList: []
    };
  }

  componentDidMount = () => {

    this.props.doesBankAccountExist("");
    this.setState({
      accountDetailsModalShow: false,
    })
    this.props.fetchAgentBankAccounts(sessionStorage.getItem("token"), this.props.profileDetails.bankCustomerId);

  };

  componentWillReceiveProps = (nextprops) => {

    if (nextprops.bankCustomerOTPStatus) {
      this.setState({
        accountDetailsModalShow: false
      })
    }

    if (nextprops.bankAccounts) {
      if (nextprops.bankAccounts.length > 0) {

        this.setState({
          agentBankAccountsList: nextprops.bankAccounts
        }, () => {
          console.log(this.state.agentBankAccountsList, "Agent Bank Accounts List")
        })

      }
    }
    if (nextprops.bankAccountDetailsFetchSuccessful && nextprops.bankAccountData.accNo !== undefined) {

      this.setState({
        currentAccountDetails: nextprops.bankAccountData,
        accountDetailsModalShow: true,
      });

    } else if (nextprops.bankAccountDetailsFetchSuccessful && nextprops.bankAccountData === []) {
      this.setState({
        accountDetailsModalShow: false
      });
    }

    if (nextprops.bankCustomerStatus && nextprops.bankCustomerData) {
      this.setState({
        bankCustomerData: nextprops.bankCustomerData,
        currentCustomerID: nextprops.bankCustomerData.customerId,
        accountDetailsModalShow: true,
      });
    } else {
      this.setState({
        accountDetailsModalShow: false
      });
    }
  }

  handleAddAnotherRow = () => {

    const item = {
      // bankName: "",
      bankCode: "",
      branchCode: "",
      accountNo: "",
      accountKey: "",
      iban: "",
      swift: "",
    };
    this.setState({
      rows: [...this.state.rows, item],
    });

  }

  handleAddRow = () => {
    // const item = {
    //   bankName: "",
    //   bankCode: "",
    //   branchCode: "",
    //   accountNo: "",
    //   accountKey: "",
    //   iban: "",
    //   swift: "",
    //   currency: {
    //     id: null,
    //   },
    // };
    // this.setState({
    //   rows: [...this.state.rows, item],
    // });

    let currentAccount = this.state.rows[this.state.rows.length - 1];
    let accountNumber = `${currentAccount.bankCode}-${currentAccount.branchCode}-${currentAccount.accountNo}-${currentAccount.accountKey}`;

    this.props.doesBankAccountExist(accountNumber);

    this.setState({
      currentAccountNumber: accountNumber,
    });

  };

  handleBankDetails = (e, index) => {
    console.log(e.target.name);

    var name = e.target.name;

    var value = e.target.value;

    var inputs = [...this.state.rows];

    if (name == "currency") {
      inputs[index][name].id = parseFloat(value);
    } else {
      inputs[index][name] = value;
    }

    this.setState({
      rows: inputs,
    });
  };

  sendOTP = () => {
    let data = {
      "customerId": (this.state.currentCustomerID).trim(),
      "customerType": "BANK",
      "mfaChannel": "BOTH"
    }
    this.props.sendOtpToCustomer(sessionStorage.getItem("token"), data);
  }

  render() {

    return (
      <div className="main_contain">
        <div className="merch_m_list_w">
          <div className="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="flCenterColumn mercahntCancel">
                      <div></div>
                      <h1 className="list_top_heading textAlignCenter">
                        Bank Accounts
                      </h1>
                      <button
                        className="c_first_pending_BTN"
                        onClick={this.goBack}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <div className="chartCardMiddle">
                    <div className="accountmainBox">
                      <div className="kycformBox">
                        <h3 className="bankDetails pd_16">Bank Details</h3>
                        <div className="accountTable_wrap">
                          <table className="accountTable">
                            <thead>
                              <th>Bank Code</th>
                              <th>Branch Code</th>
                              <th>Account Number</th>
                              <th>Key</th>
                              <th>IBAN</th>
                              <th>SWIFT</th>
                              <th></th>
                            </thead>
                            <div className="customspaceD"></div>
                            <tbody>
                              {this.state.agentBankAccountsList &&
                                this.state.agentBankAccountsList.length == 0 &&
                                this.state.rows.map((item, index) => (
                                  <tr>
                                    <td>
                                      <input
                                        type="text"
                                        value={this.state.rows[index].bankCode}
                                        placeholder="Code"
                                        name="bankCode"
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={
                                          this.state.rows[index].branchCode
                                        }
                                        placeholder="Branch"
                                        name="branchCode"
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={this.state.rows[index].accountNo}
                                        placeholder="Account Number"
                                        name="accountNo"
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="Key"
                                        value={
                                          this.state.rows[index].accountKey
                                        }
                                        name="accountKey"
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="IBAN"
                                        name="iban"
                                        value={this.state.rows[index].iban}
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="SWIFT"
                                        name="swift"
                                        value={this.state.rows[index].swift}
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td style={{ display: "flex" }}>
                                      <button
                                        onClick={this.handleAddRow}
                                        className="btn  btn-sm btn-success pull-left"
                                      >
                                        Verify
                                      </button>
                                    </td>
                                  </tr>
                                ))}

                              {this.state.agentBankAccountsList &&
                                this.state.agentBankAccountsList.length > 0 &&
                                this.state.agentBankAccountsList.map((item, index) => (
                                  <tr>
                                    <td>
                                      <input
                                        type="text"
                                        value={(item.accNo).split('-')[0]}
                                        placeholder="Code"
                                        style={{ opacity: '0.7' }}
                                        name="bankCode"
                                        disabled={true}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={(item.accNo).split('-')[1]}
                                        placeholder="Branch"
                                        style={{ opacity: '0.7' }}
                                        name="branchCode"
                                        disabled={true}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={(item.accNo).split('-')[2]}
                                        placeholder="Account Number"
                                        style={{ opacity: '0.7' }}
                                        name="accountNo"
                                        disabled={true}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="Key"
                                        value={(item.accNo).split('-')[3]}
                                        name="accountKey"
                                        style={{ opacity: '0.7' }}
                                        disabled={true}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="IBAN"
                                        style={{ opacity: '0.7' }}
                                        name="iban"
                                        disabled={true}
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="SWIFT"
                                        style={{ opacity: '0.7' }}
                                        name="swift"
                                        disabled={true}
                                      />
                                    </td>
                                    <td style={{ display: "flex" }}>
                                      <button
                                        className="btn  btn-sm btn-danger pull-left"
                                      >
                                        Remove
                                      </button>
                                      {/* {
                                        this.state.agentBankAccountsList.length === (index + 1) && (
                                          <button
                                            onClick={this.handleAddAnotherRow}
                                            style={{ marginLeft: "10px" }}
                                            className="btn  btn-sm btn-success pull-left"
                                          >
                                            +
                                          </button>
                                        )
                                      } */}

                                    </td>
                                  </tr>
                                ))}

                              {this.state.agentBankAccountsList &&
                                this.state.agentBankAccountsList.length > 0 &&
                                this.state.rows.map((item, index) => (
                                  <tr>
                                    <td>
                                      <input
                                        type="text"
                                        value={this.state.rows[index].bankCode}
                                        placeholder="Code"
                                        name="bankCode"
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={
                                          this.state.rows[index].branchCode
                                        }
                                        placeholder="Branch"
                                        name="branchCode"
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={this.state.rows[index].accountNo}
                                        placeholder="Account Number"
                                        name="accountNo"
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="Key"
                                        value={
                                          this.state.rows[index].accountKey
                                        }
                                        name="accountKey"
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="IBAN"
                                        name="iban"
                                        value={this.state.rows[index].iban}
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="SWIFT"
                                        name="swift"
                                        value={this.state.rows[index].swift}
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      />
                                    </td>
                                    <td style={{ display: "flex" }}>
                                      <button
                                        onClick={this.handleAddRow}
                                        className="btn  btn-sm btn-success pull-left"
                                      >
                                        Verify
                                      </button>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="bankDBTN_wrap">
                          <button
                            className="bankDBTN"
                            onClick={this.saveBank}
                            style={{ float: "right" }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {
            this.state.accountDetailsModalShow && this.state.bankCustomerData && (
              <Modal
                visible={this.state.accountDetailsModalShow}
                onCancel={() => this.setState({ accountDetailsModalShow: false })}
                style={{ minWidth: "25%" }}
                footer={null}
              >
                <>

                  {
                    this.state.currentAccountDetails.accNo !== undefined && (
                      <>
                        <h2 style={{ marginBottom: "20px" }}>Account Details</h2>

                        <div>
                          <table style={{ width: "100%" }}>
                            <thead>
                              <th></th>
                              <th></th>
                            </thead>
                            <tbody>
                              <tr>
                                <td width="25%" style={{ fontWeight: "bold" }}>Account Number:</td>
                                <td align="right">{this.state.currentAccountDetails.accNo}</td>
                              </tr>
                              <tr>
                                <td width="25%" style={{ fontWeight: "bold" }}>Created Date:</td>
                                <td align="right">{this.state.currentAccountDetails.createDate}</td>
                              </tr>
                              <tr>
                                <td width="25%" style={{ fontWeight: "bold" }}>Currency:</td>
                                <td align="right">{this.state.currentAccountDetails.currency}</td>
                              </tr>
                              <tr>
                                <td width="25%" style={{ fontWeight: "bold" }}>Owner:</td>
                                <td align="right">{this.state.currentAccountDetails.owner}</td>
                              </tr>
                              {
                                this.state.currentAccountDetails.branch !== undefined && (
                                  <>
                                    <tr>
                                      <td width="25%" style={{ fontWeight: "bold" }}>Branch Name:</td>
                                      <td align="right">{this.state.currentAccountDetails.branch.name}</td>
                                    </tr>
                                    <tr>
                                      <td width="25%" style={{ fontWeight: "bold" }}>Branch Code:</td>
                                      <td align="right">{this.state.currentAccountDetails.branch.branchCode}</td>
                                    </tr>
                                    <tr>
                                      <td width="25%" style={{ fontWeight: "bold" }}>Town:</td>
                                      <td align="right">{this.state.currentAccountDetails.branch.town}</td>
                                    </tr>
                                    <tr>
                                      <td width="25%" style={{ fontWeight: "bold" }}>More Details:</td>
                                      <td align="right">
                                        {(this.state.currentAccountDetails.branch.adr).split(',')[0]} <br />
                                        {(this.state.currentAccountDetails.branch.adr).split(',')[1]} <br />
                                        {(this.state.currentAccountDetails.branch.adr).split(',')[2]} <br />
                                        {(this.state.currentAccountDetails.branch.adr).split(',')[3]} <br />
                                      </td>
                                    </tr>
                                  </>
                                )
                              }
                            </tbody>
                          </table>
                        </div>
                      </>
                    )
                  }
                </>

                {
                  this.state.bankCustomerData && (
                    <>
                      <h2 style={{ marginBottom: "20px", marginTop: "20px" }}>Customer Details</h2>

                      <div>
                        <table style={{ width: "100%" }}>
                          <thead>
                            <th></th>
                            <th></th>
                          </thead>
                          <tbody>
                            <tr>
                              <td width="25%" style={{ fontWeight: "bold" }}>Customer ID:</td>
                              <td align="right">{this.state.bankCustomerData.customerId}</td>
                            </tr>
                            <tr>
                              <td width="25%" style={{ fontWeight: "bold" }}>Name:</td>
                              <td align="right">{this.state.bankCustomerData.name}</td>
                            </tr>
                            <tr>
                              <td width="25%" style={{ fontWeight: "bold" }}>Phone Number:</td>
                              <td align="right">{this.state.bankCustomerData.phoneNumber}</td>
                            </tr>
                            <tr>
                              <td width="25%" style={{ fontWeight: "bold" }}>Address:</td>
                              <td align="right">{this.state.bankCustomerData.address}</td>
                            </tr>
                            <tr>
                              <td width="25%" style={{ fontWeight: "bold" }}>ID Card:</td>
                              <td align="right">{this.state.bankCustomerData.idCard}</td>
                            </tr>
                            <tr>
                              <td width="25%" style={{ fontWeight: "bold" }}>ID Expiry Date:</td>
                              <td align="right">{this.state.bankCustomerData.expIdDate}</td>
                            </tr>
                            <tr>
                              <td width="25%" style={{ fontWeight: "bold" }}>Manager:</td>
                              <td align="right">{this.state.bankCustomerData.manager}</td>
                            </tr>
                            <tr>
                              <td width="25%" style={{ fontWeight: "bold" }}>Email:</td>
                              <td align="right">{this.state.bankCustomerData.email}</td>
                            </tr>
                            <br /><br />
                          </tbody>
                        </table>
                      </div>
                    </>
                  )
                }
                <>
                  <table>
                    <tr>
                      <td>
                        <input placeholder="Enter OTP" onChange={(e) => {
                          if ((e.target.value).length === 6 && (this.state.bankCustomerData.phoneNumber).length > 5) {
                            let payload = {
                              "phoneNumber": this.state.bankCustomerData.phoneNumber,
                              "mfaCode": e.target.value
                            }
                            this.props.verifyBankCustomerOTP(payload);
                          }
                        }} style={{ width: "100%", marginLeft: "40%", textAlign: "center" }} type="text" />
                      </td>
                    </tr>
                    <tr>
                      <button style={{ marginLeft: "60%", marginTop: "30px" }} className="submitBTNBN" onClick={() => this.sendOTP()}>
                        Send OTP
                      </button>
                    </tr>

                  </table>
                </>
              </Modal>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ agentReducer }) => {
  return {
    bankAccountDetailsFetchSuccessful: agentReducer.bankAccountDetailsFetchSuccessful,
    bankAccountData: agentReducer.bankAccountData,
    bankCustomerData: agentReducer.bankCustomerData,
    bankCustomerStatus: agentReducer.bankCustomerStatus,
    profileDetails: agentReducer.profile.data,
    bankAccounts: agentReducer.bankAccounts.list,
    bankCustomerOTPStatus: agentReducer.bankCustomerOTPStatus
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doesBankAccountExist: (bankAccountNumber) => dispatch(doesBankAccountExist(bankAccountNumber)),
    sendOtpToCustomer: (token, payload) => dispatch(sendOtpToCustomer(token, payload)),
    fetchAgentBankAccounts: (token, bankCustomerID) => dispatch(fetchAgentBankAccounts(token, bankCustomerID)),
    verifyBankCustomerOTP: (payload) => dispatch(verifyBankCustomerOTP(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount);
