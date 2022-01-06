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
import CountrySelector from "../common/CountrySelector";
import { Select, DatePicker, Upload } from "antd";

import { connect } from "react-redux";

import { bankAccountOpeningAction } from "../../../src/services/agent/action";
import actionType from "../../services/agent/actionType.js";

var africanCountries = require("../../Assets/data/african_countries.json");
const { Option } = Select;

class BankingAccountOpening extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: new Date(),
      countryCode: africanCountries[0].dial_code,
      mobileNumber: "",
      selfiePhoto: [],
      selfiePhotoImage: null,

      idDocumentType: "",
      idDocumentNumber: "",
      idDocumentExpiryDate: new Date(),

      address: "",
      city: "",
      uin: "",

      selfiePreviewVisible: false,
      previewSelfieImage: "",

      IdDocumentsFiles: [],
      IdDocumentsFilesImages: [],

      documentPreviewVisible: false,
      previewDocumentImage: "",
    };
  }
  componentDidMount() {
    this.props.resetSendState();
  }
  componentWillReceiveProps(nextprops) {
    if (nextprops.bankAccountOpening.success) {
      window.location.reload(false);
    }
  }

  handleSelfiePreviewCancel = () =>
    this.setState({ selfiePreviewVisible: false });

  handleSelfiePreview = (file) => {
    this.setState({
      previewSelfieImage: file.thumbUrl,
      selfiePreviewVisible: true,
    });
  };

  handleSelfieUpload = ({ fileList }) => {
    if (fileList[0]) {
      console.log("if (fileList[0]) {");
    }
    this.setState({
      selfiePhoto: fileList[0] ? fileList[0].originFileObj : null,
      selfiePhotoImage: fileList,
    });
  };

  handleDocumentPreviewCancel = () =>
    this.setState({ documentPreviewVisible: false });

  handleDocumentPreview = (file) => {
    this.setState({
      previewDocumentImage: file.thumbUrl,
      documentPreviewVisible: true,
    });
  };

  handleDocumentUpload = ({ fileList }) => {
    if (fileList) {
      var filesObj = [];
      for (var i = 0; i < fileList.length; i++) {
        filesObj.push(fileList[i].originFileObj);
      }
      this.setState({
        IdDocumentsFiles: fileList[0] ? fileList[0].originFileObj : null,
        IdDocumentsFilesImages: fileList,
      });
    }
  };

  handleFormSubmit = () => {
    const {
      firstName,
      lastName,
      email,
      countryCode,
      phoneNumber,
      dateOfBirth,
      selfiePhoto,
      idDocumentType,
      idDocumentNumber,
      idDocumentExpiryDate,
      IdDocumentsFiles,
      city,
      address,
    } = this.state;
    const selectedCountry = africanCountries.find(
      (country) => country.dial_code === countryCode
    );
    let formData = new FormData();

    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("emailAddress", email);
    formData.append("phoneNumberCountryCode", countryCode);
    formData.append("phoneNumber", phoneNumber);
    formData.append("dateOfBirth", dateOfBirth);
    formData.append("selfiePhoto", selfiePhoto);
    // formData.append("idDocumentType", idDocumentType);
    formData.append("idDocumentType", "ID_DOCUMENT");
    formData.append("idDocumentNumber", idDocumentNumber);
    formData.append("idDocumentExpiryDate", idDocumentExpiryDate);
    formData.append("identityDocuments", IdDocumentsFiles);
    formData.append("address", address);
    formData.append("cityOfResidence", city);
    formData.append("uin", "12345");
    formData.append("tcAccepted", true);
    formData.append("countryCode", selectedCountry.code);
    formData.append("currencyCode", "xaf");
    formData.append("locale", "en");
    formData.append("agentBankerPhoneNumber", this.props.profile.data.phoneNo);
    this.props.sendBankAccountOpening(formData);
  };

  render() {
    const {
      selfiePreviewVisible,
      previewSelfieImage,
      documentPreviewVisible,
      previewDocumentImage,
    } = this.state;
    const uploadButton = (
      <div>
        {/* <Icon type="plus" /> */}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
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
                        <label className="non-afb-label">Country Code</label>
                        <div className="inputFlash">
                          <div className="categorySelect">
                            <Select
                              style={{ width: 100 + "%", height: 52 }}
                              // defaultValue={africanCountries[0].dial_code}
                              value={this.state.countryCode}
                              onChange={(value) => {
                                this.setState({ countryCode: value });
                              }}
                            >
                              {africanCountries.map((country) => {
                                return (
                                  <Option value={country.dial_code}>
                                    <div>
                                      <span
                                        role="img"
                                        aria-label="country-flag"
                                      >
                                        <img
                                          style={{
                                            height: "20px",
                                            width: "20px",
                                            marginRight: "8px",
                                          }}
                                          src={`data:image/png;base64,${country.flag}`}
                                        />
                                      </span>
                                      {`(${country.name}) ${country.dial_code}`}
                                    </div>
                                  </Option>
                                );
                              })}
                            </Select>
                          </div>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Mobile Number </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="Mobile no"
                            name="mobileNumber"
                            value={this.state.phoneNumber}
                            onChange={(e) => {
                              this.setState({ phoneNumber: e.target.value });
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
                      <Grid
                        item
                        xs={12}
                        sm={6}
                        style={{ marginBottom: "50px" }}
                      >
                        <label className="non-afb-label">Picture(Selfie)</label>
                        <div className="inputFlash">
                          <Upload
                            listType="picture-card"
                            multiple={false}
                            fileList={this.state.selfiePhotoImage}
                            onPreview={this.handleSelfiePreview}
                            onChange={this.handleSelfieUpload}
                            beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                          >
                            {uploadButton}
                          </Upload>

                          <Modal
                            visible={selfiePreviewVisible}
                            footer={null}
                            onCancel={this.handleSelfiePreviewCancel}
                          >
                            <img
                              alt="example"
                              style={{ width: "100%" }}
                              src={previewSelfieImage}
                            />
                          </Modal>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Document Type</label>
                        <div className="inputFlash">
                          <div className="categorySelect">
                            <Select
                              style={{ width: 100 + "%", height: 52 }}
                              defaultValue="ID_CARD"
                              value={this.state.idDocumentType}
                              onChange={(value) => {
                                this.setState({ idDocumentType: value });
                              }}
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
                            value={this.state.idDocumentNumber}
                            onChange={(e) => {
                              this.setState({
                                idDocumentNumber: e.target.value,
                              });
                            }}
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
                            value={moment(this.state.idDocumentExpiryDate)}
                            style={{ width: "100%", background: "#f3f3f3" }}
                            onChange={(date, dateString) => {
                              this.setState({
                                idDocumentExpiryDate: dateString,
                              });
                            }}
                          />
                        </div>
                      </Grid>

                      <Grid
                        item
                        xs={12}
                        sm={6}
                        style={{ marginBottom: "50px" }}
                      >
                        <label className="non-afb-label">
                          Upload document files
                        </label>
                        <div className="inputFlash">
                          <Upload
                            listType="picture-card"
                            multiple={true}
                            fileList={this.state.IdDocumentsFilesImages}
                            onPreview={this.handleDocumentPreview}
                            onChange={this.handleDocumentUpload}
                            beforeUpload={() => false}
                          >
                            {uploadButton}
                          </Upload>

                          <Modal
                            visible={documentPreviewVisible}
                            footer={null}
                            onCancel={this.handleDocumentPreviewCancel}
                          >
                            <img
                              alt="example"
                              style={{ width: "100%" }}
                              src={previewDocumentImage}
                            />
                          </Modal>
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
                        <label className="non-afb-label">Address </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={this.state.address}
                            onChange={(e) => {
                              this.setState({ address: e.target.value });
                            }}
                          ></Input>
                        </div>
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
                          onClick={() => this.handleFormSubmit()}
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

const mapStateToProps = ({ agentReducer }) => {
  const { profile, bankAccountOpening, customerStatementInquiry } =
    agentReducer;

  return {
    profile,
    bankAccountOpening,
    customerStatementInquiry,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendBankAccountOpening: (payload) =>
      dispatch(bankAccountOpeningAction(payload)),
    resetSendState: () =>
      dispatch({ type: actionType.BANK_ACCOUNT_OPENING_RESET }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BankingAccountOpening);
