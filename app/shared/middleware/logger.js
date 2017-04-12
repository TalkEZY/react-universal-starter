/** @flow */
/* eslint-disable no-console */
import { AJAX_ERROR } from "../constants";

const logger = () =>
(next: Function) =>
(action: { type: string, payload?: Object, data: Object }) => {
  const result = next(action);

  if (
    process.env.NODE_ENV === "development" ||
    (typeof document !== "undefined" && document.cookie.match("debug"))
  ) {
    if (!action.type) {
      console.info("thunk()");
      return result;
    }
    console.groupCollapsed(`dispatching ${action.type}`);
    if (action.data || action.payload) console.info("data", action.data || action.payload);
    console.groupEnd();
  } else if (process.env.NODE_ENV === "production" &&
    typeof window !== "undefined" &&
    window.trackJs
  ) {
    if (action.type === AJAX_ERROR) {
      window.trackJs.console.log(`${action.data.status} on ${action.data.url}`);
    } else {
      window.trackJs.console.log(action.type ? action.type : action.toString());
    }
  }

  return result;
};

export default logger;
