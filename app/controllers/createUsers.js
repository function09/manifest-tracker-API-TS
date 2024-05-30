import { createUser, userExists } from "../services/userDatabaseFunctions.js";

const createUserController = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await userExists(username);

    if (user) {
      return res.status(409).json({ message: "Username already exists" });
    }

    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    await createUser(username, password);

    return res.status(201).json({ message: "User account created successfully" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default createUserController;
