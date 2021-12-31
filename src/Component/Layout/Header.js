import React, { Component, useState } from "react";
import "../../css/header.css";
import prifilePics from "../../Assets/images/p01.jpg";
import mobileLogo from "../../Assets/images/biapay_logo_mobile.png";
import { Logout, SetLanguage } from "../../services/common/action";
import { Select, Menu, Dropdown } from "antd";
import { connect } from "react-redux";
import { getRefreshToken, getProfile } from "../../services/agent/action";

const { Option } = Select;

class Header extends Component {
  constructor() {
    super();

    this.state = {
      profileImage: null,
      language: ""
    };
  }

  componentDidMount() {

    this.setState({
      language: localStorage.getItem("lang")
    })

    let data = {
      client_id: "PUBLIC_CLIENT",
      grant_type: "refresh_token",
      refresh_token: sessionStorage.getItem("refresh_token"),
    };

    this.interval = setInterval(() => {
      this.props.getRefreshToken(data);
    }, 18000);

    this.props.getProfile();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }



  // blobToBase64 = (blob) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(blob);
  //   return new Promise((resolve) => {
  //     reader.onloadend = () => {
  //       resolve(reader.result);
  //     };
  //   });
  // };

  async componentWillReceiveProps(nextProps) {
    if (nextProps.profileImageStatus) {

      var blob = new Blob([nextProps.profileImage], { type: "application/octet-stream" });

      const value = URL.createObjectURL(blob)
      this.setState({
        profileImage: value
      })
    }
  }

  handleLanguage(e) {
    localStorage.setItem("lang", e.target.value)
    this.setState({
      language: e.target.value
    });
    // this.props.language(e.target.value)
    this.props.SetLanguage(e.target.value)
  }

  render() {
    return (
      <div className="navBar">
        <div className="navBar_Inner">
          <div className="search_w">
            <input type="search" placeholder="Search" />
          </div>
          <div className="lnp">
            {/* <h2 className="langue">English</h2> */}
            <select value={this.state.language} onChange={(e) => this.handleLanguage(e)} className="langOption" name='langue' style={{ right: "12%", top: "30%" }}>
              <option value='' disabled={true}>{this.state.language == "en-US" ? "Choose A Language" : "Choisir la langue"}</option>
              <option value='en-US'>English</option>
              <option value='fr'>French</option>
            </select>
            <div className="hBell dFlexAllCenter">
              <span className="icon-Asset-41 fSize20"></span>
              <div className="notificationMark">4</div>
            </div>
            <div className="nameDesig">
              <h3>Agent</h3>
              <h4>Agent</h4>
            </div>
            <div className="profile_wrapperW0">
              <div className="profile_wrapper">
                <Dropdown
                  overlay={
                    <ul class="pDropDown_W">
                      <li
                        onClick={() => {
                          this.props.Logout();
                          sessionStorage.removeItem("refresh_token");
                          sessionStorage.removeItem("token_expiretime");
                          sessionStorage.removeItem("refresh_token_expiretime");
                          sessionStorage.removeItem("token");
                          sessionStorage.removeItem("user_type");
                          sessionStorage.removeItem("email");
                          window.location = "/";
                        }}
                      >
                        <a href="#">
                          <span class="icon-logout"></span>Logout
                        </a>
                      </li>
                    </ul>
                  }
                  placement="topLeft"
                  trigger={["click"]}
                >


                  {this.state.profileImage ? <img src={this.state.profileImage} alt="profile pic" /> : <img src={prifilePics} alt="profile pic" />}
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ agentReducer }) => {
  const { profileImage, profileImageStatus } = agentReducer;

  console.log(agentReducer, "profileImage");

  return {
    profileImage,
    profileImageStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getRefreshToken: (data) => dispatch(getRefreshToken(data)),
  Logout: () => dispatch(Logout()),
  getProfile: () => dispatch(getProfile()),
  SetLanguage: (lang) => dispatch(SetLanguage(lang))

});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
