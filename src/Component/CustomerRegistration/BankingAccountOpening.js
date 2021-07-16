import React, { Component } from 'react';
import {useState } from 'react';
import '../../css/dashboard.css';
import '../../css/merchant_management.css';
import '../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import "../Agent/antDcustom.css";
import '../../css/customer_registration.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import {
    Card, CardBody, CardHeader, Col, Row, Table,  Form,
    FormGroup, FormText, Input, Label,

} from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter,  } from 'reactstrap';
import { Select } from 'antd';

import { connect } from "react-redux";

import { getCurrencies, getMerchantTransactionList } from "../../services/actions";
const { Option } = Select;



class BankingAccountOpening extends Component {


    constructor(props) {
        super(props);


        this.state = {
            firstName:'',
            lastName: '',
            dateOfBirth:new Date(),
            email:'',
            mobileNumber:'',
            address1:'',
            address2:'',
            city:'',
            state:'',
            country:'',
            zipCode:'',
            longitude:'',
            latitude:'',
            identification:'',
            uin:'',
            expiryDate:new Date(),
            modal: false,
            number:'',




        };
    }



    save = () => {
        this.setState({
            popup: true
        })
    }

    openModal() {
        this.setState({
            modal: !this.state.modal,
        });
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

    componentDidMount () {
        var date = new Date();

        var firstDayFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        var todayDateFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];


        this.props.getMerchantTransactionList(sessionStorage.getItem("token"), firstDayFormat,todayDateFormat,"XAF");
        this.props.getCurrencies(sessionStorage.getItem("token"));
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


    componentWillReceiveProps (nextprops) {
        this.setState({rowData:nextprops.transactionResponseList})
        //    this.setState({currencies:nextprops.getCurencyListData.currency})
    }

    onPaginationChanged = () => {
        console.log('onPaginationPageLoaded');
        if (this.state.gridApi) {
            document.getElementById('lbCurrentPage').innerHTML = this.state.gridApi.paginationGetCurrentPage() + 1
            document.getElementById('bTo').innerHTML = this.state.gridApi.paginationGetPageSize() * this.state.gridApi.paginationGetCurrentPage() + 1

            const changedV = (this.state.gridApi.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
            // if (changedV <= this.state.rowData.length) {
            //     document.getElementById('afterTo').innerHTML = (this.state.gridApi.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
            // }
            // else {
            //     document.getElementById('afterTo').innerHTML = this.state.rowData.length
            // }


        }
    };

    onBtNext = () => {
        this.state.gridApi.paginationGoToNextPage();
        // console.log()
    };

    onBtPrevious = () => {
        this.state.gridApi.paginationGoToPreviousPage();
    };


    setStartDate = (date) => {
        this.setState({startdate:date})
    }


    setEndDate = (date) => {
        this.setState({endDate:date});
    }

    filterData = () => {
        var firstDayFormat = new Date(this.state.startdate.getTime() - (this.state.startdate.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
        var todayDateFormat = new Date(this.state.endDate.getTime() - (this.state.endDate.getTimezoneOffset() * 60000)).toISOString().split("T")[0];

        this.props.getMerchantTransactionList(sessionStorage.getItem("token"), firstDayFormat,todayDateFormat,"XAF");
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
                                              Banking Account Opening
                                            </h1>
                                             <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Cancel</button> *
                                        </div>
                                    </div>
                                    <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                                        <Grid container spacing={3}>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label"> First Name </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="First Name" name="firstName" value={this.state.firstName}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label"> Last Name </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="Last Name" name="lastName" value={this.state.lastName}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label"> Date of Birth </label>
                                                <div   className="inputFlash" >
                                                    <Input type="date" placeholder="Date of Birth"name="dateOfBirth" value={this.state.dateOfBirth}
                                                           style={{ width: 100 + "%", height: 52 }}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Email Id </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="email"name="email" value={this.state.email}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Mobile Number </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="Mobile no"name="mobileNumber" value={this.state.mobileNumber}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Address 1 </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="Address 1"name="address1" value={this.state.address1}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Address 2 </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="Address 2"name="address2" value={this.state.address2}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">City </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="city"name="city" value={this.state.city}>
                                                    </Input>
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">State </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="state"name="state" value={this.state.state}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Country </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="country"name="country" value={this.state.country}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Zip Code </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="zip code"name="zipCode" value={this.state.zipCode}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label>  </label>

                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Longitude </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="80"name="longitude" value={this.state.longitude}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Latitude </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="6"name="latitude" value={this.state.latitude}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Identification </label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="Enterprise"name="identification" value={this.state.identification}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Number</label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" placeholder="Number"name="number" value={this.state.uin}>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Expiry Date</label>
                                                <div   className="inputFlash" >
                                                    <Input type="date" placeholder="expiry Date"name="expiryDate" value={this.state.expiryDate}
                                                           style={{ width: 100 + "%", height: 52 }}>>
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">UIN</label>
                                                <div   className="inputFlash" >
                                                    <Input type="text" name="uin" value={this.state.uin} >
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Type of Customer</label>
                                                <div   className="inputFlash" >
                                                    <div className="categorySelect" >
                                                        <Select

                                                            style={{ width: 100 + "%", height: 52 }}

                                                        >
                                                                    <Option >Individual</Option>
                                                            <Option >Group
                                                            </Option>


                                                        </Select>

                                                    </div>
                                                </div>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Customer Picture</label>
                                                <div  className="inputFlash" >
                                                    <Input type="file" name="addressProof" >
                                                    </Input>
                                            </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label> </label>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>

                                                <button className="btn_1_view_proof_banking_opening"> View Proof</button>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label>
                                                    {' '}
                                                </label>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label>
                                                    {' '}
                                                </label>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label>  </label>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label>  </label>
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Address Proof</label>
                                                <div   className="inputFlash" >
                                                    <Input type="file" name="addressProof" >
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label  className="non-afb-label">Identification Document</label>
                                                <div   className="inputFlash" >
                                                    <Input type="file" name="identificationDocument" >
                                                    </Input>
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label>  </label>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>

                                                <button className="btn_1_view_proof_banking_opening"> View Proof</button>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>

                                                <button className="btn_1_view_proof_banking_opening"> View Proof</button>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label>  </label>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label>  </label>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <label>  </label>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <FormControlLabel
                                                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                                    label="I AGREE TO I AGREE TO THE TERMs & CONDITIONS AND PRIVACY POLICY OF SARA BANKING  "

                                                >

                                                </FormControlLabel>

                                            </Grid>

                                            <Grid item xs={12} sm={6}>

                                                <button className="btn-cancel-non-afb"> Cancel</button>
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
        );
    }
}

const mapStateToProps = ({ merchantReducer }) => {
    const { getTransactionListStatus,getTransactionListData,getCurencyListData,getCurencyListDataStatus } = merchantReducer;
    return {
        getTransactionListData: getTransactionListData,
        getTransactionListStatus: getTransactionListStatus,
        getCurencyListData ,
        getCurencyListDataStatus,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getMerchantTransactionList: (token, firstDayFormat,todayDateFormat,currency) => dispatch(getMerchantTransactionList(token, firstDayFormat,todayDateFormat,currency)),
        getCurrencies: (token) => dispatch(getCurrencies(token)),
    }
}



export default connect(mapStateToProps,mapDispatchToProps) (BankingAccountOpening);