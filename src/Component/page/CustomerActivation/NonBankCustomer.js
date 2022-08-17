import React, { Component } from 'react';
import '../../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import '../Settings/General/formfromold.css'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { getAllAgentMemberLists } from "../../../services/agent/action"
import 'react-phone-input-2/lib/style.css'
import { FormattedMessage, IntlProvider } from 'react-intl';

import '../Settings/General/settingcss.css'

import { Select, Dropdown } from "antd";
import { connect } from "react-redux"

const { Option } = Select;

class NonBankCustomerActivation extends Component {

    constructor(props) {

        super(props);

        this.state = {
            columnDefs: [
                { headerName: "Name", field: "agentName", width: 250 },
                { headerName: "Email", field: "agentEmailAddress" },
                { headerName: "Telephone ", field: "phoneNo" },
                {
                    headerName: "Status", field: "status",
                },
            ],
            rowData: [],
            agentPackagesData: [],
            messages: "",
            language: "",
        };
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
    }
    handleChange = (value) => {
        this.state.gridApi.paginationSetPageSize(Number(value))
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
    };

    onBtPrevious = () => {
        this.state.gridApi.paginationGoToPreviousPage();
    };

    async translationHelperFunction() {

        const messages = await this.loadLocaleData(localStorage.getItem("lang"));
        this.setState({
            messages: messages,
            language: localStorage.getItem("lang")
        });

    }

    loadLocaleData = (locale) => {
        switch (locale) {
            case "fr":
                return import("../../i18n/messages/fr.js");
            default:
                return import("../../i18n/messages/en.js");
        }
    };

    componentDidMount = () => {
        this.translationHelperFunction();
    }

    componentWillReceiveProps = async (nextprops) => {
        if (nextprops.language) {
            const messages = await this.loadLocaleData(nextprops.language);

            this.setState({
                messages: messages,
                language: nextprops.language,
            });


            if (nextprops.language == "fr") {
                this.setState({
                    columnDefs: [
                        { headerName: "Nom", field: "agentName", width: 250 },
                        { headerName: "E-mail", field: "agentEmailAddress" },
                        { headerName: "Téléphone ", field: "phoneNo" },
                        {
                            headerName: "État", field: "status",
                        },
                    ]
                })
            }
            else {
                this.setState({
                    columnDefs: [
                        { headerName: "Name", field: "agentName", width: 250 },
                        { headerName: "Email", field: "agentEmailAddress" },
                        { headerName: "Telephone ", field: "phoneNo" },
                        {
                            headerName: "Status", field: "status",
                        },
                    ]
                })
            }
        }
    }

    render() {
        return (
            <IntlProvider
                messages={this.state.messages.default}
                locale={this.state.language}
            >
                <>

                    <div className="main_contain">
                        <div className="merch_m_list_w">
                            <div className="merch_list_card" id="merch_list_card">
                                <div className="section_custom">
                                    <div className="sectionInn">
                                        <div className="chartCard_w">
                                            <div className="chartCardTop">
                                                <div className="kyccustomformheading">
                                                    <h1 className="list_top_heading textAlignCenter text-center" style={{ paddingLeft: "0px" }}>
                                                        Non Bank Customer Activation
                                                    </h1>
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
                                                        rowData={[]}
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
                                                        <button className="NextPrev" onClick={() => this.onBtPrevious()}><FormattedMessage id="agent.Prev" /></button>
                                                        <span className="valueNextPrev" id="lbCurrentPage"></span>
                                                        <button className="NextPrev" onClick={() => this.onBtNext()}><FormattedMessage id="agent.Next" /></button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            </IntlProvider>
        );
    }
}

const mapStateToProps = ({ agentReducer, commonReducer }) => {
    const {

    } = agentReducer;

    const { language } = commonReducer;

    console.log(agentReducer, "AGENT REDUCER")
    return {
        language,
    }

}

const mapDispatchToProps = (dispatch) => {

}
export default connect(mapStateToProps, mapDispatchToProps)(NonBankCustomerActivation);