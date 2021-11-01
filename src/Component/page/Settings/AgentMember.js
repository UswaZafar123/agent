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
class AgentMember extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gridApi: null,
            isModalVisible: false,
            paginationGetCurrentPage: null,
            popup: false,
            addNewMember:false,
            editNewMember:false,
            viewNewMember:false,
            activeStatus:true,
            value:1,
            columnDefs: [
                { headerName: "Name", field: "Name", width: 250 },
                { headerName: "Email", field: "Email" },
                { headerName: "Telephone ", field: "Telephone" },
                {
                    headerName: "Status", field: "Status",
                    cellRendererFramework: (params) => <div className="ac-inactiveBTN">
                        <button className={!this.state.activeStatus ? "inactive" : ""}>{this.state.activeStatus ? "Active" : "Inactive"}</button>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                },
               
                {
                    headerName: "Action", field: "Action",
                    cellRendererFramework: (params) => <div className="ac-view">
                        <span className="icon-edit-2" style={{cursor: "pointer"}} style={{marginLeft: "5%"}} onClick={this.editNewMember}></span>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                }



            ],
            rowData: [
                { Name: "Lorem Ipsum", Email: "abc@orem.com", Telephone: "0000000000",Status:"Active", Action:""},    

            ],
            

        };
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

    addNewMember = () => {
        this.setState({
            addNewMember:true,
            editNewMember:false,
            viewNewMember:false
        })
    }
    editNewMember = () => {
        this.setState({
            addNewMember:false,
            editNewMember:true,
            viewNewMember:false
        })
    }
    viewNewMember = () => {
        this.setState({
            addNewMember:false,
            editNewMember:false,
            viewNewMember:true
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
            addNewMember:false,
            editNewMember:false,
            viewNewMember:false
        })
      }
      handleChangeSelect = (e) =>{
        console.log(`selected ${e}`);
    }

    onChangeRadio = e => {
        this.setState({
            value:e.target.value
        })
      };

    render() {

        const isfeatured = this.state.isfeatured
        return (
    <>
        {!this.state.addNewMember && !this.state.editNewMember && 
            <div className="main_contain">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Agent Member
                      </h1>
                                            <button className="addposbtn c_first_pending_BTN" onClick={this.addNewMember}>Add New Member</button>
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

{this.state.addNewMember && 
            <div className="main_contain">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Add New Member
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                        <div className="containerBiaN_form">
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Name</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Name" />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Email</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Email"  />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Mobile</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                <div className="inputSt">
                                                <PhoneInput
                                                    country={'us'}
                                                    value={this.state.phone}
                                                    onChange={phone => this.setState({ phone })}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Password</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Password"  />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Confirm Password</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Confirm Password"  />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Status</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <div className="categorySelect">
                                                        <Select
                                                            defaultValue="Active"
                                                            style={{ width: 100+"%", height: 52 }}
                                                            onChange={this.handleChangeSelect}
                                                            id={'page-size'}
                                                        >
                                                            <Option value="Active">Active</Option>
                                                            <Option value="Deactive">Deactive</Option>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Packages</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <div className="categorySelect">
                                                            <Select
                                                                defaultValue="Active"
                                                                mode="multiple"
                                                                style={{ width: 100+"%", height: 52 }}
                                                                onChange={this.handleChangeSelect}
                                                                id={'page-size'}
                                                            >
                                                                <Option value="Active">Package1</Option>
                                                                <Option value="Deactive">Package2</Option>
                                                            </Select>
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Send Emai with Credentials</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent antdRadioCustom">
                                                <Radio.Group onChange={this.onChangeRadio} value={this.state.value}>
                                                    <Radio value={1}>Yes</Radio>
                                                    <Radio value={2}>No</Radio>
                                                </Radio.Group>
                                                </div>
                                            </div>
                                        </div>

                                       <div style={{width: "100%", float: "left"}}>
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
{this.state.editNewMember &&
    <div className="main_contain">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Edit Member
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                        <div className="containerBiaN_form">
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Name</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Name" />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Email</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Email"  />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Mobile</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                <div className="inputSt">
                                                <PhoneInput
                                                    country={'us'}
                                                    value={this.state.phone}
                                                    onChange={phone => this.setState({ phone })}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Password</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Password"  />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Confirm Password</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Confirm Password"  />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Status</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <div className="categorySelect">
                                                        <Select
                                                            defaultValue="Active"
                                                            style={{ width: 100+"%", height: 52 }}
                                                            onChange={this.handleChangeSelect}
                                                            id={'page-size'}
                                                        >
                                                            <Option value="Active">Active</Option>
                                                            <Option value="Deactive">Deactive</Option>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Packages</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <div className="categorySelect">
                                                            <Select
                                                                defaultValue="Active"
                                                                mode="multiple"
                                                                style={{ width: 100+"%", height: 52 }}
                                                                onChange={this.handleChangeSelect}
                                                                id={'page-size'}
                                                            >
                                                                <Option value="Active">Package1</Option>
                                                                <Option value="Deactive">Package2</Option>
                                                            </Select>
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Send Emai with Credentials</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent antdRadioCustom">
                                                <Radio.Group onChange={this.onChangeRadio} value={this.state.value}>
                                                    <Radio value={1}>Yes</Radio>
                                                    <Radio value={2}>No</Radio>
                                                </Radio.Group>
                                                </div>
                                            </div>
                                        </div>

                                       <div style={{width: "100%", float: "left"}}>
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
export default AgentMember;