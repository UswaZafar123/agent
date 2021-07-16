import React, {  Component } from 'react';
import 'antd/dist/antd.css';
import AfbCustomer2 from '../CustomerRegistration/AfbCustomer2';

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

import { Cancel } from '@material-ui/icons';
import NonAfbCustomer from "./nonAfbCustomer";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";





class AfbCustomer extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                currentView: 1,
                accountNumber:'',
                idCardNumber:'',

            };
        this.setState(
            {
                currentView:this.state.currentView
            }
        );
    }
    setCurrentView(viewNumber) {
        this.setState({ currentView: viewNumber });
    }


    componentDidMount () {

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

        return (
            <div>
                {
                    this.state.currentView ===1?
                        <div>
                        <div className="main_contain">
                            <div className="merch_m_list_w">
                                <div className="merch_list_card" id="merch_list_card">
                                    <div className="section_custom">
                                        <div className="sectionInn">
                                            <div className="chartCard_w">
                                                <div className="chartCardTop">
                                                    <div className="kyccustomformheading">
                                                        <h1 className="list_top_heading textAlignCenter text-center">
                                                            AFB Customer
                                                        </h1>
                                                        {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                                                    </div>
                                                </div>
                                                <div className=" chartCardMiddle" style={{ padding: "24px" }}>

                                                    <div  className="ag-theme-alpine agGridCustomize"
                                                          style={{ height: 400, width: 100 + "%" }}>
                                                        <div className="eltAlign" >
                                                            <Label  className="formColLabel1">AFB Account Number</Label>
                                                            <div  className="inputFlash"  >
                                                                <Input placeholder="AFB Account Numberr" > </Input>
                                                            </div>
                                                        </div>
                                                        <div className="eltAlign" >
                                                            <Label  className="formColLabel1" style={{marginLeft:"69px"}}>ID Card Number</Label>
                                                            <div  className="inputFlash"   >
                                                                <Input placeholder="ID Card Number"  > </Input>
                                                            </div>
                                                        </div>



                                                        <div className="divButton">
                                                            <Button className="btn-cancel-non-afb"style={{borderRadius:20, width:'135px',borderBlockColor:'white'}}  >
                                                                Cancel
                                                            </Button>
                                                            <div style={{marginLeft:300, marginRight:300}}>

                                                            </div>
                                                            <Button className="btn-submit-non-afb"
                                                                    onClick={() => this.setCurrentView(2)}
                                                                    style={{borderRadius:20, width:'135px',
                                                                        backgroundColor:'red',borderBlockColor:'white'}}  >
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
                        </div>
                            :

                            this.state.currentView === 2?
                    <div>
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
                                                        <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Cancel</button>
                                                    </div>
                                                </div>
                                                <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                                                    <h1 className="list_top_heading textAlignCenter text-center">
                                                        Profile Details
                                                    </h1>
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} sm={6}>
                                                            <label  className="non-afb-label">  </label>
                                                            <div   className="inputFlash" >

                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <label  className="non-afb-label">  </label>
                                                            <div   className="inputFlash" >

                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={12} sm={6}>
                                                            <label  className="non-afb-label"> Mobile Number </label>
                                                            <div   className="inputFlash" >
                                                                <Input type="text" placeholder="273454545" name="mobileNumber" value={this.state.mobileNumber}>
                                                                </Input>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <label  className="non-afb-label"> Zip Code </label>
                                                            <div   className="inputFlash" >
                                                                <Input type="text" placeholder="Zip code" name="zipCode" value={this.state.zipCode}>
                                                                </Input>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <label  className="non-afb-label"> Email Id </label>
                                                            <div   className="inputFlash" >
                                                                <Input type="text" placeholder="Email"name="email" value={this.state.email}
                                                                       style={{ width: 100 + "%", height: 52 }}>
                                                                </Input>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <label  className="non-afb-label">Account Number </label>
                                                            <div   className="inputFlash" >
                                                                <Input type="text" placeholder="Account Number"name="accountNumber" value={this.state.accountNumber}>
                                                                </Input>
                                                            </div>
                                                        </Grid>

                                                        <Grid item xs={12} sm={6}>
                                                            <label  className="non-afb-label">Signature Image</label>
                                                            <div  className="inputFlash" >
                                                                <Input type="file" name="signatureIamge" >
                                                                </Input>
                                                            </div>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>
                                                            <label> </label>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>

                                                            <button className="btn_1_view_proof_banking_opening"> View Proof</button>
                                                        </Grid>


                                                        <Grid item xs={12}>
                                                            <FormControlLabel
                                                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                                                label="I AGREE TO THE TERMs & CONDITIONS AND PRIVACY POLICY OF SARA BANKING"

                                                            >
                                                            </FormControlLabel>

                                                        </Grid>

                                                        <Grid item xs={12} sm={6}>

                                                            <button className="btn-cancel-non-afb"  onClick={() => this.setCurrentView(1)}> Back</button>
                                                        </Grid>
                                                        <Grid item xs={12} sm={6}>

                                                            <button className="btn-submit-non-afb "  onClick={() => this.openModal()}> Submit
                                                            </button>



                                                        </Grid>



                                                    </Grid>




                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                    </div>



                            :null
                }

                        </div >






        );
    }
}







export default  AfbCustomer;

