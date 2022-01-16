import React, { useState } from "react";
import "./Assets/icomoon/style.css";
import "antd/dist/antd.css";
import Sidebar from "./Component/Agent/sidebar/Sidebar";
import Header from "./Component/Layout/Header";
import logoBg from "./Assets/images/bgLogowater.svg";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AgentRouting from "./Component/Agent/agentRouting";
import Dashboard from "./Component/Agent/dashboard";
//Cash Deposit/Withdraw imports
import WalletCashDeposit from "./Component/page/CashDeposit/WalletCashDeposit";
import BankCashDeposit from "./Component/page/CashDeposit/BankCashDeposit";
import WalletCashWithdraw from "./Component/page/cashWithdraw/WalletCashWithdraw";
import BankCashWithdraw from "./Component/page/cashWithdraw/BankCashWithdraw";
import CashIn from "./Component/page/CashIn/CashIn";
import CashOut from "./Component/page/CashOut/CashOut";
import AgentSendMoney from "./Component/page/AgentSendMoney/AgentSendMoney";
//End Deposit/Withdraw imports

import Transaction from "./Component/Agent/Transaction";
import AccessHistory from "./Component/AccessHistory/accessHistory";
import Ticket from "./Component/Agent/Ticket";
import AddTicket from "./Component/Agent/AddTicket";
import Login from "./Component/Agent/login";
import WalletTransfer from "./Component/Agent/walletOperation/transfert";
import WalletToAccount3 from "./Component/Agent/walletOperation/WalletToAccount3";
import WalletToAccount2 from "./Component/Agent/walletOperation/WalletToAccount2";
import WalletToAccount1 from "./Component/Agent/walletOperation/WalletToAccount1";
import WalletToWallet from "./Component/Agent/walletOperation/WalletToWallet";
import WalletToWallet2 from "./Component/Agent/walletOperation/WalletToWallet2";
import WalletAccountBalance from "./Component/Agent/walletOperation/AccountBalance";
import WalletAccountStatement from "./Component/Agent/walletOperation/AccountStatement";
//import ServicePayment from "./Component/Agent/walletOperation/ServicePayment";
import TaxPayment from "./Component/Agent/walletOperation/TaxPayment";
import TaxPaymentResum from "./Component/Agent/walletOperation/TaxPaymentResum";
import CashWalletAccount from "./Component/Agent/walletOperation/CashWalletAccount";
import CashDepositWalletAccount from "./Component/Agent/walletOperation/CashDepositWalletAccount";
import BillPayment from "./Component/Agent/walletOperation/BillPayment";
import BillPaymentResum from "./Component/Agent/walletOperation/BillPaymentResum";
import SchoolFeesMethod from "./Component/Agent/walletOperation/schoolFeesMethod";
import SchoolFeesCashDeposit from "./Component/Agent/walletOperation/SchoolFeesCashDeposit";
import SchoolFeesTransferAccountWallet from "./Component/Agent/walletOperation/SchoolFeesTransferAccountWallet";
import AccountLinking from "./Component/Agent/linking/linkAccount.js";
import AccountVerification from "./Component/Agent/linking/linkingVerification.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import SendMoney from "./Component/page/FlashTransfer/Send_Money/sendMoney";
import ReceiveMoney from "./Component/page/FlashTransfer/Recive_Money/reciveMoney";
import SendFeels from "./Component/page/FlashTransfer/Send_Money/sendMoney";
import TaxationProof from "./Component/page/kyc/taxationProof";
import LoanApplication from "./Component/page/Loan_Application/loanApplication";

import Transfer from "./Component/Banking/transfer";
import BankAccountBalance from "./Component/Banking/accountBalance";
import BankAccountStatement from "./Component/Banking/accountStatement";
import CashDeposit from "./Component/Banking/cashDeposit";
import CashWithdrawal from "./Component/Banking/cashWithdrawal";
import ServicePayment from "./Component/Banking/servicePayment";

