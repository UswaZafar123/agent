import React from "react";
import "./Assets/icomoon/style.css";
import "antd/dist/antd.css";
import Sidebar from "./Component/Agent/sidebar/Sidebar";
import Header from "./Component/Layout/Header";
import logoBg from "./Assets/images/bgLogowater.svg";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AgentRouting from "./Component/Agent/agentRouting";
import Dashboard from "./Component/Agent/dashboard";
import Transaction from "./Component/Agent/Transaction";
import AccessHistory from "./Component/AccessHistory/accessHistory";
import Ticket from "./Component/Agent/Ticket";
import Login from "./Component/Agent/login";

export const App=(props) =>{
  return (
    <>
    <Switch>
    <Redirect exact from="/" to="/agent/login" />
    <Route path="/agent/login" component={Login} />
  </Switch>
  {
        (sessionStorage.getItem("token") && sessionStorage.getItem("user_type") == "agent") && (
            <div className="app_wrapper">
        
            <div className="left_wrapper">
              <Sidebar />
            </div>

            <div className="right_wrapper">
              <Header />
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
                    <Route path="/agent/dashboard" component={Dashboard} />
                    <Route path="/agent/transcations" component={Transaction} />
                    <Route path="/agent/access-history" component={AccessHistory} />
                    <Route path="/agent/tickets" component={Ticket} />

                  </Switch>
                </div>
              </div>
            </div>
          </div>
        )}

    </>
  );
}


//connect method is used for connecting react and redux //
export default (App);


