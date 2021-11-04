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
        fromDate:null

    };
  }



 
 

  
 

 
  onChange(checked) {
    console.log(`switch to ${checked}`);
  }

 

  render() {
    return (
      <>
       
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
                              Profile
                            </h1>
                          </div>
                        </div>
                      <div className="chartCardMiddle addSome">
                      <div className="kycDetailsBox " style={{border:"none"}}>
                          <div className="uploadProfile_w">
                            <div className="uploadProfile">
                                <h2 className="uptop">Upload Profile Photo</h2>
                                <div className="profileImg">
                                    <img src={myImage} />
                                </div>
                                <div className="uploadPText">
                                    <input type="file" />
                                </div>
                            </div>
                            <div className="uploadProfile">
                                <h2 className="uptop">Upload Logo</h2>
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
                                    <label className="formColLabel">URL</label>
                                    <input
                                    name="url"
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleChange1}
                                    placeholder="Enter Valid URL"
                                    />
                                    <div>
                                    <span style={{ color: "red",display:"block",marginTop:"8px"}}>{"Please Enter Valid URL"}</span>
                                    </div>
                                </div>
                                <div className="formCol">
                                    <label className="formColLabel">Name</label>
                                    <input
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleChange1}
                                    placeholder="Enter Name"
                                    />
                                    <div>
                                    {/* <span style={{ color: "red",display:"block",marginTop:"8px"}}>{"Please Enter Valid URL"}</span> */}
                                    </div>
                                </div>
                                <div className="formCol">
                                    <label className="formColLabel">Email</label>
                                    <input
                                    name="email"
                                    type="text"
                                    className="form-control"
                                    onChange={this.handleChange1}
                                    placeholder="Enter Email"
                                    />
                                    <div>
                                    {/* <span style={{ color: "red",display:"block",marginTop:"8px"}}>{"Please Enter Valid URL"}</span> */}
                                    </div>
                                </div>
                                <div className="formCol">
                                    <label className="formColLabel">Phone Number</label>
                                    <input
                                    name="pNumber"
                                    type="number"
                                    className="form-control"
                                    onChange={this.handleChange1}
                                    placeholder="Enter Phone Number"
                                    />
                                    <div>
                                    {/* <span style={{ color: "red",display:"block",marginTop:"8px"}}>{"Please Enter Valid URL"}</span> */}
                                    </div>
                                </div>
                                <div className="formCol" style={{flexDirection:"row"}}>
                                    <label className="formColLabel">MFA Status
                                    <Switch defaultChecked onChange={onChange} style={{marginLeft:"12px"}} />
                                    
                                    
                                    </label>
                                    <div>
                                    {/* <span style={{ color: "red",display:"block",marginTop:"8px"}}>{"Please Enter Valid URL"}</span> */}
                                    </div>
                                </div>
                            </div>
                            <div className="containerBiaN_form" style={{width:"100%"}}>
                                <div className="containerBiaN_f_row">
                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                    {/* for Blank Space */}
                                </div>
                                <div className="containerBiaN_f_col width100percent">
                                    <div className="submitBTNBN_wrapper">
                                        <button className="submitBTNBN cancelBTN">Cancel</button>
                                        <button className="submitBTNBN">Save</button>
                                        
                                        
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
     
      </>
    );
  }
}


export default Profile;
