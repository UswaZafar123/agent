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


class Register extends Component {
  constructor() {
    super();
    this.state = {
      accountType: "",
      setExpirationDate:new Date(),
      dob : new Date()
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

  validateForm = () => {
    const { emailValid, loginPasswordValid } = this.state;
    this.setState({
      formValid: emailValid && loginPasswordValid,
    });
  };

  handleChangeMobile = (value, data, event, formattedValue) => {
    this.setState({countyCode : value})
    this.setState({ phone: event.target.value })
  }
  
  selectAccountType = (e) => {
    this.setState({accountType:e.target.value});
  }

  selectIDDocument = (e) => {
    this.setState({idDocumentType:e.target.value})
  }

  uploadDocuments (file) {
    this.setState({frontImage: file[0]})
    // this.setState({uploadyourimage:this.state.files});
  }

  setExpirationDate (date) {
    this.setState({setExpirationDate:date})
  }

  dateofbirth (date) {
    this.setState({dob:date})
  }

  uploadBackSideOfID(file) {
    this.setState({frontBackSide: file[0]})
  }

  submitForm() {
    let data = {
      RegistrationType : 'NON_EXISTING_BANK_CUSTOMER',
      firstName : this.state.firstName,
      lastName : this.state.lastName,
      registrationChannel : 'AGENCY_BANKING_APP',
      registrationSubChannel : 'AGENCY_BANKING_APP',
      agentBusinessName : "HYPERSTAR_AGENCY",
      busincessType : "INDIVIDUAL",
      countryCode: this.state.countryCode,
      phoneNo : this.state.mobile,
      phoneNumberCountryCode : this.state.countryCode,
      locale: sessionStorage.getItem("locale"),
      idDocumentName : this.state.idDocumentType,
      idDocumentType : this.state.idDocumentType,
      idDocumentIdNumber : this.state.idDocumentIdNumber,
      agentEmailAddress : this.state.agentEmailAddress,
      agentDOB : this.state.countryCode,
      agentBusinessAddress : this.state.address1,
      idDocumentImages : this.state.frontImage,
      agentType : "AGENT",

    }
    // this.props.RegisterService(data);

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



    return (
      <Fragment>
        <section className="loginWrapper accountWrapper">
        <NavBar/>


        <div className="col-md-12 loginContainer">

        <div className="loginInner" style={{ width: "901px" }}  >
            <div className="row"  style={{display:"none"}}>
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
                        <img src={Image2} style={{width:"40%", height:"50%", marginTop:"22%"}}/>
                        <input type="radio" id="agent" name="account_type_login" value="agent" className="mr-3" onChange={this.selectAccountType}/>
                        <label for="agent" style={{position: "absolute",fontSize: "18px",marginTop: "24%"}}><b > AFB Customer</b></label>
                    </li>
                    <li>
                        <img src={Image3} style={{width:"50%", height:"50%", marginTop:"22%"}}/>
                        <input type="radio" id="merchant" name="account_type_login" value="merchant" className="mr-3" onChange={this.selectAccountType}/>
                        <label for="merchant" style={{position: "absolute",fontSize: "18px",marginTop: "24%"}}><b > Non-AFB Customer</b></label>
                    </li>
                </ul>


                <div className="col-md-12">
                    <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"12%"}}>
                        <button className="btn btn-default text-white" onClick={ () => {alert(this.state.accountType)}}>Next</button>
                    </div>
                </div>

                <div className="row">
                  <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
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

            <div className="row" style={{display:"block"}}>

              <h1 className="sub-title">Individual Account</h1>




              <div className="col-md-12 float-left" style={{float:"left"}}>


                  <div className="form-group " style={{marginTop:"5%", marginBottom:"5%"}}>
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

                <div className="form-group col-md-6" style={{marginTop:"5%", marginBottom:"5%"}}>
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

                <div className="form-group">
                            <label>
                             Phone Number
                            </label>
                            <div style={{ position: "relative", display: "flex" }}>
                              <PhoneInput
                                country='cm'
                                enableSearch={true}
                                disableSearchIcon={true}
                                searchPlaceholder="Search for countries.."
                                inputStyle={{ width: '100%' }}
                                value={this.state.mobile}
                                onChange={this.handleChangeMobile}
                            />
                            </div>
                    </div>


                    <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                          <label>
                            Date Of Birth
                          </label>
                          <div style={{ position: "relative", display: "flex" }}>
                            <DatePicker selected={this.state.dob} dateFormat="dd-MM-yyyy" isClearable onChange={(date) => this.dateofbirth(date)}   />
                          </div>
                  </div>

                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                         ID Type
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <select className="FrmSelect" onChange={(e)=>{this.selectIDDocument(e)}}>
                              <option value="ID_CARD">ID Card</option>
                              <option value="Passport">Passport</option>
                          </select>
                        </div>
                </div>


                <div className="form-group col-md-6" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                          ID Card Number
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



                <div className="col-md-12" style={{display:"flex", justifyContent:"space-between"}}>
                <div className="col-md-6 float-left" style={{float:"left", marginRight:"5px"}}>
                <Dropzone onDrop={acceptedFiles => this.uploadDocuments(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                  <section className="dropzone">
                    <div {...getRootProps()} style={{display:"flex", justifyContent:"center"}}>
                      <input {...getInputProps()} />
                      <p>Upload front image of ID cart/other Identity card  <button className="btn">Choose File</button>
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
                </div>
                <div className="col-md-6 float-left" style={{float:"left",display:"flex", justifyContent:"center", marginLeft:"5px"}}>
                <Dropzone onDrop={acceptedFiles => this.uploadBackSideOfID(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                  <section className="dropzone">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Upload back image of ID cart/other Identity card <button className="btn">Choose File</button></p>
                    </div>
                  </section>
                )}
              </Dropzone>
                </div>
                </div>


              <div className="row">
                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                      <label>
                        <FormattedMessage id="expirationDate" />{" "}
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <DatePicker selected={this.state.setExpirationDate} dateFormat="dd-MM-yyyy" isClearable onChange={ (date) => this.setExpirationDate(date)}   />
                      </div>
              </div>



              <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
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


              <h1 style={{fontSize:"36px", lineHeight:"20px", fontWeight:"600"}}>Business Details</h1>



             
              <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
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

                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                      <label>
                          Registeted Date
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <DatePicker selected={this.state.startdate} dateFormat="dd-MM-yyyy" isClearable />
                      </div>
              </div>


              <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
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

              <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
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

              <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
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

              <div className="col-md-12" style={{display:"flex", justifyContent:"space-between"}}>
                <div className="col-md-6 float-left" style={{float:"left", marginRight:"5px"}}>
                <Dropzone onDrop={acceptedFiles => this.uploadDocuments(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                  <section className="dropzone">
                    <div {...getRootProps()} style={{display:"flex", justifyContent:"center"}}>
                      <input {...getInputProps()} />
                      <p>Upload front Image of ID card <button className="btn">Choose File</button>
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
                </div>
                <div className="col-md-6 float-left" style={{float:"left",display:"flex", justifyContent:"center", marginLeft:"5px"}}>
                <Dropzone onDrop={acceptedFiles => this.uploadBackSideOfID(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                  <section className="dropzone">
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Upload address proof images<button className="btn">Choose File</button></p>
                    </div>
                  </section>
                )}
              </Dropzone>
                </div>
                </div>
              <div className="row">
                  <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                      <label className="privacy_policy">
                        i agree to the <a>terms & conditions </a> and  <a>privacy policy of sara banking</a>
                      </label>                 
                      
                   </div>
              </div>
              <div className="row">
                  <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                      <button className="btn btn-default text-white" onClick={ () => this.submitForm()}>Next</button>
                  </div>
              </div>

              <div className="row">
                  <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                      <p>Already have an account? <a>Login</a></p>
                  </div>
              </div>
                </div>
              </div>
            </div>


            <div className="row" style={{display:"none"}}>
            <div class="col-md-12">
                        
                <p style={{fontSize:"33px", lineHeight:"39.6px", fontWeight:"500"}}><FormattedMessage id="mobile.verification"/> <br/> +{this.state.phone}</p>

                                <div class="row input-otp" style={{ justifyContent: "space-between",width: "100%",height: "90px",display: "flex" }}>
                                    <input autoFocus type="text" name="otp1" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => {this.onInputchange(e); this.nextComponent.focus()}} />
                                    <input type="text" name="otp2" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => {this.onInputchange(e); this.nextComponent2.focus()}}  ref={c => this.nextComponent=c} />
                                    <input type="text" name="otp3" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => {this.onInputchange(e); this.nextComponent3.focus()}}   ref={d => this.nextComponent2=d}/>
                                    <input type="text" name="otp4" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => {this.onInputchange(e); this.nextComponent4.focus()}}  ref={a => this.nextComponent3=a}/>
                                    <input type="text" name="otp5" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => {this.onInputchange(e); this.nextComponent5.focus()}}  ref={b => this.nextComponent4=b}/>
                                    <input type="text" name="otp6" className="form-control mt-2 input-mobile" maxLength="1" onChange={this.onInputchange} ref={c => this.nextComponent5=c}/>
                                </div>
                                <div className="row">
                                    {
                                        this.state.showError &&
                                        <p style={{ color: "red" }}>Invalid OTP</p>
                                    }
                                </div>
                                <div className="row mt-4">
                                    <p style={{color:"#066FD0", fontSize:"28px"}}><FormattedMessage id="register.privateAccount.resendCode" /></p>
                                </div>

                                <div class="row mt-3" style={{display:"flex", justifyContent:"center"}}>
                                    <FormattedMessage id="register.verify">
                                        {
                                            (value) => <input type="button" disabled={this.state.otp1 && this.state.otp2 && this.state.otp3 && this.state.otp4 && this.state.otp5 && this.state.otp6 ? false : true} className="btn text-white btn-default" value={value} onClick={this.verifyOTP}  />
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
// const mapStateToProps = ({ commonReducer, adminReducer }) => {



//   return {
//     checkLogin: commonReducer.checkLogin,
//   };
// };

// const mapDispatchToProps = (dispatch) => ({
//   RegisterService: (payLoad, accessPayload) =>
//     dispatch(RegisterService(payLoad, accessPayload)),
// });

//connect method is used for connecting react and redux //
export default Register;
