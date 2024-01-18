import React, { useState, useEffect, useRef } from "react";
import "../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import validator from "validator";

import OtpInput from "react-otp-input";
import { useSelector, useDispatch } from "react-redux";
import actionType from "../../services/agent/actionType";
import Grid from "@material-ui/core/Grid";
import moment from "moment";
import { Select, DatePicker, Upload, Modal } from "antd";

import {
  fetchAgentProfile,
  walletAccountOpeningAction,
  walletAccountOpeningResendPinAction,
  walletAccountOpeningVerifyPinAction,
  walletAccountOpeningSetPasswordAction,
} from "../../../src/services/agent/action";
import { FormattedMessage, IntlProvider } from "react-intl";

var africanCountries = require("../../Assets/data/african_countries.json");
const { Option } = Select;
const resendTime = 30;

const WalletAccountOpening = () => {
  const firstUpdate = useRef(true);
  const [step, setStep] = useState(1);
  const idDocumentTypes = [
    { name: "ID Card", value: "ID_CARD" },
    { name: "Passport", value: "PASSPORT" },
  ];
  const otpTypes = [
    { name: "Email", value: "EMAIL" },
    { name: "SMS", value: "SMS" },
  ];

  const [formState, setFormState] = useState({
    customerType: "EXISTING_BANK_CUSTOMER",
    bankCustomerId: "",
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: new Date(),
    countryCode: africanCountries[0].dial_code,
    phoneNumber: "",
    selfiePhoto: null,
    selfiePhotoImage: [],

    idDocumentType: "ID_CARD",
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
  });

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpTimer, setOtpTimer] = React.useState(resendTime);

  const [messages, setMessages] = useState("");
  const [language, setLanguage] = useState("");

  const lan = useSelector((state) => state.commonReducer.language);

  const dispatch = useDispatch();
  const agentProfile = useSelector((state) => state.agentReducer.profile.data);

  const walletAccountOpeningLoading = useSelector(
    (state) => state.agentReducer.walletAccountOpening.loading
  );
  const walletAccountOpeningSuccess = useSelector(
    (state) => state.agentReducer.walletAccountOpening.success
  );

  const walletAccountOpeningResendPinLoading = useSelector(
    (state) => state.agentReducer.walletAccountOpeningResendPin.loading
  );
  const walletAccountOpeningResendPinSuccess = useSelector(
    (state) => state.agentReducer.walletAccountOpeningResendPin.success
  );

  const walletAccountOpeningVerifyPinLoading = useSelector(
    (state) => state.agentReducer.walletAccountOpeningVerifyPin.loading
  );
  const walletAccountOpeningVerifyPinSuccess = useSelector(
    (state) => state.agentReducer.walletAccountOpeningVerifyPin.success
  );

  const walletAccountOpeningSetPasswordLoading = useSelector(
    (state) => state.agentReducer.walletAccountOpeningSetPassword.loading
  );
  const walletAccountOpeningSetPasswordSuccess = useSelector(
    (state) => state.agentReducer.walletAccountOpeningSetPassword.success
  );

  useEffect(() => {
    //Reset States When leaving the page
    return () => {
      dispatch({
        type: actionType.WALLET_ACCOUNT_OPENING_RESET,
      });
      dispatch({
        type: actionType.WALLET_ACCOUNT_RESEND_PIN_RESET,
      });
      dispatch({
        type: actionType.WALLET_ACCOUNT_VERIFY_PIN_RESET,
      });
      dispatch({
        type: actionType.WALLET_ACCOUNT_SET_PASSWORD_RESET,
      });
      setStep(1);
    };
  }, []);

  useEffect(async () => {
    const messages = await loadLocaleData(localStorage.getItem("lang"));
    setMessages(messages);

    setLanguage(localStorage.getItem("lang"));

    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");
  }, []);

  const loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../i18n/messages/fr");
      default:
        return import("../i18n/messages/en");
    }
  };

  useEffect(async () => {
    const messages = await loadLocaleData(lan);
    setMessages(messages);

    setLanguage(lan);
  }, [lan]);

  useEffect(() => {
    if (!agentProfile) {
      dispatch(fetchAgentProfile(sessionStorage.getItem("token")));
    }
  }, [agentProfile, dispatch]);

  useEffect(() => {
    if (step === 2) {
      if (otpTimer > 0) {
        setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      }
    }
  }, [otpTimer, step]);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (step === 1 && walletAccountOpeningSuccess) {
      setStep(2);
    }
    if (step === 2 && walletAccountOpeningVerifyPinSuccess) {
      setStep(3);
    }
    if (step === 3 && walletAccountOpeningSetPasswordSuccess) {
      setStep(4);
    }
  }, [
    step,
    walletAccountOpeningSuccess,
    walletAccountOpeningVerifyPinSuccess,
    walletAccountOpeningSetPasswordSuccess,
  ]);

  const handleSelfiePreviewCancel = () =>
    setFormState({
      ...formState,
      selfiePreviewVisible: false,
    });

  const handleSelfiePreview = (file) => {
    setFormState({
      ...formState,
      previewSelfieImage: file.thumbUrl,
      selfiePreviewVisible: true,
    });
  };

  const handleSelfieUpload = ({ fileList }) => {
    setFormState({
      ...formState,
      selfiePhoto: fileList[0] ? fileList[0].originFileObj : null,
      selfiePhotoImage: fileList,
    });
  };

  const handleDocumentPreviewCancel = () =>
    setFormState({
      ...formState,
      documentPreviewVisible: false,
    });

  const handleDocumentPreview = (file) => {
    setFormState({
      ...formState,
      previewDocumentImage: file.thumbUrl,
      documentPreviewVisible: true,
    });
  };

  const handleDocumentUpload = ({ fileList }) => {
    if (fileList) {
      var filesObj = [];
      for (var i = 0; i < fileList.length; i++) {
        filesObj.push(fileList[i].originFileObj);
      }
      setFormState({
        ...formState,
        IdDocumentsFiles: fileList[0] ? fileList[0].originFileObj : null,
        IdDocumentsFilesImages: fileList,
      });
    }
  };

  const stepOneValidated = () => {
    return formState.customerType &&
      formState.customerType === "EXISTING_BANK_CUSTOMER"
      ? formState.bankCustomerId
      : true &&
          formState.firstName &&
          formState.lastName &&
          formState.email &&
          formState.countryCode &&
          formState.phoneNumber &&
          formState.dateOfBirth &&
          formState.idDocumentType &&
          formState.idDocumentNumber &&
          formState.idDocumentExpiryDate &&
          formState.city &&
          formState.address &&
          formState.selfiePhoto &&
          formState.IdDocumentsFiles &&
          !walletAccountOpeningLoading;
  };

  const stepTwoValidated = () => {
    return !(
      validator.isEmpty(otp) ||
      otp.length !== 6 ||
      walletAccountOpeningResendPinLoading ||
      walletAccountOpeningVerifyPinLoading
    );
  };

  const stepThreeValidated = () => {
    return !(
      validator.isEmpty(password) ||
      validator.isEmpty(confirmPassword) ||
      !validator.isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }) ||
      !validator.equals(password, confirmPassword) ||
      walletAccountOpeningSetPasswordLoading
    );
  };

  const isFormValidated = () => {
    switch (step) {
      case 1:
        return stepOneValidated();
      case 2:
        return stepTwoValidated();
      case 3:
        return stepThreeValidated();
      case 4:
        return true;
      default:
        return false;
    }
  };

  const formSubmitAction = () => {
    if (step === 1) {
      sendWalletAccountRequest();
      //   setStep(step + 1);
    } else if (step === 2) {
      sendVerifyOtpRequest();
      //   setStep(step + 1);
    } else if (step === 3) {
      sendSetPasswordRequest();
      //   setStep(step + 1);
    } else {
      resetForm();
      setStep(1);
    }
  };

  const prevStep = () => {
    if (step === 2) {
      dispatch({
        type: actionType.CUSTOMER_VALIDATION_RESET,
      });
    }
    if (step === 4) {
      dispatch({
        type: actionType.CUSTOMER_OTP_SEND_RESET,
      });
    }
    setStep(step - 1);
  };

  const resetForm = () => {
    dispatch({
      type: actionType.WALLET_ACCOUNT_OPENING_RESET,
    });
    dispatch({
      type: actionType.WALLET_ACCOUNT_RESEND_PIN_RESET,
    });
    dispatch({
      type: actionType.WALLET_ACCOUNT_VERIFY_PIN_RESET,
    });
    dispatch({
      type: actionType.WALLET_ACCOUNT_SET_PASSWORD_RESET,
    });

    setFormState({
      ...formState,
      customerType: "EXISTING_BANK_CUSTOMER",
      bankCustomerId: "",
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: new Date(),
      countryCode: africanCountries[0].dial_code,
      phoneNumber: "",
      selfiePhoto: null,
      selfiePhotoImage: [],

      idDocumentType: "ID_CARD",
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
    });
    setOtp("");
    setPassword("");
    setConfirmPassword("");
  };

  const sendWalletAccountRequest = () => {
    const {
      customerType,
      bankCustomerId,
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
    } = formState;

    const selectedCountry = africanCountries.find(
      (country) => country.dial_code === countryCode
    );
    let formData = new FormData();

    formData.append("registrationType", customerType);
    // customerType === "NON_EXISTING_BANK_CUSTOMER" &&
    formData.append("bankCustomerId", bankCustomerId);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("emailAddress", email);
    formData.append("phoneNumberCountryCode", countryCode);
    formData.append("phoneNumber", phoneNumber);
    formData.append("dateOfBirth", moment(dateOfBirth).format("YYYY-MM-DD"));
    formData.append("selfieDocumentFile", selfiePhoto);
    // formData.append("idDocumentType", idDocumentType);
    formData.append("idDocumentType", "ID_CARD");
    formData.append("idDocumentNumber", idDocumentNumber);
    formData.append(
      "idDocumentExpiryDate",
      moment(idDocumentExpiryDate).format("YYYY-MM-DD")
    );
    formData.append("idDocumentFile", IdDocumentsFiles);
    formData.append("address", address);
    formData.append("cityOfResidence", city);
    formData.append("uin", "12345");
    formData.append("tcAccepted", true);
    formData.append("countryCode", selectedCountry.code);
    formData.append("currencyCode", "xaf");
    formData.append("locale", "en");
    formData.append("agentBankerPhoneNumber", agentProfile.phoneNo);
    dispatch(walletAccountOpeningAction(formData));
  };

  const resendOTP = () => {
    setOtpTimer(resendTime);
    var requestObj = {
      phoneNumber: formState.phoneNumber,
    };
    dispatch(walletAccountOpeningResendPinAction(requestObj));
  };

  const sendVerifyOtpRequest = () => {
    var requestObj = {
      phoneNumber: formState.phoneNumber,
      mfaCode: otp,
    };
    dispatch(walletAccountOpeningVerifyPinAction(requestObj));
  };

  const sendSetPasswordRequest = () => {
    var requestObj = {
      phoneNumber: formState.phoneNumber,
      password: password,
      confirmPassword: confirmPassword,
    };
    dispatch(walletAccountOpeningSetPasswordAction(requestObj));
  };

  const walletAccountOpeningForm = () => {
    return (
      <IntlProvider messages={messages.default} locale={language}>
        <>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.CustomerType" />
              </label>
              <div className="inputFlash">
                <div className="categorySelect">
                  <Select
                    style={{ width: 100 + "%", height: 52 }}
                    defaultValue="NON_EXISTING_BANK_CUSTOMER"
                    value={formState.customerType}
                    onChange={(value) => {
                      setFormState({
                        ...formState,
                        customerType: value,
                      });
                    }}
                  >
                    <Option value="NON_EXISTING_BANK_CUSTOMER">
                      <FormattedMessage id="agent.NONEXISTINGBANKCUSTOMER(NON AFB)" />
                    </Option>
                    <Option value="EXISTING_BANK_CUSTOMER">
                      <FormattedMessage id="agent.EXISTINGBANKCUSTOMER(AFB)" />
                    </Option>
                  </Select>
                </div>
              </div>
            </Grid>
            {formState.customerType === "EXISTING_BANK_CUSTOMER" && (
              <Grid item xs={12} sm={6}>
                <label className="non-afb-label">
                  {" "}
                  <FormattedMessage id="agent.BankCustomerID" />{" "}
                </label>
                <div className="inputFlash">
                  <FormattedMessage id="agent.BankCustomerID">
                    {(placeholder) => (
                      <input
                        type="number"
                        placeholder={placeholder}
                        name="bankCustomerId"
                        value={formState.bankCustomerId}
                        onChange={(e) => {
                          setFormState({
                            ...formState,
                            bankCustomerId: e.target.value,
                          });
                        }}
                      />
                    )}
                  </FormattedMessage>
                </div>
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                {" "}
                <FormattedMessage id="agent.FirstName" />{" "}
              </label>
              <div className="inputFlash">
                <FormattedMessage id="agent.FirstName">
                  {(placeholder) => (
                    <input
                      type="text"
                      placeholder={placeholder}
                      name="firstName"
                      value={formState.firstName}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          firstName: e.target.value,
                        });
                      }}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                {" "}
                <FormattedMessage id="agent.LastName" />{" "}
              </label>
              <div className="inputFlash">
                <FormattedMessage id="agent.LastName">
                  {(placeholder) => (
                    <input
                      type="text"
                      placeholder={placeholder}
                      name="lastName"
                      value={formState.lastName}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setFormState({
                          ...formState,
                          lastName: e.target.value,
                        });
                      }}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Grid>

            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.EmailId" />{" "}
              </label>
              <div className="inputFlash">
                <FormattedMessage id="agent.Email">
                  {(placeholder) => (
                    <input
                      type="email"
                      placeholder={placeholder}
                      name="email"
                      value={formState.email}
                      onChange={(e) => {
                        console.log(e.target.value);
                        setFormState({
                          ...formState,
                          email: e.target.value,
                        });
                      }}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.CountryCode" />
              </label>
              <div className="inputFlash">
                <div className="categorySelect">
                  <Select
                    style={{ width: 100 + "%", height: 52 }}
                    value={formState.countryCode}
                    onChange={(value) => {
                      setFormState({
                        ...formState,
                        countryCode: value,
                      });
                    }}
                  >
                    {africanCountries.map((country) => {
                      return (
                        <Option value={country.dial_code}>
                          <div>
                            <span role="img" aria-label="country-flag">
                              <img
                                style={{
                                  height: "20px",
                                  width: "20px",
                                  marginRight: "8px",
                                }}
                                src={`data:image/png;base64,${country.flag}`}
                              />
                            </span>
                            {`${country.name} (${country.dial_code})`}
                          </div>
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.MobileNumber" />{" "}
              </label>
              <div className="inputFlash">
                <FormattedMessage id="agent.MobileNumber">
                  {(placeholder) => (
                    <input
                      type="number"
                      placeholder={placeholder}
                      name="mobileNumber"
                      value={formState.phoneNumber}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          phoneNumber: e.target.value,
                        });
                      }}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                {" "}
                <FormattedMessage id="agent.dob" />{" "}
              </label>
              <div className="inputFlash">
                <DatePicker
                  format="YYYY-MM-DD"
                  value={moment(formState.dateOfBirth)}
                  style={{ width: "100%", background: "#f3f3f3" }}
                  onChange={(date, dateString) => {
                    setFormState({
                      ...formState,
                      dateOfBirth: dateString,
                    });
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6} style={{ marginBottom: "50px" }}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.Picture(Selfie)" />
              </label>
              <div className="inputFlash">
                <Upload
                  listType="picture-card"
                  multiple={false}
                  fileList={formState.selfiePhotoImage}
                  onPreview={handleSelfiePreview}
                  onChange={handleSelfieUpload}
                  beforeUpload={() => false}
                  maxCount={1}
                >
                  {formState.selfiePhotoImage.length < 1 && "+ Upload"}
                </Upload>

                <Modal
                  visible={formState.selfiePreviewVisible}
                  footer={null}
                  onCancel={handleSelfiePreviewCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={formState.previewSelfieImage}
                  />
                </Modal>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.DocumentType" />
              </label>
              <div className="inputFlash">
                <div className="categorySelect">
                  <Select
                    style={{ width: 100 + "%", height: 52 }}
                    defaultValue="ID_CARD"
                    value={formState.idDocumentType}
                    onChange={(value) => {
                      setFormState({
                        ...formState,
                        idDocumentType: value,
                      });
                    }}
                  >
                    <Option value="ID_CARD">
                      <FormattedMessage id="agent.IDCard" />
                    </Option>
                    <Option value="PASSPORT">
                      <FormattedMessage id="agent.Passport" />
                    </Option>
                  </Select>
                </div>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.DocumentNumber" />
              </label>
              <div className="inputFlash">
                <FormattedMessage id="agent.Number">
                  {(placeholder) => (
                    <input
                      type="text"
                      placeholder={placeholder}
                      name="number"
                      value={formState.idDocumentNumber}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          idDocumentNumber: e.target.value,
                        });
                      }}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.DocumentExpiryDate" />
              </label>
              <div className="inputFlash">
                <DatePicker
                  disabledDate={(current) => {
                    let customDate = moment().format("YYYY-MM-DD");
                    return (
                      current && current < moment(customDate, "YYYY-MM-DD")
                    );
                  }}
                  value={moment(formState.idDocumentExpiryDate)}
                  style={{ width: "100%", background: "#f3f3f3" }}
                  onChange={(date, dateString) => {
                    setFormState({
                      ...formState,
                      idDocumentExpiryDate: dateString,
                    });
                  }}
                />
              </div>
            </Grid>

            <Grid item xs={12} sm={6} style={{ marginBottom: "50px" }}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.Uploaddocumentfiles(MAX:2)" />
              </label>
              <div className="inputFlash">
                <Upload
                  listType="picture-card"
                  multiple={true}
                  fileList={formState.IdDocumentsFilesImages}
                  onPreview={handleDocumentPreview}
                  onChange={handleDocumentUpload}
                  beforeUpload={() => false}
                  maxCount={2}
                >
                  {formState.IdDocumentsFilesImages.length < 2 && "+ Upload"}
                </Upload>

                <Modal
                  visible={formState.documentPreviewVisible}
                  footer={null}
                  onCancel={handleDocumentPreviewCancel}
                >
                  <img
                    alt="example"
                    style={{ width: "100%" }}
                    src={formState.previewDocumentImage}
                  />
                </Modal>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.City" />{" "}
              </label>
              <div className="inputFlash">
                <FormattedMessage id="agent.City">
                  {(placeholder) => (
                    <input
                      type="text"
                      placeholder={placeholder}
                      name="city"
                      value={formState.city}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          city: e.target.value,
                        });
                      }}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <label className="non-afb-label">
                <FormattedMessage id="agent.Address" />{" "}
              </label>
              <div className="inputFlash">
                <FormattedMessage id="agent.Address">
                  {(placeholder) => (
                    <input
                      type="text"
                      placeholder={placeholder}
                      name="address"
                      value={formState.address}
                      onChange={(e) => {
                        setFormState({
                          ...formState,
                          address: e.target.value,
                        });
                      }}
                    />
                  )}
                </FormattedMessage>
              </div>
            </Grid>
          </Grid>
        </>
      </IntlProvider>
    );
  };

  const verifyPinForm = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
              <label>
                Enter OTP <span className="mantdat">*</span>
              </label>
            </div>
            <div className="containerBiaN_f_col width70percent">
              <OtpInput
                value={otp}
                shouldAutoFocus={true}
                onChange={(value) => setOtp(value)}
                numInputs={6}
                seperator={<span></span>}
                isInputNum={true}
                inputStyle={{
                  width: "50px",
                  marginRight: "10px",
                  marginLeft: "10px",
                  fontWeight: "600",
                  fontSize: "16px",
                  lineHeight: "20px",
                  padding: "15px 20px",
                  borderRadius: "5px",
                  border: "1px solid transparent",
                  color: "#00000",
                  background: "#F2F2F2",
                  display: "inline-block",
                  boxShadow: "0px 8px 8px rgba(37, 51, 66, 0.15)",
                }}
              />
            </div>
          </div>

          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div
              className="containerBiaN_f_col width70percent"
              style={{ padding: "0px 0px 0px 20px" }}
            >
              <div style={{ display: "flex" }}>
                {otpTimer !== 0 ? (
                  <p>Resend OTP in {otpTimer}</p>
                ) : (
                  <p>
                    Didn't receive OTP{" "}
                    <span
                      onClick={() => resendOTP()}
                      style={{
                        color: "rgb(191 21 21)",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                    >
                      resend
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const setPasswordForm = () => {
    return (
      <>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <label className="non-afb-label"> Password </label>
            <div className="inputFlash">
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <label className="non-afb-label"> Confirm Password </label>
            <div className="inputFlash">
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </Grid>
        </Grid>
      </>
    );
  };

  const successStep = () => {
    return (
      <>
        <div className="containerBiaN_form">
          <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight"></div>
            <div className="containerBiaN_f_col width70percent">
              <h2>Congratulations</h2>
              <p>Wallet Account Has been created!</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <IntlProvider messages={messages.default} locale={language}>
      <div className="main_contain agentformCenter">
        <div className="merch_m_list_w">
          <div className="merch_list_card" id="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="kyccustomformheading">
                      <h1
                        className="list_top_heading textAlignCenter text-center"
                        style={{ paddingLeft: "0px" }}
                      >
                        <FormattedMessage id="agent.WalletAccountOpening" />
                        {/* <FormattedMessage id="agent.WalletCashDeposit" /> */}
                      </h1>
                    </div>
                  </div>
                  <div className="chartCardMiddle" style={{ padding: "24px" }}>
                    {(() => {
                      switch (step) {
                        case 1:
                          return walletAccountOpeningForm();
                        case 2:
                          return verifyPinForm();
                        case 3:
                          return setPasswordForm();
                        case 4:
                          return successStep();
                        default:
                          return <div></div>;
                      }
                    })()}
                  </div>
                  <div style={{ width: "100%" }}>
                    <div
                      className="confirm_p_w button-container rspacing"
                      style={{ justifyContent: "flex-end" }}
                    >
                      {(step !== 1) & (step !== 4) ? (
                        <button
                          className="blackbtn aryousureBTN confirmBtnR"
                          onClick={() => prevStep()}
                        >
                          <FormattedMessage id="back" />
                        </button>
                      ) : (
                        ""
                      )}
                      <button
                        className="aryousureBTN confirmBtnR"
                        style={{ opacity: isFormValidated() ? "1" : "0.5" }}
                        disabled={isFormValidated() ? false : true}
                        onClick={() => formSubmitAction()}
                      >
                        {step === 3 ? (
                          "Submit"
                        ) : step === 4 ? (
                          "Done"
                        ) : (
                          <FormattedMessage id="agent.Next" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};

export default WalletAccountOpening;
