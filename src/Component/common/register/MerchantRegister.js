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
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import NavBar from "./NavBar";
import { sendVerification,registration,verifyMerchantAccount } from "../../../services/actions";
import {toastr} from 'react-redux-toastr'
class MerchantRegister extends Component {
  constructor() {
    super();
    this.state = {
      accountType: "",
      startdate:new Date(),
      showEnterMobileNo:true,
      showMobileVerification:false,
      verifyOtp:false,
      passwordType:"password",
      confirmPasswordType:"password",
      mobile:null,
      name:null,
      email:null,
      site:null,
      password:null,
      confirmpassword:null,
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: ""

    };

    this.onInputchange = this.onInputchange.bind(this)
    this.otp1 = React.createRef();
    this.otp2 = React.createRef();
    this.otp3 = React.createRef();
    this.otp4 = React.createRef();
    this.otp5 = React.createRef();
    this.otp6 = React.createRef();
  }


  componentWillReceiveProps (nextProps) {
    console.log(nextProps,'nextProps')
    if(nextProps.accountVerified) {
      this.setState({verifyOtp:true});
    }
  }

  selectAccountType = (e) => {
    this.setState({accountType:e.target.value});
  }

  handleChangeMobile = (e) => {
    this.setState({ mobile: e })
  }

  verifyOTP = () => {
  
    if(this.state.otp1 && this.state.otp2 && this.state.otp3 && this.state.otp4 && this.state.otp5 && this.state.otp6) {
      let pin = this.state.otp1+this.state.otp2+this.state.otp3+this.state.otp4+this.state.otp5+this.state.otp6;
           if(pin != null) {
         let data = {
             "phoneNumber":this.state.mobile,
             "mfaCode":pin
           }
         this.props.verifyMerchantAccount(data);
       }else {
         toastr.warning("please enter correct pin to verify you account")
       }
    }else{
     toastr.warning("please enter correct pin to verify you account")
    }

  }

  sendVerificationOTP = () => {
    this.setState({showMobileVerification:true});

    let data = {
      "phoneNumber":this.state.mobile,
      "locale": "en"
    }
    this.props.sendVerification(data);
  }

  submitForm = () => {
    let data = {
      "merchantName": this.state.name,
      "merchantSiteId": this.state.site,
      "email":this.state.email,
      "password": this.state.password,
      "confirmPassword": this.state.confirmpassword,
      "phoneNo": this.state.mobile,
      "firstName":"FN",
      "lastName":"LN",
      "twoFactorStatus": false
    }

    this.props.registration(data);
    this.props.history.push({pathname:"/merchant/register/success",state:{email:this.state.email}});


  }

