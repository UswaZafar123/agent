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
import { addAsset, addOperation, deleteAsset, deleteOperation, editOperation, getAllAssets, getAllOperations, updateAsset } from "../../services/agent/action";
const { Option } = Select;

class Operations extends Component {
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
            columnDefs: [
                { headerName: "Name", field: "name", width: 250 },
                { headerName: "Operation Status ", field: "status" },
                { headerName: "Asset ", field: "asset" },
                { headerName: "Asset Status ", field: "assetStatus" },
                {
                    headerName: "Action",
                    field: "Action",
                    cellRendererFramework: (params) => (
                        <div className="ac-view">
                            <button onClick={(e) => this.editOperation(e, params.data)}>
                                {"Edit"}
                            </button>
                            &ensp;
                            <button onClick={(e) => this.deleteOperation(e, params.data)}>
                                {"Delete"}
                            </button>
                        </div>
                    ),
                    cellStyle: (params) => {
                        return { textAlign: "center" };
                    },
                },
            ],
            rowData: [],

            operationsData: [],
            assetData: [],

            mainOperationsView: true,
            addOperationView: false,
            editOperationView: false,

            operationName: "",
            operationStatus: false,
            operationAssetValue: "DEFAULT",
            operationID: "",
        };
    }

    onFirstDataRendered = (params) => {
        // ResponsiveAg-Grid
        if (window.innerWidth < 1023) {
            this.state.gridColumnApi.autoSizeColumns();
        } else {
            params.api.sizeColumnsToFit();
        }
    };

    addChange = () => {

        this.setState({
            addOperationView: true,
            mainOperationsView: false,
            operationName: "",
            operationAssetValue: "DEFAULT",
            operationStatus: false,
            operationID: ""
        })

    };

    goToMainOperationsPage = () => {

        this.setState({
            addOperationView: false,
            mainOperationsView: true,
            editOperationView: false,
            operationName: "",
            operationAssetValue: "DEFAULT",
            operationStatus: false,
            operationID: ""
        })

    }

    editOperation = (e, data) => {

        console.log(data, "DATA");

        this.setState({
            mainOperationsView: false,
            editOperationView: true,
            addOperationView: false,
            operationName: data.name,
            operationAssetValue: data.assetID + "-" + data.asset,
            operationStatus: data.status === "Active" ? true : false,
            operationID: data.operationID
        });

    };

    deleteOperation = (e, data) => {

        this.props.deleteOperation(data.operationID);

    };

    onGridReady = (params) => {
        this.setState({
            gridApi: params.api,
            gridColumnApi: params.columnApi,
        });
        params.api.paginationGoToPage(10);
        document.getElementById("lbCurrentPage").innerHTML =
            this.state.gridApi.paginationGetCurrentPage() + 1;
        document.getElementById(
            "totalPageSize"
        ).innerHTML = this.state.operationsData.length;
        document.getElementById("bTo").innerHTML = params.api.paginationGetPageSize(
            10
        );
        const changedV =
            params.api.paginationGetPageSize(10) *
            (this.state.gridApi.paginationGetCurrentPage() + 1);
        if (changedV <= this.state.operationsData.length) {
            document.getElementById("afterTo").innerHTML =
                params.api.paginationGetPageSize(10) *
                (this.state.gridApi.paginationGetCurrentPage() + 1);
        } else {
            document.getElementById("afterTo").innerHTML = this.state.operationsData.length;
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
            if (changedV <= this.state.operationsData.length) {
                document.getElementById("afterTo").innerHTML =
                    this.state.gridApi.paginationGetPageSize(10) *
                    (this.state.gridApi.paginationGetCurrentPage() + 1);
            } else {
                document.getElementById(
                    "afterTo"
                ).innerHTML = this.state.operationsData.length;
            }
        }
    };

    componentDidMount() {
        this.props.getAllAssets(sessionStorage.getItem("token"));
        this.props.getAllOperations();
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.assetDetails) {
            console.log("hello next", nextProps.assetDetails._embedded.assetDtoList);
            this.setState({
                assetData: nextProps.assetDetails._embedded.assetDtoList
            })
        }

        if (nextProps.operationDetails && nextProps.operationStatus) {
            console.log(nextProps.operationDetails._embedded.operationDtoList, "OPER")

            this.setState({
                operationsData: nextProps.operationDetails._embedded.operationDtoList
            })
        }

        if (nextProps.addOperationStatus) {
            this.goToMainOperationsPage();
        }

        if (nextProps.editOperationStatus) {
            this.goToMainOperationsPage();
        }

    }

    onFilterTextBoxChanged = () => {
        this.state.gridApi.setQuickFilter(
            document.getElementById("filter-text-box").value
        );
    };

    onBtNext = () => {
        this.state.gridApi.paginationGoToNextPage();
    };

    onBtPrevious = () => {
        this.state.gridApi.paginationGoToPreviousPage();
    };

    onAddOperation = () => {

        let assetID = this.state.operationAssetValue.split("-")[0];
        let assetName = this.state.operationAssetValue.split("-")[1];

        let data = {
            "name": this.state.operationName,
            "active": this.state.operationStatus,
            "assetId": assetID,
            "assetName": assetName
        }

        // console.log(data, "ON ADD OPERATION DATA")
        this.props.addOperation(data);

    }

    onEditOperation = () => {

        let assetID = this.state.operationAssetValue.split("-")[0];

        let data = {
            "operationId": this.state.operationID,
            "name": this.state.operationName,
            "active": this.state.operationStatus,
            "assetId": assetID
        }

        console.log(data, "EDIT SUBMIT DATA");

        this.props.editOperation(this.state.operationID, data);

        // this.props.editOperation()

    }

    render() {

        return (
            <>
                {
                    this.state.mainOperationsView && (
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
                                                                Operations
                                                            </h1>
                                                            <button
                                                                className="addposbtn c_first_pending_BTN btnMaxWidth"
                                                                onClick={this.addChange}
                                                            >
                                                                Add Operation
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
                                                                rowData={this.state.operationsData.map((data) => {
                                                                    return ({
                                                                        operationID: data.operationId,
                                                                        assetID: data.asset.assetId,
                                                                        name: data.name,
                                                                        status: data.active ? "Active" : "Inactive",
                                                                        asset: data.asset.name,
                                                                        assetStatus: data.asset.active ? "Active" : "Inactive"
                                                                    });
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
                    )
                }

                {this.state.addOperationView && (
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
                                                            Add New Operation
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                                    <div className="containerBiaN_form">
                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Operation Name<span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <input type="text" value={this.state.operationName} placeholder="Enter Operation Name" onChange={(e) => {
                                                                    this.setState({
                                                                        operationName: e.target.value
                                                                    });
                                                                }} />
                                                            </div>
                                                        </div>

                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Asset <span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <div className="categorySelect">
                                                                    <Select
                                                                        value={this.state.operationAssetValue}
                                                                        style={{ width: 100 + "%", height: 52 }}
                                                                        onChange={(e) => {
                                                                            this.setState({
                                                                                operationAssetValue: e
                                                                            });
                                                                        }}
                                                                        id={'page-size'}
                                                                    >
                                                                        <Option value="DEFAULT" disabled={true}>Select an asset</Option>
                                                                        {this.state.assetData.map((data) => {

                                                                            return (
                                                                                <>
                                                                                    <Option value={data.assetId + "-" + data.name}>{data.name}</Option>

                                                                                </>
                                                                            )

                                                                        })}
                                                                        {/* <Option value={true}>Active</Option>
                                                                        <Option value={false}>Inactive</Option> */}
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Status <span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <div className="categorySelect">
                                                                    <Select
                                                                        defaultValue={this.state.operationStatus}
                                                                        style={{ width: 100 + "%", height: 52 }}
                                                                        onChange={(e) => {
                                                                            this.setState({
                                                                                operationStatus: e
                                                                            });
                                                                        }}
                                                                        id={'page-size'}
                                                                    >
                                                                        <Option value={true}>Active</Option>
                                                                        <Option value={false}>Inactive</Option>
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ width: "100%", float: "left" }}>
                                                        <div className="confirm_p_w mTB00 button-container rspacing">
                                                            <button className="blackbtn aryousureBTN confirmBtnR" onClick={this.goToMainOperationsPage}>Cancel</button>
                                                            <button className="aryousureBTN confirmBtnR" onClick={this.onAddOperation}>Submit</button>
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

                {this.state.editOperationView && (
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
                                                            Update Operation
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                                    <div className="containerBiaN_form">
                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Operation Name<span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <input type="text" value={this.state.operationName} placeholder="Enter Operation Name" onChange={(e) => {
                                                                    this.setState({
                                                                        operationName: e.target.value
                                                                    });
                                                                }} />
                                                            </div>
                                                        </div>

                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Asset <span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <div className="categorySelect">
                                                                    <Select
                                                                        value={this.state.operationAssetValue}
                                                                        style={{ width: 100 + "%", height: 52 }}
                                                                        onChange={(e) => {
                                                                            this.setState({
                                                                                operationAssetValue: e
                                                                            });
                                                                        }}
                                                                        id={'page-size'}
                                                                    >
                                                                        <Option value="DEFAULT" disabled={true}>Select an asset</Option>
                                                                        {this.state.assetData.map((data) => {

                                                                            return (
                                                                                <>
                                                                                    <Option value={data.assetId + "-" + data.name}>{data.name}</Option>

                                                                                </>
                                                                            )

                                                                        })}
                                                                        {/* <Option value={true}>Active</Option>
                                                                        <Option value={false}>Inactive</Option> */}
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Status <span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <div className="categorySelect">
                                                                    <Select
                                                                        defaultValue={this.state.operationStatus}
                                                                        style={{ width: 100 + "%", height: 52 }}
                                                                        onChange={(e) => {
                                                                            this.setState({
                                                                                operationStatus: e
                                                                            });
                                                                        }}
                                                                        id={'page-size'}
                                                                    >
                                                                        <Option value={true}>Active</Option>
                                                                        <Option value={false}>Inactive</Option>
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div style={{ width: "100%", float: "left" }}>
                                                        <div className="confirm_p_w mTB00 button-container rspacing">
                                                            <button className="blackbtn aryousureBTN confirmBtnR" onClick={this.goToMainOperationsPage}>Cancel</button>
                                                            <button className="aryousureBTN confirmBtnR" onClick={this.onEditOperation}>Update</button>
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
                )

                }
            </>
        );
    }
}
const mapStateToProps = ({ agentReducer }) => {

    return {
        assetDetails: agentReducer.assetDetails,
        operationStatus: agentReducer.operationStatus,
        operationDetails: agentReducer.operationDetails,
        addOperationStatus: agentReducer.addOperationStatus,
        editOperationStatus: agentReducer.editOperationStatus
    }

};

const mapDispatchToProps = (dispatch) => ({
    getAllAssets: () => dispatch(getAllAssets()),
    getAllOperations: () => dispatch(getAllOperations()),
    addOperation: (payload) => dispatch(addOperation(payload)),
    deleteOperation: (id) => dispatch(deleteOperation(id)),
    editOperation: (id, payload) => dispatch(editOperation(id, payload)),

});

export default connect(mapStateToProps, mapDispatchToProps)(Operations);
