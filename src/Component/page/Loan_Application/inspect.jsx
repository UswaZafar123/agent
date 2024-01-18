import React, { Component } from 'react';
import '../../css/dashboard.css';
import '../../css/customer_registration.css';
import '../../css/banking_operattion.css';
import '../../css/merchant_management.css';
import '../../css/ag-grid-customization01.css';
import "../Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DatePicker from "react-datepicker";
import activeUser from '../../Assets/images/confirm.svg'
import {
    Card, CardBody, CardHeader, Col, Row, Table,  Form,
    FormGroup, FormText,

} from 'reactstrap';
import { Select, Menu, Dropdown, Modal } from 'antd';


import { connect } from "react-redux";
import success from '../../Assets/images/confirm.svg';

import AfbCustomer from "../CustomerRegistration/AfbCustomer";
import {Button, Input, Label, ModalBody, ModalFooter, ModalHeader,Pagination, PaginationItem, PaginationLink} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
 import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
const { Option } = Select;


class SuccessfulPage extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                selectedIndex: 1,
                date: new Date(),
                accountNumber:'',
                amount:'',
                fees:'',
                total:'',
                reason:'',



            };
    }


    // handleListItemClick = (event, index) => {
    //
    //     //setSelectedIndex(index);
    //
    // };
    handleListItemClick=()=> {
        this.setState({  selectedIndex: !this.state.selectedIndex });



    };




    componentDidMount () {
    }




    render() {
        // console.log("jai",this.state.paginationGetCurrentPage)
        return (
            <div className="main_contain"  style={{ width: "900px" }}>
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                               Cash Deposit in Bank
                                            </h1>
                                            {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                                        </div>
                                    </div>
                                    <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                                        <div className="transactioncardmiddle" style={{ height: "700px" }}>
                                            <div className="kyccustomformheading">
                                                <div className="success_pic">
                                                    <img src={success} alt="success" />
                                                </div >

                                            </div>
                                            {/*<h1*/}
                                            {/*    className="list_top_heading textAlignCenter text-center">*/}
                                            {/*    Cash Deposit Successful*/}
                                            {/*</h1>*/}

                                            <h1  className="success_header">
                                           Cash Deposit Successful
                                            </h1>
                                            <Card  className="success_card">
                                                <ListItem button  style={{ height: "70px" }}>
                                                    <ListItemText className="success_text" primary="Date:"
                                                                 // secondary={ this.state.date}
                                                    />

                                                </ListItem>

                                                <Divider />
                                                <ListItem  divider  style={{ height: "70px" }}>
                                                    <ListItemText primary="Account Number"

                                                                 secondary={ this.state.accountNumber}
                                                    />
                                                </ListItem>
                                                <ListItem style={{ height: "70px" }}>
                                                    <ListItemText primary="Amount"
                                                                 // secondary={ this.state.amount
                                                    />
                                                </ListItem>
                                                <Divider light />
                                                <ListItem  style={{ height: "70px" }}>
                                                    <ListItemText primary="Fees"
                                                                 // secondary={ this.state.fees}
                                                    />
                                                </ListItem>
                                                <Divider light />
                                                <ListItem  style={{ height: "70px" }}>
                                                    <ListItemText primary="Total"
                                                                  //secondary={ this.state.total}
                                                    />
                                                </ListItem>
                                                <Divider light />
                                                <ListItem  style={{ height: "70px" }}>
                                                    <ListItemText primary="Reason"
                                                                 // secondary={ this.state.reason}
                                                    />
                                                </ListItem>
                                                <Divider light />
                                                <ListItem  style={{ height: "70px" }}>

                                                </ListItem>

                                                
                                                <ListItem  style={{ height: "70px" }}>
                                                    <button className="btn_print">Print</button>
                                                    <button className="btn_done">Done</button>

                                                </ListItem>

                                            </Card>


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





export default  SuccessfulPage;