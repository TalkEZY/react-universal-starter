"use strict";

import express from "express";
import mvc from "../lib/mvc";

const router = express.Router();

mvc.initialize(router);

const exclude = /assets|__webpack_hmr|health\-check/;

router.get("/:slug(*)", (req, res, next) => {
  // Skip over any asset routes
  if (req.params.slug.match(exclude)) {
    return next();
  }

  return next();
});

module.exports = router;
