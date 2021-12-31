import React, { Component } from 'react';
import '../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import './formfromold.css'
import './addAccount.css'


import { Select, DatePicker, Modal, Switch, Upload, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import { Radio } from 'antd';
import moment from 'moment';
import { FormattedMessage, IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
const dateFormat = 'YYYY/MM/DD';
// const customFormat = value => `custom format: ${value.format(dateFormat)}`;
const { Option } = Select;
const { Dragger } = Upload;

function onChange(date, dateString) {
  console.log(date, dateString);
}


function handleChange(value) {
  console.log(`selected ${value}`);
}

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      valueRadio: 1,
      info: false,
      messages: "",
      language: ""

    }



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

  showInfo() {
    // this.setState({ info: true });
  }
  handleChange(value) {
    console.log(`selected ${value}`);
  }
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }
  back = () => {
    this.props.cancel()
  }

  componentDidMount() {
    this.translationHelperFunction();

  }

  async componentWillReceiveProps(nextprops) {
    if (nextprops.language) {
      const messages = await this.loadLocaleData(nextprops.language);

      this.setState({
        messages: messages,
        language: nextprops.language
      });
    }
  }
  render() {
    console.log("infoParvat", this.state.info)
    return (
      <>
        <IntlProvider
          messages={this.state.messages.default}
          locale={this.state.language}
        >
          <div className="main_contain">
            <div className="merch_m_list_w">
              <div className="merch_list_card" id="merch_list_card">
                <div className="section_custom">
                  <div className="sectionInn">
                    <div className="chartCard_w">
                      <div className="chartCardTop">
                        <div className="flCenterColumn">
                          <h1 className="list_top_heading textAlignCenter">
                            <FormattedMessage id="agent.ChangePassword" />
                          </h1>
                        </div>
                      </div>


                      <div className="chartCardMiddle addSome">
                        <div className="containerBiaN_form">
                          <div className="containerBiaN_f_row">
                            <div className="containerBiaN_f_col width30percent textAlignRight">
                              <label>
                                <FormattedMessage id="agent.OldPassword" />

                              </label>
                            </div>
                            <div className="containerBiaN_f_col width70percent">
                              <FormattedMessage id="agent.OldPassword">
                                {
                                  (word) => <input type="text" placeholder={word} />
                                }
                              </FormattedMessage>
                              {/* <span style={{ color: "red", display: "block", marginTop: "12px" }}>Please Enter Password Address</span> */}
                            </div>
                          </div>
                          <div className="containerBiaN_f_row">
                            <div className="containerBiaN_f_col width30percent textAlignRight">
                              <label>
                                <FormattedMessage id="agent.NewPassword" />

                              </label>
                            </div>
                            <div className="containerBiaN_f_col width70percent">
                              <FormattedMessage id="agent.NewPassword">
                                {
                                  (word) => <input type="text" placeholder={word} />
                                }
                              </FormattedMessage>
                              {/* <span style={{color:"red",display: "block",marginTop: "12px"}}>Please Enter Valid Email Address</span> */}
                            </div>
                          </div>
                          <div className="containerBiaN_f_row">
                            <div className="containerBiaN_f_col width30percent textAlignRight">
                              <label>
                                <FormattedMessage id="agent.ConfirmNewPassword" />

                              </label>
                            </div>
                            <div className="containerBiaN_f_col width70percent">
                              <FormattedMessage id="agent.ConfirmNewPassword">
                                {
                                  (word) => <input type="text" placeholder={word} />
                                }
                              </FormattedMessage>
                              {/* <span style={{color:"red",display: "block",marginTop: "12px"}}>Please Enter Valid Email Address</span> */}
                            </div>
                          </div>

                        </div>

                        <div className="containerBiaN_form">
                          <div className="containerBiaN_f_row">
                            <div className="containerBiaN_f_col width30percent textAlignRight">
                              {/* for Blank Space */}
                            </div>
                            <div className="containerBiaN_f_col width100percent">
                              <div className="submitBTNBN_wrapper">
                                <button className="submitBTNBN cancelBTN" onClick={this.back}>
                                  <FormattedMessage id="agent.Cancel" />

                                </button>
                                <button className="submitBTNBN" onClick={this.showInfo}>
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
        </IntlProvider>
      </>
    );
  }
}

const mapStateToProps = ({ commonReducer }) => {
  const { language } = commonReducer

  return {
    language
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)