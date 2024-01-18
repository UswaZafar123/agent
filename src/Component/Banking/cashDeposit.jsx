import React, { Component } from 'react';
import '../../css/transfer.css';
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

import { Select, DatePicker } from 'antd';
import moment from 'moment';
import Sidebar from "../Agent/sidebar/Sidebar";
import Logo from "../../Assets/images/logo.svg";
import {Side_bar_data} from "../Agent/sidebar/Sidebar_data";
import {NavLink} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {MenuItem} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
const dateFormat = 'YYYY/MM/DD';
// const customFormat = value => `custom format: ${value.format(dateFormat)}`;
const { Option } = Select;

function onChange(date, dateString) {
    console.log(date, dateString);
}




function handleChange(value) {
    console.log(`selected ${value}`);
}

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
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];




export default function CashDeposit () {

    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const [currency, setCurrency] = React.useState('EUR');

    const [account, setAccount] = React.useState('EUR');

    const handleChange = (event) => {
        setCurrency(event.target.value);
    };

    const handleChange2 = (event) => {
        setAccount(event.target.value);
    };





    /*constructor(props) {
        super(props);
        this.state = {

        }
    }



    componentDidMount() {
        const fromDivHeight = document.querySelector('.getHeight').clientHeight
        this.setState({
            fromDivHeight: fromDivHeight
        }, () => {
            console.log("test001", this.state.fromDivHeight)
        });

    }*/




    // render() {

    return (
        <div className="main_contain">


            <div className="section_custom">
                <div className="sectionInn">
                    <div className="chartCard_w m_r100 getHeight">
                        <div className="chartCardTop">
                            <div className="flCenterColumn">
                                <h1 className="commonHeading textAlignCenter">Cash Deposit</h1>
                            </div>
                        </div>
                        <div className="chartCardMiddle">
                            <div className="recentTrans_w2">
                                <Grid container spacing={6} justify={"center"}>


                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Bank Name </Typography>
                                        <TextField
                                            type="text"
                                            required
                                            name="fromaccount"
                                            fullWidth
                                            placeholder="Amount"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Branch Name / Code </Typography>
                                        <TextField
                                            type="text"
                                            required
                                            name="fromaccount"
                                            fullWidth
                                            placeholder="Bank Name"

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

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Account Key </Typography>
                                        <TextField
                                            type="text"
                                            required
                                            name="fromaccount"
                                            fullWidth
                                            placeholder="Account Key"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Payment Amount </Typography>
                                        <TextField
                                            type="text"
                                            required
                                            name="fromaccount"
                                            fullWidth
                                            placeholder="Payment Amount"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Beneficiary Name </Typography>
                                        <TextField
                                            type="text"
                                            required
                                            name="fromaccount"
                                            fullWidth
                                            placeholder="Beneficiary Name"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Identification Number </Typography>
                                        <TextField
                                            type="text"
                                            required
                                            name="fromaccount"
                                            fullWidth
                                            placeholder="Identification Number"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Phone Number </Typography>
                                        <TextField
                                            type="text"
                                            required
                                            name="fromaccount"
                                            fullWidth
                                            placeholder="Phone Number"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Reason </Typography>
                                        <TextField
                                            type="text"
                                            required
                                            name="fromaccount"
                                            fullWidth
                                            placeholder="Reason"

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Currency </Typography>
                                        <TextField
                                            select
                                            label="Select"
                                            value={currency}
                                            onChange={handleChange}
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



                                </Grid>
                            </div>
                        </div>
                        <div className="cardFooter justify_content_end">
                            {/*<div className="allTic">*/}
                                <Grid item xs={12} sm={6} container justify={"flex-start"}>
                                <Button className="btn-cancel-non-afb"style={{borderRadius:20, width:'135px',borderBlockColor:'white'}}  >
                                            Cancel
                                        </Button>
                                    {/* <Button variant="contained" color="secondary"> Back</Button> */}
                                </Grid>
                                <Grid item xs={12} sm={6} container justify={"flex-end"}>
                                <Button className="btn-submit-non-afb" 
                                                      /* onClick={this.toggle1} */
                                                      style={{borderRadius:20, width:'135px',
                                                      backgroundColor:'red',borderBlockColor:'white'}} > 
                                                 Submit
                                             </Button>
                                   {/*  <Button variant="contained" color="primary"> Submit</Button> */}
                                </Grid>
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
    // }
}
// export default Transfer;
