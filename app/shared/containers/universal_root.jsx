/** @flow */
import React from "react";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";
import type { Store } from "redux";
import { connected as App } from "../../app";

export type UniversalRootProps = {
  store: Store<{}, {}>,
  location: Object,
};

export default function UniversalRoot({ store, location }: UniversalRootProps) {
  return (
    <Provider store={store}>
      <StaticRouter context={{}} location={location}>
        <App />
      </StaticRouter>
    </Provider>
  );
}

UniversalRoot.propTypes = {
  store: React.PropTypes.object,
  location: React.PropTypes.string,
};
