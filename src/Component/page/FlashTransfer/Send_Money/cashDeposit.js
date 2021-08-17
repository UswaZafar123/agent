import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DatePicker from "react-datepicker";
import Select from 'react-select';
import { connect } from "react-redux";
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
    import OtpInput from 'react-otp-input';
//import { getCurrencies, getMerchantTransactionList } from "./src/Component/Agent/services/actions";

const { Option } = Select;

function handleChange(value) {
    console.log(`selected ${value}`);
  } 


class CashDeposit extends Component {

  

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
   
    toggle1 = () => {
        this.setState({ modal1: !this.state.modal1 });
      };
      toggle2 = () => {
        this.setState({ modal2: !this.state.modal2 });
        this.setState({modal1: false})
      };
      call = () => {

        this.props.history.push("/Admin/succesSendMoney");  
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
                                              Cash Deposit in Bank Account 
                                            </h1>
                                            {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                                        </div>
                                    </div>
                                    <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                                      
                                        <div
                                            className="ag-theme-alpine agGridCustomize"
                                            style={{ height: 600, width: 100 + "%" }}
                                        >   
                                          
                                          <div className="eltAlign" >
                                               <Label  className="formColLabel1">Mobile Number</Label>
                                            <div  className="inputFlash"  >
                                               <Input placeholder="Enter Mobile Number" > </Input>
                                            </div>
                                         </div>
                                         <div className="eltAlign" >
                                               <Label  className="formColLabel1" style={{marginLeft:"69px"}}>Amount</Label>
                                           <div  className="inputFlash"   >
                                               <Input placeholder="Enter Amount"  > </Input>
                                           </div>
                                         </div>
                                         <div className="eltAlign">
                                               <Label  className="formColLabel1" style={{marginLeft:"69px"}}>Reason</Label>
                                         <div  className="inputFlash" >
                                               <Input className="input_height"
                                               placeholder="Add Raison" 
                                               style={{ border: "2px solid black" }}
                                               > </Input>
                                          </div>
                                        </div>
                                        <div className="eltAlign">
                                               <Label  className="formColLabel1" style={{marginLeft:"69px"}}>Contry</Label>
                                        <div  >
                                             <Select className="selectWeidth"
                                                   onChange={handleChange}
                                                      />
                                        </div>
                                      </div>
                                      <div className="eltAlign">
                                               <Label  className="formColLabel1" style={{marginLeft:"50px"}}>currency</Label>
                                         <div  >
                                             <Select className="selectWeidth"
                                                   onChange={handleChange}  />
                                         </div>
                                      </div>
                                      <div className="divButton">
                                         <Button className="btn-cancel-non-afb"style={{borderRadius:20, width:'135px',borderBlockColor:'white'}}  > 
                                                 Cancel
                                             </Button>
                                      <div style={{marginLeft:300, marginRight:300}}> 

                                             </div>
                                             <Button className="btn-submit-non-afb"
                                                      onClick={this.toggle2}
                                                      style={{borderRadius:20, width:'135px',
                                                      backgroundColor:'red',borderBlockColor:'white'}}  > 
                                                 Submit
                                             </Button>
                                             <Modal  
                                               isOpen={this.state.modal2}
                                               className={this.props.className}
                                               style={{width:600,   }}> 
                                            <ModalHeader  
                                                          className="modalHeader" style={{
                                                          backgroundColor:"#E25D56",
                                                         justifyContent:'center',
                                                         alignItems:'center',
                                                         
                                                         width:600,}}>
                                                             <Label className="titleModal">Vérification</Label>
                                            </ModalHeader>
                                            <ModalBody   className="modalBody"style={{width:600,}} >
                                          
                                            <Label style={{fontSize:30,fontWeight:'bold' , marginTop:20, marginLeft:100}}>Enter Pin To Continue</Label>
                                            <Label className="formColLabel1" style={{marginTop:20, marginLeft:100}}>Please Enter Your PIN Number</Label>
                           
                                        
                            <FormGroup row>
                          
                                   
                            <OtpInput  className="otpSize"
                                      value={this.state.otp}
                                      onChange={this.handleChange}
                                      numInputs={4}
                                      />

                             
                            </FormGroup>
                            {/* <a href  ="SendFeels"> */}
                              <Button className="btnOk"  
                                    style={{backgroundColor:"#cc5f59",
                                            borderRadius:20,
                                            borderBlockColor:'white' }}
                                            onClick={this.call}
                                            >OK
                              </Button> 
                             
                         </ModalBody>
                                           
                     </Modal>
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




  
  
export default  CashDeposit;




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