import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import '../../../css/transfer.css';
import '../../../css/banking_operattion.css';

import 'antd/dist/antd.css';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import Highcharts from 'highcharts';
import variablePie from "highcharts/modules/variable-pie.js";
import HighchartsReact from 'highcharts-react-official';

import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import highcharts3d from 'highcharts/highcharts-3d';
import ProgressBar from "@ramonak/react-progress-bar";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from '@material-ui/core/Button';

import success from '../../../Assets/images/confirm.svg';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import { Card } from "reactstrap";
import { Select } from '@material-ui/core';
import { verifyCustomer } from '../../../services/agent/customer_verification_actions';
import { fetchAgentProfile } from '../../../services/agent/profile_actions';
import { toastr } from 'react-redux-toastr';
import OtpInput from 'react-otp-input';
import { sendOtpToCustomer } from '../../../services/agent/customer_otp_actions';
import { walletCashOutFromBank } from '../../../services/agent/wallet_account_actions';
import { initiateWalletCashDeposit } from '../../../services/agent/cash_deposit_actions';

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(40),
            height: theme.spacing(100),
        },
    },
}));


const currencies = [
    {
        value: 'XAF',
        label: 'XAF',
    },
];

const accounts = [
    {
        value: '10005-00001-05424101051-38',
        label: '10005-00001-05424101051-38',
    },
    {
        value: '10005-00001-01723561051-11',
        label: '10005-00001-01723561051-11',
    },

];

