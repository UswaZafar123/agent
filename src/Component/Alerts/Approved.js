import React, { useState } from 'react';
import { Select,Menu, Dropdown,Modal } from 'antd';
import activeUser from '../../Assets/images/confirm.svg'


const Approved = (props) => {


    const onClose = (e) => {
       props.handleCancel(false);
    }

    const submit=()=>{
       props.approve()
    }
    const [isVisible, setIsVisible] = useState(props.visible);

    return (
            <div className="modal_w">
                <span className="icon-Asset-58 closeBtn_custom" onClick={(e) => {onClose(e)}}></span>
                <div className="modal_w_in">
                <div className="confirmImg mB36">
                    <img src={activeUser} alt="" />
                </div>
                <h1 className="approvedT">Approve The Merchant </h1>
                <h2 className="mB36 aryousure">Are You Sure </h2>
                <div className="confirm_p_w mT24">
              <button className="aryousureBTN" onClick={(e) => {onClose(e)}} >Close</button>
              <button className="aryousureBTN confirmBtnR" onClick={submit}>Submit</button>
            </div>
               
                </div>
            </div>
    );
}

export default Approved;