import React, {Component}from 'react';
import '../../../css/sidebar.css';
import Logo from '../../../Assets/images/logo.svg';
import {Side_bar_data} from './Sidebar_data';
import {NavLink} from 'react-router-dom';
import { connect } from "react-redux";

import Skeleton from '@material-ui/lab/Skeleton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide'

import {
    fetchAgentProfile,
    fetchAgentWallet,
    fetchAgentBankAccounts
  } from "../../../../src/services/agent/action";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Sidebar extends Component{
    state ={
        submenu:false,
        subMenu2:false,
        role:"Merchant",
        sideBarLoadingListLength: 10,
        filteredMenu: [],
        linkingDialogOpen: false,
        linkingDialogTitle: '',
        linkingDialogBody: '',
    }

    componentDidMount() {
        this.setState({filteredMenu: Side_bar_data});
        if(Object.keys(this.props.profile.data).length === 0) {
            this.props.fetchProfile(sessionStorage.getItem("token"));
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.profile.data && nextProps.profile.data.agentType !== 'AGENT_BANKER') {
            this.removeCashDepositAndWithdrawBankLink();
        }
        if(nextProps.profile.data) {
            this.props.fetchAgentWallet(sessionStorage.getItem("token"));
            if(nextProps.profile.data.registrationType === 'EXISTING_BANK_CUSTOMER') {
                this.props.fetchAgentBankAccounts(sessionStorage.getItem("token"), nextProps.profile.data.bankCustomerId);
            }
        }
        if(nextProps.profile.data && nextProps.profile.data.status === 'ACTIVE') {
            this.checkAccountStatus(nextProps.profile.data.agentType, nextProps.profile.data.status);
        }

    }

    componentDidUpdate(prevProps, nextProps) {
    }
    
    removeCashDepositAndWithdrawBankLink = () => {

        var result = Side_bar_data.map((data) => {
            if(data.subMenu) {
                var subMenu = data.subMenu.filter((subMenuOption) => {
                    return (subMenuOption.path !== '/agent/cash_deposit/bank' && subMenuOption.path !== '/agent/cash_withdraw/bank')
                });
                return {
                    ...data,
                    subMenu
                };
            } else {
                return data;
            }
        });
        this.setState({filteredMenu: result});
    }

    toggleLinkingDialog = () => {
        this.setState({ linkingDialogOpen: !this.state.linkingDialogOpen });
    };

    checkAccountStatus = (agentType, status) => {
        switch (status) {
          case 'INACTIVE':
            this.showStatusDialog('Account Inactive',
                'Your account is still in-active please contanct bank administration for more details.');
            break;
    
          case 'SUSPENDED':
            this.showStatusDialog('Account Suspended',
                'Your account has been suspended please contanct bank administration for more details.');
            break;
          case 'AGENT_LINKING_PENDING':
            this.showStatusDialog(
                'Account Linking',
                agentType === 'AGENT_BANKER'
                    ? 'Your account is not active, you need to link your Bank Customer ID.'
                    : 'Your account is not active, you need to link your account to super agent.');
            break;
          case 'AGENT_LINKING_REQUESTED':
            this.showStatusDialog('Account Linking Requested',
                'Your account linking request been sent to the Super Agent after he/she approved the request then you will be able to make any transaction from the system.');
            break;
          case 'AGENT_LINKING_COMPLETED':
            this.showStatusDialog('Account Linking Completed',
                'You account linking process has been completed, please wait for the bank administrator to activate your account.');
            break;
          case 'AGENT_LINKING_REJECTED':
            this.showStatusDialog(
                'Account Linking',
                agentType === "AGENT_BANKER"
                    ? 'Your account is not active, you need to link your Bank Customer ID.'
                    : 'Your account is not active, you need to link your account to super agent.');
            break;
          default:
        }
    }

    showStatusDialog = (title, bodyText) => {
        this.setState({linkingDialogTitle: title, linkingDialogBody: bodyText, linkingDialogOpen: true});
    }

    toggleSubmenu = (id) => {
        this.setState({submenu:id})
    }

    toggleSubmenu2 = () => {
        this.setState(state => ({
            subMenu2: !state.subMenu2
          }));
    }

    renderSideBarLoading = () => {
        return(
            <div className="sideBar">
                <div className="sidebar_Inner">
                    <div className="sideTop">
                        <div className="sideTopLogo">
                            <img src={Logo} alt="" />
                        </div>
                    </div>
                    <div className="navigation">
                        <h2 className="adminiH"> Agent Panel</h2>
                        <div className="nav_inner">
                            <ul>
                                {Side_bar_data.map((item,index)=> {
                                    return (
                                        <li key={index}>
                                            <Skeleton variant="text" width={200} height={50} style={{ margin: '16px', borderRadius:'16px', backgroundColor: 'gray' }}/>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    renderSideBar = () => {
        return (
            <div className="sideBar">
                <div className="sidebar_Inner">
                    <div className="sideTop">
                        <div className="sideTopLogo">
                            <img src={Logo} alt="" />
                        </div>
                    </div>
                    <div className="navigation">
                        <h2 className="adminiH"> Agent Panel</h2>
                        <div className="nav_inner">
                            <ul>
                            
                                {this.state.filteredMenu.map((item,index)=>{
                                    return (
                                        <li key={index}>
                                            <NavLink exact to={item.path} onClick={() => {this.toggleSubmenu(item.id)} }>
                                                <span className={item.iconClass}></span>{item.title}
                                                {item.subMenu && <span className={`icon-Asset-1 arrowOpenClosed ${this.state.submenu === item.id ? "openSubM" : ""}`}></span>}
                                            </NavLink>
                                            {item.subMenu && this.state.submenu === item.id ?
                                                <ul>
                                                    {item.subMenu.map((submenuList)=>{
                                                        return(<li><NavLink exact to={submenuList.path} onClick={submenuList.subMenu && this.toggleSubmenu2}><span className="icon-Asset-48 subMDot"></span> {submenuList.title}</NavLink>

                                                        {
                                                            submenuList.subMenu && this.state.subMenu2 ? 
                                                                <ul className="subNav">
                                                                    <li><h2 className="adminiH subTitleUl" style={{color:"black"}}>General</h2></li>
                                                                    {
                                                                        submenuList.subMenu.map((sub) => {
                                                                            return (
                                                                                <li><NavLink exact to={sub.path}>  <span className={sub.iconClass}></span> {sub.title}</NavLink></li>
                                                                            )
                                                                        })
                                                                    }
                                                                </ul>
                                                            : null
                                                        }
                                                            
                                                        </li>)
                                                    })}
                                                
                                                </ul>
                                            
                                            :null}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return <>
            {this.props.profile.loading ? this.renderSideBarLoading() : this.renderSideBar()}
            <Button variant="outlined" color="primary" onClick={this.toggleLinkingDialog}>
                Slide in alert dialog
            </Button>
            <Dialog
                open={this.state.linkingDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={this.toggleLinkingDialog}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogTitle id="alert-dialog-slide-title">
                    {this.state.linkingDialogTitle}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                    {this.state.linkingDialogBody}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.toggleLinkingDialog} style={{ color: '#DA4139' }}>
                        I Understand
                    </Button>
                </DialogActions>
            </Dialog>
        </>   
    }
}

const mapStateToProps = ({ agentReducer }) => {
    const {
    profile,
    } = agentReducer;

    return {
    profile
    };
};

const mapDispatchToProps = (dispatch) => ({
    fetchProfile: (token) => dispatch(fetchAgentProfile(token)),
    fetchAgentWallet: (token) => dispatch(fetchAgentWallet(token)),
    fetchAgentBankAccounts: (token, bankCustomerId) => dispatch(fetchAgentBankAccounts(token, bankCustomerId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);