import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SetLanguage } from "../../../services/common/action";
import IMAGES from "../../../Assets/images";
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      selected: "",
      langue: "fr",
      language: "",
    };
  }

  componentDidMount = () => {
    this.setState({
      language: localStorage.getItem("lang"),
    });
  };

  setSelected = (code) => {
    this.setState({ selected: code });
  };

  handleLanguage(e) {
    localStorage.setItem("lang", e.target.value);
    this.setState({
      language: e.target.value,
    });
    // this.props.language(e.target.value)
    this.props.SetLanguage(e.target.value);
  }

  render() {
    return (
      <div className="nav nav-default" style={{ position: "fixed !important" }}>
        <div className="navDefaultLogoHeader">
          <img alt="logo" src={IMAGES.LOGO} className="navDefaultLogo" />
        </div>

        {/* <ReactFlagsSelect
          selected={this.state.selected} className="langOption navCountrySelect"
          onSelect={code => this.setSelected(code)}
        /> */}
        <select
          value={this.state.language}
          className="langOption langOptionLogin"
          name="langue"
          onChange={(e) => this.handleLanguage(e)}
        >
          <option value="" disabled={true}>
            {" "}
            {this.state.language == "en"
              ? "Choose A Language"
              : "Choisir la langue"}
          </option>
          <option value="en">English</option>
          <option value="fr">French</option>
        </select>
      </div>
    );
  }
}

// // function for mapping redux state values with props //
const mapStateToProps = ({ commonReducer }) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  SetLanguage: (lang) => dispatch(SetLanguage(lang)),
});

//connect method is used for connecting react and redux //
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
