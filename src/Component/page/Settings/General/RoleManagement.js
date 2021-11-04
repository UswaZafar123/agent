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
import { FolderViewOutlined} from '@ant-design/icons';

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
class RoleManagement extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gridApi: null,
            isModalVisible: false,
            paginationGetCurrentPage: null,
            popup: false,
            isfeatured:true,
            addNewRole:false,
            editNewRole:false,
            viewNewRole:false,
            value:'',
            columnDefs: [
                { headerName: "Name", field: "Name", width: 250 },
                { headerName: "Display Name", field: "Display_Name" },
                { headerName: "Description ", field: "Description" },
               
                {
                    headerName: "Action", field: "Action",
                    cellRendererFramework: (params) => <div className="ac-view">
                        <span className="" style={{cursor: "pointer",fontSize:"17px"}} onClick={this.viewNewRole}><FolderViewOutlined /></span>
                        <span className="icon-edit-2" style={{cursor: "pointer"}} style={{marginLeft: "5%"}} onClick={this.editNewRole}></span>
                        <span className="icon-Group-357" style={{marginLeft: "5%"}}></span>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                }



            ],
            rowData: [
                { Name: "Lorem Ipsum", Display_Name: "", Description: "Lorem Ipsum Dollor sakdn", Action:""},    

            ],
            

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

    addNewRole = () => {
        this.setState({
            addNewRole:true,
            editNewRole:false,
            viewNewRole:false
        })
    }
    editNewRole = () => {
        this.setState({
            addNewRole:false,
            editNewRole:true,
            viewNewRole:false
        })
    }
    viewNewRole = () => {
        this.setState({
            addNewRole:false,
            editNewRole:false,
            viewNewRole:true
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
            addNewRole:false,
            editNewRole:false,
            viewNewRole:false
        })
      }
     

    render() {

        const isfeatured = this.state.isfeatured
        return (
    <>
        {!this.state.addNewRole && !this.state.editNewRole && !this.state.viewNewRole &&
            <div className="main_contain settings-container">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Roles
                      </h1>
                                            <button className="addposbtn c_first_pending_BTN" onClick={this.addNewRole}>Add New Role</button>
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

{this.state.addNewRole && 
            <div className="main_contain settings-container">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Add New Role
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
                                                    <label>Description</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Description"  />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="roleTable mT24">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Permissions</th>
                                                        <th>Edit</th>
                                                        <th>List</th>
                                                        <th>Delete</th>
                                                        <th>View</th>
                                                        <th>Add</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   {[1,2,3,4,5,6].map((row)=>{/* change array lator*/
                                                       return (
                                                        <tr>
                                                        <td>Merchant Shop Manager</td>
                                                        <td>
                                                            <div className="antdCheckBCustom tablecheckinput">
                                                                <Checkbox onChange={onChange}></Checkbox>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="antdCheckBCustom tablecheckinput">
                                                                <Checkbox onChange={onChange}></Checkbox>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="antdCheckBCustom tablecheckinput">
                                                                <Checkbox onChange={onChange}></Checkbox>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="antdCheckBCustom tablecheckinput">
                                                                <Checkbox onChange={onChange}></Checkbox>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="antdCheckBCustom tablecheckinput">
                                                                <Checkbox onChange={onChange}></Checkbox>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                       )
                                                   })}
                                                </tbody>
                                            </table>
                                        </div>

                                      
                                    
                                      

                                       <div style={{width: "100%", float: "left"}}>
                                           <div className="custom-d-flex confirm_p_w mTB00 button-container rspacing">
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
{this.state.editNewRole &&
<div className="main_contain settings-container">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Edit Role
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
                                                    <label>Description</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Description"  />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="roleTable mT24">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Permissions</th>
                                                        <th>Edit</th>
                                                        <th>List</th>
                                                        <th>Delete</th>
                                                        <th>View</th>
                                                        <th>Add</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   {[1,2,3,4,5,6].map((row)=>{/* change array lator*/
                                                       return (
                                                        <tr>
                                                        <td>Merchant Shop Manager</td>
                                                        <td>
                                                            <div className="antdCheckBCustom tablecheckinput">
                                                                <Checkbox onChange={onChange}></Checkbox>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="antdCheckBCustom tablecheckinput">
                                                                <Checkbox onChange={onChange}></Checkbox>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="antdCheckBCustom tablecheckinput">
                                                                <Checkbox onChange={onChange}></Checkbox>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="antdCheckBCustom tablecheckinput">
                                                                <Checkbox onChange={onChange}></Checkbox>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="antdCheckBCustom tablecheckinput">
                                                                <Checkbox onChange={onChange}></Checkbox>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                       )
                                                   })}
                                                </tbody>
                                            </table>
                                        </div>

                                       <div className="sectionSepr"></div>

                                       <div style={{width: "100%", float: "left"}}>
                                           <div className="custom-d-flex confirm_p_w mTB00 button-container rspacing">
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

{this.state.viewNewRole &&
<div className="main_contain settings-container">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                View
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                        <div className="roleTable roleViewTable mT24">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Role</th>
                                                        <th>Description</th>
                                                        <th>Permission</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                   {[1,2].map((row)=>{/* change array lator*/
                                                       return (
                                                        <tr>
                                                        <td>Shop Manager</td>
                                                        <td>Manage a shop and all the point of sales</td>
                                                        <td>True</td>
                                                    </tr>
                                                       )
                                                   })}
                                                </tbody>
                                            </table>
                                        </div>

                                       <div className="sectionSepr"></div>

                                       <div style={{width: "100%", float: "left"}}>
                                           <div className="custom-d-flex confirm_p_w mTB00 button-container rspacing">
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
export default RoleManagement;