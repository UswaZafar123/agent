import React, { Component } from 'react';
import '../../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import './formfromold.css'
// import "../Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// import activeUser from '../../Assets/images/confirm.svg'

import './settingcss.css'

import { Select, DatePicker, Modal, Switch, Upload, message,Dropdown,Checkbox,Tabs} from "antd";

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
            isfeatured:true,
            showNewPackage:false,
            editNewPackage:false,
            value:'',
            columnDefs: [
                { headerName: "Name", field: "Name", width: 250 },
                { headerName: "User Type", field: "User_Type" },
                { headerName: "Fee ", field: "Fee" },
                { headerName: "Featured", field: " Featured", cellRendererFramework: (params) => 
                    <div className="setAsFeaturedDiv">
                        <span className={this.state.isfeatured ? "yesF yesColorF" : "yesF noColorF"}>{this.state.isfeatured ? "Yes" : "No"}</span>
                        <span className="setas" onClick={(e)=>{this.setAsFeaturedHandler(e,params.data)}}> {this.state.isfeatured ? "Unset Featured" : "Set as Featured"}</span>
                    </div>
                },
                // { headerName: "Featured", field: " Featured", cellRendererFramework: (params) => <button className="customsuccessbtn dcbtn">Success</button> },
                // { headerName: "Featured", field: " Featured"},
                { headerName: "Default Plan ", field: "Default_Plan" },
                {
                    headerName: "Action", field: "Action",
                    cellRendererFramework: (params) => <div className="ac-view">
                        <span className="icon-edit-2" style={{cursor: "pointer"}} onClick={this.editNewPackage}></span>
                        <span className="icon-Group-357" style={{marginLeft: "5%"}}></span>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                }



            ],
            rowData: [
                { Name: "Test Plan", User_Type: "Agent", Fee: 20000, Featured: "", Default_Plan: "DOGETEST",Action:"View"},    

            ],
            

        };
    }


       



    onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

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

    addNewPackage = () => {
        this.setState({
            addNewPackage:true,
            editNewPackage:false
        })
    }

    editNewPackage = () => {
        this.setState({
            addNewPackage:false,
            editNewPackage:true
        })
    }

    setAsFeaturedHandler = (e,data) => {
        this.setState({
            isfeatured:!this.state.isfeatured
        })
    }

    handleChangeSelect = (e) =>{
        console.log(`selected ${e}`);
    }
    handleChangeN(event) {
        
    }
      back5 = () => {
        this.setState({
            addNewPackage:false,
            editNewPackage:false
        })
      }
     

    render() {

        const isfeatured = this.state.isfeatured
        return (
    <>
        {!this.state.addNewPackage && !this.state.editNewPackage && 
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
                                            <button className="addposbtn c_first_pending_BTN" onClick={this.addNewPackage}>Add New Package</button>
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

    }

{this.state.addNewPackage && 
            <div className="main_contain settings-container">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Add New Package
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                       <div className="formRow">
                                            <div className="formCol">
                                                <label class="formColLabel">Subscription Amount </label>
                                                <input type="text" placeholder="Subscription Amount" />
                                            </div>
                                            <div className="formCol">
                                                <label class="formColLabel">Plan Name <span className="mantdat">*</span></label>
                                                <input type="text" placeholder="Enter Name"  />
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">User Type </label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Customer"
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="Customer">
                                                        Customer
                                                        </Option>
                                                        <Option value="Merchant">
                                                       Merchant
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Plan Period</label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Month"
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="Month">
                                                        Month
                                                        </Option>
                                                        <Option value="Trimester">
                                                       Trimester
                                                        </Option>
                                                        <Option value="Semester">
                                                       Semester
                                                        </Option>
                                                        <Option value="Year">
                                                       Year
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Type of Channels</label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Web Access"
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="Web">
                                                        Web Access
                                                        </Option>
                                                        <Option value="Mobile">
                                                       Mobile Access
                                                        </Option>
                                                        <Option value="">
                                                       Both
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Assets <span className="smallTextLabel">Select more than one payment method</span></label>
                                                <div className="antdCheckBCustom">
                                                    <Checkbox onChange={onChange}>Wallets</Checkbox>
                                                    <Checkbox onChange={onChange}>Bank</Checkbox>
                                                    <Checkbox onChange={onChange}>Card</Checkbox>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Settlement Period <span className="mantdat">*</span></label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Select..."
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="realtime">
                                                        Real Time
                                                        </Option>
                                                        <Option value="sametime">
                                                       Same Time
                                                        </Option>
                                                        <Option value="both">
                                                       Both
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Subscription Status <span className="mantdat">*</span></label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Select..."
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="active">
                                                        Active
                                                        </Option>
                                                        <Option value="inactive">
                                                       Inactive
                                                        </Option>
                                                        <Option value="both">
                                                       Both
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Invoice Period <span className="mantdat">*</span></label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Select..."
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="daily">
                                                        Daily
                                                        </Option>
                                                        <Option value=""weekly>
                                                       Weekly
                                                        </Option>
                                                        <Option value="monthly">
                                                       Monthly
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Type of Payment <span className="mantdat">*</span></label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Select..."
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="easypayment">
                                                        Easy Payment
                                                        </Option>
                                                       
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Multiple Currency <span className="mantdat">*</span></label>
                                                <div className="antdCheckBCustom">
                                                    <Checkbox onChange={onChange}>FAF</Checkbox>
                                                    <Checkbox onChange={onChange}>AMERICAN DOLLOR</Checkbox>
                                                    <Checkbox onChange={onChange}>OUV</Checkbox>
                                                    <Checkbox onChange={onChange}>FCFA</Checkbox>
                                                    <Checkbox onChange={onChange}>EURO</Checkbox>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Bulk Payment <span className="mantdat">*</span></label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Select..."
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="true">
                                                        True
                                                        </Option>
                                                        <Option value="false">
                                                       False
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
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
                                            <div className="formCol" style={{width:"100%"}}>
                                                <div className="tabAntdCustom">
                                                    <Tabs onChange={callback} type="card">
                                                        <TabPane tab="FAF" key="1">
                                                        <div className="formRow">
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Daily Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Number of transcations" />
                                                            </div>
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Daily Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Amount of Transcation" />
                                                            </div>
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Weekly Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Number of transcations" />
                                                            </div>
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Weekly Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Amount of Transcation" />
                                                            </div>
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Monthly Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Number of transcations" />
                                                            </div>
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Monthly Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Amount of Transcation" />
                                                            </div>
                                                        </div>
                                                        </TabPane>
                                                        <TabPane tab="American Dollor" key="2">
                                                        Content of Tab Pane 2
                                                        </TabPane>
                                                        <TabPane tab="OUV" key="3">
                                                        Content of Tab Pane 3
                                                        </TabPane>
                                                        <TabPane tab="FCFA" key="4">
                                                        Content of Tab Pane 5
                                                        </TabPane>
                                                        <TabPane tab="EURO" key="5">
                                                        Content of Tab Pane 6
                                                        </TabPane>
                                                    </Tabs>
                                                </div>
                                            </div>
                                       </div>

                                       <div className="sectionSepr">
                                        <h1 class="kycDetails textAlignCenter">Fees Details</h1>
                                        <div className="formRow">
                                            <div className="formCol">
                                                <label className="formColLabel">Plan Price <span className="mantdat">*</span></label>
                                                <input type="text" placeholder="Enter Plan Price" />
                                            </div>
                                        </div>
                                       </div>

                                       <div style={{width: "100%", float: "left"}}>
                                           <div className="confirm_p_w mTB00 button-container rspacing">
                                               <button className="blackbtn aryousureBTN confirmBtnR" onClick={this.back5}>Cancel</button>
                                               <button className="aryousureBTN confirmBtnR">Submit</button>
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
{this.state.editNewPackage && 
<div className="main_contain settings-container">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Edit Package
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                       <div className="formRow">
                                       <div className="formCol">
                                                <label class="formColLabel">Subscription Id </label>
                                                <input type="numbner" placeholder="" value={"47"}/>
                                            </div>
                                            <div className="formCol">
                                                <label class="formColLabel">Subscription Amount </label>
                                                <input type="text" placeholder="Subscription Amount" />
                                            </div>
                                            <div className="formCol">
                                                <label class="formColLabel">Plan Name <span className="mantdat">*</span></label>
                                                <input type="text" placeholder="Enter Name"  />
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">User Type </label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Customer"
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="Customer">
                                                        Customer
                                                        </Option>
                                                        <Option value="Merchant">
                                                       Merchant
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Plan Period</label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Month"
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="Month">
                                                        Month
                                                        </Option>
                                                        <Option value="Trimester">
                                                       Trimester
                                                        </Option>
                                                        <Option value="Semester">
                                                       Semester
                                                        </Option>
                                                        <Option value="Year">
                                                       Year
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Type of Channels</label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Web Access"
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="Web">
                                                        Web Access
                                                        </Option>
                                                        <Option value="Mobile">
                                                       Mobile Access
                                                        </Option>
                                                        <Option value="">
                                                       Both
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol" style={{width:"100%"}}>
                                                <label className="formColLabel">Assets <span className="smallTextLabel">Select more than one payment method</span></label>
                                                <div className="antdCheckBCustom">
                                                    <Checkbox onChange={onChange}>Wallets</Checkbox>
                                                    <Checkbox onChange={onChange}>Bank</Checkbox>
                                                    <Checkbox onChange={onChange}>Card</Checkbox>
                                                </div>
                                            </div>
                                            <div className="formCol" style={{width:"100%"}}>
                                                <label className="formColLabel"><span className="smallTextLabel">Select more than one payment method</span></label>
                                                <div className="antdCheckBCustom antdCheckBCustomSub">
                                                    <h2 className="checkBoxSubHeading">Wallets</h2>
                                                    <Checkbox onChange={onChange}>TONTINE TO USER WALLET (JACKPOT)</Checkbox>
                                                    <Checkbox onChange={onChange}>SERVICE PAYMENT WITH WALLET ACCOUNT</Checkbox>
                                                    <Checkbox onChange={onChange}>CHECKING</Checkbox>
                                                    <Checkbox onChange={onChange}>AGENT WALLET TO AGENT WALLET</Checkbox>
                                                    <Checkbox onChange={onChange}>CASH IN</Checkbox>
                                                    <Checkbox onChange={onChange}>MERCHANT WALLET TO MERCHANT WALLET</Checkbox>
                                                    <Checkbox onChange={onChange}>CASH IN AGENT</Checkbox>
                                                    <Checkbox onChange={onChange}>CASH IN MERCHANT</Checkbox>
                                                    <Checkbox onChange={onChange}>AGENT WALLET TO USER WALLET</Checkbox>
                                                    <Checkbox onChange={onChange}>USER WALLET TO TONTINE (CONTRIBUTION)</Checkbox>
                                                    <Checkbox onChange={onChange}>TRANSFER TO NON-SARA CUSTOMER</Checkbox>
                                                    <Checkbox onChange={onChange}>CASH DEPOSIT - WALLET</Checkbox>
                                                    <Checkbox onChange={onChange}>FLASH TRANSFERT</Checkbox>
                                                    <Checkbox onChange={onChange}>TESTING</Checkbox>
                                                    <Checkbox onChange={onChange}>TOP UP AIRTIME WITH WALLET</Checkbox>
                                                    <Checkbox onChange={onChange}>CASH OUT MERCHANT</Checkbox>
                                                    <Checkbox onChange={onChange}>CASH WITHDRAW FROM WALLET</Checkbox>
                                                    <Checkbox onChange={onChange}>CASH OUT</Checkbox>
                                                    <Checkbox onChange={onChange}>CASH OUT AGENT</Checkbox>
                                                    <Checkbox onChange={onChange}>USER WALLET TO MERCHANT WALLET</Checkbox>
                                                    <Checkbox onChange={onChange}>BULK PAYMENT</Checkbox>
                                                    <Checkbox onChange={onChange}>WALLET TO WALLET</Checkbox>
                                                    <Checkbox onChange={onChange}>MERCHANT WALLET TO USER WALLET</Checkbox>
                                                    <Checkbox onChange={onChange}>USER WALLET TO AGENT WALLET</Checkbox>
                                                    <Checkbox onChange={onChange}>CHECKING3</Checkbox>
                                                </div>
                                            </div>
                                            <div className="formCol" style={{width:"100%"}}>
                                                <label className="formColLabel"><span className="smallTextLabel">Select more than one payment method</span></label>
                                                <div className="antdCheckBCustom antdCheckBCustomSub">
                                                    <h2 className="checkBoxSubHeading">Bank</h2>
                                                    <Checkbox onChange={onChange}>TOP UP AIRTIME WITH BANK ACCOUT</Checkbox>
                                                    <Checkbox onChange={onChange}>BANK TO BANK</Checkbox>
                                                    <Checkbox onChange={onChange}>CASH WITHDRAW FROM BANK</Checkbox>
                                                    <Checkbox onChange={onChange}>AFB TO OTHER BANK</Checkbox>
                                                    <Checkbox onChange={onChange}>CASH DEPOSIT - BANK</Checkbox>
                                                    <Checkbox onChange={onChange}>SERVICE PAYMENT WITH BANK ACCOUNT</Checkbox>
                                                </div>
                                            </div>
                                            <div className="formCol" style={{width:"100%"}}>
                                                <label className="formColLabel"><span className="smallTextLabel">Select more than one payment method</span></label>
                                                <div className="antdCheckBCustom antdCheckBCustomSub">
                                                    <h2 className="checkBoxSubHeading">Card</h2>
                                                    <Checkbox onChange={onChange}>SARA</Checkbox>
                                                    <Checkbox onChange={onChange}>CHECKING2</Checkbox>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Subscription Status <span className="mantdat">*</span></label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Select..."
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="active">
                                                        Active
                                                        </Option>
                                                        <Option value="inactive">
                                                       Inactive
                                                        </Option>
                                                        <Option value="both">
                                                       Both
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Invoice Period <span className="mantdat">*</span></label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Select..."
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="daily">
                                                        Daily
                                                        </Option>
                                                        <Option value=""weekly>
                                                       Weekly
                                                        </Option>
                                                        <Option value="monthly">
                                                       Monthly
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Type of Payment <span className="mantdat">*</span></label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Select..."
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="easypayment">
                                                        Easy Payment
                                                        </Option>
                                                       
                                                    </Select>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Multiple Currency <span className="mantdat">*</span></label>
                                                <div className="antdCheckBCustom">
                                                    <Checkbox onChange={onChange}>FAF</Checkbox>
                                                    <Checkbox onChange={onChange}>AMERICAN DOLLOR</Checkbox>
                                                    <Checkbox onChange={onChange}>OUV</Checkbox>
                                                    <Checkbox onChange={onChange}>FCFA</Checkbox>
                                                    <Checkbox onChange={onChange}>EURO</Checkbox>
                                                </div>
                                            </div>
                                            <div className="formCol">
                                                <label className="formColLabel">Bulk Payment <span className="mantdat">*</span></label>
                                                <div className="categorySelect">
                                                    <Select
                                                        defaultValue="Select..."
                                                        style={{ width: 100 + "%", height: 52 }}
                                                        onChange={(e) =>
                                                        this.handleChangeSelect(e)
                                                        }
                                                    >
                                                        <Option value="true">
                                                        True
                                                        </Option>
                                                        <Option value="false">
                                                       False
                                                        </Option>
                                                    </Select>
                                                </div>
                                            </div>
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
                                            <div className="formCol" style={{width:"100%"}}>
                                                <div className="tabAntdCustom">
                                                    <Tabs onChange={callback} type="card">
                                                        <TabPane tab="FAF" key="1">
                                                        <div className="formRow">
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Daily Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Number of transcations" />
                                                            </div>
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Daily Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Amount of Transcation" />
                                                            </div>
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Weekly Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Number of transcations" />
                                                            </div>
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Weekly Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Amount of Transcation" />
                                                            </div>
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Monthly Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Number of transcations" />
                                                            </div>
                                                            <div className="formCol">
                                                                <label className="formColLabel">Transaction Monthly Limit <span className="mantdat">*</span></label>
                                                                <input type="text" placeholder="Amount of Transcation" />
                                                            </div>
                                                        </div>
                                                        </TabPane>
                                                        <TabPane tab="American Dollor" key="2">
                                                        Content of Tab Pane 2
                                                        </TabPane>
                                                        <TabPane tab="OUV" key="3">
                                                        Content of Tab Pane 3
                                                        </TabPane>
                                                        <TabPane tab="FCFA" key="4">
                                                        Content of Tab Pane 5
                                                        </TabPane>
                                                        <TabPane tab="EURO" key="5">
                                                        Content of Tab Pane 6
                                                        </TabPane>
                                                    </Tabs>
                                                </div>
                                            </div>
                                       </div>

                                       <div className="sectionSepr">
                                        <h1 class="kycDetails textAlignCenter">Fees Details</h1>
                                        <div className="formRow">
                                            <div className="formCol">
                                                <label className="formColLabel">Plan Price <span className="mantdat">*</span></label>
                                                <input type="text" placeholder="Enter Plan Price" />
                                            </div>
                                        </div>
                                       </div>

                                       <div style={{width: "100%", float: "left"}}>
                                           <div className="confirm_p_w mTB00 button-container rspacing">
                                               <button className="blackbtn aryousureBTN confirmBtnR" onClick={this.back5}>Cancel</button>
                                               <button className="aryousureBTN confirmBtnR">Submit</button>
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
    </>
        );
    }
}
export default Packages;