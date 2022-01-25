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
// import {
//   getCurrencies,
//   getMerchantProfileBank,
//   getMerchantProfileCards,
//   addBankDetails,
//   deleteBankAccount,
//   getMobileOperators,
//   getCountries,
//   createMobileAccounts,
//   deleteMobileAccounts,
//   getMerchantProfileMobile,
//   sendVerificationCode,
//   sendVerificationCodeFlase,
//   validateMFA,
//   getCardTypes,
//   addCardsDetails,
//   getAllBanks,
// } from "../../../services/actions";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";
import Select2 from "react-select";
import { data } from "jquery";
// import adminReducer from "../../../../services/admin/reducer";

const { Option } = Select;
const { Dragger } = Upload;

// const customStyles = {

//   control: () => ({
//     // none of react-select's styles are passed to <Control />
//     width: "200px",
//   })
// }

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

      verificationData: [],
      verificationState: false,
      statusCheck: false,
      loading: true,
      anotherstate: false,
      currencies: [],
      countries: [],
      cardTypes: [],
      initialMobileState: true,
      showMoreMobilestate: false,
      showCreditCardstate: false,
      showMoreBankstate: false,
      mobileOperators: [],
      getCurencyListDataStatus: false,
      rowsMobile: [
        {
          operator: {
            operator_id: null,
          },
          country: {
            id: null,
          },
          phoneNumber: "",
          isCustomerWallet: false,
        },
      ],
      rowsBank: [
        {
          cardType: {
            card_type_id: null,
          },
          name: "",
          number: "",
          expiryDate: null,
          invoiceAddress: {
            address_id: null,
            street: "",
            city: "",
            country: {
              id: null,
            },
          },
        },
      ],
      bank: [],
      mobile: [],
      creditcards: [],
      selectOptions: [],
    };
  }

  componentDidMount = () => {

  };


  handleAddRow = () => {
    const item = {
      bankName: "",
      bankCode: "",
      branchCode: "",
      accountNo: "",
      accountKey: "",
      iban: "",
      swift: "",
      currency: {
        id: null,
      },
    };
    this.setState({
      rows: [...this.state.rows, item],
    });
  };
  handleRemoveRow = (index) => {
    if (this.state.rows.length != 1) {
      var values = [...this.state.rows];

      console.log(index, "ddsdssdsdsdsdf");
      var filteredValue = values.filter((data, idx) => idx != index);
      this.setState({ rows: filteredValue });
    }
  };

  handleAddRowMobile = () => {
    const item = {
      operator: {
        operator_id: null,
      },
      country: {
        id: null,
      },
      phoneNumber: "",
      isCustomerWallet: false,
    };

    this.setState({
      rowsMobile: [...this.state.rowsMobile, item],
    });
  };
  handleRemoveRowMobile = (e, index) => {
    if (this.state.rowsMobile.length != 1) {
      var values = [...this.state.rowsMobile];

      console.log(index, "ddsdssdsdsdsdf");
      var filteredValue = values.filter((data, idx) => idx != index);
      this.setState({ rowsMobile: filteredValue });
    }
  };

  handleSaveDetails = (selectedOption, index) => {
    var inputsss = [...this.state.rows];
    inputsss[index].bankName = selectedOption.value;
    console.log(selectedOption.value, "selectedOption");
    this.setState(
      {
        rows: inputsss,
      },
      () => console.log(this.state.rows)
    );
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

  handleSaveDetailsEdit = (selectedOption, index) => {
    var inputssss = [...this.state.bank];
    inputssss[index].bankName = selectedOption.value;
    this.setState({
      bank: inputssss,
    });
  };

  handleBankDetailsedit = (e, index) => {
    var name = e.target.name;

    var value = e.target.value;

    var inputs = [...this.state.bank];

    if (name == "currency") {
      inputs[index][name].id = parseFloat(value);
    } else {
      inputs[index][name] = value;
    }

    this.setState({
      bank: inputs,
    });
  };

  saveBank = () => {
    if (
      this.state.bank &&
      this.state.bank.length &&
      this.state.bank[0].currency.id
    ) {
      var total = [];

      this.state.bank.map((data) => {
        total.push(data);
      });

      if (this.state.rows.length && this.state.rows[0].currency.id) {
        this.state.rows.map((data) => {
          total.push(data);
        });
      }

      console.log(total, "total");
      this.props.addBankDetails(sessionStorage.getItem("token"), total);

      this.setState({
        rows: [
          {
            bankName: "",
            bankCode: "",
            branchCode: "",
            accountNo: "",
            accountKey: "",
            iban: "",
            swift: "",
            currency: {
              id: null,
            },
          },
        ],
      });
    } else {
      this.props.addBankDetails(
        sessionStorage.getItem("token"),
        this.state.rows
      );

      this.setState({
        rows: [
          {
            bankName: "",
            bankCode: "",
            branchCode: "",
            accountNo: "",
            accountKey: "",
            iban: "",
            swift: "",
            currency: {
              id: null,
            },
          },
        ],
      });
    }
  };

  saveCreditCards = () => {
    if (
      this.state.creditcards &&
      this.state.creditcards.length >= 1 &&
      this.state.creditcards[0].cardType.card_type_id
    ) {
      var total = [];

      this.state.creditcards.map((data) => {
        total.push(data);
      });

      if (
        this.state.rowsBank.length >= 1 &&
        this.state.rowsBank[0].cardType.card_type_id
      ) {
        this.state.rowsBank.map((data) => {
          total.push(data);
        });
      }

      console.log(total, "total");
      this.props.addCardsDetails(sessionStorage.getItem("token"), total);

      this.setState({
        rowsBank: [
          {
            cardType: {
              card_type_id: null,
            },
            name: "",
            number: "",
            expiryDate: "",
            invoiceAddress: {
              address_id: null,
              street: "",
              city: "",
              country: {
                id: null,
              },
            },
          },
        ],
      });
    } else {
      this.props.addCardsDetails(
        sessionStorage.getItem("token"),
        this.state.rowsBank
      );

      this.setState({
        rowsBank: [
          {
            cardType: {
              card_type_id: null,
            },
            name: "",
            number: "",
            expiryDate: "",
            invoiceAddress: {
              address_id: null,
              street: "",
              city: "",
              country: {
                id: null,
              },
            },
          },
        ],
      });
    }
  };

  saveMobile = () => {
    if (
      this.state.mobile &&
      this.state.mobile.length &&
      this.state.mobile[0].country.id
    ) {
      var total = [];

      this.state.mobile.map((data) => {
        total.push(data);
      });

      if (
        this.state.rowsMobile &&
        this.state.rowsMobile.length &&
        this.state.rowsMobile[0].country.id
      ) {
        this.state.rowsMobile.map((data) => {
          total.push(data);
        });
      }

      console.log(total, "total");
      this.props.createMobileAccounts(sessionStorage.getItem("token"), total);

      this.setState({
        rowsMobile: [
          {
            operator: {
              operator_id: null,
            },
            country: {
              id: null,
            },
            phoneNumber: "",
            isCustomerWallet: false,
          },
        ],
      });
    } else {
      this.props.createMobileAccounts(
        sessionStorage.getItem("token"),
        this.state.rowsMobile
      );

      this.setState({
        rowsMobile: [
          {
            operator: {
              operator_id: null,
            },
            country: {
              id: null,
            },
            phoneNumber: "",
            isCustomerWallet: false,
          },
        ],
      });
    }
  };

  handleAddRowBank = () => {
    const item = {
      cardType: {
        card_type_id: null,
      },
      name: "",
      number: "",
      expiryDate: "",
      invoiceAddress: {
        address_id: null,
        street: "",
        city: "",
        country: {
          id: null,
        },
      },
    };

    this.setState({
      rowsBank: [...this.state.rowsBank, item],
    });
  };

  handleRemoveRowBank = (e, index) => {
    if (this.state.rowsBank.length != 1) {
      var values = [...this.state.rowsBank];
      var filteredValue = values.filter((data, idx) => idx != index);
      this.setState({ rowsBank: filteredValue });
    }
  };

  handleRemoveRowbankedit = (index) => {
    var values = [...this.state.bank];
    var filteredValue = values.filter((data, idx) => idx != index);

    this.props.deleteBankAccount(
      sessionStorage.getItem("token"),
      values[index].account_id
    );
    this.setState({ bank: filteredValue });
  };

  handleMobile = (e, index) => {
    var name = e.target.name;

    var input = [...this.state.rowsMobile];

    if (name == "operator") {
      input[index].operator.operator_id = parseInt(e.target.value);
    }

    if (name == "country") {
      input[index].country.id = parseInt(e.target.value);
    }

    this.setState({
      rowsMobile: input,
    });
  };

  handleChangeMobile = (value, country, e, formattedValue, index) => {
    var input = [...this.state.rowsMobile];

    input[index].phoneNumber = value;

    this.setState({
      rowsMobile: input,
    });
  };

  handleCustomerWallet = (e, index) => {
    var input = [...this.state.rowsMobile];
    if (e.target.checked) {
      input[index].isCustomerWallet = true;
      this.setState({
        rowsMobile: input,
      });
    } else {
      input[index].isCustomerWallet = false;
      this.setState({
        rowsMobile: input,
      });
    }
  };

  handleMobileEdit = (e, index) => {
    var name = e.target.name;

    var input = [...this.state.mobile];

    if (name == "operator") {
      input[index].operator.operator_id = parseInt(e.target.value);
    }

    if (name == "country") {
      input[index].country.id = parseInt(e.target.value);
    }

    this.setState({
      mobile: input,
    });
  };

  verifyCode = (e) => {
    this.setState({
      mfa: e.target.value,
    });
  };

  handleChangeMobilEdit = (value, country, e, formattedValue, index) => {
    var input = [...this.state.mobile];

    input[index].phoneNumber = value;

    this.setState({
      mobile: input,
    });
  };

  handleCustomerWalletEdit = (e, index) => {
    console.log(e.target.checked, "eeee");
    var input = [...this.state.mobile];

    if (e.target.checked) {
      input[index].isCustomerWallet = true;

      this.setState({
        mobile: input,
      });
    } else {
      input[index].isCustomerWallet = false;

      this.setState({
        mobile: input,
      });
    }

    console.log(input,"eeee")
  };
  verify = (e, data) => {
    this.setState({
      verificationState: true,
      verificationData: data,
    });
    this.props.sendVerificationCode(
      sessionStorage.getItem("token"),
      data,
      this.state.verificationState
    );
  };

  handleClose = () => {
    this.setState({ loading: true });

    this.props.sendVerificationCodeFlase();
  };

  showMoreMobile = () => {
    this.setState({
      showMoreMobilestate: true,
    });
  };

  submitMFA = () => {
    var payload = {
      phoneNumber: this.state.verificationData.phoneNumber,
      mfaCode: this.state.mfa,
      mobileAccountId: this.state.verificationData.account_id,
    };

    this.props.validateMFA(sessionStorage.getItem("token"), payload);
  };

  handleCards = (e, index) => {
    var name = e.target.name;

    var input = [...this.state.rowsBank];

    if (name == "cardType") {
      input[index].cardType.card_type_id = parseInt(e.target.value);
    } else if (name == "street") {
      input[index].invoiceAddress.street = e.target.value;
    } else if (name == "city") {
      input[index].invoiceAddress.city = e.target.value;
    } else if (name == "country") {
      input[index].invoiceAddress.country.id = parseInt(e.target.value);
    } else {
      input[index][e.target.name] = e.target.value;
    }

    this.setState({
      rowsBank: input,
    });
  };

  showMoreCards = () => {
    this.setState({
      showCreditCardstate: true,
    });
  };

  handleShowMoreBank = () => {
    this.setState({
      showMoreBankstate: true,
    });
  };

  handleDeleteMobile = (id) => {
    this.props.deleteMobileAccounts(sessionStorage.getItem("token"), id);
  };

  render() {

    return (
      <div className="main_contain">
        <div className="merch_m_list_w">
          {/* <h1 className="m_listHeading textAlignCenter pd_t_b24">
            Merchant Management{" "}
          </h1> */}
          <div className="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="flCenterColumn mercahntCancel">
                      <div></div>
                      <h1 className="list_top_heading textAlignCenter">
                        Accounts
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
                      {/* <h1 className="kycDetails textAlignCenter"></h1> */}
                      <div className="kycformBox">
                        <h3 className="bankDetails pd_16">Bank Details</h3>
                        {/* <hr />
                          <br /> */}
                        <div className="accountTable_wrap">
                          <table className="accountTable">
                            <thead>
                              {/* <th>Bank Name</th> */}
                              <th>Bank Code</th>
                              <th>Branch Code</th>
                              <th>Account Number</th>
                              <th>Key</th>
                              {/* <th>Currency</th> */}
                              <th>IBAN</th>
                              <th>SWIFT</th>
                              <th></th>
                            </thead>
                            <div className="customspaceD"></div>
                            <tbody>
                              {this.state.bank &&
                                this.state.bank.length == 0 &&
                                this.state.rows.map((item, index) => (
                                  <tr>
                                    {/* <td> */}
                                      {/* <input
                                        type="text"
                                        value={this.state.rows[index].bankName}
                                        placeholder="Bank name"
                                        name="bankName"
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      /> */}

                                      {/* <Select2
                                        isSearchable={true}
                                        value={{
                                          label: this.state.rows[index]
                                            .bankName,
                                          value: this.state.rows[index]
                                            .bankName,
                                        }}
                                        options={this.state.selectOptions}
                                        onChange={(option) =>
                                          this.handleSaveDetails(option, index)
                                        }
                                      />
                                    </td> */}
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
                                    {/* <td>
                                      <select
                                        class="FrmSelect"
                                        value={
                                          this.state.rows[index].currency
                                            ? this.state.rows[index].currency.id
                                            : ""
                                        }
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                        name="currency"
                                      >
                                        <option value="select_curncy">
                                          Select currency
                                        </option>

                                        {this.state.currencies &&
                                          this.state.currencies.length > 0 &&
                                          this.state.currencies.map((data) => {
                                            return (
                                              <option value={data.id}>
                                                {data.code}
                                              </option>
                                            );
                                          })}
                                      </select>
                                    </td> */}
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
                                        +
                                      </button>
                                      <button
                                        onClick={() =>
                                          this.handleRemoveRow(index)
                                        }
                                        className="pull-left ml-2 btn-danger btn btn-sm "
                                      >
                                        -
                                      </button>
                                    </td>
                                  </tr>
                                ))}

                              {this.state.bank &&
                                this.state.bank.length > 0 &&
                                this.state.bank.map((item, index) => (
                                  <tr>
                                    <td>
                                      {/* <input
                                        type="text"
                                        value={this.state.bank[index].bankName}
                                        placeholder="Bank name"
                                        name="bankName"
                                        onChange={(e) =>
                                          this.handleBankDetailsedit(e, index)
                                        }
                                      /> */}
                                      <div className="select-account">
                                        <Select2
                                          isSearchable={true}
                                          value={{
                                            label: this.state.bank[index]
                                              .bankName,
                                            value: this.state.bank[index]
                                              .bankName,
                                          }}
                                          options={this.state.selectOptions}
                                          onChange={(option) =>
                                            this.handleSaveDetailsEdit(
                                              option,
                                              index
                                            )
                                          }
                                          // ref={(el)=>{

                                          //   if(el)
                                          //   {
                                          //     // console.log(el,"ellllllll")

                                          //     el.select.props.styles.setProperty("width","100px","important")
                                          //   }

                                          // }}

                                          // styles={customStyles}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={this.state.bank[index].bankCode}
                                        placeholder="Code"
                                        name="bankCode"
                                        onChange={(e) =>
                                          this.handleBankDetailsedit(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={
                                          this.state.bank[index].branchCode
                                        }
                                        placeholder="Branch"
                                        name="branchCode"
                                        onChange={(e) =>
                                          this.handleBankDetailsedit(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        value={this.state.bank[index].accountNo}
                                        placeholder="Account Number"
                                        name="accountNo"
                                        onChange={(e) =>
                                          this.handleBankDetailsedit(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="Key"
                                        value={
                                          this.state.bank[index].accountKey
                                        }
                                        name="accountKey"
                                        onChange={(e) =>
                                          this.handleBankDetailsedit(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <select
                                        class="FrmSelect"
                                        value={
                                          this.state.bank[index].currency
                                            ? this.state.bank[index].currency.id
                                            : ""
                                        }
                                        onChange={(e) =>
                                          this.handleBankDetailsedit(e, index)
                                        }
                                        name="currency"
                                      >
                                        <option value="cy">
                                          Select currency
                                        </option>

                                        {this.state.currencies &&
                                          this.state.currencies.length > 0 &&
                                          this.state.currencies.map((data) => {
                                            return (
                                              <option value={data.id}>
                                                {data.code}
                                              </option>
                                            );
                                          })}
                                      </select>
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="IBAN"
                                        name="iban"
                                        value={this.state.bank[index].iban}
                                        onChange={(e) =>
                                          this.handleBankDetailsedit(e, index)
                                        }
                                      />
                                    </td>
                                    <td>
                                      <input
                                        type="text"
                                        placeholder="SWIFT"
                                        name="swift"
                                        value={this.state.bank[index].swift}
                                        onChange={(e) =>
                                          this.handleBankDetailsedit(e, index)
                                        }
                                      />
                                    </td>
                                    <td style={{ display: "flex" }}>
                                      <button
                                        style={{
                                          display:
                                            index == this.state.bank.length - 1
                                              ? "block"
                                              : "none",
                                        }}
                                        onClick={this.handleShowMoreBank}
                                        className="btn  btn-sm btn-success pull-left"
                                      >
                                        +
                                      </button>
                                      <button
                                        onClick={() =>
                                          this.handleRemoveRowbankedit(index)
                                        }
                                        className="pull-left ml-2 btn-danger btn btn-sm "
                                      >
                                        -
                                      </button>
                                    </td>
                                  </tr>
                                ))}

                              {this.state.showMoreBankstate &&
                                this.state.bank &&
                                this.state.bank.length > 0 &&
                                this.state.rows.map((item, index) => (
                                  <tr>
                                    <td>
                                      {/* <input
                                        type="text"
                                        value={this.state.rows[index].bankName}
                                        placeholder="Bank name"
                                        name="bankName"
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                      /> */}
                                      <Select2
                                        isSearchable={true}
                                        value={{
                                          label: this.state.rows[index]
                                            .bankName,
                                          value: this.state.rows[index]
                                            .bankName,
                                        }}
                                        options={this.state.selectOptions}
                                        onChange={(option) =>
                                          this.handleSaveDetails(option, index)
                                        }
                                      />
                                    </td>
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
                                      <select
                                        class="FrmSelect"
                                        value={
                                          this.state.rows[index].currency
                                            ? this.state.rows[index].currency.id
                                            : ""
                                        }
                                        onChange={(e) =>
                                          this.handleBankDetails(e, index)
                                        }
                                        name="currency"
                                      >
                                        <option value="select_curncy">
                                          Select currency
                                        </option>

                                        {this.state.currencies &&
                                          this.state.currencies.length > 0 &&
                                          this.state.currencies.map((data) => {
                                            return (
                                              <option value={data.id}>
                                                {data.code}
                                              </option>
                                            );
                                          })}
                                      </select>
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
                                        +
                                      </button>
                                      <button
                                        onClick={() =>
                                          this.handleRemoveRow(index)
                                        }
                                        className="pull-left ml-2 btn-danger btn btn-sm "
                                      >
                                        -
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
                            Save bank acounts
                          </button>
                        </div>

                        {/* <div className="mt-5">
                          <div
                            class="confirm_p_w"
                            style={{
                              paddingLeft: "3%",
                              paddingRight: "3%",
                              paddingBottom: "3%",
                            }}
                          >
                            <button
                              class="aryousureBTN"
                              style={{ marginRight: "24px" }}
                              onClick={() => {
                                this.setState({ isModalVisible: true });
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              class="aryousureBTN confirmBtnR"
                              onClick={() => {
                                this.setState({ isModalVisibleApprove: true });
                              }}
                            >
                              Submit
                            </button>
                          </div> */}
                        {/* </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {this.state.verificationState && (
            <Modal
              visible={this.state.verificationState}
              cancelButtonProps={{ style: { display: "none !important" } }}
              footer={null}
            >
              {!this.state.statusCheck && (
                <>
                  <span>Please wait !</span>
                  <br></br>
                  <div style={{ margin: "0 auto", display: "table" }}>
                    <ClipLoader
                      color={"#89e6d3"}
                      loading={this.state.loading}
                      size={100}
                    />
                    <br></br>
                    <br></br>
                    <button
                      className="btn btn-danger"
                      onClick={this.handleClose}
                    >
                      Close
                    </button>
                  </div>
                </>
              )}

              {this.state.statusCheck && (
                <>
                  <span>
                    MFA code has been sent to your mobile +
                    {this.state.verificationData.phoneNumber} please verify !
                  </span>
                  <br></br>
                  <label>Mfa Code</label>
                  <br></br>
                  <input
                    type="text"
                    className="form-control"
                    name="verifyphone"
                    onChange={this.verifyCode}
                  />
                  <br></br>
                  <button className="btn btn-danger" onClick={this.handleClose}>
                    Close
                  </button>{" "}
                  <button className="btn btn-success" onClick={this.submitMFA}>
                    Verify
                  </button>
                </>
              )}
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({  }) => {
  return {
 
  };
};

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AddAccount);
