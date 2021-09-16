import React, { Component } from "react";
import { Select } from "antd";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";
import { linking, linkingFalse } from "../../../services/agent/action";

const { Option } = Select;

class Linking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customerId: "",
      accountNumber: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount(){
this.props.linkingFalse()
  }

  save = () => {
    var payload = {
      bankAccountNumber: this.state.accountNumber,
      bankCustomerId: this.state.customerId,
    };
    this.props.linking(sessionStorage.getItem("token"), payload);
  };

  componentWillReceiveProps(nextProps){

    if(nextProps.linkingStatus){


        this.props.history.push({
            pathname:"/Settings/linkingAccount/verification",
            data:nextProps.linkingList
        })
    }

  }

  render() {
    return (
      <div className="main_contain responsive_p">
        <div className="merch_m_list_w">
          <div className="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="kyccustomformheading">
                      <h1 className="zeropadding list_top_heading textAlignCenter text-center">
                        Account Linking
                      </h1>
                    </div>
                  </div>
                  <div
                    className="kyccustomform chartCardMiddle"
                    style={{ padding: "24px" }}
                  >
                    <div style={{ margin: "0 auto", display: "table" }}>
                      <table className="table table-responsive table-borderless">
                        <tbody>
                          <tr>
                            <td>BankAccountNumber</td>
                            <td>
                              <input
                                type="text"
                                name="accountNumber"
                                value={this.state.accountNumber}
                                onChange={this.handleChange}
                              />
                            </td>
                          </tr>
                          <br></br>

                          <tr>
                            <td>BankCustomerId</td>
                            <td>
                              <input
                                type="text"
                                value={this.state.customerId}
                                onChange={this.handleChange}
                                name="customerId"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div>
                      <div class="custom-d-flex confirm_p_w mTB00 button-container">
                        <button class="blackbtn aryousureBTN confirmBtnR">
                          Cancel
                        </button>
                        <button
                          class="aryousureBTN confirmBtnR"
                          onClick={this.save}
                        >
                          Submit
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
    );
  }
}

const mapStateToProps = ({ agentReducer }) => {

    const{linkingStatus,linkingList}=agentReducer
    return{
        linkingStatus,
        linkingList
    }


};

const mapDispatchToProps = (dispatch) => {

    return{
        linking: (token, data) => dispatch(linking(token, data)),
        linkingFalse:()=>dispatch(linkingFalse())

    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Linking);
