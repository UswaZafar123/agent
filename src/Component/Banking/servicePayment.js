import React, {useState} from 'react';
import '../../css/transfer.css';
import '../../css/banking_operattion.css';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import {Select} from 'antd';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {MenuItem} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import {Modal, ModalHeader, ModalBody, ModalFooter, Card} from 'reactstrap';
import success from "../../Assets/images/confirm.svg";

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
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const useStyles2 = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            color: 'black',
            margin: theme.spacing(1),
            width: theme.spacing(70),
            height: theme.spacing(30),
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


export default function ServicePayment(props) {

    const classes = useStyles();

    const classes2 = useStyles2();

    const [open, setOpen] = React.useState(false);

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

    function createData(name, calories, fat, carbs, protein) {
        return {name, calories, fat, carbs, protein};
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
        createData('Eclair', 262, 16.0, 24, 6.0),
        createData('Cupcake', 305, 3.7, 67, 4.3),
        createData('Gingerbread', 356, 16.0, 49, 3.9),
    ];

    const {
        buttonLabel,
        className
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);


    return (


        <div className="main_contain">


            <div className="left_wrapper">
                <div className={classes.root}>
                    <Paper>
                        <List component="nav" aria-label="secondary mailbox folders">
                            <ListItem>
                                <ListItemText primary="Service Payment"/>
                            </ListItem>
                            <Divider/>
                            <ListItemLink href="#simple-list" button selected={selectedIndex === 0}
                                          onClick={(event) => handleListItemClick(event, 0)}>
                                <ListItemText secondary="Bill Payment"/>
                            </ListItemLink>
                            <Divider/>
                            <ListItemLink href="#simple-list" button selected={selectedIndex === 1}
                                          onClick={(event) => handleListItemClick(event, 1)}>
                                <ListItemText secondary="Tax Payment"/>
                            </ListItemLink>
                            <ListItemLink href="#simple-list" button selected={selectedIndex === 2}
                                          onClick={(event) => handleListItemClick(event, 2)}>
                                <ListItemText secondary="School Fees"/>
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
                                    <h1 className="commonHeading textAlignCenter">Bill Payment</h1>
                                </div>
                            </div>
                            <div className="chartCardMiddle">
                                <div className="recentTrans_w2">
                                    <Grid container spacing={6} container justify={"center"}>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Company </Typography>
                                            <TextField
                                                select
                                                label="Account 1"
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
                                            <Typography variant="h6"> ID Number </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Id Number"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Company Bill</Typography>
                                            <TextField
                                                select
                                                label="Account 1"
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
                                            <Typography variant="h6"> Reason </Typography>
                                            <TextField
                                                type="file"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Reason"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10} container justify={"center"}>

                                            <Button variant="contained" color="secondary"> View Bill</Button>
                                        </Grid>

                                        <Grid item xs={12} sm={6} container justify={"flex-start"}>

                                            <Button variant="contained" color="secondary"> Back</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6} container justify={"flex-end"}>

                                            <Button variant="contained" color="primary" onClick={(event) => handleListItemClick(event, 5)}> Submit</Button>
                                        </Grid>


                                    </Grid>
                                </div>
                            </div>
                            <div className="cardFooter justify_content_end">
                                <div className="allTic">
                                    <h3>All Tickets</h3>
                                    <span className="icon-Asset-1"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> : null}

                {selectedIndex === 1 ? <div className="section_custom">
                    <div className="sectionInn">
                        <div className="chartCard_w m_r100 getHeight">
                            <div className="chartCardTop">
                                <div className="flCenterColumn">
                                    <h1 className="commonHeading textAlignCenter">Tax Payment</h1>
                                </div>
                            </div>
                            <div className="chartCardMiddle">
                                <div className="recentTrans_w2">
                                    <Grid container spacing={6} container justify={"center"}>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Tax Company </Typography>
                                            <TextField
                                                select
                                                // label="Account 1"
                                                value={account}
                                                onChange={handleChange2}
                                                fullWidth

                                            >
                                                {accounts.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> ID Number </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Id Number"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Tax Invoice </Typography>
                                            <TextField
                                                type="file"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Reason"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10} container justify={"center"}>

                                            <Button variant="contained" color="secondary"> View Bill</Button>
                                        </Grid>

                                        <Grid item xs={12} sm={6} container justify={"flex-start"}>

                                            <Button variant="contained" color="secondary"> Back</Button>
                                        </Grid>
                                        <Grid item xs={12} sm={6} container justify={"flex-end"}>

                                            <Button variant="contained" color="primary"
                                                    onClick={(event) => handleListItemClick(event, 5)}> Submit</Button>

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
                                    <h1 className="commonHeading textAlignCenter">School Fee</h1>
                                </div>
                            </div>
                            <div className="chartCardMiddle">
                                <div className="recentTrans_w2">


                                    {selectedIndex === 2 ?
                                        <div className="transactioncardmiddle" style={{height: "270px"}}>
                                            <div className="kyccustomformheading">
                                                <h1 className="list_top_heading textAlignCenter text-center">
                                                    Choose Payment Method
                                                </h1>
                                            </div>

                                            <button className="btn_cash_deposit"
                                                    onClick={(event) => handleListItemClick(event, 3)}> Cash Deposit
                                            </button>

                                            <button className="btn_transfer_account"
                                                    onClick={(event) => handleListItemClick(event, 4)}>Transfer
                                                Account/wallet
                                            </button>

                                        </div>
                                        : null}

                                </div>
                            </div>
                            <div className="cardFooter justify_content_end">

                            </div>
                        </div>
                    </div>
                </div> : null}

                {selectedIndex === 3 ? <div className="section_custom">
                    <div className="sectionInn">
                        <div className="chartCard_w m_r100 getHeight">
                            <div className="chartCardTop">
                                <div className="flCenterColumn">
                                    <h1 className="commonHeading textAlignCenter">Cash Deposit</h1>
                                </div>
                            </div>
                            <div className="chartCardMiddle">
                                <div className="recentTrans_w2">


                                    <Grid container spacing={6} container justify={"center"}>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Student Name </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Student Name"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Depositer Name </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Depositer Name"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Depositer phone number </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="1342-5424668878"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> School fee </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="$500"

                                            />
                                        </Grid>

                                    </Grid>

                                </div>
                            </div>
                            <div className="cardFooter justify_content_end">
                                {/*<div className="allTic">*/}
                                <Grid item xs={12} sm={6} container justify={"flex-start"}>

                                    <Button variant="contained" color="secondary"> Back</Button>
                                </Grid>
                                <Grid item xs={12} sm={6} container justify={"flex-end"}>

                                    <Button variant="contained" color="primary" onClick={(event) => handleListItemClick(event, 5)}> Submit</Button>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div> : null}


                {selectedIndex === 4 ? <div className="section_custom">
                    <div className="sectionInn">
                        <div className="chartCard_w m_r100 getHeight">
                            <div className="chartCardTop">
                                <div className="flCenterColumn">
                                    <h1 className="commonHeading textAlignCenter">Transfer Account/Wallet</h1>
                                </div>
                            </div>
                            <div className="chartCardMiddle">
                                <div className="recentTrans_w2">


                                    <Grid container spacing={6} container justify={"center"}>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Institution Name </Typography>
                                            <TextField
                                                select
                                                label="Select"
                                                value={account}
                                                onChange={handleChange2}
                                                fullWidth
                                                helperText="Please select your institution"

                                            >
                                                {accounts.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        </Grid>


                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Student Name </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Student Name"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Depositer Name </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="Depositer Name"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> Depositer phone number </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="1342-5424668878"

                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={10}>
                                            <Typography variant="h6"> School fee </Typography>
                                            <TextField
                                                type="text"
                                                required
                                                name="fromaccount"
                                                fullWidth
                                                placeholder="$500"

                                            />
                                        </Grid>

                                    </Grid>

                                </div>
                            </div>
                            <div className="cardFooter justify_content_end">
                                {/*<div className="allTic">*/}
                                <Grid item xs={12} sm={6} container justify={"flex-start"}>

                                    <Button variant="contained" color="secondary"> Back</Button>
                                </Grid>
                                <Grid item xs={12} sm={6} container justify={"flex-end"}>

                                    <Button variant="contained" color="primary" onClick={(event) => handleListItemClick(event, 5)}> Submit</Button>
                                </Grid>
                            </div>
                        </div>
                    </div>
                </div> : null}


                {selectedIndex === 5 ? <div className="section_custom">
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
