"use strict";

var express = require("express");
var router  = express.Router();


// Utility route for testing Airbrake
router.get("/error", (req, res) => {
  throw new Error('test');
});

// Utility route for monitoring
router.get("/health-check", (req, res) => {
  res.json({ success: true });
});

// temproary because that's how ELB is set up
router.get("/server-status", (req, res) => {
  res.json({ success: true });
});

module.exports = router;
