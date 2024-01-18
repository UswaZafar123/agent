import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FormattedMessage, useIntl, injectIntl } from "react-intl";
import Image1 from "../../../Assets/images/MerchantRegister.png";
import Image2 from "../../../Assets/images/Flat.png";
import Image3 from "../../../Assets/images/Group (1).png";
import ImageBackground from "../../../Assets/images/BG-2.png";
import Logo from "../../../Assets/images/logo.png";
import Dropzone from 'react-dropzone'
import PhoneInput from 'react-phone-input-2'
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faCamera,faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import NavBar from "./NavBar";
import ReactFlagsSelect from 'react-flags-select';
import Back from  "../../../Assets/images/back.png";
import { ReactCountryDropdown } from 'react-country-dropdown'
import 'react-country-dropdown/dist/index.css'
import validate from "../../resources/validation";
import { counter } from "@fortawesome/fontawesome-svg-core";
import Moment from 'moment';


class CustomerRegister extends Component {
  constructor() {
    super();
    this.state = {
      registrationType: "",
      startdate:new Date(),
      showEnterMobileNo:false,
      showMobileVerification:false,
      verifyOtp:false,
      showMobileSubscription:false,
      passwordType:"password",
      confirmPasswordType:"password",
      customeRegAccountType:false,
      selected:"",
      countryCode:null,
      locale:null,
      idDocumet:null,
      dob:null,
      currency:null,
      idDocumentType:null,
      expireDate:new Date(),
      files:[]
    };
  }

  setSelected = (code) => {
    this.setState({selected:code})
  }


