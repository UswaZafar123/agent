import React, { Component } from "react";
import "../../../../css/ag-grid-customization01.css";

import "./formfromold.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
import {
  getAllCurrencies,
  getAllAssets,
  getAllOperations,
  createPackage,
} from "../../../../services/agent/action";

import "./settingcss.css";
import { toastr } from "react-redux-toastr";

import {
  Select,
  DatePicker,
  Modal,
  Switch,
  Upload,
  message,
  Dropdown,
  Checkbox,
  Tabs,
} from "antd";

import { Radio } from "antd";
import moment from "moment";
import { FormattedMessage, IntlProvider } from "react-intl";

const dateFormat = "YYYY-MM-DD";
const { Option } = Select;
const { TabPane } = Tabs;

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

function callback(key) {
  console.log(key);
}
class Packages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: [],
      assets: [],
      operations: [],
      displayOperations: [],
      checkedOperations: [],
      currencyLimitProfiles: [],
      planStatus: null,
      isfeatured: null,
      isdefault: null,
      planSettlementPeriod: "",
      planAmount: null,
      planName: "",
      channel: "",
      messages: "",
      language: "",
    };
  }

  async translationHelperFunction() {
    const messages = await this.loadLocaleData(localStorage.getItem("lang"));
    this.setState({
      messages: messages,
      language: localStorage.getItem("lang"),
    });
    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");
  }

  loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../../../i18n/messages/fr");
      default:
        return import("../../../i18n/messages/en");
    }
  };

  componentDidMount() {
    this.props.getAllCurrencies();
    this.props.getAllAssets();
    this.props.getAllOperations();

    this.translationHelperFunction();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.currencyStatus === true) {
      this.setState({
        currency: nextProps.currencyDetails._embedded.currencyDtoList,
      });
      var inputs = [];
      nextProps.currencyDetails._embedded.currencyDtoList.map((data) => {
        inputs.push({
          dailyTransactionCount: 0,
          weeklyTransactionCount: 0,
          monthlyTransactionCount: 0,
          dailyTransactionAmount: 0,
          weeklyTransactionAmount: 0,
          monthlyTransactionAmount: 0,
          currencyName: data.code,
        });
      });

      this.setState({
        currencyLimitProfiles: inputs,
      });
    }

    if (nextProps.assetStatus === true) {
      this.setState({
        assets: nextProps.assetDetails._embedded.assetDtoList,
      });
    }

    if (nextProps.operationStatus == true) {
      this.setState({
        operations: nextProps.operationDetails._embedded.operationDtoList,
      });

      console.log("checkerrr");
    }

    if (nextProps.language) {
      const messages = await this.loadLocaleData(nextProps.language);

      this.setState({
        messages: messages,
        language: nextProps.language,
      });
    }
  }

  handleAssets = (e, name) => {
    if (e.target.checked) {
      let assetId = e.target.value;

      var filteredValue = this.state.operations.filter(
        (data) => data.asset.assetId == assetId
      );
      var value = this.state.displayOperations;
      value.push({
        operations: {
          name: name,
          values: filteredValue,
        },
      });
      this.setState({ displayOperations: value });
    } else {
      var filtered = this.state.displayOperations.filter(function (el) {
        return el.operations.name != name;
      });

      var removal_array = [];
      this.state.operations.map((data) => {
        if (data.asset.assetId == e.target.value)
          removal_array.push(data.operationId);
      });

      var myArray = this.state.checkedOperations.filter(function (el) {
        return !removal_array.includes(el);
      });

      this.setState({
        displayOperations: filtered,
        checkedOperations: myArray,
      });
    }
  };

  finalOperations = (e) => {
    if (e.target.checked) {
      var id = e.target.value;

      var input = this.state.checkedOperations;
      input.push(id);
      this.setState({
        checkedOperations: input,
      });
    } else {
      var fil = this.state.checkedOperations.filter(
        (data) => data != e.target.value
      );

      this.setState({
        checkedOperations: fil,
      });
    }
  };

  limits = (e, index, day_or_week_or_month, typeofLimits) => {
    const input = [...this.state.currencyLimitProfiles];

    if (day_or_week_or_month == "daily") {
      if (typeofLimits == "number") {
        input[index].dailyTransactionCount = parseFloat(e.target.value);
      } else if (typeofLimits == "amount") {
        input[index].dailyTransactionAmount = parseFloat(e.target.value);
      }
    } else if (day_or_week_or_month == "monthly") {
      if (typeofLimits == "number") {
        input[index].monthlyTransactionCount = parseFloat(e.target.value);
      } else if (typeofLimits == "amount") {
        input[index].monthlyTransactionAmount = parseFloat(e.target.value);
      }
    } else {
      if (typeofLimits == "number") {
        input[index].weeklyTransactionCount = parseFloat(e.target.value);
      } else if (typeofLimits == "amount") {
        input[index].weeklyTransactionAmount = parseFloat(e.target.value);
      }
    }

    this.setState({
      currencyLimitProfiles: input,
    });
  };

  handleChangeSelectFeatured = (e) => {
    if (e == "true") {
      this.setState({
        isfeatured: true,
      });
    } else {
      this.setState({
        isfeatured: false,
      });
    }
  };

  handleChangeSelectDefault = (e) => {
    if (e == "true") {
      this.setState({
        isdefault: true,
      });
    } else {
      this.setState({
        isdefault: false,
      });
    }
  };

  handleChangeSelectStatus = (e) => {
    if (e == "true") {
      this.setState({
        planStatus: true,
      });
    } else {
      this.setState({
        planStatus: false,
      });
    }
  };

  handleChangeSelectPeriod = (e) => {
    this.setState({
      planSettlementPeriod: e,
    });
  };

  handleAmount = (e) => {
    this.setState({
      planAmount: parseFloat(e.target.value),
    });
  };
  handlePlanName = (e) => {
    this.setState({
      planName: e.target.value,
    });
  };

  handleChangeSelectChannels = (e) => {
    this.setState({
      channel: e,
    });
  };

  submit = () => {
    var final = [];
    var assetsName = [];
    this.state.assets.map((data) => {
      assetsName.push(data.name);
    });

    // this.state.operations.map((data) => {
    //   if (this.state.checkedOperations.includes(data.operationId) && assetsName.includes(data.asset.name)) {
    //     datassss.push({
    //       name: data.asset.name,
    //       opera,
    //     });
    //   }
    // });

    const groups = this.state.operations.reduce(
      (groups, item) => ({
        ...groups,
        [item.asset.name]: [...(groups[item.asset.name] || []), item],
      }),
      {}
    );

    console.log(typeof groups, "groupsgroups");

    assetsName.map((data) => {
      var datassss = [];
      var name = data;
      groups[data].map((val) => {
        if (this.state.checkedOperations.includes(val.operationId)) {
          datassss.push({
            operationName: val.name,
            commissionType: "PERCENTAGE",
            active: "true",
          });
        }
      });
      final.push({
        assetName: name,
        operationPermissions: datassss,
      });
    });

    var filtered = final.filter(
      (data) => data.operationPermissions.length != 0
    );

    var payload = {
      name: this.state.planName,
      packageType: "STANDARD",
      agentType: "AGENT_MEMBER",
      isDefault: this.state.isdefault,
      isFeatured: this.state.isfeatured,
      channel: this.state.channel,
      settlementPeriod: this.state.settlementPeriod,
      planPrice: this.state.planAmount,
      active: this.state.planStatus,
      currencyLimitProfiles: this.state.currencyLimitProfiles,
      operationPermissionProfiles: filtered,
    };

    if (
      payload.planPrice === null ||
      payload.planPrice instanceof String ||
      payload.planPrice <= 0
    ) {
      toastr.error("Please enter valid subscription amount");
    } else if (payload.name === "") {
      toastr.error("Please enter valid plan name");
    } else if (
      (payload.currencyLimitProfiles[0].dailyTransactionAmount <= 0 &&
        payload.currencyLimitProfiles[1].dailyTransactionAmount <= 0) ||
      (payload.currencyLimitProfiles[0].dailyTransactionCount <= 0 &&
        payload.currencyLimitProfiles[1].dailyTransactionCount <= 0)
    ) {
      toastr.error("Please enter valid daily limit");
    } else if (
      (payload.currencyLimitProfiles[0].weeklyTransactionAmount <= 0 &&
        payload.currencyLimitProfiles[1].weeklyTransactionAmount <= 0) ||
      (payload.currencyLimitProfiles[0].weeklyTransactionCount <= 0 &&
        payload.currencyLimitProfiles[1].weeklyTransactionCount <= 0)
    ) {
      toastr.error("Please enter valid weekly limit");
    } else if (
      (payload.currencyLimitProfiles[0].monthlyTransactionAmount <= 0 &&
        payload.currencyLimitProfiles[1].monthlyTransactionAmount <= 0) ||
      (payload.currencyLimitProfiles[0].monthlyTransactionCount <= 0 &&
        payload.currencyLimitProfiles[1].monthlyTransactionCount <= 0)
    ) {
      toastr.error("Please enter valid monthly limit");
    } else {
      this.props.createPackage(payload, this.props.history);
    }
  };

  render() {
    const isfeatured = this.state.isfeatured;
    return (
      <IntlProvider
        messages={this.state.messages.default}
        locale={this.state.language?.length > 0 ? this.state.language : "en"}
      >
        <>
          <div className="main_contain settings-container">
            <div className="merch_m_list_w">
              <div className="merch_list_card" id="merch_list_card">
                <div className="section_custom">
                  <div className="sectionInn">
                    <div className="chartCard_w">
                      <div className="chartCardTop">
                        <div className="kyccustomformheading">
                          <h1 className="list_top_heading textAlignCenter text-center">
                            <FormattedMessage id="agent.Packages" />
                          </h1>
                        </div>
                      </div>
                      <div
                        className="chartCardMiddle"
                        style={{ padding: "24px" }}
                      >
                        {/* <div
                      className="chartCardMiddle"
                      style={{ padding: "24px" }}
                    ></div> */}
                        <div className="formRow">
                          <div className="formCol">
                            <label class="formColLabel">
                              <FormattedMessage id="agent.SubscriptionAmount" />{" "}
                              <span className="mantdat">*</span>
                            </label>
                            <FormattedMessage id="agent.SubscriptionAmount">
                              {(placeholder) => (
                                <input
                                  onChange={this.handleAmount}
                                  type="number"
                                  placeholder={placeholder}
                                />
                              )}
                            </FormattedMessage>
                          </div>
                          <div className="formCol">
                            <label class="formColLabel">
                              <FormattedMessage id="agent.PlanName" />{" "}
                              <span className="mantdat">*</span>
                            </label>
                            <FormattedMessage id="agent.EnterName">
                              {(placeholder) => (
                                <input
                                  type="text"
                                  placeholder={placeholder}
                                  onChange={this.handlePlanName}
                                />
                              )}
                            </FormattedMessage>
                          </div>
                          {/* <div className="formCol">
                          <label className="formColLabel">User Type </label>
                          <div className="categorySelect">
                            <Select
                              defaultValue="Customer"
                              style={{
                                width: 100 + "%",
                                height: 52,
                              }}
                              onChange={(e) => this.handleChangeSelect(e)}
                            >
                              <Option value="Customer">Customer</Option>
                              <Option value="Merchant">Merchant</Option>
                            </Select>
                          </div>
                        </div> */}
                          <div className="formCol">
                            <label className="formColLabel">
                              <FormattedMessage id="agent.SettlementPeriod" />
                            </label>
                            <div className="categorySelect">
                              <Select
                                style={{
                                  width: 100 + "%",
                                  height: 52,
                                }}
                                onChange={(e) =>
                                  this.handleChangeSelectPeriod(e)
                                }
                              >
                                <Option value="DAILY">
                                  <FormattedMessage id="agent.Daily" />
                                </Option>
                                <Option value="WEEKLY">
                                  <FormattedMessage id="agent.Weekly" />
                                </Option>
                                <Option value="MONTHLY">
                                  <FormattedMessage id="agent.Monthly" />
                                </Option>
                              </Select>
                            </div>
                          </div>

                          <div className="formCol">
                            <label className="formColLabel">
                              <FormattedMessage id="agent.isFeatured" />
                            </label>
                            <div className="categorySelect">
                              <Select
                                style={{
                                  width: 100 + "%",
                                  height: 52,
                                }}
                                onChange={(e) =>
                                  this.handleChangeSelectFeatured(e)
                                }
                              >
                                <Option value="true">
                                  <FormattedMessage id="agent.Yes" />
                                </Option>
                                <Option value="false">
                                  <FormattedMessage id="agent.No" />
                                </Option>
                              </Select>
                            </div>
                          </div>

                          <div className="formCol">
                            <label className="formColLabel">
                              <FormattedMessage id="agent.isDefault" />
                            </label>
                            <div className="categorySelect">
                              <Select
                                style={{
                                  width: 100 + "%",
                                  height: 52,
                                }}
                                onChange={(e) =>
                                  this.handleChangeSelectDefault(e)
                                }
                              >
                                <Option value="true">
                                  <FormattedMessage id="agent.Yes" />
                                </Option>
                                <Option value="false">
                                  <FormattedMessage id="agent.No" />
                                </Option>
                              </Select>
                            </div>
                          </div>

                          <div className="formCol">
                            <label className="formColLabel">
                              <FormattedMessage id="agent.TypeofChannels" />
                            </label>
                            <div className="categorySelect">
                              <Select
                                style={{
                                  width: 100 + "%",
                                  height: 52,
                                }}
                                onChange={(e) =>
                                  this.handleChangeSelectChannels(e)
                                }
                              >
                                <Option value="Web">
                                  <FormattedMessage id="agent.WebAccess" />
                                </Option>
                                <Option value="Mobile">
                                  <FormattedMessage id="agent.MobileAccess" />
                                </Option>
                                <Option value="both">
                                  <FormattedMessage id="agent.Both" />
                                </Option>
                              </Select>
                            </div>
                          </div>
                          <div className="formCol">
                            <label className="formColLabel">
                              <FormattedMessage id="agent.Assets" />{" "}
                              <span className="smallTextLabel">
                                <FormattedMessage id="agent.Selectmorethanoneoperations" />
                              </span>
                            </label>
                            <div className="antdCheckBCustom">
                              {this.state.assets &&
                                this.state.assets.length > 0 &&
                                this.state.assets.map((data) => {
                                  return (
                                    <Checkbox
                                      value={data.assetId}
                                      onChange={(e) =>
                                        this.handleAssets(e, data.name)
                                      }
                                    >
                                      {data.name}
                                    </Checkbox>
                                  );
                                })}

                              {this.state.displayOperations.map((data) => {
                                return (
                                  <>
                                    <div>
                                      <span>{data.operations.name}</span>
                                    </div>

                                    {data.operations.values.map((val) => {
                                      return (
                                        <Checkbox
                                          value={val.operationId}
                                          checked={
                                            this.state.checkedOperations.includes(
                                              val.operationId
                                            )
                                              ? true
                                              : false
                                          }
                                          onChange={(e) =>
                                            this.finalOperations(e)
                                          }
                                        >
                                          {val.name}
                                        </Checkbox>
                                      );
                                    })}
                                  </>
                                );
                              })}
                            </div>
                          </div>
                          {/* <div className="formCol">
                          <label className="formColLabel">
                            Settlement Period <span className="mantdat">*</span>
                          </label>
                          <div className="categorySelect">
                            <Select
                              defaultValue="Select..."
                              style={{
                                width: 100 + "%",
                                height: 52,
                              }}
                              onChange={(e) => this.handleChangeSelect(e)}
                            >
                              <Option value="realtime">Real Time</Option>
                              <Option value="sametime">Same Time</Option>
                              <Option value="both">Both</Option>
                            </Select>
                          </div>
                        </div> */}
                          <div className="formCol">
                            <label className="formColLabel">
                              <FormattedMessage id="agent.SubscriptionStatus" />{" "}
                              <span className="mantdat">*</span>
                            </label>
                            <div className="categorySelect">
                              <Select
                                defaultValue="Select..."
                                style={{
                                  width: 100 + "%",
                                  height: 52,
                                }}
                                onChange={(e) =>
                                  this.handleChangeSelectStatus(e)
                                }
                              >
                                <Option value="true">
                                  <FormattedMessage id="agent.Active" />
                                </Option>
                                <Option value="false">
                                  <FormattedMessage id="agent.Inactive" />
                                </Option>
                              </Select>
                            </div>
                          </div>
                          {/* <div className="formCol">
                          <label className="formColLabel">
                            Invoice Period <span className="mantdat">*</span>
                          </label>
                          <div className="categorySelect">
                            <Select
                              defaultValue="Select..."
                              style={{
                                width: 100 + "%",
                                height: 52,
                              }}
                              onChange={(e) => this.handleChangeSelect(e)}
                            >
                              <Option value="daily">Daily</Option>
                              <Option value="" weekly>
                                Weekly
                              </Option>
                              <Option value="monthly">Monthly</Option>
                            </Select>
                          </div>
                        </div> */}
                          {/* <div className="formCol">
                          <label className="formColLabel">
                            Type of Payment <span className="mantdat">*</span>
                          </label>
                          <div className="categorySelect">
                            <Select
                              defaultValue="Select..."
                              style={{
                                width: 100 + "%",
                                height: 52,
                              }}
                              onChange={(e) => this.handleChangeSelect(e)}
                            >
                              <Option value="easypayment">Easy Payment</Option>
                            </Select>
                          </div>
                        </div> */}
                          <div className="formCol">
                            <label className="formColLabel">
                              <FormattedMessage id="agent.MultipleCurrency" />{" "}
                              <span className="mantdat">*</span>
                            </label>
                            <div className="antdCheckBCustom">
                              {/* <Checkbox onChange={onChange}>FAF</Checkbox>
                            <Checkbox onChange={onChange}>
                              AMERICAN DOLLOR
                            </Checkbox>
                            <Checkbox onChange={onChange}>OUV</Checkbox>
                            <Checkbox onChange={onChange}>FCFA</Checkbox>
                            <Checkbox onChange={onChange}>EURO</Checkbox> */}
                              {this.state.currency &&
                                this.state.currency.length > 0 &&
                                this.state.currency.map((data) => {
                                  return (
                                    <Checkbox value={data.code}>
                                      {data.code}
                                    </Checkbox>
                                  );
                                })}
                            </div>
                          </div>
                          {/* <div className="formCol">
                          <label className="formColLabel">
                            Bulk Payment <span className="mantdat">*</span>
                          </label>
                          <div className="categorySelect">
                            <Select
                              defaultValue="Select..."
                              style={{
                                width: 100 + "%",
                                height: 52,
                              }}
                              onChange={(e) => this.handleChangeSelect(e)}
                            >
                              <Option value="true">True</Option>
                              <Option value="false">False</Option>
                            </Select>
                          </div>
                        </div> */}
                          {/* <div className="formCol">
                                                <label className="formColLabel">Date of Birth</label>
                                                <DatePicker
                                                selected={this.state.dateOfBirthValue}
                                                maxDate={new Date()}
                                                className="form-control"
                                                name="dateofbirth"
                                                value={moment(this.state.dateOfBirth)}
                                                onChange={(date, datestring) =>
                                                    this.onChangeDate(date, datestring, "dateOfBirth")
                                                }
                                                format={dateFormat}
                                                style={{ width: 100 + "%", height: 52 }}
                                                peekNextMont
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                                autoComplete="off"
                                                />
                                                <span style={{ color: "red" }}>
                                                {this.state.dateOfBirthError}
                                                </span>
                                            </div> */}
                        </div>
                        <div className="sectionSepr"></div>
                        <h1 class="kycDetails textAlignCenter">
                          <FormattedMessage id="agent.LimitDetails" />
                        </h1>
                        <div className="formRow">
                          <div className="formCol" style={{ width: "100%" }}>
                            <div className="tabAntdCustom">
                              <Tabs type="card">
                                {this.state.currency &&
                                  this.state.currency.length > 0 &&
                                  this.state.currency.map((data, index) => {
                                    return (
                                      <TabPane
                                        tab={data.code}
                                        key={data.currencyId}
                                      >
                                        &ensp;
                                        <span style={{ color: "red" }}>
                                          <b>
                                            <FormattedMessage id="agent.Currency" />{" "}
                                            : {data.code}
                                          </b>
                                        </span>
                                        <div className="formRow">
                                          <div className="formCol">
                                            <label className="formColLabel">
                                              <FormattedMessage id="agent.TransactionDailyLimit" />{" "}
                                              <span className="mantdat">*</span>
                                            </label>
                                            <FormattedMessage id="agent.Numberoftranscations">
                                              {(placeholder) => (
                                                <input
                                                  type="number"
                                                  onChange={(e) =>
                                                    this.limits(
                                                      e,
                                                      index,
                                                      "daily",
                                                      "number"
                                                    )
                                                  }
                                                  placeholder={placeholder}
                                                />
                                              )}
                                            </FormattedMessage>
                                          </div>
                                          <div className="formCol">
                                            <label className="formColLabel">
                                              <FormattedMessage id="agent.TransactionDailyLimit" />{" "}
                                              <span className="mantdat">*</span>
                                            </label>
                                            <FormattedMessage id="agent.AmountofTranscation">
                                              {(placeholder) => (
                                                <input
                                                  onChange={(e) =>
                                                    this.limits(
                                                      e,
                                                      index,

                                                      "daily",
                                                      "amount"
                                                    )
                                                  }
                                                  type="number"
                                                  placeholder={placeholder}
                                                />
                                              )}
                                            </FormattedMessage>
                                          </div>
                                          <div className="formCol">
                                            <label className="formColLabel">
                                              <FormattedMessage id="agent.TransactionWeeklyLimit" />{" "}
                                              <span className="mantdat">*</span>
                                            </label>
                                            <FormattedMessage id="agent.Numberoftranscations">
                                              {(placeholder) => (
                                                <input
                                                  onChange={(e) =>
                                                    this.limits(
                                                      e,
                                                      index,
                                                      "weekly",
                                                      "number"
                                                    )
                                                  }
                                                  type="number"
                                                  placeholder={placeholder}
                                                />
                                              )}
                                            </FormattedMessage>
                                          </div>
                                          <div className="formCol">
                                            <label className="formColLabel">
                                              <FormattedMessage id="agent.TransactionWeeklyLimit" />{" "}
                                              <span className="mantdat">*</span>
                                            </label>
                                            <FormattedMessage id="agent.AmountofTranscation">
                                              {(placeholder) => (
                                                <input
                                                  onChange={(e) =>
                                                    this.limits(
                                                      e,
                                                      index,
                                                      "weekly",
                                                      "amount"
                                                    )
                                                  }
                                                  type="number"
                                                  placeholder={placeholder}
                                                />
                                              )}
                                            </FormattedMessage>
                                          </div>
                                          <div className="formCol">
                                            <label className="formColLabel">
                                              <FormattedMessage id="agent.TransactionMonthlyLimit" />{" "}
                                              <span className="mantdat">*</span>
                                            </label>
                                            <FormattedMessage id="agent.Numberoftranscations">
                                              {(placeholder) => (
                                                <input
                                                  onChange={(e) =>
                                                    this.limits(
                                                      e,
                                                      index,
                                                      "monthly",
                                                      "number"
                                                    )
                                                  }
                                                  type="number"
                                                  placeholder={placeholder}
                                                />
                                              )}
                                            </FormattedMessage>
                                          </div>
                                          <div className="formCol">
                                            <label className="formColLabel">
                                              <FormattedMessage id="agent.TransactionMonthlyLimit" />{" "}
                                              <span className="mantdat">*</span>
                                            </label>
                                            <FormattedMessage id="agent.AmountofTranscation">
                                              {(placeholder) => (
                                                <input
                                                  onChange={(e) =>
                                                    this.limits(
                                                      e,
                                                      index,
                                                      "monthly",
                                                      "amount"
                                                    )
                                                  }
                                                  type="number"
                                                  placeholder={placeholder}
                                                />
                                              )}
                                            </FormattedMessage>
                                          </div>
                                        </div>
                                      </TabPane>
                                    );
                                  })}
                              </Tabs>
                            </div>
                          </div>
                        </div>

                        {/* <div className="sectionSepr">
                        <h1 class="kycDetails textAlignCenter">Fees Details</h1>
                        <div className="formRow">
                          <div className="formCol">
                            <label className="formColLabel">
                              Plan Price <span className="mantdat">*</span>
                            </label>
                            <input type="text" placeholder="Enter Plan Price" />
                          </div>
                        </div>
                      </div> */}

                        <div style={{ width: "100%", float: "left" }}>
                          <div className="confirm_p_w mTB00 button-container rspacing">
                            <button
                              className="blackbtn aryousureBTN confirmBtnR"
                              onClick={this.back5}
                            >
                              <FormattedMessage id="cancel" />
                            </button>
                            <button
                              className="aryousureBTN confirmBtnR"
                              onClick={this.submit}
                            >
                              <FormattedMessage id="submit" />
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
        </>
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({ agentReducer, commonReducer }) => {
  const {
    currencyStatus,
    currencyDetails,
    assetStatus,
    assetDetails,
    operationStatus,
    operationDetails,
  } = agentReducer;

  const { language } = commonReducer;

  return {
    currencyStatus,
    currencyDetails,
    assetStatus,
    assetDetails,
    operationStatus,
    operationDetails,
    language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCurrencies: () => dispatch(getAllCurrencies()),
    getAllAssets: () => dispatch(getAllAssets()),
    getAllOperations: () => dispatch(getAllOperations()),
    createPackage: (payload, history) =>
      dispatch(createPackage(payload, history)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Packages);
