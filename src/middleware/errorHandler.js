function errorhandler(err, req, res, next) {
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal server Error",
  });
}

module.exports = errorhandler;