import React, { Component } from "react";
import "../../../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "./formfromold.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
import {
  getAllCurrencies,
  getAllAssets,
  getAllOperationsEdit,
  updatePackage,
} from "../../../../services/agent/action";

import "./settingcss.css";

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
      checkedAssets: [],
      limitProfileValues: [],
    };
  }

  componentDidMount() {
    this.props.getAllCurrencies();
    this.props.getAllAssets();
    this.props.getAllOperationsEdit(this.props.location.state);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currencyStatus === true) {
      this.setState({
        currency: nextProps.currencyDetails._embedded.currencyDtoList,
      });
      // var inputs = [];
      // nextProps.currencyDetails._embedded.currencyDtoList.map((data) => {

      // });

      // this.setState({
      //   currencyLimitProfiles: inputs,
      // });
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
    }

    if (nextProps.a_package_status === true) {
      //assets
      var checkedOperations = [];
      var assets = [];
      var datass = [];
      var displayOperations = [];
      nextProps.a_package_details &&
        nextProps.a_package_details.operationPermissionProfiles.length > 0 &&
        nextProps.a_package_details.operationPermissionProfiles.map((data) => {
          var checker = [];
          assets.push(data.assetName);
          data.operationPermissions.map((val) => {
            checker.push(val.operationName);
          });
          datass.push({
            assetsName: data.assetName,
            operations: checker,
          });
        });
      this.props.operationDetails._embedded.operationDtoList.map((data) => {
        datass.map((val) => {
          if (val.assetsName == data.asset.name) {
            if (val.operations.includes(data.name)) {
              checkedOperations.push(data.operationId);
            }
          }
        });
      });

      var limits = [];

      nextProps.a_package_details.currencyLimitProfiles.map((data) => {
        limits.push({
          dailyTransactionCount: data.dailyTransactionCount,
          weeklyTransactionCount: data.weeklyTransactionCount,
          monthlyTransactionCount: data.monthlyTransactionCount,
          dailyTransactionAmount: data.dailyTransactionAmount,
          weeklyTransactionAmount: data.weeklyTransactionAmount,
          monthlyTransactionAmount: data.monthlyTransactionAmount,
          currencyName: data.currencyName,
        });
      });

      // console.log(limits, "Limits check")
      assets.map((data) => {
        var inputsss = [];
        this.props.operationDetails._embedded.operationDtoList.map((val) => {
          if (data.includes(val.asset.name)) {
            inputsss.push(val);
          }
        });

        displayOperations.push({
          operations: {
            name: data,
            values: inputsss,
          },
        });
      });

      this.setState({
        displayOperations,
        checkedOperations,
        checkedAssets: assets,
        planName: nextProps.a_package_details.name,
        isdefault: nextProps.a_package_details.isDefault ? "true" : "false",
        isfeatured: nextProps.a_package_details.isFeatured ? "true" : "false",
        channel: nextProps.a_package_details.channel,
        settlementPeriod: nextProps.a_package_details.settlementPeriod,
        planAmount: nextProps.a_package_details.planPrice,
        planStatus: nextProps.a_package_details.active ? "true" : "false",
        currencyLimitProfiles: limits,
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
      var assetpush = this.state.checkedAssets;
      assetpush.push(name);
      this.setState({ displayOperations: value, checkedAssets: assetpush });
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

      var removesset = this.state.checkedAssets.filter((data) => data != name);

      this.setState({
        checkedAssets: removesset,
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
        isfeatured: "true",
      });
    } else {
      this.setState({
        isfeatured: "false",
      });
    }
  };

  handleChangeSelectDefault = (e) => {
    if (e == "true") {
      this.setState({
        isdefault: "true",
      });
    } else {
      this.setState({
        isdefault: "false",
      });
    }
  };

  handleChangeSelectStatus = (e) => {
    if (e == "true") {
      this.setState({
        planStatus: "true",
      });
    } else {
      this.setState({
        planStatus: "false",
      });
    }
  };

  handleChangeSelectPeriod = (e) => {
    this.setState({
      settlementPeriod: e,
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
      packageId: this.props.location.state,

      name: this.state.planName,
      packageType: "STANDARD",
      agentType: "AGENT_MEMBER",
      isDefault: this.state.isdefault == "true" ? true : false,
      isFeatured: this.state.isfeatured == "true" ? true : false,
      channel: this.state.channel,
      settlementPeriod: this.state.settlementPeriod,
      planPrice: this.state.planAmount,
      active: this.state.planStatus == "true" ? true : false,
      currencyLimitProfiles: this.state.currencyLimitProfiles,
      operationPermissionProfiles: filtered,
    };

    this.props.updatePackage(payload, this.props.history, this.props.location.state);
  };

  render() {
    const isfeatured = this.state.isfeatured;
    return (
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
                          Packages
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
                            Subscription Amount{" "}
                          </label>
                          <input
                            value={this.state.planAmount}
                            onChange={this.handleAmount}
                            type="text"
                            placeholder="Subscription Amount"
                          />
                        </div>
                        <div className="formCol">
                          <label class="formColLabel">
                            Plan Name <span className="mantdat">*</span>
                          </label>
                          <input
                            value={this.state.planName}
                            type="text"
                            placeholder="Enter Name"
                            onChange={this.handlePlanName}
                          />
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
                            Settlement Period
                          </label>
                          <div className="categorySelect">
                            <Select
                              style={{
                                width: 100 + "%",
                                height: 52,
                              }}
                              value={this.state.settlementPeriod}
                              onChange={(e) => this.handleChangeSelectPeriod(e)}
                            >
                              <Option value="DAILY">DAILY</Option>
                              <Option value="WEEKLY">WEEKLY</Option>
                              <Option value="MONTHLY">MONTHLY</Option>
                            </Select>
                          </div>
                        </div>

                        <div className="formCol">
                          <label className="formColLabel">is Featured</label>
                          <div className="categorySelect">
                            <Select
                              style={{
                                width: 100 + "%",
                                height: 52,
                              }}
                              value={this.state.isfeatured}
                              onChange={(e) =>
                                this.handleChangeSelectFeatured(e)
                              }
                            >
                              <Option value="true">YES</Option>
                              <Option value="false">NO</Option>
                            </Select>
                          </div>
                        </div>

                        <div className="formCol">
                          <label className="formColLabel">is Default</label>
                          <div className="categorySelect">
                            <Select
                              style={{
                                width: 100 + "%",
                                height: 52,
                              }}
                              value={this.state.isdefault}
                              onChange={(e) =>
                                this.handleChangeSelectDefault(e)
                              }
                            >
                              <Option value="true">YES</Option>
                              <Option value="false">NO</Option>
                            </Select>
                          </div>
                        </div>

                        <div className="formCol">
                          <label className="formColLabel">
                            Type of Channels
                          </label>
                          <div className="categorySelect">
                            <Select
                              style={{
                                width: 100 + "%",
                                height: 52,
                              }}
                              value={this.state.channel}
                              onChange={(e) =>
                                this.handleChangeSelectChannels(e)
                              }
                            >
                              <Option value="Web">Web Access</Option>
                              <Option value="Mobile">Mobile Access</Option>
                              <Option value="both">Both</Option>
                            </Select>
                          </div>
                        </div>
                        <div className="formCol">
                          <label className="formColLabel">
                            Assets{" "}
                            <span className="smallTextLabel">
                              Select more than one Operations
                            </span>
                          </label>
                          <div className="antdCheckBCustom">
                            {this.state.assets &&
                              this.state.assets.length > 0 &&
                              this.state.assets.map((data) => {
                                return (
                                  <Checkbox
                                    checked={this.state.checkedAssets.includes(
                                      data.name
                                    )}
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
                            Subscription Status{" "}
                            <span className="mantdat">*</span>
                          </label>
                          <div className="categorySelect">
                            <Select
                              value={this.state.planStatus}
                              style={{
                                width: 100 + "%",
                                height: 52,
                              }}
                              onChange={(e) => this.handleChangeSelectStatus(e)}
                            >
                              <Option value="true">Active</Option>
                              <Option value="false">Inactive</Option>
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
                            Multiple Currency <span className="mantdat">*</span>
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
                      <h1 class="kycDetails textAlignCenter">Limit Details</h1>
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
                                        <b>Currency : {data.code}</b>
                                      </span>
                                      <div className="formRow">
                                        <div className="formCol">
                                          <label className="formColLabel">
                                            Transaction Daily Limit{" "}
                                            <span className="mantdat">*</span>
                                          </label>
                                          <input
                                            type="text"
                                            value={
                                              this.state.currencyLimitProfiles[
                                                index
                                              ] ?
                                                this.state.currencyLimitProfiles[
                                                  index
                                                ].dailyTransactionCount
                                                :
                                                ""
                                            }
                                            onChange={(e) =>
                                              this.limits(
                                                e,
                                                index,
                                                "daily",
                                                "number"
                                              )
                                            }
                                            placeholder="Number of transcations"
                                          />
                                        </div>
                                        <div className="formCol">
                                          <label className="formColLabel">
                                            Transaction Daily Limit{" "}
                                            <span className="mantdat">*</span>
                                          </label>
                                          <input
                                            value={
                                              this.state.currencyLimitProfiles[
                                                index
                                              ] ?
                                                this.state.currencyLimitProfiles[
                                                  index
                                                ].dailyTransactionAmount
                                                :
                                                ""
                                            }
                                            onChange={(e) =>
                                              this.limits(
                                                e,
                                                index,

                                                "daily",
                                                "amount"
                                              )
                                            }
                                            type="text"
                                            placeholder="Amount of Transcation"
                                          />
                                        </div>
                                        <div className="formCol">
                                          <label className="formColLabel">
                                            Transaction Weekly Limit{" "}
                                            <span className="mantdat">*</span>
                                          </label>
                                          <input
                                            value={
                                              this.state.currencyLimitProfiles[
                                                index
                                              ] ?
                                                this.state.currencyLimitProfiles[
                                                  index
                                                ].weeklyTransactionCount
                                                :
                                                ""
                                            }
                                            onChange={(e) =>
                                              this.limits(
                                                e,
                                                index,
                                                "weekly",
                                                "number"
                                              )
                                            }
                                            type="text"
                                            placeholder="Number of transcations"
                                          />
                                        </div>
                                        <div className="formCol">
                                          <label className="formColLabel">
                                            Transaction Weekly Limit{" "}
                                            <span className="mantdat">*</span>
                                          </label>
                                          <input
                                            onChange={(e) =>
                                              this.limits(
                                                e,
                                                index,
                                                "weekly",
                                                "amount"
                                              )
                                            }
                                            value={
                                              this.state.currencyLimitProfiles[
                                                index
                                              ] ?
                                                this.state.currencyLimitProfiles[
                                                  index
                                                ].weeklyTransactionAmount
                                                :
                                                ""
                                            }
                                            type="text"
                                            placeholder="Amount of Transcation"
                                          />
                                        </div>
                                        <div className="formCol">
                                          <label className="formColLabel">
                                            Transaction Monthly Limit{" "}
                                            <span className="mantdat">*</span>
                                          </label>
                                          <input
                                            onChange={(e) =>
                                              this.limits(
                                                e,
                                                index,
                                                "monthly",
                                                "number"
                                              )
                                            }
                                            value={
                                              this.state.currencyLimitProfiles[
                                                index
                                              ] ?
                                                this.state.currencyLimitProfiles[
                                                  index
                                                ].monthlyTransactionCount
                                                :
                                                ""
                                            }
                                            type="text"
                                            placeholder="Number of transcations"
                                          />
                                        </div>
                                        <div className="formCol">
                                          <label className="formColLabel">
                                            Transaction Monthly Limit{" "}
                                            <span className="mantdat">*</span>
                                          </label>
                                          <input
                                            value={
                                              this.state.currencyLimitProfiles[
                                                index
                                              ] ?
                                                this.state.currencyLimitProfiles[
                                                  index
                                                ].monthlyTransactionAmount
                                                :
                                                ""
                                            }
                                            onChange={(e) =>
                                              this.limits(
                                                e,
                                                index,
                                                "monthly",
                                                "amount"
                                              )
                                            }
                                            type="text"
                                            placeholder="Amount of Transcation"
                                          />
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
                            Cancel
                          </button>
                          <button
                            className="aryousureBTN confirmBtnR"
                            onClick={this.submit}
                          >
                            Submit
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
    );
  }
}

const mapStateToProps = ({ agentReducer }) => {
  const {
    a_package_details,
    a_package_status,
    currencyStatus,
    currencyDetails,
    assetStatus,
    assetDetails,
    operationStatus,
    operationDetails,
  } = agentReducer;

  return {
    currencyStatus,
    currencyDetails,
    assetStatus,
    assetDetails,
    operationStatus,
    operationDetails,
    a_package_details,
    a_package_status,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCurrencies: () => dispatch(getAllCurrencies()),
    getAllAssets: () => dispatch(getAllAssets()),
    getAllOperationsEdit: (id) => dispatch(getAllOperationsEdit(id)),

    updatePackage: (payload, history, id) =>
      dispatch(updatePackage(payload, history, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Packages);
