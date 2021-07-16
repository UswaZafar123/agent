import React, { Component } from 'react';
//import './src/Component/Agent/Dashboard';
//import "./src/Component/Agent/css/merchant_management.css";
import 'antd/dist/antd.css';
//import "./src/Component/Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DatePicker from "react-datepicker";
import { Select, Menu, Dropdown, Modal, } from 'antd';
import { connect } from "react-redux";
//import { getCurrencies, getMerchantTransactionList } from "./src/Component/Agent/services/actions";

const { Option } = Select;


class ReciveMoney2 extends Component {

  

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
                                              Recive Money
                                            </h1>
                                            {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                                        </div>
                                    </div>
                                    <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                                      
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




  
  
export default  ReciveMoney2;




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