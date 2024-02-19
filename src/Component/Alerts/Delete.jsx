import React from "react";
import IMAGES from "../../Assets/images";

const Delete = (props) => {
  const onCloseHandler = (e) => {
    props.handleCancel(false);
  };

  const onYesHandlder = (e) => {
    props.handleYes(false);
  };

  return (
    <div className="modal_w">
      <span
        className="icon-Asset-58 closeBtn_custom"
        onClick={(e) => {
          onCloseHandler(e);
        }}
      ></span>
      <div className="modal_w_in">
        <div className="confirmImg mB36">
          <img src={IMAGES.DeleteIcon} alt="" />
        </div>
        <h2 className="mB36 aryousure">Are you sure you want to delete?</h2>
        <div className="confirm_p_w mT24">
          <button
            className="aryousureBTN"
            onClick={(e) => {
              onCloseHandler(e);
            }}
          >
            No
          </button>
          <button
            className="aryousureBTN confirmBtnR"
            onClick={(e) => {
              onYesHandlder(e);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delete;
