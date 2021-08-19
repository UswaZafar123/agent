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



export default function AccountStatement () {

    const classes = useStyles();

    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const [account, setAccount] = React.useState('EUR');

    const [currency, setCurrency] = React.useState('EUR');


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
                                <h1 className="commonHeading textAlignCenter">Account Statement</h1>
                            </div>
                        </div>
                        <div className="chartCardMiddle">
                            <div className="recentTrans_w2">
                                {selectedIndex === 0 ? <div className="transactioncardmiddle" style={{height: "270px"}}>
                                    <div className="kyccustomformheading">
                                        <h1 className="list_top_heading textAlignCenter text-center">
                                            Select One Option to send Balance Details Via
                                        </h1>
                                    </div>


                                    <button className="btn_email"
                                            onClick={(event) => handleListItemClick(event, 1)}>Email
                                    </button>
                                    <button className="btn_sms" onClick={(event) => handleListItemClick(event, 2)}>SMS
                                    </button>
                                    <button className="btn_both"
                                            onClick={(event) => handleListItemClick(event, 3)}>Both
                                    </button>


                                </div> : null}

                                {selectedIndex === 1 ? <Grid container spacing={6} container justify={"center"}>

                                    <Grid item xs={12} sm={10} container justify={"center"}>
                                        <Typography variant="h6"> Send statement details via Email </Typography>

                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Bank Account </Typography>
                                        <TextField
                                            select
                                            label="Select"
                                            value={account}
                                            onChange={handleChange2}
                                            fullWidth
                                            helperText="Select a bank account"

                                        >
                                            {accounts.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> Start Date </Typography>
                                        <TextField
                                            required
                                            id="city"
                                            name="city"
                                            type="date"
                                            placeholder="Start Date"
                                            fullWidth

                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={10}>
                                        <Typography variant="h6"> End Date </Typography>
                                        <TextField
                                            required
                                            id="city"
                                            name="city"
                                            type="date"
                                            placeholder="End Date"
                                            fullWidth

                                        />
                                    </Grid>

                                    <Grid item xs={22} sm={6} container justify={"center"}>

                                        <Button variant="contained" color="secondary"> Continue</Button>
                                    </Grid>

                                </Grid> : null}
                            </div>
                        </div>
                        <div className="cardFooter justify_content_end">
                            {/* <div className="allTic">
                                    <h3>All Tickets</h3>
                                    <span className="icon-Asset-1"></span>
                                </div>*/}
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
    // }
}
// export default Transfer;
