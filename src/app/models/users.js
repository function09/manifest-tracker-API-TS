import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minLength: [1, "Username must be at least 1 character long"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [1, "Password must be at least 1 character long"],
  },
  UUID: { type: String, required: true },
});

const User = mongoose.model("accounts", userSchema);

export default User;
