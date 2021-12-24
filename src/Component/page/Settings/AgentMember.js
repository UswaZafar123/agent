import React, { Component } from 'react';
import '../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import '../Settings/General/formfromold.css'
// import "../Agent/antDcustom.css";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FormattedMessage, useIntl, injectIntl } from "react-intl";
import {registerAgentMember}from "../../../services/agent/action"
// import libphonenumber from 'google-libphonenumber';


// import activeUser from '../../Assets/images/confirm.svg'

import ReactFlagsSelect from "react-flags-select";
import { getStates } from "country-state-picker";

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import '../Settings/General/settingcss.css'

import { Select, DatePicker, Modal, Switch, Upload, message,Dropdown,Checkbox,Tabs} from "antd";
import {connect} from "react-redux"
import { Radio } from "antd";
import moment from "moment";

const dateFormat = "YYYY-MM-DD";
const { Option } = Select;
const { TabPane } = Tabs;

function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  
  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }


  function callback(key) {
    console.log(key);
  }
class AgentMember extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            firstName:"",
            businessType:"",
            lastName:"",
            email:"",
            city:"",
            idNumber:"",
            address:"",
            place:"",
            phoneNumber:"",
            selfie:null,
            selfieimage:"",
            idphoto:null,
            countryCode:"",
            viewModal:false,
            idphotoimage:"",
            idName:"",
            gender:"",
            idDocumentType:"ID_DOCUMENT",
            gridApi: null,
            dateOfBirth:"",
            expiredDate:"",
            addressProof:null,
            addressProofimage:"",
            isModalVisible: false,
            paginationGetCurrentPage: null,
            popup: false,
            addNewMember:false,
            mobileCode:"",
            editNewMember:false,
            viewNewMember:false,
            activeStatus:true,
            value:1,
            imageUrl: "",
            columnDefs: [
                { headerName: "Name", field: "Name", width: 250 },
                { headerName: "Email", field: "Email" },
                { headerName: "Telephone ", field: "Telephone" },
                {
                    headerName: "Status", field: "Status",
                    cellRendererFramework: (params) => <div className="ac-inactiveBTN">
                        <button className={!this.state.activeStatus ? "inactive" : ""}>{this.state.activeStatus ? "Active" : "Inactive"}</button>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                },
               
                {
                    headerName: "Action", field: "Action",
                    cellRendererFramework: (params) => <div className="ac-view">
                        <span className="icon-edit-2" style={{cursor: "pointer"}} style={{marginLeft: "5%"}} onClick={this.editNewMember}></span>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                }



            ],
            rowData: [
                { Name: "Lorem Ipsum", Email: "abc@orem.com", Telephone: "0000000000",Status:"Active", Action:""},    

            ],
            

        };
    }

    handleChangeInput=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }


 
    onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };
  
    addChange = () => {
        this.props.history.push("/tickets/AddTicket")
    }
    onGridReady = (params) => {
        this.setState({
            gridApi: params.api,
        })
        params.api.paginationGoToPage(10);
        document.getElementById('lbCurrentPage').innerHTML = this.state.gridApi.paginationGetCurrentPage() + 1
        document.getElementById('totalPageSize').innerHTML = this.state.rowData.length
        document.getElementById('bTo').innerHTML = params.api.paginationGetPageSize(10)
        const changedV = (params.api.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
        if (changedV <= this.state.rowData.length) {
            document.getElementById('afterTo').innerHTML = (params.api.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
        }
        else {
            document.getElementById('afterTo').innerHTML = this.state.rowData.length
        }
        // console.log("get",params.api.getDisplayedRowCount())


    }
    handleChange = (value) => {
        this.state.gridApi.paginationSetPageSize(Number(value))
        // document.getElementById('totalPageSize').innerHTML=this.state.gridApi.paginationGetPageSize()
        document.getElementById('bTo').innerHTML = this.state.gridApi.paginationGetPageSize()
    }






    onPaginationChanged = () => {
        console.log('onPaginationPageLoaded');
        if (this.state.gridApi) {
            document.getElementById('lbCurrentPage').innerHTML = this.state.gridApi.paginationGetCurrentPage() + 1
            document.getElementById('bTo').innerHTML = this.state.gridApi.paginationGetPageSize() * this.state.gridApi.paginationGetCurrentPage() + 1

            const changedV = (this.state.gridApi.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
            if (changedV <= this.state.rowData.length) {
                document.getElementById('afterTo').innerHTML = (this.state.gridApi.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
            }
            else {
                document.getElementById('afterTo').innerHTML = this.state.rowData.length
            }


        }
    };

    onBtNext = () => {
        this.state.gridApi.paginationGoToNextPage();
        // console.log()
    };

    onBtPrevious = () => {
        this.state.gridApi.paginationGoToPreviousPage();
    };

    addNewMember = () => {
        this.setState({
            addNewMember:true,
            editNewMember:false,
            viewNewMember:false
        })
    }
    // editNewMember = () => {
    //     this.setState({
    //         addNewMember:false,
    //         editNewMember:true,
    //         viewNewMember:false
    //     })
    // }


    handleChangeSelect = (e,name) =>{
        this.setState({
            [name]:e
        })
    }
  
      back5 = () => {
        this.setState({
            addNewMember:false,
            editNewMember:false,
            viewNewMember:false
        })
      }
    
      handleChangeUpload=({file,fileList},name)=>{
       

    //   console.log(fileList[0],"fileListfileListstatus")
       if(file && file.status=="done")
       {
        

        this.setState({[name]:file})
       }


      }

      onChangeDate=(date,dateString,name)=>{

        this.setState({
            [name]:dateString
        })

      }
    
      Review=()=>{
          this.setState({
              viewModal:true
          })
      }


      submitData=()=>{

        // const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

      let formData =new FormData();
      formData.append("firstName",this.state.firstName)
      formData.append("lastName",this.state.firstName)
      formData.append("registrationChannel","AGENCY_BANKING_APP")
      formData.append("registrationSubChannel","AGENCY_BANKING_APP")
      formData.append("busincessType",this.state.businessType)
      var phoneNumberSplit = this.state.phoneNumber.split(" ");

      formData.append("countryCode", this.state.countryCode);
      formData.append(
        "phoneNumberCountryCode",
          phoneNumberSplit[0].replace("+", "")
      );

      phoneNumberSplit.shift();

      formData.append("phoneNo", phoneNumberSplit.join(""));

      formData.append("countryCode",this.state.countrycode)
      formData.append("locale","en")
      formData.append("mobileOperator","UNINOR")
      formData.append("idDocumentName",this.state.idName)
      formData.append("idDocumentType",this.state.idDocumentType)
      formData.append("idDocumentIdNumber",this.state.idNumber)
      formData.append("idExpiryDate",this.state.expiredDate)
      formData.append("currency",this.state.currency)
      formData.append("gender",this.state.gender)
      formData.append("agentDOB",this.state.dateOfBirth)
      formData.append("agentBusinessAddress",this.state.address)
      formData.append("appliedForRegistrationAt",this.state.place)
      formData.append("superAgentPhone",localStorage.getItem("email"))
      formData.append("city",this.state.city)
      formData.append("address",this.state.address)
      formData.append("idDocumentImages",this.state.idphoto.originFileObj)
      formData.append("agentPhoto",this.state.selfie.originFileObj)
      formData.append("proofOfAddress",this.state.addressProof.originFileObj)
      formData.append("agentType","AGENT_MEMBER")
      this.props.registerAgentMember(sessionStorage.getItem("token"),formData,this.props.history,phoneNumberSplit.join(""), phoneNumberSplit[0].replace("+", ""))
      this.setState({
          viewModal:false
      })
    }


    handleChangeMobile = (value, data, event, formattedValue) => {
        // this.setState({ countyCode: value })
        this.setState({ phoneNumber: event.target.value });
        // console.log((this.state.mobileNumber).split(" "),"Mobile Num")
      };

    render() {

        const { loading, imageUrl } = this.state;
        const uploadButton = (
        <div>
            {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
        );
        return (
    <>
        {!this.state.addNewMember && !this.state.editNewMember && 
            <div className="main_contain">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Agent Member
                      </h1>
                                            <button className="addposbtn c_first_pending_BTN" onClick={this.addNewMember}>Add New Member</button>
                                        </div>
                                    </div>
                                    <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                        <div className="tableTop_wrapper">
                                            <div className="disFl">
                                                <h5 className="show_pp margin_right8">Show</h5>
                                                <div className="tableShowRecordPerPage">
                                                    <Select
                                                        defaultValue="10"
                                                        style={{ width: 74, height: 27 }}
                                                        onChange={this.handleChange}
                                                        id={'page-size'}
                                                    >
                                                        <Option value="10">10</Option>
                                                        <Option value="25">25</Option>
                                                        <Option value="100">100</Option>
                                                        {/* <Option value="all">all</Option> */}
                                                    </Select>
                                                </div>

                                                <h5 className="show_pp margin_left8">
                                                    Entries
                        </h5>
                                                <div
                                                    className="margin-left-auto"
                                                    style={{ display: "flex", alignItems: "center" }}
                                                >
                                                    <div className="shortCustom">
                                                        <span className="icon-Asset-55"></span>
                                                        <h6>Sort</h6>
                                                    </div>
                                                    <div className="shortCustom">
                                                        <Dropdown
                                                            overlay={
                                                                <ul class="filterDrd">
                                                                    <li>
                                                                        <a href="#">
                                                                            <span class="icon-logout"></span>All
                                    </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#">
                                                                            <span class="icon-logout"></span>Inactive
                                    </a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="#">
                                                                            <span class="icon-logout"></span>Active
                                    </a>
                                                                    </li>
                                                                </ul>
                                                            }
                                                            placement="bottomLeft"
                                                            trigger={["click"]}
                                                        >
                                                            <div className="shortCustom01">
                                                                <span className="icon-Asset-54"></span>
                                                                <h6>Filter</h6>
                                                            </div>
                                                        </Dropdown>
                                                    </div>
                                                    <div
                                                        className="search_w_merchant_m"
                                                        style={{ width: "270px" }}
                                                    >
                                                        <input type="search" placeholder="Search" />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="actionBtnWp">
                                                <span className="icon-Asset-51"></span>
                                                <span className="icon-Asset-52"></span>
                                                <span className="icon-Asset-53"></span>
                                            </div> */}
                                        </div>
                                        <div
                                            className="ag-theme-alpine agGridCustomize"
                                            style={{ height: 400, width: 100 + "%" }}
                                        >


                                            <AgGridReact
                                                rowHeight={55}

                                                defaultColDef={{ resizable: true }}
                                                onFirstDataRendered={this.onFirstDataRendered}
                                                columnDefs={this.state.columnDefs}
                                                rowData={this.state.rowData}
                                                pagination={true}
                                                onGridReady={this.onGridReady}
                                                onPaginationChanged={this.onPaginationChanged}
                                                paginationPageSize={10}
                                                suppressPaginationPanel={true}


                                            />
                                        </div>
                                        <div className="customAgFooter">

                                            <div className="showingFooter">
                                                <span>Showing</span>
                                                <span id="bTo"> </span>
                                                <span>to</span>
                                                <span id="afterTo"></span>
                                                <span>of</span>
                                                <span id="totalPageSize"></span>
                                                <span>entries</span>
                                            </div>
                                            <div className="NextPrevW">
                                                <button className="NextPrev" onClick={() => this.onBtPrevious()}>Prev</button>
                                                <span className="valueNextPrev" id="lbCurrentPage"></span>
                                                <button className="NextPrev" onClick={() => this.onBtNext()}>Next</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                {
                                    this.state.popup == true ?
                                        <div className="custommodal custommodal-fadein modal_w">
                                            <div className="custommodal-dailog">
                                                <div className="custommodal-content">

                                                    <div className="shopmodal modal_w_in">
                                                        <div className="viewshopheading">
                                                            <h4>View Point of Sale</h4>
                                                        </div>
                                                        <div className="viewshopdetails">
                                                            <label>Point of Sale Merchant Name :</label>
                                                            <span>Shop name</span>
                                                        </div>
                                                        <hr />
                                                        <div className="viewshopdetails">
                                                            <label>Shop Name:</label>
                                                            <span>WIIK eV</span>
                                                        </div>
                                                        <hr />
                                                        <div className="viewshopcancelbtn">
                                                            <button onClick={this.close}>Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : ""
                                }
                            </div>
                        </div>
                    </div>
                </div>



            </div>

    }

    {console.log(this.state.idphotoimage,this.state.selfieimage,"jklashashsajh")}

{this.state.addNewMember && 
            <div className="main_contain agentformCenter">
                <div className="merch_m_list_w">
                    <div className="merch_list_card" id="merch_list_card">
                        <div className="section_custom">
                            <div className="sectionInn">
                                <div className="chartCard_w">
                                    <div className="chartCardTop">
                                        <div className="kyccustomformheading">
                                            <h1 className="list_top_heading textAlignCenter text-center">
                                                Add New Member
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                        <div className="containerBiaN_form">
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>first Name</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" name="firstName" placeholder="Enter first Name" onChange={this.handleChangeInput}  />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>last Name</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" name="lastName" placeholder="Enter last Name"  onChange={this.handleChangeInput} />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Date of Birth</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                <DatePicker onChange={(date,dateString)=>this.onChangeDate(date,dateString,"dateOfBirth")} className="form-control" style={{width:100+"%"}} />
                                                
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Email</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Email" name="email" onChange={this.handleChangeInput}/>
                                                </div>
                                            </div>

                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>country code</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter country code" name="countryCode"  onChange={this.handleChangeInput}/>
                                                </div>
                                            </div>

                                            {/* <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Mobile dial code</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter mobile dial code" name="mobileCode"  onChange={this.handleChangeInput}/>
                                                </div>
                                            </div> */}
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Mobile number</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                <div className="inputSt">
                                                      <PhoneInput
                                                        country="cm"
                                                        enableSearch={true}
                                                        countryCodeEditable={false}
                                                        enableLongNumbers={false}
                                                        searchPlaceholder="Search for countries.."
                                                        inputStyle={{ width: "100%" }}
                                                        value={this.state.phoneNumber}
                                                        onChange={this.handleChangeMobile}
                                                    />
                                                    </div>
                                                </div>
                                            </div>
                                            {/* <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Password</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Password"  />
                                                </div>
                                            </div> */}
                                            {/* <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Confirm Password</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Confirm Password"  />
                                                </div>
                                            </div> */}
                                            {/* <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Status</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <div className="categorySelect">
                                                        <Select
                                                            defaultValue="Active"
                                                            style={{ width: 100+"%", height: 52 }}
                                                            onChange={this.handleChangeSelect}
                                                            id={'page-size'}
                                                        >
                                                            <Option value="Active">Active</Option>
                                                            <Option value="Deactive">Deactive</Option>
                                                        </Select>
                                                    </div>
                                                </div>
                                            </div> */}
                                            {/* <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Packages</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <div className="categorySelect">
                                                            <Select
                                                                defaultValue="Active"
                                                                mode="multiple"
                                                                style={{ width: 100+"%", height: 52 }}
                                                                onChange={this.handleChangeSelect}
                                                                id={'page-size'}
                                                            >
                                                                <Option value="Active">Package1</Option>
                                                                <Option value="Deactive">Package2</Option>
                                                            </Select>
                                                        </div>
                                                </div>
                                            </div> */}
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Upload Photo or Selfie</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <Upload
                                                        name="avatar"
                                                        multiple={false}
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        showUploadList={true}
                                                        file={this.state.selfie}
                                                        customRequest={dummyRequest}
                                                        onChange={(file)=>this.handleChangeUpload(file,"selfie")}
                                                        >
                                                        {imageUrl ? (
                                                            <img
                                                            src={imageUrl}
                                                            alt="avatar"
                                                            style={{ width: "100%" }}
                                                            />
                                                        ) : (
                                                            uploadButton
                                                        )}
                                                        </Upload>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Select gender</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <div className="categorySelect">
                                                            <Select
                                                                defaultValue=""
                                                                style={{ width: 100+"%", height: 52 }}
                                                                onChange={(e)=>this.handleChangeSelect(e,"gender")}
                                                                id={'page-size'}
                                                            >
                                                                 <Option value="">select gender</Option>
                                                                <Option value="Male">Male</Option>
                                                                <Option value="Female">Female</Option>
                                                            </Select>
                                                        </div>
                                                </div>
                                            </div>

                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>BusinessType</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <div className="categorySelect">
                                                            <Select
                                                                defaultValue=""
                                                                style={{ width: 100+"%", height: 52 }}
                                                                onChange={(e)=>this.handleChangeSelect(e,"businessType")}
                                                                id={'page-size'}
                                                            >
                                                                <Option value="">select business type</Option>
                                                                <Option value="INDIVIDUAL">INDIVIDUAL</Option>
                                                                <Option value="EL">EL</Option>
                                                                <Option value="SAL">SAL</Option>
                                                                <Option value="SARL">SARL</Option>

                                                            </Select>
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Id Type</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <div className="categorySelect">
                                                            <Select
                                                                defaultValue="ID_DOCUMENT"
                                                                style={{ width: 100+"%", height: 52 }}
                                                                onChange={(e)=>this.handleChangeSelect(e,"idDocumentType")}
                                                                id={'page-size'}
                                                            >
                                                                <Option value="ID_DOCUMENT">Identity card</Option>
                                                                <Option value="PASSPORT">Passport</Option>
                                                            </Select>
                                                        </div>
                                                </div>
                                            </div>

                                           
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Id name</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter ID name" name="idName"  onChange={this.handleChangeInput}/>
                                                </div>
                                            </div>

                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Id Number</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter ID Number" name="idNumber"  onChange={this.handleChangeInput}/>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Upload Id Image (front and back)</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <Upload
                                                        name="avatar"
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        showUploadList={true}
                                                        file={this.state.idphoto}
                                                        customRequest={dummyRequest}
                                                        onChange={(file)=>this.handleChangeUpload(file,"idphoto")}
                                                        >
                                                        {imageUrl ? (
                                                            <img
                                                            src={imageUrl}
                                                            alt="avatar"
                                                            style={{ width: "100%" }}
                                                            />
                                                        ) : (
                                                            uploadButton
                                                        )}
                                                        </Upload>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Id expired date</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                <DatePicker  onChange={(date,dateString)=>this.onChangeDate(date,dateString,"expiredDate")} className="form-control" style={{width:100+"%"}} />
                                                
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Unique Identification number</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter UIN"  name="uin" />
                                                </div>
                                            </div>

                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Registration Applied Place</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter registartion place"  name="place" onChange={this.handleChangeInput} />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Business Name (Optional)</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Business Name"  name="businessName" />
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>City</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter City"  name="city" onChange={this.handleChangeInput}/>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Address</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="Enter Address" name="address" onChange={this.handleChangeInput}/>
                                                </div>
                                            </div>
                                            <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Address Proof</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <Upload
                                                        name="avatar"
                                                        listType="picture-card"
                                                        className="avatar-uploader"
                                                        showUploadList={true}
                                                        file={this.state.addressProof}
                                                        customRequest={dummyRequest}
                                                        onChange={(file)=>this.handleChangeUpload(file,"addressProof")}
                                                        >
                                                        {imageUrl ? (
                                                            <img
                                                            src={imageUrl}
                                                            alt="avatar"
                                                            style={{ width: "100%" }}
                                                            />
                                                        ) : (
                                                            uploadButton
                                                        )}
                                                        </Upload>
                                                </div>
                                            </div>
                                            {/* <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Geolocation</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent">
                                                    <input type="text" placeholder="fetch Longitude,Latitude"  />
                                                </div>
                                            </div> */}
                                            
                                            
                                            

                                            {/* <div className="containerBiaN_f_row">
                                                <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    <label>Send Email with Credentials</label>
                                                </div>
                                                <div className="containerBiaN_f_col width70percent antdRadioCustom">
                                                <Radio.Group onChange={this.onChangeRadio} value={this.state.value}>
                                                    <Radio value={1}>Yes</Radio>
                                                    <Radio value={2}>No</Radio>
                                                </Radio.Group>
                                                </div>
                                            </div> */}
                                        </div>

                                       <div style={{width: "100%", float: "left"}}>
                                           <div className="custom-d-flex confirm_p_w mTB00 button-container rspacing">
                                               <button className="blackbtn aryousureBTN confirmBtnR" onClick={this.back5}>Cancel</button>
                                               <button className="aryousureBTN confirmBtnR"  onClick={this.Review}>Review</button>
                                            </div>
                                        </div>
                                       
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <Modal visible={this.state.viewModal}  onCancel={()=>this.setState({viewModal:false})} width={700} onOk={this.submitData}>

                <div className="chartCardTop">
                                     
                                            <div style={{margin:"0 auto",display:"table"}}>

                                            <h1 className="list_top_heading" sty>
                                                Summary
                                            </h1>

                                        
                                        </div>
                                    </div>
                 <div style={{marginLeft:"60px"}}>
                    <table className='table table-responsive table-borderless' >
                    
                     <tbody>
                         <tr>
                             <td>Firstname</td>
                             <td>{this.state.firstName}</td>
                         </tr>
                         <tr>
                             <td>lastName</td>
                             <td>{this.state.lastName}</td>
                         </tr>
                         <tr>
                             <td>Date of birth</td>
                             <td>{this.state.dateOfBirth}</td>
                         </tr>
                         <tr>
                             <td>Email</td>
                             <td>{this.state.email}</td>
                         </tr>
                         <tr>
                             <td>country code</td>
                             <td>{this.state.countryCode}</td>
                         </tr>
                         <tr>
                             <td>phone</td>
                             <td>{this.state.phoneNumber}</td>
                         </tr>
                         <tr>
                             <td>Address</td>
                             <td>{this.state.address}</td>
                         </tr>
                         <tr>
                             <td>City</td>
                             <td>{this.state.city}</td>
                         </tr>
                         <tr>
                             <td>place of registration</td>
                             <td>{this.state.place}</td>
                         </tr>
                         <tr>
                             <td>Id document number</td>
                             <td>{this.state.idNumber}</td>
                         </tr>
                         <tr>
                             <td>Id expired date</td>
                             <td>{this.state.expiredDate}</td>
                         </tr>
                         <tr>
                             <td>Selfie</td>
                             <td>{this.state.selfie && this.state.selfie.thumbUrl!=="" &&<img style={{height:"80px",width:"80px"}} src={this.state.selfie.thumbUrl}/>}</td>
                         </tr>
                         <tr>
                             <td>Address Proof</td>
                             <td>{this.state.addressProof &&this.state.addressProof.thumbUrl!=="" &&<img style={{height:"80px",width:"80px"}} src={this.state.addressProof.thumbUrl}/>}</td>
                         </tr>

                         <tr>
                             <td>Id document Image</td>
                             <td>{this.state.idphoto &&this.state.idphoto.thumbUrl!=="" &&<img style={{height:"80px",width:"80px"}} src={this.state.idphoto.thumbUrl}/>}</td>
                         </tr>

                         {/* <tr>
                             <td>UIN</td>
                             <td>{this.state.uin}</td>
                         </tr> */}
                         
                     </tbody>
                    </table>
                </div>
            </Modal>
         </div>

            

    }


{/* {this.state.editNewMember &&
     <div className="main_contain agentformCenter">
     <div className="merch_m_list_w">
         <div className="merch_list_card" id="merch_list_card">
             <div className="section_custom">
                 <div className="sectionInn">
                     <div className="chartCard_w">
                         <div className="chartCardTop">
                             <div className="kyccustomformheading">
                                 <h1 className="list_top_heading textAlignCenter text-center">
                                     Add New Member
                                 </h1>
                             </div>
                         </div>
                         <div className="chartCardMiddle" style={{ padding: "24px" }}>

                             <div className="containerBiaN_form">
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Name</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="Enter Name" />
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Date of Birth</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                     <DatePicker onChange={this.onChangeDate} className="form-control" style={{width:100+"%"}} />
                                     
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Email</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="Enter Email"  />
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Mobile</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                     <div className="inputSt">
                                     <PhoneInput
                                         country={'us'}
                                         value={this.state.phone}
                                         onChange={phone => this.setState({ phone })}
                                         />
                                         </div>
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Password</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="Enter Password"  />
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Confirm Password</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="Confirm Password"  />
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Status</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <div className="categorySelect">
                                             <Select
                                                 defaultValue="Active"
                                                 style={{ width: 100+"%", height: 52 }}
                                                 onChange={this.handleChangeSelect}
                                                 id={'page-size'}
                                             >
                                                 <Option value="Active">Active</Option>
                                                 <Option value="Deactive">Deactive</Option>
                                             </Select>
                                         </div>
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Packages</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <div className="categorySelect">
                                                 <Select
                                                     defaultValue="Active"
                                                     mode="multiple"
                                                     style={{ width: 100+"%", height: 52 }}
                                                     onChange={this.handleChangeSelect}
                                                     id={'page-size'}
                                                 >
                                                     <Option value="Active">Package1</Option>
                                                     <Option value="Deactive">Package2</Option>
                                                 </Select>
                                             </div>
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Upload Photo or Selfi</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <Upload
                                             name="avatar"
                                             listType="picture-card"
                                             className="avatar-uploader"
                                             showUploadList={true}
                                             fileList={this.state.fileList}
                                             customRequest={dummyRequest}
                                             onChange={this.handleChangeUpload}
                                             >
                                             {imageUrl ? (
                                                 <img
                                                 src={imageUrl}
                                                 alt="avatar"
                                                 style={{ width: "100%" }}
                                                 />
                                             ) : (
                                                 uploadButton
                                             )}
                                             </Upload>
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Id Type</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <div className="categorySelect">
                                                 <Select
                                                     defaultValue="Identity card"
                                                     style={{ width: 100+"%", height: 52 }}
                                                     onChange={this.handleChangeSelect}
                                                     id={'page-size'}
                                                 >
                                                     <Option value="Identity card">Identity card</Option>
                                                     <Option value="Passport">Passport</Option>
                                                 </Select>
                                             </div>
                                     </div>
                                 </div>

                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Id Number</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="Enter ID Number"  />
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Upload Id Image (front and back)</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <Upload
                                             name="avatar"
                                             listType="picture-card"
                                             className="avatar-uploader"
                                             showUploadList={true}
                                             fileList={this.state.fileList}
                                             customRequest={dummyRequest}
                                             onChange={this.handleChangeUpload}
                                             >
                                             {imageUrl ? (
                                                 <img
                                                 src={imageUrl}
                                                 alt="avatar"
                                                 style={{ width: "100%" }}
                                                 />
                                             ) : (
                                                 uploadButton
                                             )}
                                             </Upload>
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Id expired date</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                     <DatePicker onChange={this.onChangeDate} className="form-control" style={{width:100+"%"}} />
                                     
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Unique Identification number</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="Enter UIN"  />
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Business Name (Optional)</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="Enter Business Name"  />
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>City</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="Enter City"  />
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Address</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="Enter Address"  />
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Address Proof</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="Enter Address Proof"  />
                                     </div>
                                 </div>
                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Geolocation</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent">
                                         <input type="text" placeholder="fetch Longitude,Latitude"  />
                                     </div>
                                 </div>
                                 
                                 
                                 

                                 <div className="containerBiaN_f_row">
                                     <div className="containerBiaN_f_col width30percent textAlignRight">
                                         <label>Send Emai with Credentials</label>
                                     </div>
                                     <div className="containerBiaN_f_col width70percent antdRadioCustom">
                                     <Radio.Group onChange={this.onChangeRadio} value={this.state.value}>
                                         <Radio value={1}>Yes</Radio>
                                         <Radio value={2}>No</Radio>
                                     </Radio.Group>
                                     </div>
                                 </div>
                             </div>

                            <div style={{width: "100%", float: "left"}}>
                                <div className="custom-d-flex confirm_p_w mTB00 button-container rspacing">
                                    <button className="blackbtn aryousureBTN confirmBtnR" onClick={this.back5}>Cancel</button>
                                    <button className="aryousureBTN confirmBtnR">Submit</button>
                                 </div>
                             </div>
                            
                             
                         </div>
                     </div>
                     
                 </div>
             </div>
         </div>
     </div>



 </div>
            } */}

  
    </>
        );
    }
}

const mapStateToProps=()=>{

}

const mapDispatchToProps=(dispatch)=>{

    return{

        registerAgentMember:(token,data,history,phoneNumber,mobialCode)=>dispatch(registerAgentMember(token,data,history,phoneNumber,mobialCode))

    }

}
export default connect(mapStateToProps,mapDispatchToProps)(AgentMember);