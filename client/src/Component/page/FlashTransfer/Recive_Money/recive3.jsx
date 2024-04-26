import React, { Component } from "react";

//import "./src/Component/Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import OtpInput from "react-otp-input";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Card,
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
  ModalHeader,
} from "reactstrap";

import { BiLink } from "react-icons/bi";

// import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';
import Select from "react-select";
import { MdFingerprint } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Alert } from "bootstrap";
import { useHistory } from "react-router-dom";

const label = "";
const value = "";

function handleChange(value) {
  console.log(`selected ${value}`);
}

class ReciveMoney3 extends Component {
  componentDidMount() {
    // var date = new Date();
    // var firstDayFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    // var todayDateFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    // this.props.getMerchantTransactionList(sessionStorage.getItem("token"), firstDayFormat,todayDateFormat,"XAF");
    // this.props.getCurrencies(sessionStorage.getItem("token"));
  }
  handleChange = (value) => {
    this.state.gridApi.paginationSetPageSize(Number(value));
    // document.getElementById('totalPageSize').innerHTML=this.state.gridApi.paginationGetPageSize()
    document.getElementById("bTo").innerHTML =
      this.state.gridApi.paginationGetPageSize();
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  onCloseHandler = () => {
    this.setState({
      isModalVisible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
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
                      style={{ height: 600, width: 100 + "%" }}
                    >
                      <div className="divStory2">
                        <div className="marginList1">
                          <Label
                            className="marginList"
                            style={{ marginTop: 20 }}
                          >
                            Amount :
                          </Label>
                        </div>
                        <Divider style={{ marginTop: 30 }} />

                        <div className="marginList1">
                          <Label
                            className="marginList"
                            style={{ marginTop: 20 }}
                          >
                            Name :
                          </Label>
                        </div>
                        <Divider style={{ marginTop: 30 }} />

                        <div className="marginList1">
                          <Label
                            className="marginList"
                            style={{ marginTop: 20 }}
                          >
                            E-MAIL:
                          </Label>
                        </div>
                        <Divider style={{ marginTop: 30 }} />
                      </div>

                      <Label
                        className=""
                        style={{ marginTop: 50, fontSize: 25, marginLeft: 100 }}
                      >
                        Your Link has been generated
                      </Label>
                      <div
                        style={{ width: 600, marginLeft: 100, marginTop: 20 }}
                      >
                        <BiLink
                          style={{ width: 30, height: 40, color: "blue" }}
                        />
                        <Input style={{ height: 60 }}> </Input>
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

export default ReciveMoney3;

{
  /* <div className="main_contain">
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
                                            {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */
}
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
