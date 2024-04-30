import { Component, Fragment } from "react";
import { connect } from "react-redux";
import NavBar from "./NavBar";
import "react-country-dropdown/dist/index.css";
import { toastr } from "react-redux-toastr";
import IMAGES from "../../../Assets/images";

class SetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      registrationType: "",
      startdate: new Date(),
      showEnterMobileNo: false,
      showMobileVerification: false,
      verifyOtp: false,
      showMobileSubscription: false,
      passwordType: "password",
      confirmPasswordType: "password",
      customeRegAccountType: false,
      selected: "",
      countryCode: null,
      locale: null,
      idDocumet: null,
      dob: null,
      mobile: props.location.state.phone,
      email: "that.sarvanan94+2@gmail.com",
    };
  }

  setSelected = (code) => {
    this.setState({ selected: code });
  };

  // function for setstating input field values to initial states dynamically //
  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  selectAccountType = (e) => {
    this.setState({ registrationType: e.target.value });
  };

  handleSelect = (country) => {
    this.setState({ countryCode: country });
  };

  verifyOTP = () => {
    this.setState({ verifyOtp: true });
  };

  selectLanguage = (e) => {
    this.setState({ locale: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("countryCode", "SG");
    formData.append("phoneNumber", this.state.mobile);
    formData.append("idDocumentType", "ID_CARD");
    formData.append("idDocumentFile", this.state.uploadyourimage);
    formData.append("idDocumentNumber", "6596565V");
    formData.append("idDocumentExpiryDate", "1994-12-11");
    formData.append("emailAddress", this.state.emailAddress);
    formData.append("uin", "123456657");
    formData.append("tcAccepted", true);
    formData.append("locale", "en");
    formData.append("currencyCode", "SG");
    formData.append("agentBankerPhoneNumber", "SG");
    formData.append("firstName", "SG");
    formData.append("lastName", "SG");
    formData.append("dateOfBirth", "1994-12-11");
    formData.append("address", this.state.address);
    formData.append("cityOfResidence", "SG");
    formData.append("registrationType", "NON_EXISTING_BANK_CUSTOMER");
  };

  handleChangeFile = (e) => {
    if (
      e.target.files[0].type == "application/pdf" ||
      e.target.files[0].type == "image/png" ||
      e.target.files[0].type == "image/jpeg"
    ) {
      this.setState({
        [e.target.name]: e.target.files[0],
      });
    }

    console.log(this.state, "state");
  };

  selectIDDocument = (e) => {
    console.log({ idDocumet: e.target.value });
  };

  dateofbirth = (date) => {
    let month = date.getMonth() + 1;
    let dateString = date.getFullYear() + "-" + month + "-" + date.getDate();

    this.setState({ dob: dateString.toString() });
  };

  handleChangeMobile = (e) => {
    this.setState({ mobile: e });
  };

  setPassword = () => {
    var data = {
      phoneNumber: this.state.mobile,
      password: this.state.password,
      confirmPassword: this.state.confirm_password,
    };

    if (this.state.password == this.state.confirm_password) {
      this.props.setPassword(data);
      this.props.history.push({
        pathname: "/merchant/register/success",
        state: { email: this.state.email },
      });
    } else {
      toastr.error("password and confirm password are not same");
    }
  };

  render() {
    console.log(4586, this.state);

    return (
      //By using Fragment as parent div will not create an extra dom element //
      <Fragment>
        <section className="loginWrapper accountWrapper">
          <NavBar />
          <div className="col-md-12 loginContainer">
            <div className="loginInner" style={{ width: "901px" }}>
              {!this.state.showMobileSubscription && (
                <div className="row">
                  <span className="absolute">
                    <img src={IMAGES.Back} style={{ width: 15 }} />
                  </span>

                  <h1 className="sub-title">Enter New PIN Code</h1>

                  <div className="col-md-12 float-left">
                    <div
                      className="form-group"
                      style={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                      <label>PIN Code</label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control"
                          type="password"
                          name="password"
                          value={this.state.address}
                          onChange={this.handleChange}
                          placeholder="Enter your pin code"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 float-left">
                    <div
                      className="form-group"
                      style={{ marginTop: "5%", marginBottom: "5%" }}
                    >
                      <label>Confirm PIN Code</label>
                      <div style={{ position: "relative", display: "flex" }}>
                        <input
                          className="form-control"
                          type="password"
                          name="confirm_password"
                          value={this.state.address}
                          onChange={this.handleChange}
                          placeholder="Enter your confirm pin code"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="col-md-12 float-left"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <button
                      className="btn btn-default text-white"
                      onClick={this.setPassword}
                    >
                      Set Password
                    </button>
                    <button
                      className="btn btn-default text-white"
                      onClick={() => {
                        this.setState({ showMobileVerification: true });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ commonReducer }) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  setPassword: (payLoad) => dispatch(setPassword(payLoad)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetPassword);
