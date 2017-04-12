/* global process,__dirname */
const env = process.env.NODE_ENV || "development";

const fs = require("fs");
const express = require("express");
const helmet = require('helmet');
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const promBundle = require("express-prom-bundle");
const utilityRoutes = require("./routes/utility");

const app = express();

app.set("views", path.join(__dirname, "../app"));
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/rizzo-next/dist")));
app.use(cors());
app.use(promBundle({
  includePath: true,
  includeMethod: true,
}));

const header = fs.readFileSync(path.join(__dirname, "../node_modules/rizzo-next/dist/header.html"));
const footer = fs.readFileSync(path.join(__dirname, "../node_modules/rizzo-next/dist/footer.html"));

app.use((req, res, next) => {
  Object.assign(res.locals, {
    header: header.toString(),
    footer: footer.toString(),
    query: req.query,
  });

  next();
});

app.use((req, res, next) => {
  if (req.originalUrl.indexOf(".json") > -1) {
    req.headers["content-type"] = "application/json";
  }

  next();
});

if (env === "production") {
  require("./boot/production")(app);
} else if (env === "test") {
  require("./boot/test")(app);
} else {
  require("./boot/development")(app);
}

// adds "/error" and "/server-status" endpoints
app.use("/", utilityRoutes);

// Catch all route
app.use((req, res, next) => {
  req.statsdKey = ["pois", "errors", 404].join(".");

  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;
