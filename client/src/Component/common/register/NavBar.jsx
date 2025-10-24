import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { SetLanguage } from "../../../services/common/action";
import IMAGES from "../../../Assets/images";
import Select from "react-select";

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
    this.props.SetLanguage(e.target.value);
  }

  render() {
    const options = [
      { value: "en", label: "English" },
      { value: "fr", label: "French" },
    ];

    // Custom React-Select styles (only selected = goldenrod)
    const customStyles = {
      control: (base, state) => ({
        ...base,
        backgroundColor: "#fff",
        borderColor: state.isFocused ? "#c69500" : "goldenrod",
        borderWidth: 1,
        borderRadius: 25,
        boxShadow: state.isFocused ? "0 0 5px rgba(218,165,32,0.5)" : "none",
        padding: "2px 4px",
        minWidth: 160,
        cursor: "pointer",
        "&:hover": { borderColor: "#c69500" },
      }),
      menu: (base) => ({
        ...base,
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected ? "goldenrod" : "#fff",
        color: state.isSelected ? "#fff" : "#000",
        fontWeight: state.isSelected ? "600" : "500",
        cursor: "pointer",
      }),
      singleValue: (base) => ({
        ...base,
        color: "#000",
        fontWeight: "600",
      }),
      dropdownIndicator: (base) => ({
        ...base,
        color: "goldenrod",
        "&:hover": { color: "#c69500" },
      }),
      indicatorSeparator: (base) => ({
        ...base,
        display: "none",
      }),
    };

    const selectedOption = options.find(
      (opt) => opt.value === this.state.language
    );

    return (
      <div
        className="nav nav-default"
        style={{
          position: "fixed !important",
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 30px",
          backgroundColor: "#fff",
          zIndex: 1000,
        }}
      >
        {/* Left Side: Logo */}
        <div className="navDefaultLogoHeader">
          <img alt="logo" src={IMAGES.LOGO} className="navDefaultLogo" />
        </div>

        {/* Right Side: Language Dropdown */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginRight: "20px",
          }}
        >
          <Select
            options={options}
            styles={customStyles}
            placeholder={
              this.state.language === "fr"
                ? "Choisir la langue"
                : "Choose A Language"
            }
            value={selectedOption}
            onChange={(option) =>
              this.handleLanguage({ target: { value: option.value } })
            }
            isSearchable={false}
          />
        </div>
      </div>
    );
  }
}

// Redux mappings
const mapStateToProps = ({ commonReducer }) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  SetLanguage: (lang) => dispatch(SetLanguage(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
