import React, { Component } from "react";
import { Select } from "antd";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { linkingVerification } from "../../../services/agent/action";

const { Option } = Select;

class Linking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mfa: "",
      data: this.props.location ? this.props.location.data : [],
      accountNumber: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {}

  save = () => {
    var payload = {
      bankAccountNumber: this.state.accountNumber,
      mfaToken: this.state.mfa,
      coreBankName: this.state.data.customerBankName,
      coreBankPhone: this.state.data.customerBankPhone,
      coreBankEmail: this.state.data.customerBankEmail,
    };
    this.props.linkingVerification(sessionStorage.getItem("token"), payload);
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    return (
      <div className="main_contain responsive_p">
        <div className="merch_m_list_w">
          <div className="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="kyccustomformheading">
                      <h1 className="zeropadding list_top_heading textAlignCenter text-center">
                        Account Linking Verification
                      </h1>
                    </div>
                  </div>
                  <div
                    className="kyccustomform chartCardMiddle p_d_all_24"
                    style={{ padding: "24px" }}
                  >
                    <div className="fornContainer_a">
                    <div className="row_a">
                    <label>MFA code has been sent to</label>
                    <div className="input_wrapper_a">
                    <span className="MFAResultText">
                    {this.state.data
                            ? this.state.data.customerBankPhone
                            : ""}
                    </span>
                    </div>
                  </div>
                  <div className="row_a">
                    <label>Bank Account Name</label>
                    <div className="input_wrapper_a">
                    <input
                    type="text"
                    name="accountNumber"
                    value={
                    this.state.data
                    ? this.state.data.customerBankName
                    : ""
                    }
                    />
                    </div>
                  </div>
                  <div className="row_a">
                    <label>Customer Phone Number</label>
                    <div className="input_wrapper_a">
                    <input
                                type="text"
                                value={
                                  this.state.data
                                    ? this.state.data.customerBankPhone
                                    : ""
                                }
                                name="customerId"
                              />
                    </div>
                  </div>
                  <div className="row_a">
                    <label>Customer Email</label>
                    <div className="input_wrapper_a">
                    <input
                                type="text"
                                value={
                                  this.state.data
                                    ? this.state.data.customerBankEmail
                                    : ""
                                }
                                name="customerId"
                              />
                    </div>
                  </div>
                  <div className="row_a">
                    <label>MFA Code</label>
                    <div className="input_wrapper_a">
                    <input
                                type="text"
                                value={this.state.mfa}
                                name="mfa"
                                onChange={this.handleChange}
                              />
                    </div>
                  </div>
                  <div className="row_a">
                    <label>Account Number</label>
                    <div className="input_wrapper_a">
                    <input
                                type="text"
                                value={this.state.accountNumber}
                                name="accountNumber"
                                onChange={this.handleChange}
                              />
                    </div>
                  </div>

                  </div>


                    <div style={{ margin: "0 auto", display: "table" }}>
                      {/* <h4>
                        MFA code has been sent to &ensp;
                        <strong>
                          {this.state.data
                            ? this.state.data.customerBankPhone
                            : ""}
                        </strong>
                      </h4> */}
                      {/* <table className="table table-responsive table-borderless">
                        <tbody>
                          <tr>
                            <td>BankAccountName</td>
                            <td>
                              <input
                                type="text"
                                name="accountNumber"
                                value={
                                  this.state.data
                                    ? this.state.data.customerBankName
                                    : ""
                                }
                              />
                            </td>
                          </tr>
                          <br></br>
                          <tr>
                            <td>CustomerPhone Number</td>
                            <td>
                              <input
                                type="text"
                                value={
                                  this.state.data
                                    ? this.state.data.customerBankPhone
                                    : ""
                                }
                                name="customerId"
                              />
                            </td>
                          </tr>
                          <br></br>
                          <tr>
                            <td>Customer Email</td>
                            <td>
                              <input
                                type="text"
                                value={
                                  this.state.data
                                    ? this.state.data.customerBankEmail
                                    : ""
                                }
                                name="customerId"
                              />
                            </td>
                          </tr>
                          <br></br>
                          <tr>
                            <td>MFA code</td>
                            <td>
                              <input
                                type="text"
                                value={this.state.mfa}
                                name="mfa"
                                onChange={this.handleChange}
                              />
                            </td>
                          </tr>
                          <br></br>
                          <tr>
                            <td>AccountNumber</td>
                            <td>
                              <input
                                type="text"
                                value={this.state.accountNumber}
                                name="accountNumber"
                                onChange={this.handleChange}
                              />
                            </td>
                          </tr>{" "}
                        </tbody>
                      </table> */}
                    </div>

                    <div>
                      <div class="custom-d-flex confirm_p_w mTB00 button-container">
                        <button class="blackbtn aryousureBTN confirmBtnR">
                          Cancel
                        </button>
                        {this.state.data && (
                          <button
                            class="aryousureBTN confirmBtnR"
                            disabled={this.state.data?.length == 0}
                            onClick={this.save}
                          >
                            Submit
                          </button>
                        )}
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
  }
}

const mapStateToProps = ({ agentReducer }) => {
  // const{linkingStatus,linkingList}=agentReducer
  // return{
  //     linkingStatus,
  //     linkingList
  // }
};

const mapDispatchToProps = (dispatch) => {
  return {
    linkingVerification: (token, data) =>
      dispatch(linkingVerification(token, data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Linking);
