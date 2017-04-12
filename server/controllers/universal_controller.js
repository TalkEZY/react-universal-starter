import { matchPath } from "react-router";
import configureStore from "../../app/shared/store";
import UniversalRoot from "../../app/shared/containers/universal_root";
import render from "../lib/universal_render";
import env from "../utils/env";

// Create a cache object for storing rendered react components
const cache = Object.create(null);

// Fetch the POI before every handler in this controller
const before = (req, res, next) => next();

const routes = [
  "/",
  "/universal",
];

const matchMiddle = (req, res, next) => {
  const match = routes.reduce((acc, route) =>
    matchPath(req.url, route, { exact: true }) || acc, null,
  );

  if (!match) {
    res.status(404).send("Not found");
    return;
  }

  next();
};

/**
 * get /universal
 */
const show = {
  method: "get",
  route: "/universal",
  middleware: [matchMiddle],
  handler: {
    html(req, res) {
      const store = configureStore({
        userAgent: req.headers["user-agent"],
      });

      const locals = render({
        Component: UniversalRoot,
        location: req.url,
        store,
      });

      return res.render("universal", locals);
    },
    json(req, res) {
      return res.json(req.place);
    },
  },
};

module.exports = {
  before,
  show,
};
