/** @flow */
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import DevTools from "./containers/devTools";
import reducers from "./reducers";
import logger from "./middleware/logger";

function configureStore(initialState: Object, history: Object) {
  const store = createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(logger, thunk, routerMiddleware(history)),
      (typeof window !== "undefined" && window.devToolsExtension) ?
        window.devToolsExtension() :
        DevTools.instrument(),
    ),
  );

  if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./reducers", () => {
      store.replaceReducer(require("./reducers").default);
    });
  }

  if (typeof window !== "undefined") {
    window.$$store = store;
  }
  return store;
}

export default configureStore;
