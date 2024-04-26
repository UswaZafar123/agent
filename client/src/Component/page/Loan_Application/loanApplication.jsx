import React, { Component } from "react";

import Grid from "@material-ui/core/Grid";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { Button, Input, Label, Modal, ModalHeader } from "reactstrap";
import IMAGES from "../../../Assets/images";
// import { opacity } from 'html2canvas/dist/types/css/property-descriptors/opacity';

function handleChange(value) {
  console.log(`selected ${value}`);
}

class LoanApplication extends Component {
  componentDidMount() {
    // var date = new Date();
    // var firstDayFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    // var todayDateFormat = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    // this.props.getMerchantTransactionList(sessionStorage.getItem("token"), firstDayFormat,todayDateFormat,"XAF");
    // this.props.getCurrencies(sessionStorage.getItem("token"));
  }
  handleChange = (value) => {
    this.state.gridApi.paginationSetPageSize(Number(value));
    // document.getElementById('totalPageSize').innerHTML=this.state.gridApi.paginationGetPageSize()
    document.getElementById("bTo").innerHTML =
      this.state.gridApi.paginationGetPageSize();
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  handleOk = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  onCloseHandler = () => {
    this.setState({
      isModalVisible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  toggle1 = () => {
    this.setState({ modal1: !this.state.modal1 });
  };

  state = {
    modal1: false,
    code: null,
    modal2: false,
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
                        Loan Application
                      </h1>
                      {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                    </div>
                  </div>
                  <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                    <div
                      className="ag-theme-alpine agGridCustomize"
                      style={{ height: 900, width: 100 + "%" }}
                    >
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <label className="label2"> Name </label>
                          <div className="inputCol">
                            <Input
                              type="text"
                              placeholder=" Name"
                              name="firstName"
                            ></Input>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <label className="label2"> Birtht of Day </label>
                          <div className="inputCol">
                            <Input
                              type="text"
                              placeholder="dd-mm-yyyy"
                              name="lastName"
                            ></Input>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <label className="label2">Mobile Number </label>
                          <div className="inputCol">
                            <Input
                              type="text"
                              placeholder="Date of Birth"
                              name="date"
                            ></Input>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <label className="label2">E-mail id </label>
                          <div className="inputCol">
                            <Input
                              type="text"
                              placeholder="e-mail"
                              name="email"
                            ></Input>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <label className="label2">Full Adress </label>
                          <div style={{ width: 950 }}>
                            <Input
                              type="text"
                              placeholder="Full Address"
                              name="adress"
                            ></Input>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}></Grid>
                        <Grid item xs={12} sm={6}>
                          <label className="label2">City</label>
                          <div className="inputCol">
                            <Input
                              type="text"
                              placeholder="City "
                              name="City"
                            ></Input>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <label className="label2">Country </label>
                          <div className="inputCol">
                            <Input
                              type="text"
                              placeholder="Country"
                              name="Country"
                            ></Input>
                          </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label className="label2">Postal Poste </label>
                          <div className="inputCol">
                            <Input
                              type="text"
                              placeholder="Postal Poste"
                              name="Postal Poste"
                            ></Input>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <label className="label2">Amount of credit </label>
                          <div className="inputCol">
                            <Input
                              type="text"
                              placeholder="Amount of credit"
                              name="Amount of credit"
                            ></Input>
                          </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <label className="label2">Duration of Loan </label>
                          <div className="inputCol">
                            <Input
                              type="text"
                              placeholder="Duration of Loan"
                              name="Duration of Loan"
                            ></Input>
                          </div>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                          <label className="label2">Purpose of Loan </label>
                          <div className="inputCol">
                            <Input
                              type="text"
                              placeholder="Purpose of Loan"
                              name="Purpose "
                            ></Input>
                          </div>
                        </Grid>
                      </Grid>

                      <div className="divButton" style={{ marginLeft: 130 }}>
                        <Button
                          className="buttonDisable"
                          style={{
                            borderRadius: 20,
                            width: "170px",
                            borderBlockColor: "white",
                            backgroundColor: "#464646",
                          }}
                        >
                          Cancel
                        </Button>
                        <div
                          style={{ marginLeft: 200, marginRight: 300 }}
                        ></div>
                        <Button
                          className="buttonDisable"
                          onClick={this.toggle1}
                          style={{
                            borderRadius: 20,
                            width: "170px",
                            backgroundColor: "red",
                            borderBlockColor: "white",
                          }}
                        >
                          Submit
                        </Button>
                      </div>

                      <Modal
                        isOpen={this.state.modal1}
                        className={this.props.className}
                        style={{
                          width: 600,
                          paddingTop: 200,
                          borderRadius: 30,
                        }}
                      >
                        <ModalHeader>
                          <div
                            style={{
                              justifyContent: "center",
                              alignContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ height: 140 }}>
                              <img src={IMAGES.success} alt="success" />
                            </div>
                            <div>
                              <Label
                                style={{
                                  fontSize: 30,
                                  fontWeight: "bold",
                                  color: "#00479a",
                                  marginTop: 20,
                                  marginLeft: 150,
                                }}
                              >
                                Submitted
                              </Label>
                              <Label
                                className="formColLabel1"
                                style={{
                                  marginTop: 20,
                                  marginLeft: 15,
                                  fontSize: 23,
                                }}
                              >
                                Your Application for Loan is submitted
                              </Label>
                            </div>
                          </div>
                        </ModalHeader>
                      </Modal>
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

export default LoanApplication;

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
