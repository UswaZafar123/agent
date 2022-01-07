import React, { Component } from "react";
import { useState } from "react";
import "../../css/dashboard.css";
import "../../css/merchant_management.css";
import "../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "../Agent/antDcustom.css";
import "../../css/customer_registration.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Select, DatePicker } from "antd";

import { connect } from "react-redux";

const { Option } = Select;

class BankingAccountOpening extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankCustomerId: "",
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      email: "",
      mobileNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      longitude: "",
      latitude: "",
      identification: "",
      uin: "",
      expiryDate: new Date(),
      modal: false,
      number: "",
    };
  }
  componentDidMount() {}
  componentWillReceiveProps(nextprops) {}

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
                      {/* <button
                        className="addposbtn c_first_pending_BTN"
                        onClick={this.addChange}
                      >
                        Cancel
                      </button>{" "}
                      * */}
                    </div>
                  </div>
                  <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">
                          {" "}
                          Bank Customer Id{" "}
                        </label>
                        <div className="inputFlash">
                          <Input
                            placeholder="Enter Bank Customer Id"
                            name="bankCustomerId"
                            value={this.state.bankCustomerId}
                            type="number"
                            onChange={(e) => {
                              this.setState({ bankCustomerId: e.target.value });
                            }}
                          ></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label"> First Name </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={(e) => {
                              this.setState({ firstName: e.target.value });
                            }}
                          ></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label"> Last Name </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={(e) => {
                              this.setState({ lastName: e.target.value });
                            }}
                          ></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Email Id </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="email"
                            name="email"
                            value={this.state.email}
                            onChange={(e) => {
                              this.setState({ email: e.target.value });
                            }}
                          ></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Mobile Number </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="Mobile no"
                            name="mobileNumber"
                            value={this.state.mobileNumber}
                            onChange={(e) => {
                              this.setState({ mobileNumber: e.target.value });
                            }}
                          ></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label"> Date of Birth </label>
                        <div className="inputFlash">
                          <DatePicker
                            format="YYYY-MM-DD"
                            value={moment(this.state.dateOfBirth)}
                            style={{ width: "100%", background: "#f3f3f3" }}
                            onChange={(date, dateString) => {
                              this.setState({ dateOfBirth: dateString });
                            }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">
                          Customer Picture
                        </label>
                        <div className="inputFlash">
                          <Input type="file" name="addressProof"></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Document Type</label>
                        <div className="inputFlash">
                          <div className="categorySelect">
                            <Select
                              style={{ width: 100 + "%", height: 52 }}
                              defaultValue="ID_CARD"
                            >
                              <Option value="ID_CARD">ID CARD</Option>
                              <Option value="PASSPORT">Passport</Option>
                            </Select>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Document Number</label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="Number"
                            name="number"
                            value={this.state.uin}
                          ></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">
                          Document Expiry Date
                        </label>
                        <div className="inputFlash">
                          <DatePicker
                            disabledDate={(current) => {
                              let customDate = moment().format("YYYY-MM-DD");
                              return (
                                current &&
                                current < moment(customDate, "YYYY-MM-DD")
                              );
                            }}
                            style={{ width: "100%", background: "#f3f3f3" }}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Address </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="Address 1"
                            name="address1"
                            value={this.state.address1}
                            onChange={(e) => {
                              this.setState({ address1: e.target.value });
                            }}
                          ></Input>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">City </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="city"
                            name="city"
                            value={this.state.city}
                            onChange={(e) => {
                              this.setState({ city: e.target.value });
                            }}
                          ></Input>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">State </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="state"
                            name="state"
                            value={this.state.state}
                            onChange={(e) => {
                              this.setState({ state: e.target.value });
                            }}
                          ></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Country </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="country"
                            name="country"
                            value={this.state.country}
                            onChange={(e) => {
                              this.setState({ country: e.target.value });
                            }}
                          ></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Zip Code </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="zip code"
                            name="zipCode"
                            value={this.state.zipCode}
                            onChange={(e) => {
                              this.setState({ zipCode: e.target.value });
                            }}
                          ></Input>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Identification </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="Enterprise"
                            name="identification"
                            value={this.state.identification}
                          ></Input>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">UIN</label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            name="uin"
                            value={this.state.uin}
                          ></Input>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label> </label>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label> </label>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label> </label>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label> </label>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Address Proof</label>
                        <div className="inputFlash">
                          <Input type="file" name="addressProof"></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">
                          Identification Document
                        </label>
                        <div className="inputFlash">
                          <Input
                            type="file"
                            name="identificationDocument"
                          ></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label> </label>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <button className="btn_1_view_proof_banking_opening">
                          {" "}
                          View Proof
                        </button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <button className="btn_1_view_proof_banking_opening">
                          {" "}
                          View Proof
                        </button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label> </label>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label> </label>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label> </label>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="secondary"
                              name="saveAddress"
                              value="yes"
                            />
                          }
                          label="I AGREE TO I AGREE TO THE TERMs & CONDITIONS AND PRIVACY POLICY OF SARA BANKING  "
                        ></FormControlLabel>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <button className="btn-cancel-non-afb"> Cancel</button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <button
                          className="btn-submit-non-afb "
                          onClick={() => this.showModal()}
                        >
                          {" "}
                          Submit
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

const mapStateToProps = ({ merchantReducer }) => {};

const mapDispatchToProps = (dispatch) => {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankingAccountOpening);
