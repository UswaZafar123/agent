import React, {  Component } from 'react';
import 'antd/dist/antd.css';

import success from '../../../../Assets/images/confirm.svg';
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



// import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';
import Select from 'react-select';
import { MdFingerprint } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { useHistory } from 'react-router-dom';




const label =""
const value =""

  

function handleChange(value) {
    console.log(`selected ${value}`);
  } 
 

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


  
    state = {
        modal1: false,
        code :null,
        modal2:false,
    
    
    }

   

    toggle2 = () => {
        this.setState({ modal2: !this.state.modal2 });
        this.setState({modal1: false})
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
                                            Flash Tranfer - Receive Money
                                            </h1>
                                            {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                                        </div>
                                    </div>

                                    <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                                      
                                        <div
                                            className="ag-theme-alpine agGridCustomize"
                                            style={{ height: 1000, width: 100 + "%" }}
                                        >

                                                <div style={{height:130}} > 
                                                    <img src={success} alt="success" />
                                                    <Label style={{marginTop:30, fontSize:30, 
                                                        marginLeft:350,

                                                        }}> 
                                                     Money Received Successful !
                                                </Label >
                                                </div > 
                                               
                                           
                                     <div className="divStory" > 
                                     <div className="marginList1" >  
                                     <Label className="marginList"style={{marginTop:10}}> 
                                    Mobile Number :
                                     </Label >
                                     </div>
                                     <Divider />
                                     <div className="marginList1">
                                     <Label className="marginList"> 
                                        Amount :
                                     </Label >
                                     </div>
                                     <Divider />
                                     <div className="marginList1">
                                     <Label className="marginList"> 
                                       Fees :
                                     </Label >
                                     </div>
                                     <Divider />
                                     <div  className="marginList1">
                                     <Label className="marginList"> 
                                        Date :
                                     </Label >
                                     </div>
                                     <Divider />
                                     <div className="marginList1">
                                     <Label className="marginList"> 
                                         Time :
                                     </Label >
                                     </div>
                                     <Divider />
                                     <div className="marginList1">
                                     <Label className="marginList"> 
                                 Sender's Account :
                                     </Label >
                                     </div>
                                     <Divider />
                                     <div className="marginList1">
                                     <Label className="marginList"> 
                                 Receiver's Account :
                                     </Label >
                                     </div>
                                     <Divider />
                                     <div className="marginList1">
                                     <Label className="marginList"> 
                                         Reason :
                                     </Label >
                                     </div>
                                     <Divider />
                                     <div className="marginList1">
                                     <Label className="marginList"> 
                                         Currency :
                                     </Label >
                                     </div>
                                     <Divider />

                                     <div className="divButton">
                                         <Button className="buttonDisable"style={{borderRadius:20, width:'170px',borderBlockColor:'white'}}  > 
                                                 Print Summary
                                             </Button>
                                      <div style={{marginLeft:200, marginRight:300}}>

                                             </div>
                                             <Button className="buttonDisable" 
                                                      onClick={this.toggle1}
                                                     style={{borderRadius:20, width:'170px',
                                                             backgroundColor:'red',borderBlockColor:'white'}}  > 
                                                 Done
                                             </Button>

                                             </div> 

                                              
                                              

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