  handleChange = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		this.setState({
			[name]: value
		});
  }

  onInputchange(event) {
    console.log(event.target);
    // this.emailInput.current.focus();

    let i ;

    if(event.target.name == "otp1") {
      this.otp2.current.focus();
    }

    if(event.target.name == "otp2") {
      this.otp3.current.focus();
    }

    if(event.target.name == "otp3") {
      this.otp4.current.focus();
    }

    if(event.target.name == "otp4") {
      this.otp5.current.focus();
    }

    if(event.target.name == "otp5") {
      this.otp6.current.focus();
    }



    let name = event.target.name;
    let value = event.target.value;

		this.setState({
			[name]: value
		});
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
    const element = <FontAwesomeIcon icon={faEyeSlash} />

    console.log(4586,this.props.merchantLoginStatus);

    return (
      //By using Fragment as parent div will not create an extra dom element //
      <Fragment>
        <section className="loginWrapper accountWrapper">
        <NavBar/>
        <div className="col-md-12 loginContainer">
        <div className="loginInner" style={{ width: "901px" }} >


            
            
           {
               (this.state.showEnterMobileNo && !this.state.showMobileVerification) && (
                <div className="row" >

                <h1 className="title" >Merchant Account</h1>
                <h1 className="sub-title">Please fill in your mobile phone number!</h1>

                <div className="col-md-12 float-left">
                  <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                          <div style={{ position: "relative", display: "flex" }}>
                              <PhoneInput
                              country='cm'
                              enableSearch={true}
                              disableSearchIcon={true}
                              searchPlaceholder="Search for countries.."
                              inputStyle={{ width: '100%' }}
                              onChange={this.handleChangeMobile}
                          />
                          </div>
                  </div>

                  <div className="row">
                      <p style={{fontSize:"26px", fontWeight:"400", textAlign:"center"}}>By Clicking on Next, you conform that you're entitled to uss this mobile phone number. You also accept to receive automated text messages to confirm the phone number and to take on any related charges that may apply.</p>
                  </div>
  
                  <div className="row">
                      <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                          <button className="btn btn-default text-white" onClick={this.sendVerificationOTP}>Next</button>
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

            {
                this.state.showMobileVerification && !this.state.verifyOtp && (
                    <div className="row" >
                        <div class="col-md-12">
                    
                <p style={{fontSize:"33px", lineHeight:"39.6px", fontWeight:"500"}}><FormattedMessage id="mobile.verification"/> <br/> {this.state.mobile}</p>

                            <div class="row" style={{ justifyContent: 'space-between',width: "65%" }}>
                                    <input autoFocus type="text" name="otp1" className="form-control mt-2 input-mobile" maxLength="1" onChange={this.onInputchange}  style={{textAlign:"center",paddingLeft:"10px"}} />
                                    <input type="text" name="otp2" className="form-control mt-2 input-mobile" maxLength="1"   onChange={this.onInputchange} ref={this.otp2} style={{textAlign:"center",paddingLeft:"10px"}}  />
                                    <input type="text" name="otp3" className="form-control mt-2 input-mobile" maxLength="1"   onChange={this.onInputchange}  ref={this.otp3}  style={{textAlign:"center",paddingLeft:"10px"}}  />
                                    <input type="text" name="otp4" className="form-control mt-2 input-mobile" maxLength="1" onChange={this.onInputchange}  ref={this.otp4}  style={{textAlign:"center",paddingLeft:"10px"}} />
                                    <input type="text" name="otp5" className="form-control mt-2 input-mobile" maxLength="1"   onChange={this.onInputchange}   ref={this.otp5} style={{textAlign:"center",paddingLeft:"10px"}}  />
                                    <input type="text" name="otp6" className="form-control mt-2 input-mobile" maxLength="1"   onChange={this.onInputchange}   ref={this.otp6}  style={{textAlign:"center",paddingLeft:"10px"}} />
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
                                        (value) => <input type="button" className="btn text-white btn-default" value={value} onClick={this.verifyOTP}  />
                                    }
                                </FormattedMessage>

                            </div>
                        </div>
                    </div>  
                )
            }

            {
                this.state.verifyOtp && (
                    <div className="row" >

                    <h1 className="sub-title">Individual Account</h1>
      
      
      
      
                    <div className="col-md-12 float-left">
      
                    <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                            <label>
                              <FormattedMessage id="merchant.name" />{" "}
                            </label>
                            <div style={{ position: "relative", display: "flex" }}>
                              <input
                                className="form-control" 
                                type="text"
                                name="name"
                                onChange={this.handleChange}
                              />
                            </div>
                    </div>

                    <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                            <label>
                              <FormattedMessage id="merchant.site" />{" "}
                            </label>
                            <div style={{ position: "relative", display: "flex" }}>
                              <input
                                className="form-control" 
                                type="text"
                                name="site"
                                onChange={this.handleChange}
                              />
                            </div>
                    </div>


      
                    <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                            <label>
                              Email
                            </label>
                            <div style={{ position: "relative", display: "flex" }}>
                              <input
                                className="form-control" 
                                type="email"
                                name="email"
                                value={loginPassword}
                                onChange={this.handleChange}
                              />
                            </div>
                    </div>
                    <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                            <label>
                              <FormattedMessage id="mobile" />{" "}
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
                              <FormattedMessage id="login.password" />{" "}
                            </label>
                            <div style={{ position: "relative", display: "flex" }}>
                              <input
                                className="form-control" 
                                type={this.state.passwordType}
                                name="password"
                                onChange={this.handleChange}
                              />
                            <span style={{position:"absolute", right:"4%", bottom:"22%", color:"#737373", cursor:"pointer"}}  onClick={() => { 
                                if(this.state.passwordType === "password") {
                                    this.setState({passwordType:"text"})
                                }else{
                                    this.setState({passwordType:"password"})
                                }

                            }}> {element}</span>

                            </div>
                    </div>

                    <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                            <label>
                              <FormattedMessage id="cnfrmpwd" />{" "}
                            </label>
                            <div style={{ position: "relative", display: "flex" }}>
                              <input
                                className="form-control" 
                                type={this.state.confirmPasswordType}
                                name="confirmpassword"
                                onChange={this.handleChange}
                              />
                            <span style={{position:"absolute", right:"4%", bottom:"22%", color:"#737373", cursor:"pointer"}}  onClick={() => { 
                                if(this.state.confirmPasswordType === "password") {
                                    this.setState({confirmPasswordType:"text"})
                                }else{
                                    this.setState({confirmPasswordType:"password"})
                                }

                            }}> {element}</span>

                            </div>
                    </div>
      
                    
                    <h1 style={{fontSize:"36px", lineHeight:"20px", fontWeight:"600"}}>Security Questions</h1>

                    <p style={{color:"red"}}>Security question will help to recover your account when you forgot your password</p>
      
      
      
                      <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                            <label>
                              What's your favorite color?
                            </label>
                            <div style={{ position: "relative", display: "flex" }}>
                              <input type="text" name="company_bussiness_document" placeholder="What's your favorite color?"/>
                            </div>
                      </div>
      
      
                   
                    <div className="row">
                        <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                            <input type="checkbox"/>
                            <label className="privacy_policy">
                              i agree to the <a>terms & conditions </a> and  <a>privacy policy of sara banking</a>
                            </label>                 
                            
                         </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 text-center" style={{justifyContent:"center", display:"flex", marginTop:"5%"}}>
                            <button className="btn btn-default text-white" onClick={this.submitForm}>Next</button>
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
                        
                        
        </div>

        </div>

        
        </section>
      </Fragment>
    );
  }
}

// function for mapping redux state values with props //
const mapStateToProps = ({ merchantReducer,commonReducer }) => {
  console.log(commonReducer,'commonReducer')
  const { registrationStatus } = merchantReducer;
  return {
    registrationStatus:registrationStatus,
    accountVerified:commonReducer.accountVerified
  }
};

const mapDispatchToProps = dispatch => {
  return {
    sendVerification: (mobile) => dispatch(sendVerification(mobile)),
    registration:(data) => dispatch(registration(data)),
    verifyMerchantAccount: (payLoad) =>
    dispatch(verifyMerchantAccount(payLoad)),
  }
}



export default connect(mapStateToProps,mapDispatchToProps) (MerchantRegister);
