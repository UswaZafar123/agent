import React, { Component } from 'react';
import '../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import './formfromold.css'

// AG-GRID START

import { AgGridColumn, AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Grid } from "ag-grid-enterprise";
import { connect } from "react-redux";

// AG-GRID ENDS
import "jspdf-autotable";
import jsPDF from "jspdf";


import { Select, DatePicker, Modal, Switch, Upload, message, Dropdown } from "antd";
import moment from "moment";
import myImage from "../../../Assets/images/p01.jpg";
import myLogo from "../../../Assets/images/logo.svg";
import { getProfile } from '../../../services/agent/action';
import { FormattedMessage, IntlProvider } from 'react-intl';


const dateFormat = "YYYY/MM/DD";
// const customFormat = value => `custom format: ${value.format(dateFormat)}`;
const { Option } = Select;

function onChange(date, dateString) {
  console.log(date, dateString);
}


function setNormal(api) {
  const eGridDiv = document.querySelector("#myGrid");
  eGridDiv.style.width = "100%";
  eGridDiv.style.height = 400;
  api.setDomLayout(null);
}

function handleChange(value) {
  console.log(`selected ${value}`);
}



class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fromDate: null,
      profileDetails: [],
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      profileImage: "",
      messages: "",
      language: ""

    };
  }

  async translationHelperFunction() {

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

  onChange(checked) {
    console.log(`switch to ${checked}`);
  }

  componentDidMount = () => {
    this.translationHelperFunction();
    this.props.getProfile();
  }

  async componentWillReceiveProps(nextprops) {

    if (nextprops.language) {
      const messages = await this.loadLocaleData(nextprops.language);

      this.setState({
        messages: messages,
        language: nextprops.language
      });
    }

    if (nextprops.profileDetails) {
      this.setState({
        profileDetails: nextprops.profileDetails,
        firstName: nextprops.profileDetails.firstName,
        lastName: nextprops.profileDetails.lastName,
        email: nextprops.profileDetails.agentEmailAddress,
        phoneNumber: nextprops.profileDetails.phoneNo
      });
    }

    if (nextprops.profileImage) {

      var blob = new Blob([nextprops.profileImage], { type: "application/octet-stream" });

      const value = URL.createObjectURL(blob)
      this.setState({
        profileImage: value
      })
    }
  }

  onSubmit = () => {
    console.log(this.state, "STATE");
    console.log(this.props.profileImage, "PROFILE IMAGE")
  }

  render() {
    return (
      <>
        <IntlProvider
          messages={this.state.messages.default}
          locale={this.state.language}
        >
          <div>
            <div className="main_contain">
              <div className="merch_m_list_w">
                <div className="merch_list_card" id="merch_list_card">
                  <div className="section_custom">
                    <div className="sectionInn">
                      <div className="chartCard_w">
                        <div className="chartCardTop">
                          <div className="flCenterColumn">
                            <h1 className="list_top_heading textAlignCenter">
                              <FormattedMessage id="agent.Profile" />
                            </h1>
                          </div>
                        </div>
                        <div className="chartCardMiddle addSome">
                          <div className="kycDetailsBox " style={{ border: "none" }}>
                            <div className="uploadProfile_w">
                              <div className="uploadProfile">
                                <h2 className="uptop">
                                  <FormattedMessage id="agent.UploadProfilePhoto" />
                                </h2>
                                <div className="profileImg">
                                  <img src={this.state.profileImage} />
                                </div>
                                <div className="uploadPText">
                                  <input type="file" />
                                </div>
                              </div>
                              <div className="uploadProfile">
                                <h2 className="uptop">
                                  <FormattedMessage id="agent.UploadLogo" />
                                </h2>
                                <div className="profileImg">
                                  <img src={myLogo} />
                                </div>
                                <div className="uploadPText">
                                  <input type="file" />
                                </div>
                              </div>
                            </div>
                            <div className="kycformBox">
                              <div className="formRow">
                                <div className="formCol">
                                  <label className="formColLabel">
                                    <FormattedMessage id="agent.FirstName" />
                                  </label>
                                  <input
                                    value={this.state.firstName}
                                    onChange={(e) => this.setState({
                                      firstName: e.target.value
                                    })}
                                    name="url"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter First Name"
                                  />
                                  <div>
                                  </div>
                                </div>
                                <div className="formCol">
                                  <label className="formColLabel">
                                    <FormattedMessage id="agent.LastName" />
                                  </label>
                                  <input
                                    value={this.state.lastName}
                                    onChange={(e) => this.setState({
                                      lastName: e.target.value
                                    })}
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Last Name"
                                  />
                                  <div>
                                    {/* <span style={{ color: "red",display:"block",marginTop:"8px"}}>{"Please Enter Valid URL"}</span> */}
                                  </div>
                                </div>
                                <div className="formCol">
                                  <label className="formColLabel">
                                    <FormattedMessage id="agent.email" />
                                  </label>
                                  <input
                                    value={this.state.email}
                                    onChange={(e) => this.setState({
                                      email: e.target.value
                                    })}
                                    name="email"
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Email"
                                  />
                                  <div>
                                    {/* <span style={{ color: "red",display:"block",marginTop:"8px"}}>{"Please Enter Valid URL"}</span> */}
                                  </div>
                                </div>
                                <div className="formCol">
                                  <label className="formColLabel">
                                    <FormattedMessage id="agent.MobileNumber" />

                                  </label>
                                  <input
                                    value={this.state.phoneNumber}
                                    onChange={(e) => this.setState({
                                      phoneNumber: e.target.value
                                    })}
                                    name="pNumber"
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter Phone Number"
                                  />
                                  <div>
                                  </div>
                                </div>
                                {/* <div className="formCol" style={{ flexDirection: "row" }}>
                                <label className="formColLabel">MFA Status
                                  <Switch defaultChecked onChange={onChange} style={{ marginLeft: "12px" }} />
                                </label>
                                <div>
                                </div>
                              </div> */}
                              </div>
                              <div className="containerBiaN_form" style={{ width: "100%" }}>
                                <div className="containerBiaN_f_row">
                                  <div className="containerBiaN_f_col width30percent textAlignRight">
                                  </div>
                                  <div className="containerBiaN_f_col width100percent">
                                    <div className="submitBTNBN_wrapper">
                                      <button className="submitBTNBN cancelBTN">
                                        <FormattedMessage id="agent.Cancel" />

                                      </button>
                                      <button className="submitBTNBN" onClick={this.onSubmit}>
                                        <FormattedMessage id="agent.Save" />

                                      </button>
                                    </div>
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>


                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </IntlProvider>
      </>
    );
  }
}

// function for mapping redux state values with props //
const mapStateToProps = ({ agentReducer, commonReducer }) => {

  return {
    profileDetails: agentReducer.profileDetails,
    profileImage: agentReducer.profileImage,
    language: commonReducer.language
  }

};

//function for maping with dispatched actions with props //
const mapDispatchToProps = (dispatch) => ({

  getProfile: () => dispatch(getProfile()),


});


export default connect(mapStateToProps, mapDispatchToProps)(Profile);
