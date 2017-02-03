import React from "react";
import { RouterContext } from "react-router";
import { Provider } from "react-redux";

export default function UniversalRoot({ store, props }) {
  return (
    <Provider store={store}>
      <RouterContext {...props} />
    </Provider>
  );
}

UniversalRoot.propTypes = {
  store: React.PropTypes.object,
  props: React.PropTypes.object,
};
