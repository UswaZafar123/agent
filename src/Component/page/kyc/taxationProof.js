import React, { Component } from "react";
import { Select, Upload } from "antd";
import validate from "./../resources/validation";
import moment from "moment";
import DatePicker from "react-datepicker";
import { connect } from "react-redux";
import { toastr } from "react-redux-toastr";

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
      kycMerchantCategory: null,
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
    };
  }

  componentDidMount() {
   
  }

  handleChangeSelect = (e) => {
    this.setState({ identification: e });
  };

  setkeyMechantCategory = (e) => {
    this.setState({ kycMerchantCategory: e });
  };

  componentWillReceiveProps = (nextprops) => {
    if (this.state.refreshtokenState == 0) {
      if (nextprops.getKYCDetailsStatus) {
        // this.setState({
        // 	refreshtokenState: this.state.refreshtokenState+1
        // });

        let record = nextprops.getKYCDetails.kyc;

        //let dateOfBirthValue = new Date();

        if (record) {
          this.setState({ record: nextprops.getKYCDetails.kyc });

          if (record.dateofbirth != "Invalid date" && record.dateofbirth) {
            var dateOfBirthValue = new Date(
              record.dateofbirth
                .toString()
                .replace(/(\d{2})-(\d{2})-(\d{4})/, "$3/$1/$2")
            );
            console.log(record.dateofbirth, "dateOfbirth");
          } else {
            var dateOfBirthValue = null;
          }
        }

        //console.log(dateOfBirthValue,"date obj")
        if (record) {
          this.setState(
            {
              kycMerchantCategory: record.client,
              id: record.id ? record.id : "",
              client: record.client,
              merchantType: record.client,
              name: record.name,
              dateOfBirthValue: dateOfBirthValue,
              emailid: record.emailid,
              mobileno: record.mobileno,
              addressone: record.addressone,
              addresstwo: record.addresstwo,
              city: record.city,
              //	merchantType: record.merchantType,
              state: record.state,
              country: record.country,
              zipcode: record.zipcode,
              longitude: record.longitude,
              latitude: record.latitude,
              getGeneralInfoStatus: true,
              formValid: true,
              businessId: record.businessdetails
                ? record.businessdetails.id
                : null,
            },
            () => {
              console.log(this.state.merchantType, "callbackvaluetype");
              if (this.state.client === "BusinessClient") {
                if (record.businessdetails) {
                  if (
                    new Date(record.businessdetails.registereddate) !==
                      "Invalid Date" &&
                    !isNaN(new Date(record.businessdetails.registereddate))
                  ) {
                    var registereddate = new Date(
                      record.businessdetails.registereddate
                        .toString()
                        .replace(/(\d{2})-(\d{2})-(\d{4})/, "$3/$1/$2")
                    );
                  } else {
                    registereddate = null;
                  }
                }
                if (record.businessdetails) {
                  this.setState(
                    {
                      nameoforganization:
                        record.businessdetails.nameoforganization,
                      registereddate,
                      categories: record.businessdetails,
                      websitelink: record.businessdetails.websitelink,
                      traderegisternumber:
                        record.businessdetails.traderegisternumber,
                      taxpayernumber: record.businessdetails.taxpayernumber,
                      uploadproof: record.businessdetails.companyregisterproof,
                      showuploadproof:
                        record.businessdetails.companyregisterproof,
                      showaddressproof:
                        record.businessdetails.taxationofficeaddressproof,
                      comRegProofContentType:
                        record.businessdetails.companyRegProofContentType,
                      taxProofContentType:
                        record.businessdetails.taxOfficeAddressProofContentType,
                      addressproof:
                        record.businessdetails.taxationofficeaddressproof,
                      edit: true,
                      uploadproofValid: true,
                      traderegisternumberValid: true,
                      taxpayernumberValid: true,
                      addressproofValid: true,
                      registereddateValid: true,
                      nameoforganizationValid: true,
                      merchantTypeValid: true,
                    },
                    () => {
                      //this.validateForm()
                    }
                  );
                }
              }
              if (this.state.client == "PrivateClient") {
                let dateofdelivery = new Date(
                  record.identityInformation.dateofdelivery
                );
                let endofvaliditydate = new Date(
                  record.identityInformation.endofvaliditydate
                );
                this.setState({
                  kycMerchantCategory: "Individual",
                  identification: record.identityInformation.identification,
                  number: record.identityInformation.number,
                  dateofdelivery,
                  stateofdelivery: record.identityInformation.stateofdelivery,
                  endofvaliditydate,
                  comRegProofContentType:
                    record.identityInformation.uploadProofContentType,
                  taxProofContentType:
                    record.identityInformation.addressProofContentType,
                  addressproof: record.identityInformation.addressproof,
                  formValid: true,
                });
              }
            }
          );
        }
      } else {
        this.setState({
          sampleState: true,
        });
      }
    }
  };

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
    console.log(e.target.value, "valueeeee");
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

    console.log(fileList, "fileList");

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

        console.log(this.state.addressproof, "thisstateuploadproof");
        console.log(this.state.uploadproof, "thisstateuploadproof");
        console.log(dateofbirth, "thisstateuploadproof");

        if (id !== "") {
          this.props.addKYCdetails(token, formData, true, submitionEmail);
        } else {
          this.props.addKYCdetails(token, formData, false, submitionEmail);
        }
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

        console.log(this.state.addressproof, "thisstateuploadproof");
        console.log(this.state.uploadproof, "thisstateuploadproof");
        console.log(dateofbirth, "thisstateuploadproof");

        if (id !== "") {
          this.props.addKYCdetails(token, formData, true, submitionEmail);
        } else {
          this.props.addKYCdetails(token, formData, false, submitionEmail);
        }
      }
  };

  dob = (date) => {
    this.setState({
      dateOfBirthValue: date,
    });
  };

  registereddate = (date) => {
    this.setState({
      registereddate: date,
    });
  };

  render() {
    console.log(this.state);

    const uploadButton = (
      <div>
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div className="main_contain kyc_parent_m">
        <div className="merch_m_list_w">
          <h1 className="m_listHeading textAlignCenter pd_t_b24">
            Agent Management{" "}
          </h1>
          <div className="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="kyccustomformheading">
                      <h1 className="list_top_heading textAlignCenter text-center">
                        KYC Form
                      </h1>
                      <button className="c_first_pending_BTN">Cancel</button>
                    </div>
                  </div>
                  <div
                    className="kyccustomform chartCardMiddle"
                    style={{ padding: "24px" }}
                  >
                    <h1 className="kycDetails"> Profile Details</h1>
                    <div className="kycDetailsBox">
                      {/* <h1 className="kycDetails textAlignCenter">
                       
                      </h1> */}
                      <div className="kycformBox">
                        <div className="formRow">
                          <div className="formCol">
                            <label className="formColLabel">Category </label>
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
                                <Option value="Individual">Individual</Option>
                                <Option value="ETS">ETS</Option>
                                <Option value="SAS">SAS</Option>
                                <Option value="SA">SA</Option>
                                <Option value="SARL">SARL</Option>
                              </Select>
                            </div>
                          </div>
                          <div className="formCol"></div>
                          <div className="formCol">
                            <label className="formColLabel">Name</label>
                            <input
                              type="text"
                              name="name"
                              placeholder="Enter Name"
                              value={this.state.name}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="formCol">
                            <label className="formColLabel">
                              Date of Birth
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
                            <label className="formColLabel">Email Id</label>
                            <input
                              type="text"
                              name="emailid"
                              placeholder="abc@gmail.com"
                              value={this.state.emailid}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="formCol">
                            <label className="formColLabel">
                              Mobile Number
                            </label>
                            <input
                              type="text"
                              name="mobileno"
                              placeholder="237132321312"
                              value={this.state.mobileno}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="formCol">
                            <label className="formColLabel">Address 1</label>
                            <input
                              type="text"
                              name="addressone"
                              placeholder="Address 1"
                              value={this.state.addressone}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="formCol">
                            <label className="formColLabel">Address 2</label>
                            <input
                              type="text"
                              name="addresstwo"
                              placeholder="Address 2"
                              value={this.state.addresstwo}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="formCol">
                            <label className="formColLabel">City</label>
                            <input
                              type="text"
                              name="city"
                              placeholder="Enter City"
                              value={this.state.city}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="formCol">
                            <label className="formColLabel">Zip Code</label>
                            <input
                              type="text"
                              name="zipcode"
                              placeholder="Enter Code"
                              value={this.state.zipcode}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="mapformrow formRow">
                          <div className="formCol">
                            <label className="formColLabel">Longitutde</label>
                            <input
                              type="text"
                              placeholder="55.3781° N"
                              name="longitutde"
                              value={this.state.longitude}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="formCol">
                            <label className="formColLabel">Latitude</label>
                            <input
                              type="text"
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
                            Geolocation
                          </button>
                        </div>
                      </div>
                    </div>
                    {this.state.kycMerchantCategory == "Individual" && (
                      <>
                        <div className="formCol selectedfilew">
                          <div>
                            <label
                              className="formColLabel"
                              style={{ marginBottom: "0px" }}
                            >
                              Upload Proof * :{" "}
                            </label>
                            {/* <label
                                  className="formColLabel colorfileSele"
                                  style={{ marginBottom: "0px" }}
                                >
                                  {this.state.uploadproof && (
                                    <>
                                      <span>File Selected </span> <br />
                                      <span>{this.state.uploadproofName}</span>
                                    </>
                                  )}
                                </label> */}
                          </div>

                          {this.state.id !== "" && (
                            <button
                              className="c_first_pending_BTN"
                              style={{ marginLeft: "12px" }}
                              onClick={this.uploadProofPrivate}
                            >
                              View
                            </button>
                          )}
                        </div>
                        <div className="formCol">
                          {/* <div
                                class="file-upload-wrapper"
                                data-text="No file Selected"
                              > */}
                          {/* <input
                                  type="file"
                                  name="uploadproof"
                                  onChange={this.handleChangeFile}
                                  class="file-upload-field"
                                /> */}

                          <Upload
                            // fileList={this.state.selectedFileList}
                            listType="picture-card"
                            customRequest={dummyRequest}
                            onChange={(file) =>
                              this.handleChangeFile(file, "uploadproof")
                            }
                            fileList={this.state.uploadFile}
                          >
                            {uploadButton}
                          </Upload>
                        </div>
                        <div className="formCol selectedfilew">
                          <div>
                            <label
                              className="formColLabel"
                              style={{ marginBottom: "0px" }}
                            >
                              Address Proof * :{" "}
                            </label>
                            {/* <label
                                  className="formColLabel colorfileSele"
                                  style={{ marginBottom: "0px" }}
                                >
                                  {this.state.addressproof && (
                                    <>
                                      <span>File Selected </span> <br />
                                      <span>{this.state.addressproofName}</span>
                                    </>
                                  )}
                                </label> */}
                          </div>

                          {this.state.id !== "" && (
                            <button
                              className="c_first_pending_BTN"
                              style={{ marginLeft: "12px" }}
                              onClick={this.onTaxPrivate}
                            >
                              View
                            </button>
                          )}
                        </div>

                        <div className="formCol">
                          {/* <input
                                  type="file"
                                  name="addressproof"
                                  onChange={this.handleChangeFile}
                                  class="file-upload-field"
                                /> */}

                          <Upload
                            // fileList={this.state.selectedFileList}
                            listType="picture-card"
                            customRequest={dummyRequest}
                            onChange={(file) =>
                              this.handleChangeFile(file, "addressproof")
                            }
                            fileList={this.state.addressFile}
                            onPreview={true}
                          >
                            {uploadButton}
                          </Upload>
                        </div>
                      </>
                    )}

                    {this.state.kycMerchantCategory !== "Individual" && (
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

                    {this.state.kycMerchantCategory !== "Individual" && (
                      <div className="kycDetailsBox">
                        <h1 className="kycDetails textAlignCenter">
                          Bussiness Details
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
                              "Individual" && (
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
                                {/* <label
                                  className="formColLabel colorfileSele"
                                  style={{ marginBottom: "0px" }}
                                >
                                  {this.state.uploadproof && (
                                    <>
                                      <span>File Selected </span> <br />
                                      <span>{this.state.uploadproofName}</span>
                                    </>
                                  )}
                                </label> */}
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
                                {/* <label
                                  className="formColLabel colorfileSele"
                                  style={{ marginBottom: "0px" }}
                                >
                                  {this.state.addressproof && (
                                    <>
                                      <span>File Selected </span> <br />
                                      <span>{this.state.addressproofName}</span>
                                    </>
                                  )}
                                </label> */}
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
                              {/* <div
                                class="file-upload-wrapper"
                                data-text="No file Selected"
                              > */}
                              {/* <input
                                  type="file"
                                  name="uploadproof"
                                  onChange={this.handleChangeFile}
                                  class="file-upload-field"
                                /> */}

                              <Upload
                                // fileList={this.state.selectedFileList}
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
                              {/* <input
                                  type="file"
                                  name="addressproof"
                                  onChange={this.handleChangeFile}
                                  class="file-upload-field"
                                /> */}

                              <Upload
                                // fileList={this.state.selectedFileList}
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
                          Identity Information
                        </h1>
                        <div className="kycformBox">
                          <div className="formRow">
                            <div className="formCol">
                              <label className="formColLabel">
                                Identification
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
                                    select identification type
                                  </Option>
                                  <Option value="password">Passport</Option>
                                  <Option value="identity_card">
                                    Identity Card
                                  </Option>
                                </Select>
                              </div>
                            </div>
                            <div className="formCol">
                              <label className="formColLabel">Number</label>
                              <input
                                type="text"
                                name="number"
                                value={this.state.number}
                                placeholder="Enter Number"
                                onChange={this.handleChange}
                              />
                            </div>
                            {/* <div className="formCol">
                              <label className="formColLabel">
                                Date of Delivery
                              </label>
                              <input
                                type="text"
                                name="dateofdelivery"
                                placeholder="YYYY-MM-DD"
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="formCol">
                              <label className="formColLabel">
                                State of Delivey
                              </label>
                              <input
                                type="text"
                                name="stateofdelivery"
                                placeholder="Enter State of Delivery"
                                onChange={this.handleChange}
                              />
                            </div>
                            <div className="formCol">
                              <label className="formColLabel">
                                End of validity Date
                              </label>
                              <input
                                type="text"
                                name="endofvaliditydate"
                                placeholder="YYYY-MM-DD"
                                onChange={this.handleChange}
                              />
                            </div> */}
                          </div>
                        </div>
                      </div>
                    )}

                    <div>
                      <div class="custom-d-flex confirm_p_w mTB00">
                        {/* <button class="aryousureBTN" style={{marginRight:"24px"}}>Reject</button> */}
                        <button class="blackbtn aryousureBTN confirmBtnR">
                          Save
                        </button>
                        <button
                          class="aryousureBTN confirmBtnR"
                          onClick={this.SubmitForm}
                        >
                          Save & Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {/* <Modal
          visible={this.state.isModalVisible}
          onCancel={this.handleCancel}
          cancelButtonProps={{style:{ display:'none !important'}}}
          footer={null}
        >
        <div className="modal_w">
          <span className="icon-Asset-58 closeBtn_custom" onClick={this.onCloseHandler}></span>
          <div className="modal_w_in">
            <div className="confirmImg mB36">
              <img src={activeUser} alt="" />
            </div>
            <h2 className="mB36 aryousure">Are you sure you want to Activate User?</h2>
            <div className="confirm_p_w">
              <button className="aryousureBTN">No</button>
              <button className="aryousureBTN confirmBtnR">Yes</button>
            </div>
          </div>
        </div>
          
        </Modal> */}
      </div>
    );
  }
}

// function for mapping redux state values with props //
const mapStateToProps = ({}) => {};

//function for maping with dispatched actions with props //
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(KYC);
