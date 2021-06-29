import React, { Component, Fragment } from "react";
import { FormattedMessage, useIntl, injectIntl } from 'react-intl'

const validate = (fieldName, value, value2) => {
  let errorValid;
  let errorMessage;
  let errorMessageTwo;
  let validData;
  switch (fieldName) {




    case "host":
    case "roledescription":
    case "city":
    case "state":
    case "country":
    case "address":
    case "description":
      errorValid =
        value.length >= 3 && value.length <= 15
      errorMessage = errorValid
        ? ""
        : <FormattedMessage id='Validation.valid' /> + fieldName
      validData = {
        errorValid,
        errorMessage
      }
      return validData;

    case "titleName":
    case "fullName":
    case "userName":
    case "lastName":
    case "name":
    case "fromName":
    case "longName":
    case "rolename":
    case "contactName":
    case "merchantName":
    case "roleName":
    case "displayname":
      errorValid =
        value.length >= 3 && value.length <= 20
      errorMessage = errorValid
        ? ""
        : <FormattedMessage id='Validation.2to20' />
      validData = {
        errorValid,
        errorMessage
      }
      return validData;




    case "username":
    case "fromAddress":
    case "email":
      errorValid = value.match(
        /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/
      );
      errorMessage = errorValid
        ? ""
        : <FormattedMessage id='Validation.validEmail' />;
      validData = {
        errorValid,
        errorMessage
      }
      return validData;
    case "loginPassword":
    case "password":
      errorValid =
        value.length >= 8 &&
        value.match(
          /(?=.*[_!@#$%^&*-])(?=.*\d)(?!.*[.\n])(?=.*[a-z])(?=.*[A-Z])^.{8,}$/
        );
      errorMessage = errorValid
        ? ""
        : fieldName === "password" ? <FormattedMessage id='Validation.minMaxCharacters' /> : fieldName === "loginPassword" ? <FormattedMessage id='Validation.incorrectPass' />  : ""
      if (value !== value2) {
        if (value2 !== "") {
          errorMessageTwo = <FormattedMessage id='Validation.incorrectPass' />
        } else {
          errorMessageTwo = ""
        }
      } else {
        errorMessageTwo = ""
      }
      validData = {
        errorValid,
        errorMessage,
        errorMessageTwo
      }
      return validData;

    case "confirmPassword":
      if (value !== value2) {
        if (value2 !== "") {
          errorMessage = <FormattedMessage id='Validation.passDontMatch' />
          errorValid = false
        } else {
          errorMessage = ""
          errorValid = false
        }
      } else {
        errorMessage = ""
        errorValid = true
      }
      validData = {
        errorValid,
        errorMessage,
      }
      return validData;

    case "zipcode":
      errorValid =
        value.length < 10
      errorMessage = errorValid
        ? ""
        : <FormattedMessage id='Validation.validZip' />
      validData = {
        errorValid,
        errorMessage
      }
      return validData;

    case "timePeriod":
      errorValid =
        value < 13
      errorMessage = errorValid
        ? ""
        : <FormattedMessage id='Validation.validTime' />
      validData = {
        errorValid,
        errorMessage
      }
      return validData;
    case "symbol":
      errorValid =
        value.length == 1
      errorMessage = errorValid
        ? ""
        : <FormattedMessage id='Validation.validSymbol' />
      validData = {
        errorValid,
        errorMessage
      }
      return validData;
    case "shortname":
    case "port":
    case "shortName":
    case "iso3":
    case "numcode":
    case "phonecode":
    case "code":
      errorValid =
        value.length > 1 &&
        value.length <= 3
      errorMessage = errorValid
        ? ""
        : <FormattedMessage id='Validation.valid' /> + " " + fieldName
      validData = {
        errorValid,
        errorMessage
      }
      return validData;
    case "google_analytics_tracking_code":
    case "languages":
    case "currency":
    case "currencyName":
    case "google_reCAPTCHA":
    case "defaultValue":
    case "encryption":
    case "driver":
    case "status":
    case "available":
    case "reCaptchaSitekey":
    case "reCaptchaSecretkey":
    case "secret":
    case "defaultNumber":
    case "key":
    case "timeZone":
    case "emailVerification":
    case "phoneVerification":
    case "authentication2Factor":
    case "rowperPage":
    case "dateFormat":
    case "dateSeperetor":
    case "decimalFormat":
    case "moneysymbolPosition":
    case "thousandSeparator":
    case "logo":
    case "favicon":
    case "subscriptionName":
    case "subscriptionAmount":
    case "subscriptionDays":
    case "subscriptionStatus":
    case "typeofChannels":
    case "numberofTransaction":
    case "settlementPeriod":
    case "invoicePeriod":
    case "typeofPayment":
    case "typeofIntegration":
    case "setupFee":
    case "minimumUsefee":
    case "statementFee":
    case "discountRatefee":
    case "batchFee":
    case "addonModulesFee":
    case "transactionFee":
    case "gatewayFee":
    case "shoppingcardAllowance":
    case "ancillariesAllowance":
    case "paymaillinkRequest":
    case "mtn":
    case "orange":
    case "eumomo":
    case "client":
    case "mobileno":
    case "nameoforganization":
    case "registereddate":
    case "traderegisternumber":
    case "taxnumber":
    case "taxpayernumber":
    case "identification":
    case "number":
    case "dateofdelivery":
    case "stateofdelivery":
    case "endofvaliditydate":
    case "rate":
    case "amount":
    case "message":
    case "twoFactorCode":
      errorValid = value.trim() !== "" && value !== null && value.trim().length !== 0 ? true : false
      console.log("value", value, "errorvalid", errorValid)

      errorMessage = errorValid
        ? ""
        : <FormattedMessage id='Validation.validData' />
      validData = {
        errorValid,
        errorMessage
      }
      return validData;

    case "contactNumber":
    case "mobile":
      errorValid = value.length >= 10 && value.length < 13
      errorMessage = errorValid
        ? ""
        : <FormattedMessage id='Validation.validNumber' />;
      validData = {
        errorValid,
        errorMessage
      }
      return validData;

    case "facebook":
    case "googleplus":
    case "instagram":
    case "twitter":
    case "pinterest":
    case "youtube":
    case "merchantSiteId":
    case "url":
      errorValid =
        value.length >= 8 &&
        value.match(
          /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
        );
      errorMessage = errorValid
        ? ""
        : <FormattedMessage id='Validation.validData' />;
      validData = {
        errorValid,
        errorMessage
      }
      return validData;

    case "phoneNumber":
      errorValid = value.length === 10 && value.match(/^[0-9]*\.?[0-9]*$/);
      errorMessage = errorValid
        ? ""
        : <FormattedMessage id="error.phone.length" />;
      validData = {
        errorValid,
        errorMessage
      }
      return validData;

    default:
      break;

  }

}

export default validate