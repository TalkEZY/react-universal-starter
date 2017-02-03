"use strict";

import express from "express";
import initialize from "express-simple-controllers";

const router = express.Router();

initialize(router, { directory: "server/controllers" });

module.exports = router;
