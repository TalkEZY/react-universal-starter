"use strict";

import React from "react"; // eslint-disable-line no-unused-vars
import { render } from "react-dom";
import { browserHistory } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { AppContainer } from "react-hot-loader";
import configureStore from "./store";
import Root from "./containers/root";

const APP_ELEMENT = "app";
const store = configureStore(window.__initialState);
const history = syncHistoryWithStore(browserHistory, store);

require("../images/mapPin-primary.png");
require("../images/mapPin-secondary.png");

export default function configureClient() {
  render(
    <AppContainer>
      <Root
        store={store}
        history={history}
      />
    </AppContainer>,
    document.getElementById(APP_ELEMENT),
  );

  document.body.className += " is-ready";
}

if (module.hot) {
  module.hot.accept("./containers/root", () => {
    const NewRoot = require("./containers/root").default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById(APP_ELEMENT),
    );
  });
}
