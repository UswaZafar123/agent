import React, {  Component } from 'react';
import 'antd/dist/antd.css';

//import "./src/Component/Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import OtpInput from 'react-otp-input';

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

import { Alert } from 'bootstrap';
import { useHistory } from 'react-router-dom';




const label =""
const value =""

  

function handleChange(value) {
    console.log(`selected ${value}`);
  } 
 
  

class ReciveMoney1 extends Component {

  

    componentDidMount () {
        // var date = new Date();

        // var firstDayFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        // var todayDateFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];


        // this.props.getMerchantTransactionList(sessionStorage.getItem("token"), firstDayFormat,todayDateFormat,"XAF");
        // this.props.getCurrencies(sessionStorage.getItem("token"));
    }

      

    componentDidMount () {
        // var date = new Date();

        // var firstDayFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        // var todayDateFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];


        // this.props.getMerchantTransactionList(sessionStorage.getItem("token"), firstDayFormat,todayDateFormat,"XAF");
        // this.props.getCurrencies(sessionStorage.getItem("token"));
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
   
    toggle1 = () => {
        this.setState({ modal1: !this.state.modal1 });
      };
      toggle2 = () => {
        this.setState({ modal2: !this.state.modal2 });
        this.setState({modal1: false})
      };
      call = () => {

        this.props.history.push("/Admin/ReciveMoney");  
    }
    //   openSendFeels = () => {
    //     this.isModalVisible({ SendFeels });
    //     this.setState({modal2: false})
    //   };
   

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
                                            style={{ height: 420, width: 300 + "%" }}>
                                          
                                          <div className="eltAlign2" style={{marginTop:30}}>
                                              <div className="labelMargin" > 
                                                <Label  className="formColLabel2"style={{marginLeft:"69px"}} >Name</Label>
                                               </div>
                                           <div  className="inputFlash2"   style={{marginLeft:"29px"}}>
                                               <Input placeholder="Enter Name"  > </Input>
                                           </div>
                                         </div>


                                         <div className="eltAlign2"  style={{marginTop:30}}>
                                             <div  className="labelMargin">
                                               <Label  className="formColLabel2" style={{marginLeft:"69px"}}>Amount</Label>
                                            </div>


                                           <div  className="inputFlash2"   style={{marginLeft:"15px"}}>
                                               <Input placeholder="Enter Amount" name ="amount"> </Input>
                                           </div>
                                         </div>
                                        
                                         <div className="eltAlign2"style={{marginTop:30}} >

                                            <div className="labelMargin">
                                               <Label  className="formColLabel2" >Mobile Number</Label>
                                             </div>
                                           <div  className="inputFlash2"   style={{marginLeft:"15px"}}>
                                               <Input placeholder="Enter Mobile Number" name ="MobileNumber"> </Input>
                                           </div>
                                         </div>

                                         <div className="eltAlign2" style={{marginTop:30}}>
                                           <div  className="labelMargin" style={{width:90,marginLeft:100}}>
                                               <Label  className="formColLabel2" >E-mail</Label>
                                               </div>
                                           <div  className="inputFlash2"  >
                                               <Input placeholder="Enter e-mail"  name="e-mail"> </Input>
                                           </div>
                                         </div>

                                         <div className="divButton">
                                      <Button className="btn-cancel-non-afb"style={{borderRadius:20, width:'135px',borderBlockColor:'white'}}  >
                                            Cancel
                                        </Button>
                                      <div style={{marginLeft:300, marginRight:300}}>

                                             </div>
                                             <Button className="btn-submit-non-afb" 
                                                      onClick={this.call}
                                                      style={{borderRadius:20, width:'135px',
                                                      backgroundColor:'red',borderBlockColor:'white'}} > 
                                                 Submit
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
        );
    }
}



{/* <div className="divStory">  */}
  
  
export default  ReciveMoney1;




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