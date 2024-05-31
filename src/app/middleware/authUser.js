const authenticateUser = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  return next();
};

export default authenticateUser;
