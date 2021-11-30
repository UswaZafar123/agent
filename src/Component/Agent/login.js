import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import validate from "./resources/validation";
import axios from "axios";
import { FormattedMessage, IntlProvider, injectIntl } from "react-intl";
import Logo from "./../../Assets/images/logo.png";
import NavBar from "./../common/register/NavBar";
import { loginAgent, loginAgentFailure } from "../../services/agent/action.js";

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
      messages: "",
    };
  }

  loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../i18n/messages/fr.js");
      default:
        return import("../i18n/messages/en.js");
    }
  };

  language = async (value) => {
    // this.setState({ language: value });

    console.log(value, "valueee");

    const messages = await this.loadLocaleData(value);
    console.log(messages, "messages");
    this.setState({ messages });
  };

  async componentDidMount() {
    const messages = await this.loadLocaleData(localStorage.getItem("langu"));
    this.setState({ messages });

    /**
     * JavaScript Client Detection
     * (C) viazenetti GmbH (Christian Ludwig)
     */
    // this.props.getGeneralInfo(document.title,sessionStorage.getItem("token"));
    sessionStorage.setItem("error", "");
    this.setState({
      loginType: new URLSearchParams(this.props.location.search).get("type"),
    });

    this.props.loginAgentFailure();
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
    let {
      email,
      loginPassword,
      twoFactorblock,
      ipAddress,
      browser,
      os,
      code,
    } = this.state;

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
    let userType;

    if (nextProps.agentLoginstatus) {
      this.setState({ loginPasswordError: null });
      this.setState({ showLoginError: false });

      window.location = "/agent";
    } else {
      this.setState({ showLoginError: true });

      this.setState({
        loginPasswordError: "Incorrect email address or password",
      });
    }

    if (nextProps.twoFactorVerifyOpen) {
      this.setState({
        twoFactorblock: true,
      });
    }

    if (nextProps.twoFactorVerifySuccess) {
      this.props.history.push("/user");
    }

    if (nextProps.getGeneralInfoData) {
      let data = nextProps.getGeneralInfoData.setting;

      console.log(data, "setting");

      if (data.favicon) {
        this.setState(
          {
            logo: data.logo,
          },
          () => {
            let data = this.props.getGeneralInfoData.setting;
            localStorage.setItem("favicon", data.favicon);
            localStorage.setItem("appTitle", data.name);
            document.changeDocTitle();
          }
        );
      }
    }

    if (!nextProps.loginStatus) {
      this.setState({ loginFailed: "Incorrect email address or password" });
    }
  };

  setLogin = () => {
    // sessionStorage.setItem("token","testtoken");
    sessionStorage.setItem("user_type", "agent");
    // window.location = "/dashbaord";
    // this.props.history.push("/dashbaord");

    let data = {
      client_id: "PUBLIC_CLIENT",
      grant_type: "password",
      username: "a_" + this.state.email,
      password: this.state.loginPassword,
    };

    this.props.loginAgent(data);
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
          <NavBar language={this.language} />
          <IntlProvider messages={this.state.messages.default}>
            <div className="col-sm-12 loginContainer">
              <div className="loginInner">
                <div className="loginInform">
                  <h4 aria-label="vinod is working">Agent Login</h4>

                  <div style={{ color: "red" }}>{this.props.login}</div>
                  <div style={{ color: "red" }}></div>

                  <form onSubmit={this.handleSubmit}>
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
                          <label>
                            {/* <FormattedMessage id="login.username" />{" "} */}
                            Agent Phone Number
                          </label>
                          <input
                            type="text"
                            name="email"
                            autoComplete="off"
                            value={email}
                            onChange={this.handleChange}
                            className="form-control"
                            placeholder="Username"
                          />
                        </div>
                        {/* <div style={{ color: "red" }}>{emailError}</div> */}

                        <div
                          className="form-group"
                          style={{ marginTop: "5%", marginBottom: "5%" }}
                        >
                          <label>
                            <FormattedMessage id="login.password" />{" "}
                          </label>
                          <div
                            style={{ position: "relative", display: "flex" }}
                          >
                            <input
                              className="form-control"
                              type={this.state.type}
                              name="loginPassword"
                              value={loginPassword}
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
                      <div style={{ color: "red" }}>
                        {this.props.loginError}
                      </div>
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
                        onClick={() => {
                          this.setLogin();
                        }}
                      >
                        <FormattedMessage id="login.button" />
                      </button>
                    </div>
                  </form>

                  {/* <GoogleRecaptcha rechaptchaEnable={this.rechaptchaEnable} /> */}
                  <p>
                    <FormattedMessage id="login.donthaveanaccount" />
                    <NavLink to="/registration">
                      {" "}
                      <FormattedMessage id="register" />
                    </NavLink>
                    {/* <NavLink to="/agent/register"> <FormattedMessage id="register" /></NavLink> */}
                  </p>
                </div>
              </div>
            </div>
          </IntlProvider>
        </section>
      </Fragment>
    );
  }
}

// function for mapping redux state values with props //
const mapStateToProps = ({ agentReducer }) => {
  const { agentLoginstatus } = agentReducer;
  return {
    agentLoginstatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAgent: (data) => dispatch(loginAgent(data)),
    loginAgentFailure: () => dispatch(loginAgentFailure()),
  };
};

//connect method is used for connecting react and redux //
export default connect(mapStateToProps, mapDispatchToProps)(Login);
