import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import { findUser } from "../services/userDatabaseFunctions.js";

const LocalStrategy = new Strategy(async (username, password, done) => {
  // This is where we call the db to verify user
  const user = await findUser(username);

  if (!user) {
    return done(null, false, { message: "Username or password are incorrect." });
  }

  try {
    const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return done(null, false, { message: "Username or password are incorrect." });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

export default LocalStrategy;
