import React, { Component } from "react";
import "../../../css/ag-grid-customization01.css";

import "../Settings/General/formfromold.css";
import "./cashoperations.css";
// import "../Agent/antDcustom.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import "react-phone-input-2/lib/style.css";

import "../Settings/General/settingcss.css";

function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

function callback(key) {
  console.log(key);
}
class CashOperations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridApi: null,
      isModalVisible: false,
      paginationGetCurrentPage: null,
      popup: false,
      addNewCashOperations: false,
      editNewCashOperations: false,
      viewNewCashOperations: false,
      activeStatus: true,
      transactionInformations: false,
      transactionsummury: false,
      value: 1,
      columnDefs: [
        { headerName: "Transactions code", field: "Lower_Bound" },
        { headerName: "Sender Name", field: "Upper_Bound" },
        { headerName: "Sender Phone number ", field: "Amount" },
        { headerName: "Amount including currency ", field: "Percent" },
        { headerName: "Reason", field: "Payment_Method" },
        { headerName: "Receiver Name", field: "Subscription_Plan" },
        { headerName: "Receiver Phone number", field: "Currency" },
        { headerName: " Transaction status", field: "Currency" },
        {
          headerName: "Action",
          field: "Action",
          width: 400,
          cellRendererFramework: (params) => (
            <div className="ac-view">
              <button className="edit" onClick={this.editNewCashOperations}>
                Edit
              </button>
              <button className="delete ml4px">Delete</button>
              <button
                className="clone ml4px"
                onClick={this.editNewCashOperations}
              >
                Clone
              </button>
            </div>
          ),
          cellStyle: (params) => {
            return { textAlign: "center" };
          },
        },
      ],
      rowData: [
        {
          Lower_Bound: 1,
          Upper_Bound: 100000,
          Amount: 100,
          Percent: 2,
          Payment_Method: "Service Payment",
          Subscription_Plan: "Inactive Customer Plan",
          Currency: "FCFA",
          Action: "",
        },
      ],
    };
  }

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

  addNewCashOperations = () => {
    this.setState({
      addNewCashOperations: true,
      editNewCashOperations: false,
      viewNewCashOperations: false,
    });
  };
  editNewCashOperations = () => {
    this.setState({
      addNewCashOperations: false,
      editNewCashOperations: true,
      viewNewCashOperationss: false,
    });
  };
  viewNewCashOperations = () => {
    this.setState({
      addNewCashOperations: false,
      editNewCashOperations: false,
      viewNewCashOperations: true,
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
      addNewCashOperations: false,
      editNewCashOperations: false,
      viewNewCashOperations: false,
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

  SubmitOperation = (e) => {
    this.setState({
      transactionInformations: true,
      transactionsummury: false,
    });
  };
  pay = (e) => {
    this.setState({
      transactionInformations: false,
      transactionsummury: true,
    });
  };
  done = (e) => {
    this.setState({
      transactionInformations: false,
      transactionsummury: false,
    });
  };

  render() {
    return (
      <>
        <div className="main_contain agentformCenter">
          <div className="merch_m_list_w">
            <div className="merch_list_card" id="merch_list_card">
              <div className="section_custom">
                <div className="sectionInn">
                  <div className="chartCard_w">
                    <div className="chartCardTop">
                      <div className="kyccustomformheading">
                        <h1
                          className="list_top_heading textAlignCenter text-center"
                          style={{ paddingLeft: "0px" }}
                        >
                          Cash Operations
                        </h1>
                      </div>
                    </div>
                    <div
                      className="chartCardMiddle"
                      style={{ padding: "24px" }}
                    >
                      {!this.state.transactionInformations &&
                        !this.state.transactionsummury && (
                          <>
                            <div className="containerBiaN_form">
                              <div className="containerBiaN_f_row">
                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                  <label>
                                    Phone number{" "}
                                    <span className="mantdat">*</span>
                                  </label>
                                </div>
                                <div className="containerBiaN_f_col width70percent">
                                  <input placeholder="Enter Phone number" />
                                </div>
                              </div>
                              <div className="containerBiaN_f_row">
                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                  <label>
                                    Transaction code{" "}
                                    <span className="mantdat">*</span>
                                  </label>
                                </div>
                                <div className="containerBiaN_f_col width70percent">
                                  <input placeholder="Enter Transaction code" />
                                </div>
                              </div>
                            </div>

                            <div style={{ width: "100%", float: "left" }}>
                              <div className="confirm_p_w mTB00 button-container rspacing">
                                {/* <button className="blackbtn aryousureBTN confirmBtnR" onClick={this.back5}>Cancel</button> */}
                                <button
                                  className="aryousureBTN confirmBtnR"
                                  onClick={this.SubmitOperation}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </>
                        )}

                      {this.state.transactionInformations && (
                        <>
                          <div className="containerBiaN_form">
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>Transactions code</label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <input
                                  placeholder="Enter Phone number"
                                  value={"123456"}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>Sender Name</label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <input
                                  placeholder="Enter Phone number"
                                  value={"John Doe"}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>Sender Phone number</label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <input
                                  placeholder="Enter Phone number"
                                  value={"John Doe"}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>Amount including currency</label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <input
                                  placeholder="Enter Phone number"
                                  value={"45656465"}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>Reason</label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <input
                                  placeholder="Enter Phone number"
                                  value={"123456"}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>Receiver name</label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <input
                                  placeholder="Enter Phone number"
                                  value={"John Doe"}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>Receiver Phone number</label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <input
                                  placeholder="Enter Phone number"
                                  value={"985484556"}
                                  disabled
                                />
                              </div>
                            </div>
                            <div className="containerBiaN_f_row">
                              <div className="containerBiaN_f_col width30percent textAlignRight">
                                <label>Transaction status</label>
                              </div>
                              <div className="containerBiaN_f_col width70percent">
                                <input
                                  placeholder="Enter Phone number"
                                  value={"Completed"}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>

                          <div style={{ width: "100%", float: "left" }}>
                            <div className="confirm_p_w mTB00 button-container rspacing">
                              {/* <button className="blackbtn aryousureBTN confirmBtnR" onClick={this.back5}>Cancel</button> */}
                              <button
                                className="aryousureBTN confirmBtnR"
                                onClick={this.pay}
                              >
                                Pay
                              </button>
                            </div>
                          </div>
                        </>
                      )}

                      {this.state.transactionsummury && (
                        <>
                          {/* <div className="successMessage">
                                            <div className="confirmImg">
                                                <img src={confirm} />
                                            </div>
                                            <h2>Cash Withdraw Successfully</h2>

                                        </div> */}

                          <div className="trasAgentsSusmm">
                            <table>
                              <tr>
                                <td>Transactions code</td>
                                <td>123456</td>
                              </tr>
                              <tr>
                                <td>Sender Name</td>
                                <td>John Doe</td>
                              </tr>
                              <tr>
                                <td>Sender Phone number</td>
                                <td>John Doe</td>
                              </tr>
                              <tr>
                                <td>Amount including currency</td>
                                <td>1654466</td>
                              </tr>
                              <tr>
                                <td>Reason</td>
                                <td>Lorem Iplsum dollar</td>
                              </tr>
                              <tr>
                                <td>Receiver name</td>
                                <td>John Doe</td>
                              </tr>
                              <tr>
                                <td>Receiver Phone number</td>
                                <td>John Doe</td>
                              </tr>
                              <tr>
                                <td>Transaction status</td>
                                <td>Completed</td>
                              </tr>
                            </table>
                          </div>
                          {/* <div className="containerBiaN_form">
                                           
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Transactions code</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input placeholder="Enter Phone number" value={"123456"} disabled/>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Sender Name</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input placeholder="Enter Phone number" value={"John Doe"} disabled/>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Sender Phone number</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input placeholder="Enter Phone number" value={"John Doe"} disabled/>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Amount including currency</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input placeholder="Enter Phone number" value={"45656465"} disabled/>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Reason</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input placeholder="Enter Phone number" value={"123456"} disabled/>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Receiver name</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input placeholder="Enter Phone number" value={"John Doe"} disabled/>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Receiver Phone number</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input placeholder="Enter Phone number" value={"985484556"} disabled/>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Transaction status</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input placeholder="Enter Phone number" value={"Completed"} disabled/>
                                                </div>
                                            </div>
                                           
                                            
                                            
                                        </div> */}

                          {/* <div style={{width: "100%", float: "left"}}>
                                           <div className="confirm_p_w mTB00 button-container rspacing">
                                               <button className="aryousureBTN confirmBtnR" onClick={this.done}>Done</button>
                                            </div>
                                        </div> */}
                        </>
                      )}
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
export default CashOperations;