import WalletAccountOpening from "./Component/CustomerRegistration/walletAccountOpening";
import AfbCustomer from "./Component/CustomerRegistration/AfbCustomer";
import NonAfbCustomer from "./Component/CustomerRegistration/nonAfbCustomer";
import BankingOpeningAccount from "./Component/CustomerRegistration/BankingAccountOpening";
import nonAfbCustomer from "./Component/CustomerRegistration/nonAfbCustomer";
import walletAccountOpening from "./Component/CustomerRegistration/walletAccountOpening";
import SendMoney1 from "./Component/page/FlashTransfer/Send_Money/sendMoney1";
import ReciveMoney1 from "./Component/page/FlashTransfer/Recive_Money/reciveMoney1";
import ReciveMoney2 from "./Component/page/FlashTransfer/Recive_Money/reciveMoney2";
import CashDeposit1 from "./Component/page/FlashTransfer/Send_Money/cashDeposit";
import sendMoney from "./Component/page/FlashTransfer/Send_Money/sendMoney";
import succesSendMoney from "./Component/page/FlashTransfer/Send_Money/succesSendMoney";
import ReciveMoney from "./Component/page/FlashTransfer/Recive_Money/reciveMoney";

import AgentRegister from "./Component/common/register/AgentRegister";

import Registration from "./Component/Agent/AgentRegistration/AgentRegistration";
import AgentOTP from "./Component/Agent/AgentRegistration/AgentOTPScreen";
import AgentMemberOTP from "./Component/Agent/AgentRegistration/AgentMemeberOTPScreen";

import ChooseRegistrationAccount from "./Component/ChooseRegistrationAccount";
import AgentRegSuccess from "./Component/Agent/AgentRegistration/AgentRegSuccess";
// Setting Component Import
import Packages from "./Component/page/Settings/General/Packages";
import addPackages from "./Component/page/Settings/General/addPackages";
import editPackages from "./Component/page/Settings/General/editPackages";
import RoleManagement from "./Component/page/Settings/General/RoleManagement";
import AgentMember from "./Component/page/Settings/AgentMember";
import CommissionsManagement from "./Component/page/Settings/CommissionsManagement";

// Profile Component Import
import Profile from "./Component/page/Profile/Profile";
import Accounts from "./Component/page/Profile/Accounts";
import qrCode from "./Component/page/Profile/QRCode";
import ChangePassword from "./Component/page/Profile/ChangePassword";
import LinkToBankAccount from "./Component/Agent/linking/linkAccount";
import AgentAccountLinking from "./Component/page/AccountLinking/agentAccountLinking";
import ValidateSuperAgentId from "./Component/page/AccountLinking/validateSuperAgentId";

// Cash Operations Component Import
import CashOperations from "./Component/page/Cash Operations/CashOperations";
import ticketReply from "./Component/Agent/ticketReply";
import Assets from "./Component/Agent/assets";
import ForgotPassword from "./Component/Agent/ForgotPassword"
import Operations from "./Component/Agent/Operations";
import Users from "./Component/page/Settings/General/Users";
import AgentSendMoneyToAgentMember from "./Component/page/AgentSendMoney/AgentSendMoneyToAgentMember";

