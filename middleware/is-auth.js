module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      data: null,
      error: "Unauthorized",
    });
  }
  next();
};
