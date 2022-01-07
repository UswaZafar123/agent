import React, { Component } from "react";
import { Select, Upload, Modal, Button } from "antd";
import validate from "./../resources/validation";
import moment from "moment";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";
import { getAgentKYC, getProfile, sendAgentKYC, sendAgentOTP } from "../../../services/agent/action";
import OtpInput from "react-otp-input";
import { FormattedMessage, IntlProvider } from "react-intl";


const { Option } = Select;

const dummyRequest = ({ fileList, onSuccess }) => {
  setTimeout(() => {
    onSuccess("ok");
  }, 0);

  // console.log(file,"fileSuccesss")
};

class KYC extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressFile: null,
      uploadFile: null,
      gridApi: null,
      isModalVisible: false,
      kycMerchantCategory: "Individual",
      view: false,
      uploadproof: null,
      addressproof: null,
      dateofbirth: "",
      registereddate: "",
      id: "",
      token: null,
      email: null,
      client: "",
      clientName: "",
      category: "",
      dateOfBirthValue: "",
      viewCompanyRegisterProofModel: false,
      viewTaxationProof: false,
      viewUploadProofModel: false,
      viewAddressProofModel: false,
      emailid: "",
      mobileno: "",
      addressone: "",
      addresstwo: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      longitude: "",
      latitude: "",
      nameoforganization: "",
      registereddate: "",
      categories: "",
      websitelink: "",
      traderegisternumber: "",
      taxpayernumber: "",

      identification: "",
      number: "",
      dateofdelivery: "",
      stateofdelivery: "",
      endofvaliditydate: "",
      showuploadproof: "",
      showaddressproof: "",
      uploadproof: "",
      addressproof: "",
      addressproofName: "",
      uploadproofName: "",
      docType: "proof",
      businessId: "",
      merchantValue: "",
      formValid: false,
      getGeneralInfoStatus: false,
      locationData: true,

      clientValid: false,
      mobilenoValid: false,
      uploadproofValid: false,
      addressproofValid: false,
      nameoforganizationValid: false,
      registereddateValid: false,
      traderegisternumberValid: false,
      taxpayernumberValid: false,
      merchantTypeValid: false,

      identificationValid: false,
      numberValid: false,
      dateofdeliveryValid: false,
      stateofdeliveryValid: false,
      endofvaliditydateValid: false,
      merchantType: "",
      clientError: "",
      mobilenoError: "",
      uploadproofError: "",
      addressproofError: "",
      nameoforganizationError: "",
      registereddateError: "",
      traderegisternumberError: "",
      taxpayernumberError: "",
      identificationError: "",
      numberError: "",
      dateofdeliveryError: "",
      stateofdeliveryError: "",
      endofvaliditydateError: "",
      viewCompanyRegisteredProofModel: false,
      viewTaxationProofModel: false,
      edit: false,
      country: "",
      selected: "CM",
      refreshtokenState: 0,
      comRegProofContentType: "",
      taxProofContentType: "",
      uploadproofContentType: "",
      addressproofContentType: "",
      record: null,

      uploadProofVisible: false,
      previewUploadProof: "",
      previewUploadTitle: "",

      addressProofVisible: false,
      previewAddressProof: "",
      previewAddressTitle: "",

      otp: "",
      isOTPSent: false,
      OTPModalVisible: false,
      isResendOTPDisabled: true,
      profileDetails: {},

      receivedUploadProofImage: null,
      previewReceivedUploadProofImage: false,
      receivedAddressProofImage: null,
      previewReceivedAddressProofImage: false,

      messages: "",
      language: ""

    };
  }

  async translationHelperFunction() {

    const messages = await this.loadLocaleData(localStorage.getItem("lang"));
    this.setState({
      messages: messages,
      language: localStorage.getItem("lang")
    });
    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");

  }

  loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../../i18n/messages/fr.js");
      default:
        return import("../../i18n/messages/en.js");
    }
  };

  getBase64UploadProof(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  getBase64AddressProof(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  handleCancelUploadImage = () => this.setState({ uploadProofVisible: false });

  handleCancelAddressImage = () => this.setState({ addressProofVisible: false });


  handlePreviewUploadProof = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64UploadProof(file.originFileObj);
    }

    this.setState({
      previewUploadProof: file.url || file.preview,
      uploadProofVisible: true,
      previewUploadTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handlePreviewAddressProof = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64AddressProof(file.originFileObj);
    }

    this.setState({
      previewAddressProof: file.url || file.preview,
      addressProofVisible: true,
      previewAddressTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  componentDidMount() {

    this.props.getAgentKYC(sessionStorage.getItem("token"));
    this.props.getProfile();

    this.translationHelperFunction();


  }

  handleChangeSelect = (e) => {
    this.setState({ identification: e });
  };

  setkeyMechantCategory = (e) => {
    this.setState({ kycMerchantCategory: e });
  };

  async componentWillReceiveProps(nextprops) {

    if (nextprops.language) {
      const messages = await this.loadLocaleData(nextprops.language);

      this.setState({
        messages: messages,
        language: nextprops.language
      });
    }

    if (this.state.refreshtokenState == 0) {

      if (nextprops.kycSendStatus) {
        window.location.reload(false);
      }

      if (nextprops.kycGetStatus) {
        console.log(nextprops.kycGetData, "KYC GET DATA");
        this.setGetKYCDataToFields(nextprops.kycGetData)
      }

      if (nextprops.profileDetails) {

        this.setState({
          profileDetails: nextprops.profileDetails
        });

      }

      if (nextprops.getKYCDetails) {
        console.log(nextprops.getKYCDetails, "GET KYC DETAILS")
      }

      if (nextprops.uploadProofImage) {
        // console.log(nextprops.uploadProofImage, "UP PROOF IMAGE");

        var binaryData = [];
        binaryData.push(nextprops.uploadProofImage);

        this.setState({
          receivedUploadProofImage: window.URL.createObjectURL(
            new Blob(binaryData, { type: "application/octet-stream" })
          ),
        });
      }

      if (nextprops.addressProofImage) {
        var binaryData = [];
        binaryData.push(nextprops.addressProofImage);

        this.setState({
          receivedAddressProofImage: window.URL.createObjectURL(
            new Blob(binaryData, { type: "application/octet-stream" })
          ),
        });
      }

      // if (nextprops.getKYCDetailsStatus) {
      //   // this.setState({
      //   // 	refreshtokenState: this.state.refreshtokenState+1
      //   // });

      //   let record = nextprops.getKYCDetails.kyc;

      //   //let dateOfBirthValue = new Date();

      //   if (record) {
      //     this.setState({ record: nextprops.getKYCDetails.kyc });

      //     if (record.dateofbirth != "Invalid date" && record.dateofbirth) {
      //       var dateOfBirthValue = new Date(
      //         record.dateofbirth
      //           .toString()
      //           .replace(/(\d{2})-(\d{2})-(\d{4})/, "$3/$1/$2")
      //       );
      //       console.log(record.dateofbirth, "dateOfbirth");
      //     } else {
      //       var dateOfBirthValue = null;
      //     }
      //   }

      //   //console.log(dateOfBirthValue,"date obj")
      //   if (record) {
      //     this.setState(
      //       {
      //         kycMerchantCategory: record.client,
      //         id: record.id ? record.id : "",
      //         client: record.client,
      //         merchantType: record.client,
      //         name: record.name,
      //         dateOfBirthValue: dateOfBirthValue,
      //         emailid: record.emailid,
      //         mobileno: record.mobileno,
      //         addressone: record.addressone,
      //         addresstwo: record.addresstwo,
      //         city: record.city,
      //         //	merchantType: record.merchantType,
      //         state: record.state,
      //         country: record.country,
      //         zipcode: record.zipcode,
      //         longitude: record.longitude,
      //         latitude: record.latitude,
      //         getGeneralInfoStatus: true,
      //         formValid: true,
      //         businessId: record.businessdetails
      //           ? record.businessdetails.id
      //           : null,
      //       },
      //       () => {
      //         console.log(this.state.merchantType, "callbackvaluetype");
      //         if (this.state.client === "BusinessClient") {
      //           if (record.businessdetails) {
      //             if (
      //               new Date(record.businessdetails.registereddate) !==
      //               "Invalid Date" &&
      //               !isNaN(new Date(record.businessdetails.registereddate))
      //             ) {
      //               var registereddate = new Date(
      //                 record.businessdetails.registereddate
      //                   .toString()
      //                   .replace(/(\d{2})-(\d{2})-(\d{4})/, "$3/$1/$2")
      //               );
      //             } else {
      //               registereddate = null;
      //             }
      //           }
      //           if (record.businessdetails) {
      //             this.setState(
      //               {
      //                 nameoforganization:
      //                   record.businessdetails.nameoforganization,
      //                 registereddate,
      //                 categories: record.businessdetails,
      //                 websitelink: record.businessdetails.websitelink,
      //                 traderegisternumber:
      //                   record.businessdetails.traderegisternumber,
      //                 taxpayernumber: record.businessdetails.taxpayernumber,
      //                 uploadproof: record.businessdetails.companyregisterproof,
      //                 showuploadproof:
      //                   record.businessdetails.companyregisterproof,
      //                 showaddressproof:
      //                   record.businessdetails.taxationofficeaddressproof,
      //                 comRegProofContentType:
      //                   record.businessdetails.companyRegProofContentType,
      //                 taxProofContentType:
      //                   record.businessdetails.taxOfficeAddressProofContentType,
      //                 addressproof:
      //                   record.businessdetails.taxationofficeaddressproof,
      //                 edit: true,
      //                 uploadproofValid: true,
      //                 traderegisternumberValid: true,
      //                 taxpayernumberValid: true,
      //                 addressproofValid: true,
      //                 registereddateValid: true,
      //                 nameoforganizationValid: true,
      //                 merchantTypeValid: true,
      //               },
      //               () => {
      //                 //this.validateForm()
      //               }
      //             );
      //           }
      //         }
      //         if (this.state.client == "PrivateClient") {
      //           let dateofdelivery = new Date(
      //             record.identityInformation.dateofdelivery
      //           );
      //           let endofvaliditydate = new Date(
      //             record.identityInformation.endofvaliditydate
      //           );
      //           this.setState({
      //             kycMerchantCategory: "Individual",
      //             identification: record.identityInformation.identification,
      //             number: record.identityInformation.number,
      //             dateofdelivery,
      //             stateofdelivery: record.identityInformation.stateofdelivery,
      //             endofvaliditydate,
      //             comRegProofContentType:
      //               record.identityInformation.uploadProofContentType,
      //             taxProofContentType:
      //               record.identityInformation.addressProofContentType,
      //             addressproof: record.identityInformation.addressproof,
      //             formValid: true,
      //           });
      //         }
      //       }
      //     );
      //   }
      // } else {
      //   this.setState({
      //     sampleState: true,
      //   });
      // }
    }
  };

  setGetKYCDataToFields = (data) => {

    // console.log(new Date(data.dateOfBirth),"NEW SEt")

    this.setState({
      addressone: data.address,
      city: data.city,
      email: data.emailAddress,
      latitude: data.latitude,
      longitude: data.longitude,
      mobileno: data.phoneNo,
      dateOfBirthValue: new Date(data.dateOfBirth),
      number: data.idDocuments[0].documentIdNumber,
      endofvaliditydate: new Date(data.idDocuments[0].documentExpiryDate)
    });

  }

  getGeo = () => {
    if (navigator.geolocation) {
      var self = this;
      navigator.geolocation.getCurrentPosition(function (position) {
        // console.log("Latitude is :", position.coords.latitude);
        // console.log("Longitude is :", position.coords.longitude);

        self.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  };

  handleChange = (e) => {
    localStorage.setItem("statusCode", "");
    // console.log(e.target.value, "valueeeee");
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

  validateForm = () => {
    const { emailValid, loginPasswordValid } = this.state;
    this.setState({
      formValid: emailValid && loginPasswordValid,
    });
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
  onTax = () => {
    // this.setState({
    //   view: true
    // })
    this.props.history.push({
      pathname: "/taxationOffice",
      state: { data: this.state.record },
    });

    // this.props.history.push('/taxationOffice')
  };

  onTaxPrivate = () => {
    // this.setState({
    //   view: true
    // })
    this.props.history.push({
      pathname: "/address-proof/private",
      state: { data: this.state.record },
    });

    // this.props.history.push('/taxationOffice')
  };

  uploadProof = () => {
    this.props.history.push({
      pathname: "/upload-proof",
      state: { data: this.state.record },
    });
  };

  uploadProofPrivate = () => {
    this.props.history.push({
      pathname: "/upload-proof/private",
      state: { data: this.state.record },
    });
  };

  handleChangeFile = ({ fileList }, name) => {
    if (fileList[0]) {
      var size = parseInt(fileList[0].size) / 1024 / 1024;

      if (
        fileList[0].type == "image/jpeg" ||
        fileList[0].type == "image/jpg" ||
        fileList[0].type == "image/png" ||
        fileList[0].type == "application/pdf"
      ) {
        if (size <= 10) {
          if (name == "addressproof") {
            this.setState({
              [name]: fileList[0] ? fileList[0].originFileObj : null,
              addressFile: fileList,
            });
          } else if (name == "uploadproof") {
            this.setState({
              [name]: fileList[0] ? fileList[0].originFileObj : null,
              uploadFile: fileList,
            });
          }
        } else {
          toastr.error(
            "unsupported file size please select less than 10 Mb and your file size is " +
            size +
            "Mb"
          );
        }
      } else {
        toastr.error("unsupported file format please select jpg/jpeg/pdf/png");
      }
    } else {
      if (name == "addressproof") {
        this.setState({
          [name]: fileList[0] ? fileList[0].originFileObj : null,
          addressFile: null,
        });
      } else if (name == "uploadproof") {
        this.setState({
          [name]: fileList[0] ? fileList[0].originFileObj : null,
          uploadFile: null,
        });
      }
    }

    // console.log(fileList, "fileList");

    // if (
    //   e.target.files[0].type == "application/pdf" ||
    //   e.target.files[0].type == "image/png" ||
    //   e.target.files[0].type == "image/jpeg"
    // ) {
    //   var files = e.target.files[0];
    //   var name = e.target.name;

    //   this.setState(
    //     {
    //       [e.target.name]: e.target.files[0],
    //       [e.target.name + "Name"]: e.target.files[0].name,
    //       [e.target.name + "Valid"]: true,
    //     },
    //     () => {
    //       console.log(name);
    //       this.setState({ ["show" + name]: URL.createObjectURL(files) });
    //       this.validateForm();
    //     }
    //   );
    // } else {
    // }

    // console.log(this.state.addressproof.name, "states");
  };

  showOTPModal = () => {

    if (this.state.addressone === "" || this.state.addresstwo === "" || this.state.city === "" || this.state.identification === "" || this.state.number === "") {
      toastr.error("Please fill required fields");
    } else if (this.state.zipcode === "" || this.state.zipcode instanceof String) {
      toastr.error("Please enter valid zipcode");
    }
    else {
      if (!this.state.isOTPSent) {
        this.sendOTP();
        this.startResendTimeout();
      }

      this.setState({
        OTPModalVisible: true
      });
    }
  }

  startResendTimeout = () => {

    this.setState({
      isResendOTPDisabled: true
    });

    setTimeout(() => {

      this.setState({
        isResendOTPDisabled: false
      });

    }, 10000);
  }

  sendOTP = () => {
    const data = {
      phoneNumber: this.state.mobileno,
    };

    this.props.sendAgentOTP(data);
    console.log("SENDING OTP..");

    this.setState({
      isOTPSent: true,
      isResendOTPDisabled: true
    });

  }

  resendOTP = () => {
    this.sendOTP();
    this.startResendTimeout();
  }

  handleCancelOTPModal = () => {
    this.setState({
      OTPModalVisible: false
    });
  }

  setOtp = (e) => {
    this.setState({
      otp: e
    });
  }

  SubmitForm = () => {
    if (this.state.kycMerchantCategory == "Individual") {
      if (
        this.state.addressproof == null ||
        this.state.uploadproof == null ||
        this.state.identification == "" ||
        this.state.number == ""
      ) {
        toastr.error("please fillout all the Mandatory fields marked in Red");
      } else {
        // let id = this.state.id;

        let token = sessionStorage.getItem("token");
        // let submitionEmail = localStorage.getItem("email");
        // let mobileno = parseInt(this.state.mobileno);
        let longitude = parseInt(this.state.longitude);
        let latitude = parseInt(this.state.latitude);
        let dateofbirth = moment(this.state.dateOfBirthValue).format(
          "YYYY-MM-DD"
        );
        let registereddate = moment(this.state.registereddate).format(
          "YYYY-MM-DD"
        );
        let dateofdelivery = moment(this.state.dateofdelivery).format(
          "YYYY-MM-DD"
        );
        let endofvaliditydate = moment(this.state.endofvaliditydate).format(
          "YYYY-MM-DD"
        );
        let zipcode = parseInt(this.state.zipcode);

        let businessClient = {
          // "id": id,
          client: "BusinessClient",
          name: this.state.name,
          dateofbirth: dateofbirth,
          emailid: this.state.email,
          mobileno: this.state.mobileno,
          addressone: this.state.addressone,
          addresstwo: this.state.addresstwo,
          city: this.state.city,
          state: "",
          country: "",
          zipcode: zipcode,
          longitude: longitude,
          latitude: latitude,

          businessdetails: {
            // "id": this.state.businessId,
            nameoforganization: this.state.nameoforganization,
            registereddate: registereddate,
            categories: "",
            websitelink: this.state.websitelink,
            traderegisternumber: this.state.traderegisternumber,
            taxpayernumber: this.state.taxpayernumber,
          },
          kycApprovalStatus: "PENDING_FIRST_APPROVAL",
        };
        // let privateClient = {
        //   // "id": id,
        //   email: this.state.email,
        //   // client: "PrivateClient",
        //   // name: this.state.name,
        //   dateOfBirth: dateofbirth,
        //   // email: this.state.email,
        //   mobileNumber: this.state.mobileno,
        //   address: this.state.addressone,
        //   // addresstwo: this.state.addresstwo,
        //   city: this.state.city,
        //   // state: "",
        //   // country: "",
        //   // zipcode: zipcode,
        //   longitude: longitude,
        //   latitude: latitude,
        //   IdDocumentFile: this.state.uploadproof,
        //   addressproof: this.state.addressproof,
        //   idDocumentType: "ID_DOCUMENT",
        //   idDocumentNumber: this.state.number,
        //   idDocumentExpiryDate: this.state.endofvaliditydate
        //   // agentDOB : dateofbirth,
        //   // mfaToken : "909106"
        //   // identityInformation: {
        //   //   identification: this.state.identification,
        //   //   number: this.state.number,
        //   //   dateofdelivery: moment(new Date()).format("YYYY-MM-DD"),
        //   //   stateofdelivery: "state",
        //   //   endofvaliditydate: moment(new Date()).format("YYYY-MM-DD"),
        //   // },
        //   // kycApprovalStatus: "PENDING_FIRST_APPROVAL",
        // };

        let formData = new FormData();
        if (this.state.kycMerchantCategory !== "Individual") {
          formData.append("json", JSON.stringify(businessClient));
          formData.append("companyregistrationproof", this.state.uploadproof);
          formData.append("taxaddressproof", this.state.addressproof);
          formData.append("uploadproof", this.state.uploadproof);
          formData.append("addressproof", this.state.addressproof);
        }

        if (this.state.kycMerchantCategory === "Individual") {
          formData.append("email", this.state.email);
          formData.append("dateOfBirth", moment(new Date(this.state.dateOfBirthValue)).format("YYYY-MM-DD"));
          formData.append("mobileNumber", this.state.mobileno);
          formData.append("address", this.state.addressone);
          formData.append("city", this.state.city);
          formData.append("longitude", longitude);
          formData.append("mfaToken", this.state.otp);
          formData.append("latitude", latitude);
          formData.append("IdDocumentFile", this.state.uploadproof);
          formData.append("addressproof", this.state.addressproof);
          formData.append("idDocumentType", "ID_DOCUMENT");
          formData.append("idDocumentNumber", this.state.number);
          formData.append("idDocumentExpiryDate", moment(new Date(this.state.endofvaliditydate)).format("YYYY-MM-DD"));
        }
        this.props.sendAgentKYC(token, formData);

        this.setState({
          OTPModalVisible: false
        });
      }
    } else if (this.state.kycMerchantCategory !== "Individual")
      if (
        this.state.addressproof == null ||
        this.state.uploadproof == null ||
        this.state.registereddate == "" ||
        this.state.taxpayernumber == ""
      ) {
        toastr.error("please fillout all the Mandatory fields marked in Red");
      } else {
        let id = this.state.id;

        let token = sessionStorage.getItem("token");
        let submitionEmail = localStorage.getItem("email");
        let mobileno = parseInt(this.state.mobileno);
        let longitude = parseInt(this.state.longitude);
        let latitude = parseInt(this.state.latitude);
        let dateofbirth = moment(this.state.dateOfBirthValue).format(
          "YYYY-MM-DD"
        );
        let registereddate = moment(this.state.registereddate).format(
          "YYYY-MM-DD"
        );
        let dateofdelivery = moment(this.state.dateofdelivery).format(
          "YYYY-MM-DD"
        );
        let endofvaliditydate = moment(this.state.endofvaliditydate).format(
          "YYYY-MM-DD"
        );
        let zipcode = parseInt(this.state.zipcode);

        let businessClient = {
          client: "BusinessClient",
          name: this.state.name,
          dateofbirth: dateofbirth,
          emailid: this.state.email,
          mobileno: this.state.mobileno,
          addressone: this.state.addressone,
          addresstwo: this.state.addresstwo,
          city: this.state.city,
          state: "",
          country: "",
          zipcode: zipcode,
          longitude: longitude,
          latitude: latitude,

          businessdetails: {
            nameoforganization: this.state.nameoforganization,
            registereddate: registereddate,
            categories: "",
            websitelink: this.state.websitelink,
            traderegisternumber: this.state.traderegisternumber,
            taxpayernumber: this.state.taxpayernumber,
          },
          kycApprovalStatus: "PENDING_FIRST_APPROVAL",
        };
        let privateClient = {
          // "id": id,
          email: this.state.email,
          client: "PrivateClient",
          name: this.state.name,
          dateofbirth: dateofbirth,
          emailid: this.state.email,
          mobileno: this.state.mobileno,
          addressone: this.state.addressone,
          addresstwo: this.state.addresstwo,
          city: this.state.city,
          state: "",
          country: "",
          zipcode: zipcode,
          longitude: longitude,
          latitude: latitude,
          identityInformation: {
            identification: this.state.identification,
            number: this.state.number,
            dateofdelivery: moment(new Date()).format("YYYY-MM-DD"),
            stateofdelivery: "state",
            endofvaliditydate: moment(new Date()).format("YYYY-MM-DD"),
          },
          kycApprovalStatus: "PENDING_FIRST_APPROVAL",
        };

        let formData = new FormData();
        if (this.state.kycMerchantCategory !== "Individual") {
          formData.append("json", JSON.stringify(businessClient));
          formData.append("companyregistrationproof", this.state.uploadproof);
          formData.append("taxaddressproof", this.state.addressproof);
          formData.append("uploadproof", this.state.uploadproof);
          formData.append("addressproof", this.state.addressproof);
        }

        if (this.state.kycMerchantCategory === "Individual") {
          formData.append("json", JSON.stringify(privateClient));
          formData.append("uploadproof", this.state.uploadproof);
          formData.append("addressproof", this.state.addressproof);
        }
      }
  };

  dob = (date) => {
    // console.log(date);
    this.setState({
      dateOfBirthValue: date,
    });
  };

  identityExpiry = (date) => {
    this.setState({
      endofvaliditydate: date,
    });
  };

  registereddate = (date) => {
    this.setState({
      registereddate: date,
    });
  };

  render() {
    const uploadButton = (
      <div>
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <IntlProvider
        messages={this.state.messages.default}
        locale={this.state.language}
      >
        <div className="main_contain kyc_parent_m">
          <div className="merch_m_list_w">
            <h1 className="m_listHeading textAlignCenter pd_t_b24">
              {/* Agent Management{" "} */}
              <FormattedMessage id="agent.AgentManagement" />
            </h1>
            <div className="merch_list_card">
              <div className="section_custom">
                <div className="sectionInn">
                  <div className="chartCard_w">
                    <div className="chartCardTop">
                      <div className="kyccustomformheading">
                        <h1 className="list_top_heading textAlignCenter text-center">
                          <FormattedMessage id="agent.KYCForm" />
                        </h1>
                        <button className="c_first_pending_BTN"><FormattedMessage id="agent.Cancel" /></button>
                      </div>
                    </div>
                    <div
                      className="kyccustomform chartCardMiddle"
                      style={{ padding: "24px" }}
                    >
                      <h1 className="kycDetails"><FormattedMessage id="agent.ProfileDetails" /></h1>
                      <div className="kycDetailsBox">
                        <div className="kycformBox">
                          <div className="formRow">
                            <div className="formCol">
                              <label className="formColLabel"><FormattedMessage id="agent.Category" /><span style={{ color: 'red' }}>*</span></label>
                              <div className="categorySelect">
                                <Select
                                  value={this.state.kycMerchantCategory}
                                  defaultValue=""
                                  style={{ width: 100 + "%", height: 52 }}
                                  onChange={this.setkeyMechantCategory}
                                >
                                  <Option value="" disabled>
                                    Select Category
                                  </Option>
                                  <Option value="Individual"><FormattedMessage id="agent.Individual" /></Option>
                                  <Option value="ETS">ETS</Option>
                                  <Option value="SAS">SAS</Option>
                                  <Option value="SA">SA</Option>
                                  <Option value="SARL">SARL</Option>
                                </Select>
                              </div>
                            </div>
                            <div className="formCol"></div>
                            <div className="formCol">
                              <label className="formColLabel"><FormattedMessage id="agent.Name" /><span style={{ color: 'red' }}>*</span></label>
                              <input
                                type="text"
                                name="clientName"
                                placeholder="Enter Name"
                                readOnly={true}
                                value={this.props.profileDetails != null && this.props.profileDetails != null ? this.props.profileDetails.firstName + " " + this.props.profileDetails.lastName : ""}
                                onChange={this.handleChange}
                                style={{ color: "#808080" }}
                              />
                            </div>
                            <div className="formCol">
                              <label className="formColLabel">
                                <FormattedMessage id="agent.dob" />
                              </label>
                              <DatePicker
                                selected={this.state.dateOfBirthValue}
                                maxDate={new Date()}
                                className="form-control"
                                name="dateofbirth"
                                onChange={this.dob}
                                peekNextMont
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                autoComplete="off"
                              />
                            </div>
                            <div className="formCol">
                              <label className="formColLabel"><FormattedMessage id="agent.email" /><span style={{ color: 'red' }}>*</span></label>
                              <input
                                type="text"
                                name="email"
                                readOnly={true}
                                placeholder="abc@gmail.com"
                                value={this.state.email}
                                onChange={this.handleChange}
                                style={{ color: "#808080" }}

                              />
                            </div>
                            <div className="formCol">
                              <label className="formColLabel">
                                <FormattedMessage id="agent.MobileNumber" /> <span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="mobileno"
                                placeholder="237132321312"
                                readOnly={true}
                                value={this.state.mobileno}
                                onChange={this.handleChange}
                                style={{ color: "#808080" }}

                              />
                            </div>
                            <div className="formCol">
                              <label className="formColLabel">
                                <FormattedMessage id="agent.Address" /> 1
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="addressone"
                                placeholder="Address 1"
                                value={this.state.addressone}
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="formCol">
                              <label className="formColLabel">
                                <FormattedMessage id="agent.Address" /> 2
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="addresstwo"
                                placeholder="Address 2"
                                value={this.state.addresstwo}
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="formCol">
                              <label className="formColLabel">
                                <FormattedMessage id="agent.City" />
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="text"
                                name="city"
                                placeholder="Enter City"
                                value={this.state.city}
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="formCol">
                              <label className="formColLabel">
                                <FormattedMessage id="agent.ZipCode" />
                                <span style={{ color: 'red' }}>*</span>
                              </label>
                              <input
                                type="number"
                                name="zipcode"
                                placeholder="Enter Code"
                                value={this.state.zipcode}
                                onChange={this.handleChange}
                              />
                            </div>
                          </div>
                          <div className="mapformrow formRow">
                            <div className="formCol">
                              <label className="formColLabel"><FormattedMessage id="agent.Longitude" /></label>
                              <input
                                type="number"
                                placeholder="55.3781° N"
                                name="longitutde"
                                value={this.state.longitude}
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="formCol">
                              <label className="formColLabel"><FormattedMessage id="agent.Latitude" /></label>
                              <input
                                type="number"
                                name="longitude"
                                placeholder="3.4360° W"
                                value={this.state.latitude}
                              />
                            </div>
                            <button
                              className="c_first_pending_BTN"
                              name="latitude"
                              onClick={this.getGeo}
                            >
                              <FormattedMessage id="agent.Geolocation" />
                            </button>
                          </div>
                        </div>
                      </div>
                      {this.state.kycMerchantCategory == "Individual" && (
                        <>

                          <div
                            className="col-md-12"
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
                                  listType="picture-card"
                                  maxCount={1}
                                  customRequest={dummyRequest}
                                  onPreview={this.handlePreviewUploadProof}
                                  onChange={(file) =>
                                    this.handleChangeFile(file, "uploadproof")
                                  }
                                  fileList={this.state.uploadFile}
                                >
                                  {uploadButton}
                                </Upload>
                                <Modal
                                  visible={this.state.uploadProofVisible}
                                  title={this.state.previewUploadTitle}
                                  footer={null}
                                  onCancel={this.handleCancelUploadImage}
                                >
                                  <img
                                    style={{ width: "100%" }}
                                    src={this.state.previewUploadProof}
                                  />
                                </Modal>
                                <p style={{ color: "darkgray", paddingRight: '10px' }}>
                                  <FormattedMessage id="agent.UploadProof" />
                                </p>
                                {this.state.receivedUploadProofImage ? (
                                  <>
                                    <button style={{ backgroundColor: "#343A40", fontWeight: "bold", color: "white", borderRadius: "10px", border: "none", padding: "10px" }} onClick={() => {
                                      this.setState({
                                        previewReceivedUploadProofImage: true
                                      });
                                    }}>View Uploaded Proof</button>
                                    {/* <img src={this.state.receivedUploadProofImage} /> */}

                                    <Modal
                                      visible={this.state.previewReceivedUploadProofImage}
                                      title={"Upload Proof"}
                                      footer={null}
                                      onCancel={() => {
                                        this.setState({
                                          previewReceivedUploadProofImage: false
                                        });
                                      }}
                                    >
                                      <img
                                        style={{ width: "100%" }}
                                        src={this.state.receivedUploadProofImage}
                                      />
                                    </Modal>
                                  </>
                                ) : <></>}
                              </div>
                            </div>
                            <div
                              className="col-md-6 float-left"
                              style={{ float: "left", marginRight: "5px" }}
                            >
                              <div style={{ textAlign: "center" }}>

                                <Upload
                                  listType="picture-card"
                                  customRequest={dummyRequest}
                                  maxCount={1}
                                  onPreview={this.handlePreviewAddressProof}
                                  onChange={(file) =>
                                    this.handleChangeFile(file, "addressproof")
                                  }
                                  fileList={this.state.addressFile}
                                >
                                  {uploadButton}
                                </Upload>
                                <Modal
                                  visible={this.state.addressProofVisible}
                                  title={this.state.previewAddressTitle}
                                  footer={null}
                                  onCancel={this.handleCancelAddressImage}
                                >
                                  <img
                                    style={{ width: "100%" }}
                                    src={this.state.previewAddressProof}
                                  />
                                </Modal>
                                <p style={{ color: "darkgray", paddingRight: '10px' }}>
                                  <FormattedMessage id="agent.AddressProof" />
                                </p>
                                {this.state.receivedAddressProofImage ? (
                                  <>
                                    <button style={{ backgroundColor: "#343A40", fontWeight: "bold", color: "white", borderRadius: "10px", border: "none", padding: "10px" }} onClick={() => {
                                      this.setState({
                                        previewReceivedAddressProofImage: true
                                      });
                                    }}>View Address Proof</button>
                                    {/* <img src={this.state.receivedUploadProofImage} /> */}

                                    <Modal
                                      visible={this.state.previewReceivedAddressProofImage}
                                      title={"Address Proof"}
                                      footer={null}
                                      onCancel={() => {
                                        this.setState({
                                          previewReceivedAddressProofImage: false
                                        });
                                      }}
                                    >
                                      <img
                                        style={{ width: "100%" }}
                                        src={this.state.receivedAddressProofImage}
                                      />
                                    </Modal>
                                  </>
                                ) : <></>}
                              </div>
                            </div>
                          </div>
                        </>
                      )}

                      {this.state.kycMerchantCategory !== "Individual" && this.state.kycMerchantCategory !== "Select Category" && (
                        <>
                          <div className="formCol">
                            <label className="formColLabel">
                              Name of Organization
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Organization Name"
                              name="nameoforganization"
                              value={this.state.nameoforganization}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="formCol">
                            <label className="formColLabel">
                              Registered Date
                            </label>
                            <DatePicker
                              selected={this.state.registereddate}
                              maxDate={new Date()}
                              className="form-control"
                              name="registereddate"
                              onChange={this.registereddate}
                              peekNextMont
                              showMonthDropdown
                              showYearDropdown
                              dropdownMode="select"
                              autoComplete="off"
                            />
                          </div>
                        </>
                      )}

                      {this.state.kycMerchantCategory !== "Individual" && this.state.kycMerchantCategory !== "Select Category" && (
                        <div className="kycDetailsBox">
                          <h1 className="kycDetails textAlignCenter">
                            Business Details
                          </h1>
                          <div className="kycformBox">
                            <div className="formRow">
                              <div className="formCol">
                                <label className="formColLabel">
                                  Website Link
                                </label>
                                <input
                                  type="text"
                                  name="websitelink"
                                  value={this.state.websitelink}
                                  placeholder="aammnnbb@gmail.com"
                                  onChange={this.handleChange}
                                />
                              </div>

                              {this.state.kycMerchantCategory !==
                                "Individual" && this.state.kycMerchantCategory !== "Select Category" && (
                                  <>
                                    <div className="formCol">
                                      <label className="formColLabel">
                                        Trade Register Number
                                      </label>
                                      <input
                                        type="text"
                                        placeholder="237132321312"
                                        name="traderegisternumber"
                                        value={this.state.traderegisternumber}
                                        onChange={this.handleChange}
                                      />
                                    </div>
                                  </>
                                )}

                              <div className="formCol">
                                <label className="formColLabel">
                                  Taxpayer Number{" "}
                                </label>
                                <input
                                  type="text"
                                  placeholder="123456899"
                                  name="taxpayernumber"
                                  value={this.state.taxpayernumber}
                                  onChange={this.handleChange}
                                />
                              </div>
                              <div className="formCol selectedfilew">
                                <div>
                                  <label
                                    className="formColLabel"
                                    style={{ marginBottom: "0px" }}
                                  >
                                    Upload Proof * :{" "}
                                  </label>
                                </div>
                                {this.state.id !== "" && (
                                  <button
                                    className="c_first_pending_BTN"
                                    style={{ marginLeft: "12px" }}
                                    onClick={this.uploadProof}
                                  >
                                    View
                                  </button>
                                )}
                              </div>
                              <div className="formCol selectedfilew">
                                <div>
                                  <label
                                    className="formColLabel"
                                    style={{ marginBottom: "0px" }}
                                  >
                                    Address Proof * :{" "}
                                  </label>
                                </div>

                                {this.state.id !== "" && (
                                  <button
                                    className="c_first_pending_BTN"
                                    style={{ marginLeft: "12px" }}
                                    onClick={this.onTax}
                                  >
                                    View
                                  </button>
                                )}
                              </div>

                              <div className="formCol">
                                <Upload
                                  listType="picture-card"
                                  customRequest={dummyRequest}
                                  fileList={this.state.uploadFile}
                                  onChange={(file) =>
                                    this.handleChangeFile(file, "uploadproof")
                                  }
                                  beforeUpload={() => false}
                                >
                                  {uploadButton}
                                </Upload>
                              </div>
                              <div className="formCol">
                                <Upload
                                  listType="picture-card"
                                  customRequest={dummyRequest}
                                  fileList={this.state.addressFile}
                                  onChange={(file) =>
                                    this.handleChangeFile(file, "addressproof")
                                  }
                                  onPreview={true}
                                  beforeUpload={() => false}
                                >
                                  {uploadButton}
                                </Upload>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {this.state.kycMerchantCategory === "Individual" && (
                        <div className="kycDetailsBox">
                          <h1 className="kycDetails textAlignCenter">
                            <FormattedMessage id="agent.IdentityInformation" />
                          </h1>
                          <div className="kycformBox">
                            <div className="formRow">
                              <div className="formCol">
                                <label className="formColLabel">
                                  <FormattedMessage id="agent.Identification" /><span style={{ color: 'red' }}>*</span>
                                </label>
                                <div className="categorySelect">
                                  <Select
                                    defaultValue=""
                                    value={this.state.identification}
                                    style={{ width: 100 + "%", height: 52 }}
                                    name="identification"
                                    onChange={this.handleChangeSelect}
                                  >
                                    <Option value="">
                                      Select Identification Type
                                    </Option>
                                    <Option value="password"><FormattedMessage id="agent.Passport" /></Option>
                                    <Option value="identity_card">
                                      <FormattedMessage id="agent.IdentityCard" />
                                    </Option>
                                  </Select>
                                </div>
                              </div>
                              <div className="formCol">
                                <label className="formColLabel"><FormattedMessage id="agent.Number" /><span style={{ color: 'red' }}>*</span></label>
                                <input
                                  type="text"
                                  name="number"
                                  value={this.state.number}
                                  placeholder="Enter Number"
                                  onChange={this.handleChange}
                                />
                              </div>
                              <div className="formCol">
                                <label className="formColLabel">
                                  <FormattedMessage id="agent.ExpiryDate" /><span style={{ color: 'red' }}>*</span>
                                </label>
                                <DatePicker
                                  selected={this.state.endofvaliditydate}
                                  minDate={new Date()}
                                  className="form-control"
                                  name="endofvaliditydate"
                                  onChange={this.identityExpiry}
                                  peekNextMont
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  autoComplete="off"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div>
                        <div class="custom-d-flex confirm_p_w mTB00">
                          <button class="blackbtn aryousureBTN confirmBtnR">
                            <FormattedMessage id="agent.Save" />
                          </button>
                          <button
                            class="aryousureBTN confirmBtnR"
                            onClick={this.showOTPModal}
                          >
                            <FormattedMessage id="agent.SaveAndSubmit" />
                          </button>
                        </div>
                        <Modal
                          visible={this.state.OTPModalVisible}
                          onCancel={this.handleCancelOTPModal}
                          footer={null}
                        >
                          <div style={{ textAlign: "center" }}>
                            <h2 style={{ fontSize: '15px' }}>
                              <FormattedMessage id="agent.PleaseEnterVerificationCode" />
                              <br /> {this.state.mobileno}
                            </h2>

                            <OtpInput
                              value={this.state.otp}
                              shouldAutoFocus={true}
                              onChange={(e) => this.setOtp(e)}
                              numInputs={6}
                              seperator={<span></span>}
                              isInputNum={true}
                              inputStyle={{
                                width: "50px",
                                padding: "0px",
                                marginRight: "10px",
                                marginLeft: "10px",
                                fontWeight: "600",
                                fontSize: "16px",
                                lineHeight: "20px",
                                padding: "15px 20px",
                                borderRadius: "5px",
                                border: "1px solid transparent",
                                color: "#DA4139",
                                background: "#F2F2F2",
                                display: "inline-block",
                                boxShadow: "0px 8px 8px rgba(37, 51, 66, 0.15)",
                              }}
                              containerStyle={{
                                paddingLeft: "25px",
                                marginTop: "20px"
                              }}
                            />

                            <div style={{ textAlign: "left", marginTop: "10px", paddingLeft: "25px" }}>
                              <Button
                                type="link"
                                disabled={this.state.isResendOTPDisabled}
                                style={{
                                  color: this.state.isResendOTPDisabled ? "darkgray" : "#066FD0",
                                  paddingLeft: "0px",
                                  fontWeight: "550",
                                }}
                                onClick={() => this.resendOTP()}
                              >
                                <FormattedMessage id="agent.ResendCode" />
                              </Button>
                            </div>

                            <button
                              style={{
                                marginTop: "20px",
                                height: "40px",
                                color: "white"
                              }}
                              disabled={this.state.otp.length < 6 ? true : false}
                              onClick={() => {
                                this.SubmitForm()
                              }}
                              className="btn-default btn"
                            >
                              <FormattedMessage id="agent.Submit" /> KYC
                            </button>
                          </div>
                        </Modal>
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
  }
}

// function for mapping redux state values with props //
const mapStateToProps = ({ agentReducer, commonReducer }) => {

  return {
    kycSendStatus: agentReducer.kycSendStatus,
    kycSendData: agentReducer.kycSendData,
    kycGetStatus: agentReducer.kycGetStatus,
    kycGetData: agentReducer.kycGetData,
    agentOTPStatus: agentReducer.agentOTPStatus,
    profileDetails: agentReducer.profileDetails,
    uploadProofImage: agentReducer.uploadProofImage,
    addressProofImage: agentReducer.addressProofImage,
    language: commonReducer.language,
  }

};

//function for maping with dispatched actions with props //
const mapDispatchToProps = (dispatch) => ({

  sendAgentKYC: (token, payload) =>
    dispatch(sendAgentKYC(token, payload)),
  getAgentKYC: (token) =>
    dispatch(getAgentKYC(token)),
  sendAgentOTP: (payload) =>
    dispatch(sendAgentOTP(payload)),
  getProfile: () =>
    dispatch(getProfile()),

});

export default connect(mapStateToProps, mapDispatchToProps)(KYC);
