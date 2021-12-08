import React, { Component, Fragment } from "react";
import Logo from "../../../Assets/images/logo.png";
import ReactFlagsSelect from 'react-flags-select';
import { AlternateEmailTwoTone } from "@material-ui/icons";
import {LOCALES} from '../../i18n/locales';
class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      selected: "",
      langue: 'fr'
    };
  }

  setSelected = (code) => {
    this.setState({ selected: code })
  }

  handleLanguage(e) {
    localStorage.setItem("langue", e.target.value)
    this.props.language(e.target.value)
  }

  render() {

    return (

      <div className="nav nav-default" style={{ position: "fixed !important" }}>
        <div className="navDefaultLogoHeader">
          <img alt="logo" src={Logo} className="navDefaultLogo" />
        </div>

        {/* <ReactFlagsSelect
          selected={this.state.selected} className="langOption navCountrySelect"
          onSelect={code => this.setSelected(code)}
        /> */}
        <select className="langOption" name='langue' onChange={(e) => this.handleLanguage(e)}
        >
          <option value=''>Choisir la langue</option>
          <option value='en'>English</option>
          <option value='fr'>French</option>
        </select>


      </div>
    );
  }
}

//connect method is used for connecting react and redux //
export default NavBar;
