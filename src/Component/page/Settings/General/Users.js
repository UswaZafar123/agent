import React, { Component } from 'react';
import '../../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import './formfromold.css'
// import "../Agent/antDcustom.css";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { FormattedMessage, IntlProvider } from 'react-intl';

// import activeUser from '../../Assets/images/confirm.svg'

import './settingcss.css'

import { Select, Dropdown, Checkbox, Tabs } from "antd";
import { FolderViewOutlined } from '@ant-design/icons';

import { connect } from 'react-redux';
import PhoneInput from 'react-phone-input-2';
import { addAgentUser, deleteAgentUser, getAllAgentUsers, getAllUserRoles, updateAgentUser } from '../../../../services/agent/action';

const { Option } = Select;

class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gridApi: null,
            isModalVisible: false,
            paginationGetCurrentPage: null,
            value: '',
            columnDefs: [
                { headerName: "Name", field: "Name" },
                { headerName: "Email", field: "Email" },
                { headerName: "Username ", field: "Username" },
                { headerName: "Mobile ", field: "MobileNumber" },
                { headerName: "Role ", field: "Role" },
                {
                    headerName: "Status ", field: "Status",
                    cellRendererFramework: (params) => (
                        <div style={{ alignItems: "center" }}>
                            <span
                                className={
                                    params.data.Status === "ENABLE" ? "yesF yesColorF" : "yesF noColorF"
                                }
                                style={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}
                                onClick={() => this.changeStatus(params.data)}
                            >

                                {params.data.Status === "DISABLE" ? "INACTIVE" : "ACTIVE"}
                            </span>
                            {/* <span
                                style={{
                                    textDecoration: "underline",
                                    color: "blue",
                                    cursor: "pointer",
                                }}
                                onClick={(e) => {
                                    this.setAsFeaturedHandler(e, params.data);
                                }}
                            >
                                {" "}
                                {params.data.isFeatured ? "Unset Featured" : "Set as Featured"}
                            </span> */}
                        </div>
                    ),
                },

                {
                    headerName: "Action", field: "Action",
                    cellRendererFramework: (params) => <div className="ac-view">
                        {/* <span style={{ cursor: "pointer" }}></span> */}

                        <span className="icon-edit-2" style={{ cursor: "pointer" }} style={{ marginLeft: "5%" }} onClick={() => this.editAgentUser(params.data)}></span>
                        <span className="icon-Group-357" style={{ marginLeft: "5%" }} onClick={() => this.props.deleteAgentUser(params.data.AgentUserID)}></span>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                }
            ],
            rowData: [
                // { Name: "Lorem Ipsum", Display_Name: "", Description: "Lorem Ipsum Dollor sakdn", Action: "" },
            ],

            agentUserData: [],

            showAddNewUser: false,
            showEditUser: false,
            selectedAgentUserID: "",
            name: "",
            email: "",
            username: "",
            mobileNumber: "",
            role: "DEFAULT",
            rolesData: [],
            currentStatus: "",
            messages: "",
            language: ""

        };
    }

    changeStatus = (agentInfo) => {
        let data = {
            "agentUserId": agentInfo.AgentUserID,
            "name": agentInfo.Name,
            "email": agentInfo.Email,
            "userName": agentInfo.Username,
            "mobileNumber": "u_" + agentInfo.MobileNumber,
            "userStatus": agentInfo.Status === "DISABLE" ? "ENABLE" : "DISABLE",
            "userRoleId": (agentInfo.RoleID).toString()
        }

        // console.log(data, "EDITED DATA")
        this.props.updateAgentUser(agentInfo.AgentUserID, data);
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
            return import("../../../i18n/messages/fr.js");
          default:
            return import("../../../i18n/messages/en.js");
        }
      };

    componentDidMount = () => {

        this.props.getAllAgentUsers();
        this.props.getAllUserRoles(sessionStorage.getItem("token"));
        this.translationHelperFunction();

    }

    componentWillReceiveProps = async (nextprops) => {

        if (nextprops.getUserRoleStatus && nextprops.getUserRoleData._embedded) {
            this.setState({
                rolesData: nextprops.getUserRoleData._embedded.userRoleDtoList
            });
        }

        if (nextprops.getAgentDataStatus && nextprops.getAgentData._embedded) {
            this.setState({
                agentUserData: nextprops.getAgentData._embedded.agentUserDtoList
            });
            this.onCancelView();
        }

        if (nextprops.getAgentData._embedded === undefined || nextprops.getAgentData === null) {
            this.setState({
                agentUserData: []
            });
        }

        if (nextprops.language) {
            const messages = await this.loadLocaleData(nextprops.language);
      
            this.setState({
              messages: messages,
              language: nextprops.language
            });
          }

          if(nextprops.language=="fr"){
            this.setState({
              columnDefs: [
                { headerName: "Nom", field: "Name" },
                { headerName: "E-mail", field: "Email" },
                { headerName: "Nom de l'Agent ", field: "Username" },
                { headerName: "Numéro de portable ", field: "MobileNumber" },
                { headerName: "Rôle ", field: "Role" },
                {
                    headerName: "État ", field: "Status",
                    cellRendererFramework: (params) => (
                        <div style={{ alignItems: "center" }}>
                            <span
                                className={
                                    params.data.Status === "ENABLE" ? "yesF yesColorF" : "yesF noColorF"
                                }
                                style={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}
                                onClick={() => this.changeStatus(params.data)}
                            >

                                {params.data.Status === "DISABLE" ? "INACTIVE" : "ACTIVE"}
                            </span>
                            {/* <span
                                style={{
                                    textDecoration: "underline",
                                    color: "blue",
                                    cursor: "pointer",
                                }}
                                onClick={(e) => {
                                    this.setAsFeaturedHandler(e, params.data);
                                }}
                            >
                                {" "}
                                {params.data.isFeatured ? "Unset Featured" : "Set as Featured"}
                            </span> */}
                        </div>
                    ),
                },

                {
                    headerName: "action", field: "Action",
                    cellRendererFramework: (params) => <div className="ac-view">
                        {/* <span style={{ cursor: "pointer" }}></span> */}

                        <span className="icon-edit-2" style={{ cursor: "pointer" }} style={{ marginLeft: "5%" }} onClick={() => this.editAgentUser(params.data)}></span>
                        <span className="icon-Group-357" style={{ marginLeft: "5%" }} onClick={() => this.props.deleteAgentUser(params.data.AgentUserID)}></span>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                }
              ]});
          }
          else{
            this.setState({
              columnDefs: [
                { headerName: "Name", field: "Name" },
                { headerName: "Email", field: "Email" },
                { headerName: "Username ", field: "Username" },
                { headerName: "Mobile ", field: "MobileNumber" },
                { headerName: "Role ", field: "Role" },
                {
                    headerName: "Status ", field: "Status",
                    cellRendererFramework: (params) => (
                        <div style={{ alignItems: "center" }}>
                            <span
                                className={
                                    params.data.Status === "ENABLE" ? "yesF yesColorF" : "yesF noColorF"
                                }
                                style={{ fontWeight: "bold", textDecoration: "underline", cursor: "pointer" }}
                                onClick={() => this.changeStatus(params.data)}
                            >

                                {params.data.Status === "DISABLE" ? "INACTIVE" : "ACTIVE"}
                            </span>
                            {/* <span
                                style={{
                                    textDecoration: "underline",
                                    color: "blue",
                                    cursor: "pointer",
                                }}
                                onClick={(e) => {
                                    this.setAsFeaturedHandler(e, params.data);
                                }}
                            >
                                {" "}
                                {params.data.isFeatured ? "Unset Featured" : "Set as Featured"}
                            </span> */}
                        </div>
                    ),
                },

                {
                    headerName: "Action", field: "Action",
                    cellRendererFramework: (params) => <div className="ac-view">
                        {/* <span style={{ cursor: "pointer" }}></span> */}

                        <span className="icon-edit-2" style={{ cursor: "pointer" }} style={{ marginLeft: "5%" }} onClick={() => this.editAgentUser(params.data)}></span>
                        <span className="icon-Group-357" style={{ marginLeft: "5%" }} onClick={() => this.props.deleteAgentUser(params.data.AgentUserID)}></span>
                    </div>,
                    cellStyle: (params) => { return { textAlign: "center" } },
                }
              ]});
          }
    }

    onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

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

    handleOnChangeInput = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });

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

    showAddNewUser = () => {
        this.setState({
            showAddNewUser: true,
            showEditUser: false,
            selectedAgentUserID: "",
            currentStatus: "",
            role: "DEFAULT"
        });
    }

    handleChangeMobile = (value, data, event, formattedValue) => {
        this.setState({ mobileNumber: value });
    };

    onAddNewUser = () => {

        let data = {
            "name": this.state.name,
            "email": this.state.email,
            "userName": this.state.username,
            "mobileNumber": "u_" + this.state.mobileNumber,
            "userRoleId": (this.state.role).toString()
        }
        // console.log(data, "DATA");
        this.props.addAgentUser(data);
    }

    onCancelView = () => {
        this.setState({
            showEditUser: false,
            showAddNewUser: false,
            name: "",
            email: "",
            username: "",
            mobileNumber: "",
            role: "",
            currentStatus: "",
        });
    }

    editAgentUser = (data) => {
        // console.log(data, "EDIT DATA");
        this.setState({
            showAddNewUser: false,
            showEditUser: true,
            selectedAgentUserID: data.AgentUserID,
            name: data.Name,
            email: data.Email,
            username: data.Username,
            mobileNumber: data.MobileNumber,
            role: data.RoleID,
            currentStatus: data.Status
        });
    }

    onUpdateAgentUser = () => {

        let data = {
            "agentUserId": this.state.selectedAgentUserID,
            "name": this.state.name,
            "email": this.state.email,
            "userName": this.state.username,
            "mobileNumber": "u_" + this.state.mobileNumber,
            "userStatus": this.state.currentStatus,
            "userRoleId": (this.state.role).toString()
        }

        // console.log(data, "EDITED DATA")
        this.props.updateAgentUser(this.state.selectedAgentUserID, data);

    }
    render() {
        return (
            <IntlProvider
            messages={this.state.messages.default}
            locale={this.state.language}
          >
            <>
                {
                    !this.state.showAddNewUser && !this.state.showEditUser && (
                        <div className="main_contain settings-container">
                            <div className="merch_m_list_w">
                                <div className="merch_list_card" id="merch_list_card">
                                    <div className="section_custom">
                                        <div className="sectionInn">
                                            <div className="chartCard_w">
                                                <div className="chartCardTop">
                                                    <div className="kyccustomformheading">
                                                        <h1 className="list_top_heading textAlignCenter text-center">
                                                            <FormattedMessage id="agent.AgentUsers" />
                                                        </h1>
                                                        <button className="addposbtn c_first_pending_BTN" onClick={this.showAddNewUser}><FormattedMessage id="agent.AddNewAgentUser" /></button>
                                                    </div>
                                                </div>
                                                <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                                    <div className="tableTop_wrapper">
                                                        <div className="disFl">
                                                            <h5 className="show_pp margin_right8"><FormattedMessage id="agent.Show" /></h5>
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
                                                            <FormattedMessage id="agent.Entries" />
                                                            </h5>
                                                            <div
                                                                className="margin-left-auto"
                                                                style={{ display: "flex", alignItems: "center" }}
                                                            >
                                                                <div className="shortCustom">
                                                                    <span className="icon-Asset-55"></span>
                                                                    <h6><FormattedMessage id="agent.Sort" /></h6>
                                                                </div>
                                                                <div className="shortCustom">
                                                                    <Dropdown
                                                                        overlay={
                                                                            <ul class="filterDrd">
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <span class="icon-logout"></span><FormattedMessage id="agent.All" />
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <span class="icon-logout"></span><FormattedMessage id="agent.Inactive" />
                                                                                    </a>
                                                                                </li>
                                                                                <li>
                                                                                    <a href="#">
                                                                                        <span class="icon-logout"></span><FormattedMessage id="agent.Active" />
                                                                                    </a>
                                                                                </li>
                                                                            </ul>
                                                                        }
                                                                        placement="bottomLeft"
                                                                        trigger={["click"]}
                                                                    >
                                                                        <div className="shortCustom01">
                                                                            <span className="icon-Asset-54"></span>
                                                                            <h6><FormattedMessage id="agent.Filter" /></h6>
                                                                        </div>
                                                                    </Dropdown>
                                                                </div>
                                                                <div
                                                                    className="search_w_merchant_m"
                                                                    style={{ width: "270px" }}
                                                                >
                                                                    <FormattedMessage id="agent.Search">
                                                                    {placeholder =>
                                                                    <input type="search" placeholder={placeholder} />}
                                                                    </FormattedMessage>
                                                                </div>
                                                            </div>
                                                        </div>
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
                                                            rowData={this.state.agentUserData.map((data) => {
                                                                return (
                                                                    {

                                                                        AgentUserID: data.agentUserId,
                                                                        Name: data.name,
                                                                        Email: data.email,
                                                                        Username: data.userName,
                                                                        MobileNumber: data.mobileNumber.split("u_")[1],
                                                                        Status: data.userStatus,
                                                                        RoleID: data.userRole.userRoleId,
                                                                        Role: data.userRole.name

                                                                    }
                                                                )
                                                            })}
                                                            pagination={true}
                                                            onGridReady={this.onGridReady}
                                                            onPaginationChanged={this.onPaginationChanged}
                                                            paginationPageSize={10}
                                                            suppressPaginationPanel={true}


                                                        />
                                                    </div>
                                                    <div className="customAgFooter">

                                                        <div className="showingFooter">
                                                            <span><FormattedMessage id="agent.Showing" /></span>
                                                            <span id="bTo"> </span>
                                                            <span><FormattedMessage id="agent.To" /></span>
                                                            <span id="afterTo"></span>
                                                            <span><FormattedMessage id="agent.Of" /></span>
                                                            <span id="totalPageSize"></span>
                                                            <span><FormattedMessage id="agent.Entries" /></span>
                                                        </div>
                                                        <div className="NextPrevW">
                                                            <button className="NextPrev" onClick={() => this.onBtPrevious()}> <FormattedMessage id="agent.Prev" /></button>
                                                            <span className="valueNextPrev" id="lbCurrentPage"></span>
                                                            <button className="NextPrev" onClick={() => this.onBtNext()}> <FormattedMessage id="agent.Next" /></button>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    this.state.showAddNewUser && (
                        <div className="main_contain settings-container">
                            <div className="merch_m_list_w">
                                <div className="merch_list_card" id="merch_list_card">
                                    <div className="section_custom">
                                        <div className="sectionInn">
                                            <div className="chartCard_w">
                                                <div className="chartCardTop">
                                                    <div className="kyccustomformheading">
                                                        <h1 className="list_top_heading textAlignCenter text-center">
                                                            <FormattedMessage id="agent.AddNewAgentUser" />
                                                        </h1>
                                                    </div>
                                                </div>
                                                <div className="chartCardMiddle" style={{ padding: "24px" }}>

                                                    <div className="containerBiaN_form">
                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label><FormattedMessage id="agent.Name" /></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                            <FormattedMessage id="agent.EnterName">
                                                                {placeholder =>
                                                                <input name="name" value={this.state.name} onChange={(e) => { this.handleOnChangeInput(e) }} type="text" placeholder={placeholder} />}
                                                            </FormattedMessage>
                                                            </div>
                                                        </div>
                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label><FormattedMessage id="agent.Email" /></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                            <FormattedMessage id="agent.EnterEmailAddress">
                                                                {placeholder =>
                                                                <input name="email" value={this.state.email} onChange={(e) => { this.handleOnChangeInput(e) }} type="text" placeholder={placeholder} />}
                                                            </FormattedMessage>
                                                            </div>
                                                        </div>
                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label><FormattedMessage id="agent.Username" /></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <FormattedMessage id="agent.EnterUsername">
                                                                    {placeholder =>
                                                                <input name="username" value={this.state.username} onChange={(e) => { this.handleOnChangeInput(e) }} type="text" placeholder={placeholder} />}
                                                                </FormattedMessage>
                                                            </div>
                                                        </div>
                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label><FormattedMessage id="agent.MobileNumber" /></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                {/* <input name="mobileNumber" value={this.state.mobileNumber} onChange={(e) => { this.handleOnChangeInput(e) }} type="text" placeholder="Enter Mobile Number" /> */}
                                                                <PhoneInput
                                                                    country="cm"
                                                                    enableSearch={true}
                                                                    countryCodeEditable={false}
                                                                    enableLongNumbers={false}
                                                                    searchPlaceholder="Search for countries.."
                                                                    inputStyle={{ width: "100%" }}
                                                                    value={this.state.mobileNumber}
                                                                    onChange={this.handleChangeMobile}
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Role</label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <input name="role" value={this.state.role} onChange={(e) => { this.handleOnChangeInput(e) }} type="text" placeholder="Enter Description" />
                                                            </div>
                                                        </div> */}

                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label><FormattedMessage id="agent.Role" /> <span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <div className="categorySelect">
                                                                    <Select
                                                                        value={this.state.role}
                                                                        style={{ width: 100 + "%", height: 52 }}
                                                                        onChange={(e) => {
                                                                            this.setState({
                                                                                role: e
                                                                            });
                                                                        }}
                                                                        id={'page-size'}
                                                                    >
                                                                        <Option value="DEFAULT" disabled={true}><FormattedMessage id="agent.SelectaRole" /></Option>
                                                                        {this.state.rolesData.map((data) => {

                                                                            return (
                                                                                <>
                                                                                    <Option value={data.userRoleId}>{data.name}</Option>
                                                                                </>
                                                                            )

                                                                        })}
                                                                        {/* <Option value={true}>Active</Option>
                                                                        <Option value={false}>Inactive</Option> */}
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div style={{ width: "100%", float: "left" }}>
                                                        <div className="custom-d-flex confirm_p_w mTB00 button-container rspacing">
                                                            <button className="blackbtn aryousureBTN confirmBtnR" onClick={() => {
                                                                this.onCancelView();
                                                            }}><FormattedMessage id="cancel" /></button>
                                                            <button className="aryousureBTN confirmBtnR" onClick={() => {
                                                                this.onAddNewUser();
                                                            }}><FormattedMessage id="submit" /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

                {
                    this.state.showEditUser && (
                        <div className="main_contain settings-container">
                            <div className="merch_m_list_w">
                                <div className="merch_list_card" id="merch_list_card">
                                    <div className="section_custom">
                                        <div className="sectionInn">
                                            <div className="chartCard_w">
                                                <div className="chartCardTop">
                                                    <div className="kyccustomformheading">
                                                        <h1 className="list_top_heading textAlignCenter text-center">
                                                            Edit Agent User
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
                                                                <input name="name" value={this.state.name} onChange={(e) => { this.handleOnChangeInput(e) }} type="text" placeholder="Enter Name" />
                                                            </div>
                                                        </div>
                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Email</label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <input name="email" value={this.state.email} onChange={(e) => { this.handleOnChangeInput(e) }} type="text" placeholder="Enter Email Address" />
                                                            </div>
                                                        </div>
                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Username</label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <input name="username" value={this.state.username} onChange={(e) => { this.handleOnChangeInput(e) }} type="text" placeholder="Enter Username" />
                                                            </div>
                                                        </div>
                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Mobile Number</label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                {/* <input name="mobileNumber" value={this.state.mobileNumber} onChange={(e) => { this.handleOnChangeInput(e) }} type="text" placeholder="Enter Mobile Number" /> */}
                                                                <PhoneInput
                                                                    country="cm"
                                                                    enableSearch={true}
                                                                    countryCodeEditable={false}
                                                                    enableLongNumbers={false}
                                                                    searchPlaceholder="Search for countries.."
                                                                    inputStyle={{ width: "100%" }}
                                                                    value={this.state.mobileNumber}
                                                                    onChange={this.handleChangeMobile}
                                                                />
                                                            </div>
                                                        </div>
                                                        {/* <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Role</label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <input name="role" value={this.state.role} onChange={(e) => { this.handleOnChangeInput(e) }} type="text" placeholder="Enter Description" />
                                                            </div>
                                                        </div> */}

                                                        <div className="containerBiaN_f_row">
                                                            <div className="containerBiaN_f_col width30percent textAlignRight">
                                                                <label>Role <span className="mantdat">*</span></label>
                                                            </div>
                                                            <div className="containerBiaN_f_col width70percent">
                                                                <div className="categorySelect">
                                                                    <Select
                                                                        value={this.state.role}
                                                                        style={{ width: 100 + "%", height: 52 }}
                                                                        onChange={(e) => {
                                                                            this.setState({
                                                                                role: e
                                                                            });
                                                                        }}
                                                                        id={'page-size'}
                                                                    >
                                                                        <Option value="DEFAULT" disabled={true}>Select a Role</Option>
                                                                        {this.state.rolesData.map((data) => {

                                                                            return (
                                                                                <>
                                                                                    <Option value={data.userRoleId}>{data.name}</Option>
                                                                                </>
                                                                            )

                                                                        })}
                                                                        {/* <Option value={true}>Active</Option>
                                                                        <Option value={false}>Inactive</Option> */}
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>
                                                    <div style={{ width: "100%", float: "left" }}>
                                                        <div className="custom-d-flex confirm_p_w mTB00 button-container rspacing">
                                                            <button className="blackbtn aryousureBTN confirmBtnR" onClick={() => {
                                                                this.onCancelView();
                                                            }}>Cancel</button>
                                                            <button className="aryousureBTN confirmBtnR" onClick={() => {
                                                                this.onUpdateAgentUser();
                                                            }}>Update</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </>
            </IntlProvider>
        );
    }
}

// function for mapping redux state values with props //
const mapStateToProps = ({ agentReducer, commonReducer }) => {
    return {
        getUserRoleStatus: agentReducer.getUserRoleStatus,
        getUserRoleData: agentReducer.getUserRoleData,
        addAgentUserStatus: agentReducer.addAgentUserStatus,
        addAgentUserData: agentReducer.addAgentUserData,
        getAgentDataStatus: agentReducer.getAgentDataStatus,
        getAgentData: agentReducer.getAgentData,
        deleteAgentUserStatus: agentReducer.deleteAgentUserStatus,
        updateAgentUserStatus: agentReducer.updateAgentUserStatus,
        updateAgentUserData: agentReducer.updateAgentUserData,

        language : commonReducer.language,
    }
};

//function for maping with dispatched actions with props //
const mapDispatchToProps = (dispatch) => ({
    addAgentUser: (payload) => dispatch(addAgentUser(payload)),
    getAllUserRoles: (token) =>
        dispatch(getAllUserRoles(token)),
    getAllAgentUsers: () =>
        dispatch(getAllAgentUsers()),
    deleteAgentUser: (id) => dispatch(deleteAgentUser(id)),
    updateAgentUser: (id, payload) => dispatch(updateAgentUser(id, payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);