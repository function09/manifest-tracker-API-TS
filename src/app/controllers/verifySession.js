const verifySession = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized - Login required" });
  }
  return res.status(200).json({ message: "Session valid" });
};

export default verifySession;
