import React, { Component } from "react";
import "../../../css/ag-grid-customization01.css";

import "../Settings/General/formfromold.css";
// import "../Agent/antDcustom.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { FormattedMessage, IntlProvider } from "react-intl";

import DeleteModal from "./General/DeleteModal";

import "react-phone-input-2/lib/style.css";

import "../Settings/General/settingcss.css";

import { Select } from "antd";
import { connect } from "react-redux";
import {
  createCommission,
  deleteCommission,
  getAllAgentMemberPackages,
  getAllCommissions,
  getAllCurrencies,
  getAllOperations,
  editCommission,
} from "../../../services/agent/action";
import { Input } from "reactstrap";

const { Option } = Select;

class CommissionsManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridApi: null,
      isModalVisible: false,
      paginationGetCurrentPage: null,
      popup: false,
      addNewCommissions: false,
      editNewCommissions: false,
      viewNewCommissions: false,
      activeStatus: true,
      deletePopup: false,
      value: 1,
      columnDefs: [
        { headerName: "Type", field: "Type" },
        { headerName: "Amount", field: "Amount" },
        { headerName: "Percentage ", field: "Percentage" },
        { headerName: "Status ", field: "Status" },
        {
          headerName: "Action",
          field: "Action",
          width: 400,
          cellRendererFramework: (params) => (
            <div className="ac-view">
              <button
                className="edit"
                onClick={() => this.editNewCommissions(params.data)}
              >
                <FormattedMessage id="agent.Edit" />
              </button>
              <button
                className="delete"
                onClick={() => this.handleDeleteModal(params.data.ID)}
              >
                <FormattedMessage id="agent.Delete" />
              </button>
            </div>
          ),
          cellStyle: (params) => {
            return { textAlign: "center" };
          },
        },
      ],

      operationsData: [],
      packagesData: [],
      currenciesData: [],
      commissionsData: [],

      commissionType: "FIXED",
      operation: "",
      package: "",
      currency: "",
      feeStructure: 1,
      amount: "",
      percentage: "",
      commissionStatus: true,
      commissionID: "",
      messages: "",
      language: "",
      idCommission: "",
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
        return import("../../i18n/messages/fr");
      default:
        return import("../../i18n/messages/en");
    }
  };

  componentDidMount() {
    this.props.getAllOperations();
    this.props.getAllAgentMemberPackages();
    this.props.getAllCurrencies();
    this.props.getAllCommissions();

    this.translationHelperFunction();
  }

  componentWillReceiveProps = async (nextprops) => {
    if (nextprops.operationDetails && nextprops.operationStatus) {
      this.setState({
        operationsData: nextprops.operationDetails._embedded.operationDtoList,
      });
    }

    if (nextprops.packagesStatus && nextprops.packagesDetails) {
      this.setState({
        packagesData: nextprops.packagesDetails._embedded.agentPackageDtoList,
      });
    }

    if (nextprops.currencyStatus && nextprops.currencyDetails) {
      this.setState({
        currenciesData: nextprops.currencyDetails._embedded.currencyDtoList,
      });
    }

    if (nextprops.addCommissionStatus && nextprops.addCommissionData) {
      this.setState({
        commissionType: "FIXED",
        operation: "",
        package: "",
        currency: "",
        feeStructure: 1,
        amount: "",
        percentage: "",
        commissionStatus: true,
      });
      this.viewNewCommissions();
    }

    if (nextprops.getCommissionStatus && nextprops.getCommissionData) {
      this.setState({
        commissionsData:
          nextprops.getCommissionData._embedded.commissionDtoList,
      });
    }

    if (nextprops.editCommissionStatus && nextprops.editCommissionData) {
      this.viewNewCommissions();
    }

    if (nextprops.language) {
      const messages = await this.loadLocaleData(nextprops.language);

      this.setState({
        messages: messages,
        language: nextprops.language,
      });

      if (nextprops.language == "fr") {
        this.setState({
          columnDefs: [
            { headerName: "Taper", field: "Type" },
            { headerName: "Montant", field: "Amount" },
            { headerName: "Pourcentage ", field: "Percentage" },
            { headerName: "État", field: "Status" },
            {
              headerName: "Action",
              field: "Action",
              width: 400,
              cellRendererFramework: (params) => (
                <div className="ac-view">
                  <button
                    className="edit"
                    onClick={() => this.editNewCommissions(params.data)}
                  >
                    <FormattedMessage id="agent.Edit" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => this.handleDeleteModal(params.data.ID)}
                  >
                    <FormattedMessage id="agent.Delete" />
                  </button>
                </div>
              ),
              cellStyle: (params) => {
                return { textAlign: "center" };
              },
            },
          ],
        });
      } else {
        this.setState({
          columnDefs: [
            { headerName: "Type", field: "Type" },
            { headerName: "Amount", field: "Amount" },
            { headerName: "Percentage ", field: "Percentage" },
            { headerName: "Status ", field: "Status" },
            {
              headerName: "Action",
              field: "Action",
              width: 400,
              cellRendererFramework: (params) => (
                <div className="ac-view">
                  <button
                    className="edit"
                    onClick={() => this.editNewCommissions(params.data)}
                  >
                    <FormattedMessage id="agent.Edit" />
                  </button>
                  <button
                    className="delete"
                    onClick={() => this.handleDeleteModal(params.data.ID)}
                  >
                    <FormattedMessage id="agent.Delete" />
                  </button>
                </div>
              ),
              cellStyle: (params) => {
                return { textAlign: "center" };
              },
            },
          ],
        });
      }
    }
  };

  handleDeleteModal = (id) => {
    this.setState({
      deletePopup: true,
      idCommission: id,
    });
  };

  handleDeleteModalRow = () => {
    this.setState({
      deletePopup: false,
    });

    this.props.deleteCommission(this.state.idCommission);
  };

  handleCloseModal = () => {
    this.setState({
      deletePopup: false,
    });
  };

  // deleteCommission = (commissionID) => {

  //     this.props.deleteCommission(commissionID);

  // }

  editCommission = () => {
    let payload;

    if (this.state.feeStructure == 1) {
      payload = {
        commissionId: this.state.commissionID,
        commissionType: this.state.commissionType,
        commissionAmount: this.state.amount,
        commissionPercentage: "0",
        active: this.state.commissionStatus,
      };
    } else if (this.state.feeStructure == 2) {
      payload = {
        commissionId: this.state.commissionID,
        commissionType: this.state.commissionType,
        commissionAmount: "0",
        commissionPercentage: this.state.percentage,
        active: this.state.commissionStatus,
      };
    } else {
      payload = {
        commissionId: this.state.commissionID,
        commissionType: this.state.commissionType,
        commissionAmount: this.state.amount,
        commissionPercentage: this.state.percentage,
        active: this.state.commissionStatus,
      };
    }

    this.props.editCommission(payload);
  };

  onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  addChange = () => {
    this.props.history.push("/tickets/AddTicket");
  };
  onGridReady = (params) => {
    this.setState({
      gridApi: params.api,
    });
    params.api.paginationGoToPage(10);
    document.getElementById("lbCurrentPage").innerHTML =
      this.state.gridApi.paginationGetCurrentPage() + 1;
    document.getElementById("totalPageSize").innerHTML =
      this.state.commissionsData.length;
    document.getElementById("bTo").innerHTML =
      params.api.paginationGetPageSize(10);
    const changedV =
      params.api.paginationGetPageSize(10) *
      (this.state.gridApi.paginationGetCurrentPage() + 1);
    if (changedV <= this.state.commissionsData.length) {
      document.getElementById("afterTo").innerHTML =
        params.api.paginationGetPageSize(10) *
        (this.state.gridApi.paginationGetCurrentPage() + 1);
    } else {
      document.getElementById("afterTo").innerHTML =
        this.state.commissionsData.length;
    }
  };

  handleChange = (value) => {
    this.state.gridApi.paginationSetPageSize(Number(value));
    // document.getElementById('totalPageSize').innerHTML=this.state.gridApi.paginationGetPageSize()
    document.getElementById("bTo").innerHTML =
      this.state.gridApi.paginationGetPageSize();
  };

  onPaginationChanged = () => {
    console.log("onPaginationPageLoaded");
    if (this.state.gridApi) {
      document.getElementById("lbCurrentPage").innerHTML =
        this.state.gridApi.paginationGetCurrentPage() + 1;
      document.getElementById("bTo").innerHTML =
        this.state.gridApi.paginationGetPageSize() *
          this.state.gridApi.paginationGetCurrentPage() +
        1;

      const changedV =
        this.state.gridApi.paginationGetPageSize(10) *
        (this.state.gridApi.paginationGetCurrentPage() + 1);
      if (changedV <= this.state.commissionsData.length) {
        document.getElementById("afterTo").innerHTML =
          this.state.gridApi.paginationGetPageSize(10) *
          (this.state.gridApi.paginationGetCurrentPage() + 1);
      } else {
        document.getElementById("afterTo").innerHTML =
          this.state.commissionsData.length;
      }
    }
  };

  onBtNext = () => {
    this.state.gridApi.paginationGoToNextPage();
    // console.log()
  };

  onBtPrevious = () => {
    this.state.gridApi.paginationGoToPreviousPage();
  };

  addNewCommissions = () => {
    this.setState({
      commissionID: "",
      commissionType: "FIXED",
      operation: "",
      package: "",
      currency: "",
      feeStructure: 1,
      amount: "",
      percentage: "",
      commissionStatus: true,
      addNewCommissions: true,
      editNewCommissions: false,
      viewNewCommissions: false,
    });
  };
  editNewCommissions = (data) => {
    console.log(data);
    this.setState({
      commissionID: data.ID,
      commissionType: data.Type,
      operation: "",
      package: "",
      currency: "",
      feeStructure:
        data.Amount > 0 && data.Percentage > 0 ? 3 : data.Amount > 0 ? 1 : 2,
      amount: data.Amount,
      percentage: data.Percentage,
      commissionStatus: data.Status == "Active" ? true : false,
      addNewCommissions: false,
      editNewCommissions: true,
      viewNewCommissions: false,
    });
  };
  viewNewCommissions = () => {
    this.setState({
      addNewCommissions: false,
      editNewCommissions: false,
      viewNewCommissions: true,
    });
  };

  setAsFeaturedHandler = (e, data) => {
    this.setState({
      isfeatured: !this.state.isfeatured,
    });
  };

  handleChangeSelect = (e) => {
    console.log(`selected ${e}`);
  };
  handleChangeN(event) {}
  back5 = () => {
    this.setState({
      addNewCommissions: false,
      editNewCommissions: false,
      viewNewCommissions: false,
    });
  };
  handleChangeSelect = (e) => {
    console.log(`selected ${e}`);
  };

  onChangeRadio = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  addCommission = () => {
    let payload;

    if (this.state.feeStructure == 1) {
      payload = {
        commissionType: this.state.commissionType,
        commissionAmount: this.state.amount,
        commissionPercentage: "0",
        active: this.state.commissionStatus,
      };
    } else if (this.state.feeStructure == 2) {
      payload = {
        commissionType: this.state.commissionType,
        commissionAmount: "0",
        commissionPercentage: this.state.percentage,
        active: this.state.commissionStatus,
      };
    } else {
      payload = {
        commissionType: this.state.commissionType,
        commissionAmount: this.state.amount,
        commissionPercentage: this.state.percentage,
        active: this.state.commissionStatus,
      };
    }

    this.props.createCommission(payload, this.props.history);
  };

  render() {
    const isfeatured = this.state.isfeatured;

    return (
      <IntlProvider
        messages={this.state.messages.default}
        locale={this.state.language?.length > 0 ? this.state.language : "en"}
      >
        <>
          {!this.state.addNewCommissions && !this.state.editNewCommissions && (
            <div className="main_contain">
              <div className="merch_m_list_w">
                <div className="merch_list_card" id="merch_list_card">
                  <div className="section_custom">
                    <div className="sectionInn">
                      <div className="chartCard_w">
                        <div className="chartCardTop">
                          <div className="kyccustomformheading">
                            <h1 className="list_top_heading textAlignCenter text-center">
                              <FormattedMessage id="agent.CommissionsList" />
                            </h1>
                            <button
                              className="addposbtn c_first_pending_BTN"
                              onClick={this.addNewCommissions}
                            >
                              <FormattedMessage id="agent.AddCommission" />
                            </button>
                          </div>
                        </div>
                        <div
                          className="chartCardMiddle"
                          style={{ padding: "24px" }}
                        >
                          {/* <div className="filter_wrapper_agent">
                                                    <div className="colagentfilter">
                                                        <label className="labelStyleagent">Subscription Plan</label>
                                                        <div className="categorySelect">
                                                            <Select
                                                                defaultValue="Active"
                                                                style={{ width: 100 + "%", height: 52 }}
                                                                onChange={this.handleChangeSelect}
                                                                id={'page-size'}
                                                            >
                                                                <Option value="1">Plan for inactive merchant</Option>
                                                                <Option value="2">Merchant Plan</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="colagentfilter">
                                                        <label className="labelStyleagent">Payment Method</label>
                                                        <div className="categorySelect">
                                                            <Select
                                                                defaultValue="1"
                                                                style={{ width: 100 + "%", height: 52 }}
                                                                onChange={this.handleChangeSelect}
                                                                id={'page-size'}
                                                            >
                                                                <Option value="1">Select...</Option>
                                                                <Option value="2">Payment Method 1</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="colagentfilter">
                                                        <label className="labelStyleagent">Currency</label>
                                                        <div className="categorySelect">
                                                            <Select
                                                                defaultValue="1"
                                                                style={{ width: 100 + "%", height: 52 }}
                                                                onChange={this.handleChangeSelect}
                                                                id={'page-size'}
                                                            >
                                                                <Option value="1">Dollor</Option>
                                                                <Option value="2">Rupees</Option>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="colagentfilter">
                                                        <label className="labelStyleagent" style={{ opacity: 0 }}>Reset</label>
                                                        <div className="disFlrow">
                                                            <div class="confirm_p_w newone">
                                                                <button class="aryousureBTN confirmBtnR newBtnTra reset">Reset</button>
                                                            </div>
                                                            <div class="confirm_p_w">
                                                                <button class="aryousureBTN confirmBtnR newBtnTra">Filter</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                          <div className="tableTop_wrapper">
                            <div className="disFl">
                              <h5 className="show_pp margin_right8">
                                <FormattedMessage id="agent.Show" />
                              </h5>
                              <div className="tableShowRecordPerPage">
                                <Select
                                  defaultValue="10"
                                  style={{ width: 74, height: 27 }}
                                  onChange={this.handleChange}
                                  id={"page-size"}
                                >
                                  <Option value="10">10</Option>
                                  <Option value="25">25</Option>
                                  <Option value="100">100</Option>
                                  {/* <Option value="all">all</Option> */}
                                </Select>
                              </div>

                              <h5 className="show_pp margin_left8">
                                <FormattedMessage id="agent.Entries" />
                              </h5>
                              <div
                                className="margin-left-auto"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div className="shortCustom">
                                  <span className="icon-Asset-55"></span>
                                  <h6>
                                    <FormattedMessage id="agent.Sort" />
                                  </h6>
                                </div>
                                <div className="shortCustom">
                                  <Dropdown
                                    overlay={
                                      <ul class="filterDrd">
                                        <li>
                                          <a href="#">
                                            <span class="icon-logout"></span>
                                            <FormattedMessage id="agent.All" />
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <span class="icon-logout"></span>
                                            <FormattedMessage id="agent.Inactive" />
                                          </a>
                                        </li>
                                        <li>
                                          <a href="#">
                                            <span class="icon-logout"></span>
                                            <FormattedMessage id="agent.Active" />
                                          </a>
                                        </li>
                                      </ul>
                                    }
                                    placement="bottomLeft"
                                    trigger={["click"]}
                                  >
                                    <div className="shortCustom01">
                                      <span className="icon-Asset-54"></span>
                                      <h6>
                                        <FormattedMessage id="agent.Filter" />
                                      </h6>
                                    </div>
                                  </Dropdown>
                                </div>
                                <div
                                  className="search_w_merchant_m"
                                  style={{ width: "270px" }}
                                >
                                  <FormattedMessage id="agent.Search">
                                    {(placeholder) => (
                                      <input
                                        type="search"
                                        placeholder={placeholder}
                                      />
                                    )}
                                  </FormattedMessage>
                                </div>
                              </div>
                            </div>
                            {/* <div className="actionBtnWp">
                                                <span className="icon-Asset-51"></span>
                                                <span className="icon-Asset-52"></span>
                                                <span className="icon-Asset-53"></span>
                                            </div> */}
                          </div>
                          <div
                            className="ag-theme-alpine agGridCustomize"
                            style={{ height: 400, width: 100 + "%" }}
                          >
                            <AgGridReact
                              rowHeight={55}
                              defaultColDef={{ resizable: true }}
                              onFirstDataRendered={this.onFirstDataRendered}
                              columnDefs={this.state.columnDefs}
                              rowData={this.state.commissionsData.map(
                                (data) => {
                                  return {
                                    Type: data.commissionType,
                                    Amount: data.commissionAmount,
                                    Percentage: data.commissionPercentage,
                                    Status: data.active ? "Active" : "Inactive",
                                    ID: data.commissionId,
                                  };
                                }
                              )}
                              pagination={true}
                              onGridReady={this.onGridReady}
                              onPaginationChanged={this.onPaginationChanged}
                              paginationPageSize={10}
                              suppressPaginationPanel={true}
                            />
                          </div>
                          <div className="customAgFooter">
                            <div className="showingFooter">
                              <span>
                                <FormattedMessage id="agent.Showing" />
                              </span>
                              <span id="bTo"> </span>
                              <span>
                                <FormattedMessage id="agent.To" />
                              </span>
                              <span id="afterTo"></span>
                              <span>
                                <FormattedMessage id="agent.Of" />
                              </span>
                              <span id="totalPageSize"></span>
                              <span>
                                <FormattedMessage id="agent.Entries" />
                              </span>
                            </div>
                            <div className="NextPrevW">
                              <button
                                className="NextPrev"
                                onClick={() => this.onBtPrevious()}
                              >
                                <FormattedMessage id="agent.Prev" />
                              </button>
                              <span
                                className="valueNextPrev"
                                id="lbCurrentPage"
                              ></span>
                              <button
                                className="NextPrev"
                                onClick={() => this.onBtNext()}
                              >
                                <FormattedMessage id="agent.Next" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {this.state.popup == true ? (
                        <div className="custommodal custommodal-fadein modal_w">
                          <div className="custommodal-dailog">
                            <div className="custommodal-content">
                              <div className="shopmodal modal_w_in">
                                <div className="viewshopheading">
                                  <h4>View Point of Sale</h4>
                                </div>
                                <div className="viewshopdetails">
                                  <label>Point of Sale Merchant Name :</label>
                                  <span>Shop name</span>
                                </div>
                                <hr />
                                <div className="viewshopdetails">
                                  <label>Shop Name:</label>
                                  <span>WIIK eV</span>
                                </div>
                                <hr />
                                <div className="viewshopcancelbtn">
                                  <button onClick={this.close}>Close</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {this.state.deletePopup && (
                <DeleteModal
                  handleCloseModal={this.handleCloseModal}
                  handleDeleteModalRow={this.handleDeleteModalRow}
                  deleteMessage={"Are you sure to delete this commission?"}
                />
              )}
            </div>
          )}

          {this.state.addNewCommissions && (
            <div className="main_contain agentformCenter">
              <div className="merch_m_list_w">
                <div className="merch_list_card" id="merch_list_card">
                  <div className="section_custom">
                    <div className="sectionInn">
                      <div className="chartCard_w">
                        <div className="chartCardTop">
                          <div className="kyccustomformheading">
                            <h1 className="list_top_heading textAlignCenter text-center">
                              <FormattedMessage id="agent.AddNewCommissions" />
                            </h1>
                          </div>
                        </div>
                        <div
                          className="chartCardMiddle"
                          style={{ padding: "24px" }}
                        >
                          <div className="containerBiaN_form">
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.CommissionType" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue="FIXED"
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState({
                                        commissionType: e,
                                      });
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value="FIXED">
                                      <FormattedMessage id="agent.FIXED" />
                                    </Option>
                                    <Option value="PERCENTAGE">
                                      <FormattedMessage id="agent.PERCENTAGE" />
                                    </Option>
                                    <Option value="SLAB">SLAB</Option>
                                    <Option value="FIXED_AND_PERCENTAGE">
                                      <FormattedMessage id="agent.FIXEDANDPERCENTAGE" />
                                    </Option>
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.Operations" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue="Default"
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState({
                                        operation: e,
                                      });
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value="Default" disabled={true}>
                                      Select Operation
                                    </Option>

                                    {this.state.operationsData.length > 0 ? (
                                      <>
                                        {this.state.operationsData.map(
                                          (data) => {
                                            return (
                                              <Option value={data.name}>
                                                {data.name}
                                              </Option>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.Package" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue="Default"
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState({
                                        package: e,
                                      });
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value="Default" disabled={true}>
                                      Select Package
                                    </Option>

                                    {this.state.packagesData.length > 0 ? (
                                      <>
                                        {this.state.packagesData.map((data) => {
                                          if (data.active && data.name != "") {
                                            return (
                                              <Option value={data.name}>
                                                {data.name}
                                              </Option>
                                            );
                                          }
                                        })}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.Currency" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue="Default"
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState({
                                        currency: e,
                                      });
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value="Default" disabled={true}>
                                      <FormattedMessage id="agent.SelectCurrency" />
                                    </Option>

                                    {this.state.currenciesData.length > 0 ? (
                                      <>
                                        {this.state.currenciesData.map(
                                          (data) => {
                                            return (
                                              <Option value={data.name}>
                                                {data.name}
                                              </Option>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.LowerBound" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <FormattedMessage id="agent.EnterLowerBound">
                                  {(placeholder) => (
                                    <input
                                      type="text"
                                      placeholder={placeholder}
                                    />
                                  )}
                                </FormattedMessage>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.UpperBound" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <FormattedMessage id="agent.EnterUpperBound">
                                  {(placeholder) => (
                                    <input
                                      type="text"
                                      placeholder={placeholder}
                                    />
                                  )}
                                </FormattedMessage>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.FeeStructure" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue={this.state.feeStructure}
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState(
                                        {
                                          feeStructure: e,
                                        },
                                        () => {
                                          console.log(this.state, "state");
                                        }
                                      );
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value={1}>
                                      <FormattedMessage id="agent.Amount" />
                                    </Option>
                                    <Option value={2}>
                                      <FormattedMessage id="agent.Percentage" />
                                    </Option>
                                    <Option value={3}>
                                      <FormattedMessage id="agent.Both" />
                                    </Option>
                                  </Select>
                                </div>
                              </div>
                            </div>

                            {this.state.feeStructure == 1 ? (
                              <>
                                <div className="containerBiaN_f_row">
                                  <div className="containerBiaN_f_col width30percent textAlignRight">
                                    <label>
                                      <FormattedMessage id="agent.Amount" />{" "}
                                      <span className="mantdat">*</span>
                                    </label>
                                  </div>
                                  <div className="containerBiaN_f_col width70percent">
                                    <div
                                      className="inputFlash2"
                                      style={{ marginLeft: 0, width: "100%" }}
                                    >
                                      <Input
                                        value={this.state.amount}
                                        onChange={(e) => {
                                          this.setState({
                                            amount: e.target.value,
                                          });
                                        }}
                                        placeholder="Enter Amount"
                                      >
                                        {" "}
                                      </Input>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : this.state.feeStructure == 2 ? (
                              <>
                                <div className="containerBiaN_f_row">
                                  <div className="containerBiaN_f_col width30percent textAlignRight">
                                    <label>
                                      <FormattedMessage id="agent.Percentage" />{" "}
                                      <span className="mantdat">*</span>
                                    </label>
                                  </div>
                                  <div className="containerBiaN_f_col width70percent">
                                    <div
                                      className="inputFlash2"
                                      style={{ marginLeft: 0, width: "100%" }}
                                    >
                                      <Input
                                        value={this.state.percentage}
                                        onChange={(e) => {
                                          this.setState({
                                            percentage: e.target.value,
                                          });
                                        }}
                                        placeholder="Enter Percentage"
                                      >
                                        {" "}
                                      </Input>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="containerBiaN_f_row">
                                  <div className="containerBiaN_f_col width30percent textAlignRight">
                                    <label>
                                      <FormattedMessage id="agent.Amount" />{" "}
                                      <span className="mantdat">*</span>
                                    </label>
                                  </div>
                                  <div className="containerBiaN_f_col width70percent">
                                    <div
                                      className="inputFlash2"
                                      style={{ marginLeft: 0, width: "100%" }}
                                    >
                                      <FormattedMessage id="agent.EnterAmount">
                                        {(placeholder) => (
                                          <Input
                                            value={this.state.amount}
                                            onChange={(e) => {
                                              this.setState({
                                                amount: e.target.value,
                                              });
                                            }}
                                            placeholder={placeholder}
                                          >
                                            {" "}
                                          </Input>
                                        )}
                                      </FormattedMessage>
                                    </div>
                                  </div>
                                </div>

                                <div className="containerBiaN_f_row">
                                  <div className="containerBiaN_f_col width30percent textAlignRight">
                                    <label>
                                      <FormattedMessage id="agent.Percentage" />{" "}
                                      <span className="mantdat">*</span>
                                    </label>
                                  </div>
                                  <div className="containerBiaN_f_col width70percent">
                                    <div
                                      className="inputFlash2"
                                      style={{ marginLeft: 0, width: "100%" }}
                                    >
                                      <Input
                                        value={this.state.percentage}
                                        onChange={(e) => {
                                          this.setState({
                                            percentage: e.target.value,
                                          });
                                        }}
                                        placeholder="Enter Percentage"
                                      >
                                        {" "}
                                      </Input>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.Status" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue={this.state.commissionStatus}
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState({
                                        commissionStatus: e,
                                      });
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value={true}>
                                      <FormattedMessage id="agent.Active" />
                                    </Option>
                                    <Option value={false}>
                                      <FormattedMessage id="agent.Inactive" />
                                    </Option>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </div>

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
                                onClick={() => this.addCommission()}
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
          )}
          {this.state.editNewCommissions && (
            <div className="main_contain agentformCenter">
              <div className="merch_m_list_w">
                <div className="merch_list_card" id="merch_list_card">
                  <div className="section_custom">
                    <div className="sectionInn">
                      <div className="chartCard_w">
                        <div className="chartCardTop">
                          <div className="kyccustomformheading">
                            <h1 className="list_top_heading textAlignCenter text-center">
                              <FormattedMessage id="agent.EditCommission" />{" "}
                            </h1>
                          </div>
                        </div>
                        <div
                          className="chartCardMiddle"
                          style={{ padding: "24px" }}
                        >
                          <div className="containerBiaN_form">
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.CommissionType" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue={this.state.commissionType}
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState({
                                        commissionType: e,
                                      });
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value="FIXED">
                                      <FormattedMessage id="agent.FIXED" />
                                    </Option>
                                    <Option value="PERCENTAGE">
                                      <FormattedMessage id="agent.PERCENTAGE" />
                                    </Option>
                                    <Option value="SLAB">SLAB</Option>
                                    <Option value="FIXED_AND_PERCENTAGE">
                                      <FormattedMessage id="agent.FIXEDANDPERCENTAGE" />
                                    </Option>
                                  </Select>
                                </div>
                              </div>
                            </div>

                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.Operations" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue="Default"
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState({
                                        operation: e,
                                      });
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value="Default" disabled={true}>
                                      <FormattedMessage id="agent.SelectOperation" />
                                    </Option>

                                    {this.state.operationsData.length > 0 ? (
                                      <>
                                        {this.state.operationsData.map(
                                          (data) => {
                                            return (
                                              <Option value={data.name}>
                                                {data.name}
                                              </Option>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.Package" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue="Default"
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState({
                                        package: e,
                                      });
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value="Default" disabled={true}>
                                      <FormattedMessage id="agent.SelectPackage" />
                                    </Option>

                                    {this.state.packagesData.length > 0 ? (
                                      <>
                                        {this.state.packagesData.map((data) => {
                                          if (data.active && data.name != "") {
                                            return (
                                              <Option value={data.name}>
                                                {data.name}
                                              </Option>
                                            );
                                          }
                                        })}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.Currency" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue="Default"
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState({
                                        currency: e,
                                      });
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value="Default" disabled={true}>
                                      <FormattedMessage id="agent.SelectCurrency" />
                                    </Option>

                                    {this.state.currenciesData.length > 0 ? (
                                      <>
                                        {this.state.currenciesData.map(
                                          (data) => {
                                            return (
                                              <Option value={data.name}>
                                                {data.name}
                                              </Option>
                                            );
                                          }
                                        )}
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </Select>
                                </div>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.LowerBound" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <FormattedMessage id="agent.EnterLowerBound">
                                  {(placeholder) => (
                                    <input
                                      type="text"
                                      placeholder={placeholder}
                                    />
                                  )}
                                </FormattedMessage>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.UpperBound" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <FormattedMessage id="agent.EnterUpperBound">
                                  {(placeholder) => (
                                    <input
                                      type="text"
                                      placeholder={placeholder}
                                    />
                                  )}
                                </FormattedMessage>
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.FeeStructure" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue={this.state.feeStructure}
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState(
                                        {
                                          feeStructure: e,
                                        },
                                        () => {
                                          console.log(this.state, "state");
                                        }
                                      );
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value={1}>
                                      <FormattedMessage id="agent.Amount" />
                                    </Option>
                                    <Option value={2}>
                                      <FormattedMessage id="agent.Percentage" />
                                    </Option>
                                    <Option value={3}>
                                      <FormattedMessage id="agent.Both" />
                                    </Option>
                                  </Select>
                                </div>
                              </div>
                            </div>

                            {this.state.feeStructure == 1 ? (
                              <>
                                <div className="containerBiaN_f_row">
                                  <div className="containerBiaN_f_col width30percent textAlignRight">
                                    <label>
                                      <FormattedMessage id="agent.Amount" />{" "}
                                      <span className="mantdat">*</span>
                                    </label>
                                  </div>
                                  <div className="containerBiaN_f_col width70percent">
                                    <div
                                      className="inputFlash2"
                                      style={{ marginLeft: 0, width: "100%" }}
                                    >
                                      <FormattedMessage id="agent.EnterAmount">
                                        {(placeholder) => (
                                          <Input
                                            value={this.state.amount}
                                            onChange={(e) => {
                                              this.setState({
                                                amount: e.target.value,
                                              });
                                            }}
                                            placeholder={placeholder}
                                          >
                                            {" "}
                                          </Input>
                                        )}
                                      </FormattedMessage>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : this.state.feeStructure == 2 ? (
                              <>
                                <div className="containerBiaN_f_row">
                                  <div className="containerBiaN_f_col width30percent textAlignRight">
                                    <label>
                                      <FormattedMessage id="agent.Percentage" />{" "}
                                      <span className="mantdat">*</span>
                                    </label>
                                  </div>
                                  <div className="containerBiaN_f_col width70percent">
                                    <div
                                      className="inputFlash2"
                                      style={{ marginLeft: 0, width: "100%" }}
                                    >
                                      <Input
                                        value={this.state.percentage}
                                        onChange={(e) => {
                                          this.setState({
                                            percentage: e.target.value,
                                          });
                                        }}
                                        placeholder="Enter Percentage"
                                      >
                                        {" "}
                                      </Input>
                                    </div>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="containerBiaN_f_row">
                                  <div className="containerBiaN_f_col width30percent textAlignRight">
                                    <label>
                                      <FormattedMessage id="agent.Amount" />{" "}
                                      <span className="mantdat">*</span>
                                    </label>
                                  </div>
                                  <div className="containerBiaN_f_col width70percent">
                                    <div
                                      className="inputFlash2"
                                      style={{ marginLeft: 0, width: "100%" }}
                                    >
                                      <FormattedMessage id="agent.EnterAmount">
                                        {(placeholder) => (
                                          <Input
                                            value={this.state.amount}
                                            onChange={(e) => {
                                              this.setState({
                                                amount: e.target.value,
                                              });
                                            }}
                                            placeholder={placeholder}
                                          >
                                            {" "}
                                          </Input>
                                        )}
                                      </FormattedMessage>
                                    </div>
                                  </div>
                                </div>

                                <div className="containerBiaN_f_row">
                                  <div className="containerBiaN_f_col width30percent textAlignRight">
                                    <label>
                                      <FormattedMessage id="agent.Percentage" />{" "}
                                      <span className="mantdat">*</span>
                                    </label>
                                  </div>
                                  <div className="containerBiaN_f_col width70percent">
                                    <div
                                      className="inputFlash2"
                                      style={{ marginLeft: 0, width: "100%" }}
                                    >
                                      <Input
                                        value={this.state.percentage}
                                        onChange={(e) => {
                                          this.setState({
                                            percentage: e.target.value,
                                          });
                                        }}
                                        placeholder="Enter Percentage"
                                      >
                                        {" "}
                                      </Input>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}

                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>
                                  <FormattedMessage id="agent.Status" />{" "}
                                  <span className="mantdat">*</span>
                                </label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <div className="categorySelect">
                                  <Select
                                    defaultValue={this.state.commissionStatus}
                                    style={{ width: 100 + "%", height: 52 }}
                                    onChange={(e) => {
                                      this.setState({
                                        commissionStatus: e,
                                      });
                                    }}
                                    id={"page-size"}
                                  >
                                    <Option value={true}>
                                      <FormattedMessage id="agent.Active" />
                                    </Option>
                                    <Option value={false}>
                                      <FormattedMessage id="agent.Inactive" />
                                    </Option>
                                  </Select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div style={{ width: "100%", float: "left" }}>
                            <div className="custom-d-flex confirm_p_w mTB00 button-container rspacing">
                              <button
                                className="blackbtn aryousureBTN confirmBtnR"
                                onClick={this.back5}
                              >
                                <FormattedMessage id="cancel" />
                              </button>
                              <button
                                className="aryousureBTN confirmBtnR"
                                onClick={() => this.editCommission()}
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
          )}
        </>
      </IntlProvider>
    );
  }
}

// function for mapping redux state values with props //
const mapStateToProps = ({ agentReducer, commonReducer }) => {
  return {
    operationStatus: agentReducer.operationStatus,
    operationDetails: agentReducer.operationDetails,
    packagesStatus: agentReducer.packagesStatus,
    packagesDetails: agentReducer.packagesDetails,
    currencyStatus: agentReducer.currencyStatus,
    currencyDetails: agentReducer.currencyDetails,
    addCommissionStatus: agentReducer.addCommissionStatus,
    addCommissionData: agentReducer.addCommissionData,
    getCommissionStatus: agentReducer.getCommissionStatus,
    getCommissionData: agentReducer.getCommissionData,
    deleteCommissionStatus: agentReducer.deleteCommissionStatus,
    deleteCommissionData: agentReducer.deleteCommissionData,
    editCommissionStatus: agentReducer.editCommissionStatus,
    editCommissionData: agentReducer.editCommissionData,

    language: commonReducer.language,
  };
};

//function for maping with dispatched actions with props //
const mapDispatchToProps = (dispatch) => ({
  getAllOperations: () => dispatch(getAllOperations()),
  getAllAgentMemberPackages: () => dispatch(getAllAgentMemberPackages()),
  getAllCurrencies: () => dispatch(getAllCurrencies()),
  createCommission: (payload, history) =>
    dispatch(createCommission(payload, history)),
  getAllCommissions: () => dispatch(getAllCommissions()),
  deleteCommission: (id) => dispatch(deleteCommission(id)),
  editCommission: (payload) => dispatch(editCommission(payload)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommissionsManagement);
