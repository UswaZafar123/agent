import { Component, Fragment } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import validate from "./resources/validation";
import { FormattedMessage, IntlProvider } from "react-intl";
import NavBar from "./../common/register/NavBar";
import "../../Assets/css/login.css";
import {
  addAccessInfo,
  loginAgent,
  loginAgentFailure,
} from "../../services/agent/action";

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
      language: "",
    };
  }

  async translationHelperFunction() {
    const messages = await this.loadLocaleData(localStorage.getItem("lang"));
    this.setState({
      messages: messages,
      language: localStorage.getItem("lang"),
    });
    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");
  }

  loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../i18n/messages/fr");
      default:
        return import("../i18n/messages/en");
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

    this.translationHelperFunction();
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
    type: this.state.type === "password" ? "text" : "password",
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

  detectBrowser = () => {
    var browserName = (function (agent) {
      switch (true) {
        case agent.indexOf("edge") > -1:
          return "MS Edge";
        case agent.indexOf("edg/") > -1:
          return "Edge ( chromium based)";
        case agent.indexOf("opr") > -1 && !!window.opr:
          return "Opera";
        case agent.indexOf("chrome") > -1 && !!window.chrome:
          return "Chrome";
        case agent.indexOf("trident") > -1:
          return "MS IE";
        case agent.indexOf("firefox") > -1:
          return "Mozilla Firefox";
        case agent.indexOf("safari") > -1:
          return "Safari";
        default:
          return "other";
      }
    })(window.navigator.userAgent.toLowerCase());

    return browserName;
  };

  componentWillReceiveProps = async (nextProps) => {
    let userType;

    if (nextProps.agentLoginstatus) {
      this.setState({ loginPasswordError: null });
      this.setState({ showLoginError: false });

      this.props.history.push("/agent");
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

    if (nextProps.language) {
      const messages = await this.loadLocaleData(nextProps.language);

      this.setState({
        messages: messages,
        language: nextProps.language,
      });
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

    console.log(
      4586,
      this.state.language,
      this.state.language?.length > 0 ? this.state.language : "en"
    );

    return (
      //By using Fragment as parent div will not create an extra dom element //
      <IntlProvider
        messages={this.state.messages.default}
        locale={this.state.language?.length > 0 ? this.state.language : "en"}
      >
        <Fragment>
<section className="loginWrapper">
  {/* LEFT SIDE - Login Panel */}
  <div className="loginLeft">
    {/* Navbar inside left side */}
    <div className="loginNav">
      <NavBar language={this.language} />
    </div>

    {/* Login Form Section */}
    <div className="loginInner">
      <h2 className="loginTitle">
        Commercial Bank <span className="highlight">Agent</span>
      </h2>
      <p className="loginSubtitle">Login with your email and password</p>

      {/* Login Form */}
      <form onSubmit={this.handleSubmit}>
        {twoFactorblock && (
          <div className="form-group">
            <label>Two Factor Authentication Code</label>
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
            {/* Email / Username Field */}
            <div className="form-group">
              <label>
                <FormattedMessage id="agent.phonenumber" />
              </label>
              <div className="input-wrapper input-wrapper-with-icon">
                <svg className="input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  type="text"
                  name="email"
                  autoComplete="off"
                  value={email}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter username"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>
                <FormattedMessage id="login.password" />
              </label>
              <div className="input-wrapper input-wrapper-with-icon">
                <svg className="input-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  className="form-control"
                  type={this.state.type}
                  name="loginPassword"
                  value={loginPassword}
                  placeholder="Enter your password"
                  onChange={this.handleChange}
                />
                <div className="input-group-append" onClick={this.showHide}>
                  {this.state.type === "password" && (
                    <svg className="eye-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                  {this.state.type === "text" && (
                    <svg className="eye-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Login Error */}
        {this.state.showLoginError && (
          <div style={{ color: "red" }}>{this.props.loginError}</div>
        )}

        {/* Remember Me + Forgot Password */}
        <div className="form-group remember-forgot">
          <div className="left">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">
              <FormattedMessage id="agent.rememberme" />
            </label>
          </div>
          <NavLink to="/agent/forgotPassword" className="forgetPass">
            <FormattedMessage id="login.forogtpassword" />
          </NavLink>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-login-custom"
            onClick={() => this.setLogin()}
          >
            Login now
          </button>
        </div>
      </form>

      {/* Register Link */}
      <p className="registerText">
        <FormattedMessage id="login.donthaveanaccount" />{" "}
        <NavLink to="/agent/registration">
          <FormattedMessage id="register" />
        </NavLink>
      </p>
    </div>
    
    <div className="loginFooter">
      <span className="footer-icon">⚙</span> Processed by <span>Speedoh</span>
    </div>
  </div>

  


  {/* RIGHT SIDE - Static Mockup */}
  <div className="loginRight">
    <div className="loginRightText">
      
    </div>
  </div>
</section>


        </Fragment>
      </IntlProvider>
    );
  }
}

// function for mapping redux state values with props //
const mapStateToProps = ({ agentReducer, commonReducer }) => {
  const { agentLoginstatus, addAccessInfoStatus, addAccessInfoData } =
    agentReducer;
  const { language } = commonReducer;
  return {
    agentLoginstatus,
    language,
    addAccessInfoStatus,
    addAccessInfoData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginAgent: (data) => dispatch(loginAgent(data)),
    loginAgentFailure: () => dispatch(loginAgentFailure()),
    addAccessInfo: (payload) => dispatch(addAccessInfo(payload)),
  };
};

//connect method is used for connecting react and redux //
export default connect(mapStateToProps, mapDispatchToProps)(Login);