  	// function for setstating input field values to initial states dynamically //
	handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
	}

  selectAccountType = (e) => {
    this.setState({registrationType:e.target.value});
  }


  handleSelect = (country) => {
    console.log(country)
    this.setState({countryCode:country});
  }

  verifyOTP = () => {
    this.setState({verifyOtp:true});
  }

  selectLanguage = (e) => {
    this.setState({locale:e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    // const data = {
    //   countryCode:"SG",
    //   phoneNumber:"+6591383795",
    //  idDocumentType:"ID_CARD",
    //   idDocumentFile:this.state.uploadyourimage,
    //   idDocumentNumber:"6596565V",
    //   idDocumentExpiryDate:"2021-01-01",
    //   emailAddress:"that.saravanan94@gmail.com",
    //   uin:"12345665",
    //   tcAccepted:true,
    //   locale:"en",
    //   currencyCode:"SGD",
    //   agentBankerPhoneNumber:"76586586",
    //   firstName:"sara",
    //   lastName:"Sara",
    //   registrationType:"NON_EXISTING_BANK_CUSTOMER"


    // }

    console.log(this.state.files,'this.state.files.');
    let formData = new FormData();

    formData.append('countryCode',this.state.countryCode);
    formData.append('phoneNumber',this.state.mobile);
    formData.append('idDocumentType','ID_CARD');
    this.state.files.forEach((file) => {
      console.log('file data',file);
      formData.append('idDocumentFile',file);
    })
    formData.append('idDocumentNumber','6596565V');
    // formData.append('idDocumentExpiryDate','2021-03-03');
    formData.append('idDocumentExpiryDate',Moment(this.state.expireDate).format('YYYY-MM-DD'));
    formData.append('emailAddress',this.state.emailAddress);
    formData.append('uin',this.state.uin);
    formData.append('tcAccepted',true);
    formData.append('locale','en');
    formData.append('currencyCode',this.state.currency);
    formData.append('agentBankerPhoneNumber','SG');
    formData.append('dateOfBirth',Moment(this.state.dob).format('YYYY-MM-DD'));
    // formData.append('dateOfBirth','2021-03-03');

    formData.append('address',this.state.address);
    formData.append('cityOfResidence',this.state.city);

    if(this.state.registrationType === 'EXISTING_BANK_CUSTOMER') {
      formData.append('bankCustomerId',this.state.bankCustomerId);
      formData.append('registrationType','EXISTING_BANK_CUSTOMER');

    }else {
      formData.append('firstName',this.state.first_name);
      formData.append('lastName',this.state.last_name);
      formData.append('registrationType','NON_EXISTING_BANK_CUSTOMER');
    }

    this.props.RegisterService(formData);
};


handleChangeFile = (e) => {
  if (
    e.target.files[0].type == "application/pdf" ||
    e.target.files[0].type == "image/png" ||
    e.target.files[0].type == "image/jpeg"
  ) {
    var files = e.target.files[0]
    var name = e.target.name
    this.setState({
      [e.target.name]: e.target.files[0],
    })}

    console.log(this.state,'state');

}

  selectIDDocument = (e) => {
    this.setState({idDocumentType:e.target.value})
  }

  selectCurrenct = (e) => {
    this.setState({currency:e.target.value})
  }
  dateofbirth = (date) => {
    console.log((Moment(date).format('DD-MM-YYYY')),'dob')

    this.setState({dob:date});
  }

  setExpireDate = (date) => {
    this.setState({expireDate:date})
  }

  handleChangeMobile = (e) => {
    this.setState({ mobile: e })
    console.log(e);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.customerregister) {
      this.props.history.push({pathname:"/customer/register/verify/account",state:{phone:this.state.mobile}});
    }
  }

  uploadDocuments (file) {
    this.state.files.push(file[0]);
    // this.setState({uploadyourimage:this.state.files});
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

    // const { loginFailed } = this.props.loginStatus;
    const calenderIcon = <FontAwesomeIcon icon={faCalendarAlt} />
    const cameraIcon = <FontAwesomeIcon icon={faCamera}/>

    console.log(4586,this.state);

    return (
      //By using Fragment as parent div will not create an extra dom element //
      <Fragment>
        <section className="loginWrapper accountWrapper">
        <NavBar/>
        <div className="col-md-12 loginContainer">
        <div className="loginInner" style={{ width: "901px" }} >

        <form onSubmit={this.handleSubmit}>
                {
                    !this.state.showMobileSubscription && (
                        <div className="row" >
                        <span className="absolute" style={{cursor:"pointer"}} ><a href="/customer/login"><img src={Back} style={{width:15}}/></a></span>

                        <h1 className="sub-title">Customer Registration</h1>

                        <div className="col-md-12 float-left">
                            <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                                <label>
                                Select Language
                                </label>
                                <div style={{ position: "relative", display: "flex" }}>
                                    <select class="FrmSelect" onChange={this.selectLanguage}>
                                        <option value="en">English</option>
                                        <option value="fr">French</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 float-left">
                            <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                                <label>
                                Select Country
                                </label>
                                <div style={{ position: "relative", display: "flex",width:"100%" }}>
                                  <ReactFlagsSelect
                                        searchable
                                        selected={this.state.countryCode}  
                                        className="countrySelectDrpdwn"
                                        onSelect={code => this.handleSelect(code)}
                                        style={{width:"100%"}}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-12 float-left" style={{display:"flex", justifyContent:"space-between"}}>
                            <button className="btn btn-default text-white" onClick={ () => {this.setState({showMobileSubscription:true})}}>Subscription</button>
                            {/* <button className="btn btn-default text-white" onClick={ () => {this.setState({showMobileVerification:true})}}>Login</button> */}
                        </div>
                        
                </div>

                    )
                }
            
           {
               (this.state.showMobileSubscription && !this.state.customeRegAccountType) && (
                <div className="row" >
                <span className="absolute" style={{cursor:"pointer"}}  onClick={()=>{this.setState({showMobileSubscription:false}); this.setState({customeRegAccountType:false})}}><img src={Back} style={{width:15}}/></span>
                <h1 className="title">Customer Registration</h1>
                <h1 className="sub-title">Please select the type of Account</h1>

                    <div className="col-md-12 float-left">
                        <ul className="account-type-options-2">
                            <li style={{width:"46%", height:"150px", alignItems:"center", paddingBottom:"2%"}} className={""+ (this.state.registrationType === "EXISTING_BANK_CUSTOMER" ? ' active_options' : '')} >
                                <input type="radio" id="bank_account" name="account" value="EXISTING_BANK_CUSTOMER" className="mr-3" onChange={this.selectAccountType}/>
                                <label for="bank_account" style={{width:'55%', textAlign:'center', color:"#343A40", fontSize:"26px",fontWeight:"500"}}>Bank Account Holder</label>
                            </li>
                            <li  style={{width:"46%", height:"150px", alignItems:"center", paddingBottom:"2%"}} className={""+ (this.state.registrationType === "NON_EXISTING_BANK_CUSTOMER" ? ' active_options' : '')}>
                                <input type="radio" id="non_bank_account" name="account" value="NON_EXISTING_BANK_CUSTOMER" className="mr-3" onChange={this.selectAccountType}/>
                                <label for="non_bank_account" style={{width:'55%', textAlign:'center', color:"#343A40",fontSize:"26px", fontWeight:"500"}}> Non-Bank Account Holder</label>                    
                            </li>
                        </ul>
                    </div>


                    <div className="col-md-12 float-left" style={{display:"flex", justifyContent:"center"}}>
                            <button className="btn btn-default text-white" onClick={ () => {this.setState({customeRegAccountType:true})}}>Next</button>
                        </div>
                </div>

               )
           }

           {
               (this.state.customeRegAccountType) && (
                <div className="row" >
                <span className="absolute" style={{cursor:"pointer"}}  onClick={()=>{this.setState({showMobileSubscription:true}); this.setState({customeRegAccountType:false})}}><img src={Back} style={{width:15}}/></span>
                <h1 className="sub-title">Customer Registration</h1>
                <div className="col-md-12 float-left">

                {
                  this.state.registrationType === 'EXISTING_BANK_CUSTOMER' && (
                   <>
                    <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                          <label>
                            Bank Customer ID <span class="required">*</span>
                          </label>
                          <div style={{ position: "relative", display: "flex" }}>
                            <input
                              className="form-control" 
                              type="text"
                              name="bankCustomerId"
                              value={this.state.bankCustomerId}
                              onChange={this.handleChange}
                              placeholder="Enter ank Customer ID"
                            />
                          </div>
                  </div>
{/* 
                  <div className="col-md-12 float-left">
                            <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                                <label>
                                Select Country
                                </label>
                                <div style={{ position: "relative", display: "flex",width:"100%" }}>
                                  <ReactFlagsSelect
                                        selected={this.state.countryCode}  
                                        className="countrySelectDrpdwn"
                                        onSelect={code => this.handleSelect(code)}
                                        style={{width:"100%"}}
                                    />
                                </div>
                            </div>
                        </div> */}
                   </>
                  )
                }

                {
                  this.state.registrationType !== 'EXISTING_BANK_CUSTOMER' && (
                    <>
                                    <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                          First Name <span class="required">*</span>
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <input
                            className="form-control" 
                            type="text"
                            name="first_name"
                            value={this.state.first_name}
                            onChange={this.handleChange}
                            placeholder="Enter your First Name"
                          />
                        </div>
                </div>

                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                          Last Name <span class="required">*</span>
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <input
                            className="form-control" 
                            type="text"
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                            placeholder="Enter your Last Name"
                          />
                        </div>
                </div>
                    </>
                  )}





        {
                  this.state.registrationType !== 'EXISTING_BANK_CUSTOMER' && (
                   <>
                    <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                    <label>
                   Date of Birth
                    </label>
                    <div style={{ position: "relative", display: "flex" }}>
                     <DatePicker isClearable selected={this.state.dob}  onChange={(date) => this.dateofbirth(date)} />
                         <span style={{position:"absolute", right:"3%", top:"16%", color:"#979798", fontSize:"24px"}}>{calenderIcon}</span>
                    </div>
            </div>

                   </>
                  )
                }


                <div className="col-md-12 float-left">
                            <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                                <label>
                                Enter Phone Number <span class="required">*</span>
                                </label>
                                <div style={{ position: "relative", display: "flex" }}>
                                    <PhoneInput
                                    country='cm'
                                    enableSearch={true}
                                    disableSearchIcon={true}
                                    searchPlaceholder="Search for countries.."
                                    inputStyle={{ width: '100%' }}
                                    onChange={(value, country, e, formattedValue) => this.handleChangeMobile(value, country, e, formattedValue)}
                                    />
                                </div>
                            </div>
                        </div>


              <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}} className="idFile">
                        <label>
                         ID File  <span class="required">*</span>
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                        <Dropzone onDrop={acceptedFiles => this.uploadDocuments(acceptedFiles)} >
                          {({getRootProps, getInputProps}) => (
                            <section className="dropzone">
                              <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <p>Drag 'n' drop some files here, or click to select files</p>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                        </div>
                </div>



                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                         ID Document
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <select className="FrmSelect" onChange={(e)=>{this.selectIDDocument(e)}}>
                              <option value="ID_CARD">ID Card</option>
                              <option value="Passport">Passport</option>
                          </select>
                        </div>
                </div>


                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                          Customer ID Number   <span class="required">*</span>
                          {/* <span class="optional">(Optional)</span> */}
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <input
                            className="form-control" 
                            type="text"
                            name="customerIDNo"
                            value={this.state.customerIDNo}
                            onChange={this.handleChange}
                            placeholder="Enter your Customer ID"
                          />
                        </div>
                </div>


                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                        Expiration Date
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                         <DatePicker selected={this.state.expireDate}  onChange={(date) => this.setExpireDate(date)}  />
                             <span style={{position:"absolute", right:"3%", top:"16%", color:"#979798", fontSize:"24px"}}>{calenderIcon}</span>
                        </div>
                </div>

                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                          Email ID    <span class="required">*</span>
                          {/* <span class="optional">(Optional)</span> */}
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <input
                            className="form-control" 
                            type="email"
                            name="emailAddress"
                            value={loginPassword}
                            onChange={this.handleChange}
                            placeholder="Enter your email ID"
                          />
                        </div>
                </div>
  

                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                          Unique identification Number (UIN)    <span class="required">*</span>
                          {/* <span class="optional">(Optional)</span> */}
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <input
                            className="form-control" 
                            type="text"
                            name="uin"
                            value={loginPassword}
                            onChange={this.handleChange}
                            placeholder="Enter your UIN number"
                          />
                        </div>
                </div>
                



                {
                  this.state.registrationType !== 'EXISTING_BANK_CUSTOMER' && (
                    <>
                     {/* <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                         Select Currency </label>
                          <div style={{ position: "relative", display: "flex" }}>
                          <select className="FrmSelect" onChange={(e)=>{this.selectCurrenct(e)}}>
                              <option value="USD">USD</option>
                              <option value="LKR">LKR</option>
                          </select>
                          </div>
                  </div> */}


                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                          Select Country Code <span class="required">*</span>
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                                <ReactFlagsSelect
                                         selected={this.state.countryCode}  
                                        className="countrySelectDrpdwn"
                                        onSelect={code => this.handleSelect(code)}
                                        style={{width:"100%"}}
                                    />
                        </div>
                </div>

  

                  <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                          Upload your image <span class="required">*</span>
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <label for="file-upload" class="custom-file-upload" style={{top:"9%", right:"5%"}}>
                              {cameraIcon} <span style={{marginLeft:"2%"}}>Picture</span>
                          </label>
                          {/* <input
                              className="form-control" 
                              type="text"
                              name="uploadyourimage"
                              onChange={this.handleChangeFile}
                              id="uploadyourimage"
                            /> */}
                            <input
                              className="form-control" 
                              type="file"
                              id="file-upload"
                              name="uploadyourimage"
                              onChange={this.handleChangeFile}
                              id="uploadyourimage"
                            />
                        </div>
                </div>



                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                        <label>
                         Address
                          {/* <span class="optional">(Optional)</span> */}
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <input
                            className="form-control" 
                            type="text"
                            name="address"
                            value={this.state.address}
                            onChange={this.handleChange}
                            placeholder="Enter your address"
                          />
                        </div>
                </div>

                <div className="row" style={{display:"flex", justifyContent:"space-between"}}>
                    <div className="col-md-6" style={{width:"48%"}}>
                        <label>
                         Country 
                         {/* <span class="optional">(Optional)</span> */}
                        </label>
                        <ReactFlagsSelect
                             selected={this.state.countryCode}   
                            className="countrySelectDrpdwn"
                            onSelect={code => this.setSelected(code)}
                        />
                    </div>

                    <div className="col-md-6" style={{width:"48%"}}>
                        <label>
                         City 
                         {/* <span class="optional">(Optional)</span> */}
                        </label>
                        <input
                            className="form-control" 
                            type="text"
                            name="city"
                            value={this.state.city}
                            onChange={this.handleChange}
                            placeholder="Enter your city"
                          />
                    </div>
                </div>
  
                    </>
                  )}

               
               
                <div className="row">
                    <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                        <label className="privacy_policy">
                          i agree to the <a>terms & conditions </a> and  <a>privacy policy of sara banking</a>
                        </label>                 
                        
                     </div>
                </div>
                <div className="row">
                    <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                        <button className="btn btn-default text-white"  type="submit">Next</button>
                    </div>
                </div>
  
                <div className="row">
                    <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                        <p>Already have an account? <a>Login</a></p>
                    </div>
                </div>
                  </div>
                </div>
               )
           }

</form>
                        
        </div>

        </div>

        
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ commonReducer }) => {
  return {
    customerregister:commonReducer.customerregister
  };
};

const mapDispatchToProps = (dispatch) => ({
  RegisterService: (payLoad) =>
    dispatch(RegisterService(payLoad)),
});
export default connect(mapStateToProps, mapDispatchToProps) (CustomerRegister);
