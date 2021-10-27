import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FormattedMessage, useIntl, injectIntl } from "react-intl";
import Image1 from "../../../Assets/images/manager 1.png";
import Image2 from "../../../Assets/images/Group.png";
import Image3 from "../../../Assets/images/Group (1).png";
import ImageBackground from "../../../Assets/images/BG-2.png";
import Logo from "../../../Assets/images/logo.png";
import Dropzone from 'react-dropzone'
import PhoneInput from 'react-phone-input-2'
import DatePicker from "react-datepicker";
import NavBar from "./NavBar";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-input-2/lib/style.css'
import validate from "./../../Agent/resources/validation";
import moment from "moment";
import { RegisterService } from "../../../services/actions";
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      accountType: "",
      setExpirationDate: new Date(),
      dob: new Date(),
      bankcustomerType: "",
      firstName: "",
      lastName: "",
      address1: "",
      bankcustomerType: "",
      mobileNumber: "",
      email: "",
      agentType: "AGENT",
      city: "",
      businessType: "INDIVIDUAL",
      countryCode: "",
      currency: "USD",
      documentType: "ID_DOCUMENT",
      documentName: "National ID",
      idDocumentIdNumber: "",
      registeredDate: new Date(),
      gender: "Male",
      phonecode: "",
      idNumber: "",
      idExpiry: null,
      idImages: null,
      photo: null,
      bankCustomerId: "",
      locale: "en",
      agentBusinessAddress: "",
      agentBusinessCity: "",

      previewFrontVisible: false,
      previewFrontImage: '',
      idFrontImageFile: [],
      previewFrontTitle: '',

      idBackImageFile: [],
      previewBackVisible: false,
      previewBackImage: '',
      previewBackTitle: '',

      previewFrontBusinessVisible: false,
      previewFrontBusinessImage: '',
      idFrontBusinessImageFile: [],
      previewFrontBusinessTitle: '',

      previewAddressVisible: false,
      previewAddressImage: '',
      idAddressFile: [],
      previewAddressTitle: '',
    };
  }


  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState(
      {
        [name]: value,
      },
      () => {
        if (name === "email") {
          let data = validate(name, value);
          this.setState(
            {
              [name + "Valid"]: data.errorValid,
              [name + "Error"]: data.errorMessage,
            },
            this.validateForm()
          );
        }
      }
    );
  };

  getBase64Front(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  getBase64Back(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  getBase64BusinessFront(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  getBase64Address(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  handleCancelFrontImage = () => this.setState({ previewFrontVisible: false });

  handleCancelBusinessFrontImage = () => this.setState({ previewFrontBusinessVisible: false });

  handleCancelAddressImage = () => this.setState({ previewAddressVisible: false });

  handleCancelBackImage = () => this.setState({ previewBackVisible: false });

  handlePreviewFrontImage = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64Front(file.originFileObj);
    }

    this.setState({
      previewFrontImage: file.url || file.preview,
      previewFrontVisible: true,
      previewFrontTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handlePreviewAddressImage = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64Address(file.originFileObj);
    }

    this.setState({
      previewAddressImage: file.url || file.preview,
      previewAddressVisible: true,
      previewAddressTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handlePreviewFrontBusinessImage = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64BusinessFront(file.originFileObj);
    }

    this.setState({
      previewFrontBusinessImage: file.url || file.preview,
      previewFrontBusinessVisible: true,
      previewFrontBusinessTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handlePreviewBackImage = async file => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64Back(file.originFileObj);
    }

    this.setState({
      previewBackImage: file.url || file.preview,
      previewBackVisible: true,
      previewBackTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleFrontPictureChange = (idFrontImageFile) => this.setState({ idFrontImageFile: idFrontImageFile.file });

  handleFrontBusinessPictureChange = (idFrontBusinessImageFile) => this.setState({ idFrontBusinessImageFile: idFrontBusinessImageFile.file });

  handleAddressChange = (idAddressFile) => {

    this.setState({
      idAddressFile: idAddressFile.file
    });

  };

  handleBackPictureChange = (idBackImageFile) => this.setState({ idBackImageFile: idBackImageFile.file });

  validateForm = () => {
    const { emailValid, loginPasswordValid } = this.state;
    this.setState({
      formValid: emailValid && loginPasswordValid,
    });
  };

  handleChangeMobile = (value, data, event, formattedValue) => {
    // this.setState({ countyCode: value })
    this.setState({ mobileNumber: event.target.value })
    // console.log((this.state.mobileNumber).split(" "),"Mobile Num")
  }

  selectAccountType = (e) => {
    this.setState({ accountType: e.target.value });
  }

  selectIDDocument = (e) => {

    if (e.target.value == "ID Card") {
      this.setState({
        documentType: "ID_DOCUMENT",
        documentName: "National ID"
      });
    }
    else {
      this.setState({
        documentType: "PASSPORT_DOCUMENT",
        documentName: "National Passport"
      });
    }

    // this.setState({ documentType: e.target.value })
  }

  uploadDocuments(file) {
    this.setState({ frontImage: file[0] })
    // this.setState({uploadyourimage:this.state.files});
  }

  setExpirationDate(date) {
    this.setState({ setExpirationDate: date })
  }

  dateofbirth(date) {
    this.setState({ dob: date })
  }

  registeredDate(date) {
    this.setState({ registeredDate: date });
  }

  uploadBackSideOfID(file) {
    this.setState({ frontBackSide: file[0] })
  }

  submitForm() {
    var formData = new FormData();

    formData.append("RegistrationType", "NON_EXISTING_BANK_CUSTOMER");
    formData.append("firstName", this.state.firstName);
    formData.append("lastName", this.state.lastName);
    formData.append("registrationChannel", "AGENCY_BANKING_APP");
    formData.append("registrationSubChannel", "AGENCY_BANKING_APP");
    formData.append("agentBusinessName", "HYPERSTAR_AGENCY");
    formData.append("busincessType", this.state.businessType);

    var phoneNumberSplit = this.state.mobileNumber.split(" ");

    formData.append("countryCode", phoneNumberSplit[0].replace("+", ""));
    formData.append("phoneNumberCountryCode", "00" + phoneNumberSplit[0].replace("+", ""));

    phoneNumberSplit.shift();

    formData.append("phoneNo", phoneNumberSplit.join(''));
    formData.append("locale", this.state.locale);
    formData.append("mobileOperator", "UNINOR");

    formData.append("idDocumentName", this.state.documentName);
    formData.append("idDocumentType", this.state.documentType);

    formData.append("idDocumentIdNumber", this.state.idDocumentIdNumber);
    formData.append(
      "idExpiryDate",
      moment(new Date(this.state.setExpirationDate)).format("YYYY-MM-DD")
    );

    formData.append("agentEmailAddress", this.state.email);
    formData.append("currency", this.state.currency);
    formData.append("gender", this.state.gender);

    // formData.append("tcName", "TERMS_CONDITIONS");

    // formData.append("tcStatus", "ACTIVE");

    // formData.append("tcContentTitle", "CONTENT_TITLE");

    // formData.append("tcContentPlainText", "PLAIN_TEXT_CONTENT");

    // formData.append("tcContentWebUrl", "www.sampleURL.com");
    // formData.append("tcType", "MANDATORY");

    // formData.append("tcOrder", 1);
    // formData.append("tcEffectiveDateTime", "2022-05-08T12:00:00");
    // formData.append("tcExpiryDateTime", moment(new Date(this.state.setExpirationDate)).format("YYYY-MM-DD"));
    formData.append("registrationAppDateTime", new Date().toISOString());
    formData.append("agentRegisteredBy", "AGENT321");
    formData.append(
      "agentDOB",
      moment(new Date(this.state.dob)).format("YYYY-MM-DD")
    );

    formData.append("agentBusinessAddress", this.state.agentBusinessAddress);

    formData.append("agentBusinessCity", this.state.agentBusinessCity);
    formData.append("appliedForRegistrationAt", "City center");
    formData.append("idDocumentImages", this.state.idAddressFile);
    formData.append("agentPhoto", this.state.idBackImageFile);

    formData.append("agentType", this.state.agentType);

    // formData.append("bankCustomerId", this.state.bankCustomerId);


    // Display the key/value pairs
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    // this.props.RegisterService(formData);

  }

  dummyRequest = ({ fileList, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  }

  render() {
    const {
      email,
      loginPassword,
      emailError,
      loginPasswordError,
      formValid,
      logo,
      code,
      twoFactorblock,
    } = this.state;
    let hrefValue = "#";

    const { previewFrontVisible, previewFrontImage, idFrontImageFile, previewFrontTitle } = this.state;
    const { previewBackVisible, previewBackImage, idBackImageFile, previewBackTitle } = this.state;
    const { previewFrontBusinessVisible, previewFrontBusinessImage, idFrontBusinessImageFile, previewFrontBusinessTitle } = this.state;
    const { previewAddressVisible, previewAddressImage, idAddressFile, previewAddressTitle } = this.state;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <Fragment>
        <section className="loginWrapper accountWrapper">
          <NavBar />


          <div className="col-md-12 loginContainer">

            <div className="loginInner" >
              <div className="row" style={{ display: "none" }}>
                <h1 className="title">
                  Welcome to Afriland Bank!
                </h1>

                <h1 className="sub-title">Please select the Account type you want to Open</h1>


                <ul className="account-type-options">
                  {/* <li >
                        <img src={Image1} style={{width:"50%", height:"50%", marginTop:"22%"}} onClick={() => { this.setState({accountType:"client"}) }}/>
                        <input type="radio" id="client" name="account_type_login" value="client" className="mr-3" onChange={this.selectAccountType}/>
                        <label for="client" style={{position: "absolute",fontSize: "18px",marginTop: "24%"}}><b > Client</b></label>
                    </li> */}
                  <li>
                    <img src={Image2} style={{ width: "40%", height: "50%", marginTop: "22%" }} />
                    <input type="radio" id="agent" name="account_type_login" value="agent" className="mr-3" onChange={this.selectAccountType} />
                    <label for="agent" style={{ position: "absolute", fontSize: "18px", marginTop: "24%" }}><b > AFB Customer</b></label>
                  </li>
                  <li>
                    <img src={Image3} style={{ width: "50%", height: "50%", marginTop: "22%" }} />
                    <input type="radio" id="merchant" name="account_type_login" value="merchant" className="mr-3" onChange={this.selectAccountType} />
                    <label for="merchant" style={{ position: "absolute", fontSize: "18px", marginTop: "24%" }}><b > Non-AFB Customer</b></label>
                  </li>
                </ul>


                <div className="col-md-12">
                  <div className="col-md-12 text-center" style={{ justifyContent: "center", display: "flex", marginTop: "12%" }}>
                    <button className="btn btn-default text-white" onClick={() => { alert(this.state.accountType) }}>Next</button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 text-center" style={{ justifyContent: "center", display: "flex", marginTop: "5%" }}>
                    <p>Already have an account? <a>Login</a></p>
                  </div>
                </div>
              </div>

              {/* <div className="row"  style={{display:"none"}} >

                <h1 className="sub-title2">Please select the Account type you want to Open</h1>


                <ul className="account-type-options-2">
                    <li>
                          <input type="radio" id="individual" name="account" value="individual" className="mr-3" onChange={this.selectAccountType}/>
                          <label for="individual" style={{width:'100%', textAlign:'center', color:"#343A40"}}><b > Individual</b></label>
                    </li>
                    <li>
                          <input type="radio" id="ets" name="account" value="ets" className="mr-3" onChange={this.selectAccountType}/>
                          <label for="ets" style={{width:'100%', textAlign:'center', color:"#343A40"}}><b > ETS</b></label>                    
                    </li>
                    <li>
                          <input type="radio" id="sa" name="account" value="sa" className="mr-3" onChange={this.selectAccountType}/>
                          <label for="sa" style={{width:'100%', textAlign:'center', color:"#343A40"}}><b > SA</b></label> 
                    </li>
                    <li>
                         <input type="radio" id="sarl" name="account" value="sarl" className="mr-3" onChange={this.selectAccountType}/>
                          <label for="sarl" style={{width:'100%', textAlign:'center', color:"#343A40"}}><b > SARL</b></label> 
                    </li>
                    <li>
                         <input type="radio" id="sas" name="account" value="sas" className="mr-3" onChange={this.selectAccountType}/>
                          <label for="sas" style={{width:'100%', textAlign:'center', color:"#343A40"}}><b > SAS</b></label> 
                    </li>
                </ul>


                    <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                        <button className="btn btn-default text-white" onClick={ () => {alert(this.state.accountType)}}>Next</button>
                    </div>


                  <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                      <p>Already have an account? <a>Login</a></p>
                  </div>
            </div> */}

              <div className="row" style={{ display: "block" }}>

                <h1 className="sub-title">Individual Account</h1>




                <div className="col-md-12 float-left" style={{ float: "left" }}>


                  <div className="form-group " style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <label>
                      First Name
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="firstName"
                        value={this.state.firstName}
                        placeholder="Enter First Name"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-6" style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <label>
                      Last Name
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="lastName"
                        value={this.state.lastName}
                        placeholder="Enter Last Name"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group col-md-6" style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <label>
                      E-mail Address
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={this.state.email}
                        placeholder="Enter E-Mail Address"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>
                      Phone Number
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                      <PhoneInput
                        country='cm'
                        enableSearch={true}
                        countryCodeEditable={false}
                        disableSearchIcon={true}
                        searchPlaceholder="Search for countries.."
                        inputStyle={{ width: '100%' }}
                        value={this.state.mobileNumber}
                        onChange={this.handleChangeMobile}
                      />
                    </div>
                  </div>


                  <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <label>
                      Date Of Birth
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                      <DatePicker selected={this.state.dob} dateFormat="dd-MM-yyyy" isClearable onChange={(date) => this.dateofbirth(date)} />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <label>
                      Gender
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                      <select className="FrmSelect" name="gender" onChange={this.handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <label>
                      ID Type
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                      <select className="FrmSelect" onChange={(e) => { this.selectIDDocument(e) }}>
                        <option value="ID Card">ID Card</option>
                        <option value="Passport">Passport</option>
                      </select>
                    </div>
                  </div>


                  <div className="form-group col-md-6" style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <label>
                      {this.state.documentType === "ID_DOCUMENT" ? "ID Card Number" : "Passport Number"}
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="idDocumentIdNumber"
                        value={this.state.idDocumentIdNumber}
                        placeholder="xxxxxxxxx"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  {/* <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                      <label>
                        Date Of Birth
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <DatePicker selected={this.state.startdate} dateFormat="dd-MM-yyyy" isClearable />
                      </div>
              </div> */}

                  <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <label>
                      Business address
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="agentBusinessAddress"
                        value={this.state.agentBusinessAddress}
                        placeholder="Enter Address"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                    <label>
                      Business City
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                      <input
                        className="form-control"
                        type="text"
                        name="agentBusinessCity"
                        value={this.state.agentBusinessCity}
                        placeholder="Enter City"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-12" style={{ display: "flex", justifyContent: "space-around", marginTop: '70px', marginBottom: '70px' }}>
                    <div className="col-md-6 float-left" style={{ float: "left", marginRight: "5px" }}>

                      <div style={{ textAlign: 'center' }}>

                        <Upload
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          customRequest={this.dummyRequest}
                          idFrontImageFile={idFrontImageFile}
                          maxCount={1}
                          onPreview={this.handlePreviewFrontImage}
                          onChange={(file) => {
                            this.handleFrontPictureChange(file);
                          }}
                        >
                          {uploadButton}
                        </Upload>
                        <Modal
                          visible={previewFrontVisible}
                          title={previewFrontTitle}
                          footer={null}
                          onCancel={this.handleCancelFrontImage}
                        >
                          <img style={{ width: '100%' }} src={previewFrontImage} />
                        </Modal>
                        <p style={{ color: 'darkgray' }}>Upload Front Image of <br></br>
                          ID Card / Other Identity Card</p>
                      </div>


                      {/* <Dropzone onDrop={acceptedFiles => this.uploadDocuments(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section className="dropzone">
                            <div {...getRootProps()} style={{ display: "flex", justifyContent: "center" }}>
                              <input {...getInputProps()} />
                              <p>Upload front image of ID cart/other Identity card  <button className="btn">Choose File</button>
                              </p>
                            </div>
                          </section>
                        )}
                      </Dropzone> */}
                    </div>
                    <div className="col-md-6 float-right" style={{ float: "right", marginLeft: "5px" }} >


                      <div style={{ textAlign: 'center' }}>

                        <Upload
                          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                          listType="picture-card"
                          idFrontImageFile={idBackImageFile}
                          customRequest={this.dummyRequest}
                          maxCount={1}
                          onPreview={this.handlePreviewBackImage}
                          onChange={(file) => {
                            this.handleBackPictureChange(file);
                          }}
                        >
                          {uploadButton}
                        </Upload>
                        <Modal
                          visible={previewBackVisible}
                          title={previewBackTitle}
                          footer={null}
                          onCancel={this.handleCancelBackImage}
                        >
                          <img style={{ width: '100%' }} src={previewBackImage} />
                        </Modal>
                        <p style={{ color: 'darkgray' }}>Upload Back Image of <br></br>
                          ID Card / Other Identity Card</p>
                      </div>

                      {/* <Dropzone onDrop={acceptedFiles => this.uploadBackSideOfID(acceptedFiles)}>
                        {({ getRootProps, getInputProps }) => (
                          <section className="dropzone">
                            <div {...getRootProps()}>
                              <input {...getInputProps()} />
                              <p>Upload back image of ID cart/other Identity card <button className="btn">Choose File</button></p>
                            </div>
                          </section>
                        )}
                      </Dropzone> */}
                    </div>
                  </div>


                  <div className="row">
                    <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                      <label>
                        Expiration Date
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <DatePicker selected={this.state.setExpirationDate} dateFormat="dd-MM-yyyy" isClearable onChange={(date) => this.setExpirationDate(date)} />
                      </div>
                    </div>



                    <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                      <label>
                        Address 1
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control"
                          type="text"
                          name="address1"
                          value={this.state.address1}
                          placeholder="Enter Address"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>


                    <h1 style={{ fontSize: "36px", lineHeight: "20px", fontWeight: "600", marginTop: '70px' }}>Business Details</h1>


                    <div className="form-group" style={{ marginTop: "7%", marginBottom: "5%" }}>
                      <label>
                        Name of Organization
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control"
                          type="text"
                          name="Organization"
                          value={this.state.Organization}
                          placeholder="Enter Name of Organization"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                      <label>
                        Registered Date
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <DatePicker selected={this.state.registeredDate} dateFormat="dd-MM-yyyy" isClearable onChange={(date) => this.registeredDate(date)} />
                      </div>
                    </div>


                    <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                      <label>
                        Website Link
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control"
                          type="text"
                          name="website"
                          value={this.state.website}
                          placeholder="Enter  Website Link"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                      <label>
                        Trade Register Number
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control"
                          type="text"
                          name="tradeRegister"
                          value={this.state.tradeRegister}
                          placeholder="Enter Trade Register Number"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginTop: "5%", marginBottom: "5%" }}>
                      <label>
                        Taxpayer Number
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control"
                          type="text"
                          name="taxPayer"
                          value={this.state.taxPayer}
                          placeholder="Enter Taxpayer Number"
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="col-md-12" style={{ display: "flex", justifyContent: "space-around", marginTop: '70px', marginBottom: '70px' }}>
                      <div className="col-md-6 float-left" style={{ float: "left", marginRight: "5px" }}>

                        <div style={{ textAlign: 'center' }}>

                          <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            customRequest={this.dummyRequest}
                            idFrontImageFile={idFrontBusinessImageFile}
                            maxCount={1}
                            onPreview={this.handlePreviewFrontBusinessImage}
                            onChange={(file) => {
                              this.handleFrontBusinessPictureChange(file);
                            }}
                          >
                            {uploadButton}
                          </Upload>
                          <Modal
                            visible={previewFrontBusinessVisible}
                            title={previewFrontBusinessTitle}
                            footer={null}
                            onCancel={this.handleCancelBusinessFrontImage}
                          >
                            <img style={{ width: '100%' }} src={previewFrontBusinessImage} />
                          </Modal>
                          <p style={{ color: 'darkgray' }}>Upload Front Image of <br></br>
                            ID Card / Other Identity Card</p>
                        </div>
                      </div>
                      <div className="col-md-6 float-right" style={{ float: "right", marginLeft: "5px" }} >


                        <div style={{ textAlign: 'center' }}>

                          <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            idFrontImageFile={idAddressFile}
                            customRequest={this.dummyRequest}
                            maxCount={1}
                            onPreview={this.handlePreviewAddressImage}
                            onChange={(file) => {
                              this.handleAddressChange(file);
                            }}
                          >
                            {uploadButton}
                          </Upload>
                          <Modal
                            visible={previewAddressVisible}
                            title={previewAddressTitle}
                            footer={null}
                            onCancel={this.handleCancelAddressImage}
                          >
                            <img style={{ width: '100%' }} src={previewAddressImage} />
                          </Modal>
                          <p style={{ color: 'darkgray' }}>Upload Proof of Address</p>
                        </div>
                      </div>
                    </div>

                    {/* <div className="col-md-12" style={{ display: "flex", justifyContent: "space-between" }}>
                      <div className="col-md-6 float-left" style={{ float: "left", marginRight: "5px" }}>
                        <Dropzone onDrop={acceptedFiles => this.uploadDocuments(acceptedFiles)}>
                          {({ getRootProps, getInputProps }) => (
                            <section className="dropzone">
                              <div {...getRootProps()} style={{ display: "flex", justifyContent: "center" }}>
                                <input {...getInputProps()} />
                                <p>Upload front Image of ID card <button className="btn">Choose File</button>
                                </p>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </div>
                      <div className="col-md-6 float-left" style={{ float: "left", display: "flex", justifyContent: "center", marginLeft: "5px" }}>
                        <Dropzone onDrop={acceptedFiles => this.uploadBackSideOfID(acceptedFiles)}>
                          {({ getRootProps, getInputProps }) => (
                            <section className="dropzone">
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Upload address proof images<button className="btn">Choose File</button></p>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </div>
                    </div> */}
                    <div className="row">
                      <div className="col-md-12 text-center" style={{ justifyContent: "center", display: "flex", marginTop: "5%" }}>
                        <label className="privacy_policy">
                          i agree to the <a>terms & conditions </a> and  <a>privacy policy of sara banking</a>
                        </label>

                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12 text-center" style={{ justifyContent: "center", display: "flex", marginTop: "5%" }}>
                        <button className="btn btn-default text-white" onClick={() => this.submitForm()}>Next</button>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 text-center" style={{ justifyContent: "center", display: "flex", marginTop: "5%" }}>
                        <p>Already have an account? <a>Login</a></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div className="row" style={{ display: "none" }}>
                <div class="col-md-12">

                  <p style={{ fontSize: "33px", lineHeight: "39.6px", fontWeight: "500" }}><FormattedMessage id="mobile.verification" /> <br /> +{this.state.phone}</p>

                  <div class="row input-otp" style={{ justifyContent: "space-between", width: "100%", height: "90px", display: "flex" }}>
                    <input autoFocus type="text" name="otp1" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => { this.onInputchange(e); this.nextComponent.focus() }} />
                    <input type="text" name="otp2" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => { this.onInputchange(e); this.nextComponent2.focus() }} ref={c => this.nextComponent = c} />
                    <input type="text" name="otp3" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => { this.onInputchange(e); this.nextComponent3.focus() }} ref={d => this.nextComponent2 = d} />
                    <input type="text" name="otp4" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => { this.onInputchange(e); this.nextComponent4.focus() }} ref={a => this.nextComponent3 = a} />
                    <input type="text" name="otp5" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => { this.onInputchange(e); this.nextComponent5.focus() }} ref={b => this.nextComponent4 = b} />
                    <input type="text" name="otp6" className="form-control mt-2 input-mobile" maxLength="1" onChange={this.onInputchange} ref={c => this.nextComponent5 = c} />
                  </div>
                  <div className="row">
                    {
                      this.state.showError &&
                      <p style={{ color: "red" }}>Invalid OTP</p>
                    }
                  </div>
                  <div className="row mt-4">
                    <p style={{ color: "#066FD0", fontSize: "28px" }}><FormattedMessage id="register.privateAccount.resendCode" /></p>
                  </div>
                  <div class="row mt-3" style={{ display: "flex", justifyContent: "center" }}>
                    <FormattedMessage id="register.verify">
                      {
                        (value) => <input type="button" disabled={this.state.otp1 && this.state.otp2 && this.state.otp3 && this.state.otp4 && this.state.otp5 && this.state.otp6 ? false : true} className="btn text-white btn-default" value={value} onClick={this.verifyOTP} />
                      }
                    </FormattedMessage>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

// // function for mapping redux state values with props //
const mapStateToProps = ({ commonReducer, adminReducer }) => {
  return {
    checkLogin: commonReducer.checkLogin,
  };
};

const mapDispatchToProps = (dispatch) => ({
  RegisterService: (payLoad, accessPayload) =>
    dispatch(RegisterService(payLoad, accessPayload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

