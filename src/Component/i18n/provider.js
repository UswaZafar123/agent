import React, { Component, Fragment } from "react";
import { IntlProvider } from 'react-intl';

import {LOCALES} from './locales';
import messages from './messages';
console.log(localStorage.getItem("langue"))
const Provider =({children,locale = LOCALES.ENGLISH}) => (
    <IntlProvider
    locale= {localStorage.getItem("locale")}
    textComponent = {Fragment}
    messages = {messages[localStorage.getItem("locale")]}
    >
        {children}
    </IntlProvider>
);


export default Provider;