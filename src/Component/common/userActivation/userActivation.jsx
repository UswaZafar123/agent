import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FormattedMessage, useIntl, injectIntl } from "react-intl";
import NavBar from "../register/NavBar";
import userActivation from  "../../../Assets/images/userActivation.png";
import userActivation2 from  "../../../Assets/images/activation2.png";
import userActivation3 from  "../../../Assets/images/activation3.png";
import Back from  "../../../Assets/images/back.png";
import Close from "../../../Assets/images/close.png";

class UserActivation extends Component {
  constructor() {
    super();
    this.state = {
        shwVerification:false,
        stp2:false,
        stp3:false,
        stp4:false
    };
  }

 
  render() {



    return (
      <Fragment>
        <section className="loginWrapper accountWrapper">
        <NavBar/>


        <div className="col-md-12 loginContainer">
          <div className="loginInner" >

            <div className="loginInform">
                {
                    !this.state.shwVerification && (
                        <div className="row" >
                                <h1 className="sub-title text-bold">
                                   User Activation
                                </h1>

                                <div className="row dflex-center">
                                    <img src={userActivation} style={{width:184, marginTop:"5%", marginBottom:"5%"}}/>
                                </div>

                                <p>Link to Virtual/ Master/Super Agent to activate your account,after your account is activated you will have the access to your account and you will be ready to view and manage your account</p>

                            <div className="row dflex-center" style={{marginTop:"5%"}}>
                                <button className="btn btn-default" onClick={() => { this.setState({shwVerification:true})}}>Link FB Account</button>
                            </div>
                        </div>
                    )
                }

                {
                    this.state.shwVerification  && !this.state.stp2 && (
                        <div className="row" >
                               <span className="absolute"><img src={Back} style={{width:15}}/></span>

                                <h1 className="sub-title text-bold">
                                    User Activation
                                </h1>

                                <p style={{fontSize:"36px"}}>Please enter your ID code of Virtual/ Master/super agent</p>


                                <div class="row input-otp" style={{ justifyContent: "space-between",width: "100%",height: "90px",display: "flex", marginTop:"5%", marginBottom:"5%" }}>
                                            <input autoFocus type="text" name="otp1" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => {this.onInputchange(e); this.nextComponent.focus()}} />
                                            <input type="text" name="otp2" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => {this.onInputchange(e); this.nextComponent2.focus()}}  ref={c => this.nextComponent=c} />
                                            <input type="text" name="otp3" className="form-control mt-2 input-mobile" maxLength="1" onChange={(e) => {this.onInputchange(e); this.nextComponent3.focus()}}   ref={d => this.nextComponent2=d}/>
                                </div>

                            <div className="row dflex-center" style={{marginTop:"5%"}}>
                                <button className="btn btn-default"  onClick={() => { this.setState({stp2:true})}}>Link FB Account</button>
                            </div>
                        </div>
                    )
                }


                {
                    this.state.stp2 && !this.state.stp3 && (
                        <div className="row" >
                                <span className="absolute"><img src={Back} style={{width:15}}/></span>

                                <h1 className="sub-title text-bold">
                                    User Activation
                                </h1>

                                <h1 className="title">Toony Monny</h1>
                                <p  class="optional">030000000</p>

                                                
                                <div className="form-group" style={{marginTop:"5%", marginBottom:"5%"}}>
                                        <label>
                                        Enter Password
                                        </label>
                                        <div style={{ position: "relative", display: "flex" }}>
                                        <input
                                            className="form-control" 
                                            type="password"
                                            name="loginPassword"
                                            placeholder="Password"
                                        />
                                        </div>
                                </div>

                            <div className="row dflex-center" style={{marginTop:"10%"}}>
                                <button className="btn btn-default" onClick={() => { this.setState({stp3:true})}}>Link</button>
                            </div>
                        </div>
                    )
                }


                {
                    this.state.stp3 && !this.state.stp4 && (
                        <div className="row" >
                                <span className="absolute"><img src={Back} style={{width:15}}/></span>

                                <h1 className="sub-title text-bold">
                                    User Activation
                                </h1>


                                <div className="row dflex-center">
                                    <img src={userActivation2} style={{width:184, marginTop:"5%", marginBottom:"5%"}}/>
                                </div>

                                <p style={{fontSize:"34px", lineHeight:"46px"}}>Please enter your ID code of Virtual/Master/super agent</p>
                                                


                            <div className="row dflex-center" style={{marginTop:"10%"}}>
                                <button className="btn btn-default" onClick={() => { this.setState({stp4:true})}}>Done</button>
                            </div>
                        </div>
                    )
                }


            {
                    this.state.stp4 && (
                        <div className="row" >
                                <span className="absolute" style={{right:"12%", top:"6%" }}><img src={Close} style={{width:20}}/></span>

                                <h1 className="sub-title text-bold" style={{marginTop:"5%"}}>
                                    Your Account activated Successfully !
                                </h1>


                                <div className="row dflex-center">
                                    <img src={userActivation3} style={{width:184, marginTop:"5%", marginBottom:"5%"}}/>
                                </div>

                                <p style={{fontSize:"34px", lineHeight:"46px"}}>Now you can start to carry out transactions 
up to the UV purchased</p>
                                                


                            <div className="row dflex-center" style={{marginTop:"10%"}}>
                                <button className="btn btn-default">Done</button>
                            </div>
                        </div>
                    )
                }

                
            </div>
          </div>
        </div>
        </section>
      </Fragment>
    );
  }
}


export default UserActivation;
