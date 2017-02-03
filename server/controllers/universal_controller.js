import match from "match-middleware";
import configureStore from "../../app/assets/shared/store";
import UniversalRoot from "../../app/assets/shared/containers/universal_root";
import { routes } from "../../app/assets/shared/routes";
import render from "../lib/universal_render";
import env from "../utils/env";

// Create a cache object for storing rendered react components
const cache = Object.create(null);

// Fetch the POI before every handler in this controller
const before = (req, res, next) => next();

/**
 * get /universal
 */
const show = {
  method: "get",
  route: "/universal",
  middleware: [match(routes)],
  handler: {
    html(req, res) {
      if (env.production && cache[req.url]) {
        return res.render("index", cache[req.url]);
      }

      const store = configureStore({
        userAgent: req.headers["user-agent"],
      });

      const locals = render({
        Component: UniversalRoot,
        routerContextProps: req.props,
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
