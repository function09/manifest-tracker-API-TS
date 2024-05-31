import "dotenv/config";
import passport from "passport";

const loginController = async (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      return res.status(401).json({ message: "Username or password is incorrect" });
    }

    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    req.logIn(user, (error) => {
      if (error) {
        return next(err);
      }
      return res
        .status(200)
        .json({ message: "User successfully logged in!", user: { username: user.username, id: user.id } });
    });
  })(req, res, next);
};

export default loginController;
