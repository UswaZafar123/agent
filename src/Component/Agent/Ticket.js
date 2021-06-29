import React, { Component } from 'react';
import '../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import "../Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import activeUser from '../../Assets/images/confirm.svg'

import { Select, Menu, Dropdown, Modal } from 'antd';
const { Option } = Select;





class Ticket extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gridApi: null,
            isModalVisible: false,
            paginationGetCurrentPage: null,
            popup: false,
            columnDefs: [
                { headerName: "Ticket ID", field: "Ticket_ID", width: 250 },
                { headerName: "Agent/User", field: "Merchant_User" },
                { headerName: "Subject ", field: "Subject" },
                { headerName: "  Status ", field: " Status", cellRendererFramework: (params) => <button className="customsuccessbtn dcbtn">Success</button> },
                { headerName: "Priority ", field: "Priority" },
                { headerName: "Date ", field: "Date" },
                {
                    headerName: "Action", field: "Action",
                    cellRendererFramework: (params) => <div className="ac-view">
                        <button>{'View'}</button>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                }



            ],
            rowData: [
                { Ticket_ID: "Alice", Merchant_User: "Alice", Subject: "Alice", Status: "Success", Priority: "DOGETEST",Date:"13 Dec 2020 (4:00 PM)" ,Action:"View"},
                { Ticket_ID: "Poppy", Merchant_User: "Poppy", Subject: "Poppy", Status: "Success", Priority: "USD",Date:"13 Dec 2020 (4:00 PM)" ,Action:"View"},


            ]

        };
    }
    save = () => {
        this.setState({
            popup: true
        })
    }
    close = () => {
        this.setState({
            popup: false
        })
    }
    onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };
    editChange = () => {
        this.props.history.push("/Shops_Points_Sales/EditPOS")
    }
    addChange = () => {
        this.props.history.push("/tickets/AddTicket")
    }
    onGridReady = (params) => {
        this.setState({
            gridApi: params.api,
        })
        params.api.paginationGoToPage(10);
        document.getElementById('lbCurrentPage').innerHTML = this.state.gridApi.paginationGetCurrentPage() + 1
        document.getElementById('totalPageSize').innerHTML = this.state.rowData.length
        document.getElementById('bTo').innerHTML = params.api.paginationGetPageSize(10)
        const changedV = (params.api.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
        if (changedV <= this.state.rowData.length) {
            document.getElementById('afterTo').innerHTML = (params.api.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
        }
        else {
            document.getElementById('afterTo').innerHTML = this.state.rowData.length
        }
        // console.log("get",params.api.getDisplayedRowCount())
    }
    handleChange = (value) => {
        this.state.gridApi.paginationSetPageSize(Number(value))
        // document.getElementById('totalPageSize').innerHTML=this.state.gridApi.paginationGetPageSize()
        document.getElementById('bTo').innerHTML = this.state.gridApi.paginationGetPageSize()
    }

    showModal = () => {
        this.setState({
            isModalVisible: true
        })
    };

    handleOk = () => {
        this.setState({
            isModalVisible: true
        })
    };

    onCloseHandler = () => {
        this.setState({
            isModalVisible: false
        })
    }
    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    };


    onPaginationChanged = () => {
        console.log('onPaginationPageLoaded');
        if (this.state.gridApi) {
            document.getElementById('lbCurrentPage').innerHTML = this.state.gridApi.paginationGetCurrentPage() + 1
            document.getElementById('bTo').innerHTML = this.state.gridApi.paginationGetPageSize() * this.state.gridApi.paginationGetCurrentPage() + 1

            const changedV = (this.state.gridApi.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
            if (changedV <= this.state.rowData.length) {
                document.getElementById('afterTo').innerHTML = (this.state.gridApi.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
            }
            else {
                document.getElementById('afterTo').innerHTML = this.state.rowData.length
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








    render() {
        // console.log("jai",this.state.paginationGetCurrentPage)
        return (
            <div className="main_contain">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Tickets
                      </h1>
                                            <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a Ticket</button>
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
                                                        id={'page-size'}
                                                    >
                                                        <Option value="10">10</Option>
                                                        <Option value="25">25</Option>
                                                        <Option value="100">100</Option>
                                                        {/* <Option value="all">all</Option> */}
                                                    </Select>
                                                </div>

                                                <h5 className="show_pp margin_left8">
                                                    Entries
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
                                                <button className="NextPrev" onClick={() => this.onBtPrevious()}>Prev</button>
                                                <span className="valueNextPrev" id="lbCurrentPage"></span>
                                                <button className="NextPrev" onClick={() => this.onBtNext()}>Next</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.popup == true ?
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
                                        </div> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}
export default Ticket;