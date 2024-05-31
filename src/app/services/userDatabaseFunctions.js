import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import User from "../models/users.js";

// return await rule deprecated in ESLint
const findUser = async (username) => {
  try {
    return await User.findOne({ username });
  } catch (error) {
    return error;
  }
};

const userExists = async (username) => {
  try {
    const user = await User.findOne({ username });

    if (user != null) {
      return true;
    }
  } catch (error) {
    return error;
  }
  return false;
};

const createUser = async (username, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return new User({ username, password: hashedPassword, UUID: uuidv4() }).save();
  } catch (error) {
    return error;
  }
};

export { findUser, userExists, createUser };