function WalletTransfer() {

    const classes = useStyles();

    const idDocumentTypes = [
        { name: "ID Card", value: "ID_CARD" },
        { name: "Passport", value: "PASSPORT" }
    ];

    const { Option } = Select;

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const [currency, setCurrency] = React.useState('XAF');

    const [account, setAccount] = React.useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleChange2 = (event) => {
        setAccount(event.target.value);
    };

    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedDocumentType, setSelectedDocumentType] = useState("ID_CARD");
    const [idDocumentNumber, setIdDocumentNumber] = useState('');
    const [step, setStep] = useState(0);
    const [bcID, setBCID] = useState("");
    const [bankCode, setBankCode] = useState("");
    const [branchCode, setBranchCode] = useState("");
    const [accNum, setAccNum] = useState("");
    const [key, setKey] = useState("");
    const [amount, setAmount] = useState('');
    const [reason, setReason] = useState('');
    const [fee, setFee] = useState('');
    const [otp, setOtp] = useState('');
    const [otpTimer, setOtpTimer] = React.useState(10);

    const [fromWallet, setFromWallet] = useState("");
    const [toWallet, setToWallet] = useState("");

    const dispatch = useDispatch();
    // const agentProfile = useSelector(state => state.agentReducer.profile.data);
    const customerSuccess = useSelector(state => state.agentReducer.customerValidation.success);

    // useEffect(() => {
    //     if (!agentProfile) {
    //         dispatch(fetchAgentProfile(sessionStorage.getItem("token")));
    //     }
    //     console.log(agentProfile, "AGENT PROFILE");
    // }, [agentProfile, dispatch]);

    useEffect(() => {
        console.log(customerSuccess, "customer success")
        if (step === 0 && customerSuccess) {
            toastr.success("Valid Customer Details.")
            setStep(1);
        }
    }, [customerSuccess, dispatch])

    useEffect(() => {
        if (step === 2) {
            if (otpTimer > 0) {
                setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
            }
        }
    }, [otpTimer, step]);

    const resendCustomerOtp = () => {
        setOtpTimer(10);
        sendCustomerOTP();
        setOtp("");
    }

    const sendCustomerOTP = () => {
        var requestObj = {
            "customerMobile": phoneNumber,
            "customerType": "WALLET",
            "mfaChannel": "SMS"
        };
        dispatch(sendOtpToCustomer(sessionStorage.getItem("token"), requestObj));
    }

    const firstNext = () => {

        var requestObj = {
            "phoneNumber": phoneNumber,
            "idDocumentType": selectedDocumentType,
            "idDocumentNumber": idDocumentNumber,
        };

        dispatch(verifyCustomer(sessionStorage.getItem("token"), requestObj));
    }

    const walletToAccountSecondNext = () => {
        sendCustomerOTP();
        setOtp("");
        setStep(2);
    }

    const walletToWalletSecondNext = () => {
        sendCustomerOTP();
        setOtp("");
        setStep(2);
    }

    const finalSubmit = () => {

        if (selectedIndex === 0 && step === 2) {
            let data = {
                "bankCustomerId": bcID,
                "toAccountNumber": bankCode + "-" + branchCode + "-" + accNum + "-" + key,
                "amount": amount,
                "reason": reason,
                "mfaToken": otp,
                "currencyName": currency,
                "fee": 50,
                "type": "CASH_OUT"
            }

            console.log(data, "WALLET TO ACCOUNT DATA");

            dispatch(walletCashOutFromBank(data));

        } else if (selectedIndex === 1 && step === 2) {

            let data = {
                "debtorUserType": "AGENT",
                "debtorUserId": fromWallet,
                "currencyName": currency,
                "amount": amount,
                "reason": reason,
                "creditorUserType": "CUSTOMER",
                "creditorUserId": toWallet,
                "fee": 50,
                "type": "WALLET_TRANSFER",
                "mfaToken": otp
            }

            // dispatch(initiateWalletCashDeposit(sessionStorage.getItem("token"), data));
            console.log(data, "WALLET TO WALLET DATA");

        }
    }

    const resetAll = () => {
        setStep(0);
        setSelectedDocumentType("ID_CARD");
        setPhoneNumber("");
        setIdDocumentNumber("");
        setBCID("");
        setAmount("");
        setBankCode("");
        setBranchCode("");
        setAccNum("");
        setKey("");
        setReason("");
        setOtp("");
        setFromWallet("");
        setToWallet("");
    }

    return (
        <div className="main_contain">

            <div className="left_wrapper">
                <div className={classes.root}>
                    <Paper>
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem>
                                <ListItemText primary="Transfer" />
                            </ListItem>
                            <Divider />
                            <ListItemLink href="#simple-list" button selected={selectedIndex === 0}
                                onClick={(event) => {
                                    handleListItemClick(event, 0);
                                    resetAll();
                                }}>
                                <ListItemText secondary="Wallet To Account" />
                            </ListItemLink>
                            <Divider />
                            <ListItemLink href="#simple-list" button selected={selectedIndex === 1}
                                onClick={(event) => {
                                    handleListItemClick(event, 1)
                                    resetAll();
                                }}>
                                <ListItemText secondary="Wallet To Wallet" />
                            </ListItemLink>
                        </List>
                    </Paper>
                </div>

            </div>


            <div className="right_wrapper">

                {selectedIndex === 0 ? <div className="section_custom">
                    <div className="sectionInn">
                        <div className="chartCard_w m_r100 getHeight">
                            <div className="chartCardTop">
                                <div className="flCenterColumn">
                                    <h1 className="commonHeading textAlignCenter">Wallet to Account</h1>
                                </div>
                            </div>
                            <div className="chartCardMiddle">
                                <div className="recentTrans_w2">
                                    {step === 0 && (
                                        <>
                                            <div className="containerBiaN_form" style={{ marginLeft: "10%" }}>
                                                <div className="containerBiaN_f_row">
                                                    <div className="containerBiaN_f_col width30percent textAlignRight">
                                                        <label>Phone Number: <span className="mantdat">*</span></label>
                                                    </div>
                                                    <div className="containerBiaN_f_col width70percent">
                                                        <input placeholder="Enter Phone number" type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="containerBiaN_f_row">
                                                    <div className="containerBiaN_f_col width30percent textAlignRight">
                                                        <label>Document Type: <span className="mantdat">*</span></label>
                                                    </div>
                                                    <div className="containerBiaN_f_col width70percent">
                                                        <TextField
                                                            select
                                                            label="Select"
                                                            value={selectedDocumentType}
                                                            onChange={(e) => setSelectedDocumentType(e.target.value)}
                                                            fullWidth
                                                        >
                                                            {idDocumentTypes.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.name}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </div>
                                                </div>
                                                <div className="containerBiaN_f_row" style={{ marginBottom: "3%" }}>
                                                    <div className="containerBiaN_f_col width30percent textAlignRight">
                                                        <label>ID Document Number: <span className="mantdat">*</span></label>
                                                    </div>
                                                    <div className="containerBiaN_f_col width70percent">
                                                        <input placeholder="Enter ID document number" value={idDocumentNumber} onChange={(e) => setIdDocumentNumber(e.target.value)} />
                                                    </div>
                                                </div>

                                                <Grid container spacing={6} container justify={"center"}>
                                                    <Grid item xs={12} sm={6} container justify={"center"}>
                                                        <Button className="btn-submit-non-afb"
                                                            onClick={(event) => {
                                                                firstNext();
                                                            }}
                                                            style={{
                                                                borderRadius: 20, width: '135px',
                                                                backgroundColor: 'red', borderBlockColor: 'white',
                                                                color: 'white'
                                                            }} >
                                                            Next
                                                        </Button>
                                                    </Grid>
                                                </Grid>

                                            </div>
                                        </>
                                    )}
                                    {step === 1 && (
                                        <>
                                            <Grid container spacing={6} container justify={"center"}>

                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Bank Customer ID </Typography>
                                                    <TextField
                                                        type="text"
                                                        value={bcID}
                                                        required
                                                        name="fromaccount"
                                                        fullWidth
                                                        placeholder="Bank Customer ID"
                                                        onChange={(e) => setBCID(e.target.value)}

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Amount </Typography>
                                                    <TextField
                                                        type="text"
                                                        value={amount}
                                                        required
                                                        name="fromaccount"
                                                        fullWidth
                                                        placeholder="Amount"
                                                        onChange={(e) => setAmount(e.target.value)}

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Bank Code </Typography>
                                                    <TextField
                                                        type="text"
                                                        value={bankCode}
                                                        required
                                                        name="fromaccount"
                                                        fullWidth
                                                        placeholder="Bank Code"
                                                        onChangeCapture={(e) => setBankCode(e.target.value)}

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Branch Code </Typography>
                                                    <TextField
                                                        type="text"
                                                        required
                                                        name="fromaccount"
                                                        fullWidth
                                                        placeholder="Branch Code"
                                                        value={branchCode}
                                                        onChange={(e) => setBranchCode(e.target.value)}

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Account Number </Typography>
                                                    <TextField
                                                        type="text"
                                                        required
                                                        name="fromaccount"
                                                        fullWidth
                                                        placeholder="Account Number"
                                                        value={accNum}
                                                        onChange={(e) => setAccNum(e.target.value)}

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Key </Typography>
                                                    <TextField
                                                        type="text"
                                                        required
                                                        name="fromaccount"
                                                        fullWidth
                                                        placeholder="Key"
                                                        value={key}
                                                        onChange={(e) => setKey(e.target.value)}

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Currency </Typography>
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        value={currency}
                                                        onChange={(e) => setCurrency(e.target.value)}
                                                        fullWidth
                                                        helperText="Please select your currency"

                                                    >
                                                        {currencies.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Reason </Typography>
                                                    <TextField
                                                        type="text"
                                                        required
                                                        name="fromaccount"
                                                        value={reason}
                                                        onChange={(e) => setReason(e.target.value)}
                                                        fullWidth
                                                        placeholder="Reason of Transaction"

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} container justify={"flex-start"}>
                                                    <Button className="btn-cancel-non-afb" style={{ backgroundColor: 'darkgray', borderRadius: 20, width: '135px', borderBlockColor: 'white' }} onClick={() => setStep(0)}>
                                                        Back
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sm={6} container justify={"flex-end"}>
                                                    <Button className="btn-submit-non-afb"
                                                        onClick={(event) => {
                                                            walletToAccountSecondNext();
                                                        }}
                                                        style={{
                                                            borderRadius: 20, width: '135px',
                                                            backgroundColor: 'red', borderBlockColor: 'white',
                                                            color: 'white'
                                                        }} >
                                                        Next
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}
                                    {step === 2 && (
                                        <>
                                            <div className="containerBiaN_form" style={{ width: "100%" }}>
                                                <div className="containerBiaN_f_row">
                                                    <div className="containerBiaN_f_col width30percent textAlignRight">
                                                        <label>Enter OTP <span className="mantdat">*</span></label>
                                                    </div>
                                                    <div className="containerBiaN_f_col width70percent">
                                                        <OtpInput
                                                            value={otp}
                                                            shouldAutoFocus={true}
                                                            onChange={(value) => setOtp(value)}
                                                            numInputs={6}
                                                            seperator={<span></span>}
                                                            isInputNum={true}
                                                            inputStyle={{
                                                                width: "60px",
                                                                marginRight: "10px",
                                                                marginLeft: "10px",
                                                                fontWeight: '600',
                                                                fontSize: '16px',
                                                                lineHeight: '20px',
                                                                padding: '15px 20px',
                                                                borderRadius: '5px',
                                                                border: '1px solid transparent',
                                                                color: '#00000',
                                                                background: '#F2F2F2',
                                                                display: 'inline-block',
                                                                boxShadow: "0px 8px 8px rgba(37, 51, 66, 0.15)"
                                                            }}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="containerBiaN_f_row" style={{ marginBottom: "3%" }}>
                                                    <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    </div>
                                                    <div className="containerBiaN_f_col width70percent" style={{ padding: '0px 0px 0px 20px' }}>
                                                        <div style={{ display: 'flex' }}>
                                                            {otpTimer !== 0 ? <p>Resend OTP in {otpTimer}</p> : <p>Didn't receive OTP? <span onClick={() => resendCustomerOtp()} style={{ color: 'rgb(191 21 21)', cursor: 'pointer', textDecoration: 'underline' }}>Resend</span></p>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <Grid container spacing={6} container justify={"center"}>
                                                    <Grid item xs={12} sm={6} container justify={"center"}>
                                                        <Button className="btn-submit-non-afb"
                                                            onClick={(event) => {
                                                                finalSubmit();
                                                            }}
                                                            style={{
                                                                borderRadius: 20, width: '135px',
                                                                backgroundColor: 'red', borderBlockColor: 'white',
                                                                color: 'white'
                                                            }} >
                                                            Submit
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div className="cardFooter justify_content_end">

                            </div>
                        </div>
                    </div>
                </div> : null}

                {selectedIndex === 1 ? <div className="section_custom">
                    <div className="sectionInn">
                        <div className="chartCard_w m_r100 getHeight">
                            <div className="chartCardTop">
                                <div className="flCenterColumn">
                                    <h1 className="commonHeading textAlignCenter">Wallet to Wallet</h1>
                                </div>
                            </div>
                            <div className="chartCardMiddle">
                                <div className="recentTrans_w2">
                                    {step === 0 && (
                                        <>
                                            <div className="containerBiaN_form" style={{ marginLeft: "10%" }}>
                                                <div className="containerBiaN_f_row">
                                                    <div className="containerBiaN_f_col width30percent textAlignRight">
                                                        <label>Phone Number: <span className="mantdat">*</span></label>
                                                    </div>
                                                    <div className="containerBiaN_f_col width70percent">
                                                        <input placeholder="Enter Phone number" type="number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                                                    </div>
                                                </div>
                                                <div className="containerBiaN_f_row">
                                                    <div className="containerBiaN_f_col width30percent textAlignRight">
                                                        <label>Document Type: <span className="mantdat">*</span></label>
                                                    </div>
                                                    <div className="containerBiaN_f_col width70percent">
                                                        <TextField
                                                            select
                                                            label="Select"
                                                            value={selectedDocumentType}
                                                            onChange={(e) => setSelectedDocumentType(e.target.value)}
                                                            fullWidth
                                                        >
                                                            {idDocumentTypes.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.name}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </div>
                                                </div>
                                                <div className="containerBiaN_f_row" style={{ marginBottom: "3%" }}>
                                                    <div className="containerBiaN_f_col width30percent textAlignRight">
                                                        <label>ID Document Number: <span className="mantdat">*</span></label>
                                                    </div>
                                                    <div className="containerBiaN_f_col width70percent">
                                                        <input placeholder="Enter ID document number" value={idDocumentNumber} onChange={(e) => setIdDocumentNumber(e.target.value)} />
                                                    </div>
                                                </div>

                                                <Grid container spacing={6} container justify={"center"}>
                                                    <Grid item xs={12} sm={6} container justify={"center"}>
                                                        <Button className="btn-submit-non-afb"
                                                            onClick={(event) => {
                                                                firstNext();
                                                            }}
                                                            style={{
                                                                borderRadius: 20, width: '135px',
                                                                backgroundColor: 'red', borderBlockColor: 'white',
                                                                color: 'white'
                                                            }} >
                                                            Next
                                                        </Button>
                                                    </Grid>
                                                </Grid>

                                            </div>
                                        </>
                                    )}

                                    {step === 1 && (
                                        <>
                                            <Grid container spacing={6} container justify={"center"}>

                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> From Wallet Account </Typography>
                                                    <TextField
                                                        type="text"
                                                        value={fromWallet}
                                                        required
                                                        name="fromaccount"
                                                        fullWidth
                                                        placeholder="From Wallet Account"
                                                        onChange={(e) => setFromWallet(e.target.value)}

                                                    />
                                                </Grid>

                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> To Wallet Account </Typography>
                                                    <TextField
                                                        type="text"
                                                        value={toWallet}
                                                        required
                                                        name="fromaccount"
                                                        fullWidth
                                                        placeholder="To Wallet Account"
                                                        onChange={(e) => setToWallet(e.target.value)}

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Amount </Typography>
                                                    <TextField
                                                        type="text"
                                                        value={amount}
                                                        required
                                                        name="fromaccount"
                                                        fullWidth
                                                        placeholder="Amount"
                                                        onChange={(e) => setAmount(e.target.value)}

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Currency </Typography>
                                                    <TextField
                                                        select
                                                        label="Select"
                                                        value={currency}
                                                        onChange={(e) => setCurrency(e.target.value)}
                                                        fullWidth
                                                        helperText="Please select your currency"

                                                    >
                                                        {currencies.map((option) => (
                                                            <MenuItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </MenuItem>
                                                        ))}
                                                    </TextField>
                                                </Grid>

                                                <Grid item xs={12} sm={10}>
                                                    <Typography variant="h6"> Reason </Typography>
                                                    <TextField
                                                        type="text"
                                                        required
                                                        name="fromaccount"
                                                        value={reason}
                                                        onChange={(e) => setReason(e.target.value)}
                                                        fullWidth
                                                        placeholder="Reason of Transaction"

                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6} container justify={"flex-start"}>
                                                    <Button className="btn-cancel-non-afb" style={{
                                                        borderRadius: 20, width: '135px', borderBlockColor: 'white',
                                                        backgroundColor: 'darkgray'
                                                    }} onClick={() => setStep(0)}  >
                                                        Back
                                                    </Button>
                                                </Grid>
                                                <Grid item xs={12} sm={6} container justify={"flex-end"}>
                                                    <Button className="btn-submit-non-afb"
                                                        onClick={(event) => {
                                                            walletToWalletSecondNext();
                                                        }}
                                                        style={{
                                                            borderRadius: 20, width: '135px',
                                                            backgroundColor: 'red', borderBlockColor: 'white',
                                                            color: 'white'
                                                        }} >
                                                        Next
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </>
                                    )}

                                    {step === 2 && (
                                        <>
                                            <div className="containerBiaN_form" style={{ width: "100%" }}>
                                                <div className="containerBiaN_f_row">
                                                    <div className="containerBiaN_f_col width30percent textAlignRight">
                                                        <label>Enter OTP <span className="mantdat">*</span></label>
                                                    </div>
                                                    <div className="containerBiaN_f_col width70percent">
                                                        <OtpInput
                                                            value={otp}
                                                            shouldAutoFocus={true}
                                                            onChange={(value) => setOtp(value)}
                                                            numInputs={6}
                                                            seperator={<span></span>}
                                                            isInputNum={true}
                                                            inputStyle={{
                                                                width: "60px",
                                                                marginRight: "10px",
                                                                marginLeft: "10px",
                                                                fontWeight: '600',
                                                                fontSize: '16px',
                                                                lineHeight: '20px',
                                                                padding: '15px 20px',
                                                                borderRadius: '5px',
                                                                border: '1px solid transparent',
                                                                color: '#00000',
                                                                background: '#F2F2F2',
                                                                display: 'inline-block',
                                                                boxShadow: "0px 8px 8px rgba(37, 51, 66, 0.15)"
                                                            }}
                                                        />
                                                    </div>

                                                </div>

                                                <div className="containerBiaN_f_row" style={{ marginBottom: "3%" }}>
                                                    <div className="containerBiaN_f_col width30percent textAlignRight">
                                                    </div>
                                                    <div className="containerBiaN_f_col width70percent" style={{ padding: '0px 0px 0px 20px' }}>
                                                        <div style={{ display: 'flex' }}>
                                                            {otpTimer !== 0 ? <p>Resend OTP in {otpTimer}</p> : <p>Didn't receive OTP? <span onClick={() => resendCustomerOtp()} style={{ color: 'rgb(191 21 21)', cursor: 'pointer', textDecoration: 'underline' }}>Resend</span></p>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <Grid container spacing={6} container justify={"center"}>
                                                    <Grid item xs={12} sm={6} container justify={"center"}>
                                                        <Button className="btn-submit-non-afb"
                                                            onClick={(event) => {
                                                                finalSubmit();
                                                            }}
                                                            style={{
                                                                borderRadius: 20, width: '135px',
                                                                backgroundColor: 'red', borderBlockColor: 'white',
                                                                color: 'white'
                                                            }} >
                                                            Submit
                                                        </Button>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null}

            </div>

        </div>
    );
}
export default WalletTransfer;