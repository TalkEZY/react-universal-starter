/** @flow */
import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter as Router } from "react-router-redux";
import type { Store } from "redux";
import { connected as App } from "../../app";

export type RootProps = {
  store: Store<{
    userAgent: string,
    routing: Object,
    mobile: boolean,
  }, {}>,
  history: Object,
};

export default function Root({ store, history }: RootProps) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}

Root.propTypes = {
  store: React.PropTypes.any.isRequired,
  history: React.PropTypes.any.isRequired,
};
