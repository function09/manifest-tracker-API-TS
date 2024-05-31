const logoutController = async (req, res) => {
  req.logout();

  return res.json({ message: "User has logged out" });
};

export default logoutController;
