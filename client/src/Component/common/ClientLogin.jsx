import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { FormattedMessage } from "react-intl";

import { toastr } from "react-redux-toastr";
import NavBar from "./register/NavBar";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      latitude: "",
      longitude: "",
      browser: "",
      os: "",
      ipAddress: "",
      email: "",
      loginPassword: "",
      emailError: "",
      loginPasswordError: null,
      emailValid: false,
      loginPasswordValid: false,
      formValid: false,
      rechaptchaStatus: false,
      twoFactorblock: false,
      logo: "",
      loginFailed: "",
      storage: "",
      type: "password",
      showLoginError: false,
      loginType: "",
    };
  }

  componentDidMount() {
    /**
     * JavaScript Client Detection
     * (C) viazenetti GmbH (Christian Ludwig)
     */
    // this.props.getGeneralInfo(document.title,sessionStorage.getItem("token"));
    sessionStorage.setItem("error", "");
    this.setState({
      loginType: new URLSearchParams(this.props.location.search).get("type"),
    });

    // this.setState({loginFailed:""})

    var unknown = "-";
    // browser
    var nAgt = navigator.userAgent;
    var browser = navigator.appName;

    var nameOffset, verOffset;
    // Opera
    if ((verOffset = nAgt.indexOf("Opera")) !== -1) {
      browser = "Opera";
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf("OPR")) !== -1) {
      browser = "Opera";
    }
    // Edge
    else if ((verOffset = nAgt.indexOf("Edge")) !== -1) {
      browser = "Microsoft Edge";
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
      browser = "Microsoft Internet Explorer";
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
      browser = "Chrome";
    }
    // Safari
    else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
      browser = "Safari";
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
      browser = "Firefox";
    }
    // MSIE 11+
    else if (nAgt.indexOf("Trident/") !== -1) {
      browser = "Microsoft Internet Explorer";
    }
    // Other browsers
    else if (
      (nameOffset = nAgt.lastIndexOf(" ") + 1) <
      (verOffset = nAgt.lastIndexOf("/"))
    ) {
      browser = nAgt.substring(nameOffset, verOffset);
      if (browser.toLowerCase() === browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }

    // system
    var os = unknown;
    var clientStrings = [
      { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
      { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
      { s: "Windows Vista", r: /Windows NT 6.0/ },
      { s: "Windows Server 2003", r: /Windows NT 5.2/ },
      { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
      { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
      { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
      { s: "Windows 98", r: /(Windows 98|Win98)/ },
      { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
      { s: "Windows NT 4.0", r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
      { s: "Windows CE", r: /Windows CE/ },
      { s: "Windows 3.11", r: /Win16/ },
      { s: "Android", r: /Android/ },
      { s: "Open BSD", r: /OpenBSD/ },
      { s: "Sun OS", r: /SunOS/ },
      { s: "Linux", r: /(Linux|X11)/ },
      { s: "iOS", r: /(iPhone|iPad|iPod)/ },
      { s: "Mac OS X", r: /Mac OS X/ },
      { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: "QNX", r: /QNX/ },
      { s: "UNIX", r: /UNIX/ },
      { s: "BeOS", r: /BeOS/ },
      { s: "OS/2", r: /OS\/2/ },
      {
        s: "Search Bot",
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ];
    for (var id in clientStrings) {
      var cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }

    axios.get("http://ip-api.com/json?callback").then((response) => {
      this.setState({
        ipAddress: response.data.query,
      });
    });

    this.setState({
      browser,
      os,
    });
    localStorage.removeItem("statusCode");
    //console.log(localStorage.removeItem("statusCode"),"localstorage")
  }

  // rechaptchaEnable = () =>{
  //     this.setState({
  //         rechaptchaStatus : true
  //     },()=>{
  //         this.validateForm();
  //     })
  // }

  // function for setstating input field values to initial states dynamically //
  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  validateForm = () => {
    const { emailValid, loginPasswordValid } = this.state;
    this.setState({
      formValid: emailValid && loginPasswordValid,
    });
  };

  showHide = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({
      type: this.state.type === "input" ? "password" : "input",
    });
  };

  // submit function for login - for hitting Login API in redux actions //
  handleSubmit = (e) => {
    e.preventDefault();
    let { email, loginPassword, twoFactorblock, ipAddress, browser, os, code } =
      this.state;

    browser = os + "-" + browser;
    let accessPayload = {
      ipAddress,
      browser,
    };
    let payload = {
      email,
      password: loginPassword,
      userType: "MERCHANT",
    };

    if (twoFactorblock) {
      let emailValue = localStorage.getItem("email");
      let payloadAuth = {
        email: emailValue,
        code,
      };
      this.props.twoFactAuth(payloadAuth, accessPayload);
    } else {
      localStorage.setItem("email", this.state.email);
      //   this.props.LoginService(payload, accessPayload);
    }
    localStorage.setItem("email", email);
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.customerLoginStatus) {
      window.location = "/dashboard";
      toastr.success("Login Success");
    } else {
      toastr.error("Invalid Credentitals");
    }
  };

  setLogin = (e) => {
    e.preventDefault();
    sessionStorage.setItem("user_type", "client");

    var payload = {
      username: this.state.mobile,
      password: this.state.password,
      client_id: "PUBLIC_CLIENT",
      grant_type: "password",
    };

    console.log(payload);
    this.props.login(payload);
  };

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

    console.log(4586, this.props.merchantLoginStatus);

    return (
      //By using Fragment as parent div will not create an extra dom element //
      <Fragment>
        <section className="loginWrapper accountWrapper">
          <NavBar />

          <div className="col-md-12 loginContainer">
            <div className="loginInner">
              <div className="loginInform">
                <h4 aria-label="vinod is working">Client Login</h4>

                <div style={{ color: "red" }}>{this.props.login}</div>
                <div style={{ color: "red" }}></div>

                <form onSubmit={this.setLogin}>
                  {twoFactorblock && (
                    <div className="form-group">
                      <label>Two Factor Authentication Code </label>
                      <input
                        type="text"
                        name="code"
                        value={code}
                        maxLength="4"
                        onChange={this.handleChange}
                        className="form-control"
                        placeholder="Two Factor Code"
                      />
                    </div>
                  )}
                  {!twoFactorblock && (
                    <>
                      <div className="form-group">
                        <label>Mobile number</label>
                        <input
                          type="text"
                          name="mobile"
                          autoComplete="off"
                          value={this.state.mobile}
                          onChange={this.handleChange}
                          className="form-control"
                          placeholder="Mobile number"
                        />
                      </div>
                      <div style={{ color: "red" }}>
                        Please enter your mobile number with country code
                        without (+) sign
                      </div>
                      <div style={{ color: "red" }}>{emailError}</div>

                      <div
                        className="form-group"
                        style={{ marginTop: "5%", marginBottom: "5%" }}
                      >
                        <label>
                          <FormattedMessage id="login.password" />{" "}
                        </label>
                        <div style={{ position: "relative", display: "flex" }}>
                          <input
                            className="form-control"
                            type={this.state.type}
                            name="password"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.handleChange}
                          />
                          <div
                            class="input-group-append"
                            onClick={this.showHide}
                          >
                            {this.state.type === "input" &&
                              loginPassword != "" && (
                                <div style={{ cursor: "pointer" }}>
                                  <i
                                    style={{
                                      position: "absolute",
                                      top: "32%",
                                      right: "2%",
                                    }}
                                    className="fa fa-eye"
                                  ></i>
                                </div>
                              )}

                            {this.state.type === "password" &&
                              loginPassword != "" && (
                                <div style={{ cursor: "pointer" }}>
                                  <i
                                    style={{
                                      position: "absolute",
                                      top: "32%",
                                      right: "2%",
                                    }}
                                    className="fa fa-eye-slash"
                                  ></i>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {this.state.showLoginError && (
                    <div style={{ color: "red" }}>{this.props.loginError}</div>
                  )}

                  <div className="form-group">
                    <span>
                      <input type="checkbox" />
                      <label> Remember me</label>
                    </span>
                    <span>
                      <NavLink to="/ForgotPassword" className="forgetPass">
                        <FormattedMessage id="login.forogtpassword" />
                      </NavLink>
                    </span>
                  </div>
                  <div
                    className="form-group"
                    style={{
                      marginTop: "8%",
                      marginBottom: "8%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <button
                      type="submit"
                      className="btn-default btn"
                      style={{ width: "50%" }}
                    >
                      <FormattedMessage id="login.button" />
                    </button>
                  </div>
                </form>

                {/* <GoogleRecaptcha rechaptchaEnable={this.rechaptchaEnable} /> */}
                <p>
                  <FormattedMessage id="login.donthaveanaccount" />
                  <NavLink to="/register">
                    {" "}
                    <FormattedMessage id="register" />
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ commonReducer }) => {
  console.log(commonReducer, "commonReducer");

  return {
    customerLoginStatus: commonReducer.customerLoginStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  login: (payload) => dispatch(login(payload)),
});

//connect method is used for connecting react and redux //
export default connect(mapStateToProps, mapDispatchToProps)(Login);
