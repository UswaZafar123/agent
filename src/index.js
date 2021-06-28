import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {I18nProvider, LOCALES} from './Component/i18n';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./store/rootReducer";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
// import Loader from "./Components/Common/loader";
import ReduxToastr from "react-redux-toastr";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

// import Loader from "./Component/common/loader"


// import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css'
// import rootReducer from "./store/rootReducer";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = composeEnhancers(applyMiddleware(thunk))(createStore)(
  rootReducer
);
const persistor = persistStore(store);

ReactDOM.render(
  <I18nProvider locale="en-US">
 <Provider store={store}>
    {/* <Loader /> */}
    <PersistGate persistor={persistor}>
      {/* <Loader/> */}
      <div>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick/>
      </div>
    <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  </I18nProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
