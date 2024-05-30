const verifyLogin = (req, res) => {
  if (req.session && req.session.userId) {
    res.status(200).json({ message: "User is logged in", userId: req.session.userId });
  } else {
    res.status(401).json({ message: "User is not logged in" });
  }
};

export default verifyLogin;
