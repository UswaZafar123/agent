import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { FormattedMessage, IntlProvider } from "react-intl";
import PhoneInput from "react-phone-input-2";
import DatePicker from "react-datepicker";
import NavBar from "./NavBar";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-input-2/lib/style.css";
import validate from "./../../Agent/resources/validation";
import moment from "moment";
import { RegisterService } from "../../../services/agent/action";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Checkbox } from "@material-ui/core";
import IMAGES from "../../../Assets/images";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      accountType: "",
      setExpirationDate: "",
      dob: "",
      bankcustomerType: "",
      firstName: "",
      lastName: "",
      address1: "",
      bankcustomerType: "",
      mobileNumber: "",
      email: "",
      agentType: "AGENT",
      city: "",
      businessType:
        sessionStorage.getItem("accountType") === "Individual"
          ? "INDIVIDUAL"
          : sessionStorage.getItem("accountType"),
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
      Organization: "",
      website: "",
      tradeRegister: "",
      taxPayer: "",

      previewFrontVisible: false,
      previewFrontImage: "",
      idFrontImageFile: [],
      previewFrontTitle: "",

      idBackImageFile: [],
      previewBackVisible: false,
      previewBackImage: "",
      previewBackTitle: "",

      previewFrontBusinessVisible: false,
      previewFrontBusinessImage: "",
      idFrontBusinessImageFile: [],
      previewFrontBusinessTitle: "",

      previewAddressVisible: false,
      previewAddressImage: "",
      idAddressFile: [],
      previewAddressTitle: "",

      viewSummaryVisible: false,
      isMobile: false,
      isPrivacyPolicyAgree: false,
      messages: "",
      language: "",
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
      reader.onerror = (error) => reject(error);
    });
  }

  getBase64Back(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  getBase64BusinessFront(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  getBase64Address(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  handleCancelFrontImage = () => this.setState({ previewFrontVisible: false });

  handleCancelBusinessFrontImage = () =>
    this.setState({ previewFrontBusinessVisible: false });

  handleCancelAddressImage = () =>
    this.setState({ previewAddressVisible: false });

  handleCancelBackImage = () => this.setState({ previewBackVisible: false });

  handleSummaryCancel = () => this.setState({ viewSummaryVisible: false });

  viewSummaryModal = () => {
    console.log(this.state.idFrontImageFile.thumbUrl);
    this.setState({
      viewSummaryVisible: true,
    });
  };

  handlePreviewFrontImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64Front(file.originFileObj);
    }

    this.setState({
      previewFrontImage: file.url || file.preview,
      previewFrontVisible: true,
      previewFrontTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handlePreviewAddressImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64Address(file.originFileObj);
    }

    this.setState({
      previewAddressImage: file.url || file.preview,
      previewAddressVisible: true,
      previewAddressTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handlePreviewFrontBusinessImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64BusinessFront(file.originFileObj);
    }

    this.setState({
      previewFrontBusinessImage: file.url || file.preview,
      previewFrontBusinessVisible: true,
      previewFrontBusinessTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handlePreviewBackImage = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64Back(file.originFileObj);
    }

    this.setState({
      previewBackImage: file.url || file.preview,
      previewBackVisible: true,
      previewBackTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleFrontPictureChange = (idFrontImageFile) =>
    this.setState({ idFrontImageFile: idFrontImageFile.file });

  handleFrontBusinessPictureChange = (idFrontBusinessImageFile) =>
    this.setState({ idFrontBusinessImageFile: idFrontBusinessImageFile.file });

  handleAddressChange = (idAddressFile) => {
    this.setState({
      idAddressFile: idAddressFile.file,
    });
  };

  handleBackPictureChange = (idBackImageFile) =>
    this.setState({ idBackImageFile: idBackImageFile.file });

  validateForm = () => {
    const { emailValid, loginPasswordValid } = this.state;
    this.setState({
      formValid: emailValid && loginPasswordValid,
    });
  };

  handleChangeMobile = (value, data, event, formattedValue) => {
    // this.setState({ countyCode: value })
    this.setState({ mobileNumber: event.target.value });
    // console.log((this.state.mobileNumber).split(" "),"Mobile Num")
  };

  selectAccountType = (e) => {
    this.setState({ accountType: e.target.value });
  };

  selectIDDocument = (e) => {
    if (e.target.value == "ID Card") {
      this.setState({
        documentType: "ID_DOCUMENT",
        documentName: "National ID",
      });
    } else {
      this.setState({
        documentType: "PASSPORT_DOCUMENT",
        documentName: "National Passport",
      });
    }

    // this.setState({ documentType: e.target.value })
  };

  uploadDocuments(file) {
    this.setState({ frontImage: file[0] });
    // this.setState({uploadyourimage:this.state.files});
  }

  setExpirationDate(date) {
    this.setState({ setExpirationDate: date });
  }

  dateofbirth(date) {
    this.setState({ dob: date });
  }

  registeredDate(date) {
    this.setState({ registeredDate: date });
  }

  uploadBackSideOfID(file) {
    this.setState({ frontBackSide: file[0] });
  }

  submitForm() {
    var formData = new FormData();

    if (sessionStorage.getItem("accountType") == "Individual") {
      formData.append("firstName", this.state.firstName);
      formData.append("lastName", this.state.lastName);
      formData.append("registrationChannel", "AGENCY_BANKING_APP");
      formData.append("registrationSubChannel", "AGENCY_BANKING_APP");
      formData.append("busincessType", this.state.businessType);

      var phoneNumberSplit = this.state.mobileNumber.split(" ");

      formData.append("countryCode", phoneNumberSplit[0].replace("+", ""));
      formData.append(
        "phoneNumberCountryCode",
        "00" + phoneNumberSplit[0].replace("+", "")
      );

      phoneNumberSplit.shift();

      formData.append("phoneNo", phoneNumberSplit.join(""));
      formData.append("locale", this.state.locale);
      formData.append("mobileOperator", "UNINOR");

      formData.append("idDocumentName", this.state.documentName);
      formData.append("idDocumentType", "ID_DOCUMENT");

      formData.append("idDocumentIdNumber", this.state.idDocumentIdNumber);
      formData.append(
        "idExpiryDate",
        moment(new Date(this.state.setExpirationDate)).format("YYYY-MM-DD")
      );

      formData.append("agentEmailAddress", this.state.email);
      formData.append("currency", this.state.currency);
      formData.append("gender", this.state.gender);
      formData.append("registrationAppDateTime", new Date().toISOString());
      formData.append(
        "agentDOB",
        moment(new Date(this.state.dob)).format("YYYY-MM-DD")
      );
      formData.append("city", this.state.city);
      formData.append("address", this.state.address1);

      formData.append(
        "idDocumentImages",
        this.state.idFrontImageFile.originFileObj
      );
      formData.append("agentPhoto", this.state.idBackImageFile.originFileObj);
      formData.append("proofOfAddress", this.state.idAddressFile.originFileObj);

      formData.append("agentType", this.state.agentType);
    } else {
      // formData.append("RegistrationType", "NON_EXISTING_BANK_CUSTOMER");
      formData.append("firstName", this.state.firstName);
      formData.append("lastName", this.state.lastName);
      formData.append("registrationChannel", "AGENCY_BANKING_APP");
      formData.append("registrationSubChannel", "AGENCY_BANKING_APP");

      formData.append("agentBusinessName", "HYPERSTAR_AGENCY");
      formData.append("busincessType", this.state.businessType);

      var phoneNumberSplit = this.state.mobileNumber.split(" ");

      formData.append("countryCode", phoneNumberSplit[0].replace("+", ""));
      formData.append(
        "phoneNumberCountryCode",
        "00" + phoneNumberSplit[0].replace("+", "")
      );

      phoneNumberSplit.shift();

      formData.append("phoneNo", phoneNumberSplit.join(""));
      formData.append("locale", this.state.locale);
      formData.append("mobileOperator", "UNINOR");

      formData.append("idDocumentName", this.state.documentName);
      formData.append("idDocumentType", "ID_DOCUMENT");

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
      formData.append("city", this.state.city);
      formData.append("address", this.state.address1);

      formData.append(
        "idDocumentImages",
        this.state.idFrontImageFile.originFileObj
      );
      formData.append("agentPhoto", this.state.idBackImageFile.originFileObj);
      formData.append("proofOfAddress", this.state.idAddressFile.originFileObj);

      formData.append("agentType", this.state.agentType);

      // formData.append("bankCustomerId", this.state.bankCustomerId);

      // Display the key/value pairs
      // for (var pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      // console.log(this.state.idBackImageFile.originFileObj,"XXX")
    }

    this.setState(
      {
        viewSummaryVisible: false,
      },
      () => {
        sessionStorage.setItem("OTP_PhoneNumber", this.state.mobileNumber);
        sessionStorage.setItem("Firstname", this.state.firstName);
        sessionStorage.setItem("Email", this.state.email);
        sessionStorage.setItem("phoneNo", phoneNumberSplit.join(""));

        this.props.RegisterService(formData);
      }
    );
  }

  dummyRequest = ({ fileList, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  async translationHelperFunction() {
    const messages = await this.loadLocaleData(localStorage.getItem("lang"));
    this.setState({
      messages: messages,
      language: localStorage.getItem("lang"),
    });
    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");
  }

  loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../../i18n/messages/fr");
      default:
        return import("../../i18n/messages/en");
    }
  };

  componentDidMount() {
    console.log(this.props, "THIS PROPS");

    this.translationHelperFunction();
  }

  async componentWillReceiveProps(nextprops) {
    console.log(nextprops, "NEXT PROPS");

    if (
      nextprops.agentIndividualRegStatus &&
      nextprops.agentIndividualRegData.iamId
    ) {
      this.props.history.push("/agent/otp-verification");
    } else {
      console.log(nextprops.agentIndividualRegData, "agentIndividualRegData");
    }

    if (nextprops.language) {
      const messages = await this.loadLocaleData(nextprops.language);

      this.setState({
        messages: messages,
        language: nextprops.language,
      });
    }
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

    const {
      previewFrontVisible,
      previewFrontImage,
      idFrontImageFile,
      previewFrontTitle,
    } = this.state;
    const {
      previewBackVisible,
      previewBackImage,
      idBackImageFile,
      previewBackTitle,
    } = this.state;
    const {
      previewFrontBusinessVisible,
      previewFrontBusinessImage,
      idFrontBusinessImageFile,
      previewFrontBusinessTitle,
    } = this.state;
    const {
      previewAddressVisible,
      previewAddressImage,
      idAddressFile,
      previewAddressTitle,
    } = this.state;

    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );

    return (
      <IntlProvider
        messages={this.state.messages.default}
        locale={this.state.language?.length > 0 ? this.state.language : "en"}
      >
        <Fragment>
          <section className="loginWrapper accountWrapper">
            <NavBar />
            <div className="col-sm-12 indAccountRegContainer">
              <div className="loginInner" style={{ width: "50%" }}>
                <div className="row" style={{ display: "none" }}>
                  <h1 className="title">Welcome to Afriland Bank!</h1>

                  <h1 className="sub-title">
                    Please select the Account type you want to Open
                  </h1>

                  <ul className="account-type-options">
                    <li>
                      <img
                        src={IMAGES.AgentImage}
                        style={{
                          width: "40%",
                          height: "50%",
                          marginTop: "22%",
                        }}
                      />
                      <input
                        type="radio"
                        id="agent"
                        name="account_type_login"
                        value="agent"
                        className="mr-3"
                        onChange={this.selectAccountType}
                      />
                      <label
                        htmlFor="agent"
                        style={{
                          position: "absolute",
                          fontSize: "18px",
                          marginTop: "24%",
                        }}
                      >
                        <b> AFB Customer</b>
                      </label>
                    </li>
                    <li>
                      <img
                        src={IMAGES.Image3}
                        style={{
                          width: "50%",
                          height: "50%",
                          marginTop: "22%",
                        }}
                      />
                      <input
                        type="radio"
                        id="merchant"
                        name="account_type_login"
                        value="merchant"
                        className="mr-3"
                        onChange={this.selectAccountType}
                      />
                      <label
                        htmlFor="merchant"
                        style={{
                          position: "absolute",
                          fontSize: "18px",
                          marginTop: "24%",
                        }}
                      >
                        <b> Non-AFB Customer</b>
                      </label>
                    </li>
                  </ul>

                  <div className="col-sm-12">
                    <div
                      className="col-sm-12 text-center"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        marginTop: "12%",
                      }}
                    >
                      <button
                        className="btn btn-default text-white"
                        onClick={() => {
                          alert(this.state.accountType);
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>

                  <div className="row">
                    <div
                      className="col-sm-12 text-center"
                      style={{
                        justifyContent: "center",
                        display: "flex",
                        marginTop: "5%",
                      }}
                    >
                      <p>
                        Already have an account? <a>Login</a>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="row" style={{ display: "block" }}>
                  <h1 className="sub-title">
                    {sessionStorage.getItem("accountType")} Account
                  </h1>
                  <div
                    className="col-sm-12 float-left"
                    style={{ float: "left" }}
                  >
                    <div
                      className="form-group"
                      style={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                      <label>
                        <FormattedMessage id="agent.FirstName" />
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <FormattedMessage id="agent.enterFirstName">
                          {(placeholder) => (
                            <input
                              className="form-control"
                              type="text"
                              name="firstName"
                              value={this.state.firstName}
                              placeholder={placeholder}
                              onChange={this.handleChange}
                            />
                          )}
                        </FormattedMessage>
                      </div>
                    </div>

                    <div
                      className="form-group"
                      style={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                      <label>
                        <FormattedMessage id="agent.LastName" />
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <FormattedMessage id="agent.enterLastName">
                          {(placeholder) => (
                            <input
                              className="form-control"
                              type="text"
                              name="lastName"
                              value={this.state.lastName}
                              placeholder={placeholder}
                              onChange={this.handleChange}
                            />
                          )}
                        </FormattedMessage>
                      </div>
                    </div>

                    <div
                      className="form-group"
                      style={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                      <label>
                        <FormattedMessage id="agent.email" />
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <FormattedMessage id="agent.EnterEmailAddress">
                          {(placeholder) => (
                            <input
                              className="form-control"
                              type="email"
                              name="email"
                              value={this.state.email}
                              placeholder={placeholder}
                              onChange={this.handleChange}
                            />
                          )}
                        </FormattedMessage>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>
                        <FormattedMessage id="phoneNum" />
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <PhoneInput
                          country="cm"
                          enableSearch={true}
                          countryCodeEditable={false}
                          enableLongNumbers={false}
                          searchPlaceholder="Search for countries.."
                          inputStyle={{ width: "100%" }}
                          value={this.state.mobileNumber}
                          onChange={this.handleChangeMobile}
                        />
                      </div>
                    </div>

                    <div
                      className="form-group"
                      style={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                      <label>
                        <FormattedMessage id="agent.dob" />
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <DatePicker
                          selected={this.state.dob}
                          placeholderText="Date Of Birth"
                          dateFormat="dd-MM-yyyy"
                          isClearable
                          onChange={(date) => this.dateofbirth(date)}
                        />
                      </div>
                    </div>

                    <div
                      className="form-group"
                      style={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                      <label>
                        <FormattedMessage id="agent.Gender" />
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <select
                          className="FrmSelect"
                          name="gender"
                          onChange={this.handleChange}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>

                    <div
                      className="form-group"
                      style={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                      <label>
                        <FormattedMessage id="agent.idType" />
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <select
                          className="FrmSelect"
                          onChange={(e) => {
                            this.selectIDDocument(e);
                          }}
                        >
                          <option value="ID Card">ID Card</option>
                          <option value="Passport">Passport</option>
                        </select>
                      </div>
                    </div>

                    <div
                      className="form-group"
                      style={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                      <label>
                        {this.state.documentType === "ID_DOCUMENT"
                          ? "ID Card Number"
                          : "Passport Number"}
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

                    {sessionStorage.getItem("accountType") !== "Individual" && (
                      <>
                        <div
                          className="form-group"
                          style={{ marginTop: "5%", marginBottom: "5%" }}
                        >
                          <label>Business address</label>
                          <div
                            style={{ position: "relative", display: "flex" }}
                          >
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

                        <div
                          className="form-group"
                          style={{ marginTop: "5%", marginBottom: "5%" }}
                        >
                          <label>Business City</label>
                          <div
                            style={{ position: "relative", display: "flex" }}
                          >
                            <FormattedMessage id="agent.EnterCity">
                              {(placeholder) => (
                                <input
                                  className="form-control"
                                  type="text"
                                  name="agentBusinessCity"
                                  value={this.state.agentBusinessCity}
                                  placeholder={placeholder}
                                  onChange={this.handleChange}
                                />
                              )}
                            </FormattedMessage>
                          </div>
                        </div>
                      </>
                    )}

                    <div
                      className="col-sm-12"
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                        marginTop: "70px",
                        marginBottom: "70px",
                      }}
                    >
                      <div
                        className="col-sm-6 float-left"
                        style={{ float: "left", marginRight: "5px" }}
                      >
                        <div style={{ textAlign: "center" }}>
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
                            <img
                              style={{ width: "100%" }}
                              src={previewFrontImage}
                            />
                          </Modal>
                          <p style={{ color: "darkgray" }}>
                            <FormattedMessage id="agent.UploadFrontImageof" />{" "}
                            <br></br>
                            <FormattedMessage id="agent.IDCard/OtherIdentityCard" />
                          </p>
                        </div>
                      </div>
                      <div
                        className="col-sm-6 float-right"
                        style={{ float: "right", marginLeft: "5px" }}
                      >
                        <div style={{ textAlign: "center" }}>
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
                            <img
                              style={{ width: "100%" }}
                              src={previewBackImage}
                            />
                          </Modal>
                          <p style={{ color: "darkgray" }}>
                            Upload Back Image of <br></br>
                            ID Card / Other Identity Card
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="row" style={{ display: "block" }}>
                      <div
                        className="form-group"
                        style={{ marginTop: "5%", marginBottom: "5%" }}
                      >
                        <label>
                          <FormattedMessage id="expirationDate" />
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <DatePicker
                            selected={this.state.setExpirationDate}
                            placeholderText="Expiration Date"
                            dateFormat="dd-MM-yyyy"
                            isClearable
                            onChange={(date) => this.setExpirationDate(date)}
                          />
                        </div>
                      </div>

                      <div
                        className="form-group"
                        style={{ marginTop: "5%", marginBottom: "5%" }}
                      >
                        <label>
                          <FormattedMessage id="agent.City" />
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <FormattedMessage id="agent.EnterCity">
                            {(placeholder) => (
                              <input
                                className="form-control"
                                type="text"
                                name="city"
                                value={this.state.city}
                                placeholder={placeholder}
                                onChange={this.handleChange}
                              />
                            )}
                          </FormattedMessage>
                        </div>
                      </div>

                      <div
                        className="form-group"
                        style={{ marginTop: "5%", marginBottom: "5%" }}
                      >
                        <label>
                          <FormattedMessage id="agent.Address" />
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <FormattedMessage id="agent.EnterAddress">
                            {(placeholder) => (
                              <input
                                className="form-control"
                                type="text"
                                name="address1"
                                value={this.state.address1}
                                placeholder={placeholder}
                                onChange={this.handleChange}
                              />
                            )}
                          </FormattedMessage>
                        </div>
                      </div>

                      {sessionStorage.getItem("accountType") !==
                        "Individual" && (
                        <>
                          <h1 className="h1ForBusinessDetails">
                            Business Details
                          </h1>

                          <div
                            className="form-group"
                            style={{ marginTop: "7%", marginBottom: "5%" }}
                          >
                            <label>Name of Organization</label>
                            <div
                              style={{ position: "relative", display: "flex" }}
                            >
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

                          <div
                            className="form-group"
                            style={{ marginTop: "5%", marginBottom: "5%" }}
                          >
                            <label>Registered Date</label>
                            <div
                              style={{ position: "relative", display: "flex" }}
                            >
                              <DatePicker
                                selected={this.state.registeredDate}
                                dateFormat="dd-MM-yyyy"
                                isClearable
                                onChange={(date) => this.registeredDate(date)}
                              />
                            </div>
                          </div>

                          <div
                            className="form-group"
                            style={{ marginTop: "5%", marginBottom: "5%" }}
                          >
                            <label>Website Link</label>
                            <div
                              style={{ position: "relative", display: "flex" }}
                            >
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

                          <div
                            className="form-group"
                            style={{ marginTop: "5%", marginBottom: "5%" }}
                          >
                            <label>Trade Register Number</label>
                            <div
                              style={{ position: "relative", display: "flex" }}
                            >
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

                          <div
                            className="form-group"
                            style={{ marginTop: "5%", marginBottom: "5%" }}
                          >
                            <label>Taxpayer Number</label>
                            <div
                              style={{ position: "relative", display: "flex" }}
                            >
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
                        </>
                      )}

                      <div
                        className="col-sm-12"
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginTop: "70px",
                          marginBottom: "70px",
                        }}
                      >
                        <div
                          className="col-md-6 float-left"
                          style={{ float: "left", marginRight: "5px" }}
                        >
                          <div style={{ textAlign: "center" }}>
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
                              <img
                                style={{ width: "100%" }}
                                src={previewFrontBusinessImage}
                              />
                            </Modal>
                            <p style={{ color: "darkgray" }}>
                              Upload Front Image of <br></br>
                              ID Card / Other Identity Card
                            </p>
                          </div>
                        </div>
                        <div
                          className="col-md-6 float-right"
                          style={{ float: "right", marginLeft: "5px" }}
                        >
                          <div style={{ textAlign: "center" }}>
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
                              <img
                                style={{ width: "100%" }}
                                src={previewAddressImage}
                              />
                            </Modal>
                            <p style={{ color: "darkgray" }}>
                              Upload Proof of Address
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div
                          className="col-md-12 text-center"
                          style={{ justifyContent: "center", display: "flex" }}
                        >
                          <label className="privacy_policy">
                            <Checkbox
                              value={this.state.isPrivacyPolicyAgree}
                              onChange={(e) => {
                                this.setState({
                                  isPrivacyPolicyAgree: e.target.checked,
                                });
                              }}
                            />
                            i agree to the{" "}
                            <a style={{ fontWeight: "bold" }}>
                              terms & conditions{" "}
                            </a>
                            and{" "}
                            <a style={{ fontWeight: "bold" }}>
                              privacy policy of BIA DigiBank banking
                            </a>
                          </label>
                        </div>
                      </div>
                      <Modal
                        visible={this.state.viewSummaryVisible}
                        footer={null}
                        onCancel={this.handleSummaryCancel}
                        width="80%"
                        style={{
                          top: "30px",
                        }}
                      >
                        <div>
                          <h1 className="h1ForSummaryModal">
                            <FormattedMessage id="agent.RegistrationSummary" />
                          </h1>

                          <div style={{ "overflow-x": "auto" }}>
                            <table className="table" style={{ width: "100%" }}>
                              <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th></th>
                              </tr>
                              <tr className="summaryRow">
                                <td className="summaryLabel">
                                  <FormattedMessage id="agent.FirstName" /> :{" "}
                                </td>
                                <td className="summaryValue">
                                  {this.state.firstName}
                                </td>
                                <td className="summaryLabel">
                                  <FormattedMessage id="agent.LastName" /> :{" "}
                                </td>
                                <td className="summaryValue">
                                  {this.state.lastName}
                                </td>
                              </tr>
                              <tr className="summaryRow">
                                <td className="summaryLabel">
                                  <FormattedMessage id="agent.Email" /> :{" "}
                                </td>
                                <td className="summaryValue">
                                  {this.state.email}
                                </td>
                                <td className="summaryLabel">
                                  <FormattedMessage id="phoneNum" /> :{" "}
                                </td>
                                <td className="summaryValue">
                                  {this.state.mobileNumber}
                                </td>
                              </tr>
                              <tr className="summaryRow">
                                <td className="summaryLabel">
                                  <FormattedMessage id="agent.dob" /> :{" "}
                                </td>
                                <td className="summaryValue">
                                  {moment(new Date(this.state.dob)).format(
                                    "YYYY-MM-DD"
                                  )}
                                </td>
                                <td className="summaryLabel">
                                  <FormattedMessage id="agent.Gender" /> :{" "}
                                </td>
                                <td className="summaryValue">
                                  {this.state.gender}
                                </td>
                              </tr>
                              <tr className="summaryRow">
                                <td className="summaryLabel">
                                  <FormattedMessage id="agent.idType" /> :{" "}
                                </td>
                                <td className="summaryValue">
                                  {this.state.documentName}
                                </td>
                                <td className="summaryLabel">
                                  {this.state.documentType === "ID_DOCUMENT"
                                    ? "ID Card Number"
                                    : "Passport Number"}
                                </td>
                                <td className="summaryValue">
                                  {this.state.idDocumentIdNumber}
                                </td>
                              </tr>
                              {sessionStorage.getItem("accountType") !==
                                "Individual" && (
                                <>
                                  <tr className="summaryRow">
                                    <td className="summaryLabel">
                                      Business Address :
                                    </td>
                                    <td className="summaryValue">
                                      {this.state.agentBusinessAddress}
                                    </td>
                                    <td className="summaryLabel">
                                      Business City :{" "}
                                    </td>
                                    <td className="summaryValue">
                                      {this.state.agentBusinessCity}
                                    </td>
                                  </tr>
                                </>
                              )}

                              <tr className="summaryRow">
                                <td className="summaryLabel">
                                  ID Card Front Image :{" "}
                                </td>
                                <td className="summaryValue">
                                  <img
                                    className="imgThumbnailStyle"
                                    src={this.state.idFrontImageFile.thumbUrl}
                                  />
                                </td>
                                <td className="summaryLabel">
                                  ID Card Back Image :
                                </td>
                                <td className="summaryValue">
                                  <img
                                    className="imgThumbnailStyle"
                                    src={this.state.idBackImageFile.thumbUrl}
                                  />
                                </td>
                              </tr>
                              <tr className="summaryRow">
                                <td className="summaryLabel">
                                  <FormattedMessage id="expirationDate" /> :
                                </td>
                                <td className="summaryValue">
                                  {moment(
                                    new Date(this.state.setExpirationDate)
                                  ).format("YYYY-MM-DD")}
                                </td>
                                <td className="summaryLabel">
                                  <FormattedMessage id="agent.City" /> :{" "}
                                </td>
                                <td className="summaryValue">
                                  {this.state.city}
                                </td>
                              </tr>
                              <tr className="summaryRow">
                                <td className="summaryLabel">
                                  <FormattedMessage id="agent.Address" /> :{" "}
                                </td>
                                <td className="summaryValue">
                                  {this.state.address1}
                                </td>
                                <td className="summaryLabel"></td>
                                <td className="summaryValue"></td>
                              </tr>
                              {sessionStorage.getItem("accountType") ==
                                "Individual" && (
                                <>
                                  <tr className="summaryRow">
                                    <td className="summaryLabel">
                                      ID Card Front Image :{" "}
                                    </td>
                                    <td className="summaryValue">
                                      <img
                                        className="imgThumbnailStyle"
                                        src={
                                          this.state.idFrontBusinessImageFile
                                            .thumbUrl
                                        }
                                      />
                                    </td>
                                    <td className="summaryLabel">
                                      Proof of Address :
                                    </td>
                                    <td className="summaryValue">
                                      <img
                                        className="imgThumbnailStyle"
                                        src={this.state.idAddressFile.thumbUrl}
                                      />
                                    </td>
                                  </tr>
                                </>
                              )}
                            </table>
                          </div>

                          {sessionStorage.getItem("accountType") !==
                            "Individual" && (
                            <>
                              <hr
                                style={{
                                  width: "30%",
                                  borderTop: "3px solid darkgray",
                                  marginTop: "20px",
                                  borderRadius: "10px",
                                }}
                              />
                              <h1
                                style={{
                                  fontSize: "20px",
                                  fontWeight: "600",
                                  marginTop: "20px",
                                  marginBottom: "20px",
                                  textAlign: "center",
                                }}
                              >
                                Business Details
                              </h1>
                              <div style={{ "overflow-x": "auto" }}>
                                <table
                                  className="table"
                                  style={{ width: "100%" }}
                                >
                                  <tr>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                    <th></th>
                                  </tr>
                                  <tr className="summaryRow">
                                    <td className="summaryLabel">
                                      Name of Organization :{" "}
                                    </td>
                                    <td className="summaryValue">
                                      {this.state.Organization}
                                    </td>
                                    <td className="summaryLabel">
                                      Registered Date :{" "}
                                    </td>
                                    <td className="summaryValue">
                                      {moment(
                                        new Date(this.state.registeredDate)
                                      ).format("YYYY-MM-DD")}
                                    </td>
                                  </tr>
                                  <tr className="summaryRow">
                                    <td className="summaryLabel">
                                      Website Link :{" "}
                                    </td>
                                    <td className="summaryValue">
                                      {this.state.website}
                                    </td>
                                    <td className="summaryLabel">
                                      Trade Register Number :{" "}
                                    </td>
                                    <td className="summaryValue">
                                      {this.state.tradeRegister}
                                    </td>
                                  </tr>
                                  <tr className="summaryRow">
                                    <td className="summaryLabel">
                                      Taxpayer Number :{" "}
                                    </td>
                                    <td className="summaryValue">
                                      {this.state.taxPayer}
                                    </td>
                                    <td></td>
                                    <td></td>
                                  </tr>
                                  <tr className="summaryRow">
                                    <td className="summaryLabel">
                                      ID Card Front Image :{" "}
                                    </td>
                                    <td className="summaryValue">
                                      <img
                                        className="imgThumbnailStyle"
                                        src={
                                          this.state.idFrontBusinessImageFile
                                            .thumbUrl
                                        }
                                      />
                                    </td>
                                    <td className="summaryLabel">
                                      <FormattedMessage id="agent.ProofOfAddress" />{" "}
                                      :
                                    </td>
                                    <td className="summaryValue">
                                      <img
                                        className="imgThumbnailStyle"
                                        src={this.state.idAddressFile.thumbUrl}
                                      />
                                    </td>
                                  </tr>
                                </table>
                              </div>
                            </>
                          )}

                          <div
                            className="col-sm-12 text-center"
                            style={{
                              justifyContent: "center",
                              display: "flex",
                              marginTop: "5%",
                            }}
                          >
                            <button
                              className="btn btn-default text-white"
                              style={{ padding: "0px" }}
                              onClick={() => this.submitForm()}
                            >
                              <FormattedMessage id="agent.Register" />
                            </button>
                          </div>
                        </div>
                      </Modal>
                      <div className="row">
                        <div
                          className="col-sm-12 text-center"
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            marginTop: "5%",
                          }}
                        >
                          <button
                            className="btn btn-default text-white"
                            onClick={() => this.viewSummaryModal()}
                          >
                            <FormattedMessage id="agent.Next" />
                          </button>
                        </div>
                      </div>

                      <div className="row">
                        <div
                          className="col-md-12 text-center"
                          style={{
                            justifyContent: "center",
                            display: "flex",
                            marginTop: "5%",
                          }}
                        >
                          <p>
                            <FormattedMessage id="alreadyhave" />{" "}
                            <a style={{ color: "rgb(0, 81, 255)" }}>
                              <FormattedMessage id="login.button" />
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row" style={{ display: "none" }}>
                  <div class="col-md-12">
                    <p
                      style={{
                        fontSize: "33px",
                        lineHeight: "39.6px",
                        fontWeight: "500",
                      }}
                    >
                      <FormattedMessage id="mobile.verification" /> <br /> +
                      {this.state.phone}
                    </p>

                    <div
                      class="row input-otp"
                      style={{
                        justifyContent: "space-between",
                        width: "100%",
                        height: "90px",
                        display: "flex",
                      }}
                    >
                      <input
                        autoFocus
                        type="text"
                        name="otp1"
                        className="form-control mt-2 input-mobile"
                        maxLength="1"
                        onChange={(e) => {
                          this.onInputchange(e);
                          this.nextComponent.focus();
                        }}
                      />
                      <input
                        type="text"
                        name="otp2"
                        className="form-control mt-2 input-mobile"
                        maxLength="1"
                        onChange={(e) => {
                          this.onInputchange(e);
                          this.nextComponent2.focus();
                        }}
                        ref={(c) => (this.nextComponent = c)}
                      />
                      <input
                        type="text"
                        name="otp3"
                        className="form-control mt-2 input-mobile"
                        maxLength="1"
                        onChange={(e) => {
                          this.onInputchange(e);
                          this.nextComponent3.focus();
                        }}
                        ref={(d) => (this.nextComponent2 = d)}
                      />
                      <input
                        type="text"
                        name="otp4"
                        className="form-control mt-2 input-mobile"
                        maxLength="1"
                        onChange={(e) => {
                          this.onInputchange(e);
                          this.nextComponent4.focus();
                        }}
                        ref={(a) => (this.nextComponent3 = a)}
                      />
                      <input
                        type="text"
                        name="otp5"
                        className="form-control mt-2 input-mobile"
                        maxLength="1"
                        onChange={(e) => {
                          this.onInputchange(e);
                          this.nextComponent5.focus();
                        }}
                        ref={(b) => (this.nextComponent4 = b)}
                      />
                      <input
                        type="text"
                        name="otp6"
                        className="form-control mt-2 input-mobile"
                        maxLength="1"
                        onChange={this.onInputchange}
                        ref={(c) => (this.nextComponent5 = c)}
                      />
                    </div>
                    <div className="row">
                      {this.state.showError && (
                        <p style={{ color: "red" }}>Invalid OTP</p>
                      )}
                    </div>
                    <div className="row mt-4">
                      <p style={{ color: "#066FD0", fontSize: "28px" }}>
                        <FormattedMessage id="register.privateAccount.resendCode" />
                      </p>
                    </div>
                    <div
                      class="row mt-3"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <FormattedMessage id="register.verify">
                        {(value) => (
                          <input
                            type="button"
                            disabled={
                              this.state.otp1 &&
                              this.state.otp2 &&
                              this.state.otp3 &&
                              this.state.otp4 &&
                              this.state.otp5 &&
                              this.state.otp6
                                ? false
                                : true
                            }
                            className="btn text-white btn-default"
                            value={value}
                            onClick={this.verifyOTP}
                          />
                        )}
                      </FormattedMessage>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Fragment>
      </IntlProvider>
    );
  }
}

// // function for mapping redux state values with props //
const mapStateToProps = ({ commonReducer, agentReducer }) => {
  return {
    checkLogin: commonReducer.checkLogin,
    agentIndividualRegData: agentReducer.agentIndividualRegData,
    agentIndividualRegStatus: agentReducer.agentIndividualRegStatus,
    language: commonReducer.language,
  };
};

const mapDispatchToProps = (dispatch) => ({
  RegisterService: (payLoad, accessPayload) =>
    dispatch(RegisterService(payLoad, accessPayload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
