import React from "react";
import { Router } from "react-router";
import { Provider } from "react-redux";
import { routes } from "../routes";

export default function Root({ store, history }) {
  return (
    <Provider store={store}>
      <Router routes={routes} history={history} />
    </Provider>
  );
}

Root.propTypes = {
  store: React.PropTypes.any.isRequired,
  history: React.PropTypes.any.isRequired,
};
