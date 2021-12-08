import React, { Component } from "react";
import "../../../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "./formfromold.css";
// import "../Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
// import activeUser from '../../Assets/images/confirm.svg'
import { getAllAgentMemberPackages } from "../../../../services/agent/action";
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
      gridApi: null,
      isModalVisible: false,
      paginationGetCurrentPage: null,
      popup: false,
      isfeatured: true,
      showNewPackage: false,
      editNewPackage: false,
      value: "",
      columnDefs: [
        { headerName: "Name", field: "name", width: 250 },
        { headerName: "User Type", field: "agentType" },
        { headerName: "Plan Price ", field: "planPrice" },
        {
          headerName: "Featured",
          cellRendererFramework: (params) => (
            <div className="setAsFeaturedDiv">
              <span
                className={
                  params.data.isFeatured ? "yesF yesColorF" : "yesF noColorF"
                }
              >
                {params.data.isFeatured ? "Yes" : "No"}
              </span>
              <span
                style={{
                  textDecoration: "underline",
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  this.setAsFeaturedHandler(e, params.data);
                }}
              >
                {" "}
                {params.data.isFeatured ? "Unset Featured" : "Set as Featured"}
              </span>
            </div>
          ),
        },
        {
          headerName: "Default",
          cellRendererFramework: (params) => (
            <div className="setAsFeaturedDiv">
              <span
                className={
                  params.data.isFeatured ? "yesF yesColorF" : "yesF noColorF"
                }
              >
                {params.data.isDefault ? "Yes" : "No"}
              </span>
              <span
                style={{
                  textDecoration: "underline",
                  color: "blue",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  this.setAsFeaturedHandler(e, params.data);
                }}
              >
                {" "}
                {!params.data.isDefault ? "Set As Default" : ""}
              </span>
            </div>
          ),
        },

        {
          headerName: "Action",
          field: "Action",
          cellRendererFramework: (params) => (
            <div className="ac-view">
              <span
                className="icon-edit-2"
                style={{ cursor: "pointer" }}
                onClick={(e) => this.editNewPackage(e, params.data)}
              ></span>
              <span
                className="icon-Group-357"
                style={{ marginLeft: "5%" }}
              ></span>
            </div>
          ),
          cellStyle: (params) => {
            return { textAlign: "center" };
          },
        },
      ],
      rowData: [],
    };
  }

  onFirstDataRendered = (params) => {
    params.api.sizeColumnsToFit();
  };

  onGridReady = (params) => {
    this.setState({
      gridApi: params.api,
    });
    params.api.paginationGoToPage(10);
    document.getElementById("lbCurrentPage").innerHTML =
      this.state.gridApi.paginationGetCurrentPage() + 1;
    document.getElementById(
      "totalPageSize"
    ).innerHTML = this.state.rowData.length;
    document.getElementById("bTo").innerHTML = params.api.paginationGetPageSize(
      10
    );
    const changedV =
      params.api.paginationGetPageSize(10) *
      (this.state.gridApi.paginationGetCurrentPage() + 1);
    if (changedV <= this.state.rowData.length) {
      document.getElementById("afterTo").innerHTML =
        params.api.paginationGetPageSize(10) *
        (this.state.gridApi.paginationGetCurrentPage() + 1);
    } else {
      document.getElementById("afterTo").innerHTML = this.state.rowData.length;
    }
    // console.log("get",params.api.getDisplayedRowCount())
  };
  handleChange = (value) => {
    this.state.gridApi.paginationSetPageSize(Number(value));
    // document.getElementById('totalPageSize').innerHTML=this.state.gridApi.paginationGetPageSize()
    document.getElementById(
      "bTo"
    ).innerHTML = this.state.gridApi.paginationGetPageSize();
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
      if (changedV <= this.state.rowData.length) {
        document.getElementById("afterTo").innerHTML =
          this.state.gridApi.paginationGetPageSize(10) *
          (this.state.gridApi.paginationGetCurrentPage() + 1);
      } else {
        document.getElementById(
          "afterTo"
        ).innerHTML = this.state.rowData.length;
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

  addNewPackage = () => {
    this.props.history.push({ pathname: "/settings/general/addpackages" });
  };

  editNewPackage = (e, data) => {
    console.log(data,"dataaaaaa")
    this.props.history.push({
      pathname: "/settings/editpackages",
      state: data.packageId,
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
      addNewPackage: false,
      editNewPackage: false,
    });
  };

  componentDidMount() {
    this.props.getAllAgentMemberPackages();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps, "nextProps");
    if (nextProps.packagesStatus === true) {
      const filteredValue = nextProps.packagesDetails._embedded.agentPackageDtoList.filter(
        (data) => data.agentType === "AGENT_MEMBER"
      );
      console.log("filteredValue", nextProps);
      this.setState({
        rowData: filteredValue,
      });
    }
  }

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
                        <button
                          className="addposbtn c_first_pending_BTN"
                          onClick={this.addNewPackage}
                        >
                          Add New Package
                        </button>
                      </div>
                    </div>
                    <div
                      className="chartCardMiddle"
                      style={{ padding: "24px" }}
                    >
                      <div className="tableTop_wrapper">
                        <div className="disFl">
                          <h5 className="show_pp margin_right8">Show</h5>
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

                          <h5 className="show_pp margin_left8">Entries</h5>
                          <div
                            className="margin-left-auto"
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <div className="shortCustom">
                              <span className="icon-Asset-55"></span>
                              <h6>Sort</h6>
                            </div>
                            <div className="shortCustom">
                              <Dropdown
                                overlay={
                                  <ul class="filterDrd">
                                    <li>
                                      <a href="#">
                                        <span class="icon-logout"></span>All
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <span class="icon-logout"></span>
                                        Inactive
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <span class="icon-logout"></span>
                                        Active
                                      </a>
                                    </li>
                                  </ul>
                                }
                                placement="bottomLeft"
                                trigger={["click"]}
                              >
                                <div className="shortCustom01">
                                  <span className="icon-Asset-54"></span>
                                  <h6>Filter</h6>
                                </div>
                              </Dropdown>
                            </div>
                            <div
                              className="search_w_merchant_m"
                              style={{ width: "270px" }}
                            >
                              <input type="search" placeholder="Search" />
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
                          rowData={this.state.rowData}
                          pagination={true}
                          onGridReady={this.onGridReady}
                          onPaginationChanged={this.onPaginationChanged}
                          paginationPageSize={10}
                          suppressPaginationPanel={true}
                        />
                      </div>
                      <div className="customAgFooter">
                        <div className="showingFooter">
                          <span>Showing</span>
                          <span id="bTo"> </span>
                          <span>to</span>
                          <span id="afterTo"></span>
                          <span>of</span>
                          <span id="totalPageSize"></span>
                          <span>entries</span>
                        </div>
                        <div className="NextPrevW">
                          <button
                            className="NextPrev"
                            onClick={() => this.onBtPrevious()}
                          >
                            Prev
                          </button>
                          <span
                            className="valueNextPrev"
                            id="lbCurrentPage"
                          ></span>
                          <button
                            className="NextPrev"
                            onClick={() => this.onBtNext()}
                          >
                            Next
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
  const { packagesDetails, packagesStatus } = agentReducer;
  return {
    packagesDetails,
    packagesStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAgentMemberPackages: () => dispatch(getAllAgentMemberPackages()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Packages);
