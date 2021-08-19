import React, {Component} from 'react';
import '../../css/transfer.css';
import '../../css/banking_operattion.css';

import Highcharts from 'highcharts';
import variablePie from "highcharts/modules/variable-pie.js";
import HighchartsReact from 'highcharts-react-official';

import ReactHighcharts from 'react-highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import highcharts3d from 'highcharts/highcharts-3d';
import ProgressBar from "@ramonak/react-progress-bar";
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from '@material-ui/core/Button';

import {Select, DatePicker} from 'antd';
import moment from 'moment';
import Sidebar from "../Agent/sidebar/Sidebar";
import Logo from "../../Assets/images/logo.svg";
import {Side_bar_data} from "../Agent/sidebar/Sidebar_data";
import {NavLink} from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import success from '../../Assets/images/confirm.svg';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import {Card} from "reactstrap";

const dateFormat = 'YYYY/MM/DD';
// const customFormat = value => `custom format: ${value.format(dateFormat)}`;
const {Option} = Select;

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


export default function Transfer() {

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


    return (
        <div className="main_contain">

            <div className="left_wrapper">
                {/*<div className="sideBar">*/}
                <div className={classes.root}>
                    <Paper>
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem>
                                <ListItemText primary="Transfer"/>
                            </ListItem>
                            <Divider/>
                            <ListItemLink href="#simple-list" button selected={selectedIndex === 0}
                                          onClick={(event) => handleListItemClick(event, 0)}>
                                <ListItemText secondary="Account To Account"/>
                            </ListItemLink>
                            <Divider/>
                            <ListItemLink href="#simple-list" button selected={selectedIndex === 1}
                                          onClick={(event) => handleListItemClick(event, 1)}>
                                <ListItemText secondary="Account To Wallet"/>
                            </ListItemLink>
                        </List>
                    </Paper>
                </div>


                {/*</div>*/}
            </div>


            <div className="right_wrapper">

                {selectedIndex === 0 ? <div className="section_custom">
                    <div className="sectionInn">
                        <div className="chartCard_w m_r100 getHeight">
                            <div className="chartCardTop">
                                <div className="flCenterColumn">
                                    <h1 className="commonHeading textAlignCenter">Account to Account</h1>
                                </div>
                            </div>
                            <div className="chartCardMiddle">
                                <div className="recentTrans_w2">
                                    <Grid container spacing={6} container justify={"center"}>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> From Account </Typography>
                                            <TextField
                                                select
                                                label="Select"
                                                value={account}
                                                onChange={handleChange2}
                                                fullWidth
                                                helperText="Please select your account"

                                            >
                                                {accounts.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> To Account </Typography>
                                            <TextField
                                                select
                                                label="Select"
                                                value={account}
                                                onChange={handleChange2}
                                                fullWidth
                                                helperText="Please select your account"

                                            >
                                                {accounts.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Amount </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Amount"

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Bank Code </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Bank Code"

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
                                            <Typography variant="h6"> Key </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Key"

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

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Reason </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Reason of Transaction"

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} container justify={"flex-start"}>

                                            <Button variant="contained" color="secondary"> Back</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6} container justify={"flex-end"}>

                                            <Button variant="contained" color="primary" onClick={(event) => handleListItemClick(event, 2)}> Submit</Button>
                                        </Grid>
                                    </Grid>
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
                                    <h1 className="commonHeading textAlignCenter">Account to Wallet</h1>
                                </div>
                            </div>
                            <div className="chartCardMiddle">
                                <div className="recentTrans_w2">
                                    <Grid container spacing={6} container justify={"center"}>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> From Account </Typography>
                                            <TextField
                                                select
                                                label="Select"
                                                value={account}
                                                onChange={handleChange2}
                                                fullWidth
                                                helperText="Please select your account"

                                            >
                                                {accounts.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> To Account </Typography>
                                            <TextField
                                                select
                                                label="Select"
                                                value={account}
                                                onChange={handleChange2}
                                                fullWidth
                                                helperText="Please select your account"

                                            >
                                                {accounts.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Amount </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Amount"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Reason </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Reason of Transaction"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={6} container justify={"flex-start"}>

                                            <Button variant="contained" color="secondary"> Back</Button>
                                        </Grid>

                                        <Grid item xs={12} sm={6} container justify={"flex-end"}>

                                            <Button variant="contained" color="primary" onClick={(event) => handleListItemClick(event, 2)}> Submit</Button>
                                        </Grid>


                                    </Grid>
                                </div>
                            </div>
                            <div className="cardFooter justify_content_end">

                            </div>
                        </div>
                    </div>
                </div> : null}

                {selectedIndex === 2 ? <div className="section_custom">
                    <div className="sectionInn">
                        <div className="chartCard_w m_r100 getHeight">
                            <div className="chartCardTop">
                                <div className="flCenterColumn">
                                    <h1 className="commonHeading textAlignCenter">Success</h1>
                                </div>
                            </div>
                            <div className="chartCardMiddle">
                                <div className="recentTrans_w2">
                                    <div className="transactioncardmiddle" style={{ height: "800px" }}>
                                        <div className="kyccustomformheading">
                                            <div className="success_pic">
                                                <img src={success} alt="success" />
                                            </div >

                                        </div>
                                        {/*<h1*/}
                                        {/*    className="list_top_heading textAlignCenter text-center">*/}
                                        {/*    Cash Deposit Successful*/}
                                        {/*</h1>*/}

                                        <h1  className="success_header">
                                            Cash Deposit Successful
                                        </h1>
                                        <Card  className="success_card">
                                            <ListItem button  style={{ height: "70px" }}>
                                                <ListItemText className="success_text" primary="Date:     03-03-2021   3:00PM"
                                                    // secondary={ this.state.date}
                                                />

                                            </ListItem>

                                            <Divider />
                                            <ListItem  divider  style={{ height: "70px" }}>
                                                <ListItemText primary="Account Number:      12221-12221-122212212221-22"

                                                              // secondary={ this.state.accountNumber}
                                                />
                                            </ListItem>
                                            <ListItem style={{ height: "70px" }}>
                                                <ListItemText primary="Amount      $1000"
                                                    // secondary={ this.state.amount
                                                />
                                            </ListItem>
                                            <Divider light />
                                            <ListItem  style={{ height: "70px" }}>
                                                <ListItemText primary="Fees      $20"
                                                    // secondary={ this.state.fees}
                                                />
                                            </ListItem>
                                            <Divider light />
                                            <ListItem  style={{ height: "70px" }}>
                                                <ListItemText primary="Total        $1200"
                                                    //secondary={ this.state.total}
                                                />
                                            </ListItem>
                                            <Divider light />
                                            <ListItem  style={{ height: "70px" }}>
                                                <ListItemText primary="Reason:         Test"
                                                    // secondary={ this.state.reason}
                                                />
                                            </ListItem>
                                            <Divider light />
                                            <ListItem  style={{ height: "70px" }}>

                                            </ListItem>


                                            <ListItem  style={{ height: "70px" }}>
                                                <button className="btn_print">Print</button>
                                                <button className="btn_done">Done</button>

                                            </ListItem>

                                        </Card>


                                    </div>
                                </div>
                            </div>
                            <div className="cardFooter justify_content_end">

                            </div>
                        </div>
                    </div>
                </div> : null}

            </div>

        </div>
    );
    // }
}
// export default Transfer;
