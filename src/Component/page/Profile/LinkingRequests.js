import React, { Component } from "react";
import "../../../css/ag-grid-customization01.css";
import "../../Agent/antDcustom.css";
import "antd/dist/antd.css";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { Select, Dropdown, Modal } from "antd";
import Approved from "../../Alerts/Approved";
import Reject from "../../Alerts/Reject";
import { connect } from "react-redux";
import { fetchLinkingRequests, processLinkingRequest } from "../../../services/agent/account_linking_actions";
const { Option } = Select;

class AccessHistoryAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gridApi: null,
            isModalVisible: false,
            paginationGetCurrentPage: null,
            columnDefs: [
                { headerName: "Agent Email", field: "agentEmailAddress", width: 350 },
                {
                    headerName: "Name", field: "Name", width: 350, cellRendererFramework: (params) => (
                        <div>
                            {params.data.firstName + " " + params.data.lastName}
                        </div>
                    ),
                },
                { headerName: "Phone Number", field: "phoneNo", width: 350 },
                {
                    headerName: "Action",
                    field: "Action",
                    cellRendererFramework: (params) => (
                        <div className="ac-view">
                            <button className="success" onClick={() => this.onApproveRequest(params.data)}>
                                {"Approve"}
                            </button>
                            &ensp;
                            <button className="delete">
                                {"Reject"}
                            </button>
                        </div>
                    ),
                    cellStyle: (params) => {
                        console.log(params, "Current test")
                        return { textAlign: "center" };
                    },
                },
            ],
            rowData: [],
        };
    }

    onApproveRequest = (params) => {
        let data = {
            "iamId": params.iamId,
            "linkingStatus": "APPROVED"
        }

        this.props.processLinkingRequest(data);
    }

    onRejectRequest = (params) => {
        let data = {
            "iamId": params.iamId,
            "linkingStatus": "REJECTED"
        }

        this.props.processLinkingRequest(data);
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

    componentDidMount = () => {
        this.props.fetchLinkingRequests();
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

            this.setState({ rowData: Access_History })
        } else {
            this.setState({ rowData: [] })

        }

        if (nextProps.linkingRequests.data) {
            console.log(nextProps.linkingRequests.data, "LINKING REQUESTS")
            this.setState({
                rowData: nextProps.linkingRequests.data
            })
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
                                                Linking Requests
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
const mapStateToProps = ({ agentReducer }) => {

    console.log(agentReducer, "REDUCER")

    return {
        linkingRequests: agentReducer.linkingRequests
    }

};

const mapDispatchToProps = (dispatch) => ({

    fetchLinkingRequests: () => dispatch(fetchLinkingRequests()),
    processLinkingRequest: (payload) => dispatch(processLinkingRequest(payload))

});

export default connect(mapStateToProps, mapDispatchToProps)(AccessHistoryAdmin);
