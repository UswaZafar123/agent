import React, { Component } from "react";
import "../../css/dashboard.css";
import "../../css/merchant_management.css";
// import './antDcustom.css';
import "antd/dist/antd.css";
import "./ticketM.css";
import moment from "moment";
import { withRouter } from "react-router-dom";
import {
  getATicket,
  addAreply,
  uploadAttachment,
  viewAttachmentFile,
} from "../../../src/services/actions";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Select, Menu, Dropdown, Modal, DatePicker } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";

import { connect } from "react-redux";

const { Option } = Select;

class Reply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticketNo: this.props.location.state.data,
      replies: [],
      ticket: [],
      text: "",
      files: [],
      uploads: [],
      viewPdf: false,
      viewPng: false,
    };
  }

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

  Cancel = () => {
    this.props.history.push("/agent/tickets");
  };

  handleParticipants = (value) => {
    let participants = [
      {
        userId: value,
      },
    ];

    console.log(participants);
  };

  //  React - quill
  modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  handleProcedureContentChange = (content, delta, source, editor) => {
    this.setState({ text: content });
  };

  handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  };

  setPriority = (value) => {
    this.setState({ priority: value });
  };

  setStatus = (value) => {
    this.setState({ status: value });
  };

  add = () => {
    console.log(this.state.text, "texzttttttttt");
    let token = sessionStorage.getItem("token");

    var data = {
      ticketId: this.state.ticket.id,
      content: this.state.text,
      attachments: this.state.uploads,
    };

    this.props.addAreply(token, data, this.state.ticket.ticketNo);

    this.setState({
      uploads: [],
      text: "",
      files: [],
    });
  };

  uploadDocuments(file) {
    let formData = new FormData();
    let token = sessionStorage.getItem("token");
    formData.append("document", file[0]);
    formData.append("type", "TICKET");

    this.props.uploadAttachment(token, formData);
    // console.log(file, "fileeeeee");
    var sub = this.state.files;
    sub.push({ filez: file });
    this.setState({ files: sub });
  }

  componentDidMount() {
    let token = sessionStorage.getItem("token");
    this.props.getATicket(token, this.props.location.state.data);
  }

  componentWillReceiveProps = (nextProps) => {
    console.log(nextProps, "nextProps");
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

    if (nextProps.getATicketStatus) {
      this.setState({
        ticket: nextProps.getATicketData,
        replies: nextProps.getATicketData.replies,
      });
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
  };

  viewAttachments(attachments) {
    let token = sessionStorage.getItem("token");
    this.props.viewAttachmentFile(token, attachments[0].uuid);
  }
  viewFile = (e, data) => {
    this.props.viewAttachmentFile(sessionStorage.getItem("token"), data.uuid);
  };

  render() {
    const files =
      this.state.files.length > 0
        ? this.state.files.map((data) => (
            <li key={data.filez[0].name}>
              {data.filez[0].name} - {data.filez[0].size} bytes &ensp;
            </li>
          ))
        : "";
    return (
      <div className="main_contain">
        {/* hello */}
        <div className="merch_m_list_w">
          <div className="merch_list_card" id="merch_list_card">
            <div className="section_custom">
              <div className="sectionInn">
                <div className="chartCard_w">
                  <div className="chartCardTop">
                    <div className="flCenterColumn">
                      <h1 className="list_top_heading textAlignCenter">
                        Ticket / Support
                      </h1>
                    </div>
                  </div>
                  <div
                    className="filter_wrapper"
                    style={{ paddingBottom: "12px" }}
                  >
                    <div className="addTInW">
                      <div className="row">
                        <div className="ticket">
                          <div className="ticket-header">
                            <h3>
                              Ticket No :{" "}
                              {this.state.ticket
                                ? this.state.ticket.ticketNo
                                : ""}
                            </h3>
                            <span
                              className="badge badge-info"
                              style={{
                                height: "30px",
                                textAlign: "center",
                                marginTop: "1%",
                                marginLeft: "2%",
                              }}
                            >
                              {this.state.ticket
                                ? this.state.ticket.priority
                                : ""}
                            </span>
                          </div>

                          <div className="ticket-content">
                            <h3>{this.state.ticket.title}</h3>
                            <h5
                              style={{
                                color: "darkgrey",
                                fontWeight: 500,
                                fontSize: "14px",
                              }}
                            >
                              Created By :{" "}
                              {this.state.ticket.createdUser
                                ? this.state.ticket.createdUser.email
                                : ""}
                            </h5>
                            <h5
                              style={{
                                color: "darkgrey",
                                fontWeight: 500,
                                fontSize: "14px",
                              }}
                            >
                              Created At :{" "}
                              {this.state.ticket
                                ? this.state.ticket.createdDateTime
                                : ""}
                            </h5>

                            <div
                              dangerouslySetInnerHTML={{
                                __html: this.state.ticket
                                  ? this.state.ticket.content
                                  : "",
                              }}
                            ></div>

                            {this.state.ticket.attachments &&
                            this.state.ticket.attachments.length > 0
                              ? this.state.ticket.attachments.map((data) => {
                                  return (
                                    <>
                                      <span
                                        style={{
                                          color: "blue",
                                          cursor: "pointer",
                                        }}
                                        onClick={(e) => this.viewFile(e, data)}
                                      >
                                        {data.originalName}
                                      </span>
                                      &ensp;&ensp;
                                    </>
                                  );
                                })
                              : ""}
                          </div>
                        </div>
                      </div>

                      <ul className="reply-list">
                        {this.state.replies !== undefined &&
                          this.state.replies.map((reply) => {
                            return (
                              <li>
                                <table className="table">
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div className="name">
                                          {reply.createdUser.username.charAt(0)}
                                        </div>
                                      </td>
                                      <td>
                                        <div
                                          dangerouslySetInnerHTML={{
                                            __html: reply.content,
                                          }}
                                        ></div>
                                      </td>
                                      <td>
                                        <p style={{ float: "right" }}>
                                          {" "}
                                          {reply.createdDate}
                                        </p>
                                      </td>
                                      <td>
                                        {reply.attachments.length !== 0
                                          ? reply.attachments.map((data) => {
                                              return (
                                                <>
                                                  <span
                                                    onClick={(e) =>
                                                      this.viewFile(e, data)
                                                    }
                                                    style={{
                                                      color: "blue",
                                                      cursor: "pointer",
                                                    }}
                                                    // onClick={() =>
                                                    //   this.viewAttachments(
                                                    //     reply.attachments
                                                    //   )
                                                    // }
                                                  >
                                                    {data.originalName}
                                                  </span>
                                                  &ensp;&ensp;
                                                </>
                                              );
                                            })
                                          : ""}
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </li>
                            );
                          })}
                      </ul>

                      <div className="row mt-3">
                        <div className="ticket reply">
                          <div className="ticket-header">
                            <h3>Reply</h3>
                          </div>

                          <div className="ticket-content">
                            <div className="col-md-12">
                              <ReactQuill
                                theme="snow"
                                height="200"
                                style={{ height: "200px", background: "white" }}
                                value={this.state.text}
                                placeholder="Write Somthing..."
                                onChange={this.handleProcedureContentChange}
                              ></ReactQuill>
                            </div>

                            <div className="col-md-12 mt-5">
                              <Dropzone
                                onDrop={(acceptedFiles) =>
                                  this.uploadDocuments(acceptedFiles)
                                }
                              >
                                {({ getRootProps, getInputProps }) => (
                                  <section
                                    className="dropzone"
                                    style={{ background: "#fff" }}
                                  >
                                    <div {...getRootProps()}>
                                      <input {...getInputProps()} />
                                      <p>
                                        Drag 'n' drop some files here, or click
                                        to select files
                                      </p>
                                    </div>
                                  </section>
                                )}
                              </Dropzone>
                              <h4>
                                {this.state.files.length > 0 ? "Files" : ""}
                              </h4>
                              <ul>{files}</ul>
                            </div>
                          </div>
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
                              disabled={
                                this.state.text == "" &&
                                this.state.uploads.length == 0
                                  ? true
                                  : false
                              }
                              class="aryousureBTN confirmBtnR"
                              onClick={this.add}
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

const mapStateToProps = ({ merchantReducer }) => {
  const {
    getATicketData,
    getATicketStatus,
    ticketsUploadAttcahmentData,
    ticketsUploadAttcahmentStatus,
    uploadedFileStatus,
    uploadedFileData,
  } = merchantReducer;

  return {
    getATicketData,
    getATicketStatus,
    ticketsUploadAttcahmentData,
    ticketsUploadAttcahmentStatus,
    uploadedFileStatus,
    uploadedFileData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getATicket: (token, ticketNo) => dispatch(getATicket(token, ticketNo)),
  addAreply: (token, data, ticketNo) =>
    dispatch(addAreply(token, data, ticketNo)),
  uploadAttachment: (token, data) => dispatch(uploadAttachment(token, data)),
  viewAttachmentFile: (token, uuid) =>
    dispatch(viewAttachmentFile(token, uuid)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Reply));
