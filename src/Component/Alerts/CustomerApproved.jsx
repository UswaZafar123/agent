import React, { useState } from "react";
import IMAGES from "../../Assets/images";

const CustomerApproved = (props) => {
  const onClose = (e) => {
    props.handleCancel(false);
  };

  const [isVisible, setIsVisible] = useState(props.visible);

  return (
    <div className="modal_w">
      <span
        className="icon-Asset-58 closeBtn_custom"
        onClick={(e) => {
          onClose(e);
        }}
      ></span>
      <div className="modal_w_in">
        <div className="confirmImg mB36">
          <img src={IMAGES.activeUser} alt="" />
        </div>
        <h1 className="approvedT">Approved</h1>
        <h2 className="mB36 aryousure">Customer Approved Succesfully</h2>
      </div>
    </div>
  );
};

export default CustomerApproved;
