import React, { Component } from 'react';
import '../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import '../Settings/General/formfromold.css'
// import "../Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';


// import activeUser from '../../Assets/images/confirm.svg'

import ReactFlagsSelect from "react-flags-select";
import { getStates } from "country-state-picker";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import '../Settings/General/settingcss.css'

import { Select, DatePicker, Modal, Switch, Upload, message, Dropdown, Checkbox, Tabs } from "antd";

import { Radio } from "antd";
import moment from "moment";
import { connect } from 'react-redux';
import { createCommission, getAllAgentMemberPackages, getAllCommissions, getAllCurrencies, getAllOperations } from '../../../services/agent/action';
import { Input } from 'reactstrap';

const dateFormat = "YYYY-MM-DD";
const { Option } = Select;
const { TabPane } = Tabs;

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
}

function callback(key) {
    console.log(key);
}
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
            value: 1,
            columnDefs: [
                { headerName: "Type", field: "Type" },
                { headerName: "Amount", field: "Amount" },
                { headerName: "Percentage ", field: "Percentage" },
                { headerName: "Status ", field: "Status" },
                {
                    headerName: "Action", field: "Action", width: 400,
                    cellRendererFramework: (params) => <div className="ac-view">
                        <button className="edit" onClick={this.editNewCommissions}>Edit</button>
                        <button className="delete ml4px">Delete</button>
                        <button className="clone ml4px" onClick={this.editNewCommissions}>Clone</button>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                }



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


        };
    }

    componentDidMount() {
        this.props.getAllOperations();
        this.props.getAllAgentMemberPackages();
        this.props.getAllCurrencies();
        this.props.getAllCommissions();
    }

    componentWillReceiveProps = (nextprops) => {

        if (nextprops.operationDetails && nextprops.operationStatus) {
            this.setState({
                operationsData: nextprops.operationDetails._embedded.operationDtoList
            });
        }

        if (nextprops.packagesStatus && nextprops.packagesDetails) {

            this.setState({
                packagesData: nextprops.packagesDetails._embedded.agentPackageDtoList
            });
        }

        if (nextprops.currencyStatus && nextprops.currencyDetails) {

            this.setState({
                currenciesData: nextprops.currencyDetails._embedded.currencyDtoList
            })

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
            });
        }

        if (nextprops.getCommissionStatus && nextprops.getCommissionData) {

            this.setState({
                commissionsData: nextprops.getCommissionData._embedded.commissionDtoList
            });

        }

    }


    onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    addChange = () => {
        this.props.history.push("/tickets/AddTicket")
    }
    onGridReady = (params) => {
        this.setState({
            gridApi: params.api,
        })
        params.api.paginationGoToPage(10);
        document.getElementById('lbCurrentPage').innerHTML = this.state.gridApi.paginationGetCurrentPage() + 1
        document.getElementById('totalPageSize').innerHTML = this.state.commissionsData.length
        document.getElementById('bTo').innerHTML = params.api.paginationGetPageSize(10)
        const changedV = (params.api.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
        if (changedV <= this.state.commissionsData.length) {
            document.getElementById('afterTo').innerHTML = (params.api.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
        }
        else {
            document.getElementById('afterTo').innerHTML = this.state.commissionsData.length
        }
        // console.log("get",params.api.getDisplayedRowCount())


    }
    handleChange = (value) => {
        this.state.gridApi.paginationSetPageSize(Number(value))
        // document.getElementById('totalPageSize').innerHTML=this.state.gridApi.paginationGetPageSize()
        document.getElementById('bTo').innerHTML = this.state.gridApi.paginationGetPageSize()
    }






    onPaginationChanged = () => {
        console.log('onPaginationPageLoaded');
        if (this.state.gridApi) {
            document.getElementById('lbCurrentPage').innerHTML = this.state.gridApi.paginationGetCurrentPage() + 1
            document.getElementById('bTo').innerHTML = this.state.gridApi.paginationGetPageSize() * this.state.gridApi.paginationGetCurrentPage() + 1

            const changedV = (this.state.gridApi.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
            if (changedV <= this.state.commissionsData.length) {
                document.getElementById('afterTo').innerHTML = (this.state.gridApi.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
            }
            else {
                document.getElementById('afterTo').innerHTML = this.state.commissionsData.length
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
            addNewCommissions: true,
            editNewCommissions: false,
            viewNewCommissions: false
        })
    }
    editNewCommissions = () => {
        this.setState({
            addNewCommissions: false,
            editNewCommissions: true,
            viewNewCommissions: false
        })
    }
    viewNewCommissions = () => {
        this.setState({
            addNewCommissions: false,
            editNewCommissions: false,
            viewNewCommissions: true
        })
    }

    setAsFeaturedHandler = (e, data) => {
        this.setState({
            isfeatured: !this.state.isfeatured
        })
    }

    handleChangeSelect = (e) => {
        console.log(`selected ${e}`);
    }
    handleChangeN(event) {

    }
    back5 = () => {
        this.setState({
            addNewCommissions: false,
            editNewCommissions: false,
            viewNewCommissions: false
        })
    }
    handleChangeSelect = (e) => {
        console.log(`selected ${e}`);
    }

    onChangeRadio = e => {
        this.setState({
            value: e.target.value
        })
    };

    addCommission = () => {

        let payload;

        if (this.state.feeStructure == 1) {

            payload = {
                "commissionType": this.state.commissionType,
                "commissionAmount": this.state.amount,
                "commissionPercentage": "0",
                "active": this.state.commissionStatus
            }

        } else if (this.state.feeStructure == 2) {

            payload = {
                "commissionType": this.state.commissionType,
                "commissionAmount": "0",
                "commissionPercentage": this.state.percentage,
                "active": this.state.commissionStatus
            }

        } else {
            payload = {
                "commissionType": this.state.commissionType,
                "commissionAmount": this.state.amount,
                "commissionPercentage": this.state.percentage,
                "active": this.state.commissionStatus
            }
        }

        this.props.createCommission(payload, this.props.history);

    }

    render() {

        const isfeatured = this.state.isfeatured

        return (
            <>
                {!this.state.addNewCommissions && !this.state.editNewCommissions &&
                    <div className="main_contain">
                        <div className="merch_m_list_w">
                            <div className="merch_list_card" id="merch_list_card">
                                <div className="section_custom">
                                    <div className="sectionInn">
                                        <div className="chartCard_w">
                                            <div className="chartCardTop">
                                                <div className="kyccustomformheading">
                                                    <h1 className="list_top_heading textAlignCenter text-center">
                                                        Commissions List
                                                    </h1>
                                                    <button className="addposbtn c_first_pending_BTN" onClick={this.addNewCommissions}>Add Commission</button>
                                                </div>
                                            </div>
                                            <div className="chartCardMiddle" style={{ padding: "24px" }}>
                                                <div className="filter_wrapper_agent">
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
                                                </div>
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
                                                        rowData={this.state.commissionsData.map((data) => {

                                                            return (
                                                                {
                                                                    Type: data.commissionType,
                                                                    Amount: data.commissionAmount,
                                                                    Percentage: data.commissionPercentage,
                                                                    Status: data.active ? "Active" : "Inactive"
                                                                }
                                                            );



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

                }

                {this.state.addNewCommissions &&
                    <div className="main_contain agentformCenter">
                        <div className="merch_m_list_w">
                            <div className="merch_list_card" id="merch_list_card">
                                <div className="section_custom">
                                    <div className="sectionInn">
                                        <div className="chartCard_w">
                                            <div className="chartCardTop">
                                                <div className="kyccustomformheading">
                                                    <h1 className="list_top_heading textAlignCenter text-center">
                                                        Add New Commissions
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                                <div className="containerBiaN_form">


                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Commission Type <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <div className="categorySelect">
                                                                <Select
                                                                    defaultValue="FIXED"
                                                                    style={{ width: 100 + "%", height: 52 }}
                                                                    onChange={(e) => {
                                                                        this.setState({
                                                                            commissionType: e
                                                                        });
                                                                    }}
                                                                    id={'page-size'}
                                                                >
                                                                    <Option value="FIXED">Fixed</Option>
                                                                    <Option value="PERCENTAGE">Percentage</Option>
                                                                    <Option value="SLAB">Slab</Option>
                                                                    <Option value="FIXED_AND_PERCENTAGE">Fixed and Percentage</Option>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Operations <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <div className="categorySelect">
                                                                <Select
                                                                    defaultValue="Default"
                                                                    style={{ width: 100 + "%", height: 52 }}
                                                                    onChange={(e) => {
                                                                        this.setState({
                                                                            operation: e
                                                                        });
                                                                    }}
                                                                    id={'page-size'}
                                                                >
                                                                    <Option value="Default" disabled={true}>Select Operation</Option>

                                                                    {this.state.operationsData.length > 0 ? <>

                                                                        {this.state.operationsData.map((data) => {

                                                                            return (
                                                                                <Option value={data.name}>{data.name}</Option>
                                                                            );

                                                                        })}


                                                                    </> : <></>}

                                                                    {/* <Option value="Active">Cash Withdrawal from wallets</Option>
                                                                    <Option value="Deactive">cash deposit - wallets</Option> */}
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Package <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <div className="categorySelect">
                                                                <Select
                                                                    defaultValue="Default"
                                                                    style={{ width: 100 + "%", height: 52 }}
                                                                    onChange={(e) => {
                                                                        this.setState({
                                                                            package: e
                                                                        });
                                                                    }}
                                                                    id={'page-size'}
                                                                >

                                                                    <Option value="Default" disabled={true}>Select Package</Option>

                                                                    {this.state.packagesData.length > 0 ? <>

                                                                        {this.state.packagesData.map((data) => {

                                                                            if (data.active && data.name != "") {
                                                                                return (
                                                                                    <Option value={data.name}>{data.name}</Option>
                                                                                );
                                                                            }

                                                                        })}


                                                                    </> : <></>}


                                                                    {/* <Option value="Active">Plan for inactive plan</Option>
                                                                    <Option value="Deactive">Merchant plan</Option> */}
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Currency <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <div className="categorySelect">
                                                                <Select
                                                                    defaultValue="Default"
                                                                    style={{ width: 100 + "%", height: 52 }}
                                                                    onChange={(e) => {
                                                                        this.setState({
                                                                            currency: e
                                                                        });
                                                                    }}
                                                                    id={'page-size'}
                                                                >

                                                                    <Option value="Default" disabled={true}>Select Currency</Option>

                                                                    {this.state.currenciesData.length > 0 ? <>

                                                                        {this.state.currenciesData.map((data) => {

                                                                            return (
                                                                                <Option value={data.name}>{data.name}</Option>
                                                                            );

                                                                        })}


                                                                    </> : <></>}

                                                                    {/* <Option value="Active">FAF</Option>
                                                                    <Option value="Deactive">OUV</Option> */}
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Lower Bound <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <input type="text" placeholder="Enter Lower Bound" />
                                                        </div>
                                                    </div> */}
                                                    {/* <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Upper Bound <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <input type="text" placeholder="Enter Upper Bound" />
                                                        </div>
                                                    </div> */}
                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Fee Structure <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <div className="categorySelect">
                                                                <Select
                                                                    defaultValue={this.state.feeStructure}
                                                                    style={{ width: 100 + "%", height: 52 }}
                                                                    onChange={(e) => {
                                                                        this.setState({
                                                                            feeStructure: e
                                                                        }, () => {
                                                                            console.log(this.state, "state");
                                                                        });
                                                                    }}
                                                                    id={'page-size'}
                                                                >
                                                                    <Option value={1}>Amount</Option>
                                                                    <Option value={2}>Percentage</Option>
                                                                    <Option value={3}>Both</Option>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {this.state.feeStructure == 1 ? <>

                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Amount <span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">

                                                                <div className="inputFlash2" style={{ marginLeft: 0, width: "100%" }} >
                                                                    <Input value={this.state.amount} onChange={(e) => {
                                                                        this.setState({
                                                                            amount: e.target.value
                                                                        });
                                                                    }} placeholder="Enter Amount"  > </Input>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </> : this.state.feeStructure == 2 ? <>

                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Percentage <span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">

                                                                <div className="inputFlash2" style={{ marginLeft: 0, width: "100%" }} >
                                                                    <Input value={this.state.percentage} onChange={(e) => {
                                                                        this.setState({
                                                                            percentage: e.target.value
                                                                        });
                                                                    }} placeholder="Enter Percentage"  > </Input>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </> : <>

                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Amount <span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">

                                                                <div className="inputFlash2" style={{ marginLeft: 0, width: "100%" }} >
                                                                    <Input value={this.state.amount} onChange={(e) => {
                                                                        this.setState({
                                                                            amount: e.target.value
                                                                        });
                                                                    }} placeholder="Enter Amount"  > </Input>
                                                                </div>

                                                            </div>
                                                        </div>

                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Percentage <span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">

                                                                <div className="inputFlash2" style={{ marginLeft: 0, width: "100%" }} >
                                                                    <Input value={this.state.percentage} onChange={(e) => {

                                                                        this.setState({
                                                                            percentage: e.target.value
                                                                        });

                                                                    }} placeholder="Enter Percentage"  > </Input>
                                                                </div>

                                                            </div>
                                                        </div>

                                                    </>}

                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Status <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <div className="categorySelect">
                                                                <Select
                                                                    defaultValue={this.state.commissionStatus}
                                                                    style={{ width: 100 + "%", height: 52 }}
                                                                    onChange={(e) => {
                                                                        this.setState({
                                                                            commissionStatus: e
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
                                                        <button className="blackbtn aryousureBTN confirmBtnR" onClick={this.back5}>Cancel</button>
                                                        <button className="aryousureBTN confirmBtnR" onClick={() => this.addCommission()}>Submit</button>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>

                }
                {this.state.editNewCommissions &&
                    <div className="main_contain agentformCenter">
                        <div className="merch_m_list_w">
                            <div className="merch_list_card" id="merch_list_card">
                                <div className="section_custom">
                                    <div className="sectionInn">
                                        <div className="chartCard_w">
                                            <div className="chartCardTop">
                                                <div className="kyccustomformheading">
                                                    <h1 className="list_top_heading textAlignCenter text-center">
                                                        Edit New Fees                            </h1>
                                                </div>
                                            </div>
                                            <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                                <div className="containerBiaN_form">



                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Operations <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <div className="categorySelect">
                                                                <Select
                                                                    defaultValue="1"
                                                                    style={{ width: 100 + "%", height: 52 }}
                                                                    onChange={this.handleChangeSelect}
                                                                    id={'page-size'}
                                                                >
                                                                    <Option value="Active">Cash Withdrawal from wallets</Option>
                                                                    <Option value="Deactive">cash deposit - wallets</Option>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Subscription Plan <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <div className="categorySelect">
                                                                <Select
                                                                    defaultValue="1"
                                                                    style={{ width: 100 + "%", height: 52 }}
                                                                    onChange={this.handleChangeSelect}
                                                                    id={'page-size'}
                                                                >
                                                                    <Option value="Active">Plan for inactive plan</Option>
                                                                    <Option value="Deactive">Merchant plan</Option>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Currency <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <div className="categorySelect">
                                                                <Select
                                                                    defaultValue="1"
                                                                    style={{ width: 100 + "%", height: 52 }}
                                                                    onChange={this.handleChangeSelect}
                                                                    id={'page-size'}
                                                                >
                                                                    <Option value="Active">FAF</Option>
                                                                    <Option value="Deactive">OUV</Option>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Lower Bound <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <input type="text" placeholder="Enter Lower Bound" />
                                                        </div>
                                                    </div>
                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Upper Bound <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <input type="text" placeholder="Enter Upper Bound" />
                                                        </div>
                                                    </div>
                                                    <div className="containerBiaN_f_row">
                                                        <div className="containerBiaN_f_col width30percent textAlignRight">
                                                            <label>Fee Structure <span className="mantdat">*</span></label>
                                                        </div>
                                                        <div className="containerBiaN_f_col width70percent">
                                                            <div className="categorySelect">
                                                                <Select
                                                                    defaultValue="1"
                                                                    style={{ width: 100 + "%", height: 52 }}
                                                                    onChange={this.handleChangeSelect}
                                                                    id={'page-size'}
                                                                >
                                                                    <Option value="1">Amount</Option>
                                                                    <Option value="2">Percentage</Option>
                                                                    <Option value="3">Both</Option>
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div style={{ width: "100%", float: "left" }}>
                                                    <div className="custom-d-flex confirm_p_w mTB00 button-container rspacing">
                                                        <button className="blackbtn aryousureBTN confirmBtnR" onClick={this.back5}>Cancel</button>
                                                        <button className="aryousureBTN confirmBtnR">Submit</button>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>



                    </div>
                }


            </>
        );
    }
}

// function for mapping redux state values with props //
const mapStateToProps = ({ agentReducer }) => {

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
        getCommissionData: agentReducer.getCommissionData

    }

};

//function for maping with dispatched actions with props //
const mapDispatchToProps = (dispatch) => ({

    getAllOperations: () => dispatch(getAllOperations()),
    getAllAgentMemberPackages: () => dispatch(getAllAgentMemberPackages()),
    getAllCurrencies: () => dispatch(getAllCurrencies()),
    createCommission: (payload, history) => dispatch(createCommission(payload, history)),
    getAllCommissions: () => dispatch(getAllCommissions()),


});
export default connect(mapStateToProps, mapDispatchToProps)(CommissionsManagement);