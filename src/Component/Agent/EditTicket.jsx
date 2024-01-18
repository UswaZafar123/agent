import React, { Component } from "react";
import { Select, Modal } from "antd";
import activeUser from "../../Assets/images/confirm.svg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { withRouter } from "react-router-dom";

import Dropzone from "react-dropzone";
import {
  ticketsPriorities,
  uploadAttachment,
  UpdateTicket,
  viewAttachmentFile,
} from "../../../src/services/agent/action";
import { toastr } from "react-redux-toastr";

import { connect } from "react-redux";

const { Option } = Select;

class AddTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: "",
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
      viewPng: false,
      viewPdf: false,
      textError: "",
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
    this.props.goBack();
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
    this.props.history.push("/tickets");
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  setPriority = (value) => {
    this.setState({ priorityValue: value });
  };

  setStatus = (value) => {
    this.setState({ status: value });
  };

  handleProcedureContentChange = (content, delta, source, editor) => {
    this.setState({ text: content });
    if (editor.getText().trim().length == 0) {
      this.setState({
        textError: "please type the message",
      });
    } else {
      this.setState({
        textError: "",
      });
    }

    console.log(content, "content");
  };

  submitData = () => {
    if (this.state.subject == "") {
      toastr.warning("please enter subject");
    } else if (this.state.text == "" || this.state.textError != "") {
      toastr.warning("please enter description");
    } else {
      var payload = {
        title: this.state.subject,
        content: this.state.text,
        priority: this.state.priorityValue,
        attachments: this.state.uploads,
      };

      this.props.UpdateTicket(
        sessionStorage.getItem("token"),
        payload,
        this.props.editData.ticketNo,
        this.props.history
      );

      this.setState({
        uploads: [],
        files: [],
        subject: "",
        text: "",
        priorityValue: "",
      });

      this.props.goBack();
    }
  };

  uploadDocuments(file) {
    if (
      file[0].type == "image/jpeg" ||
      file[0].type == "image/jpg" ||
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

  componentDidMount() {
    this.props.ticketsPriorities(sessionStorage.getItem("token"));

    console.log(this.props.editData, "this.props.editData");

    this.setState({
      subject: this.props.editData.title,
      text: this.props.editData.content,
      priorityValue: this.props.editData.priority,
    });
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

    if (nextProps.uploadedFileStatus) {
      var binaryData = [];
      binaryData.push(nextProps.uploadedFileData);

      if (
        nextProps.uploadedFileData.type == "image/png" ||
        nextProps.uploadedFileData.type == "image/jpeg"
      ) {
        this.setState({
          view: window.URL.createObjectURL(
            new Blob(binaryData, { type: "image/png" })
          ),
          viewPng: true,
        });
      } else {
        this.setState({
          view: window.URL.createObjectURL(
            new Blob(binaryData, { type: "application/pdf" })
          ),
          viewPdf: true,
        });
      }
    }
  }

  viewFile = (e, data) => {
    this.props.viewAttachmentFile(sessionStorage.getItem("token"), data.uuid);
  };

  render() {
    const files = this.state.files.map((data) => (
      <li key={data.file[0].name}>
        {data.file[0].name} - {data.file[0].size} bytes &ensp;
        {/* <buton className="btn btn danger"> X </buton> */}
      </li>
    ));
    return (
      <div className="main_contain">
        <div className="merch_m_list_w">
          <div className="merch_list_card" id="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="flCenterColumn">
                      <h1 className="list_top_heading textAlignCenter">
                        Edit Ticket
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
                            Subject
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
                            Priority
                          </label>
                        </div>
                        <div className="col-md-6">
                          <div className="categorySelect changedDropB">
                            <Select
                              value={this.state.priorityValue}
                              style={{ width: 100 + "%", height: 52 }}
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

                      <table
                        className=" table table-borderless"
                        style={{ width: "30%", marginLeft: "400px" }}
                      >
                        {this.props.editData.attachments.map((data) => {
                          return (
                            <tr>
                              <td>{data.originalName}</td>
                              <td style={{ marginTop: "10px" }}>
                                <button
                                  className="btn btn-success"
                                  onClick={(e) => this.viewFile(e, data)}
                                >
                                  view
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </table>

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
                              class="aryousureBTN confirmBtnR"
                              onClick={this.submitData}
                            >
                              Save
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

        <Modal
          visible={this.state.viewPng}
          cancelButtonProps={{ style: { display: "none !important" } }}
          onCancel={() => this.setState({ viewPng: false })}
          footer={null}
        >
          <img src={this.state.view} />
        </Modal>

        {this.state.viewPdf && (
          <div style={{ zIndex: "1000" }}>
            <Modal
              visible={this.state.viewPdf}
              cancelButtonProps={{ style: { display: "none !important" } }}
              onCancel={() => this.setState({ viewPdf: false })}
              footer={null}
            >
              <iframe src={this.state.view} frameborder="0"></iframe>
            </Modal>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = ({ agentReducer }) => {
  const {
    ticketsPriorityData,
    ticketsPriorityStatus,
    ticketsUploadAttcahmentData,
    ticketsUploadAttcahmentStatus,
    uploadedFileStatus,
    uploadedFileData,
  } = agentReducer;

  return {
    ticketsPriorityData,
    ticketsPriorityStatus,
    ticketsUploadAttcahmentData,
    ticketsUploadAttcahmentStatus,
    uploadedFileStatus,
    uploadedFileData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  ticketsPriorities: (token) => dispatch(ticketsPriorities(token)),
  uploadAttachment: (token, data) => dispatch(uploadAttachment(token, data)),
  UpdateTicket: (token, payload, ticketNo, history) =>
    dispatch(UpdateTicket(token, payload, ticketNo, history)),
  viewAttachmentFile: (token, uuid) =>
    dispatch(viewAttachmentFile(token, uuid)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddTicket)
);
