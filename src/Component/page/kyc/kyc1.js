import React, {  Component } from 'react';
import 'antd/dist/antd.css';

//import "./src/Component/Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import OtpInput from 'react-otp-input';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {  Card,
    CardBody,
    CardHeader,
    Col,
    Button,
    Form,
    FormGroup,
    FormText,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, } from 'reactstrap';

import { BiLink } from "react-icons/bi";

// import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';
import Select from 'react-select';
import { MdFingerprint } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Alert } from 'bootstrap';
import { useHistory } from 'react-router-dom';




const label =""
const value =""

  

function handleChange(value) {
    console.log(`selected ${value}`);
  } 
 
  

class TaxationProof extends Component {

  

    componentDidMount () {
        // var date = new Date();

        // var firstDayFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        // var todayDateFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];


        // this.props.getMerchantTransactionList(sessionStorage.getItem("token"), firstDayFormat,todayDateFormat,"XAF");
        // this.props.getCurrencies(sessionStorage.getItem("token"));
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
                                              Taxation Proof
                                              
                                            </h1>
                                            <Button className="buttonDisable"style={{borderRadius:20,
                                                         width:'170px',borderBlockColor:'white',
                                                         backgroundColor:'#464646'}}  > 
                                                 Cancel
                                             </Button>
                                            {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                                        </div>
                                    </div>
                                    <div className=" chartCardMiddle" style={{ padding: "24px" }}>
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

                                                <h5 style={{fontSize:20, marginLeft:20}}>
                                                    Records Per Page
                        </h5>

                                                  <div
                                                        className="search_w_merchant_m"
                                                        style={{ width: "270px",marginLeft:30 }}
                                                    >
                                                        <input type="search" placeholder="Search" />
                                                    </div>
                                                    {/* FiPaperclip */}
                                                    <div className="actionBtnWp"style={{alignContent:'space-between'}}>
                                                        <span >  <IoLogoBuffer/> </span>
                                                        <span >  <FiPaperclip/> </span>
                                                        <span >  <IoIosList/> </span>
                                                    </div>
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
                                          
                                       
                                         
                                      
                                        </div>
                                        <div className="customAgFooter">

                                         
                                            <div className="NextPrevW">
                                               
                                            </div>

                                        </div>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        );
    }
}




  
  
export default  TaxationProof;




{/* <div className="main_contain">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                              Recive Money
                                            </h1>
                                            {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                                        // </div>
                                    // </div>
                //                     <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                                      
                //                         <div
                //                             className="ag-theme-alpine agGridCustomize"
                //                             style={{ height: 400, width: 100 + "%" }}
                //                         >
                                       

                                      
                //                         </div>
                //                         <div className="customAgFooter">

                                         
                //                             <div className="NextPrevW">
                                               
                //                             </div>

                //                         </div>
                //                     </div>
                //                 </div>
                               
                //             </div>
                //         </div>
                //     </div>
                // </div>



            //</div> 