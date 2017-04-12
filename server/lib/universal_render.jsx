import React from "react";
import { renderToString } from "react-dom/server";

export default function render({ Component, store, location }) {
  const markup = renderToString(<Component store={store} location={location} />);

  return {
    markup,
    __initialState: JSON.stringify(store.getState()),
  };
}
