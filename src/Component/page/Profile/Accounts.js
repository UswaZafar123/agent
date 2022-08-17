import React, { Component } from 'react';
import '../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import './formfromold.css'
import './addAccount.css'

// import myImage from "../../BIAPAYNPM/src/logos_copy.png";

import { Select, DatePicker, Modal, Switch, Upload, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { FormattedMessage, IntlProvider } from 'react-intl';
const dateFormat = 'YYYY/MM/DD';
// const customFormat = value => `custom format: ${value.format(dateFormat)}`;
const { Option } = Select;
const { Dragger } = Upload;




function handleChange(value) {
  console.log(`selected ${value}`);
}
function onChange(value) {
  console.log(`selected ${value}`);
}


class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      valueRadio: 1,
      info: false,
      messages: "",
      language: ""


    }



  }

  async translationHelperFunction() {

    const messages = await this.loadLocaleData(localStorage.getItem("lang"));
    this.setState({
      messages: messages,
      language: localStorage.getItem("lang")
    });
    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");

  }

  loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../../i18n/messages/fr.js");
      default:
        return import("../../i18n/messages/en.js");
    }
  };

  showInfo() {
    // this.setState({ info: true });
  }
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  back = () => {
    this.props.cancel()
  }

  componentDidMount() {
    this.translationHelperFunction();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.language) {
      const messages = await this.loadLocaleData(nextProps.language);

      this.setState({
        messages: messages,
        language: nextProps.language
      });
    }
  }
  render() {
    return (
      <>
        <IntlProvider
          messages={this.state.messages.default}
          locale={this.state.language}
        >
          <div className="main_contain">
            <div className="merch_m_list_w">
              <div className="merch_list_card" id="merch_list_card">
                <div className="section_custom">
                  <div className="sectionInn">
                    <div className="chartCard_w">
                      <div className="chartCardTop">
                        <div className="flCenterColumn">
                          <h1 className="list_top_heading textAlignCenter">
                            <FormattedMessage id="agent.Accounts" />
                          </h1>
                        </div>
                      </div>


                      <div className="chartCardMiddle">
                        <div className="accountmainBox">
                          <div className="kycformBox">
                            <h3 className="bankDetails pd_16">
                              <FormattedMessage id="agent.BankDetails" />

                            </h3>
                            <div className="accountTable_wrap">
                              <table className="accountTable foroverwrite">
                                <thead>
                                  <th>
                                    <FormattedMessage id="agent.BankName" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.BankCode" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.BranchCode" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.AccountNumber" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.Key" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.Currency" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.IBAN" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.SWIFT" />

                                  </th>
                                  <th></th>
                                </thead>
                                <div className="customspaceD"></div>
                                <tbody>
                                  <tr>
                                    <td>
                                      <Select defaultValue="Select Bank" style={{ width: 100 + "%" }}
                                        className="tableSelect"
                                        value={"bank"}
                                        onChange={this.handleChange}

                                      >
                                        <Option value={'1'}>Axis Bank</Option>
                                        <Option value={'1'}>HDFC Bank</Option>
                                        <Option value={'1'}>Kotak Bank</Option>
                                      </Select>
                                    </td>
                                    {/* <td><input type="text" placeholder="Bank Code" /></td> */}
                                    <td>
                                      <FormattedMessage id="agent.BankCode">
                                        {
                                          (word) => <input type="text" placeholder={word} />
                                        }
                                      </FormattedMessage>
                                    </td>
                                    <td>
                                      <FormattedMessage id="agent.BranchCode">
                                        {
                                          (word) => <input type="text" placeholder={word} />
                                        }
                                      </FormattedMessage>
                                    </td>
                                    <td>
                                      <FormattedMessage id="agent.AccountNumber">
                                        {
                                          (word) => <input type="text" placeholder={word} />
                                        }
                                      </FormattedMessage>
                                    </td>
                                    <td>
                                      <FormattedMessage id="agent.Key">
                                        {
                                          (word) => <input type="text" placeholder={word} />
                                        }
                                      </FormattedMessage>
                                    </td>
                                    <td>
                                      <FormattedMessage id="agent.Currency">
                                        {
                                          (word) => <input type="text" placeholder={word} />
                                        }
                                      </FormattedMessage>
                                    </td>
                                    <td>
                                      <FormattedMessage id="agent.IBAN">
                                        {
                                          (word) => <input type="text" placeholder={word} />
                                        }
                                      </FormattedMessage>
                                    </td>
                                    <td>
                                      <FormattedMessage id="agent.SWIFT">
                                        {
                                          (word) => <input type="text" placeholder={word} />
                                        }
                                      </FormattedMessage>
                                    </td>
                                    {/* <td><input type="text" placeholder="Bank Code" /></td>
                                    <td><input type="text" placeholder="Bank Code" /></td>
                                    <td><input type="text" placeholder="Bank Code" /></td>
                                    <td><input type="text" placeholder="Bank Code" /></td>
                                    <td><input type="text" placeholder="Bank Code" /></td>
                                    <td><input type="text" placeholder="Bank Code" /></td> */}
                                    <td style={{ display: "flex" }}>
                                      <button className="rowAddButton">+</button>
                                      <button className="rowdeleteButton">-</button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="bankDBTN_wrap">
                                <button className="bankDBTN">
                                  <FormattedMessage id="agent.SaveBankDetails" />

                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="accountmainBox">
                          <div className="kycformBox">
                            <h3 className="bankDetails pd_16">
                              <FormattedMessage id="agent.MobileAccountsDetails" />
                            </h3>
                            <div className="accountTable_wrap">
                              <table className="accountTable foroverwrite">
                                <thead>
                                  <th><FormattedMessage id="agent.Operators" /></th>
                                  <th><FormattedMessage id="agent.MobileNumber" /></th>
                                  <th><FormattedMessage id="agent.Country" /></th>
                                  <th></th>
                                  <th></th>
                                </thead>
                                <div className="customspaceD"></div>
                                <tbody>
                                  <tr>
                                    <td>
                                      <Select defaultValue="Select Operators" style={{ width: 100 + "%" }}
                                        className="tableSelect"
                                        value={"Operator"}
                                        onChange={this.handleChange}

                                      >
                                        <Option value={'1'}>Operator1</Option>
                                        <Option value={'1'}>Operator2</Option>
                                        <Option value={'1'}>Operator3</Option>
                                      </Select>
                                    </td>
                                    <td>
                                      <Select defaultValue="Select Mobile No" style={{ width: 100 + "%" }}
                                        className="tableSelect"
                                        value={"Mobile No"}
                                        onChange={this.handleChange}

                                      >
                                        <Option value={'1'}>9854785412</Option>
                                        <Option value={'1'}>9854785412</Option>
                                        <Option value={'1'}>9854785412</Option>
                                      </Select>
                                    </td>
                                    <td>
                                      <Select defaultValue="Select Country" style={{ width: 100 + "%" }}
                                        className="tableSelect"
                                        value={"Country"}
                                        onChange={this.handleChange}

                                      >
                                        <Option value={'1'}>India</Option>
                                        <Option value={'1'}>USA</Option>
                                        <Option value={'1'}>Sauth Africa</Option>
                                      </Select>
                                    </td>
                                    <td>
                                      <span class="badge badge-pill badge-success">
                                        <FormattedMessage id="agent.Verified" />
                                      </span>
                                      <a style={{
                                        textDecoration: "underline",
                                        color: "blue",
                                        fontSize: "11px"
                                      }} >
                                      </a>
                                    </td>
                                    <td style={{ display: "flex" }}>
                                      <button className="rowdeleteButton">-</button>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <Select defaultValue="Select Operators" style={{ width: 100 + "%" }}
                                        className="tableSelect"
                                        value={"Operator"}
                                        onChange={this.handleChange}

                                      >
                                        <Option value={'1'}>Operator1</Option>
                                        <Option value={'1'}>Operator2</Option>
                                        <Option value={'1'}>Operator3</Option>
                                      </Select>
                                    </td>
                                    <td>
                                      <Select defaultValue="Select Mobile No" style={{ width: 100 + "%" }}
                                        className="tableSelect"
                                        value={"Mobile No"}
                                        onChange={this.handleChange}

                                      >
                                        <Option value={'1'}>9854785412</Option>
                                        <Option value={'1'}>9854785412</Option>
                                        <Option value={'1'}>9854785412</Option>
                                      </Select>
                                    </td>
                                    <td>
                                      <Select defaultValue="Select Country" style={{ width: 100 + "%" }}
                                        className="tableSelect"
                                        value={"Country"}
                                        onChange={this.handleChange}

                                      >
                                        <Option value={'1'}>India</Option>
                                        <Option value={'1'}>USA</Option>
                                        <Option value={'1'}>Sauth Africa</Option>
                                      </Select>
                                    </td>
                                    <td>
                                      <span class="badge badge-pill badge-danger">
                                        <FormattedMessage id="agent.NotVerified" />                                      </span>
                                      <a style={{
                                        textDecoration: "underline",
                                        color: "blue",
                                        fontSize: "11px"
                                      }} >
                                      </a>
                                    </td>
                                    <td style={{ display: "flex" }}>
                                      <button className="rowAddButton">+</button>
                                      <button className="rowdeleteButton">-</button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="bankDBTN_wrap">
                                <button className="bankDBTN">
                                  <FormattedMessage id="agent.SaveMobileAccountsDetails" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="accountmainBox">
                          <div className="kycformBox">
                            <h3 className="bankDetails pd_16">
                              <FormattedMessage id="agent.CreditCardDetails" />
                            </h3>
                            <div className="accountTable_wrap">
                              <table className="accountTable foroverwrite">
                                <thead>
                                  <th>
                                    <FormattedMessage id="agent.SelectCardType" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.Name" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.Number" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.CardExpiry" />

                                  </th>
                                  <th colspan="4">
                                    <FormattedMessage id="agent.InvoiceAddress" />

                                  </th>
                                </thead>
                                <thead>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th></th>
                                  <th>
                                    <FormattedMessage id="agent.Street" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.City" />

                                  </th>
                                  <th>
                                    <FormattedMessage id="agent.Country" />

                                  </th>
                                  <th></th>
                                </thead>
                                <div className="customspaceD"></div>
                                <tbody>
                                  <tr>
                                    <td>
                                      <Select defaultValue="Select Operators" style={{ width: 100 + "%" }}
                                        className="tableSelect"
                                        value={"Operator"}
                                        onChange={this.handleChange}

                                      >
                                        <Option value={'1'}>Operator1</Option>
                                        <Option value={'1'}>Operator2</Option>
                                        <Option value={'1'}>Operator3</Option>
                                      </Select>
                                    </td>
                                    <td>
                                      <input type="text" />
                                    </td>
                                    <td>
                                      <input type="text" />
                                    </td>
                                    <td>
                                      <DatePicker
                                        // selected={this.state.dateOfBirthValue}
                                        maxDate={new Date()}
                                        className="form-control"
                                        name="dateofbirth"
                                        value={""}
                                        onChange={onChange}
                                        // format={dateFormat}
                                        style={{ width: 100 + "%", height: 32 }}
                                        defaultValue={""}
                                      />
                                    </td>
                                    <td>
                                      <input type="text" />
                                    </td>
                                    <td>
                                      <input type="text" />
                                    </td>
                                    <td>
                                      <Select defaultValue="Select Mobile No" style={{ width: 100 + "%" }}
                                        className="tableSelect"
                                        value={"Mobile No"}
                                        onChange={this.handleChange}

                                      >
                                        <Option value={'1'}>9854785412</Option>
                                        <Option value={'1'}>9854785412</Option>
                                        <Option value={'1'}>9854785412</Option>
                                      </Select>
                                    </td>
                                    <td style={{ display: "flex" }}>
                                      <button className="rowAddButton">+</button>
                                      <button className="rowdeleteButton">-</button>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <div className="bankDBTN_wrap">
                                <button className="bankDBTN">
                                  <FormattedMessage id="agent.SaveCreditCardDetails" />

                                </button>
                              </div>
                            </div>
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
      </>
    );
  }
}

const mapStateToProps = ({ commonReducer }) => {
  const { language } = commonReducer

  return {
    language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(Accounts)