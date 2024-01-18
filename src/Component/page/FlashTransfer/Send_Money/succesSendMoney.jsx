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
import SendFeels from './sendFeels';
import { Alert } from 'bootstrap';
import { useHistory } from 'react-router-dom';




const label =""
const value =""

  

function handleChange(value) {
    console.log(`selected ${value}`);
  } 
 
  

class SendMoney extends Component {

  

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

      call = () => {

        this.props.history.push("/Admin/sendMoney");  
    }

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
                                              Send Money
                                            </h1>
                                            {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                                        </div>
                                    </div>
                                    <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                                      
                                        <div
                                            className="ag-theme-alpine agGridCustomize"
                                            style={{ height: 700, width: 100 + "%" }} >
                                                <div className="eltAlign" style={{fontSize:40}}> 
                                         <h2 className="title2" >Transactions Fee is : </h2> 
                                       </div>
                                       <div className="eltAlign2" >
                                              <div className="labelMargin"> 
                                                <Label  className="formColLabel2"style={{marginLeft:"69px"}} >Mobile Number</Label>
                                               </div>
                                           <div  className="inputFlash2"   style={{marginLeft:"29px"}}>
                                               <Input placeholder="Enter Number"  > </Input>
                                           </div>
                                         </div>


                                         <div className="eltAlign2" >
                                             <div  className="labelMargin">
                                               <Label  className="formColLabel2" style={{marginLeft:"69px"}}>Sender'S Account</Label>
                                            </div>


                                           <div  className="inputFlash2"   style={{marginLeft:"15px"}}>
                                               <Input> </Input>
                                           </div>
                                         </div>
                                        
                                         <div className="eltAlign2" >

                                            <div className="labelMargin">
                                               <Label  className="formColLabel2" style={{marginLeft:"69px"}}>Receiver's Account</Label>
                                             </div>
                                           <div  className="inputFlash2"   style={{marginLeft:"15px"}}>
                                               <Input > </Input>
                                           </div>
                                         </div>

                                         <div className="eltAlign2" >
                                           <div  className="labelMargin" style={{width:250}}>
                                               <Label  className="formColLabel2" style={{marginLeft:"70px"}}>Amount</Label>
                                               </div>
                                           <div  className="inputFlash2"  >
                                               <Input placeholder="Enter Number"  > </Input>
                                           </div>
                                         </div>

                                         <div className="eltAlign2">
                                         <div className="labelMargin" style={{width:385}}>
                                               <Label  className="formColLabel1" style={{marginLeft:"76px"}}>Contry</Label>
                                         </div>
                                        <div  >x
                                             <Select className="selectWeidth"
                                                   onChange={handleChange} />
                                        </div>
                                      </div>

                                      <div className="eltAlign2">
                                      <div className="labelMargin"  style={{width:395}}>
                                               <Label  className="formColLabel1"style={{marginLeft:60}} >Currency</Label>
                                         </div>
                                        <div  >
                                             <Select className="selectWeidth"
                                                   onChange={handleChange}
                                                      />
                                        </div>
                                      </div>


                                        </div>

                                       


                                        <div className="customAgFooter">
                                        <div className="divButton" style={{marginLeft:80}}>
                                         <Button  className="btn-cancel-non-afb"style={{borderRadius:20, width:'135px',borderBlockColor:'white'}}  > 
                                                 Refuse
                                             </Button>
                                             <div style={{marginLeft:300, marginRight:300}}>

                                            </div>
                                             <Button  className="btn-submit-non-afb" 
                                                      onClick={this.toggle2}
                                                      style={{borderRadius:20, width:'135px',
                                                      backgroundColor:'red',borderBlockColor:'white'}}   > 
                                                 Submit
                                             </Button>

                                             </div> 

                                             <Modal  
                                               isOpen={this.state.modal2}
                                               className={this.props.className}
                                               style={{width:600}}> 
                                            <ModalHeader  
                                                          className="modalHeader" style={{
                                                          backgroundColor:"#E25D56",
                                                         justifyContent:'center',
                                                         alignItems:'center',
                                                         
                                                         width:600,}}>
                                                             <Label className="titleModal">Confirmation Message</Label>
                                            </ModalHeader>
                                            <ModalBody   className="modalBody"style={{width:600,}} >
                                          
                                           
                                            <Label style={{marginTop:20, marginLeft:40, fontSize:30}}>Agent's Password</Label>
                           
                                                                        
                                         <FormGroup row>
                                         <div  className="" >
                                               <Input style={{marginLeft:60, width:400}}> </Input>
                                           </div>                         
                                                                        
                                                                        
                                         </FormGroup>
                            {/* <a href  ="SendFeels"> */}
                                         <Button className="btnOk"  
                                               style={{backgroundColor:"#cc5f59",
                                                       borderRadius:20,
                                                       borderBlockColor:'white' }}
                                                       onClick={this.call}
                                                       >Submit
                                         </Button> 
                              {/* onClick={()=>{ SendFeells(); 
                                alert("Page d'envoi"); }} */}
                             {/* </a>   */}
                         </ModalBody>
                                           
                     </Modal>
                                         
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




  
  
export default  SendMoney;




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