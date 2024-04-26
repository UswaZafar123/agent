import { useEffect, useState } from "react";
import "./Assets/icomoon/style.css";

import Sidebar from "./Component/Agent/sidebar/Sidebar";
import Header from "./Component/Layout/Header";

import { Route, Switch, Redirect } from "react-router-dom";
import Dashboard from "./Component/Agent/dashboard";
//Cash Deposit/Withdraw imports
import WalletCashDeposit from "./Component/page/CashDeposit/WalletCashDeposit";
import BankCashDeposit from "./Component/page/CashDeposit/BankCashDeposit";
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
import AccountLinking from "./Component/Agent/linking/linkAccount";
import AccountVerification from "./Component/Agent/linking/linkingVerification";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import SendFeels from "./Component/page/FlashTransfer/Send_Money/sendMoney";
import TaxationProof from "./Component/page/kyc/taxationProof";
import LoanApplication from "./Component/page/Loan_Application/loanApplication";

import Transfer from "./Component/Banking/transfer";
import BankAccountBalance from "./Component/Banking/accountBalance";
import BankAccountStatement from "./Component/Banking/accountStatement";
import CashDeposit from "./Component/Banking/cashDeposit";
import CashWithdrawal from "./Component/Banking/cashWithdrawal";
import ServicePayment from "./Component/Banking/servicePayment";

import AfbCustomer from "./Component/CustomerRegistration/AfbCustomer";
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

import AgentRegSuccess from "./Component/Agent/AgentRegistration/AgentRegSuccess";
// Setting Component Import
import Packages from "./Component/page/Settings/General/Packages";
import addPackages from "./Component/page/Settings/General/addPackages";
import editPackages from "./Component/page/Settings/General/editPackages";
import RoleManagement from "./Component/page/Settings/General/RoleManagement";
import AgentMember from "./Component/page/Settings/AgentMember";
import CommissionsManagement from "./Component/page/Settings/CommissionsManagement";
import "./Assets/css/style.css";
// Profile Component Import
import Profile from "./Component/page/Profile/Profile";
import Accounts from "./Component/page/Profile/Accounts";
import qrCode from "./Component/page/Profile/QRCode";
import ChangePassword from "./Component/page/Profile/ChangePassword";
import AgentAccountLinking from "./Component/page/AccountLinking/agentAccountLinking";
import ValidateSuperAgentId from "./Component/page/AccountLinking/validateSuperAgentId";

// Cash Operations Component Import
import CashOperations from "./Component/page/Cash Operations/CashOperations";
import ticketReply from "./Component/Agent/ticketReply";
import Assets from "./Component/Agent/assets";
import ForgotPassword from "./Component/Agent/ForgotPassword";
import Operations from "./Component/Agent/Operations";
import Users from "./Component/page/Settings/General/Users";
import AgentSendMoneyToAgentMember from "./Component/page/AgentSendMoney/AgentSendMoneyToAgentMember";
import UpgradeToAgentBanker from "./Component/page/Profile/UpgradeToAgentBanker";
import LinkingRequests from "./Component/page/Profile/LinkingRequests";
import LinkedAgents from "./Component/page/Profile/LinkedAgents";
import AddAccount from "./Component/page/Profile/AddAccount";
import PrivateRoute from "./privateRoute";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import IntraBankTransfer from "./Component/Banking/IntraBankTransfer";
import InterBankTransfer from "./Component/Banking/InterBankTransfer";
import BankToWallet from "./Component/Banking/BankToWallet";
import WalletToBank from "./Component/Banking/WalletToBank";
import BankCustomer from "./Component/page/CustomerActivation/BankCustomer";
import NonBankCustomer from "./Component/page/CustomerActivation/NonBankCustomer";
import FundTransfer from "./Component/Non-SARA/FundTransfer";
import IMAGES from "./Assets/images";

