import React, { useState } from "react";
import { Form, Card, Button } from "react-bootstrap";
import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const CustomerValidationForm = ({ clickAction, handleFormData, values }) => {
  //creating error state for validation
  const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    if (
      validator.isEmpty(values.phoneNumber) ||
      validator.isEmpty(values.idDocumentType) ||
      validator.isEmpty(values.idDocumentNumber)
    ) {
      setError(true);
    } else {
      clickAction();
    }
  };

  return (

    <div className="containerBiaN_form">
        <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
                <label>Phone number <span className="mantdat">*</span></label>
            </div>
            <div className="containerBiaN_f_col width70percent">
                <input placeholder="Enter Phone number" />
            </div>
        </div>
        <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
                <label>Transaction code <span className="mantdat">*</span></label>
            </div>
            <div className="containerBiaN_f_col width70percent">
                <input placeholder="Enter Transaction code" />
            </div>
        </div>
        <div className="containerBiaN_f_row">
            <div className="containerBiaN_f_col width30percent textAlignRight">
                <label>ID Document Number <span className="mantdat">*</span></label>
            </div>
            <div className="containerBiaN_f_col width70percent">
                <input placeholder="Enter ID document number" />
            </div>
        </div>
    </div>
  );
};

export default CustomerValidationForm;