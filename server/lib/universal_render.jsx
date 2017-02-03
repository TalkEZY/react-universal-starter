import React from "react";
import { renderToString } from "react-dom/server";

export default function render({ Component, store, routerContextProps }) {
  return {
    markup: renderToString(<Component store={store} props={routerContextProps} />),
    __initialState: JSON.stringify(store.getState()),
  };
}