export const App = (props) => {
  const [toggleMenuVar, setToggleMenuVar] = useState(false);
  const [showStatus, setShow] = useState(false);
  const agentLoginStatus = useSelector(
    (data) => data.agentReducer.agentLoginstatus
  );
  const tokenStatus = useSelector((data) => data.agentReducer.tokenStatus);

  let history = useHistory();

  const toggleMenu = (booleanVal) => {
    setToggleMenuVar(booleanVal);
  };

  useEffect(() => {
    if (!tokenStatus) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [tokenStatus]);

  useEffect(() => {
    if (!agentLoginStatus) {
      setShow(false);
      // setShow(true);
      history.push("/agent/login");
    } else {
      setShow(true);
    }
  }, [agentLoginStatus]);

  return (
    <>
      {!showStatus && (
        <Switch>
          {!agentLoginStatus ? (
            <Redirect exact from="/" to="/agent/login" />
          ) : (
            <Redirect exact from="/" to="/agent/dashboard" />
          )}
          <Route path="/agent/login" component={Login} />
          <Route path="/agent/register" component={AgentRegister} />
          <Route path="/agent/registration" component={Registration} />
          <Route exact path="/agent/otp-verification" component={AgentOTP} />
          <Route
            path="/agent/registrationSuccess"
            component={AgentRegSuccess}
          />
          <Route path="/agent/forgotPassword" component={ForgotPassword} />
        </Switch>
      )}
      {showStatus && (
        <div
          className={
            toggleMenuVar ? "app_wrapper" : "app_wrapper responsiveParents"
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
                  backgroundImage: `url(${IMAGES.LOGOWhite})`,
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
                  <PrivateRoute
                    exact
                    path="/agent/dashboard"
                    component={Dashboard}
                  />
                  <PrivateRoute
                    exact
                    path="/agent/cash_deposit/wallet"
                    component={WalletCashDeposit}
                  />
                  <PrivateRoute
                    exact
                    path="/agent/cash_deposit/bank"
                    component={BankCashDeposit}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/banking/intra_bank_transfer"
                    component={IntraBankTransfer}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/banking/inter_bank_transfer"
                    component={InterBankTransfer}
                  />
                  <PrivateRoute
                    exact
                    path="/agent/non-digi-bank/fund-transfer"
                    component={FundTransfer}
                  />
                  <PrivateRoute
                    exact
                    path="/agent/cash_withdraw/bank"
                    component={BankCashWithdraw}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/banking/bank_to_wallet"
                    component={BankToWallet}
                  />
                  <PrivateRoute
                    exact
                    path="/admin/banking/wallet_to_bank"
                    component={WalletToBank}
                  />
                  <PrivateRoute
                    exact
                    path="/agent/customer/bank_customer"
                    component={BankCustomer}
                  />
                  <PrivateRoute
                    exact
                    path="/agent/customer/non_bank_customer"
                    component={NonBankCustomer}
                  />
                  <PrivateRoute
                    exact
                    path="/agent/cash_in"
                    component={CashIn}
                  />
                  <PrivateRoute
                    exact
                    path="/agent/cash_out"
                    component={CashOut}
                  />
                  <PrivateRoute
                    exact
                    path="/agent/send-money"
                    component={AgentSendMoney}
                  />
                  <PrivateRoute
                    exact
                    path="/agent/send-money-agentMember"
                    component={AgentSendMoneyToAgentMember}
                  />

                  <PrivateRoute
                    exact
                    path="/agentMemeber/OTP"
                    component={AgentMemberOTP}
                  />

                  <PrivateRoute
                    path="/agent/walletOperation/transfert"
                    component={WalletTransfer}
                  />

                  <PrivateRoute path="/agent/assets" component={Assets} />

                  <PrivateRoute
                    path="/agent/operations"
                    component={Operations}
                  />

                  <PrivateRoute
                    path="/agent/walletOperation/WalletToAccount1"
                    component={WalletToAccount1}
                  />

                  <PrivateRoute path="/tickets/reply" component={ticketReply} />

                  <PrivateRoute
                    path="/agent/walletOperation/WalletToAccount2"
                    component={WalletToAccount2}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/WalletToAccount3"
                    component={WalletToAccount3}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/WalletToWallet"
                    component={WalletToWallet}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/WalletToWallet2"
                    component={WalletToWallet2}
                  />

                  <PrivateRoute
                    path="/agent/walletOperation/AccountBalance"
                    component={WalletAccountBalance}
                  />
                  <Route
                    path="/agent/walletOperation/AccountStatement"
                    component={WalletAccountStatement}
                  />

                  <PrivateRoute
                    path="/agent/walletOperation/ServicePayment"
                    component={ServicePayment}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/TaxPayment"
                    component={TaxPayment}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/TaxPaymentResum"
                    component={TaxPaymentResum}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/CashWalletAccount"
                    component={CashWalletAccount}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/CashDepositWalletAccount"
                    component={CashDepositWalletAccount}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/BillPayment"
                    component={BillPayment}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/BillPaymentResum"
                    component={BillPaymentResum}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/SchoolFeesMethod"
                    component={SchoolFeesMethod}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/SchoolFeesCashDeposit"
                    component={SchoolFeesCashDeposit}
                  />
                  <PrivateRoute
                    path="/agent/walletOperation/SchoolFeesTransferAccountWallet"
                    component={SchoolFeesTransferAccountWallet}
                  />
                  <PrivateRoute
                    path="/Settings/link/bank-account"
                    component={AccountLinking}
                  />

                  <PrivateRoute
                    path="/Settings/linkingAccount/verification"
                    component={AccountVerification}
                  />
                  <PrivateRoute
                    path="/agent/walletAccountOpening"
                    component={walletAccountOpening}
                  />
                  <PrivateRoute
                    path="/agent/afbCustomer"
                    component={AfbCustomer}
                  />
                  <PrivateRoute
                    path="/agent/nonAfbCustomer"
                    component={nonAfbCustomer}
                  />
                  <PrivateRoute
                    path="/agent/BankingAccountOpening"
                    component={BankingOpeningAccount}
                  />
                  <PrivateRoute
                    path="/agent/AccountBalance"
                    component={BankAccountBalance}
                  />

                  <PrivateRoute path="/Admin/Transfer" component={SendMoney1} />
                  <PrivateRoute
                    path="/Admin/Transfer0"
                    component={ReciveMoney1}
                  />
                  <PrivateRoute
                    path="/Admin/ReciveMoney2"
                    component={ReciveMoney2}
                  />
                  <PrivateRoute
                    path="/Admin/ReciveMoney"
                    component={ReciveMoney}
                  />
                  <PrivateRoute path="/Admin/Transfer" component={SendFeels} />
                  <PrivateRoute path="/agent/kyc" component={TaxationProof} />
                  <PrivateRoute
                    path="/Admin/Loan"
                    component={LoanApplication}
                  />
                  <PrivateRoute
                    path="/Admin/CashDeposit"
                    component={CashDeposit1}
                  />
                  <PrivateRoute path="/Admin/sendMoney" component={sendMoney} />
                  <PrivateRoute
                    path="/Admin/succesSendMoney"
                    component={succesSendMoney}
                  />

                  <PrivateRoute
                    path="/admin/banking/transfer"
                    component={Transfer}
                  />
                  <PrivateRoute
                    path="/admin/banking/account_balance"
                    component={BankAccountBalance}
                  />
                  <PrivateRoute
                    path="/admin/banking/account_statement"
                    component={BankAccountStatement}
                  />
                  <PrivateRoute
                    path="/admin/banking/cash_deposit_bank"
                    component={CashDeposit}
                  />
                  <PrivateRoute
                    path="/admin/banking/cash_withdrawal_bank"
                    component={CashWithdrawal}
                  />
                  <PrivateRoute
                    path="/admin/banking/service_payments"
                    component={ServicePayment}
                  />

                  <PrivateRoute
                    path="/agent/transcations"
                    component={Transaction}
                  />
                  <PrivateRoute
                    path="/agent/access-history"
                    component={AccessHistory}
                  />
                  <PrivateRoute
                    path="/agent/tickets/add-ticket"
                    component={AddTicket}
                  />
                  <PrivateRoute path="/agent/tickets" component={Ticket} />

                  {/* Setting Routing */}
                  <PrivateRoute
                    path="/settings/general/package-management"
                    component={Packages}
                  />
                  <PrivateRoute
                    path="/settings/general/users"
                    component={Users}
                  />

                  <PrivateRoute
                    path="/settings/general/addpackages"
                    component={addPackages}
                  />
                  <PrivateRoute
                    path="/settings/editpackages"
                    component={editPackages}
                  />

                  <PrivateRoute
                    path="/settings/general/roles-management"
                    component={RoleManagement}
                  />
                  <PrivateRoute
                    path="/settings/agent-member"
                    component={AgentMember}
                  />
                  <PrivateRoute
                    path="/settings/Commissions-management"
                    component={CommissionsManagement}
                  />
                  {/* Profile Routing */}
                  <PrivateRoute path="/Profile/Profile" component={Profile} />
                  <PrivateRoute path="/Profile/Accounts" component={Accounts} />
                  <PrivateRoute path="/Profile/qr-code" component={qrCode} />
                  <PrivateRoute
                    path="/Profile/change-password"
                    component={ChangePassword}
                  />
                  <PrivateRoute
                    path="/Profile/link-agentbanker"
                    component={AgentAccountLinking}
                  />
                  <PrivateRoute
                    path="/Profile/linking-requests"
                    component={LinkingRequests}
                  />
                  <PrivateRoute
                    path="/Profile/upgrade-agentbanker"
                    component={UpgradeToAgentBanker}
                  />
                  <PrivateRoute
                    path="/Profile/bank-account"
                    component={AddAccount}
                  />
                  <PrivateRoute
                    path="/Profile/linked-agents"
                    component={LinkedAgents}
                  />
                  {/* <Route
                      exact
                      path="/profile/account/link"
                      component={AgentAccountLinking}
                    /> */}
                  <PrivateRoute
                    exact
                    path="/Profile/validate-bank-account"
                    component={ValidateSuperAgentId}
                  />
                  {/* Cash Operations Routing */}
                  <PrivateRoute
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
