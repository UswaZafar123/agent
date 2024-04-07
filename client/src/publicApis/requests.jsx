import axiosInstance from "./requestBuilder";
import URL from "../Assets/config";

export const walletAccountResendPin = (data) => {
  return axiosInstance.post(URL.agent.WALLET_ACCOUNT_PIN_VERIFICATION, data);
};

export const walletAccountPinVerification = (data) => {
  return axiosInstance.post(URL.agent.WALLET_ACCOUNT_PIN_VERIFICATION, data);
};
