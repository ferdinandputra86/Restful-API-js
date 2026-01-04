module.exports = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(401).json({
      message: "Akses ditolak,admin only",
    });
  }
  next();
};
