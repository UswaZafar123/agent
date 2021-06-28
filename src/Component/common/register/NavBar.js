import React, { Component, Fragment } from "react";
import Logo from "../../../Assets/images/logo.png";
import ReactFlagsSelect from 'react-flags-select';

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
        selected:""
    };
  }

  setSelected = (code) => {
    this.setState({selected:code})
  }


  render() {

    return (

        <div className="nav nav-default" style={{position:"fixed !important"}}>
          <div style={{marginBottom:"auto", marginTop:"auto", marginLeft:"2%"}}>
            <img alt="logo" src={Logo}  style={{height:"90px", width:"300px",}} />
          </div>

          <ReactFlagsSelect
            selected={this.state.selected} className="langOption navCountrySelect" 
            onSelect={code => this.setSelected(code)}
          />
          <select className="langOption">
              <option>English</option>
              <option>French</option>
          </select>

          
        </div>
    );
  }
}

// function for mapping redux state values with props //
// const mapStateToProps = ({ commonReducer, adminReducer }) => {



//   return {
//     checkLogin: commonReducer.checkLogin,
//     merchantLoginStatus: commonReducer.merchantLoginStatus,
//     userDetails: commonReducer.userDetails,
//     getGeneralInfoData: adminReducer.getGeneralInfoData,
//     getGeneralInfoStatus: adminReducer.getGeneralInfoStatus,
//     twoFactorVerifyOpen: commonReducer.twoFactorVerifyOpen,
//     twoFactorVerifySuccess: commonReducer.twoFactorVerifySuccess,
//     loginError: sessionStorage.getItem("error")
//   };
// };

//function for maping with dispatched actions with props //
// const mapDispatchToProps = (dispatch) => ({
//   LoginService: (payLoad, accessPayload) =>
//     dispatch(LoginService(payLoad, accessPayload)),
//   getGeneralInfo: (title,token) => dispatch(getGeneralInfo(title,token)),
//   twoFactAuth: (payLoad, accessPayload) =>
//     dispatch(twoFactAuth(payLoad, accessPayload)),
// });

//connect method is used for connecting react and redux //
export default NavBar;
