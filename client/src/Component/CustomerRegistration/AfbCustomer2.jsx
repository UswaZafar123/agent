import React, { Component } from "react";

//import "./src/Component/Agent/antDcustom.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import { Input } from "reactstrap";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const label = "";
const value = "";

function handleChange(value) {
  console.log(`selected ${value}`);
}

class AfbCustomer2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountNumber: "",
      lastName: "",
      dateOfBirth: new Date(),
      email: "",
      mobileNumber: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      country: "",
      zipCode: "",
      longitude: "",
      latitude: "",
      identification: "",
      uin: "",
      expiryDate: new Date(),
      modal: false,
    };
  }

  componentDidMount() {}

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

  state = {
    modal1: false,
    code: null,
    modal2: false,
  };

  toggle1 = () => {
    this.setState({ modal1: !this.state.modal1 });
  };
  toggle2 = () => {
    this.setState({ modal2: !this.state.modal2 });
    this.setState({ modal1: false });
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
                        Send Money
                      </h1>
                      <button
                        className="addposbtn c_first_pending_BTN"
                        onClick={this.addChange}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                  <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                    <h1 className="list_top_heading textAlignCenter text-center">
                      Profile Details
                    </h1>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label"> </label>
                        <div className="inputFlash"></div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label"> </label>
                        <div className="inputFlash"></div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label"> Mobile Number </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="273454545"
                            name="mobileNumber"
                            value={this.state.mobileNumber}
                          ></Input>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label"> Zip Code </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="Zip code"
                            name="zipCode"
                            value={this.state.zipCode}
                          ></Input>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label"> Email Id </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            style={{ width: 100 + "%", height: 52 }}
                          ></Input>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">
                          {" "}
                          Account Number{" "}
                        </label>
                        <div className="inputFlash">
                          <Input
                            type="text"
                            placeholder="Account Number"
                            name="accountNumber"
                            value={this.state.accountNumber}
                            style={{ width: 100 + "%", height: 52 }}
                          ></Input>
                        </div>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <label className="non-afb-label">Signature Image</label>
                        <div className="inputFlash">
                          <Input type="file" name="signatureIamge"></Input>
                        </div>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <label> </label>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <button className="btn_1_view_proof_banking_opening">
                          {" "}
                          View Proof
                        </button>
                      </Grid>

                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              color="secondary"
                              name="saveAddress"
                              value="yes"
                            />
                          }
                          label="I AGREE TO THE TERMs & CONDITIONS AND PRIVACY POLICY OF SARA BANKING"
                        ></FormControlLabel>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <button className="btn-cancel-non-afb"> Back</button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <button
                          className="btn-submit-non-afb "
                          onClick={() => this.toggle1()}
                        >
                          {" "}
                          Submit
                        </button>
                      </Grid>
                    </Grid>
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

//   const mapDispatchToProps = dispatch => {
//     return {
//       getMerchantTransactionList: (token, firstDayFormat,todayDateFormat,currency) => dispatch(getMerchantTransactionList(token, firstDayFormat,todayDateFormat,currency)),
//       getCurrencies: (token) => dispatch(getCurrencies(token)),
//     }
//   }

export default AfbCustomer2;

{
  /* <Select className="selectWeidth"
                                                //    defaultValue="Cameroun"
                                                //    labelId="demo-simple-select-outlined-label10"
                                                //    id="demo-simple-select-outlined10"
                                                //    name="editDeliveryContainer"
                                                 Label="Cmaeroun"
                                                   onChange={handleChange}
                                                   height='30px' >
                                                   <Option value="US">United-State</Option>
                                                   <Option value="CM">Cameroun</Option>
                                                   <Option value="FR">France</Option>
                                                   <Option value="NG">Nigeria</Option>
                                                   <Option value="GN">Guinée</Option>
                                                   <Option value="CI">Cote d'Ivoire</Option>

                                                 </Select> */
}
