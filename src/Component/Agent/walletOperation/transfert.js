import React, { Component } from 'react';

import '../../../css/dashboard.css';
import '../../../css/customer_registration.css'
import '../../../css/merchant_management.css';
import '../../../css/ag-grid-customization01.css';
import "../../Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DatePicker from "react-datepicker";
//import activeUser from '../../Assets/images/confirm.svg';
import WalletToWallet from'../walletOperation/WalletToWallet';
import WalletToAccount from '../walletOperation/WalletToAccount1';
import { Select, Menu, Dropdown, Modal } from 'antd';

import { connect } from "react-redux";
//import { getCurrencies, getMerchantTransactionList } from "../../services/actions";
import {Button, Col, FormGroup, Input, Label, ModalBody, ModalFooter, ModalHeader,Pagination, PaginationItem, PaginationLink} from "reactstrap";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
const { Option } = Select;


class transfer extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                currentView: 1,

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


    componentDidMount() {

    }

    call = () => {

      this.props.history.push("/agent/walletOperation/WalletToWallet");  
  }

  call1 = () => {

    this.props.history.push("/agent/walletOperation/WalletToAccount1");  
}

    render() {
        return (

<div>
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
                                                                Wallet Account Opening
                                                            </h1>
                                                            {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                                                        </div>
                                                    </div>
                                                    <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                                                        <div className="transactioncardmiddle" style={{ height: "270px" }}>
                                                            <div className="kyccustomformheading">
                                                                <h1 className="list_top_heading textAlignCenter text-center">
                                                                    Choose customer
                                                                </h1>
                                                            </div>


                            <button className="btn_afb_customer" onClick={this.call}> Wallet to Wallet </button>

                            <button className="btn_non_afb_customer"  onClick={this.call1}>Wallet to Acount</button>

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





export default  (transfer);
