import React, { Component } from 'react';
import '../../css/dashboard.css';
import '../../css/merchant_management.css';
import '../../css/ag-grid-customization01.css';
import 'antd/dist/antd.css';
import "./antDcustom.css";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import DatePicker from "react-datepicker";
import activeUser from '../../Assets/images/confirm.svg'

import { Select, Menu, Dropdown, Modal } from 'antd';

import { connect } from "react-redux";
import { getAgentWalletHistory } from '../../services/agent/action';
import { FormattedMessage, IntlProvider } from 'react-intl';


const { Option } = Select;


class Transaction extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numberOfEntriesToShow: "10",
            gridApi: null,
            isModalVisible: false,
            paginationGetCurrentPage: null,
            popup: false,
            startdate: new Date(),
            endDate: new Date(),
            currencies: [],
            columnDefs: [
                { headerName: "Reference Number", field: "transactionReference" },
                {
                    headerName: "Transaction Date", field: "createdDate",
                    cellRendererFramework: (params) => {
                        // console.log(params, "PARAMS");
                        return (
                            <div>
                                {(params.value).split('T')[0]}
                            </div>
                        );
                    }
                },
                {
                    headerName: "Transaction Time", field: "createdDate",
                    cellRendererFramework: (params) => {
                        // console.log(params, "PARAMS");
                        return (
                            <div>
                                {(params.value).split('T')[1].split('.')[0]}
                            </div>
                        );
                    }
                },
                { headerName: "Transaction Type", field: "walletTransactionType" },

                { headerName: "Amount", field: "amount" },

                { headerName: "Fee", field: "fee" },
                // { headerName: "Amount", field: "Amount" },
                // { headerName: "Transaction Fee", field: "Transaction_Fee" },

                // { headerName: "Total Amount ", field: "Total_Amount" },
                // { headerName: "Status ", field: "Status" },
                // { headerName: "Transaction ", field: "Transaction" },
            ],
            rowData: [


            ],
            messages: "",
            language: ""

        };
    }
    save = () => {
        this.setState({
            popup: true
        })
    }
    close = () => {
        this.setState({
            popup: false
        })
    }
    onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };
    editChange = () => {
        this.props.history.push("/Shops_Points_Sales/EditPOS")
    }
    addChange = () => {
        this.props.history.push("/Shops_Points_Sales/AddPOS")
    }
    onGridReady = (params) => {
        this.setState({
            gridApi: params.api,
        })
        params.api.paginationGoToPage(10);
        document.getElementById('lbCurrentPage').innerHTML = this.state.gridApi.paginationGetCurrentPage() + 1
        document.getElementById('totalPageSize').innerHTML = this.state.rowData ? this.state.rowData.length : 0
        document.getElementById('bTo').innerHTML = params.api.paginationGetPageSize(10)
        const changedV = (params.api.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
        if (changedV <= this.state.rowData ? this.state.rowData.length : 0) {
            document.getElementById('afterTo').innerHTML = (params.api.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
        }
        else {
            document.getElementById('afterTo').innerHTML = this.state.rowData ? this.state.rowData.length : 0
        }
        // console.log("get",params.api.getDisplayedRowCount())
    }

    componentDidMount() {
        let start = this.state.startdate.toISOString().split('T')[0];
        let end = this.state.endDate.toISOString().split('T')[0];
        this.props.getAgentWalletHistory(start, end, 0, parseInt(this.state.numberOfEntriesToShow));
        this.translationHelperFunction();
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
                return import("../i18n/messages/fr.js");
            default:
                return import("../i18n/messages/en.js");
        }
    };

    handleChange = (value) => {
        // console.log(value, "Show Entries");
        let a = this.state.gridApi.paginationGetCurrentPage();
        console.log(a, "CURRENT PAGE")
        this.state.gridApi.paginationSetPageSize(Number(value))
        // document.getElementById('totalPageSize').innerHTML=this.state.gridApi.paginationGetPageSize()
        document.getElementById('bTo').innerHTML = this.state.gridApi.paginationGetPageSize()
        this.setState({
            numberOfEntriesToShow: value.toString()
        }, () => {
            // console.log(parseInt(this.state.numberOfEntriesToShow), "NUMBER OF ENTRIES TO SHOW")
            let start = this.state.startdate.toISOString().split('T')[0];
            let end = this.state.endDate.toISOString().split('T')[0];
            this.props.getAgentWalletHistory(start, end, 0, parseInt(this.state.numberOfEntriesToShow));
        });
    }

    showModal = () => {
        this.setState({
            isModalVisible: true
        })
    };

    handleOk = () => {
        this.setState({
            isModalVisible: true
        })
    };

    onCloseHandler = () => {
        this.setState({
            isModalVisible: false
        })
    }
    handleCancel = () => {
        this.setState({
            isModalVisible: false
        })
    };


    async componentWillReceiveProps(nextprops) {
        if (nextprops.language) {
            const messages = await this.loadLocaleData(nextprops.language);

            this.setState({
                messages: messages,
                language: nextprops.language,
            });

            if (nextprops.language == "fr") {
                this.setState({
                    columnDefs: [
                        { headerName: "Date de transaction", field: "Transaction_Date", width: 250 },
                        { headerName: "Numéro de téléphone du client", field: "Client_Phone_Number" },
                        { headerName: "Mode de paiement", field: "Payment_method" },

                        { headerName: "Numéro de référence", field: "Reference_Number" },
                        { headerName: "Monnaie", field: "Currency" },
                        { headerName: "Montant", field: "Amount" },
                        { headerName: "Frais de transaction", field: "Transaction_Fee" },

                        { headerName: "Montant total ", field: "Total_Amount" },
                        { headerName: "État", field: "Status" },
                        { headerName: "Transaction", field: "Transaction" },
                    ]
                })
            }
            else {
                this.setState({
                    columnDefs: [
                        { headerName: "Transaction Date", field: "Transaction_Date", width: 250 },
                        { headerName: "Client Phone Number", field: "Client_Phone_Number" },
                        { headerName: "Payment method", field: "Payment_method" },

                        { headerName: "Reference Number", field: "Reference_Number" },
                        { headerName: "Currency", field: "Currency" },
                        { headerName: "Amount", field: "Amount" },
                        { headerName: "Transaction Fee", field: "Transaction_Fee" },

                        { headerName: "Total Amount ", field: "Total_Amount" },
                        { headerName: "Status ", field: "Status" },
                        { headerName: "Transaction ", field: "Transaction" },
                    ]
                })
            }
        }

        if (nextprops.walletHistoryStatus && nextprops.walletHistoryData) {
            if (nextprops.walletHistoryData.content.length > 0) {

                let transactions = [];

                nextprops.walletHistoryData.content.map((transaction) => {

                    transactions.push(transaction.walletTransaction)

                })

                this.setState({
                    rowData: transactions
                }, () => {
                    console.log(this.state.rowData);
                })
            }
        }

    }

    onPaginationChanged = () => {
        console.log('onPaginationPageLoaded');
        if (this.state.gridApi) {
            document.getElementById('lbCurrentPage').innerHTML = this.state.gridApi.paginationGetCurrentPage() + 1
            document.getElementById('bTo').innerHTML = this.state.gridApi.paginationGetPageSize() * this.state.gridApi.paginationGetCurrentPage() + 1

            const changedV = (this.state.gridApi.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
            // if (changedV <= this.state.rowData.length) {
            //     document.getElementById('afterTo').innerHTML = (this.state.gridApi.paginationGetPageSize(10)) * (this.state.gridApi.paginationGetCurrentPage() + 1)
            // }
            // else {
            //     document.getElementById('afterTo').innerHTML = this.state.rowData.length
            // }


        }
    };

    onBtNext = () => {
        this.state.gridApi.paginationGoToNextPage();
        let start = this.state.startdate.toISOString().split('T')[0];
        let end = this.state.endDate.toISOString().split('T')[0];
        this.props.getAgentWalletHistory(start, end, this.state.gridApi.paginationGetCurrentPage(), parseInt(this.state.numberOfEntriesToShow));
    };

    onBtPrevious = () => {
        this.state.gridApi.paginationGoToPreviousPage();
        let start = this.state.startdate.toISOString().split('T')[0];
        let end = this.state.endDate.toISOString().split('T')[0];
        this.props.getAgentWalletHistory(start, end, this.state.gridApi.paginationGetCurrentPage(), parseInt(this.state.numberOfEntriesToShow));
    };


    setStartDate = (date) => {
        this.setState({ startdate: date })
    }


    setEndDate = (date) => {
        this.setState({ endDate: date });
    }

    filterData = () => {
        let start = this.state.startdate.toISOString().split('T')[0];
        let end = this.state.endDate.toISOString().split('T')[0];
        this.props.getAgentWalletHistory(start, end, 0, 10);
    }

    render() {
        // console.log("jai",this.state.paginationGetCurrentPage)
        return (
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
                                            <div className="kyccustomformheading">
                                                <h1 className="list_top_heading textAlignCenter text-center">
                                                    <FormattedMessage id="agent.Transactions" />
                                                </h1>
                                                {/* <button className="addposbtn c_first_pending_BTN" onClick={this.addChange}>Add a new Point of Sale</button> */}
                                            </div>
                                        </div>
                                        <div className=" chartCardMiddle" style={{ padding: "24px" }}>
                                            <div className="transactioncardmiddle">
                                                <div className="transactionformcol posformcol formCol">
                                                    <label className="formColLabel">From</label>
                                                    <div className="customdatepicker categorySelect" >
                                                        {/* <Select

                                                    style={{ width: 100 + "%", height: 52 }}

                                                >
                                                    <Option value="select_cat">WIIK eV</Option>
                                                    <Option value="Enterprises">WIIK eV</Option>
                                                    <Option value="Freelancer">WIIK eV</Option>
                                                </Select> */}
                                                        <DatePicker selected={this.state.startdate} onChange={this.setStartDate} />

                                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.6505 4.94878C12.4788 2.22005 7.67839 2.58041 4.94966 5.75206C2.22093 8.92372 2.58128 13.7242 5.75294 16.4529C8.92459 19.1816 13.7251 18.8213 16.4538 15.6496C19.1825 12.478 18.8222 7.67751 15.6505 4.94878ZM12.5334 13.0467L10.7635 11.524L9.24081 13.2938C9.13985 13.4112 8.9964 13.4836 8.84203 13.4952C8.68766 13.5068 8.53502 13.4566 8.41767 13.3556C8.30032 13.2547 8.22788 13.1112 8.21629 12.9569C8.2047 12.8025 8.25491 12.6498 8.35587 12.5325L9.87858 10.7626L8.10871 9.23993C7.99136 9.13897 7.91893 8.99553 7.90734 8.84116C7.89575 8.68679 7.94596 8.53414 8.04692 8.41679C8.14788 8.29944 8.29133 8.227 8.44569 8.21542C8.60006 8.20383 8.75271 8.25404 8.87006 8.355L10.6399 9.8777L12.1626 8.10784C12.2636 7.99049 12.407 7.91805 12.5614 7.90646C12.7158 7.89487 12.8684 7.94508 12.9858 8.04604C13.1031 8.14701 13.1756 8.29045 13.1871 8.44482C13.1987 8.59919 13.1485 8.75184 13.0476 8.86919L11.5249 10.6391L13.2947 12.1618C13.4121 12.2627 13.4845 12.4062 13.4961 12.5605C13.5077 12.7149 13.4575 12.8675 13.3565 12.9849C13.2556 13.1022 13.1121 13.1747 12.9577 13.1863C12.8034 13.1979 12.6507 13.1476 12.5334 13.0467Z" fill="#4C4D4E" />
                                                        </svg>

                                                    </div>
                                                </div>
                                                <div className="transactionformcol posformcol formCol">
                                                    <label className="formColLabel">To</label>
                                                    <div className="customdatepicker categorySelect" >
                                                        {/* <Select

                                                    style={{ width: 100 + "%", height: 52 }}

                                                >
                                                    <Option value="select_cat">WIIK eV</Option>
                                                    <Option value="Enterprises">WIIK eV</Option>
                                                    <Option value="Freelancer">WIIK eV</Option>
                                                </Select> */}
                                                        <DatePicker selected={this.state.endDate} onChange={this.setEndDate} />

                                                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.6505 4.94878C12.4788 2.22005 7.67839 2.58041 4.94966 5.75206C2.22093 8.92372 2.58128 13.7242 5.75294 16.4529C8.92459 19.1816 13.7251 18.8213 16.4538 15.6496C19.1825 12.478 18.8222 7.67751 15.6505 4.94878ZM12.5334 13.0467L10.7635 11.524L9.24081 13.2938C9.13985 13.4112 8.9964 13.4836 8.84203 13.4952C8.68766 13.5068 8.53502 13.4566 8.41767 13.3556C8.30032 13.2547 8.22788 13.1112 8.21629 12.9569C8.2047 12.8025 8.25491 12.6498 8.35587 12.5325L9.87858 10.7626L8.10871 9.23993C7.99136 9.13897 7.91893 8.99553 7.90734 8.84116C7.89575 8.68679 7.94596 8.53414 8.04692 8.41679C8.14788 8.29944 8.29133 8.227 8.44569 8.21542C8.60006 8.20383 8.75271 8.25404 8.87006 8.355L10.6399 9.8777L12.1626 8.10784C12.2636 7.99049 12.407 7.91805 12.5614 7.90646C12.7158 7.89487 12.8684 7.94508 12.9858 8.04604C13.1031 8.14701 13.1756 8.29045 13.1871 8.44482C13.1987 8.59919 13.1485 8.75184 13.0476 8.86919L11.5249 10.6391L13.2947 12.1618C13.4121 12.2627 13.4845 12.4062 13.4961 12.5605C13.5077 12.7149 13.4575 12.8675 13.3565 12.9849C13.2556 13.1022 13.1121 13.1747 12.9577 13.1863C12.8034 13.1979 12.6507 13.1476 12.5334 13.0467Z" fill="#4C4D4E" />
                                                        </svg>

                                                    </div>
                                                </div>
                                                {/* <div className="transactionformcol posformcol formCol">
                                                <label className="formColLabel">Currency</label>
                                                <div className="categorySelect" >
                                                    <Select

                                                        style={{ width: 100 + "%", height: 52 }}

                                                    >

                                                        {this.state.currencies.map((currency) => {
                                                            return (
                                                                <Option value={currency.code}>{currency.name}</Option>
                                                            )
                                                        })
                                                        }


                                                    </Select>


                                                </div>
                                            </div> */}
                                                {/* <div className="transactionformcol posformcol formCol">
                                                <label className="formColLabel">Filter by Status</label>
                                                <div className="categorySelect" >
                                                    <Select

                                                        style={{ width: 100 + "%", height: 52 }}

                                                    >
                                                        <Option value="select_cat">Completed</Option>
                                                        <Option value="Enterprises">Failed</Option>
                                                        <Option value="Freelancer">Initiated</Option>
                                                        <Option value="Freelancer">All</Option>
                                                    </Select>


                                                </div>
                                            </div> */}
                                            </div>
                                            <div className="fetchsection">
                                                <button className="dcbtn" onClick={this.filterData}>Fetch</button>
                                            </div>
                                            <div className="tableTop_wrapper">
                                                <div className="disFl">
                                                    <h5 className="show_pp margin_right8"><FormattedMessage id="agent.Show" /></h5>
                                                    <div className="tableShowRecordPerPage">
                                                        <Select
                                                            defaultValue={this.state.numberOfEntriesToShow}
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
                                                            <h6><FormattedMessage id="agent.Sort" /></h6>
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
                                                <div className="actionBtnWp">
                                                    <span className="icon-Asset-51"></span>
                                                    <span className="icon-Asset-52"></span>
                                                    <span className="icon-Asset-53"></span>
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
                                                                <label>Point of Sale Merchant Name ::</label>
                                                                <span>Shop name</span>
                                                            </div>
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
            </IntlProvider>
        );
    }
}

const mapStateToProps = ({ agentReducer }) => {

    return {
        walletHistoryData: agentReducer.walletHistoryData,
        walletHistoryStatus: agentReducer.walletHistoryStatus,
    }

};

const mapDispatchToProps = dispatch => {
    return {
        getAgentWalletHistory: (fromDate, toDate, page, size) => dispatch(getAgentWalletHistory(fromDate, toDate, page, size))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Transaction);