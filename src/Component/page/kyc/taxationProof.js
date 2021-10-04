import React, { Component } from "react";
import "../../../css/dashboard.css";
import "../../../css/merchant_management.css";
import "../../../css/ag-grid-customization01.css";
import "antd/dist/antd.css";
import "../../Agent/antDcustom.css";
import "../../../css/customer_registration.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import NativeSelect from "@material-ui/core/NativeSelect";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import MomentUtils from "@date-io/moment";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";
import moment from "moment";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Form,
  FormGroup,
  FormText,
  Input,
  Label,
} from "reactstrap";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    width: 700,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

class ReciveMoney extends Component {
  constructor() {
    super();

    this.state = {
      dob: null,
    };
  }

  handleDateChange = (date, name) => {
    //hello checking
    this.setState({ [name]: date });
  };

  render() {
    // console.log("jai",this.state.paginationGetCurrentPage)
    return (
      <div className="main_contain">
        <div className="merch_m_list_w">
          <div className="merch_list_card" id="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="kyccustomformheading">
                      <h1 className="list_top_heading textAlignCenter text-center">
                        KYC Form
                      </h1>
                      {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                    </div>
                  </div>
                  <div className=" chartCardMiddle p_d_all_24">
                    <div className="fornContainer_a_1">
                      <div className="row_a_1">
                        <div className="col_a_1">
                          <label>Date of Birth</label>
                          <div className="input_wrapper_a_1">
                            <MuiPickersUtilsProvider utils={MomentUtils}>
                            <KeyboardDatePicker
                              disableToolbar
                              variant="inline"
                              format="yyyy-MM-DD"
                              margin="normal"
                              placeholder="Select Date"
                              style={{ width: "100%" }}
                              id="date-picker-inline"
                              value={this.state.dob}
                              onChange={(date) =>
                                this.handleDateChange(date, "dob")
                              }
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                          </div>
                        </div>
                        <div className="col_a_1">
                          <label>ID Documet Type</label>
                          <div className="input_wrapper_a_1">
                            <NativeSelect
                            value={this.state.gender}
                            name="gender"
                            onChange={this.handleChange}
                            input={<BootstrapInput />}
                            className="SelectMUI"
                          >
                            <option value="">Select document type</option>
                            <option value={"ID_DOCUMENT"}>ID Document</option>
                          </NativeSelect>
                          </div>
                        </div>
                        
                        <div className="col_a_1">
                          <label>ID Documet Name</label>
                          <div className="input_wrapper_a_1">
                          <Input
                          type="text"
                          placeholder="ID Document Name"
                          name="ID Document Name"
                          onChange={this.handleChangeText}
                          value={this.state.idNumber}
                        ></Input>
                          </div>
                        </div>
                        <div className="col_a_1">
                          <label>ID Documet Number</label>
                          <div className="input_wrapper_a_1">
                          <Input
                          type="text"
                          placeholder="ID Document number"
                          name="ID Document Name"
                          onChange={this.handleChangeText}
                          value={this.state.idNumber}
                        ></Input>
                          </div>
                        </div>
                        <div className="col_a_1">
                          <label>ID Documet Expiry Date</label>
                          <div className="input_wrapper_a_1">
                          <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-DD"
                            placeholder="Select Date"
                            margin="normal"
                            style={{ width: "100%" }}
                            id="date-picker-inline"
                            value={this.state.dob}
                            onChange={(date) =>
                              this.handleDateChange(date, "dob")
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                          </div>
                        </div>
                        <div className="col_a_1">
                          <label>Email</label>
                          <div className="input_wrapper_a_1">
                            <Input
                            type="text"
                            placeholder="Email"
                            name="ID Document Name"
                            onChange={this.handleChangeText}
                            value={this.state.idNumber}
                          ></Input>
                          </div>
                        </div>
                        <div className="col_a_1">
                          <label>ID Document File</label>
                          <div className="input_wrapper_a_1">
                          <Input
                          type="file"
                          name="addressProof"
                          name="idImages"
                          onChange={this.handleFile}
                        ></Input>
                          </div>
                        </div>
                        
                      </div>
                      
                    </div>
                    {/* <Grid container spacing={6}> */}
                      {/* <Grid item xs={12} sm={6}>
                        <label className="non-afb-label"> Date of Birth </label>

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-DD"
                            margin="normal"
                            style={{ width: "100%" }}
                            id="date-picker-inline"
                            value={this.state.dob}
                            onChange={(date) =>
                              this.handleDateChange(date, "dob")
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid> */}

                      {/* <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">
                          ID Documet Type{" "}
                        </label>

                        <NativeSelect
                          value={this.state.gender}
                          name="gender"
                          onChange={this.handleChange}
                          input={<BootstrapInput />}
                        >
                          <option value="">Select document type</option>
                          <option value={"ID_DOCUMENT"}>ID Document</option>
                        </NativeSelect>
                      </Grid> */}
                      {/* <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">
                          {" "}
                          ID Document Name{" "}
                        </label>
                        <Input
                          type="text"
                          placeholder="ID Document Name"
                          name="ID Document Name"
                          onChange={this.handleChangeText}
                          value={this.state.idNumber}
                        ></Input>
                      </Grid> */}

                      {/* <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">
                          {" "}
                          ID Document Number{" "}
                        </label>
                        <Input
                          type="text"
                          placeholder="ID Document number"
                          name="ID Document Name"
                          onChange={this.handleChangeText}
                          value={this.state.idNumber}
                        ></Input>
                      </Grid> */}

                      {/* <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">
                          ID Document Expiry Date{" "}
                        </label>

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="yyyy-MM-DD"
                            margin="normal"
                            style={{ width: "100%" }}
                            id="date-picker-inline"
                            value={this.state.dob}
                            onChange={(date) =>
                              this.handleDateChange(date, "dob")
                            }
                            KeyboardButtonProps={{
                              "aria-label": "change date",
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid> */}

                      {/* <Grid item xs={12} sm={6}>
                        <label className="non-afb-label"> Email </label>
                        <Input
                          type="text"
                          placeholder="Email"
                          name="ID Document Name"
                          onChange={this.handleChangeText}
                          value={this.state.idNumber}
                        ></Input>
                      </Grid> */}

                      {/* <Grid item xs={12} sm={12}>
                        <label className="non-afb-label">
                          ID Document File
                        </label>

                        <Input
                          type="file"
                          name="addressProof"
                          name="idImages"
                          onChange={this.handleFile}
                        ></Input>
                      </Grid> */}
                    {/* </Grid> */}

                    <div style={{width:"100%",float:"left"}}>
                      <div class="custom-d-flex confirm_p_w mTB00 button-container"> 
                        <button class="blackbtn aryousureBTN confirmBtnR">
                          Clear
                        </button>

                        <button class="aryousureBTN confirmBtnR">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReciveMoney;

{
  /* <div className="main_contain">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                              Recive Money
                                            </h1>
                                            {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */
}
// </div>
// </div>
//                     <div className=" chartCardMiddle" style={{ padding: "24px" }}>

//                         <div
//                             className="ag-theme-alpine agGridCustomize"
//                             style={{ height: 400, width: 100 + "%" }}
//                         >

//                         </div>
//                         <div className="customAgFooter">

//                             <div className="NextPrevW">

//                             </div>

//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     </div>
// </div>

//</div>
