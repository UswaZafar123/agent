import React, { Component } from "react";
import "../../css/ag-grid-customization01.css";
import "../Agent/antDcustom.css";
import "antd/dist/antd.css";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import activeUser from "../../Assets/images/confirm.svg";

import { Select, Menu, Dropdown, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Approved from "../Alerts/Approved";
import Reject from "../Alerts/Reject";
import { connect } from "react-redux";
const { Option } = Select;

class AccessHistoryAdmin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridApi: null,
      isModalVisible: false,
      paginationGetCurrentPage: null,
      columnDefs: [
        { headerName: "Email", field: "Email", width: 350 },
        { headerName: "Browser", field: "Browser", width: 350 },
        { headerName: "Date and Time", field: "Date", width: 350 },
        // cellStyle:(params)=>{return {textAlign:"center"}},
        // cellClass: params => {
        //     return params.value === 'Active' ? 'ActiveCell' : 'DeActiveCell';
        // },

        // cellRendererFramework:(params)=><div className="ac-inactiveBTN">
        //     <button>{params.value === 'Active' ? 'Active' : 'Inactive'}</button>
        // </div>
        // },

        // {headerName: "Change Status", field: "Change_Status",
        // cellClass: params => {
        //     return params.value === 'Activate' ? 'ActiveCell' : 'DeActiveCell';
        // },
        // cellStyle:(params)=>{return {textAlign:"center"}},
        // cellRendererFramework:(params)=><div className="ac-inactiveBTN">
        //     <button onClick={this.showModal}>{params.value === 'Activate' ? 'Activate' : 'De-Activate'}</button>
        // </div>

        // },
        // {headerName: "Action", field: "Action",
        // cellRendererFramework:(params)=><div className="ac-view">
        //     <button>{'View'}</button>
        // </div>,
        // cellStyle:(params)=>{return {textAlign:"center"}},
        // }
      ],
      rowData: [
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Inactive",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ0001", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Inactive",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
        // {Approval_Date: "14 Dec 2020 (5:30 PM)", ID: "LDWOFPPW6YEOJ0001", Name: "Berger",Url:"crpto/send/success",Status:"Active",Change_Status:"De-Activate",Action:"View"},
      ],
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
    document.getElementById("totalPageSize").innerHTML =
      this.state.rowData.length;
    document.getElementById("bTo").innerHTML =
      params.api.paginationGetPageSize(10);
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
      if (changedV <= this.state.rowData.length) {
        document.getElementById("afterTo").innerHTML =
          this.state.gridApi.paginationGetPageSize(10) *
          (this.state.gridApi.paginationGetCurrentPage() + 1);
      } else {
        document.getElementById("afterTo").innerHTML =
          this.state.rowData.length;
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

  componentDidMount=()=>{

  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.AccessHistory) {
      var Access_History = [];
      var access =
        nextProps.accessHistoryData.accessInfo.length > 0
          ? nextProps.accessHistoryData.accessInfo.map((history) => {
              Access_History.push({
                Email: history.userEmail,
                Browser: history.browser,
                Date: history.date,
              });
            })
          : [];

          this.setState({rowData:Access_History})
    }else{
      this.setState({rowData:[]})

    }
  };

  render() {
    // console.log("jai",this.state.paginationGetCurrentPage)
    return (
      <div className="main_contain">
        <div className="merch_m_list_w">
          <h1 className="m_listHeading textAlignCenter pd_t_b24">
            {/* Agent Management{" "} */}
          </h1>
          <div className="merch_list_card" id="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="flCenterColumn">
                      <h1 className="list_top_heading textAlignCenter">
                        Access History
                      </h1>
                    </div>
                  </div>
                  <div className="chartCardMiddle" style={{ padding: "24px" }}>
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

                        <h5 className="show_pp margin_left8">
                          Records Per Page
                        </h5>
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
                                      <span class="icon-logout"></span>Inactive
                                    </a>
                                  </li>
                                  <li>
                                    <a href="#">
                                      <span class="icon-logout"></span>Active
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
                      <div className="actionBtnWp">
                        <span className="icon-Asset-51"></span>
                        <span className="icon-Asset-52"></span>
                        <span className="icon-Asset-53"></span>
                      </div>
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

                        // paginationNumberFormatter={function (params) {
                        //   return '[' + params.value.toLocaleString() + ']';
                        // }}
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

        {/* Modal */}
        {/* <Modal
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          cancelButtonProps={{style:{ display:'none !important'}}}
          footer={null}
        >
        <div className="modal_w">
          <span className="icon-Asset-58 closeBtn_custom" onClick={this.onCloseHandler}></span>
          <div className="modal_w_in">
            <div className="confirmImg mB36">
              <img src={activeUser} alt="" />
            </div>
            <h2 className="mB36 aryousure">Are you sure you want to Activate User?</h2>
            <div className="confirm_p_w">
              <button className="aryousureBTN">No</button>
              <button className="aryousureBTN confirmBtnR">Yes</button>
            </div>
          </div>
        </div>
          
        </Modal> */}
        <Modal
          visible={this.state.isModalVisible}
          cancelButtonProps={{ style: { display: "none !important" } }}
          footer={null}
        >
          <Reject handleCancel={this.handleCancel} />
        </Modal>

        <Modal
          visible={this.state.isModalVisible}
          cancelButtonProps={{ style: { display: "none !important" } }}
          footer={null}
        >
          <Approved handleCancel={this.handleCancel} />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = ({  }) => {
  
};

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AccessHistoryAdmin);
