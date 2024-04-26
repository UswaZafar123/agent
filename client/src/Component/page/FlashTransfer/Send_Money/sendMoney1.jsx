import React, { Component } from "react";

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import OtpInput from "react-otp-input";

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
// import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';
import Select from "react-select";
import { MdFingerprint } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const label = "";
const value = "";

//const history = useHistory();

function handleChange(value) {
  console.log(`selected ${value}`);
}

class SendMoney1 extends Component {
  state = {
    otp: "",
    amount: "",
    phone: "",
  };

  //handleChange = (otp) => this.setState({ otp })

  componentDidMount() {
    // var date = new Date();
    // var firstDayFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    // var todayDateFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    // this.props.getMerchantTransactionList(sessionStorage.getItem("token"), firstDayFormat,todayDateFormat,"XAF");
    // this.props.getCurrencies(sessionStorage.getItem("token"));
  }

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

  state = {
    modal1: false,
    code: null,
    modal2: false,
  };

  toggle1 = () => {
    this.setState({ modal1: !this.state.modal1 });
  };

  toggle2 = () => {
    this.setState({ modal2: !this.state.modal2 });
    this.setState({ modal1: false });
  };

  call = () => {
    this.props.history.push("/Admin/CashDeposit");
  };

  handleChange(evt) {
    const financialGoal = evt.target.validity.valid
      ? evt.target.value
      : this.state.financialGoal;
    this.setState({ financialGoal });
  }

  render() {
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
                      style={{ height: 500, width: 100 + "%" }}
                    >
                      <div className="eltAlign">
                        <Label className="formColLabel1">Mobile Number</Label>
                        <div className="inputFlash">
                          {/* <Input placeholder="Enter Mobile Number" > </Input> */}
                          <Input
                            value={this.state.phone}
                            onChange={(event) =>
                              this.setState({
                                phone: event.target.value.replace(/\D/, ""),
                              })
                            }
                            placeholder="Enter Mobile Number"
                          />
                        </div>
                      </div>

                      <div className="eltAlign">
                        <Label
                          className="formColLabel1"
                          style={{ marginLeft: "69px" }}
                        >
                          Amount
                        </Label>
                        <div className="inputFlash">
                          {/*  <Input type="text" pattern="[0-9]*" onInput={this.handleChange.bind(this)} value={this.state.financialGoal} placeholder="Enter Amount"  > </Input> */}
                          <Input
                            value={this.state.amount}
                            onChange={(event) =>
                              this.setState({
                                amount: event.target.value.replace(/\D/, ""),
                              })
                            }
                            placeholder="Enter Amount"
                          />
                        </div>
                      </div>

                      <div className="eltAlign">
                        <Label
                          className="formColLabel1"
                          style={{ marginLeft: "69px" }}
                        >
                          Reason
                        </Label>
                        <div className="inputFlash">
                          <Input
                            className="input_height"
                            placeholder="Add Raison"
                            style={{ border: "2px solid black" }}
                          >
                            {" "}
                          </Input>
                        </div>
                      </div>

                      <div className="eltAlign">
                        <Label
                          className="formColLabel1"
                          style={{ marginLeft: "69px" }}
                        >
                          Contry
                        </Label>
                        <div>
                          <Select
                            className="selectWeidth"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="eltAlign">
                        <Label
                          className="formColLabel1"
                          style={{ marginLeft: "50px" }}
                        >
                          currency
                        </Label>
                        <div>
                          <Select
                            className="selectWeidth"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="divButton">
                        <Button
                          className="btn-cancel-non-afb"
                          style={{
                            borderRadius: 20,
                            width: "135px",
                            borderBlockColor: "white",
                          }}
                        >
                          Cancel
                        </Button>
                        <div
                          style={{ marginLeft: 300, marginRight: 300 }}
                        ></div>
                        <Button
                          className="btn-submit-non-afb"
                          onClick={this.toggle1}
                          style={{
                            borderRadius: 20,
                            width: "135px",
                            backgroundColor: "red",
                            borderBlockColor: "white",
                          }}
                        >
                          Submit
                        </Button>
                      </div>

                      <Modal
                        isOpen={this.state.modal1}
                        className="modalM"
                        style={{ width: 600 }}
                      >
                        <ModalHeader
                          className="modalHeader"
                          style={{
                            backgroundColor: "#E25D56",
                            justifyContent: "center",
                            alignItems: "center",
                            width: 600,
                          }}
                        >
                          <Label className="titleModal">Confirmation</Label>
                          <AiOutlineClose className="icoClose" />
                        </ModalHeader>
                        <ModalBody className="modalBody" style={{ width: 600 }}>
                          <FormGroup row style={{ marginTop: 40 }}>
                            <Label
                              sm={2}
                              className="formColLabel1"
                              style={{ marginLeft: 20, fontSize: 25 }}
                            >
                              Password
                            </Label>
                            <Col sm={8}>
                              <Input type="password" placeholder="Password" />
                            </Col>
                          </FormGroup>

                          <Label
                            sm={2}
                            className="formColLabel1"
                            style={{ marginLeft: 270, fontSize: 25 }}
                          >
                            OR
                          </Label>
                          <Label
                            className="formColLabel1"
                            style={{ marginLeft: 180, fontSize: 20 }}
                          >
                            Use Fingertprint to Continue
                          </Label>
                          <FormGroup row>
                            <MdFingerprint className="icoSize" />
                          </FormGroup>
                        </ModalBody>
                        <ModalFooter
                          className="modalFooter"
                          style={{ width: 600 }}
                        >
                          <Button
                            className="btnOk"
                            style={{
                              backgroundColor: "#cc5f59",
                              borderRadius: 20,
                              borderBlockColor: "white",
                            }}
                            /* onClick={this.toggle2 } */
                            onClick={this.call}
                          >
                            OK
                          </Button>
                        </ModalFooter>
                      </Modal>
                    </div>

                    <div className="customAgFooter">
                      <div className="NextPrevW"></div>
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

export default SendMoney1;

{
  /* <Select className="selectWeidth" 
                                                //    defaultValue="Cameroun" 
                                                //    labelId="demo-simple-select-outlined-label10"
                                                //    id="demo-simple-select-outlined10"
                                                //    name="editDeliveryContainer"
                                                 Label="Cmaeroun"
                                                   onChange={handleChange} 
                                                   height='30px' >
                                                   <Option value="US">United-State</Option>
                                                   <Option value="CM">Cameroun</Option>
                                                   <Option value="FR">France</Option>
                                                   <Option value="NG">Nigeria</Option>
                                                   <Option value="GN">Guinée</Option>
                                                   <Option value="CI">Cote d'Ivoire</Option>
                                                   
                                                 </Select> */
}
