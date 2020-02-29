import "babel-polyfill";

import React from "react";
import { Provider } from "react-redux";

import { render } from "react-dom";

import { Router, browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import configureStore from "../common/store";
import configurePayloadHandler from "../../utils/customPayloadHandler";

import routes from "../common/routes";

const preloadedState = window.__PRELOADED_STATE__;
const store = configureStore(preloadedState);
const history = syncHistoryWithStore(browserHistory, store);

/* Sync the Payload messages with language */
if(preloadedState.strings.fetched && preloadedState.strings.strings.errors) {
    configurePayloadHandler.setLanguage(preloadedState.strings.strings.errors);
}

render(
    <Provider store={store}>
        <Router store={store} history={history} routes={routes} />
    </Provider>,
    document,
);