export const App = (props) => {
  const [toggleMenuVar, setToggleMenuVar] = useState(false)

  const toggleMenu = (booleanVal) => {
    setToggleMenuVar(booleanVal)
  };



  return (
    <>
      {/* Switch Case */}
      <Switch>
        <Redirect exact from="/" to="/agent/login" />
        <Route path="/agent/login" component={Login} />
        <Route path="/agent/register" component={AgentRegister} />
        <Route path="/agent/registration" component={Registration} />
        <Route exact path="/agent/otp-verification" component={AgentOTP} />
        <Route path="/agent/registrationSuccess" component={AgentRegSuccess} />
        <Route path="/agent/forgotPassword" component={ForgotPassword} />
      </Switch>
      {sessionStorage.getItem("token") &&
        window.location.pathname !== "/agent/login" && (
          <div
            className={
              toggleMenuVar
                ? "app_wrapper"
                : "app_wrapper responsiveParents"
            }
          >
            <div className="left_wrapper">
              <Sidebar
                toggleHandler={toggleMenu}
                isOpenLeftSide={toggleMenuVar}
              />
            </div>

            <div className="right_wrapper">
              <Header toggleHandler01={toggleMenu} />
              <div className="main_wrapper">
                <div
                  className="main_wr_in"
                  style={{
                    backgroundImage: `url(${logoBg})`,
                    backgroundSize: `calc(94vw - 500px)`,
                    backgroundPosition: `center 250px`,
                    minHeight: `100vh`,
                    backgroundRepeat: `no-repeat`,
                    width: `100%`,
                    backgroundAttachment: ``,
                  }}
                >
                  <Switch>
                    <Redirect exact from="/agent" to="/agent/dashboard" />
                    <Route
                      exact
                      path="/agent/dashboard"
                      component={Dashboard}
                    />
                    <Route
                      exact
                      path="/agent/cash_deposit/wallet"
                      component={WalletCashDeposit}
                    />
                    <Route
                      exact
                      path="/agent/cash_deposit/bank"
                      component={BankCashDeposit}
                    />
                    <Route
                      exact
                      path="/agent/cash_withdraw/wallet"
                      component={WalletCashWithdraw}
                    />
                    <Route
                      exact
                      path="/agent/cash_withdraw/bank"
                      component={BankCashWithdraw}
                    />
                    <Route exact path="/agent/cash_in" component={CashIn} />
                    <Route exact path="/agent/cash_out" component={CashOut} />
                    <Route
                      exact
                      path="/agent/send-money"
                      component={AgentSendMoney}
                    />
                    <Route
                      exact
                      path="/agent/send-money-agentMember"
                      component={AgentSendMoneyToAgentMember}
                    />

                    <Route
                      exact
                      path="/agentMemeber/OTP"
                      component={AgentMemberOTP}
                    />

                    <Route
                      path="/agent/walletOperation/transfert"
                      component={WalletTransfer}
                    />

                    <Route path="/agent/assets" component={Assets} />

                    <Route path="/agent/operations" component={Operations} />

                    <Route
                      path="/agent/walletOperation/WalletToAccount1"
                      component={WalletToAccount1}
                    />

                    <Route path="/tickets/reply" component={ticketReply} />

                    <Route
                      path="/agent/walletOperation/WalletToAccount2"
                      component={WalletToAccount2}
                    />
                    <Route
                      path="/agent/walletOperation/WalletToAccount3"
                      component={WalletToAccount3}
                    />
                    <Route
                      path="/agent/walletOperation/WalletToWallet"
                      component={WalletToWallet}
                    />
                    <Route
                      path="/agent/walletOperation/WalletToWallet2"
                      component={WalletToWallet2}
                    />

                    <Route
                      path="/agent/walletOperation/AccountBalance"
                      component={WalletAccountBalance}
                    />
                    <Route
                      path="/agent/walletOperation/AccountStatement"
                      component={WalletAccountStatement}
                    />

                    <Route
                      path="/agent/walletOperation/ServicePayment"
                      component={ServicePayment}
                    />
                    <Route
                      path="/agent/walletOperation/TaxPayment"
                      component={TaxPayment}
                    />
                    <Route
                      path="/agent/walletOperation/TaxPaymentResum"
                      component={TaxPaymentResum}
                    />
                    <Route
                      path="/agent/walletOperation/CashWalletAccount"
                      component={CashWalletAccount}
                    />
                    <Route
                      path="/agent/walletOperation/CashDepositWalletAccount"
                      component={CashDepositWalletAccount}
                    />
                    <Route
                      path="/agent/walletOperation/BillPayment"
                      component={BillPayment}
                    />
                    <Route
                      path="/agent/walletOperation/BillPaymentResum"
                      component={BillPaymentResum}
                    />
                    <Route
                      path="/agent/walletOperation/SchoolFeesMethod"
                      component={SchoolFeesMethod}
                    />
                    <Route
                      path="/agent/walletOperation/SchoolFeesCashDeposit"
                      component={SchoolFeesCashDeposit}
                    />
                    <Route
                      path="/agent/walletOperation/SchoolFeesTransferAccountWallet"
                      component={SchoolFeesTransferAccountWallet}
                    />
                    <Route
                      path="/Settings/link/bank-account"
                      component={AccountLinking}
                    />

                    <Route
                      path="/Settings/linkingAccount/verification"
                      component={AccountVerification}
                    />
                    <Route
                      path="/agent/walletAccountOpening"
                      component={walletAccountOpening}
                    />
                    <Route path="/agent/afbCustomer" component={AfbCustomer} />
                    <Route
                      path="/agent/nonAfbCustomer"
                      component={nonAfbCustomer}
                    />
                    <Route
                      path="/agent/BankingAccountOpening"
                      component={BankingOpeningAccount}
                    />
                    <Route
                      path="/agent/AccountBalance"
                      component={BankAccountBalance}
                    />

                    <Route path="/Admin/Transfer" component={SendMoney1} />
                    <Route path="/Admin/Transfer0" component={ReciveMoney1} />
                    <Route
                      path="/Admin/ReciveMoney2"
                      component={ReciveMoney2}
                    />
                    <Route path="/Admin/ReciveMoney" component={ReciveMoney} />
                    <Route path="/Admin/Transfer" component={SendFeels} />
                    <Route path="/agent/kyc" component={TaxationProof} />
                    <Route path="/Admin/Loan" component={LoanApplication} />
                    <Route path="/Admin/CashDeposit" component={CashDeposit1} />
                    <Route path="/Admin/sendMoney" component={sendMoney} />
                    <Route
                      path="/Admin/succesSendMoney"
                      component={succesSendMoney}
                    />

                    <Route
                      path="/admin/banking/transfer"
                      component={Transfer}
                    />
                    <Route
                      path="/admin/banking/account_balance"
                      component={BankAccountBalance}
                    />
                    <Route
                      path="/admin/banking/account_statement"
                      component={BankAccountStatement}
                    />
                    <Route
                      path="/admin/banking/cash_deposit_bank"
                      component={CashDeposit}
                    />
                    <Route
                      path="/admin/banking/cash_withdrawal_bank"
                      component={CashWithdrawal}
                    />
                    <Route
                      path="/admin/banking/service_payments"
                      component={ServicePayment}
                    />

                    <Route path="/agent/transcations" component={Transaction} />
                    <Route
                      path="/agent/access-history"
                      component={AccessHistory}
                    />
                    <Route
                      path="/agent/tickets/add-ticket"
                      component={AddTicket}
                    />
                    <Route path="/agent/tickets" component={Ticket} />

                    {/* Setting Routing */}
                    <Route
                      path="/settings/general/package-management"
                      component={Packages}
                    />
                    <Route
                      path="/settings/general/users"
                      component={Users}
                    />

                    <Route
                      path="/settings/general/addpackages"
                      component={addPackages}
                    />
                    <Route
                      path="/settings/editpackages"
                      component={editPackages}
                    />

                    <Route
                      path="/settings/general/roles-management"
                      component={RoleManagement}
                    />
                    <Route
                      path="/settings/agent-member"
                      component={AgentMember}
                    />
                    <Route
                      path="/settings/Commissions-management"
                      component={CommissionsManagement}
                    />
                    {/* Profile Routing */}
                    <Route path="/Profile/Profile" component={Profile} />
                    <Route path="/Profile/Accounts" component={Accounts} />
                    <Route path="/Profile/qr-code" component={qrCode} />
                    <Route
                      path="/Profile/change-password"
                      component={ChangePassword}
                    />
                    <Route
                      exact
                      path="/profile/account/link"
                      component={AgentAccountLinking}
                    />
                    <Route
                      exact
                      path="/profile/account/validate_id"
                      component={ValidateSuperAgentId}
                    />
                    {/* Cash Operations Routing */}
                    <Route
                      path="/agent/cash-operations"
                      component={CashOperations}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

//connect method is used for connecting react and redux //
export default App;
