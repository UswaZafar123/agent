import React, { Component, useState } from "react";
import "../../css/header.css";
import prifilePics from "../../Assets/images/p01.jpg";
import mobileLogo from "../../Assets/images/biapay_logo_mobile.png";
import { Logout } from "../../services/common/action";
import { Select, Menu, Dropdown } from "antd";
import { connect } from "react-redux";
import { getRefreshToken } from "../../services/agent/action";

const { Option } = Select;

class Header extends Component {
  componentDidMount() {
    let data = {
      client_id: "PUBLIC_CLIENT",
      grant_type: "refresh_token",
      refresh_token: sessionStorage.getItem("refresh_token"),
    };

    this.interval = setInterval(() => {
      this.props.getRefreshToken(data);
    }, 18000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="navBar">
        <div className="navBar_Inner">
          <div className="search_w">
            <input type="search" placeholder="Search" />
          </div>
          <div className="lnp">
            <h2 className="langue">English</h2>
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
                  <img src={prifilePics} alt="profile pic" />
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getRefreshToken: (data) => dispatch(getRefreshToken(data)),
  Logout: () => dispatch(Logout()),
});

export default connect(null, mapDispatchToProps)(Header);
