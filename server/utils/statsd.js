module.exports = function(...args) {
  return (req, res, next) => {
    const method = req.method || "unknown_method";

    req.statsdKey = ["react-universal", ...args, method.toLowerCase()].join(".");

    next();
  };
}
