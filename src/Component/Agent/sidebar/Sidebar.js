import React, { Component } from "react";
import "../../../css/sidebar.css";
import Logo from "../../../Assets/images/logo.svg";
import { Side_bar_data } from "./Sidebar_data";
import { NavLink } from "react-router-dom";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Fade from "react-reveal/Fade";

class Sidebar extends Component {
  state = {
    submenu: false,
    subMenu2: false,
    role: "Merchant",
    toggleSidearrow: "right",
    show_hide_sidebar: true,
  };

  toggleSubmenu = (id) => {
    this.setState({ submenu: id });
  };

  toggleSubmenu2 = () => {
    this.setState((state) => ({
      subMenu2: !state.subMenu2,
    }));
  };

  hideSidebar = () => {
    this.setState({
      toggleSidearrow: "right",
      show_hide_sidebar: true,
    });
  };

  showSidebar = () => {
    this.setState({
      toggleSidearrow: "left",
      show_hide_sidebar: false,
    });
  };

  render() {
    return (
      <div className="sideBar">
        <div className="sidebar_Inner">
          <div className="sideTop">
            <span style={{fontSize:"25px"}}
              className="d-none d-sm-block d-md-none d-block d-sm-none"
              //   onClick={(e) => this.toggleHandler(false)}
            >
              {this.state.toggleSidearrow == "left" && (
                <ArrowLeftOutlined onClick={this.hideSidebar} />
              )}

              {this.state.toggleSidearrow == "right" && (
                <ArrowRightOutlined onClick={this.showSidebar} />
              )}
            </span>
            <div className="sideTopLogo">
              <img src={Logo} alt="" />
            </div>
          </div>
          {this.state.show_hide_sidebar && (
            <Fade left>
              <>
                <div className="navigation">
                  <h2 className="adminiH"> Agent Panel</h2>
                  <div className="nav_inner">
                    <ul>
                      {Side_bar_data.map((item, index) => {
                        return (
                          <li key={index}>
                            <NavLink
                              exact
                              to={item.path}
                              onClick={() => {
                                this.toggleSubmenu(item.id);
                              }}
                            >
                              <span className={item.iconClass}></span>
                              {item.title}
                              {item.subMenu && (
                                <span
                                  className={`icon-Asset-1 arrowOpenClosed ${
                                    this.state.submenu === item.id
                                      ? "openSubM"
                                      : ""
                                  }`}
                                ></span>
                              )}
                            </NavLink>
                            {item.subMenu && this.state.submenu === item.id ? (
                              <ul>
                                {item.subMenu.map((submenuList) => {
                                  return (
                                    <li>
                                      <NavLink
                                        exact
                                        to={submenuList.path}
                                        onClick={
                                          submenuList.subMenu &&
                                          this.toggleSubmenu2
                                        }
                                      >
                                        <span className="icon-Asset-48 subMDot"></span>{" "}
                                        {submenuList.title}
                                      </NavLink>

                                      {submenuList.subMenu &&
                                      this.state.subMenu2 ? (
                                        <ul className="subNav">
                                          <li>
                                            <h2
                                              className="adminiH subTitleUl"
                                              style={{ color: "black" }}
                                            >
                                              General
                                            </h2>
                                          </li>
                                          {submenuList.subMenu.map((sub) => {
                                            return (
                                              <li>
                                                <NavLink exact to={sub.path}>
                                                  {" "}
                                                  <span
                                                    className={sub.iconClass}
                                                  ></span>{" "}
                                                  {sub.title}
                                                </NavLink>
                                              </li>
                                            );
                                          })}
                                        </ul>
                                      ) : null}
                                    </li>
                                  );
                                })}
                              </ul>
                            ) : null}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </>
            </Fade>
          )}
        </div>
      </div>
    );
  }
}

export default Sidebar;
