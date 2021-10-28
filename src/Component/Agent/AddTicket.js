import React, { Component } from "react";
import { Select } from "antd";
import activeUser from "../../Assets/images/confirm.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { withRouter } from "react-router-dom";
import { toastr } from "react-redux-toastr";

import Dropzone from "react-dropzone";
import {
  ticketsPriorities,
  uploadAttachment,
  addTicket,
} from "../../../src/services/actions";

import { connect } from "react-redux";

const { Option } = Select;

class AddTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
      formValid: false,
      subjectValid: false,
      subjectError: "",
      textError: "",
      textValid: false,
      priorityValueValid: false,
      priorityValueError: "",
      files: [],
      gridApi: null,
      isModalVisible: false,
      kycMerchantCategory: null,
      view: false,
      popup: false,
      priority: [],
      priorityValue: "",
      text: "",
      uploads: [],
    };
  }

  save = () => {
    this.setState({
      popup: true,
    });
  };
  close = () => {
    this.setState({
      popup: false,
    });
  };
  handleChange = (e) => {
    this.setState({ kycMerchantCategory: e });
  };

  Cancel = () => {
    this.props.history.push("/agent/tickets");
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
  onTax = () => {
    // this.setState({
    //   view: true
    // })
    this.props.history.push("/taxationOffice");
  };
  back = () => {
    this.props.history.push("/agent/tickets");
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });

    if (value == "") {
      this.setState(
        {
          subjectError: "pleaese enter title",
          subjectValid: false,
        },
        this.validate()
      );
    } else {
      this.setState(
        {
          subjectError: "",
          subjectValid: true,
        },
        this.validate()
      );
    }
  };

  setPriority = (value) => {
    this.setState({ priorityValue: value, priorityValueValid: true }, () =>
      this.validate()
    );
  };

  setStatus = (value) => {
    this.setState({ status: value });
  };

  handleProcedureContentChange = (content, delta, source, editor) => {
    this.setState({ text: content });
    if (editor.getText().trim().length == 0) {
      this.setState(
        {
          textError: "please type the message",
          textValid: false,
        },
        this.validate()
      );
    } else {
      this.setState(
        {
          textError: "",
          textValid: true,
        },
        this.validate()
      );
    }

    console.log(content, "content");
  };

  submitData = () => {
    if (this.state.subject == "") {
      toastr.warning("please enter subject");
    } else if (this.state.text == "" || this.state.textError !== "") {
      toastr.warning("please enter description");
    } else {
      var payload = {
        title: this.state.subject,
        content: this.state.text,
        priority: this.state.priorityValue,
        status: "OPENED",
        attachments: this.state.uploads,
      };

      this.props.addTicket(sessionStorage.getItem("token"), payload);

      this.setState({
        uploads: [],
        files: [],
        subject: "",
        text: "",
        priorityValue: "",
        textError: "",
        textValid: false,
        subjectError: "",
        subjectValid: false,
        priorityValueValid: false,
      });
    }
  };

  uploadDocuments(file) {
    if (
      file[0].type == "image/jpeg" ||file[0].type == "image/jpg"||
      file[0].type == "image/png" ||
      file[0].type == "application/pdf"
    ) {
      let formData = new FormData();
      let token = sessionStorage.getItem("token");
      formData.append("document", file[0]);
      formData.append("type", "TICKET");
      this.props.uploadAttachment(token, formData);
      var sub = this.state.files;
      sub.push({ file: file });
      this.setState({ files: sub });
    } else {
      toastr.error("unsupported file,please select png/jpeg/pdf");
    }

    console.log(this.state.files, "filessss");
  }

  validate = () => {
    console.log(
      this.state.priorityValueValid,
      this.state.textValid,
      this.state.subjectValid,
      "validationnnnn"
    );
    this.setState({
      formValid:
        this.state.priorityValueValid &&
        this.state.textValid &&
        this.state.subjectValid,
    });
  };

  componentDidMount() {
    this.props.ticketsPriorities(sessionStorage.getItem("token"));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.ticketsPriorityStatus) {
      this.setState({ priority: nextProps.ticketsPriorityData });
    }

    if (nextProps.ticketsUploadAttcahmentStatus) {
      var data = this.state.uploads;
      data.push({
        id: nextProps.ticketsUploadAttcahmentData.id,
      });
      this.setState({
        uploads: data,
      });

      console.log(nextProps.ticketsUploadAttcahmentData, "attachmantData");
    }
  }

  render() {
    const files = this.state.files.map((data) => (
      <li key={data.file[0].name}>
        {data.file[0].name} - {data.file[0].size} bytes &ensp;
        {/* <buton className="btn btn danger"> X </buton> */}
      </li>
    ));
    return (
      <div className="main_contain responsive_p addRicketP">
        <div className="merch_m_list_w">
          <div className="merch_list_card" id="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="flCenterColumn">
                      <h1 className="list_top_heading textAlignCenter">
                        Add Ticket
                      </h1>
                    </div>
                  </div>
                  <div
                    className="filter_wrapper"
                    style={{ paddingBottom: "12px" }}
                  >
                    <div className="addTInW">
                      <div className="row" style={{ marginBottom: "24px" }}>
                        <div className="col-md-3">
                          <label className="formColLabel formCladdT">
                            {" "}
                            Subject<span className="mendot">*</span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <input
                            type="text"
                            value={this.state.subject}
                            placeholder="Enter Subject"
                            style={{
                              minHeight: "52px",
                              fontSize: "18px",
                              paddingLeft: "18px",
                            }}
                            name="subject"
                            onChange={this.handleChange}
                          />
                          <br></br>
                          <div style={{ color: "red" }}>
                            {this.state.subjectError}
                          </div>
                        </div>
                      </div>
                      <div className="row" style={{ marginBottom: "24px" }}>
                        <div className="col-md-3">
                          <label className="formColLabel formCladdT">
                            Message<span className="mendot">*</span>
                          </label>
                        </div>
                        <div className="col-md-6" style={{ height: "250px" }}>
                          <ReactQuill
                            theme="snow"
                            height="200"
                            style={{ height: "200px" }}
                            value={this.state.text}
                            placeholder="Write Somthing..."
                            onChange={this.handleProcedureContentChange}
                          ></ReactQuill>
                          <br></br>
                          <div style={{ color: "red" }}>
                            {this.state.textError}
                          </div>
                        </div>
                      </div>
                      {/* <div className="row" style={{marginBottom:"24px"}}>
                                    <div className="col-md-3">
                                    <label className="formColLabel formCladdT"> User</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" placeholder="Enter" style={{minHeight:"52px",fontSize:"18px",paddingLeft:"18px"}}/>
                                    </div>
                                </div> */}

                      <div className="row" style={{ marginBottom: "24px" }}>
                        <div className="col-md-3">
                          <label className="formColLabel formCladdT">
                            {" "}
                            Priority<span className="mendot">*</span>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="categorySelect changedDropB">
                            <Select
                              style={{ width: 100 + "%", height: 52 }}
                              value={this.state.priorityValue}
                              name="priority"
                              onChange={this.setPriority}
                            >
                              {this.state.priority &&
                                this.state.priority.length > 0 &&
                                this.state.priority.map((data) => {
                                  return <Option value={data}>{data}</Option>;
                                })}
                            </Select>
                          </div>
                        </div>
                      </div>

                      <div className="row" style={{ marginBottom: "24px" }}>
                        <div className="col-md-3">
                          <label className="formColLabel formCladdT">
                            {" "}
                            Attachment
                          </label>
                        </div>
                        <div className="col-md-6">
                          <Dropzone
                            onDrop={(acceptedFiles) =>
                              this.uploadDocuments(acceptedFiles)
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <section className="dropzone">
                                <div {...getRootProps()}>
                                  <input {...getInputProps()} />
                                  <p>
                                    Drag 'n' drop some files here, or click to
                                    select files
                                  </p>
                                </div>
                              </section>
                            )}
                          </Dropzone>
                          <h4>{this.state.files.length > 0 ? "Files" : ""}</h4>
                          <ul>{files}</ul>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div class="confirm_p_w mTB00">
                            <button
                              onClick={this.Cancel}
                              class="aryousureBTN can"
                              style={{ marginRight: "24px" }}
                            >
                              Cancel
                            </button>
                            <button
                              // disabled={!this.state.formValid}
                              class="aryousureBTN confirmBtnR"
                              onClick={this.submitData}
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
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ merchantReducer }) => {
  const {
    ticketsPriorityData,
    ticketsPriorityStatus,
    ticketsUploadAttcahmentData,
    ticketsUploadAttcahmentStatus,
  } = merchantReducer;

  return {
    ticketsPriorityData,
    ticketsPriorityStatus,
    ticketsUploadAttcahmentData,
    ticketsUploadAttcahmentStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ticketsPriorities: (token) => dispatch(ticketsPriorities(token)),
  uploadAttachment: (token, data) => dispatch(uploadAttachment(token, data)),
  addTicket: (token, payload) => dispatch(addTicket(token, payload)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddTicket)
);
