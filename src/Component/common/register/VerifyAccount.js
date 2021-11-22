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
import { Row, Col, Tabs, Tab } from 'react-bootstrap';
import { toastr } from 'react-redux-toastr';


class VerifyAccount extends Component {
  constructor(props) {
    super(props);
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
      mobile:props.location.state.phone,
      pin:null,
      otp1: "",
      otp2: "",
      otp3: "",
      otp4: "",
      otp5: "",
      otp6: ""
    };

    console.log(props)

    this.onInputchange = this.onInputchange.bind(this)
    this.otp1 = React.createRef();
    this.otp2 = React.createRef();
    this.otp3 = React.createRef();
    this.otp4 = React.createRef();
    this.otp5 = React.createRef();
    this.otp6 = React.createRef();
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
    
  
};

    componentWillReceiveProps (nextProps) {
        console.log(456);
        console.log(nextProps,'nextpoprs')
        if(nextProps.accountVerified) {
            this.props.history.push({pathname:"/customer/register/set-password",state:{phone:this.state.mobile}});
        }else{
            toastr.error("invalid pin, please try again")
        }

    }




  setPin = () => {
  
   if(this.state.otp1 && this.state.otp2 && this.state.otp3 && this.state.otp4 && this.state.otp5 && this.state.otp6) {
     let pin = this.state.otp1+this.state.otp2+this.state.otp3+this.state.otp4+this.state.otp5+this.state.otp6;
          if(pin != null) {
        let data = {
            "phoneNumber":this.props.location.state.phone,
            "mfaCode":pin
          }
        this.props.verifyAccount(data);
      }else {
        toastr.warning("please enter correct pin to verify you account")
      }
   }else{
    toastr.warning("please enter correct pin to verify you account")
   }
 
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
                        <span className="absolute"><img src={Back} style={{width:15}}/></span>

                        <h1 className="sub-title">Congratulation!</h1>

                        <div className="col-md-12 float-left">
                            <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                            <label style={{textAlign:"center", width:"100%"}}>
                            you have successfully subscribed to SARA, to 
                            activate your subscription, please enter the PIN 
                            Code sent to you via SMS and Email
                            </label>
                            <div style={{ position: "relative", display: "flex", justifyContent:"center" }}>
                            <div class="row" style={{ justifyContent: 'space-between',width: "65%" }}>
                                    <input autoFocus type="text" name="otp1" className="form-control mt-2 input-mobile" maxLength="1" onChange={this.onInputchange}  style={{textAlign:"center",paddingLeft:"10px"}} />
                                    <input type="text" name="otp2" className="form-control mt-2 input-mobile" maxLength="1"   onChange={this.onInputchange} ref={this.otp2} style={{textAlign:"center",paddingLeft:"10px"}}  />
                                    <input type="text" name="otp3" className="form-control mt-2 input-mobile" maxLength="1"   onChange={this.onInputchange}  ref={this.otp3}  style={{textAlign:"center",paddingLeft:"10px"}}  />
                                    <input type="text" name="otp4" className="form-control mt-2 input-mobile" maxLength="1" onChange={this.onInputchange}  ref={this.otp4}  style={{textAlign:"center",paddingLeft:"10px"}} />
                                    <input type="text" name="otp5" className="form-control mt-2 input-mobile" maxLength="1"   onChange={this.onInputchange}   ref={this.otp5} style={{textAlign:"center",paddingLeft:"10px"}}  />
                                    <input type="text" name="otp6" className="form-control mt-2 input-mobile" maxLength="1"   onChange={this.onInputchange}   ref={this.otp6}  style={{textAlign:"center",paddingLeft:"10px"}} />
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="col-md-12 float-left" style={{display:"flex", justifyContent:"center"}}>
                            <button className="btn btn-default text-white" onClick={this.setPin}>Register</button>
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
    accountVerified:commonReducer.accountVerified
  };
};

const mapDispatchToProps = (dispatch) => ({
    verifyAccount: (payLoad) =>
    dispatch(verifyAccount(payLoad)),
});
export default connect(mapStateToProps, mapDispatchToProps) (VerifyAccount);
