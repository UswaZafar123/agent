import React, { Component } from "react";
import "../../../css/sidebar.css";
import Logo from "../../../Assets/images/logo.svg";
import { Side_bar_data } from "./Sidebar_data";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Skeleton from "@material-ui/lab/Skeleton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { FormattedMessage, IntlProvider } from 'react-intl';


import {
  fetchAgentProfile,
  fetchAgentWallet,
  fetchAgentBankAccounts,
} from "../../../../src/services/agent/action";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Sidebar extends Component {
  state = {
    submenu: false,
    subMenu2: false,
    role: "Merchant",
    sideBarLoadingListLength: 10,
    filteredMenu: [],
    linkingDialogOpen: false,
    linkingDialogTitle: "",
    linkingDialogBody: "",
    agentType: "",
    messages: "",
    language: ""
  };

  async translationHelperFunction() {


    console.log(localStorage.getItem("lang"), "lab>>>>>>>>")
    const messages = await this.loadLocaleData(localStorage.getItem("lang"));
    this.setState({
      messages: messages,
      language: localStorage.getItem("lang")
    });
    // console.log(messages.default, "MESSAGES", localStorage.getItem("lang"), "LANGUAGE");

  }

  loadLocaleData = (locale) => {
    switch (locale) {
      case "fr":
        return import("../../i18n/messages/fr.js");
      default:
        return import("../../i18n/messages/en.js");
    }
  };

  componentDidMount() {
    this.setState({ filteredMenu: Side_bar_data });
    this.props.fetchProfile(sessionStorage.getItem("token"));
    // if(Object.keys(this.props.profile.data).length === 0) {
    // }
    this.translationHelperFunction();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.profile.data !== null) {
      if (Object.keys(nextProps.profile.data).length !== 0) {
        this.filterSubmenuLinks(nextProps.profile.data);
        this.setState({
          agentType: nextProps.profile.data.agentType
        })
        console.log(this.state.agentType, "AGENT TYPE");
        this.props.fetchAgentWallet(sessionStorage.getItem("token"));
        if (
          nextProps.profile.data.registrationType === "EXISTING_BANK_CUSTOMER"
        ) {
          this.props.fetchAgentBankAccounts(
            sessionStorage.getItem("token"),
            nextProps.profile.data.bankCustomerId
          );
        }
        this.checkAccountStatus(
          nextProps.profile.data.agentType,
          nextProps.profile.data.status,
          nextProps.language
        );
      }
    }


  }



  // getSnapshotBeforeUpdate(prevProps) {
  //   return { languageChangeRequired: prevProps.language !== this.props.language };
  // }

  async componentDidUpdate(prevProps) {
    if (prevProps.language !== this.props.language) {
      const messages = await this.loadLocaleData(this.props.language);

      this.setState({
        messages: messages,
        language: prevProps.language
      });
    }
  }

  filterSubmenuLinks = (profileData) => {

    let agentMainPanel = Side_bar_data.filter((data) => {

      if (profileData.agentType === "AGENT") {
        return (
          data.path !== "/admin/bankingOperation"
        )
      } else if (profileData.agentType === "AGENT_MEMBER") {
        return (
          data.path !== "/agent/cash_in" &&
          data.path !== "/agent/send-money" &&
          data.path !== "/agent/walletAccountOpening" &&
          data.path !== "/admin/bankingOperation" &&
          data.path !== "/agent/kyc" &&
          data.path !== "/agents/Settings"
        )
      }
      else {
        return data;
      }

    })

    var result = agentMainPanel.map((data) => {
      if (data.subMenu) {
        var subMenu = data.subMenu.filter((subMenuOption) => {
          if (profileData && profileData.agentType === "AGENT_BANKER" && profileData.status !== "ACTIVE") {
            console.log("Agent Banker");
            return (
              subMenuOption.path !== "/profile/account/link" &&
              subMenuOption.path !== "/profile/account/validate_id" &&
              subMenuOption.path !== "/Profile/link-agentbanker" &&
              subMenuOption.path !== "/Profile/upgrade-agentbanker"
            );
          } else if (profileData && profileData.agentType === "AGENT_BANKER" && profileData.status === "ACTIVE") {
            return (
              subMenuOption.path !== "/profile/account/link" &&
              subMenuOption.path !== "/profile/account/validate_id" &&
              subMenuOption.path !== "/Profile/link-agentbanker" &&
              subMenuOption.path !== "/Profile/upgrade-agentbanker" &&
              subMenuOption.path !== "/Profile/validate-bank-account"
            );
          }
          else if (profileData && profileData.agentType === "AGENT" && profileData.status !== "AGENT_LINKING_REQUESTED" && profileData.status !== "ACTIVE") {
            console.log("Agent");

            return (
              subMenuOption.path !== "/agent/cash_deposit/bank" &&
              subMenuOption.path !== "/agent/cash_withdraw/bank" &&
              subMenuOption.path !== "/profile/account/validate_id" &&
              subMenuOption.path !== "/profile/account/link" &&
              subMenuOption.path !== "/Profile/bank-account" &&
              subMenuOption.path !== "/Profile/linked-agents" &&
              subMenuOption.path !== "/Profile/linking-requests" &&
              subMenuOption.path !== "/Profile/validate-bank-account" &&
              subMenuOption.path !== "/admin/banking/intra_bank_transfer" &&
              subMenuOption.path !== "/admin/banking/inter_bank_transfer" &&
              subMenuOption.path !== "/agent/customer/bank_customer"


            );
          } else if (profileData && profileData.agentType === "AGENT" && (profileData.status === "AGENT_LINKING_REQUESTED" || profileData.status === "ACTIVE")) {
            return (
              subMenuOption.path !== "/agent/cash_deposit/bank" &&
              subMenuOption.path !== "/agent/cash_withdraw/bank" &&
              subMenuOption.path !== "/profile/account/validate_id" &&
              subMenuOption.path !== "/profile/account/link" &&
              subMenuOption.path !== "/Profile/bank-account" &&
              subMenuOption.path !== "/Profile/linked-agents" &&
              subMenuOption.path !== "/Profile/linking-requests" &&
              subMenuOption.path !== "/Profile/validate-bank-account" &&
              subMenuOption.path !== "/Profile/link-agentbanker" &&
              subMenuOption.path !== "/admin/banking/intra_bank_transfer" &&
              subMenuOption.path !== "/admin/banking/inter_bank_transfer" &&
              subMenuOption.path !== "/agent/customer/bank_customer"

            );
          }
          else if (profileData && profileData.agentType === "AGENT_MEMBER") {
            return (
              subMenuOption.path !== "/Profile/link-agentbanker" &&
              subMenuOption.path !== "/Profile/upgrade-agentbanker" &&
              subMenuOption.path !== "/profile/account/link" &&
              subMenuOption.path !== "/profile/account/validate_id" &&
              subMenuOption.path !== "/Profile/bank-account" &&
              subMenuOption.path !== "/Profile/linked-agents" &&
              subMenuOption.path !== "/Profile/linking-requests" &&
              subMenuOption.path !== "/Profile/validate-bank-account" &&
              subMenuOption.path !== "/admin/banking/intra_bank_transfer" &&
              subMenuOption.path !== "/admin/banking/inter_bank_transfer" &&
              subMenuOption.path !== "/agent/customer/bank_customer" &&
              subMenuOption.path !== "/agent/customer/non_bank_customer"


            )
          }
          else {
            return subMenuOption;
          }
        });
        return {
          ...data,
          subMenu,
        };
      } else {
        return data;
      }
    });
    this.setState({ filteredMenu: result });
  };

  toggleLinkingDialog = () => {
    this.setState({ linkingDialogOpen: !this.state.linkingDialogOpen });
  };

  checkAccountStatus = (agentType, status, lang) => {
    switch (status) {
      case 'INACTIVE':
        this.showStatusDialog('Account Inactive',
          'Your account is still in-active please contanct bank administration for more details.');
        break;

      case 'SUSPENDED':
        this.showStatusDialog('Account Suspended',
          'Your account has been suspended please contanct bank administration for more details.');
        break;
      case 'AGENT_LINKING_PENDING':
        if (lang === 'fr') {
          this.showStatusDialog(
            'Liaison du compte',
            agentType === "AGENT_BANKER"
              ? 'Your account is not active, you need to link your Bank Customer ID.'
              : 'Votre compte nest pas actif�; vous devez associer votre compte au super-agent.');
        } else {
          this.showStatusDialog(
            'Account Linking',
            agentType === "AGENT_BANKER"
              ? 'Your account is not active, you need to link your Bank Customer ID.'
              : 'Your account is not active, you need to link your account to super agent.');
        }
        break;
      case 'AGENT_LINKING_REQUESTED':
        this.showStatusDialog('Account Linking Requested',
          'Your account linking request been sent to the Super Agent after he/she approved the request then you will be able to make any transaction from the system.');
        break;
      case 'AGENT_LINKING_COMPLETED':
        this.showStatusDialog('Account Linking Completed',
          'You account linking process has been completed, please wait for the bank administrator to activate your account.');
        break;
      case 'AGENT_LINKING_REJECTED':
        if (lang === 'fr') {
          this.showStatusDialog(
            'Liaison du compte',
            agentType === "AGENT_BANKER"
              ? 'Your account is not active, you need to link your Bank Customer ID.'
              : 'Your account is not active, you need to link your account to super agent.');
        } else {
          this.showStatusDialog(
            'Account Linking',
            agentType === "AGENT_BANKER"
              ? 'Your account is not active, you need to link your Bank Customer ID.'
              : 'Your account is not active, you need to link your account to super agent.');
        }
        break;
      default:
    }
  }

  showStatusDialog = (title, bodyText) => {
    this.setState({
      linkingDialogTitle: title,
      linkingDialogBody: bodyText,
      linkingDialogOpen: true,
    });
  };

  toggleSubmenu = (id) => {
    this.setState({ submenu: id });
  };

  toggleSubmenu2 = (param) => {
    this.setState((state) => ({
      subMenu2: param,
    }));
    console.log("paramCheck", param)
  };


  toggleHandler = (VarVal) => {
    this.props.toggleHandler(VarVal);
  };


  renderSideBarLoading = () => {
    return (
      <IntlProvider
        messages={this.state.messages.default}
        locale={this.state.language}
      >
        <div className="sideBar SidebarScroll">
          <div className="sidebar_Inner">
            <div className="sideTop">
              <div className="sideTopLogo">
                <img src={Logo} alt="" />
              </div>
            </div>
            <div className="navigation">
              {this.state.agentType === "AGENT" ?
                <>
                  <h2 className="adminiH"><FormattedMessage id="agent.Agent" /></h2>
                </> : this.state.agentType === "AGENT_MEMBER" ?
                  <>
                    <h2 className="adminiH">Agent Member</h2>
                  </>
                  :
                  this.state.agentType === "AGENT_BANKER" ?
                    <>
                      <h2 className="adminiH">Agent Banker</h2>
                    </>
                    :
                    <></>}
              {/* <h2 className="adminiH"> Agent Panel</h2> */}
              <div className="nav_inner">
                <ul>
                  {Side_bar_data.map((item, index) => {

                    return (
                      <li key={index}>
                        <Skeleton
                          variant="text"
                          width={200}
                          height={50}
                          style={{
                            margin: "16px",
                            borderRadius: "16px",
                            backgroundColor: "gray",
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </IntlProvider>
    );
  };

  renderSideBar = () => {
    return (
      <IntlProvider
        messages={this.state.messages.default}
        locale={this.state.language}
      >
        <>
          <div className="sideBar SidebarScroll">
            <div className="sidebar_Inner">
              <div className="sideTop">
                {this.props.isOpenLeftSide && <div className="closemenuBtn" onClick={(e) => this.toggleHandler(false)}><CloseOutlined /></div>}
                <div className="sideTopLogo">
                  <img src={Logo} alt="" />
                </div>
              </div>
              <div className="navigation">
                {this.state.agentType === "AGENT" ?
                  <>
                    <h2 className="adminiH">Agent</h2>
                  </> : this.state.agentType === "AGENT_MEMBER" ?
                    <>
                      <h2 className="adminiH">Agent Member</h2>
                    </>
                    :
                    this.state.agentType === "AGENT_BANKER" ?
                      <>
                        <h2 className="adminiH">Agent Banker</h2>
                      </>
                      :
                      <></>}
                <div className="nav_inner">
                  <ul>
                    {this.state.filteredMenu.map((item, index) => {
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
                            <FormattedMessage id={item.title} />
                            {item.subMenu && (
                              <span
                                className={`icon-Asset-1 arrowOpenClosed ${this.state.submenu === item.id ? "openSubM" : ""
                                  }`}
                              ></span>
                            )}
                          </NavLink>
                          {item.subMenu && this.state.submenu === item.id ? (
                            <ul>
                              {item.subMenu.map((submenuList) => {
                                console.log("checking sub path", submenuList.path)
                                return (
                                  <li>
                                    {submenuList.path === "/Settings/General" ?
                                      <NavLink
                                        exact
                                        to={submenuList.path}
                                        onClick={
                                          (e) => this.toggleSubmenu2(true)
                                        }
                                      >
                                        <span className="icon-Asset-48 subMDot"></span>{" "}
                                        <FormattedMessage id={submenuList.title} />
                                        {submenuList.path === "/Settings/General" &&
                                          <div className="toggleGenralBTN" onClick={(e) => this.toggleSubmenu2(true)}><PlusCircleOutlined /></div>
                                        }
                                      </NavLink>
                                      :
                                      <NavLink
                                        exact
                                        to={submenuList.path}
                                        onClick={
                                          (e) => this.toggleSubmenu2(false)
                                        }
                                      >
                                        <span className="icon-Asset-48 subMDot"></span>{" "}
                                        <FormattedMessage id={submenuList.title} />
                                      </NavLink>

                                    }

                                    {submenuList.subMenu && this.state.subMenu2 ? (
                                      <ul className="subNav">
                                        <div className="submenu-close-btn" onClick={
                                          (e) => this.toggleSubmenu2(false)
                                        }>
                                          <CloseOutlined />
                                        </div>
                                        <li>
                                          <h2
                                            className="adminiH subTitleUl"
                                            style={{ color: "black" }}
                                          >
                                            <FormattedMessage id="agent.General" />
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
                                                <FormattedMessage id={sub.title} />
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
            </div>
          </div>
          {this.props.isOpenLeftSide && <div className="overLayOnLeft" onClick={(e) => this.toggleHandler(false)}></div>}
        </>
      </IntlProvider>
    );
  };

  render() {
    return (
      <IntlProvider
        messages={this.state.messages.default}
        locale={this.state.language}
      >
        <>
          {this.props.profile.loading
            ? this.renderSideBarLoading()
            : this.renderSideBar()}
          <Dialog
            open={this.state.linkingDialogOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={this.toggleLinkingDialog}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {this.state.linkingDialogTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {this.state.linkingDialogBody}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={this.toggleLinkingDialog}
                style={{ color: "#DA4139" }}
              >
                <FormattedMessage id="agent.Iunderstand" />
              </Button>
            </DialogActions>
          </Dialog>
        </>
      </IntlProvider>
    );
  }
}

const mapStateToProps = ({ agentReducer, commonReducer }) => {
  const { profile } = agentReducer;
  const { language } = commonReducer;

  return {
    profile,
    language,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (token) => dispatch(fetchAgentProfile(token)),
  fetchAgentWallet: (token) => dispatch(fetchAgentWallet(token)),
  fetchAgentBankAccounts: (token, bankCustomerId) =>
    dispatch(fetchAgentBankAccounts(token, bankCustomerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
