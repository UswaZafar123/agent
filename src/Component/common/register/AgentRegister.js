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

class Login extends Component {
  constructor() {
    super();
    this.state = {
      accountType: "",
      startdate:new Date()
    };
  }



  selectAccountType = (e) => {
    this.setState({accountType:e.target.value});
    alert(e.target.value);
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

    console.log(4586,this.props.merchantLoginStatus);

    return (
      //By using Fragment as parent div will not create an extra dom element //
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
                    <li >
                        <img src={Image1} style={{width:"50%", height:"50%", marginTop:"22%"}} onClick={() => { this.setState({accountType:"client"}) }}/>
                        <input type="radio" id="client" name="account_type_login" value="client" className="mr-3" onChange={this.selectAccountType}/>
                        <label for="client" style={{position: "absolute",fontSize: "18px",marginTop: "24%"}}><b > Client</b></label>
                    </li>
                    <li>
                        <img src={Image2} style={{width:"40%", height:"50%", marginTop:"22%"}}/>
                        <input type="radio" id="agent" name="account_type_login" value="agent" className="mr-3" onChange={this.selectAccountType}/>
                        <label for="agent" style={{position: "absolute",fontSize: "18px",marginTop: "24%"}}><b > Agent</b></label>
                    </li>
                    <li>
                        <img src={Image3} style={{width:"50%", height:"50%", marginTop:"22%"}}/>
                        <input type="radio" id="merchant" name="account_type_login" value="merchant" className="mr-3" onChange={this.selectAccountType}/>
                        <label for="merchant" style={{position: "absolute",fontSize: "18px",marginTop: "24%"}}><b > Merchant</b></label>
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

            <div className="row"  style={{display:"none"}} >

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
            </div>

            <div className="row" >

              <h1 className="sub-title">Individual Account</h1>




              <div className="col-md-12 float-left" style={{float:"left"}}>


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
                          // value={this.state.phone}
                          onChange={(value, country, e, formattedValue) => this.handleChangeMobile(value, country, e, formattedValue)}
                        />
                      </div>
              </div>

              <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                      <label>
                        <FormattedMessage id="idCardNumber" />{" "}
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control" 
                          type="text"
                          name="loginPassword"
                          value={loginPassword}
                          placeholder="Phone Number"
                          onChange={this.handleChange}
                        />
                      </div>
              </div>

              
                <div className="col-md-12" style={{display:"flex", justifyContent:"space-between"}}>
                <div className="col-md-6 float-left" style={{float:"left", marginRight:"5px"}}>
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
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
                        <DatePicker selected={this.state.startdate} dateFormat="dd-MM-yyyy" isClearable />
                      </div>
              </div>


                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                      <label>
                        Company Bussiness Documents
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input type="file" name="company_bussiness_document"/>
                      </div>
                </div>


              <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                      <label>
                        NIU <span className="optional"> (optional)</span>
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control" 
                          type="text"
                          name="loginPassword"
                          value={loginPassword}
                          onChange={this.handleChange}
                        />
                      </div>
              </div>


              <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                      <label>
                        <FormattedMessage id="login.email" /> <span className="optional"> (optional)</span>{" "}
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control" 
                          type="text"
                          name="loginPassword"
                          value={loginPassword}
                          placeholder="Enter Email Address"
                          onChange={this.handleChange}
                        />
                      </div>
              </div>

              <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                      <label>
                        <FormattedMessage id="location" /> {" "}
                      </label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control" 
                          type="text"
                          name="loginPassword"
                          value={loginPassword}
                          placeholder="Fill the location"
                          onChange={this.handleChange}
                        />
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
                      <button className="btn btn-default text-white" onClick={ () => {alert(this.state.accountType)}}>Next</button>
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
                        
                                 <p style={{fontSize:"33px", lineHeight:"39.6px", fontWeight:"500"}}><FormattedMessage id="mobile.verification"/> <br/> +298465456454</p>

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

// function for mapping redux state values with props //
// const mapStateToProps = ({ commonReducer, adminReducer }) => {



//   return {
//     checkLogin: commonReducer.checkLogin,
//     merchantLoginStatus: commonReducer.merchantLoginStatus,
//     userDetails: commonReducer.userDetails,
//     getGeneralInfoData: adminReducer.getGeneralInfoData,
//     getGeneralInfoStatus: adminReducer.getGeneralInfoStatus,
//     twoFactorVerifyOpen: commonReducer.twoFactorVerifyOpen,
//     twoFactorVerifySuccess: commonReducer.twoFactorVerifySuccess,
//     loginError: sessionStorage.getItem("error")
//   };
// };

//function for maping with dispatched actions with props //
// const mapDispatchToProps = (dispatch) => ({
//   LoginService: (payLoad, accessPayload) =>
//     dispatch(LoginService(payLoad, accessPayload)),
//   getGeneralInfo: (title,token) => dispatch(getGeneralInfo(title,token)),
//   twoFactAuth: (payLoad, accessPayload) =>
//     dispatch(twoFactAuth(payLoad, accessPayload)),
// });

//connect method is used for connecting react and redux //
export default Login;
