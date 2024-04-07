import React, { Component, Fragment,useState } from "react";
import { Select,Menu, Dropdown,Modal } from 'antd';
import NavBar from "./register/NavBar";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";


const Success = (props) => {

    const [email, setEmail] = useState(0);
    const location = useLocation();

    // const gotoLoginPage = () => {
    //     props.history.push("/customer/login");
    // }

    useEffect(() => {
        setEmail(location.state.email);
     }, [location])

    return (
        <Fragment>
        <section className="loginWrapper accountWrapper">
         <NavBar/>

            <div className="col-md-12 loginContainer">
            <div className="loginInner" >
            <div className="modal_w">
            <div className="modal_w_in">
                <h2 className="mB36 aryousure">Thankyou for the Registration.</h2>
                <p>please click the verification link send to you email.</p>
                <p>{email}</p>
                <div className="confirm_p_w mT24" style={{justifyContent:"center"}}>
                <button className="aryousureBTN confirmBtnR" >OKAY</button>
                </div>
            </div>
            </div>
            </div>
        </div>
        </section>
      </Fragment>

    );
}

export default Success;