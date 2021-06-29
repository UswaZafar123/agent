import React, { useState } from 'react';
import { Select,Menu, Dropdown,Modal } from 'antd';
import activeUser from '../../Assets/images/confirm.svg'



const Reject = (props) => {

    const onCloseHandler = (e) => {
        props.handleCancel(false);
    }


    const submit=()=>{
      props.reject(value)

    }

   const populate=(e)=>{
    setValue(e.target.value)
   }
    
    const [isVisible, setIsVisible] = useState(props.visible);
    const [value, setValue] = useState("")

    return (
        <div className="modal_w">
          <div className="modal_w_in">
            <h2 className="mB36 aryousure">Reason Of Rejection</h2>
            <div className="reasonRejectText">
              <textarea rows="4" cols="50" onChange={populate} />
            </div>
            <div className="confirm_p_w mT24">
              <button className="aryousureBTN"  onClick={(e) => {onCloseHandler(e)}} >Close</button>
              <button className="aryousureBTN confirmBtnR"  onClick={submit}>Submit</button>
            </div>
          </div>
        </div>
    );
}

export default Reject;