import React, { Component } from "react";
import "../../css/dashboard.css";
import "../../css/merchant_management.css";
import "../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "./antDcustom.css";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { connect } from "react-redux";
import { Select, Dropdown } from "antd";
import { FormattedMessage, IntlProvider } from "react-intl";
import DeleteModal from "../page/Settings/General/DeleteModal";
import {
  addAsset,
  deleteAsset,
  getAllAssets,
  updateAsset,
} from "../../services/agent/action";
const { Option } = Select;

class Ticket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridApi: null,
      editData: [],
      editStatus: false,
      summary: [],
      isModalVisible: false,
      paginationGetCurrentPage: null,
      popup: false,
      deletePopup: false,
      columnDefs: [
        { headerName: "Name", field: "name", width: 250 },
        { headerName: "Status ", field: "status" },
        {
          headerName: "Action",
          field: "Action",
          cellRendererFramework: (params) => (
            <div className="ac-view">
              <button onClick={(e) => this.editAsset(e, params.data)}>
                {<FormattedMessage id="agent.Edit" />}
              </button>
              &ensp;
              <button onClick={() => this.handleDeleteModal(params.data.id)}>
                {<FormattedMessage id="agent.Delete" />}
              </button>
            </div>
          ),
          cellStyle: (params) => {
            return { textAlign: "center" };
          },
        },
      ],
      rowData: [],

      assetData: [],

      mainAssetView: true,
      addAssetView: false,
      editAssetView: false,

      assetName: "",
      assetStatus: false,
      assetID: "",
      messages: "",
      language: "",
      idAsset: "",
    };
  }
  save = () => {
    this.setState({
      popup: true,
    });
  };
  close = () => {
    this.setState({
      popup: false,
    });
  };
  onFirstDataRendered = (params) => {
    // ResponsiveAg-Grid
    if (window.innerWidth < 1023) {
      this.state.gridColumnApi.autoSizeColumns();
    } else {
      params.api.sizeColumnsToFit();
    }
  };
  editChange = () => {
    this.props.history.push("/Shops_Points_Sales/EditPOS");
  };
  addChange = () => {
    // this.props.history.push("/agent/assets/add-asset");
    this.setState({
      mainAssetView: false,
      addAssetView: true,
      assetName: "",
      assetStatus: false,
    });
  };

  goToMainAssetPage = () => {
    this.setState({
      mainAssetView: true,
      addAssetView: false,
      editAssetView: false,
      assetID: "",
      assetName: "",
      assetStatus: false,
    });
  };

  editAsset = (e, data) => {
    // console.log(data.status,"active")

    this.setState({
      assetID: data.id,
      assetName: data.name,
      assetStatus: data.status,
      editAssetView: true,
      mainAssetView: false,
    });

    // this.props.history.push({
    //   pathname: "/tickets/reply",
    //   state: { data: data.ticketNo },
    // });
  };

  handleDeleteModal = (id) => {
    this.setState({
      deletePopup: true,
      idAsset: id,
    });
  };

  handleDeleteModalRow = () => {
    this.setState({
      deletePopup: false,
    });

    this.props.deleteAsset(this.state.idAsset);
  };

  handleCloseModal = () => {
    this.setState({
      deletePopup: false,
    });
  };

  // deleteAsset = (e, data) => {

  //   // console.log(data.id);

  //   this.props.deleteAsset(data.id);

  // };

  onGridReady = (params) => {
    this.setState({
      gridApi: params.api,
      gridColumnApi: params.columnApi,
    });
    params.api.paginationGoToPage(10);
    document.getElementById("lbCurrentPage").innerHTML =
      this.state.gridApi.paginationGetCurrentPage() + 1;
    document.getElementById("totalPageSize").innerHTML =
      this.state.assetData.length;
    document.getElementById("bTo").innerHTML =
      params.api.paginationGetPageSize(10);
    const changedV =
      params.api.paginationGetPageSize(10) *
      (this.state.gridApi.paginationGetCurrentPage() + 1);
    if (changedV <= this.state.assetData.length) {
      document.getElementById("afterTo").innerHTML =
        params.api.paginationGetPageSize(10) *
        (this.state.gridApi.paginationGetCurrentPage() + 1);
    } else {
      document.getElementById("afterTo").innerHTML =
        this.state.assetData.length;
    }
    // console.log("get",params.api.getDisplayedRowCount())
  };
  handleChange = (value) => {
    this.state.gridApi.paginationSetPageSize(Number(value));
    // document.getElementById('totalPageSize').innerHTML=this.state.gridApi.paginationGetPageSize()
    document.getElementById("bTo").innerHTML =
      this.state.gridApi.paginationGetPageSize();
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  onCloseHandler = () => {
    this.setState({
      isModalVisible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
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
      if (changedV <= this.state.assetData.length) {
        document.getElementById("afterTo").innerHTML =
          this.state.gridApi.paginationGetPageSize(10) *
          (this.state.gridApi.paginationGetCurrentPage() + 1);
      } else {
        document.getElementById("afterTo").innerHTML =
          this.state.assetData.length;
      }
    }
  };

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
        return import("../i18n/messages/fr");
      default:
        return import("../i18n/messages/en");
    }
  };

  componentDidMount() {
    this.props.getAllAssets(sessionStorage.getItem("token"));

    this.translationHelperFunction();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.assetDetails) {
      console.log("hello next", nextProps.assetDetails._embedded.assetDtoList);
      this.setState({
        assetData: nextProps.assetDetails._embedded.assetDtoList,
      });
    }

    if (nextProps.addAssetStatus && nextProps.addAssetData) {
      this.goToMainAssetPage();
    }

    if (nextProps.editAssetStatus && nextProps.editAssetData) {
      this.goToMainAssetPage();
    }

    if (nextProps.language) {
      const messages = await this.loadLocaleData(nextProps.language);

      this.setState({
        messages: messages,
        language: nextProps.language,
      });
    }

    if (nextProps.language == "fr") {
      this.setState({
        columnDefs: [
          { headerName: "Nom", field: "name", width: 250 },
          { headerName: "État ", field: "status" },
          {
            headerName: "Action",
            field: "Action",
            cellRendererFramework: (params) => (
              <div className="ac-view">
                <button onClick={(e) => this.editAsset(e, params.data)}>
                  {<FormattedMessage id="agent.Edit" />}
                </button>
                &ensp;
                <button onClick={() => this.handleDeleteModal(params.data.id)}>
                  {<FormattedMessage id="agent.Delete" />}
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
          { headerName: "Name", field: "name", width: 250 },
          { headerName: "Status ", field: "status" },
          {
            headerName: "Action",
            field: "Action",
            cellRendererFramework: (params) => (
              <div className="ac-view">
                <button onClick={(e) => this.editAsset(e, params.data)}>
                  {<FormattedMessage id="agent.Edit" />}
                </button>
                &ensp;
                <button onClick={() => this.handleDeleteModal(params.data.id)}>
                  {<FormattedMessage id="agent.Delete" />}
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

  onFilterTextBoxChanged = () => {
    this.state.gridApi.setQuickFilter(
      document.getElementById("filter-text-box").value
    );
  };

  onBtNext = () => {
    this.state.gridApi.paginationGoToNextPage();
    // console.log()
  };

  goBack = () => {
    this.setState({
      editStatus: false,
    });
  };

  onBtPrevious = () => {
    this.state.gridApi.paginationGoToPreviousPage();
  };

  onAddAsset = () => {
    console.log(this.state.assetName, "ASSET NAME");
    console.log(this.state.assetStatus, "ASSET STATUS");

    const data = {
      name: this.state.assetName,
      active: this.state.assetStatus,
    };

    this.props.addAsset(data);
  };

  onEditAsset = () => {
    // console.log(this.state.assetName, "ASSET NAME")
    // console.log(this.state.assetStatus, "ASSET STATUS")

    let data = {
      assetId: this.state.assetID,
      name: this.state.assetName,
      active: this.state.assetStatus,
    };

    // console.log(data, "EDIT DATA");

    this.props.updateAsset(this.state.assetID, data);
  };

  render() {
    console.log("show summary", this.state.summary);
    // console.log("jai",this.state.paginationGetCurrentPage)
    return (
      <IntlProvider
        messages={this.state.messages.default}
        locale={this.state.language?.length > 0 ? this.state.language : "en"}
      >
        <>
          {this.state.mainAssetView && (
            <>
              <div className="main_contain responsive_p_a">
                <div className="merch_m_list_w">
                  <div className="merch_list_card" id="merch_list_card">
                    <div className="section_custom">
                      <div className="sectionInn">
                        <div className="chartCard_w">
                          <div className="chartCardTop">
                            <div className="kyccustomformheading">
                              <h1 className="list_top_heading textAlignCenter text-center">
                                <FormattedMessage id="agent.Assets" />
                              </h1>
                              <button
                                className="addposbtn c_first_pending_BTN btnMaxWidth"
                                onClick={this.addChange}
                              >
                                <FormattedMessage id="agent.AddAssets" />
                              </button>
                            </div>
                          </div>
                          <div
                            className="chartCardMiddle"
                            style={{ padding: "24px" }}
                          >
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
                                    <input
                                      type="search"
                                      placeholder="Search"
                                      id="filter-text-box"
                                      placeholder="Search"
                                      onChange={this.onFilterTextBoxChanged}
                                    />
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
                                rowData={this.state.assetData.map((data) => {
                                  return {
                                    id: data.assetId,
                                    name: data.name,
                                    status: data.active ? "Active" : "Inactive",
                                  };
                                })}
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
                      </div>
                    </div>
                  </div>
                </div>
                {this.state.deletePopup && (
                  <DeleteModal
                    handleCloseModal={this.handleCloseModal}
                    handleDeleteModalRow={this.handleDeleteModalRow}
                    deleteMessage={"Are you sure to delete this asset?"}
                  />
                )}
              </div>
            </>
          )}

          {this.state.addAssetView && (
            <>
              <div className="main_contain agentformCenter">
                <div className="merch_m_list_w">
                  <div className="merch_list_card" id="merch_list_card">
                    <div className="section_custom">
                      <div className="sectionInn">
                        <div className="chartCard_w">
                          <div className="chartCardTop">
                            <div className="kyccustomformheading">
                              <h1 className="list_top_heading textAlignCenter text-center">
                                <FormattedMessage id="agent.AddNewAsset" />
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
                                    <FormattedMessage id="agent.Name" />
                                    <span className="mantdat">*</span>
                                  </label>
                                </div>
                                <div className="containerBiaN_f_col width70percent">
                                  <FormattedMessage id="agent.EnterAssetName">
                                    {(placeholder) => (
                                      <input
                                        type="text"
                                        value={this.state.assetName}
                                        placeholder={placeholder}
                                        onChange={(e) => {
                                          this.setState({
                                            assetName: e.target.value,
                                          });
                                        }}
                                      />
                                    )}
                                  </FormattedMessage>
                                </div>
                              </div>
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
                                      defaultValue={this.state.assetStatus}
                                      style={{ width: 100 + "%", height: 52 }}
                                      onChange={(e) => {
                                        this.setState({
                                          assetStatus: e,
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
                                  onClick={this.goToMainAssetPage}
                                >
                                  <FormattedMessage id="cancel" />
                                </button>
                                <button
                                  className="aryousureBTN confirmBtnR"
                                  onClick={this.onAddAsset}
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
          )}

          {this.state.editAssetView && (
            <>
              <div className="main_contain agentformCenter">
                <div className="merch_m_list_w">
                  <div className="merch_list_card" id="merch_list_card">
                    <div className="section_custom">
                      <div className="sectionInn">
                        <div className="chartCard_w">
                          <div className="chartCardTop">
                            <div className="kyccustomformheading">
                              <h1 className="list_top_heading textAlignCenter text-center">
                                <FormattedMessage id="agent.UpdateAsset" />
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
                                    <FormattedMessage id="agent.Name" />
                                    <span className="mantdat">*</span>
                                  </label>
                                </div>
                                <div className="containerBiaN_f_col width70percent">
                                  <FormattedMessage id="agent.EnterAssetName">
                                    {(placeholder) => (
                                      <input
                                        type="text"
                                        value={this.state.assetName}
                                        placeholder={placeholder}
                                        onChange={(e) => {
                                          this.setState({
                                            assetName: e.target.value,
                                          });
                                        }}
                                      />
                                    )}
                                  </FormattedMessage>
                                </div>
                              </div>
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
                                      defaultValue={this.state.assetStatus}
                                      style={{ width: 100 + "%", height: 52 }}
                                      onChange={(e) => {
                                        this.setState({
                                          assetStatus: e,
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
                                  onClick={this.goToMainAssetPage}
                                >
                                  <FormattedMessage id="cancel" />
                                </button>
                                <button
                                  className="aryousureBTN confirmBtnR"
                                  onClick={this.onEditAsset}
                                >
                                  Update
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
          )}
        </>
      </IntlProvider>
    );
  }
}
const mapStateToProps = ({ agentReducer, commonReducer }) => {
  return {
    addAssetStatus: agentReducer.addAssetStatus,
    addAssetData: agentReducer.addAssetData,
    assetDetails: agentReducer.assetDetails,
    editAssetStatus: agentReducer.editAssetStatus,
    editAssetData: agentReducer.editAssetData,
    language: commonReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getAllAssets: () => dispatch(getAllAssets()),
  addAsset: (payload) => dispatch(addAsset(payload)),
  deleteAsset: (id) => dispatch(deleteAsset(id)),
  updateAsset: (id, payload) => dispatch(updateAsset(id, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Ticket);
